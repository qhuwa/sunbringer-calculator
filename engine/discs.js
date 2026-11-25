const discRoll={def:.048,crit:.024,cd:.048,pen:9};
const statNames=['防御 %','暴击率','暴击伤害','穿透值'];
// S-rank main pools and level-15 values (GachaBase pools 401–406).
const mainLabels={
  flatHp:'生命值 +2200',flatAtk:'攻击力 +316',flatDef:'防御力 +184',
  hp:'生命值 +30%',atk:'攻击力 +30%',def:'防御力 +48%',
  crit:'暴击率 +24%',cd:'暴击伤害 +48%',proficiency:'异常精通 +92',
  pen:'穿透率 +24%',fire:'火伤 +30%',physical:'物理伤害 +30%',ice:'冰伤 +30%',
  electric:'电伤 +30%',ether:'以太伤害 +30%',wind:'风伤 +30%',
  impact:'冲击力 +18%',energy:'能量自动回复 +60%',mastery:'异常掌控 +30%'
};
const mainPools=[
  ['flatHp'],['flatAtk'],['flatDef'],
  ['crit','cd','def','atk','hp','proficiency'],
  ['fire','pen','def','atk','hp','physical','ice','electric','ether','wind'],
  ['def','atk','hp','impact','energy','mastery']
];
const blockedSubstat={def:0,crit:1,cd:2};
const twoPieceNames={inferno:'炎狱重金属',puffer:'河豚电音',woodpecker:'啄木鸟电音',rose:'荆棘玫瑰'};
const leadDiscStackRules={
  woodpecker:{name:'啄木鸟电音',sets:['woodpecker']},
  shadow:{name:'如影相随',sets:['shadow','shadowHarmony']},
  yunkui:{name:'云岿如我',sets:['yunkui']}
};
const maxDiscStacks=3;
const equippedDiscStacks=(c,key)=>leadDiscStackRules[key].sets.includes(c.set)?(c.driveStacks?.[key]??maxDiscStacks):0;
const woodpeckerAttackBonus=c=>.09*equippedDiscStacks(c,'woodpecker');
// A fully upgraded S disc has up to four different initial substats and five upgrades.
// Check a candidate allocation by constructing six actual discs, respecting main exclusions.
function evenSquares(total,slots){
  if(!slots)return total===0?0:Infinity;
  const low=Math.floor(total/slots), extra=total%slots;
  return (slots-extra)*low**2+extra*(low+1)**2;
}
function discCost(rolls){
  const total=rolls.reduce((sum,n)=>sum+n,0);
  // A layout has at most 54 rolls of at most 6 per stat per slot.
  // 325 makes total-count variance take precedence over per-stat variance.
  return 325*total**2+rolls.reduce((sum,n)=>sum+n*n,0);
}
function makeDiscs(target,blocked,startingLayout=null) {
  const memo=new Map();
  let bestLayout=startingLayout;
  let bestCost=startingLayout?startingLayout.reduce((sum,row)=>sum+discCost(row),0):Infinity;
  const path=[];
  const eligible=Array.from({length:7},(_,slot)=>target.map((_,i)=>blocked.slice(slot).filter(v=>v!==i).length));
  function lowerBound(slot,need){
    const total=need.reduce((sum,n)=>sum+n,0);
    return 325*evenSquares(total,6-slot)+need.reduce((sum,n,i)=>sum+evenSquares(n,eligible[slot][i]),0);
  }
  const capacityAfter=Array(7).fill(0);
  for(let i=5;i>=0;i--)capacityAfter[i]=capacityAfter[i+1]+(blocked[i]<0?9:8);
  function fill(slot,need,cost){
    if(startingLayout && cost+lowerBound(slot,need)>=bestCost)return null;
    if(slot===6){
      if(need.some(v=>v!==0))return null;
      if(!startingLayout)return [];
      bestCost=cost;
      bestLayout=path.slice();
      return null;
    }
    const key=slot+'|'+need.join(',');
    if(cost>=(memo.get(key)??Infinity))return null;
    memo.set(key,cost);
    for(let mask=1;mask<(1<<target.length);mask++){
      let demand=0, capacity=0;
      for(let i=0;i<target.length;i++)if(mask & (1<<i))demand+=need[i];
      for(let j=slot;j<6;j++){
        let available=0;
        for(let i=0;i<target.length;i++)if((mask & (1<<i)) && blocked[j]!==i)available++;
        if(available)capacity+=5+Math.min(4,available);
      }
      if(demand>capacity)return null;
    }
    const options=[];
    const minimumHere=need.reduce((sum,v)=>sum+v,0)-capacityAfter[slot+1];
    function build(i,a,types,up,score){
      if(i===target.length){
        if(types+up<minimumHere || (types===4 && up!==5))return;
        const next=need.map((v,j)=>v-a[j]);
        const nextCost=startingLayout?cost+discCost(a):0;
        const estimate=startingLayout?nextCost+lowerBound(slot+1,next):score;
        if(estimate<bestCost)options.push({estimate,next,nextCost,rolls:a.slice()});
        return;
      }
      const remaining=eligible[slot+1][i];
      const low=Math.max(0,need[i]-remaining*6);
      const high=blocked[slot]===i?0:Math.min(need[i],6-up);
      for(let v=low;v<=high;v++){
        if(types+(v>0)>4)continue;
        a[i]=v;
        const ideal=blocked[slot]===i?0:need[i]/(remaining+1);
        build(i+1,a,types+(v>0),up+Math.max(0,v-1),score+(v-ideal)**2);
      }
    }
    build(0,[],0,0,0);
    options.sort((a,b)=>a.estimate-b.estimate);
    for(const option of options){
      if(startingLayout && option.estimate>=bestCost)break;
      path[slot]=option.rolls;
      const next=fill(slot+1,option.next,option.nextCost);
      if(next)return [option.rolls,...next];
    }
    return null;
  }
  const first=fill(0,target,0);
  return bestLayout??first;
}

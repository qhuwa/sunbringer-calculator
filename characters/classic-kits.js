const classicControls={
  corin:[['weapon','家政员层数',0,15,15],['m2','二影减抗层数',0,20,20],['m6','六影引爆消耗充能合计',0,999,40],['assault','强击触发套装增伤']],
  manato:[['forge','熔锋覆盖'],['hpCost','胧切及连续支援突击实际消耗生命'],['m1','一影累计损失生命（%）',0,50,50],['m6','六影火伤层数',0,5,5]],
  hugo:[['echo','暗渊回响覆盖'],['decide','决算招式（0 无／1 强化特殊技／2 终结技／3 两者）',0,3,2],
    ['remaining','决算触发时剩余失衡秒数',0,15,8],['weapon','千面日陨无视防御覆盖'],['m4','四影蓄力射击减抗覆盖'],['minion','目标为普通敌人',false]],
  evelyn:[['bind','牵缠禁制与一影减防覆盖'],['strings','心弦层数',0,2,2],['m4','四影护盾覆盖'],['m6','六影追击次数',0,99,4]],
  soldier11:[['potential','潜能觉醒阶数（0 为未觉醒）',0,6,0],['weapon','硫磺石攻击力层数',0,8,8],
    ['m2','二影火力镇压层数',0,12,12],['m6','六影火力镇压充能覆盖'],['burn','目标处于灼烧'],['rounds','强化第五段消耗次数',0,8,4]],
  zhuyuan:[['extra','武装协同覆盖'],['weapon','本轮消耗音擎充能次数',0,99,8],['m2','二影压制模式层数',0,5,5],['m6','六影以太余温触发次数',0,99,1]],
  ellen:[['potential','潜能觉醒阶数（0 为未觉醒）',0,6,0],['tide','风暴潮层数',0,10,10],
    ['weapon','深海访客暴击增益数（普攻、冰冲刺）',0,2,2],['m1','一影急冻层数',0,6,6],['m2','二影强化特殊技暴伤层数',0,3,3],
    ['m6','六影盛宴蓄力剪击次数',0,99,1],['freeze','冻结或碎冰覆盖',false]],
  harumasa:[['potential','潜能觉醒阶数（0 为未觉醒）',0,6,0],['focus','锋芒层数',0,6,6],['m2','可用电掣层数',0,7,7],
    ['anomaly','目标处于属性异常',false],['m6','六影甲乙矢抗性增益覆盖']],
  billy:[['crouch','蹲姿射击增伤覆盖'],['weapon','仿制星徽引擎远距离触发效果覆盖'],
    ['m4','四影强化特殊技距离暴击率（%）',0,32,0],['m6','六影增伤层数',0,5,5],['assault','强击触发套装增伤']]
};

const classicGear={
  corin:{fanged:'獠牙重金属'},
  soldier11:{inferno:'炎狱重金属'},
  zhuyuan:{chronicle:'拂晓行纪'},
  ellen:{branch:'折枝剑歌'},
  harumasa:{shadowHarmony:'如影相随'},
  billy:{fanged:'獠牙重金属'}
};
const classicDefaults={corin:'hormone',hugo:'hormone',evelyn:'hormone',soldier11:'inferno',
  zhuyuan:'chronicle',ellen:'dawn',harumasa:'shadowHarmony',billy:'hormone'};
const physicalAllies=['caesar','panYinhu','sunna','dialyn'];
const classicRotationNote={
  corin:'回旋、持续斩击和爆炸分行计次。家政员、减抗层数和六影充能可调，六影填本轮实际引爆消耗的充能合计。',
  manato:'胧切各段独立计次。火伤使用贯穿力并无视防御，物理招式使用战斗攻击力和敌方防御。熔锋和消耗生命的专项暴伤可单独切换。',
  hugo:'决算只加在终结一击上，前段自动跟随次数。默认把终结技作为失衡收尾，按剩余 8 秒结算一次决算。可设置强化特殊技收尾，或跨失衡窗口计算两者。二影终结技触发决算后仍可在同一失衡窗口接强化特殊技。',
  evelyn:'两种终结技独立计次，琉音默认追加弦音。有击破或支援时，80% 自身战斗暴击率门槛参与驱动盘寻优。六影填写实际追击次数。',
  soldier11:'物理热身火花与火力镇压分开计次。五段普攻与火力迸发需潜能 I，强化第五段的附伤按消耗次数自动结算。',
  zhuyuan:'物理与以太弹分开计次，突击模式混合伤害自动拆分。按同一技能轴分配音擎充能，六影填实际触发的以太余温次数。',
  ellen:'冰刃浪、霜锋需要潜能 I，霜锋按目标体型选择一个版本。阵营、属性或觉醒后的击破队友决定是否激活风暴潮。',
  harumasa:'甲乙矢按单支填写。潜能 I 后逐雷在失衡时自动随飞弦·斩结算，残心·散华随终结技追加。电掣、锋芒与异常状态可调。',
  billy:'蹲射与专武触发覆盖可切换。骑士战队层数按实际连携次数取至多两层，并分配给本轮第一次终结技。'
};

function classicBattle(c,actor,counts){
  const option=key=>expandedOption(c,key);
  const stunners=Object.keys(stunNames).filter(id=>teammateSlot(c,id)).length;
  const support=partyHas(c,Object.keys(supportNames));
  const potential=Number.isInteger(option('potential'))?option('potential'):0;
  const mind=c.w, chainCount=counts?.get(actor.chainId)??0, ultCount=counts?.get(actor.ultId)??0;
  return {option,stunners,support,potential,mind,chainCount,ultCount,
    physical:partyHas(c,physicalAllies),ice:partyHas(c,['zhao']),fire:partyHas(c,['jufufu','norma','orphie']),obol:partyHas(c,['orphie','trigger']),
    anomaly:c.stun || (actor===harumasa && option('anomaly')),
    ally:id=>Boolean(teammateSlot(c,id))};
}

function classicStatSources(c,actor,s){
  const {option,mind,stunners,support,potential,physical,ice,fire,obol,anomaly,ally}=classicBattle(c,actor);
  const r=c.wr-1, weapon=actor.engines[0][1];
  const name=actor.name;
  const ownElement=s.ownElement, ownGeneral=s.ownGeneral;
  const rate=s.ownCombatRate, cd=s.ownCombatCd, atk=s.ownCombatAtkPct;
  const element=(label,value)=>ownElement.push([label,value]);
  const crit=(label,value)=>rate.push([label,value]);
  const damage=(label,value)=>ownGeneral.push([label,value]);
  const critDamage=(label,value)=>cd.push([label,value]);
  const attack=(label,value)=>atk.push([label,value]);
  const label=effect=>name+' · '+effect;
  if(c.set==='fanged')damage('獠牙重金属四件',option('assault')?.35:0);
  switch(actor){
    case corin:
      element(weapon,option('weapon')*[.03,.035,.04,.044,.048][r]);
      damage(label('扫除帮手'),c.stun && (physical || ally('rina'))?.35:0);
      damage(label('一影'),mind>=1?.12:0);
      s.ownRes.push([label('二影'),mind>=2?.005*option('m2'):0]);
      break;
    case manato:
      element(weapon,.15+.0225*r);
      element(label('熔锋'),option('forge')?.20:0);
      crit(label('熔锋'),option('forge')?.10:0);
      crit(weapon,option('hpCost')?.15+.0225*r:0);
      element(label('六影'),mind>=6?.03*option('m6'):0);
      s.ownRes.push([label('二影熔锋'),mind>=2 && option('forge')?.08:0]);
      break;
    case hugo:
      crit(label('暗渊回响'),option('echo')?.12:0);
      critDamage(label('暗渊回响'),option('echo')?.25:0);
      critDamage(weapon,.45+.0675*r);
      s.ownCombatAtkFlat.push([label('终末裁决 · 击破队友'),[0,300,900][stunners]]);
      s.ownIgnore.push([weapon,option('weapon')?.25+.0375*r:0]);
      s.ownRes.push([label('四影'),mind>=4 && option('m4')?.12:0]);
      break;
    case evelyn:
      crit(label('牵缠禁制'),option('bind')?.25:0);
      s.ownIgnore.push([label('一影禁锢'),mind>=1 && option('bind')?.12:0]);
      attack(label('二影'),mind>=2?.15:0);
      critDamage(weapon,.50+.075*r);
      critDamage(label('四影护盾'),mind>=4 && option('m4')?.40:0);
      break;
    case soldier11:
      element(label('燎原'),(fire || obol)?.10+(c.stun?.225:0):0);
      attack(weapon,option('weapon')*[.035,.044,.052,.06,.07][r]);
      critDamage(label('潜能觉醒'),(fire || obol) && potential>=2?.08*potential:0);
      if(c.set==='inferno')crit('炎狱重金属四件',option('burn')?.28:0);
      break;
    case zhuyuan:
      crit(weapon,[.15,.188,.226,.264,.30][r]);
      crit(label('武装协同'),option('extra') && (support || ally('qingyi') || ally('cissia'))?.30:0);
      break;
    case ellen:{
      const layers=ice || ally('rina') || (potential && stunners)?option('tide'):0;
      element(label('风暴潮'),layers*.03);
      critDamage(label('潜能觉醒'),potential>=2?layers*.008*potential:0);
      s.ownRes.push([label('潜能觉醒'),layers===10?[0,0,.033,.05,.067,.083,.10][potential]:0]);
      element(weapon,.25+.065*r);
      crit(weapon,option('weapon')*(.10+.025*r));
      crit(label('一影'),mind>=1?option('m1')*.02:0);
      crit('折枝剑歌四件',c.set==='branch' && option('freeze')?.12:0);
      s.ownPen.push([label('六影'),mind>=6?.20:0]);
      break;
    }
    case harumasa:
      crit(weapon,(.10+.015*r)*(anomaly?2:1));
      damage(label('超频'),anomaly && stunners?.40:0);
      if(potential>=2)attack(label('潜能觉醒'),.02*potential);
      s.ownRes.push([label('六影'),mind>=6 && anomaly && option('m6')?.15:0]);
      if(c.set==='shadowHarmony'){
        const bonus=.04*equippedDiscStacks(c,'shadow');
        attack('如影相随四件',bonus);
        crit('如影相随四件',bonus);
      }
      break;
    case billy:
      damage(label('稳定据枪'),option('crouch')?.50:0);
      element(weapon,option('weapon')?[.36,.41,.465,.52,.575][r]:0);
      damage(label('六影'),mind>=6?option('m6')*.06:0);
      break;
  }
}

function classicRotationRules(c,actor,counts){
  const {option,mind,stunners,support,potential,physical,ice,chainCount,ultCount,ally}=classicBattle(c,actor,counts);
  const r=c.wr-1, weapon=actor.engines[0][1], e=effect=>actor.name+' · '+effect;
  const n=id=>counts.get(id)??0;
  let rounds=option('weapon'), arrows=option('m2'), feast=option('m6');
  const decisionCount=(id,type)=>c.stun?(option('decide')===type || option('decide')===3?Math.min(1,n(id)):0):
    type===1 && mind>=6?n(id):0;
  return (skill,count,category)=>{
    const {id,type}=skill;
    const elemental=skill.element!=='physical', chain=type==='chain', ult=type==='ult', basic=type==='basic', dash=type==='dash', ex=type==='ex';
    const out={count:skill.linkedTo?n(skill.linkedTo):count,available:!skill.minPotential || potential>=skill.minPotential,
      bonusMult:0,extraRes:0,extraIgnore:0,critDamageBonus:0,critRateBonus:0,critThreshold:0,thresholdScale:1};
    count=out.count;
    const add=(label,value)=>category.push([label,value]);
    switch(actor){
      case corin:
        if([1061009,1061012].includes(id))add(e('专注'),.375);
        if(id===1061096)out.count=mind>=6?Math.min(option('m6'),40*(n(1061010)+n(1061013)+n(1061016)+n(1061020)+n(1061024))):0;
        break;
      case manato:
        if(id>=1441009 && id<=1441012 || id===1441025)out.critDamageBonus=option('hpCost')?.50:0;
        if(elemental && (basic || skill.name.startsWith('支援突击')))add(e('一影累计失去生命'),mind>=1?.004*option('m1'):0);
        break;
      case hugo:{
        if(id===1291010 || id===1291018)out.count-=decisionCount(id,ex?1:2);
        if(skill.decisionOf){
          const time=option('remaining');
          out.count=decisionCount(skill.decisionOf,ex?1:2);
          out.bonusMult=10+(c.stun?2.8*Math.min(5,time)+Math.max(0,time-5):0);
          add(e('决算增伤'),(stunners || ice?.40:0)+(mind>=6?.60:0));
          out.critRateBonus=mind>=1 && option('echo')?.12:0;
          out.critDamageBonus=mind>=1 && option('echo')?.30:0;
          out.extraIgnore=mind>=2?.15:0;
        }
        if(chain && (stunners || ice))add(e('终焉序曲'),.15+(option('minion')?.35:0));
        break;
      }
      case evelyn:
        if(chain || ult){
          out.extraRes=option('strings')*[.125,.145,.165,.185,.20][r];
          if(stunners || support){
            add(e('潜袭支点'),.30);
            if(id!==1321096){out.critThreshold=.80;out.thresholdScale=1.25;}
          }
        }
        if(id===1321096)out.count=mind>=6 && (chainCount || ultCount || n(13210161))?
          Math.min(option('m6'),16*(chainCount+ultCount+n(13210161))):0;
        break;
      case soldier11:{
        const suppression=elemental && /火力镇压/.test(skill.name);
        if(suppression)add(e('热浪'),.70);
        if(mind>=2 && (basic || dash || type==='dodge'))add(e('二影'),.03*option('m2'));
        if(mind>=6 && suppression && option('m6'))out.extraRes=.25;
        if(id===1041026)out.count=n(1041025)*option('rounds');
        break;
      }
      case zhuyuan:{
        const shell=[1241010,1241011,1241012,1241019].includes(id);
        if(shell){
          add(e('特种弹药'),c.stun?.80:.40);
          add(e('二影'),mind>=2?option('m2')*.10:0);
          out.extraRes=mind>=4?.25:0;
        }
        if(elemental && (basic || dash) && count){
          const spent=Math.min(rounds,count);
          rounds-=spent;
          add(weapon,(leadSignature(c)?spent/count:0)*[.35,.435,.52,.605,.70][r]);
        }
        if(id===1241027)out.count=mind>=6?Math.min(option('m6'),n(1241016)):0;
        break;
      }
      case ellen:{
        const enhanced=[1191004,1191005,1191006,1191009].includes(id)||potential && (chain || ult || /霜锋|冰刃浪/.test(skill.name));
        out.critDamageBonus=(enhanced?1:0)+(mind>=2 && ex?.20*option('m2'):0);
        if(id===1191009 && mind>=6 && count){
          const ticks=Math.min(count,feast);
          feast-=ticks;
          add(e('六影盛宴'),2.5*ticks/count);
        }
        break;
      }
      case harumasa:{
        const slash=[1201020,1201021,1201022].includes(id), follow=id===1201025;
        if(slash || follow && potential || ult && potential){
          out.critRateBonus=.25;
          out.critDamageBonus=.12*option('focus');
        }
        if(slash && mind>=2 && count && (ultCount || chainCount)){
          const charged=Math.min(arrows,count);
          arrows-=charged;
          add(e('二影电掣'),.50*charged/count);
        }
        if(slash || follow)out.extraRes=potential>=2?.025*potential:0;
        if(leadSignature(c) && (dash && elemental || follow))add(weapon,.40+.06*r);
        if(follow)out.count=c.stun?n(1201020)+n(1201021)+n(1201022):0;
        if(id===1201024)out.count=ultCount;
        if(id===1201096)out.count=mind>=6?Math.floor(n(1201008)/12):0;
        break;
      }
      case billy:
        if(ult && count && (physical || ally('nicole')))add(e('骑士战队'),.50*Math.min(2,chainCount)/count);
        if(type==='dodge' && mind>=2)add(e('二影'),.25);
        if(ex && mind>=4)out.critRateBonus=option('m4')/100;
        break;
    }
    if(c.set==='shadowHarmony' || c.two==='shadowHarmony')add('如影相随两件',dash || id===1201025?.15:0);
    return out;
  };
}

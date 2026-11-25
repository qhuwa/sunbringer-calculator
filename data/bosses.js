const bosses = [
  {
    "id": 30007,
    "slug": "dead-end-butcher",
    "name": {
      "key": "OfficialName_Monster_CottusGrey",
      "text": "死路屠夫",
      "override": null
    },
    "base_variant_id": 11235,
    "weakness_ids": [
      202,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11235,
      11236,
      11238
    ],
    "def": 952.8
  },
  {
    "id": 30009,
    "slug": "unknown-corruption-complex",
    "name": {
      "key": "OfficialName_Monster_ComplexCorrupted",
      "text": "未知复合侵蚀体",
      "override": null
    },
    "base_variant_id": 11411,
    "weakness_ids": [
      203,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11411,
      11412,
      11413,
      11414,
      11415
    ],
    "def": 952.8
  },
  {
    "id": 30012,
    "slug": "twin-marionettes",
    "name": {
      "key": "OfficialName_Monster_Marionette_Twins",
      "text": "冥宁芙·双子",
      "override": null
    },
    "base_variant_id": 11421,
    "weakness_ids": [
      202,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11422,
      11432
    ],
    "def": 952.8
  },
  {
    "id": 30021,
    "slug": "corrupted-overlord-pompey",
    "name": {
      "key": "OfficialName_Monster_TyrantPompey",
      "text": "「霸主侵蚀体·庞培」",
      "override": null
    },
    "base_variant_id": 11701,
    "weakness_ids": [
      201
    ],
    "resistance_ids": [
      203
    ],
    "variant_ids": [
      11701,
      11702,
      11703
    ],
    "def": 952.8
  },
  {
    "id": 30024,
    "slug": "sacrifice-bringer",
    "name": {
      "key": "OfficialName_Monster_SacrificeBringer",
      "text": "牲鬼·布林格",
      "override": null
    },
    "base_variant_id": 11811,
    "weakness_ids": [
      202
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      11811,
      11812,
      11813,
      11817,
      11818,
      11819,
      21229
    ],
    "def": 952.8
  },
  {
    "id": 30032,
    "slug": "geppetto",
    "name": {
      "key": "BriefName_Monster_Geppetto",
      "text": "杰佩托",
      "override": null
    },
    "base_variant_id": 11541,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      11541,
      11542,
      11543,
      11544
    ],
    "def": 952.8
  },
  {
    "id": 30033,
    "slug": "miasma-priest",
    "name": {
      "key": "OfficialName_Monster_MentorMevorakh",
      "text": "秽息司祭",
      "override": null
    },
    "base_variant_id": 31031,
    "weakness_ids": [
      205
    ],
    "resistance_ids": [
      202
    ],
    "variant_ids": [
      21228,
      31031,
      31032
    ],
    "def": 952.8
  },
  {
    "id": 30034,
    "slug": "miasmic-fiend-unfathomable",
    "name": {
      "key": "OfficialName_Monster_NamelessOne",
      "text": "秽息妖鬼·名可名",
      "override": null
    },
    "base_variant_id": 31061,
    "weakness_ids": [
      200,
      205
    ],
    "resistance_ids": [
      201
    ],
    "variant_ids": [
      31061,
      31062,
      31433,
      31440
    ],
    "def": 952.8
  },
  {
    "id": 30038,
    "slug": "the-defiler",
    "name": {
      "key": "BriefName_Monster_IsoldetheDefiler",
      "text": "「亵渎者」",
      "override": null
    },
    "base_variant_id": 31141,
    "weakness_ids": [
      200,
      203
    ],
    "resistance_ids": [
      202
    ],
    "variant_ids": [
      31141,
      31142,
      31147
    ],
    "def": 952.8
  },
  {
    "id": 30041,
    "slug": "wandering-hunter",
    "name": {
      "key": "BriefName_Monster_WanderingHunter",
      "text": "彷徨猎手",
      "override": null
    },
    "base_variant_id": 11841,
    "weakness_ids": [
      201,
      202
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      11841,
      11842
    ],
    "def": 1588
  },
  {
    "id": 30042,
    "slug": "ye-shiyuan-the-thrall",
    "name": {
      "key": "BriefName_Monster_Awakener",
      "text": "魇缚者·叶释渊",
      "override": null
    },
    "base_variant_id": 31351,
    "weakness_ids": [
      200,
      202,
      204
    ],
    "resistance_ids": [
      203
    ],
    "variant_ids": [
      31351,
      31353
    ],
    "def": 952.8
  },
  {
    "id": 30052,
    "slug": "infernal-revenant",
    "name": {
      "key": "BriefName_Monster_SymbioticEtherealSinner",
      "text": "熔狱行赭",
      "override": null
    },
    "base_variant_id": 31635,
    "weakness_ids": [
      202,
      204
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      31631,
      31634,
      31635,
      31636,
      31637,
      31639,
      31640
    ],
    "def": 952.8
  },
  {
    "id": 30053,
    "slug": "ulidim",
    "name": {
      "key": "BriefName_Monster_Stalker",
      "text": "乌利迪姆",
      "override": null
    },
    "base_variant_id": 31602,
    "weakness_ids": [
      202,
      204
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      31602,
      31604
    ],
    "def": 952.8
  },
  {
    "id": 35001,
    "slug": "nineveh",
    "name": {
      "key": "BriefName_Monster_Nineveh",
      "text": "尼尼微",
      "override": null
    },
    "base_variant_id": 11531,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      11531
    ],
    "def": 952.8
  },
  {
    "id": 40000,
    "slug": "primordial-nightmare-the-creator",
    "name": {
      "key": "BriefName_Monster_Vessel",
      "text": "太初梦魇·「始主」",
      "override": null
    },
    "base_variant_id": 31411,
    "weakness_ids": [
      200
    ],
    "resistance_ids": [
      202,
      205
    ],
    "variant_ids": [
      31411,
      31412,
      31414
    ],
    "def": 476.4
  },
  {
    "id": 40001,
    "slug": "discordant-solo-vesper",
    "name": {
      "key": "BriefName_Monster_Vesper",
      "text": "叛律孤歌·薇斯珀",
      "override": null
    },
    "base_variant_id": 31451,
    "weakness_ids": [
      204,
      205
    ],
    "resistance_ids": [
      201,
      202
    ],
    "variant_ids": [
      31451
    ],
    "def": 476.4
  },
  {
    "id": 40002,
    "slug": "sanguine-sweeper",
    "name": {
      "key": "BriefName_Monster_GraymaneCenturion",
      "text": "猎血清道夫",
      "override": null
    },
    "base_variant_id": 11801,
    "weakness_ids": [
      203,
      205
    ],
    "resistance_ids": [
      201,
      204
    ],
    "variant_ids": [
      11801,
      11802
    ],
    "def": 476.4
  },
  {
    "id": 40003,
    "slug": "rewritten-sanguine-sweeper",
    "name": {
      "key": "BriefName_Monster_ClonedBlackWolf",
      "text": "复写体·猎血清道夫",
      "override": null
    },
    "base_variant_id": 11803,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      11803,
      11804
    ],
    "def": 476.4
  },
  {
    "id": 40004,
    "slug": "phaethon-of-the-scorched-horizon",
    "name": {
      "key": "BriefName_Monster_Pure",
      "text": "焚昼余火·法厄同",
      "override": null
    },
    "base_variant_id": 31432,
    "weakness_ids": [
      202,
      204
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      31432,
      31439
    ],
    "def": 952.8
  },
  {
    "id": 40005,
    "slug": "phaethon-of-the-scorched-horizon",
    "name": {
      "key": "BriefName_Monster_Mutant",
      "text": "焚昼余火·法厄同",
      "override": null
    },
    "base_variant_id": 31431,
    "weakness_ids": [
      202,
      204
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      31431,
      31438
    ],
    "def": 952.8
  },
  {
    "id": 40006,
    "slug": "girtablullu",
    "name": {
      "key": "BriefName_Monster_Girtablu",
      "text": "基塔布鲁",
      "override": null
    },
    "base_variant_id": 31661,
    "weakness_ids": [
      204
    ],
    "resistance_ids": [],
    "variant_ids": [
      31661
    ],
    "def": 952.8
  },
  {
    "id": 40007,
    "slug": "integrated-primordial-nightmare",
    "name": {
      "key": "BriefName_Monster_Vessel_HC",
      "text": "异构·太初梦魇",
      "override": null
    },
    "base_variant_id": 31413,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31413,
      31415
    ],
    "def": 476.4
  },
  {
    "id": 40008,
    "slug": "girtablullu-stagnant-aberrant",
    "name": {
      "key": "BriefName_Monster_GirReborn",
      "text": "基塔布鲁·滞变畸兽",
      "override": null
    },
    "base_variant_id": 31671,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31672,
      31674,
      31676,
      31681
    ],
    "def": 952.8
  },
  {
    "id": 40009,
    "slug": "integrated-girtablullu",
    "name": {
      "key": "BriefName_Monster_Girtablu_HC",
      "text": "异构·基塔布鲁",
      "override": null
    },
    "base_variant_id": 31662,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31662
    ],
    "def": 952.8
  },
  {
    "id": 40010,
    "slug": "kusarikku",
    "name": {
      "key": "BriefName_Monster_Larval",
      "text": "库萨里库",
      "override": null
    },
    "base_variant_id": 31711,
    "weakness_ids": [
      201,
      203
    ],
    "resistance_ids": [
      202
    ],
    "variant_ids": [
      31711,
      31712
    ],
    "def": 952.8
  },
  {
    "id": 40011,
    "slug": "integrated-scorched-horizon",
    "name": {
      "key": "BriefName_Monster_Mutant_HC",
      "text": "异构·焚昼余火",
      "override": null
    },
    "base_variant_id": 31437,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31437
    ],
    "def": 952.8
  },
  {
    "id": 40012,
    "slug": "40012",
    "name": {
      "key": "BriefName_Monster_HollowVenger",
      "text": "僭越者",
      "override": null
    },
    "base_variant_id": 31731,
    "weakness_ids": [
      201
    ],
    "resistance_ids": [
      202
    ],
    "variant_ids": [
      31731,
      31733,
      31734,
      31735
    ],
    "def": 952.8
  },
  {
    "id": 40013,
    "slug": "newborn-chain",
    "name": {
      "key": "BriefName_Monster_Transgressor",
      "text": "新生之结",
      "override": null
    },
    "base_variant_id": 31821,
    "weakness_ids": [
      201
    ],
    "resistance_ids": [
      202
    ],
    "variant_ids": [
      31821,
      31822,
      31823,
      31824
    ],
    "def": 952.8
  },
  {
    "id": 40014,
    "slug": "integrated-stagnant-aberrant",
    "name": {
      "key": "BriefName_Monster_GirReborn_HC",
      "text": "异构·滞变畸兽",
      "override": null
    },
    "base_variant_id": 31677,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31677,
      31678
    ],
    "def": 952.8
  },
  {
    "id": 40015,
    "slug": "integrated-infernal-revenant",
    "name": {
      "key": "BriefName_Monster_Infernal Revenant_HC",
      "text": "异构·熔狱行赭",
      "override": null
    },
    "base_variant_id": 31636,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": []
  },
  {
    "id": 40016,
    "slug": "integrated-heretic-jester",
    "name": {
      "key": "BriefName_Monster_HereticJester_HC",
      "text": "异构·凶魁愚者",
      "override": null
    },
    "base_variant_id": 31113,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": []
  },
  {
    "id": 40017,
    "slug": "integrated-haytor",
    "name": {
      "key": "BriefName_Monster_Hayyot_HC",
      "text": "异构·赫由托",
      "override": null
    },
    "base_variant_id": 31197,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": []
  },
  {
    "id": 40018,
    "slug": "integrated-kusarikku",
    "name": {
      "key": "BriefName_Monster_Larval_EX",
      "text": "异构·库萨里库",
      "override": null
    },
    "base_variant_id": 31714,
    "weakness_ids": [],
    "resistance_ids": [],
    "variant_ids": [
      31714
    ],
    "def": 952.8
  },
  {
    "id": 40019,
    "slug": "incomplete-chain",
    "name": {
      "key": "BriefName_Monster_Usurper",
      "text": "未成之结",
      "override": null
    },
    "base_variant_id": 31891,
    "weakness_ids": [
      202,
      203
    ],
    "resistance_ids": [
      200
    ],
    "variant_ids": [
      31891
    ]
  },
  {
    "id": 300071,
    "slug": "newborn-dead-end-butcher",
    "name": {
      "key": "OfficialName_Monster_Cottus",
      "text": "初生死路屠夫",
      "override": null
    },
    "base_variant_id": 11233,
    "weakness_ids": [
      202,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11233,
      11234,
      11237,
      11239,
      29901,
      30503
    ],
    "def": 1318.04
  },
  {
    "id": 300072,
    "slug": "notorious-dead-end-butcher",
    "name": {
      "key": "OfficialName_Monster_NotoriousCottus",
      "text": "恶名·死路屠夫",
      "override": null
    },
    "base_variant_id": 11901,
    "weakness_ids": [
      202,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11901,
      41122
    ],
    "def": 952.8
  },
  {
    "id": 300121,
    "slug": "notorious-marionette",
    "name": {
      "key": "OfficialName_Monster_NotoriousMarionette",
      "text": "恶名·冥宁芙",
      "override": null
    },
    "base_variant_id": 11861,
    "weakness_ids": [
      202,
      205
    ],
    "resistance_ids": [],
    "variant_ids": [
      11861,
      11871
    ],
    "def": 952.8
  },
  {
    "id": 300211,
    "slug": "notorious-pompey",
    "name": {
      "key": "OfficialName_Monster_NotoriousPompey",
      "text": "恶名·庞培",
      "override": null
    },
    "base_variant_id": 11881,
    "weakness_ids": [
      201
    ],
    "resistance_ids": [
      203
    ],
    "variant_ids": [
      11881
    ],
    "def": 952.8
  }
];

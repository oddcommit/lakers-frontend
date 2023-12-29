const cityOptions = [
  {
    id: 655,
    name: "千代田区",
    city_code: "13101",
    pref_code: "13"
  },
  {
    id: 656,
    name: "中央区",
    city_code: "13102",
    pref_code: "13"
  },
  {
    id: 657,
    name: "港区",
    city_code: "13103",
    pref_code: "13"
  },
  {
    id: 658,
    name: "新宿区",
    city_code: "13104",
    pref_code: "13"
  },
  {
    id: 659,
    name: "文京区",
    city_code: "13105",
    pref_code: "13"
  },
  {
    id: 660,
    name: "台東区",
    city_code: "13106",
    pref_code: "13"
  },
  {
    id: 661,
    name: "墨田区",
    city_code: "13107",
    pref_code: "13"
  },
  {
    id: 662,
    name: "江東区",
    city_code: "13108",
    pref_code: "13"
  },
  {
    id: 663,
    name: "品川区",
    city_code: "13109",
    pref_code: "13"
  },
  {
    id: 664,
    name: "目黒区",
    city_code: "13110",
    pref_code: "13"
  },
  {
    id: 665,
    name: "大田区",
    city_code: "13111",
    pref_code: "13"
  },
  {
    id: 666,
    name: "世田谷区",
    city_code: "13112",
    pref_code: "13"
  },
  {
    id: 667,
    name: "渋谷区",
    city_code: "13113",
    pref_code: "13"
  },
  {
    id: 668,
    name: "中野区",
    city_code: "13114",
    pref_code: "13"
  },
  {
    id: 669,
    name: "杉並区",
    city_code: "13115",
    pref_code: "13"
  },
  {
    id: 670,
    name: "豊島区",
    city_code: "13116",
    pref_code: "13"
  },
  {
    id: 671,
    name: "北区",
    city_code: "13117",
    pref_code: "13"
  },
  {
    id: 672,
    name: "荒川区",
    city_code: "13118",
    pref_code: "13"
  },
  {
    id: 673,
    name: "板橋区",
    city_code: "13119",
    pref_code: "13"
  },
  {
    id: 674,
    name: "練馬区",
    city_code: "13120",
    pref_code: "13"
  },
  {
    id: 675,
    name: "足立区",
    city_code: "13121",
    pref_code: "13"
  },
  {
    id: 676,
    name: "葛飾区",
    city_code: "13122",
    pref_code: "13"
  },
  {
    id: 677,
    name: "江戸川区",
    city_code: "13123",
    pref_code: "13"
  },
  {
    id: 678,
    name: "八王子市",
    city_code: "13201",
    pref_code: "13"
  },
  {
    id: 679,
    name: "立川市",
    city_code: "13202",
    pref_code: "13"
  },
  {
    id: 680,
    name: "武蔵野市",
    city_code: "13203",
    pref_code: "13"
  },
  {
    id: 681,
    name: "三鷹市",
    city_code: "13204",
    pref_code: "13"
  },
  {
    id: 682,
    name: "青梅市",
    city_code: "13205",
    pref_code: "13"
  },
  {
    id: 683,
    name: "府中市",
    city_code: "13206",
    pref_code: "13"
  },
  {
    id: 684,
    name: "昭島市",
    city_code: "13207",
    pref_code: "13"
  },
  {
    id: 685,
    name: "調布市",
    city_code: "13208",
    pref_code: "13"
  },
  {
    id: 686,
    name: "町田市",
    city_code: "13209",
    pref_code: "13"
  },
  {
    id: 687,
    name: "小金井市",
    city_code: "13210",
    pref_code: "13"
  },
  {
    id: 688,
    name: "小平市",
    city_code: "13211",
    pref_code: "13"
  },
  {
    id: 689,
    name: "日野市",
    city_code: "13212",
    pref_code: "13"
  },
  {
    id: 690,
    name: "東村山市",
    city_code: "13213",
    pref_code: "13"
  },
  {
    id: 691,
    name: "国分寺市",
    city_code: "13214",
    pref_code: "13"
  },
  {
    id: 692,
    name: "国立市",
    city_code: "13215",
    pref_code: "13"
  },
  {
    id: 693,
    name: "福生市",
    city_code: "13218",
    pref_code: "13"
  },
  {
    id: 694,
    name: "狛江市",
    city_code: "13219",
    pref_code: "13"
  },
  {
    id: 695,
    name: "東大和市",
    city_code: "13220",
    pref_code: "13"
  },
  {
    id: 696,
    name: "清瀬市",
    city_code: "13221",
    pref_code: "13"
  },
  {
    id: 697,
    name: "東久留米市",
    city_code: "13222",
    pref_code: "13"
  },
  {
    id: 698,
    name: "武蔵村山市",
    city_code: "13223",
    pref_code: "13"
  },
  {
    id: 699,
    name: "多摩市",
    city_code: "13224",
    pref_code: "13"
  },
  {
    id: 700,
    name: "稲城市",
    city_code: "13225",
    pref_code: "13"
  },
  {
    id: 701,
    name: "羽村市",
    city_code: "13227",
    pref_code: "13"
  },
  {
    id: 702,
    name: "あきる野市",
    city_code: "13228",
    pref_code: "13"
  },
  {
    id: 703,
    name: "西東京市",
    city_code: "13229",
    pref_code: "13"
  },
  {
    id: 704,
    name: "西多摩郡瑞穂町",
    city_code: "13303",
    pref_code: "13"
  },
  {
    id: 705,
    name: "西多摩郡日の出町",
    city_code: "13305",
    pref_code: "13"
  },
  {
    id: 706,
    name: "西多摩郡檜原村",
    city_code: "13307",
    pref_code: "13"
  },
  {
    id: 707,
    name: "西多摩郡奥多摩町",
    city_code: "13308",
    pref_code: "13"
  },
  {
    id: 708,
    name: "大島町",
    city_code: "13361",
    pref_code: "13"
  },
  {
    id: 709,
    name: "利島村",
    city_code: "13362",
    pref_code: "13"
  },
  {
    id: 710,
    name: "新島村",
    city_code: "13363",
    pref_code: "13"
  },
  {
    id: 711,
    name: "神津島村",
    city_code: "13364",
    pref_code: "13"
  },
  {
    id: 712,
    name: "三宅島三宅村",
    city_code: "13381",
    pref_code: "13"
  },
  {
    id: 713,
    name: "御蔵島村",
    city_code: "13382",
    pref_code: "13"
  },
  {
    id: 714,
    name: "八丈島八丈町",
    city_code: "13401",
    pref_code: "13"
  },
  {
    id: 715,
    name: "青ヶ島村",
    city_code: "13402",
    pref_code: "13"
  },
  {
    id: 716,
    name: "小笠原村",
    city_code: "13421",
    pref_code: "13"
  },
  {
    id: 717,
    name: "横浜市青葉区",
    city_code: "13422",
    pref_code: "14"
  },
  {
    id: 718,
    name: "さいたま市大宮区",
    city_code: "13423",
    pref_code: "12"
  },
  {
    id: 9999,
    name: "不明",
    city_code: "99999",
    pref_code: "99999"
  },
];

const receptionReasonOptions = [
  { id: 1, name: "所有権移転相続・法人合併" },
  { id: 2, name: "所有権移転遺贈・贈与その他無償名義" },
  { id: 3, name: "所有権移転売買" },
  { id: 4, name: "所有権移転その他の原因" },
  { id: 5, name: "権利の移転(所有権を除く)" },
  { id: 6, name: "処分の制限に関する登記" },
  { id: 7, name: "根抵当権の設定" },
  { id: 8, name: "抵当権の設定" },
  { id: 9, name: "抹消登記" },
  { id: 10, name: "滅失" },
  { id: 11, name: "建物滅失通知" },
  { id: 12, name: "地上権の設定" },
  { id: 13, name: "地役権の設定" },
  { id: 14, name: "賃借権の設定" },
  { id: 15, name: "分筆" },
  { id: 16, name: "合体" },
  { id: 17, name: "合併" },
  { id: 18, name: "合筆" },
  { id: 19, name: "所有権の保存(申請)" },
  { id: 20, name: "所有権の保存(職権)" },
  { id: 21, name: "附属建物の新築" },
  { id: 22, name: "敷地権たる旨の登記" },
  { id: 23, name: "仮登記(所有権)" },
  { id: 24, name: "仮登記(その他)" },
  { id: 25, name: "信託に関する登記" },
  { id: 26, name: "配偶者居住権の設定" },
  { id: 27, name: "買戻権" },
  { id: 28, name: "権利に関するその他" },
  { id: 29, name: "表題" },
  { id: 30, name: "区分建物の表題" },
  { id: 31, name: "敷地権の表示" },
  { id: 32, name: "表示に関するその他" },
  { id: 33, name: "登記名義人の氏名等についての変更・更正" },
  { id: 34, name: "権利の変更・更正" },
  { id: 35, name: "敷地権の表示の登記の変更・更正" },
  { id: 36, name: "床面積の変更・更正" },
  { id: 37, name: "地目変更・更正" },
  { id: 38, name: "地積変更・更正" },
  { id: 39, name: "共同担保変更通知" },
  { id: 40, name: "共同担保追加通知" },
  { id: 42, name: "分割・区分" },
  { id: 43, name: "却下" },
  { id: 44, name: "取下" },
  { id: 999, name: "その他" },
];

export { cityOptions, receptionReasonOptions };

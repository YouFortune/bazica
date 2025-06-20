// api/bazi.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  const { year, month, day, hour, timezone } = req.body;

  const stems = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  const branches = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

  const yearStem = stems[year % 10];
  const yearBranch = branches[year % 12];

  const elementMap = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };

  const elements = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  const yearElements = [elementMap[yearStem], elementMap[yearBranch]];
  yearElements.forEach(e => elements[e]++);

  const lacking = Object.entries(elements)
    .filter(([el, count]) => count === 0)
    .map(([el]) => el);

  const crystalMap = {
    '木': '绿幽灵 Green Phantom',
    '火': '红玛瑙 Red Agate',
    '土': '黄虎眼 Tiger Eye',
    '金': '白水晶 Clear Quartz',
    '水': '黑曜石 Obsidian'
  };

  const recommended = lacking.map(el => ({
    element: el,
    crystal: crystalMap[el]
  }));

  res.status(200).json({
    birthday: `${year}-${month}-${day} ${hour}:00`,
    timezone,
    bazi: {
      year: `${yearStem}${yearBranch}`
    },
    elements,
    lacking,
    recommended
  });
}

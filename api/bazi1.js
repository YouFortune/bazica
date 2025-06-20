// File: api/bazi.js

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { year, month, day, hour, timezone } = req.body;

  // Basic mock data based on input
  const birthday = `${year}-${month}-${day} ${hour}:00`;
  const mockBazi = {
    year: "甲子 (Wood Rat)",
    month: "乙丑 (Wood Ox)",
    day: "丙寅 (Fire Tiger)",
    hour: "丁卯 (Fire Rabbit)"
  };

  const mockElements = {
    Wood: 3,
    Fire: 2,
    Earth: 1,
    Metal: 0,
    Water: 2
  };

  const lacking = Object.entries(mockElements)
    .filter(([k, v]) => v === 0)
    .map(([k]) => k);

  const recommendations = lacking.map(e => {
    return {
      element: e,
      crystal: e === "Metal" ? "Citrine" : e === "Earth" ? "Tiger's Eye" : "Clear Quartz"
    };
  });

  res.status(200).json({
    birthday,
    bazi: mockBazi,
    elements: mockElements,
    lacking,
    recommended: recommendations
  });
}

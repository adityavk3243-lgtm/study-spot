// StudySpot - Central District Data
// State select karne par us State/UT ke districts load honge.

const DISTRICT_DATA_URL =
  "https://raw.githubusercontent.com/iaseth/data-for-india/master/data/readable/districts.json";

let INDIA_DISTRICTS = {};

async function loadDistrictData() {
  try {
    const response = await fetch(DISTRICT_DATA_URL);

    if (!response.ok) {
      throw new Error("District data load nahi hua");
    }

    const data = await response.json();

    INDIA_DISTRICTS = {};

    data.districts.forEach(item => {
      const state = item.state;
      const district = item.district;

      if (!state || !district) return;

      if (!INDIA_DISTRICTS[state]) {
        INDIA_DISTRICTS[state] = [];
      }

      if (!INDIA_DISTRICTS[state].includes(district)) {
        INDIA_DISTRICTS[state].push(district);
      }
    });

    // Har State ke districts alphabetical order mein
    Object.keys(INDIA_DISTRICTS).forEach(state => {
      INDIA_DISTRICTS[state].sort((a, b) =>
        a.localeCompare(b)
      );
    });

    console.log("StudySpot district data loaded successfully.");
    console.log("States/UTs:", Object.keys(INDIA_DISTRICTS).length);

    return INDIA_DISTRICTS;

  } catch (error) {
    console.error("District data error:", error);
    return {};
  }
}

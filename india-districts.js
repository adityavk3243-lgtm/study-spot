// StudySpot - District Data Loader

const DISTRICT_DATA_URL =
  "https://raw.githubusercontent.com/iaseth/data-for-india/master/data/readable/districts.json";

let INDIA_DISTRICTS = {};

async function loadDistrictData() {
  try {
    const response = await fetch(DISTRICT_DATA_URL);

    if (!response.ok) {
      throw new Error("District data could not be loaded");
    }

    const rawData = await response.json();

    let districtList = [];

    if (Array.isArray(rawData)) {
      districtList = rawData;
    } else if (Array.isArray(rawData.districts)) {
      districtList = rawData.districts;
    } else if (Array.isArray(rawData.data)) {
      districtList = rawData.data;
    }

    INDIA_DISTRICTS = {};

    districtList.forEach(function (item) {
      const state =
        item.state ||
        item.state_name ||
        item.State ||
        item["State Name"];

      const district =
        item.district ||
        item.district_name ||
        item.District ||
        item["District Name"];

      if (!state || !district) return;

      if (!INDIA_DISTRICTS[state]) {
        INDIA_DISTRICTS[state] = [];
      }

      if (!INDIA_DISTRICTS[state].includes(district)) {
        INDIA_DISTRICTS[state].push(district);
      }
    });

    Object.keys(INDIA_DISTRICTS).forEach(function (state) {
      INDIA_DISTRICTS[state].sort();
    });

    console.log("District data loaded successfully:", INDIA_DISTRICTS);

    return INDIA_DISTRICTS;
  } catch (error) {
    console.error("District data loading error:", error);
    return {};
  }
}

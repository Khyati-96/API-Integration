const covid19 = "https://covid-api.com/api";

/* Functions for COVID API Requests */

async function getRegions() {
  let reqUrl = `${covid19}/reports`; //URL for getting all regions API has data on
  let res = await fetch(reqUrl, {
    method: "GET",
  });
  return await res.json();
}

async function getAreas(regionIso) {
  let reqUrl = `${covid19}/reports?iso=${regionIso}`; // URL for getting all province of a specific region
  console.log(`getAreas Region ISO: ${regionIso}`);
  let res = await fetch(reqUrl, {
    method: "GET",
  });
  return await res.json();
}

async function getReport(regionIso, areas) {
  console.log(`getReport Region ISO: ${regionIso}`);
  console.log(`Province: ${areas}`);
  let reqUrl = `${covid19}/reports?iso=${regionIso}`;
  console.log(`Pre-if-statement Province: ${areas}`);
  //if the province value is empty, which it can be, then it will return a report for the regionIso ONLY, i.e. this happens with South Korea with no other breakdown of data for any specific areas | also works for if the user wants a report for the whole region
  console.log("Check - code reached right before if-statement");
  console.log(`Right before the if statement: ${reqUrl}`);
  if (areas) {
    reqUrl += `&region_province=${areas}`;
    console.log(`if-statement triggered, Province: ${areas}`);
    console.log(
      `Because the value of province is: ${areas}, reqUrl is now: ${reqUrl}`
    );
  }
  console.log(`After if statement, was it triggered? reqUrl is: ${reqUrl}`);
  let res = await fetch(reqUrl, {
    method: "GET",
  });
  console.log(`After await fetch. res: ${res}`);
  return await res.json();
}

module.exports = {
  getRegions,
  getAreas,
  getReport,
};

const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const covid19 = require("./modules/covid19/api");

dotenv.config();

// set up Express app
const app = express();
const port = process.env.PORT || 8888;

// set up Google Maps API key
const gMapsApiKey = 'AIzaSyCmC2lM7cdGuBIfXo3ec2RiCYVH0FYYuvU'; // Replace with your actual Google Maps API key

// important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// public folder setup
app.use(express.static(path.join(__dirname, "public")));

// PAGE ROUTES
// INDEX
// Allows user to select a country, which will then run getRegions() then show runs getAreas(regionIso) after selecting a country
app.get("/", async (req, res) => {
  let regionIso = req.query.regionIso;
  // console.log(regionIso);
  let regions = await covid19.getRegions();
  // console.log(regions);
  let areas = await covid19.getAreas(regionIso);
  // console.log(areas);
  res.render("index", {
    title: "Region Selector",
    regions: regions.data,
    regionIso: regionIso,
    areas: areas.data,
  });
  // console.log(regions.data[0].region.name);
  // console.log(regions.data[0].region.province);
  // console.log(regions.data[0].region.lat);
  // console.log(regions.data[0].region.long);
});

// After the selected province, with the regionISO and province, report will be displayed for that region with getReport()
app.get("/report", async (req, res) => {
  let regionIso = req.query.regionIso;
  let areas = req.query.area;
  // console.log(province);
  let report = await covid19.getReport(regionIso, areas);
  // console.log(report);
  // Pass Google Maps API to report view
  // console.log(res);
  res.render("report", {
    title: "COVID Report",
    report: report.data,
    // gMapsApiKey is for the Google Maps to be rendered to display the latitude/longitude of the selected area
    gMapsApiKey: gMapsApiKey,
  });
  // console.log(report.data[0].region.lat);
  // console.log(report.data[0].region.long);
});

// set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

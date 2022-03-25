const express = require('express');
const path = require("path");
const request = require('request');

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", express.static('dist/angular-example'));

app.use(function (req, res, next) {
    var filename = path.basename(req.url);
    var extension = path.extname(filename);
    console.log(req.method + " | " + req.url);
    next();
});


app.get("/api/ny-health-data", (appReq, appRes) => {
  let date = appReq.query.date;

  if(!date) {
    let dateObj = new Date();
    let month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0'); //months from 1-12
    let day = dateObj.getUTCDate().toString().padStart(2, '0');
    let year = dateObj.getUTCFullYear();
    date = year + "-" + month + "-" + day + "T00:00:00.000";
  }

  let url = "https://data.cityofnewyork.us/resource/rc75-m7u3.json?date_of_interest=" + date;
  let options = {json: true}; 

  console.log("Fetching data for: " + date);


  request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error);
    };

    if (!error && res.statusCode == 200) {
	    console.log("Data festched");
      if(body[0]) {
        console.log(body[0]);
        appRes.send(body[0]);
      } else {
        console.log("No data, using default");
        let defaultData = {
          date_of_interest: date,
          case_count: 0,
          probable_case_count: 0,
          hospitalized_count: 0,
          death_count: 0,
          death_count_probable: 0,
          case_count_7day_avg: 0,
          all_case_count_7day_avg: 0,
          hosp_count_7day_avg: 0,
          death_count_7day_avg: 0,
          all_death_count_7day_avg: 0
         };
        console.log(defaultData);
        appRes.send(defaultData);
      }
    } else {
	    console.log("Data error: " + statusCode);
	    appRes.send("Data error: " + statusCode);
    };
  }); 
});

app.listen(port, () => {
  console.log('Angular demo app listening on port ${port}');
});

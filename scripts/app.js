// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
let action = "http://earthquake.usgs.gov/fdsnws/event/1/query"

let onSuccess = function (results, status) {
  let title = results.features.forEach(function (earthquake) {
    console.log(earthquake.properties.title);
    let longitude = earthquake.geometry.coordinates[0];
    let latitude = earthquake.geometry.coordinates[1];
    let title = earthquake.properties.title;

    console.log(`longitude is ${longitude} degrees, latitude is ${latitude} degrees.`);
  });
  //let longitude = results.features[1].geometry.coordinates[0];
};

function getEarthquakeData () {
  $.ajax( {
    method: "GET",
    url: action,
    data: "format=geojson&starttime=2014-01-01&endtime=2014-01-02&minmagnitude=5",
    success: onSuccess
  })
}

$(document).ready(function() {
  console.log("Let's get coding!");
  let results = getEarthquakeData();

  //console.log(results.responseText);//.responseJSON.features[1].geometry.coordinates["0"]);
  //console.log(results);
})

// let onError:
//
// let onSuccess:


//ADD ALERT LEVEL COLORS

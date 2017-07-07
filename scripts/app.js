// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
let action = "http://earthquake.usgs.gov/fdsnws/event/1/query"
let results = getEarthquakeData()

function getEarthquakeData () {
  return $.ajax( {
    method: "GET",
    url: action,
    data: "format=geojson&starttime=2014-01-01&endtime=2014-01-02&minmagnitude=5"
  })
}

$(document).ready(function() {
  console.log("Let's get coding!");
})

// let onError:
//
// let onSuccess:


//ADD ALERT LEVEL COLORS

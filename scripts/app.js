// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
let action = "http://earthquake.usgs.gov/fdsnws/event/1/query"

let onSuccess = function(results, status) {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.78,
      lng: -122.44
    }, //Future Customization Option
    zoom: 3
  });

  let title = results.features.forEach(function(earthquake) {
    console.log(earthquake.properties.title);
    let longitude = earthquake.geometry.coordinates[0];
    let latitude = earthquake.geometry.coordinates[1];
    let title = earthquake.properties.title;
    let marker = new google.maps.Marker({
      position: {
        lat: latitude,
        lng: longitude
      },
      map: map
    })

    $("#info").append(`<li>${title} (${longitude}, ${latitude})</li>`);

    console.log(`longitude is ${longitude} degrees, latitude is ${latitude} degrees.`);
  });

};

function getTime (ms) {
  let now = new Date(ms);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day = now.getDate();
  if (day < 10) day = '0' + day;
  console.log(year, month, day);
  return `${year}-${month}-${day}`;
}

const endtime = getTime(Date.now());
const starttime = getTime(Date.now() - 604800000);

function getEarthquakeData() {
  $.ajax({
    method: "GET",
    url: action,

    data: {
      format: "geojson",
      endtime: getTime(endtime),
      starttime: getTime(starttime),  // number of ms in a week
      minmagnitude: 4
    },

    success: onSuccess,
    //data: "format=geojson&starttime=2014-10-01&endtime=2015-01-02&minmagnitude=5"
  });
}

$(document).ready(function() {
  console.log("Let's get coding!");

  let x = getEarthquakeData();
  console.log(x);

})

// let onError:
//
// let onSuccess:


//ADD ALERT LEVEL COLORS

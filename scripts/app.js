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

function getEarthquakeData() {
  $.ajax({
    method: "GET",
    url: action,
    data: "format=geojson&starttime=2014-10-01&endtime=2015-01-02&minmagnitude=5",
    success: onSuccess
  })
}

$(document).ready(function() {
  console.log("Let's get coding!");

  getEarthquakeData();


})

// let onError:
//
// let onSuccess:


//ADD ALERT LEVEL COLORS

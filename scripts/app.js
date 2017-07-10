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
  
  let styledMapType = new google.maps.StyledMapType (
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "stylers": [
          {
            "color": "#ffeb3b"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ]
  )

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId( 'styled_map')

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

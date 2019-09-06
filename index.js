
mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  zoom: 10.7,
  center: [-83.060303, 42.348495]
});

let baseUrl = 'https://apis.detroitmi.gov/';
function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {};
  // Because features come from tiled vector data, feature geometries may be split
  // or duplicated across tile boundaries and, as a result, features may appear
  // multiple times in query results.
  var uniqueFeatures = array.filter(function(el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false;
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true;
    }
  });

  return uniqueFeatures;
}

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

map.on('load', function() {
  map.addLayer({
    "id": "zip_codes",
    "type": "fill",
    "source": {
      type: 'vector',
      url: 'mapbox://cityofdetroit.7u1xneot' //city of detroit tiles
    },
    "source-layer": "zip_codes-c4kt15",
    "paint": {
      'fill-color': 'rgba(200, 100, 240, 0.0)',
      'fill-outline-color': "#ff69b4"
    }
  });

  map.addLayer({
    "id": "ems",
    "type": "line",
    "source": {
      type: 'vector',
      url: 'mapbox://cityofdetroit.8667lu5o' // city of detroit ems alerts
    },
    "source-layer": "Zones-4pbuzw",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      "line-color": "blue",
      "line-width": 1
    }

  });

  var data1 = {
    "type": "FeatureCollection",
    "features": []
  };
  var feature = {
    "type": "Feature",
    "properties": {
      "description": "",
      "zipcode": ""
    },
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        []
      ]
    }
  };

  map.addSource('zipcode_fill', {
    type: 'geojson',
    data: data1
  });
  map.addLayer({
    "id": "zip_codes_fill",
    "type": "fill",
    "source": "zipcode_fill",
    "paint": {
      'fill-color': 'rgba(200, 100, 240, 0.4)',
      // 'fill-outline-color': 'rgba(200, 100, 240, 1)'
    }
  });
  
  // geocoder for address search
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
     
    // limit results to North America
    countries: 'us',
     
    // further limit results to the geographic bounds representing the region of
    // Detroit Michigan
    bbox: [-83.3437,42.2102,-82.8754,42.5197],
     
    // apply a client side filter to further limit results to those strictly within
    // the New South Wales region
    filter: function (item) {
    // returns true if item contains New South Wales region
    return item.context.map(function (i) {
    // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
    // this example attempts to find the `region` named `Detroit Michigan`
    return (i.id.split('.').shift() === 'region' && i.text === 'Michigan');
    }).reduce(function (acc, cur) {
    return acc || cur;
    });
    },
    mapboxgl: mapboxgl
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
    
     
    // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
  });
// geocoder ends 
// POST API for the user to subscribe for phone alerts
//https://apis.detroitmi.gov/messenger/clients/
//http://apis.detroitmi.gov/messenger/clients/<client id>/subscribe/
//http://apis.detroitmi.gov/messenger/clients/1/subscribe/
// Add API data to populate the map // GET
  map.on('render',"zip_codes" , function() {
    var features = map.queryRenderedFeatures({
      layers: ['zip_codes']
    });
    //console.log(features);
    if (features) {
      var uniqueFeatures = getUniqueFeatures(features, "zipcode");
      document.getElementById("zipmessage").innerHTML = '';
      //console.log(uniqueFeatures)
      //console.log(data.location.value);
      var zipcodes = null;
   // location APi contains of list of zipcode and ems zones
      fetch(baseUrl + '/messenger/locations/').then(resp => resp.json()).then((data)=> {
        //console.log(data);
        zipcodes = data;
        //console.log(zipcodes)
        var filtered = uniqueFeatures.filter(function(feature) {
          var zipcode = feature.properties.zipcode;
          return zipcodes.zipcode.values.indexOf(zipcode) > -1;
        });
        filtered.forEach(f => {
          var url = baseUrl + '/messenger/clients/1/locations/zipcode/' + String(f.properties.zipcode) + '/notifications/';
          fetch(url, {
              mode: 'cors'
            })
            .then(resp => resp.json()) // Transform the data into json
            .then((data) => {
              //console.log(data);
              if (data.notifications.length > 0) {
                feature.properties.zipcode = data.location.value;
                feature.properties.description = data.notifications[0].messages[0].message;
                feature.geometry.coordinates = f.geometry.coordinates;
                if (data1.features.indexOf(feature) == -1) {
                  data1.features.push(feature);
                  map.getSource('zipcode_fill').setData(data1);

                }
              }
            })
        })
      })
     data1.features.forEach(f => {
      popup.setLngLat(f.geometry.coordinates[0][0])
        .setHTML(f.properties.description)
        .addTo(map);
      document.getElementById("zipmessage").innerHTML = document.getElementById("zipmessage").innerHTML + '<Br/>' + 'Zipcode: ' + f.properties.zipcode + '<Br/>' + f.properties.description;
    })
    }
  })
});
function postData(url = '', data = {}) {
  // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()).then(data =>
    {
      //console.log(data)
      if(data.error){
        document.getElementById('message').innerHTML = data.error
      }else {
        document.getElementById('message').innerHTML = data.message//add code here to popup success
      }
    }); // parses JSON response into native JavaScript objects
}

function subscribe(){
 
  url = 'http://apis.detroitmi.gov/messenger/clients/1/subscribe/';
  data = {
    "phone_number": String(document.getElementById('telephone').value),
    "address": String(document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value)
  }
  postData(url,data);
}

function openNav() {
  document.getElementById("mySidebar").style.width = "450px";
  document.getElementById("main").style.marginLeft = "450px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
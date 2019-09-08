
import {openNav,closeNav} from './components/function.js'
import {subscribe} from './components/signup.js'
//load map

  mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 10.7,
    center: [-83.060303, 42.348495]
  });

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

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
  });
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
    }); //zip_codes : all zipcodes type fill with ouline pink

    map.addLayer({
      "id": "ems",
      "type": "fill",
      "source": {
        type: 'vector',
        url: 'mapbox://cityofdetroit.8667lu5o' // city of detroit ems alerts
      },
      "source-layer": "Zones-4pbuzw",
      "paint": {
        'fill-color': 'rgba(200, 100, 240, 0.0)',
        'fill-outline-color': "blue"
      }

    }); //ems: all zones with blue color outline type fill

    var data1 = {
      "type": "FeatureCollection",
      "features": []
    }; // this is the sourcedata to fill the zipcodes polygons

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
    }; // Features template for data1 datasource

    map.addSource('zipcode_fill', {
      type: 'geojson',
      data: data1
    }); //this is the data source to fill the zipcodes polygons

    map.addLayer({
      "id": "zip_codes_fill",
      "type": "fill",
      "source": "zipcode_fill",
      "paint": {
        'fill-color': 'rgba(200, 100, 240, 0.4)',
        'fill-outline-color': 'rgba(200, 100, 240, 1)'
      }
    }); // this is a layer of filled polygon of zipcodes

    // geocoder for address search
    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,

      // limit results to North America
      countries: 'us',

      // further limit results to the geographic bounds representing the region of
      // Detroit Michigan
      bbox: [-83.3437, 42.2102, -82.8754, 42.5197],

      // apply a client side filter to further limit results to those strictly within
      // the detroit michigan region
      filter: function(item) {
        // returns true if item contains the detroit michigan region
        return item.context.map(function(i) {
          // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          // this example attempts to find the `region` named `Detroit Michigan`
          return (i.id.split('.').shift() === 'region' && i.text === 'Michigan');
        }).reduce(function(acc, cur) {
          return acc || cur;
        });
      },
      mapboxgl: mapboxgl
    });
    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


    // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    // geocoder ends
    // Add API data to populate the map

    var map_loaded = 0;
    map.on('render', "zip_codes", function() {
      if (map_loaded == 0) {
        map_loaded = 1;
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
          fetch('https://apis.detroitmi.gov/messenger/locations/').then(resp => resp.json()).then((data) => {
            //console.log(data);
            zipcodes = data;
            //console.log(zipcodes)
            var filtered = uniqueFeatures.filter(function(feature) {
              var zipcode = feature.properties.zipcode;
              return zipcodes.zipcode.values.indexOf(zipcode) > -1;
            });
            filtered.forEach(f => {
              var url = 'https://apis.detroitmi.gov/messenger/clients/1/locations/zipcode/' + String(f.properties.zipcode) + '/notifications/';
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
                }) // then data
            }) // adding features with notifications to datasource

          }) // fetch locations
        } //if feature
      } // if map loaded
    }) // on render

    var zipmessageadded = [];
    map.on('data', 'zip_codes_fill', function() {

      data1.features.forEach(f => {
        popup.setLngLat(f.geometry.coordinates[0][0])
          .setHTML(f.properties.description)
          .addTo(map);
        if (zipmessageadded.indexOf(f.properties.zipcode) == -1) {
          zipmessageadded.push(f.properties.zipcode);
          document.getElementById("zipmessage").innerHTML = document.getElementById("zipmessage").innerHTML + '<Br/>' + 'Zipcode: ' + f.properties.zipcode + '<Br/>' + f.properties.description;
        }

      }) // for popup
    })

  }); // map on load

(function init(){
  document.getElementById("openSidebar").addEventListener("click", openNav);
  document.getElementById("closeSidebar").addEventListener("click", closeNav);
  document.getElementById("subscribe").addEventListener("click", subscribe);
})();

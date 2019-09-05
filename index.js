import Model from "./components/model.class"
mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 10.7,
    center: [-83.060303,42.348495]
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

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

map.on('load', function () {
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
  var  data1 = { "type": "FeatureCollection",
                      "features": []
                  };
 var feature = {
   "type": "Feature",
   "properties": {
   "description": "",
   "zipcode": ""
 },
 "geometry":{
   "type": "Polygon",
   "coordinates":[[]]
 }
};
    map.addSource('zipcode_fill', { type: 'geojson', data: data1 });
    map.addLayer({
                    "id": "zip_codes_fill",
                    "type": "fill",
                    "source": "zipcode_fill",
                    "paint": {
                            'fill-color': 'rgba(200, 100, 240, 0.4)',
                            'fill-outline-color': 'rgba(200, 100, 240, 1)'
                          }
    });


    const popup = new mapboxgl.Popup({
       closeButton: false,
       closeOnClick: true
    });

    map.on('mouseenter', 'zip_codes', function () {
    map.getCanvas().style.cursor = 'pointer';

    var features = map.queryRenderedFeatures({ layers: ['zip_codes'] });
    //console.log(features);
    if (features) {
      var uniqueFeatures = getUniqueFeatures(features, "zipcode");
      document.getElementById("zipmessage").innerHTML = '';
      //console.log(uniqueFeatures)
      //console.log(data.location.value);
      uniqueFeatures.forEach(f => {
        var url = 'https://apis.detroitmi.gov/messenger/clients/1/locations/'+ String(f.properties.zipcode)+'/notifications/';
        fetch(url, { mode: 'cors' })
          .then(resp => resp.json()) // Transform the data into json
          .then((data) => {
             console.log(data);
             if(data.location.value)
                 {
                  //console.log(f)
                  //console.log(data1)
                  //console.log(data.notifications)
                 feature.properties.zipcode = data.location.value;
                 feature.properties.description = data.notifications[0].messages[0].message;
                 feature.geometry.coordinates = f.geometry.coordinates;

                 data1.features.push(feature);
                 //console.log(f.geometry.coordinates[0][0]);
                 map.getSource('zipcode_fill').setData(data1);
                 popup.setLngLat(data1.features[0].geometry.coordinates[0][0])
                     .setHTML(data1.features[0].properties.description)
                     .addTo(map);

                document.getElementById("zipmessage").innerHTML = document.getElementById("zipmessage").innerHTML + '<Br/>' + 'Zipcode: '+data.location.value +'<Br/>'+data1.features[0].properties.description;
               }
          });


      })
    }

    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'zip_codes', function () {
    map.getCanvas().style.cursor = '';
    });


});

function openNav() {
    document.getElementById("mySidebar").style.width = "450px";
    document.getElementById("main").style.marginLeft = "450px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}
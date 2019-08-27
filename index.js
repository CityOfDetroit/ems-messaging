import Controller from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 9,
    center: [-83.3437, 42.2102]
});
map.on('load', function () {
    map.addLayer({
        "id": "zip_codes",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://cityofdetroit.7u1xneot'
        },
        "source-layer": "zip_codes-c4kt15",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff69b4",
            "line-width": 1
        }
    });
    map.addLayer({
        "id": "ems",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://cityofdetroit.8667lu5o'
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

    })
});
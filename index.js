import Controller from 'mapbox-gl';
// import Map from './components/map.class';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWVycmFiZWxseSIsImEiOiJjanpzdzEyanMwMDBxM25wZDdtdTl6bXB0In0.Imty6rsC039crf94Upmp-Q';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-82.8754, 42.5197], // starting position [lng, lat]
    zoom: 11 // starting zoom
});
map.on('load', function () {
    map.addLayer({
        "id": "terrain-data",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://cityofdetroit.7u1xneot'
        },
        "source-layer": "contour",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff69b4",
            "line-width": 1
        }
    });
});

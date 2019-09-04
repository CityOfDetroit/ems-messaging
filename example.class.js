mapboxgl.accessToken = '@Model.MapboxAccessToken';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9'
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

map.on('load', () => {
    map.addSource("airports",
        {
            type: "geojson",
            data: "?handler=airports",
            cluster: true, // Enable clustering
            clusterRadius: 50, // Radius of each cluster when clustering points
            clusterMaxZoom: 6 // Max zoom to cluster points on
        });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'airports',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': {
                property: 'point_count',
                type: 'interval',
                stops: [
                    [0, '#41A337'],
                    [100, '#2D7026'],
                    [750, '#0B5703'],
                ]
            },
            'circle-radius': {
                property: 'point_count',
                type: 'interval',
                stops: [
                    [0, 20],
                    [100, 30],
                    [750, 40]
                ]
            }
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'airports',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'airport',
        type: 'circle',
        source: 'airports',
        filter: ['!has', 'point_count'],
        paint: {
            'circle-color': '#1EF008',
            'circle-radius': 6,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });

    map.on('mouseenter', 'airport', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.name)
            .addTo(map);
    });

    map.on('mouseleave', 'airport', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

    map.on('click', 'airport', e => {
        var name = e.features[0].properties.name;
        var iataCode = e.features[0].properties.iataCode;

        // Display airport info
        document.querySelector('#airport-name').innerText = name + " (" + iataCode + ")";

        // Ensure the info box is visible
        document.querySelector('#info-card').style.display = '';
    });
});

document.querySelector('#info-card-close-button').addEventListener('click', function(event) {
    document.querySelector('#info-card').style.display = 'none';
});
import Model from "./components/model.class"
mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 11,
    center: [-83.060303,42.348495]
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'bottom-right');

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

    });
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });
    map.on('mouseenter', 'zip_codes', function(e){
        map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(e.features[0].properties.name)
            console.log(name +" name")
            .addTo(map);
    });
    map.on('mouseleave', 'zip_codes', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    map.on('click', 'zip_codes', e => {
        var name = e.features[0].properties.name;
        console.log(iataCode +"e.features[0].properties.name");



        // Ensure the info box is visible
        document.querySelector('.card').style.display = '';
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


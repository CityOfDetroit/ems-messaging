// 'use strict';
// import mapboxgl from 'mapbox-gl';
// var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
// mapboxgl.accessToken = 'pk.eyJ1IjoiYWVycmFiZWxseSIsImEiOiJjanpzaHYzeWcwNDFmM25wYzdvOW9pODdqIn0.opdUi9_xqT1oHDNHXu1iyQ';
// export default class Map {
//     constructor(init) {
//       if(init.geocoder){
//         this.geocoder = new MapboxGeocoder({
//           accessToken: mapboxgl.accessToken,
//           bbox: [-83.3437,42.2102,-82.8754,42.5197],
//           placeholder: "Enter your address",
//           flyTo: false,
//         });
//       }
//       this.prevState = null;
//     this.currentState = {
//       baseMap: init.baseLayers.street,
//       center: init.center,
//       zoom: init.zoom,
//       layers: init.layers,
//       sources: init.sources
//     };
//     this.mapContainer = init.mapContainer;
//     this.map = new mapboxgl.Map({
//       container: init.mapContainer, // container id
//       style: `${init.styleURL}/${init.baseLayers.street}`, //stylesheet location
//       center: init.center, // starting position
//       zoom: init.zoom, // starting zoom
//       keyboard: true
//     });
//     this.styleURL = init.styleURL;
//     this.baseLayers = {
//       street: init.baseLayers.street,
//       satellite: init.baseLayers.satellite
//     };
//     this.boundaries = {
//       southwest: init.boundaries.sw,
//       northeast: init.boundaries.ne,
//     };
//     this.map.on('load',()=>{
//       if(init.geocoder)
//         document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map))
//     });
//     this.map.on('style.load',()=>{
//       this.loadMap();
//     });
//     }
// }
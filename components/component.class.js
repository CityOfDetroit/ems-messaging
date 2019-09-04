'use strict';
import Map from './map.class.js';
export default class Component {
    constructor(container) {
        this.geocoderOff = false;
        this.scoutVolunteers = null;
        this.map = new Map({
            styleURL: 'mapbox://styles/mapbox',
            mapContainer: 'map',
            geocoder: false,
            baseLayers: {
                street: 'streets-v10',
                satellite: 'cj774gftq3bwr2so2y6nqzvz4'
            },
            center: [-83.10, 42.36],
            zoom: 11,
            boundaries: {
                sw: [-83.3437, 42.2102],
                ne: [-82.8754, 42.5197]
            }
        })
    }
}




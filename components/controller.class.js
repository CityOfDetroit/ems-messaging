import Model from './model.class';
export class Component{
    constructor(container){
        this.geocoderOff = false;
        this.scoutVolunteers = null;
        this.map = new Map({
            styleURL: 'mapbox://styles/mapbox',
            mapContainer: 'map',
            baseLayers: {
                street: 'streets-v10',
                satellite: 'cj774gftq3bwr2so2y6nqzvz4'
            },
            center: [-83.10, 42.36],
            zoom: 11,
            boundaries: {
                sw: [-83.3437,42.2102],
                ne: [-82.8754,42.5197]
            },
            layers: [
                {
                    "id": "zip_codes",
                    "type": "line",
                    "source": {
                        type: 'vector',
                        url: 'mapbox://cityofdetroit.7u1xneot' //city of detroit tiles
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
                },
                {
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

                }
            ]
        });
        this.model = new Model(container);
    }
}
// fetch('https://apis.detroitmi.gov/messenger/clients/1/locations/48214/notifications/')
// //     .then(resp => resp.json())
// //
// //     .then((data) => {
// //         if (data && data.length) {
// //             console.log("data results" + data.length);
// //         }
// //     }).catch((error) => console.error(error));
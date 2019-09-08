// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"components/function.js":[function(require,module,exports) {
exports.openNav = function () {
  document.getElementById("mySidebar").style.width = "450px";
  document.getElementById("main").style.marginLeft = "450px";
};

exports.closeNav = function () {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};
},{}],"components/signup.js":[function(require,module,exports) {
function postData() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // Default options are marked with *
  return fetch(url, {
    method: 'POST',
    // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
    // no-cors, cors, *same-origin
    cache: 'no-cache',
    // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',
    // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',

    },
    redirect: 'follow',
    // manual, *follow, error
    referrer: 'no-referrer',
    // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header

  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    //console.log(data)
    if (data.error) {
      document.getElementById('message').innerHTML = data.error;
    } else {
      document.getElementById('message').innerHTML = data.message; //add code here to popup success
    }
  }); // parses JSON response into native JavaScript objects
}

exports.subscribe = function () {
  //selectedclient = document.getElementById('clients').value;
  url = 'http://apis.detroitmi.gov/messenger/clients/' + '1' + //selectedclient+
  '/subscribe/';
  data = {
    "phone_number": String(document.getElementById('email').value),
    "address": String(document.getElementsByClassName('mapboxgl-ctrl-geocoder--input')[0].value)
  };
  postData(url, data);
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _function = require("./components/function.js");

var _signup = require("./components/signup.js");

//load map
mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdCIsImEiOiJjajd3MGlodXIwZ3piMnhudmlzazVnNm44In0.BL29_7QRvcnOrVuXX_hD9A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  zoom: 10.7,
  center: [-83.060303, 42.348495]
});

function getUniqueFeatures(array, comparatorProperty) {
  var existingFeatureKeys = {}; // Because features come from tiled vector data, feature geometries may be split
  // or duplicated across tile boundaries and, as a result, features may appear
  // multiple times in query results.

  var uniqueFeatures = array.filter(function (el) {
    if (existingFeatureKeys[el.properties[comparatorProperty]]) {
      return false;
    } else {
      existingFeatureKeys[el.properties[comparatorProperty]] = true;
      return true;
    }
  });
  return uniqueFeatures;
}

var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: true
});
var nav = new mapboxgl.NavigationControl();
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
      "coordinates": [[]]
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
    filter: function filter(item) {
      // returns true if item contains the detroit michigan region
      return item.context.map(function (i) {
        // id is in the form {index}.{id} per https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
        // this example attempts to find the `region` named `Detroit Michigan`
        return i.id.split('.').shift() === 'region' && i.text === 'Michigan';
      }).reduce(function (acc, cur) {
        return acc || cur;
      });
    },
    mapboxgl: mapboxgl
  });
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map)); // document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  // geocoder ends
  // Add API data to populate the map

  var map_loaded = 0;
  map.on('render', "zip_codes", function () {
    if (map_loaded == 0) {
      map_loaded = 1;
      var features = map.queryRenderedFeatures({
        layers: ['zip_codes']
      }); //console.log(features);

      if (features) {
        var uniqueFeatures = getUniqueFeatures(features, "zipcode");
        document.getElementById("zipmessage").innerHTML = ''; //console.log(uniqueFeatures)
        //console.log(data.location.value);

        var zipcodes = null; // location APi contains of list of zipcode and ems zones

        fetch('https://apis.detroitmi.gov/messenger/locations/').then(function (resp) {
          return resp.json();
        }).then(function (data) {
          //console.log(data);
          zipcodes = data; //console.log(zipcodes)

          var filtered = uniqueFeatures.filter(function (feature) {
            var zipcode = feature.properties.zipcode;
            return zipcodes.zipcode.values.indexOf(zipcode) > -1;
          });
          filtered.forEach(function (f) {
            var url = 'https://apis.detroitmi.gov/messenger/clients/1/locations/zipcode/' + String(f.properties.zipcode) + '/notifications/';
            fetch(url, {
              mode: 'cors'
            }).then(function (resp) {
              return resp.json();
            }) // Transform the data into json
            .then(function (data) {
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
            }); // then data
          }); // adding features with notifications to datasource
        }); // fetch locations
      } //if feature

    } // if map loaded

  }); // on render

  var zipmessageadded = [];
  map.on('data', 'zip_codes_fill', function () {
    data1.features.forEach(function (f) {
      popup.setLngLat(f.geometry.coordinates[0][0]).setHTML(f.properties.description).addTo(map);

      if (zipmessageadded.indexOf(f.properties.zipcode) == -1) {
        zipmessageadded.push(f.properties.zipcode);
        document.getElementById("zipmessage").innerHTML = document.getElementById("zipmessage").innerHTML + '<Br/>' + 'Zipcode: ' + f.properties.zipcode + '<Br/>' + f.properties.description;
      }
    }); // for popup
  });
}); // map on load

(function init() {
  document.getElementById("openSidebar").addEventListener("click", _function.openNav);
  document.getElementById("closeSidebar").addEventListener("click", _function.closeNav);
  document.getElementById("subscribe").addEventListener("click", _signup.subscribe);
})();
},{"./components/function.js":"components/function.js","./components/signup.js":"components/signup.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52243" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/ems-messaging.e31bb0bc.js.map
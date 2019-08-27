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
})({"node_modules/mapbox-gl/dist/mapbox-gl.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Mapbox GL JS is licensed under the 3-Clause BSD License. Full text of license: https://github.com/mapbox/mapbox-gl-js/blob/v1.2.1/LICENSE.txt */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.mapboxgl = factory());
})(this, function () {
  'use strict';
  /* eslint-disable */

  var shared, worker, mapboxgl; // define gets called three times: one for each chunk. we rely on the order
  // they're imported to know which is which

  function define(_, chunk) {
    if (!shared) {
      shared = chunk;
    } else if (!worker) {
      worker = chunk;
    } else {
      var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);';
      var sharedChunk = {};
      shared(sharedChunk);
      mapboxgl = chunk(sharedChunk);
      mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], {
        type: 'text/javascript'
      }));
    }
  }

  define(["exports"], function (t) {
    "use strict";

    function e(t, e) {
      return t(e = {
        exports: {}
      }, e.exports), e.exports;
    }

    var r = n;

    function n(t, e, r, n) {
      this.cx = 3 * t, this.bx = 3 * (r - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (n - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = n, this.p2x = r, this.p2y = n;
    }

    n.prototype.sampleCurveX = function (t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    }, n.prototype.sampleCurveY = function (t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    }, n.prototype.sampleCurveDerivativeX = function (t) {
      return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
    }, n.prototype.solveCurveX = function (t, e) {
      var r, n, i, a, o;

      for (void 0 === e && (e = 1e-6), i = t, o = 0; o < 8; o++) {
        if (a = this.sampleCurveX(i) - t, Math.abs(a) < e) return i;
        var s = this.sampleCurveDerivativeX(i);
        if (Math.abs(s) < 1e-6) break;
        i -= a / s;
      }

      if ((i = t) < (r = 0)) return r;
      if (i > (n = 1)) return n;

      for (; r < n;) {
        if (a = this.sampleCurveX(i), Math.abs(a - t) < e) return i;
        t > a ? r = i : n = i, i = .5 * (n - r) + r;
      }

      return i;
    }, n.prototype.solve = function (t, e) {
      return this.sampleCurveY(this.solveCurveX(t, e));
    };
    var i = a;

    function a(t, e) {
      this.x = t, this.y = e;
    }

    function o(t, e) {
      if (Array.isArray(t)) {
        if (!Array.isArray(e) || t.length !== e.length) return !1;

        for (var r = 0; r < t.length; r++) {
          if (!o(t[r], e[r])) return !1;
        }

        return !0;
      }

      if ("object" == _typeof(t) && null !== t && null !== e) {
        if ("object" != _typeof(e)) return !1;
        if (Object.keys(t).length !== Object.keys(e).length) return !1;

        for (var n in t) {
          if (!o(t[n], e[n])) return !1;
        }

        return !0;
      }

      return t === e;
    }

    function s(t, e, n, i) {
      var a = new r(t, e, n, i);
      return function (t) {
        return a.solve(t);
      };
    }

    a.prototype = {
      clone: function () {
        return new a(this.x, this.y);
      },
      add: function (t) {
        return this.clone()._add(t);
      },
      sub: function (t) {
        return this.clone()._sub(t);
      },
      multByPoint: function (t) {
        return this.clone()._multByPoint(t);
      },
      divByPoint: function (t) {
        return this.clone()._divByPoint(t);
      },
      mult: function (t) {
        return this.clone()._mult(t);
      },
      div: function (t) {
        return this.clone()._div(t);
      },
      rotate: function (t) {
        return this.clone()._rotate(t);
      },
      rotateAround: function (t, e) {
        return this.clone()._rotateAround(t, e);
      },
      matMult: function (t) {
        return this.clone()._matMult(t);
      },
      unit: function () {
        return this.clone()._unit();
      },
      perp: function () {
        return this.clone()._perp();
      },
      round: function () {
        return this.clone()._round();
      },
      mag: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      },
      equals: function (t) {
        return this.x === t.x && this.y === t.y;
      },
      dist: function (t) {
        return Math.sqrt(this.distSqr(t));
      },
      distSqr: function (t) {
        var e = t.x - this.x,
            r = t.y - this.y;
        return e * e + r * r;
      },
      angle: function () {
        return Math.atan2(this.y, this.x);
      },
      angleTo: function (t) {
        return Math.atan2(this.y - t.y, this.x - t.x);
      },
      angleWith: function (t) {
        return this.angleWithSep(t.x, t.y);
      },
      angleWithSep: function (t, e) {
        return Math.atan2(this.x * e - this.y * t, this.x * t + this.y * e);
      },
      _matMult: function (t) {
        var e = t[0] * this.x + t[1] * this.y,
            r = t[2] * this.x + t[3] * this.y;
        return this.x = e, this.y = r, this;
      },
      _add: function (t) {
        return this.x += t.x, this.y += t.y, this;
      },
      _sub: function (t) {
        return this.x -= t.x, this.y -= t.y, this;
      },
      _mult: function (t) {
        return this.x *= t, this.y *= t, this;
      },
      _div: function (t) {
        return this.x /= t, this.y /= t, this;
      },
      _multByPoint: function (t) {
        return this.x *= t.x, this.y *= t.y, this;
      },
      _divByPoint: function (t) {
        return this.x /= t.x, this.y /= t.y, this;
      },
      _unit: function () {
        return this._div(this.mag()), this;
      },
      _perp: function () {
        var t = this.y;
        return this.y = this.x, this.x = -t, this;
      },
      _rotate: function (t) {
        var e = Math.cos(t),
            r = Math.sin(t),
            n = e * this.x - r * this.y,
            i = r * this.x + e * this.y;
        return this.x = n, this.y = i, this;
      },
      _rotateAround: function (t, e) {
        var r = Math.cos(t),
            n = Math.sin(t),
            i = e.x + r * (this.x - e.x) - n * (this.y - e.y),
            a = e.y + n * (this.x - e.x) + r * (this.y - e.y);
        return this.x = i, this.y = a, this;
      },
      _round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      }
    }, a.convert = function (t) {
      return t instanceof a ? t : Array.isArray(t) ? new a(t[0], t[1]) : t;
    };
    var u = s(.25, .1, .25, 1);

    function l(t, e, r) {
      return Math.min(r, Math.max(e, t));
    }

    function p(t, e, r) {
      var n = r - e,
          i = ((t - e) % n + n) % n + e;
      return i === e ? r : i;
    }

    function c(t) {
      for (var e = [], r = arguments.length - 1; r-- > 0;) {
        e[r] = arguments[r + 1];
      }

      for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];

        for (var o in a) {
          t[o] = a[o];
        }
      }

      return t;
    }

    var h = 1;

    function f() {
      return h++;
    }

    function y() {
      return function t(e) {
        return e ? (e ^ 16 * Math.random() >> e / 4).toString(16) : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, t);
      }();
    }

    function d(t) {
      return !!t && /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t);
    }

    function m(t, e) {
      t.forEach(function (t) {
        e[t] && (e[t] = e[t].bind(e));
      });
    }

    function v(t, e) {
      return -1 !== t.indexOf(e, t.length - e.length);
    }

    function g(t, e, r) {
      var n = {};

      for (var i in t) {
        n[i] = e.call(r || this, t[i], i, t);
      }

      return n;
    }

    function x(t, e, r) {
      var n = {};

      for (var i in t) {
        e.call(r || this, t[i], i, t) && (n[i] = t[i]);
      }

      return n;
    }

    function b(t) {
      return Array.isArray(t) ? t.map(b) : "object" == _typeof(t) && t ? g(t, b) : t;
    }

    var _ = {};

    function w(t) {
      _[t] || ("undefined" != typeof console && console.warn(t), _[t] = !0);
    }

    function A(t, e, r) {
      return (r.y - t.y) * (e.x - t.x) > (e.y - t.y) * (r.x - t.x);
    }

    function k(t) {
      for (var e = 0, r = 0, n = t.length, i = n - 1, a = void 0, o = void 0; r < n; i = r++) {
        a = t[r], e += ((o = t[i]).x - a.x) * (a.y + o.y);
      }

      return e;
    }

    function S(t) {
      var e = {};

      if (t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g, function (t, r, n, i) {
        var a = n || i;
        return e[r] = !a || a.toLowerCase(), "";
      }), e["max-age"]) {
        var r = parseInt(e["max-age"], 10);
        isNaN(r) ? delete e["max-age"] : e["max-age"] = r;
      }

      return e;
    }

    function z(t) {
      try {
        var e = self[t];
        return e.setItem("_mapbox_test_", 1), e.removeItem("_mapbox_test_"), !0;
      } catch (t) {
        return !1;
      }
    }

    var I,
        B,
        C,
        E,
        M = self.performance && self.performance.now ? self.performance.now.bind(self.performance) : Date.now.bind(Date),
        T = self.requestAnimationFrame || self.mozRequestAnimationFrame || self.webkitRequestAnimationFrame || self.msRequestAnimationFrame,
        P = self.cancelAnimationFrame || self.mozCancelAnimationFrame || self.webkitCancelAnimationFrame || self.msCancelAnimationFrame,
        V = {
      now: M,
      frame: function (t) {
        var e = T(t);
        return {
          cancel: function () {
            return P(e);
          }
        };
      },
      getImageData: function (t) {
        var e = self.document.createElement("canvas"),
            r = e.getContext("2d");
        if (!r) throw new Error("failed to create canvas 2d context");
        return e.width = t.width, e.height = t.height, r.drawImage(t, 0, 0, t.width, t.height), r.getImageData(0, 0, t.width, t.height);
      },
      resolveURL: function (t) {
        return I || (I = self.document.createElement("a")), I.href = t, I.href;
      },
      hardwareConcurrency: self.navigator.hardwareConcurrency || 4,

      get devicePixelRatio() {
        return self.devicePixelRatio;
      },

      get prefersReducedMotion() {
        return !!self.matchMedia && (null == B && (B = self.matchMedia("(prefers-reduced-motion: reduce)")), B.matches);
      }

    },
        F = {
      API_URL: "https://api.mapbox.com",

      get EVENTS_URL() {
        return this.API_URL ? 0 === this.API_URL.indexOf("https://api.mapbox.cn") ? "https://events.mapbox.cn/events/v2" : 0 === this.API_URL.indexOf("https://api.mapbox.com") ? "https://events.mapbox.com/events/v2" : null : null;
      },

      FEEDBACK_URL: "https://apps.mapbox.com/feedback",
      REQUIRE_ACCESS_TOKEN: !0,
      ACCESS_TOKEN: null,
      MAX_PARALLEL_IMAGE_REQUESTS: 16
    },
        L = {
      supported: !1,
      testSupport: function (t) {
        if (D || !E) return;
        O ? R(t) : C = t;
      }
    },
        D = !1,
        O = !1;

    function R(t) {
      var e = t.createTexture();
      t.bindTexture(t.TEXTURE_2D, e);

      try {
        if (t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, E), t.isContextLost()) return;
        L.supported = !0;
      } catch (t) {}

      t.deleteTexture(e), D = !0;
    }

    self.document && ((E = self.document.createElement("img")).onload = function () {
      C && R(C), C = null, O = !0;
    }, E.onerror = function () {
      D = !0, C = null;
    }, E.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");
    var U = "01";

    var j = function (t, e) {
      this._transformRequestFn = t, this._customAccessToken = e, this._createSkuToken();
    };

    function q(t) {
      return 0 === t.indexOf("mapbox:");
    }

    j.prototype._createSkuToken = function () {
      var t = function () {
        for (var t = "", e = 0; e < 10; e++) {
          t += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(62 * Math.random())];
        }

        return {
          token: ["1", U, t].join(""),
          tokenExpiresAt: Date.now() + 432e5
        };
      }();

      this._skuToken = t.token, this._skuTokenExpiresAt = t.tokenExpiresAt;
    }, j.prototype._isSkuTokenExpired = function () {
      return Date.now() > this._skuTokenExpiresAt;
    }, j.prototype.transformRequest = function (t, e) {
      return this._transformRequestFn && this._transformRequestFn(t, e) || {
        url: t
      };
    }, j.prototype.normalizeStyleURL = function (t, e) {
      if (!q(t)) return t;
      var r = G(t);
      return r.path = "/styles/v1" + r.path, this._makeAPIURL(r, this._customAccessToken || e);
    }, j.prototype.normalizeGlyphsURL = function (t, e) {
      if (!q(t)) return t;
      var r = G(t);
      return r.path = "/fonts/v1" + r.path, this._makeAPIURL(r, this._customAccessToken || e);
    }, j.prototype.normalizeSourceURL = function (t, e) {
      if (!q(t)) return t;
      var r = G(t);
      return r.path = "/v4/" + r.authority + ".json", r.params.push("secure"), this._makeAPIURL(r, this._customAccessToken || e);
    }, j.prototype.normalizeSpriteURL = function (t, e, r, n) {
      var i = G(t);
      return q(t) ? (i.path = "/styles/v1" + i.path + "/sprite" + e + r, this._makeAPIURL(i, this._customAccessToken || n)) : (i.path += "" + e + r, X(i));
    }, j.prototype.normalizeTileURL = function (t, e, r) {
      if (this._isSkuTokenExpired() && this._createSkuToken(), !e || !q(e)) return t;
      var n = G(t),
          i = V.devicePixelRatio >= 2 || 512 === r ? "@2x" : "",
          a = L.supported ? ".webp" : "$1";
      return n.path = n.path.replace(/(\.(png|jpg)\d*)(?=$)/, "" + i + a), n.path = n.path.replace(/^.+\/v4\//, "/"), n.path = "/v4" + n.path, F.REQUIRE_ACCESS_TOKEN && (F.ACCESS_TOKEN || this._customAccessToken) && this._skuToken && n.params.push("sku=" + this._skuToken), this._makeAPIURL(n, this._customAccessToken);
    }, j.prototype.canonicalizeTileURL = function (t) {
      var e = G(t);
      if (!e.path.match(/(^\/v4\/)/) || !e.path.match(/\.[\w]+$/)) return t;
      var r = "mapbox://tiles/";
      r += e.path.replace("/v4/", "");
      var n = e.params.filter(function (t) {
        return !t.match(/^access_token=/);
      });
      return n.length && (r += "?" + n.join("&")), r;
    }, j.prototype.canonicalizeTileset = function (t, e) {
      if (!q(e)) return t.tiles || [];

      for (var r = [], n = 0, i = t.tiles; n < i.length; n += 1) {
        var a = i[n],
            o = this.canonicalizeTileURL(a);
        r.push(o);
      }

      return r;
    }, j.prototype._makeAPIURL = function (t, e) {
      var r = "See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes",
          n = G(F.API_URL);
      if (t.protocol = n.protocol, t.authority = n.authority, "/" !== n.path && (t.path = "" + n.path + t.path), !F.REQUIRE_ACCESS_TOKEN) return X(t);
      if (!(e = e || F.ACCESS_TOKEN)) throw new Error("An API access token is required to use Mapbox GL. " + r);
      if ("s" === e[0]) throw new Error("Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). " + r);
      return t.params = t.params.filter(function (t) {
        return -1 === t.indexOf("access_token");
      }), t.params.push("access_token=" + e), X(t);
    };
    var N = /^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/|\?|$)/i;

    function K(t) {
      return N.test(t);
    }

    var Z = /^(\w+):\/\/([^\/?]*)(\/[^?]+)?\??(.+)?/;

    function G(t) {
      var e = t.match(Z);
      if (!e) throw new Error("Unable to parse URL object");
      return {
        protocol: e[1],
        authority: e[2],
        path: e[3] || "/",
        params: e[4] ? e[4].split("&") : []
      };
    }

    function X(t) {
      var e = t.params.length ? "?" + t.params.join("&") : "";
      return t.protocol + "://" + t.authority + t.path + e;
    }

    function J(t) {
      if (!t) return null;
      var e,
          r = t.split(".");
      if (!r || 3 !== r.length) return null;

      try {
        return JSON.parse((e = r[1], decodeURIComponent(self.atob(e).split("").map(function (t) {
          return "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2);
        }).join(""))));
      } catch (t) {
        return null;
      }
    }

    var H = function (t) {
      this.type = t, this.anonId = null, this.eventData = {}, this.queue = [], this.pendingRequest = null;
    };

    H.prototype.getStorageKey = function (t) {
      var e,
          r = J(F.ACCESS_TOKEN),
          n = "";
      return r && r.u ? (e = r.u, n = self.btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (t, e) {
        return String.fromCharCode(Number("0x" + e));
      }))) : n = F.ACCESS_TOKEN || "", t ? "mapbox.eventData." + t + ":" + n : "mapbox.eventData:" + n;
    }, H.prototype.fetchEventData = function () {
      var t = z("localStorage"),
          e = this.getStorageKey(),
          r = this.getStorageKey("uuid");
      if (t) try {
        var n = self.localStorage.getItem(e);
        n && (this.eventData = JSON.parse(n));
        var i = self.localStorage.getItem(r);
        i && (this.anonId = i);
      } catch (t) {
        w("Unable to read from LocalStorage");
      }
    }, H.prototype.saveEventData = function () {
      var t = z("localStorage"),
          e = this.getStorageKey(),
          r = this.getStorageKey("uuid");
      if (t) try {
        self.localStorage.setItem(r, this.anonId), Object.keys(this.eventData).length >= 1 && self.localStorage.setItem(e, JSON.stringify(this.eventData));
      } catch (t) {
        w("Unable to write to LocalStorage");
      }
    }, H.prototype.processRequests = function (t) {}, H.prototype.postEvent = function (t, e, r, n) {
      var i = this;

      if (F.EVENTS_URL) {
        var a = G(F.EVENTS_URL);
        a.params.push("access_token=" + (n || F.ACCESS_TOKEN || ""));
        var o = {
          event: this.type,
          created: new Date(t).toISOString(),
          sdkIdentifier: "mapbox-gl-js",
          sdkVersion: "1.2.1",
          skuId: U,
          userId: this.anonId
        },
            s = e ? c(o, e) : o,
            u = {
          url: X(a),
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify([s])
        };
        this.pendingRequest = vt(u, function (t) {
          i.pendingRequest = null, r(t), i.saveEventData(), i.processRequests(n);
        });
      }
    }, H.prototype.queueRequest = function (t, e) {
      this.queue.push(t), this.processRequests(e);
    };

    var Y,
        $ = function (t) {
      function e() {
        t.call(this, "map.load"), this.success = {}, this.skuToken = "";
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.postMapLoadEvent = function (t, e, r, n) {
        this.skuToken = r, (F.EVENTS_URL && n || F.ACCESS_TOKEN && Array.isArray(t) && t.some(function (t) {
          return q(t) || K(t);
        })) && this.queueRequest({
          id: e,
          timestamp: Date.now()
        }, n);
      }, e.prototype.processRequests = function (t) {
        var e = this;

        if (!this.pendingRequest && 0 !== this.queue.length) {
          var r = this.queue.shift(),
              n = r.id,
              i = r.timestamp;
          n && this.success[n] || (this.anonId || this.fetchEventData(), d(this.anonId) || (this.anonId = y()), this.postEvent(i, {
            skuToken: this.skuToken
          }, function (t) {
            t || n && (e.success[n] = !0);
          }, t));
        }
      }, e;
    }(H),
        W = new (function (t) {
      function e(e) {
        t.call(this, "appUserTurnstile"), this._customAccessToken = e;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.postTurnstileEvent = function (t, e) {
        F.EVENTS_URL && F.ACCESS_TOKEN && Array.isArray(t) && t.some(function (t) {
          return q(t) || K(t);
        }) && this.queueRequest(Date.now(), e);
      }, e.prototype.processRequests = function (t) {
        var e = this;

        if (!this.pendingRequest && 0 !== this.queue.length) {
          this.anonId && this.eventData.lastSuccess && this.eventData.tokenU || this.fetchEventData();
          var r = J(F.ACCESS_TOKEN),
              n = r ? r.u : F.ACCESS_TOKEN,
              i = n !== this.eventData.tokenU;
          d(this.anonId) || (this.anonId = y(), i = !0);
          var a = this.queue.shift();

          if (this.eventData.lastSuccess) {
            var o = new Date(this.eventData.lastSuccess),
                s = new Date(a),
                u = (a - this.eventData.lastSuccess) / 864e5;
            i = i || u >= 1 || u < -1 || o.getDate() !== s.getDate();
          } else i = !0;

          if (!i) return this.processRequests();
          this.postEvent(a, {
            "enabled.telemetry": !1
          }, function (t) {
            t || (e.eventData.lastSuccess = a, e.eventData.tokenU = n);
          }, t);
        }
      }, e;
    }(H))(),
        Q = W.postTurnstileEvent.bind(W),
        tt = new $(),
        et = tt.postMapLoadEvent.bind(tt),
        rt = "mapbox-tiles",
        nt = 500,
        it = 50,
        at = 42e4;

    function ot(t, e, r) {
      if (self.caches) {
        var n = {
          status: e.status,
          statusText: e.statusText,
          headers: new self.Headers()
        };
        e.headers.forEach(function (t, e) {
          return n.headers.set(e, t);
        });
        var i = S(e.headers.get("Cache-Control") || "");
        if (!i["no-store"]) i["max-age"] && n.headers.set("Expires", new Date(r + 1e3 * i["max-age"]).toUTCString()), new Date(n.headers.get("Expires")).getTime() - r < at || function (t, e) {
          if (void 0 === Y) try {
            new Response(new ReadableStream()), Y = !0;
          } catch (t) {
            Y = !1;
          }
          Y ? e(t.body) : t.blob().then(e);
        }(e, function (e) {
          var r = new self.Response(e, n);
          self.caches.open(rt).then(function (e) {
            return e.put(st(t.url), r);
          });
        });
      }
    }

    function st(t) {
      var e = t.indexOf("?");
      return e < 0 ? t : t.slice(0, e);
    }

    function ut(t, e) {
      if (!self.caches) return e(null);
      var r = st(t.url);
      self.caches.open(rt).catch(e).then(function (t) {
        t.match(r).catch(e).then(function (n) {
          var i = function (t) {
            if (!t) return !1;
            var e = new Date(t.headers.get("Expires")),
                r = S(t.headers.get("Cache-Control") || "");
            return e > Date.now() && !r["no-cache"];
          }(n);

          t.delete(r), i && t.put(r, n.clone()), e(null, n, i);
        });
      });
    }

    var lt = 1 / 0;
    var pt = {
      Unknown: "Unknown",
      Style: "Style",
      Source: "Source",
      Tile: "Tile",
      Glyphs: "Glyphs",
      SpriteImage: "SpriteImage",
      SpriteJSON: "SpriteJSON",
      Image: "Image"
    };
    "function" == typeof Object.freeze && Object.freeze(pt);

    var ct = function (t) {
      function e(e, r, n) {
        401 === r && K(n) && (e += ": you may have provided an invalid Mapbox access token. See https://www.mapbox.com/api-documentation/#access-tokens-and-token-scopes"), t.call(this, e), this.status = r, this.url = n, this.name = this.constructor.name, this.message = e;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.toString = function () {
        return this.name + ": " + this.message + " (" + this.status + "): " + this.url;
      }, e;
    }(Error);

    function ht() {
      return "undefined" != typeof WorkerGlobalScope && "undefined" != typeof self && self instanceof WorkerGlobalScope;
    }

    var ft = ht() ? function () {
      return self.worker && self.worker.referrer;
    } : function () {
      var t = self.location.origin;
      if (t && "null" !== t && "file://" !== t) return t + self.location.pathname;
    };

    function yt(t, e) {
      var r,
          n = new self.AbortController(),
          i = new self.Request(t.url, {
        method: t.method || "GET",
        body: t.body,
        credentials: t.credentials,
        headers: t.headers,
        referrer: ft(),
        signal: n.signal
      }),
          a = !1,
          o = !1,
          s = (r = i.url).indexOf("sku=") > 0 && K(r);
      "json" === t.type && i.headers.set("Accept", "application/json");

      var u = function (r, n, a) {
        if (!o) {
          if (r && "SecurityError" !== r.message && w(r), n && a) return l(n);
          var u = Date.now();
          self.fetch(i).then(function (r) {
            if (r.ok) {
              var n = s ? r.clone() : null;
              return l(r, n, u);
            }

            return e(new ct(r.statusText, r.status, t.url));
          }).catch(function (t) {
            20 !== t.code && e(new Error(t.message));
          });
        }
      },
          l = function (r, n, s) {
        ("arrayBuffer" === t.type ? r.arrayBuffer() : "json" === t.type ? r.json() : r.text()).then(function (t) {
          o || (n && s && ot(i, n, s), a = !0, e(null, t, r.headers.get("Cache-Control"), r.headers.get("Expires")));
        }).catch(function (t) {
          return e(new Error(t.message));
        });
      };

      return s ? ut(i, u) : u(null, null), {
        cancel: function () {
          o = !0, a || n.abort();
        }
      };
    }

    var dt = function (t, e) {
      if (!/^file:/.test(t.url)) {
        if (self.fetch && self.Request && self.AbortController && self.Request.prototype.hasOwnProperty("signal")) return yt(t, e);
        if (ht() && self.worker && self.worker.actor) return self.worker.actor.send("getResource", t, e);
      }

      return function (t, e) {
        var r = new self.XMLHttpRequest();

        for (var n in r.open(t.method || "GET", t.url, !0), "arrayBuffer" === t.type && (r.responseType = "arraybuffer"), t.headers) {
          r.setRequestHeader(n, t.headers[n]);
        }

        return "json" === t.type && r.setRequestHeader("Accept", "application/json"), r.withCredentials = "include" === t.credentials, r.onerror = function () {
          e(new Error(r.statusText));
        }, r.onload = function () {
          if ((r.status >= 200 && r.status < 300 || 0 === r.status) && null !== r.response) {
            var n = r.response;
            if ("json" === t.type) try {
              n = JSON.parse(r.response);
            } catch (t) {
              return e(t);
            }
            e(null, n, r.getResponseHeader("Cache-Control"), r.getResponseHeader("Expires"));
          } else e(new ct(r.statusText, r.status, t.url));
        }, r.send(t.body), {
          cancel: function () {
            return r.abort();
          }
        };
      }(t, e);
    },
        mt = function (t, e) {
      return dt(c(t, {
        type: "arrayBuffer"
      }), e);
    },
        vt = function (t, e) {
      return dt(c(t, {
        method: "POST"
      }), e);
    };

    var gt, xt;
    gt = [], xt = 0;

    var bt = function (t, e) {
      if (xt >= F.MAX_PARALLEL_IMAGE_REQUESTS) {
        var r = {
          requestParameters: t,
          callback: e,
          cancelled: !1,
          cancel: function () {
            this.cancelled = !0;
          }
        };
        return gt.push(r), r;
      }

      xt++;

      var n = !1,
          i = function () {
        if (!n) for (n = !0, xt--; gt.length && xt < F.MAX_PARALLEL_IMAGE_REQUESTS;) {
          var t = gt.shift(),
              e = t.requestParameters,
              r = t.callback;
          t.cancelled || (t.cancel = bt(e, r).cancel);
        }
      },
          a = mt(t, function (t, r, n, a) {
        if (i(), t) e(t);else if (r) {
          var o = new self.Image(),
              s = self.URL || self.webkitURL;
          o.onload = function () {
            e(null, o), s.revokeObjectURL(o.src);
          }, o.onerror = function () {
            return e(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."));
          };
          var u = new self.Blob([new Uint8Array(r)], {
            type: "image/png"
          });
          o.cacheControl = n, o.expires = a, o.src = r.byteLength ? s.createObjectURL(u) : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";
        }
      });

      return {
        cancel: function () {
          a.cancel(), i();
        }
      };
    };

    function _t(t, e, r) {
      r[t] && -1 !== r[t].indexOf(e) || (r[t] = r[t] || [], r[t].push(e));
    }

    function wt(t, e, r) {
      if (r && r[t]) {
        var n = r[t].indexOf(e);
        -1 !== n && r[t].splice(n, 1);
      }
    }

    var At = function (t, e) {
      void 0 === e && (e = {}), c(this, e), this.type = t;
    },
        kt = function (t) {
      function e(e, r) {
        void 0 === r && (r = {}), t.call(this, "error", c({
          error: e
        }, r));
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(At),
        St = function () {};

    St.prototype.on = function (t, e) {
      return this._listeners = this._listeners || {}, _t(t, e, this._listeners), this;
    }, St.prototype.off = function (t, e) {
      return wt(t, e, this._listeners), wt(t, e, this._oneTimeListeners), this;
    }, St.prototype.once = function (t, e) {
      return this._oneTimeListeners = this._oneTimeListeners || {}, _t(t, e, this._oneTimeListeners), this;
    }, St.prototype.fire = function (t, e) {
      "string" == typeof t && (t = new At(t, e || {}));
      var r = t.type;

      if (this.listens(r)) {
        t.target = this;

        for (var n = 0, i = this._listeners && this._listeners[r] ? this._listeners[r].slice() : []; n < i.length; n += 1) {
          i[n].call(this, t);
        }

        for (var a = 0, o = this._oneTimeListeners && this._oneTimeListeners[r] ? this._oneTimeListeners[r].slice() : []; a < o.length; a += 1) {
          var s = o[a];
          wt(r, s, this._oneTimeListeners), s.call(this, t);
        }

        var u = this._eventedParent;
        u && (c(t, "function" == typeof this._eventedParentData ? this._eventedParentData() : this._eventedParentData), u.fire(t));
      } else t instanceof kt && console.error(t.error);

      return this;
    }, St.prototype.listens = function (t) {
      return this._listeners && this._listeners[t] && this._listeners[t].length > 0 || this._oneTimeListeners && this._oneTimeListeners[t] && this._oneTimeListeners[t].length > 0 || this._eventedParent && this._eventedParent.listens(t);
    }, St.prototype.setEventedParent = function (t, e) {
      return this._eventedParent = t, this._eventedParentData = e, this;
    };

    var zt = {
      $version: 8,
      $root: {
        version: {
          required: !0,
          type: "enum",
          values: [8]
        },
        name: {
          type: "string"
        },
        metadata: {
          type: "*"
        },
        center: {
          type: "array",
          value: "number"
        },
        zoom: {
          type: "number"
        },
        bearing: {
          type: "number",
          default: 0,
          period: 360,
          units: "degrees"
        },
        pitch: {
          type: "number",
          default: 0,
          units: "degrees"
        },
        light: {
          type: "light"
        },
        sources: {
          required: !0,
          type: "sources"
        },
        sprite: {
          type: "string"
        },
        glyphs: {
          type: "string"
        },
        transition: {
          type: "transition"
        },
        layers: {
          required: !0,
          type: "array",
          value: "layer"
        }
      },
      sources: {
        "*": {
          type: "source"
        }
      },
      source: ["source_vector", "source_raster", "source_raster_dem", "source_geojson", "source_video", "source_image"],
      source_vector: {
        type: {
          required: !0,
          type: "enum",
          values: {
            vector: {}
          }
        },
        url: {
          type: "string"
        },
        tiles: {
          type: "array",
          value: "string"
        },
        bounds: {
          type: "array",
          value: "number",
          length: 4,
          default: [-180, -85.051129, 180, 85.051129]
        },
        scheme: {
          type: "enum",
          values: {
            xyz: {},
            tms: {}
          },
          default: "xyz"
        },
        minzoom: {
          type: "number",
          default: 0
        },
        maxzoom: {
          type: "number",
          default: 22
        },
        attribution: {
          type: "string"
        },
        "*": {
          type: "*"
        }
      },
      source_raster: {
        type: {
          required: !0,
          type: "enum",
          values: {
            raster: {}
          }
        },
        url: {
          type: "string"
        },
        tiles: {
          type: "array",
          value: "string"
        },
        bounds: {
          type: "array",
          value: "number",
          length: 4,
          default: [-180, -85.051129, 180, 85.051129]
        },
        minzoom: {
          type: "number",
          default: 0
        },
        maxzoom: {
          type: "number",
          default: 22
        },
        tileSize: {
          type: "number",
          default: 512,
          units: "pixels"
        },
        scheme: {
          type: "enum",
          values: {
            xyz: {},
            tms: {}
          },
          default: "xyz"
        },
        attribution: {
          type: "string"
        },
        "*": {
          type: "*"
        }
      },
      source_raster_dem: {
        type: {
          required: !0,
          type: "enum",
          values: {
            "raster-dem": {}
          }
        },
        url: {
          type: "string"
        },
        tiles: {
          type: "array",
          value: "string"
        },
        bounds: {
          type: "array",
          value: "number",
          length: 4,
          default: [-180, -85.051129, 180, 85.051129]
        },
        minzoom: {
          type: "number",
          default: 0
        },
        maxzoom: {
          type: "number",
          default: 22
        },
        tileSize: {
          type: "number",
          default: 512,
          units: "pixels"
        },
        attribution: {
          type: "string"
        },
        encoding: {
          type: "enum",
          values: {
            terrarium: {},
            mapbox: {}
          },
          default: "mapbox"
        },
        "*": {
          type: "*"
        }
      },
      source_geojson: {
        type: {
          required: !0,
          type: "enum",
          values: {
            geojson: {}
          }
        },
        data: {
          type: "*"
        },
        maxzoom: {
          type: "number",
          default: 18
        },
        attribution: {
          type: "string"
        },
        buffer: {
          type: "number",
          default: 128,
          maximum: 512,
          minimum: 0
        },
        tolerance: {
          type: "number",
          default: .375
        },
        cluster: {
          type: "boolean",
          default: !1
        },
        clusterRadius: {
          type: "number",
          default: 50,
          minimum: 0
        },
        clusterMaxZoom: {
          type: "number"
        },
        clusterProperties: {
          type: "*"
        },
        lineMetrics: {
          type: "boolean",
          default: !1
        },
        generateId: {
          type: "boolean",
          default: !1
        }
      },
      source_video: {
        type: {
          required: !0,
          type: "enum",
          values: {
            video: {}
          }
        },
        urls: {
          required: !0,
          type: "array",
          value: "string"
        },
        coordinates: {
          required: !0,
          type: "array",
          length: 4,
          value: {
            type: "array",
            length: 2,
            value: "number"
          }
        }
      },
      source_image: {
        type: {
          required: !0,
          type: "enum",
          values: {
            image: {}
          }
        },
        url: {
          required: !0,
          type: "string"
        },
        coordinates: {
          required: !0,
          type: "array",
          length: 4,
          value: {
            type: "array",
            length: 2,
            value: "number"
          }
        }
      },
      layer: {
        id: {
          type: "string",
          required: !0
        },
        type: {
          type: "enum",
          values: {
            fill: {},
            line: {},
            symbol: {},
            circle: {},
            heatmap: {},
            "fill-extrusion": {},
            raster: {},
            hillshade: {},
            background: {}
          },
          required: !0
        },
        metadata: {
          type: "*"
        },
        source: {
          type: "string"
        },
        "source-layer": {
          type: "string"
        },
        minzoom: {
          type: "number",
          minimum: 0,
          maximum: 24
        },
        maxzoom: {
          type: "number",
          minimum: 0,
          maximum: 24
        },
        filter: {
          type: "filter"
        },
        layout: {
          type: "layout"
        },
        paint: {
          type: "paint"
        }
      },
      layout: ["layout_fill", "layout_line", "layout_circle", "layout_heatmap", "layout_fill-extrusion", "layout_symbol", "layout_raster", "layout_hillshade", "layout_background"],
      layout_background: {
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_fill: {
        "fill-sort-key": {
          type: "number",
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_circle: {
        "circle-sort-key": {
          type: "number",
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_heatmap: {
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      "layout_fill-extrusion": {
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_line: {
        "line-cap": {
          type: "enum",
          values: {
            butt: {},
            round: {},
            square: {}
          },
          default: "butt",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "line-join": {
          type: "enum",
          values: {
            bevel: {},
            round: {},
            miter: {}
          },
          default: "miter",
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "line-miter-limit": {
          type: "number",
          default: 2,
          requires: [{
            "line-join": "miter"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "line-round-limit": {
          type: "number",
          default: 1.05,
          requires: [{
            "line-join": "round"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "line-sort-key": {
          type: "number",
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_symbol: {
        "symbol-placement": {
          type: "enum",
          values: {
            point: {},
            line: {},
            "line-center": {}
          },
          default: "point",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "symbol-spacing": {
          type: "number",
          default: 250,
          minimum: 1,
          units: "pixels",
          requires: [{
            "symbol-placement": "line"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "symbol-avoid-edges": {
          type: "boolean",
          default: !1,
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "symbol-sort-key": {
          type: "number",
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "symbol-z-order": {
          type: "enum",
          values: {
            auto: {},
            "viewport-y": {},
            source: {}
          },
          default: "auto",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-allow-overlap": {
          type: "boolean",
          default: !1,
          requires: ["icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-ignore-placement": {
          type: "boolean",
          default: !1,
          requires: ["icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-optional": {
          type: "boolean",
          default: !1,
          requires: ["icon-image", "text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-rotation-alignment": {
          type: "enum",
          values: {
            map: {},
            viewport: {},
            auto: {}
          },
          default: "auto",
          requires: ["icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-size": {
          type: "number",
          default: 1,
          minimum: 0,
          units: "factor of the original icon size",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "icon-text-fit": {
          type: "enum",
          values: {
            none: {},
            width: {},
            height: {},
            both: {}
          },
          default: "none",
          requires: ["icon-image", "text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-text-fit-padding": {
          type: "array",
          value: "number",
          length: 4,
          default: [0, 0, 0, 0],
          units: "pixels",
          requires: ["icon-image", "text-field", {
            "icon-text-fit": ["both", "width", "height"]
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-image": {
          type: "string",
          tokens: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "icon-rotate": {
          type: "number",
          default: 0,
          period: 360,
          units: "degrees",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "icon-padding": {
          type: "number",
          default: 2,
          minimum: 0,
          units: "pixels",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-keep-upright": {
          type: "boolean",
          default: !1,
          requires: ["icon-image", {
            "icon-rotation-alignment": "map"
          }, {
            "symbol-placement": ["line", "line-center"]
          }],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-offset": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "icon-anchor": {
          type: "enum",
          values: {
            center: {},
            left: {},
            right: {},
            top: {},
            bottom: {},
            "top-left": {},
            "top-right": {},
            "bottom-left": {},
            "bottom-right": {}
          },
          default: "center",
          requires: ["icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "icon-pitch-alignment": {
          type: "enum",
          values: {
            map: {},
            viewport: {},
            auto: {}
          },
          default: "auto",
          requires: ["icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-pitch-alignment": {
          type: "enum",
          values: {
            map: {},
            viewport: {},
            auto: {}
          },
          default: "auto",
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-rotation-alignment": {
          type: "enum",
          values: {
            map: {},
            viewport: {},
            auto: {}
          },
          default: "auto",
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-field": {
          type: "formatted",
          default: "",
          tokens: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-font": {
          type: "array",
          value: "string",
          default: ["Open Sans Regular", "Arial Unicode MS Regular"],
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-size": {
          type: "number",
          default: 16,
          minimum: 0,
          units: "pixels",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-max-width": {
          type: "number",
          default: 10,
          minimum: 0,
          units: "ems",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-line-height": {
          type: "number",
          default: 1.2,
          units: "ems",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-letter-spacing": {
          type: "number",
          default: 0,
          units: "ems",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-justify": {
          type: "enum",
          values: {
            auto: {},
            left: {},
            center: {},
            right: {}
          },
          default: "center",
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-radial-offset": {
          type: "number",
          units: "ems",
          default: 0,
          requires: ["text-field"],
          "property-type": "data-driven",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          }
        },
        "text-variable-anchor": {
          type: "array",
          value: "enum",
          values: {
            center: {},
            left: {},
            right: {},
            top: {},
            bottom: {},
            "top-left": {},
            "top-right": {},
            "bottom-left": {},
            "bottom-right": {}
          },
          requires: ["text-field", {
            "symbol-placement": ["point"]
          }],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-anchor": {
          type: "enum",
          values: {
            center: {},
            left: {},
            right: {},
            top: {},
            bottom: {},
            "top-left": {},
            "top-right": {},
            "bottom-left": {},
            "bottom-right": {}
          },
          default: "center",
          requires: ["text-field", {
            "!": "text-variable-anchor"
          }],
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-max-angle": {
          type: "number",
          default: 45,
          units: "degrees",
          requires: ["text-field", {
            "symbol-placement": ["line", "line-center"]
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-rotate": {
          type: "number",
          default: 0,
          period: 360,
          units: "degrees",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-padding": {
          type: "number",
          default: 2,
          minimum: 0,
          units: "pixels",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-keep-upright": {
          type: "boolean",
          default: !0,
          requires: ["text-field", {
            "text-rotation-alignment": "map"
          }, {
            "symbol-placement": ["line", "line-center"]
          }],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-transform": {
          type: "enum",
          values: {
            none: {},
            uppercase: {},
            lowercase: {}
          },
          default: "none",
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-offset": {
          type: "array",
          value: "number",
          units: "ems",
          length: 2,
          default: [0, 0],
          requires: ["text-field", {
            "!": "text-radial-offset"
          }, {
            "!": "text-variable-anchor"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature"]
          },
          "property-type": "data-driven"
        },
        "text-allow-overlap": {
          type: "boolean",
          default: !1,
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-ignore-placement": {
          type: "boolean",
          default: !1,
          requires: ["text-field"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-optional": {
          type: "boolean",
          default: !1,
          requires: ["text-field", "icon-image"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_raster: {
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      layout_hillshade: {
        visibility: {
          type: "enum",
          values: {
            visible: {},
            none: {}
          },
          default: "visible",
          "property-type": "constant"
        }
      },
      filter: {
        type: "array",
        value: "*"
      },
      filter_operator: {
        type: "enum",
        values: {
          "==": {},
          "!=": {},
          ">": {},
          ">=": {},
          "<": {},
          "<=": {},
          in: {},
          "!in": {},
          all: {},
          any: {},
          none: {},
          has: {},
          "!has": {}
        }
      },
      geometry_type: {
        type: "enum",
        values: {
          Point: {},
          LineString: {},
          Polygon: {}
        }
      },
      function: {
        expression: {
          type: "expression"
        },
        stops: {
          type: "array",
          value: "function_stop"
        },
        base: {
          type: "number",
          default: 1,
          minimum: 0
        },
        property: {
          type: "string",
          default: "$zoom"
        },
        type: {
          type: "enum",
          values: {
            identity: {},
            exponential: {},
            interval: {},
            categorical: {}
          },
          default: "exponential"
        },
        colorSpace: {
          type: "enum",
          values: {
            rgb: {},
            lab: {},
            hcl: {}
          },
          default: "rgb"
        },
        default: {
          type: "*",
          required: !1
        }
      },
      function_stop: {
        type: "array",
        minimum: 0,
        maximum: 22,
        value: ["number", "color"],
        length: 2
      },
      expression: {
        type: "array",
        value: "*",
        minimum: 1
      },
      expression_name: {
        type: "enum",
        values: {
          let: {
            group: "Variable binding"
          },
          var: {
            group: "Variable binding"
          },
          literal: {
            group: "Types"
          },
          array: {
            group: "Types"
          },
          at: {
            group: "Lookup"
          },
          case: {
            group: "Decision"
          },
          match: {
            group: "Decision"
          },
          coalesce: {
            group: "Decision"
          },
          step: {
            group: "Ramps, scales, curves"
          },
          interpolate: {
            group: "Ramps, scales, curves"
          },
          "interpolate-hcl": {
            group: "Ramps, scales, curves"
          },
          "interpolate-lab": {
            group: "Ramps, scales, curves"
          },
          ln2: {
            group: "Math"
          },
          pi: {
            group: "Math"
          },
          e: {
            group: "Math"
          },
          typeof: {
            group: "Types"
          },
          string: {
            group: "Types"
          },
          number: {
            group: "Types"
          },
          boolean: {
            group: "Types"
          },
          object: {
            group: "Types"
          },
          collator: {
            group: "Types"
          },
          format: {
            group: "Types"
          },
          "number-format": {
            group: "Types"
          },
          "to-string": {
            group: "Types"
          },
          "to-number": {
            group: "Types"
          },
          "to-boolean": {
            group: "Types"
          },
          "to-rgba": {
            group: "Color"
          },
          "to-color": {
            group: "Types"
          },
          rgb: {
            group: "Color"
          },
          rgba: {
            group: "Color"
          },
          get: {
            group: "Lookup"
          },
          has: {
            group: "Lookup"
          },
          length: {
            group: "Lookup"
          },
          properties: {
            group: "Feature data"
          },
          "feature-state": {
            group: "Feature data"
          },
          "geometry-type": {
            group: "Feature data"
          },
          id: {
            group: "Feature data"
          },
          zoom: {
            group: "Zoom"
          },
          "heatmap-density": {
            group: "Heatmap"
          },
          "line-progress": {
            group: "Feature data"
          },
          accumulated: {
            group: "Feature data"
          },
          "+": {
            group: "Math"
          },
          "*": {
            group: "Math"
          },
          "-": {
            group: "Math"
          },
          "/": {
            group: "Math"
          },
          "%": {
            group: "Math"
          },
          "^": {
            group: "Math"
          },
          sqrt: {
            group: "Math"
          },
          log10: {
            group: "Math"
          },
          ln: {
            group: "Math"
          },
          log2: {
            group: "Math"
          },
          sin: {
            group: "Math"
          },
          cos: {
            group: "Math"
          },
          tan: {
            group: "Math"
          },
          asin: {
            group: "Math"
          },
          acos: {
            group: "Math"
          },
          atan: {
            group: "Math"
          },
          min: {
            group: "Math"
          },
          max: {
            group: "Math"
          },
          round: {
            group: "Math"
          },
          abs: {
            group: "Math"
          },
          ceil: {
            group: "Math"
          },
          floor: {
            group: "Math"
          },
          "==": {
            group: "Decision"
          },
          "!=": {
            group: "Decision"
          },
          ">": {
            group: "Decision"
          },
          "<": {
            group: "Decision"
          },
          ">=": {
            group: "Decision"
          },
          "<=": {
            group: "Decision"
          },
          all: {
            group: "Decision"
          },
          any: {
            group: "Decision"
          },
          "!": {
            group: "Decision"
          },
          "is-supported-script": {
            group: "String"
          },
          upcase: {
            group: "String"
          },
          downcase: {
            group: "String"
          },
          concat: {
            group: "String"
          },
          "resolved-locale": {
            group: "String"
          }
        }
      },
      light: {
        anchor: {
          type: "enum",
          default: "viewport",
          values: {
            map: {},
            viewport: {}
          },
          "property-type": "data-constant",
          transition: !1,
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          }
        },
        position: {
          type: "array",
          default: [1.15, 210, 30],
          length: 3,
          value: "number",
          "property-type": "data-constant",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          }
        },
        color: {
          type: "color",
          "property-type": "data-constant",
          default: "#ffffff",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          transition: !0
        },
        intensity: {
          type: "number",
          "property-type": "data-constant",
          default: .5,
          minimum: 0,
          maximum: 1,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          transition: !0
        }
      },
      paint: ["paint_fill", "paint_line", "paint_circle", "paint_heatmap", "paint_fill-extrusion", "paint_symbol", "paint_raster", "paint_hillshade", "paint_background"],
      paint_fill: {
        "fill-antialias": {
          type: "boolean",
          default: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: [{
            "!": "fill-pattern"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-outline-color": {
          type: "color",
          transition: !0,
          requires: [{
            "!": "fill-pattern"
          }, {
            "fill-antialias": !0
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["fill-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-pattern": {
          type: "string",
          transition: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "cross-faded-data-driven"
        }
      },
      "paint_fill-extrusion": {
        "fill-extrusion-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-extrusion-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: [{
            "!": "fill-extrusion-pattern"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-extrusion-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-extrusion-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["fill-extrusion-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "fill-extrusion-pattern": {
          type: "string",
          transition: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "cross-faded-data-driven"
        },
        "fill-extrusion-height": {
          type: "number",
          default: 0,
          minimum: 0,
          units: "meters",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-extrusion-base": {
          type: "number",
          default: 0,
          minimum: 0,
          units: "meters",
          transition: !0,
          requires: ["fill-extrusion-height"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "fill-extrusion-vertical-gradient": {
          type: "boolean",
          default: !0,
          transition: !1,
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      paint_line: {
        "line-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: [{
            "!": "line-pattern"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "line-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["line-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "line-width": {
          type: "number",
          default: 1,
          minimum: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-gap-width": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-offset": {
          type: "number",
          default: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-blur": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "line-dasharray": {
          type: "array",
          value: "number",
          minimum: 0,
          transition: !0,
          units: "line widths",
          requires: [{
            "!": "line-pattern"
          }],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "cross-faded"
        },
        "line-pattern": {
          type: "string",
          transition: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom", "feature"]
          },
          "property-type": "cross-faded-data-driven"
        },
        "line-gradient": {
          type: "color",
          transition: !1,
          requires: [{
            "!": "line-dasharray"
          }, {
            "!": "line-pattern"
          }, {
            source: "geojson",
            has: {
              lineMetrics: !0
            }
          }],
          expression: {
            interpolated: !0,
            parameters: ["line-progress"]
          },
          "property-type": "color-ramp"
        }
      },
      paint_circle: {
        "circle-radius": {
          type: "number",
          default: 5,
          minimum: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-blur": {
          type: "number",
          default: 0,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "circle-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["circle-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "circle-pitch-scale": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "circle-pitch-alignment": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "viewport",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "circle-stroke-width": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-stroke-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "circle-stroke-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        }
      },
      paint_heatmap: {
        "heatmap-radius": {
          type: "number",
          default: 30,
          minimum: 1,
          transition: !0,
          units: "pixels",
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "heatmap-weight": {
          type: "number",
          default: 1,
          minimum: 0,
          transition: !1,
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "heatmap-intensity": {
          type: "number",
          default: 1,
          minimum: 0,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "heatmap-color": {
          type: "color",
          default: ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(0, 0, 255, 0)", .1, "royalblue", .3, "cyan", .5, "lime", .7, "yellow", 1, "red"],
          transition: !1,
          expression: {
            interpolated: !0,
            parameters: ["heatmap-density"]
          },
          "property-type": "color-ramp"
        },
        "heatmap-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      paint_symbol: {
        "icon-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "icon-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "icon-halo-color": {
          type: "color",
          default: "rgba(0, 0, 0, 0)",
          transition: !0,
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "icon-halo-width": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "icon-halo-blur": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "icon-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          requires: ["icon-image"],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "icon-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["icon-image", "icon-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "text-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "text-halo-color": {
          type: "color",
          default: "rgba(0, 0, 0, 0)",
          transition: !0,
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "text-halo-width": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "text-halo-blur": {
          type: "number",
          default: 0,
          minimum: 0,
          transition: !0,
          units: "pixels",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom", "feature", "feature-state"]
          },
          "property-type": "data-driven"
        },
        "text-translate": {
          type: "array",
          value: "number",
          length: 2,
          default: [0, 0],
          transition: !0,
          units: "pixels",
          requires: ["text-field"],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "text-translate-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "map",
          requires: ["text-field", "text-translate"],
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      paint_raster: {
        "raster-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-hue-rotate": {
          type: "number",
          default: 0,
          period: 360,
          transition: !0,
          units: "degrees",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-brightness-min": {
          type: "number",
          default: 0,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-brightness-max": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-saturation": {
          type: "number",
          default: 0,
          minimum: -1,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-contrast": {
          type: "number",
          default: 0,
          minimum: -1,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-resampling": {
          type: "enum",
          values: {
            linear: {},
            nearest: {}
          },
          default: "linear",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "raster-fade-duration": {
          type: "number",
          default: 300,
          minimum: 0,
          transition: !1,
          units: "milliseconds",
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      paint_hillshade: {
        "hillshade-illumination-direction": {
          type: "number",
          default: 335,
          minimum: 0,
          maximum: 359,
          transition: !1,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "hillshade-illumination-anchor": {
          type: "enum",
          values: {
            map: {},
            viewport: {}
          },
          default: "viewport",
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "hillshade-exaggeration": {
          type: "number",
          default: .5,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "hillshade-shadow-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "hillshade-highlight-color": {
          type: "color",
          default: "#FFFFFF",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "hillshade-accent-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      paint_background: {
        "background-color": {
          type: "color",
          default: "#000000",
          transition: !0,
          requires: [{
            "!": "background-pattern"
          }],
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        },
        "background-pattern": {
          type: "string",
          transition: !0,
          expression: {
            interpolated: !1,
            parameters: ["zoom"]
          },
          "property-type": "cross-faded"
        },
        "background-opacity": {
          type: "number",
          default: 1,
          minimum: 0,
          maximum: 1,
          transition: !0,
          expression: {
            interpolated: !0,
            parameters: ["zoom"]
          },
          "property-type": "data-constant"
        }
      },
      transition: {
        duration: {
          type: "number",
          default: 300,
          minimum: 0,
          units: "milliseconds"
        },
        delay: {
          type: "number",
          default: 0,
          minimum: 0,
          units: "milliseconds"
        }
      },
      "property-type": {
        "data-driven": {
          type: "property-type"
        },
        "cross-faded": {
          type: "property-type"
        },
        "cross-faded-data-driven": {
          type: "property-type"
        },
        "color-ramp": {
          type: "property-type"
        },
        "data-constant": {
          type: "property-type"
        },
        constant: {
          type: "property-type"
        }
      }
    },
        It = function (t, e, r, n) {
      this.message = (t ? t + ": " : "") + r, n && (this.identifier = n), null != e && e.__line__ && (this.line = e.__line__);
    };

    function Bt(t) {
      var e = t.key,
          r = t.value;
      return r ? [new It(e, r, "constants have been deprecated as of v8")] : [];
    }

    function Ct(t) {
      for (var e = [], r = arguments.length - 1; r-- > 0;) {
        e[r] = arguments[r + 1];
      }

      for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];

        for (var o in a) {
          t[o] = a[o];
        }
      }

      return t;
    }

    function Et(t) {
      return t instanceof Number || t instanceof String || t instanceof Boolean;
    }

    function Mt(t) {
      return Et(t) ? t.valueOf() : t;
    }

    function Tt(t) {
      if (Array.isArray(t)) return t.map(Tt);

      if (t instanceof Object && !Et(t)) {
        var e = {};

        for (var r in t) {
          e[r] = Tt(t[r]);
        }

        return e;
      }

      return Mt(t);
    }

    var Pt = function (t) {
      function e(e, r) {
        t.call(this, r), this.message = r, this.key = e;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Error),
        Vt = function (t, e) {
      void 0 === e && (e = []), this.parent = t, this.bindings = {};

      for (var r = 0, n = e; r < n.length; r += 1) {
        var i = n[r],
            a = i[0],
            o = i[1];
        this.bindings[a] = o;
      }
    };

    Vt.prototype.concat = function (t) {
      return new Vt(this, t);
    }, Vt.prototype.get = function (t) {
      if (this.bindings[t]) return this.bindings[t];
      if (this.parent) return this.parent.get(t);
      throw new Error(t + " not found in scope.");
    }, Vt.prototype.has = function (t) {
      return !!this.bindings[t] || !!this.parent && this.parent.has(t);
    };
    var Ft = {
      kind: "null"
    },
        Lt = {
      kind: "number"
    },
        Dt = {
      kind: "string"
    },
        Ot = {
      kind: "boolean"
    },
        Rt = {
      kind: "color"
    },
        Ut = {
      kind: "object"
    },
        jt = {
      kind: "value"
    },
        qt = {
      kind: "collator"
    },
        Nt = {
      kind: "formatted"
    };

    function Kt(t, e) {
      return {
        kind: "array",
        itemType: t,
        N: e
      };
    }

    function Zt(t) {
      if ("array" === t.kind) {
        var e = Zt(t.itemType);
        return "number" == typeof t.N ? "array<" + e + ", " + t.N + ">" : "value" === t.itemType.kind ? "array" : "array<" + e + ">";
      }

      return t.kind;
    }

    var Gt = [Ft, Lt, Dt, Ot, Rt, Nt, Ut, Kt(jt)];

    function Xt(t, e) {
      if ("error" === e.kind) return null;

      if ("array" === t.kind) {
        if ("array" === e.kind && (0 === e.N && "value" === e.itemType.kind || !Xt(t.itemType, e.itemType)) && ("number" != typeof t.N || t.N === e.N)) return null;
      } else {
        if (t.kind === e.kind) return null;
        if ("value" === t.kind) for (var r = 0, n = Gt; r < n.length; r += 1) {
          if (!Xt(n[r], e)) return null;
        }
      }

      return "Expected " + Zt(t) + " but found " + Zt(e) + " instead.";
    }

    var Jt = e(function (t, e) {
      var r = {
        transparent: [0, 0, 0, 0],
        aliceblue: [240, 248, 255, 1],
        antiquewhite: [250, 235, 215, 1],
        aqua: [0, 255, 255, 1],
        aquamarine: [127, 255, 212, 1],
        azure: [240, 255, 255, 1],
        beige: [245, 245, 220, 1],
        bisque: [255, 228, 196, 1],
        black: [0, 0, 0, 1],
        blanchedalmond: [255, 235, 205, 1],
        blue: [0, 0, 255, 1],
        blueviolet: [138, 43, 226, 1],
        brown: [165, 42, 42, 1],
        burlywood: [222, 184, 135, 1],
        cadetblue: [95, 158, 160, 1],
        chartreuse: [127, 255, 0, 1],
        chocolate: [210, 105, 30, 1],
        coral: [255, 127, 80, 1],
        cornflowerblue: [100, 149, 237, 1],
        cornsilk: [255, 248, 220, 1],
        crimson: [220, 20, 60, 1],
        cyan: [0, 255, 255, 1],
        darkblue: [0, 0, 139, 1],
        darkcyan: [0, 139, 139, 1],
        darkgoldenrod: [184, 134, 11, 1],
        darkgray: [169, 169, 169, 1],
        darkgreen: [0, 100, 0, 1],
        darkgrey: [169, 169, 169, 1],
        darkkhaki: [189, 183, 107, 1],
        darkmagenta: [139, 0, 139, 1],
        darkolivegreen: [85, 107, 47, 1],
        darkorange: [255, 140, 0, 1],
        darkorchid: [153, 50, 204, 1],
        darkred: [139, 0, 0, 1],
        darksalmon: [233, 150, 122, 1],
        darkseagreen: [143, 188, 143, 1],
        darkslateblue: [72, 61, 139, 1],
        darkslategray: [47, 79, 79, 1],
        darkslategrey: [47, 79, 79, 1],
        darkturquoise: [0, 206, 209, 1],
        darkviolet: [148, 0, 211, 1],
        deeppink: [255, 20, 147, 1],
        deepskyblue: [0, 191, 255, 1],
        dimgray: [105, 105, 105, 1],
        dimgrey: [105, 105, 105, 1],
        dodgerblue: [30, 144, 255, 1],
        firebrick: [178, 34, 34, 1],
        floralwhite: [255, 250, 240, 1],
        forestgreen: [34, 139, 34, 1],
        fuchsia: [255, 0, 255, 1],
        gainsboro: [220, 220, 220, 1],
        ghostwhite: [248, 248, 255, 1],
        gold: [255, 215, 0, 1],
        goldenrod: [218, 165, 32, 1],
        gray: [128, 128, 128, 1],
        green: [0, 128, 0, 1],
        greenyellow: [173, 255, 47, 1],
        grey: [128, 128, 128, 1],
        honeydew: [240, 255, 240, 1],
        hotpink: [255, 105, 180, 1],
        indianred: [205, 92, 92, 1],
        indigo: [75, 0, 130, 1],
        ivory: [255, 255, 240, 1],
        khaki: [240, 230, 140, 1],
        lavender: [230, 230, 250, 1],
        lavenderblush: [255, 240, 245, 1],
        lawngreen: [124, 252, 0, 1],
        lemonchiffon: [255, 250, 205, 1],
        lightblue: [173, 216, 230, 1],
        lightcoral: [240, 128, 128, 1],
        lightcyan: [224, 255, 255, 1],
        lightgoldenrodyellow: [250, 250, 210, 1],
        lightgray: [211, 211, 211, 1],
        lightgreen: [144, 238, 144, 1],
        lightgrey: [211, 211, 211, 1],
        lightpink: [255, 182, 193, 1],
        lightsalmon: [255, 160, 122, 1],
        lightseagreen: [32, 178, 170, 1],
        lightskyblue: [135, 206, 250, 1],
        lightslategray: [119, 136, 153, 1],
        lightslategrey: [119, 136, 153, 1],
        lightsteelblue: [176, 196, 222, 1],
        lightyellow: [255, 255, 224, 1],
        lime: [0, 255, 0, 1],
        limegreen: [50, 205, 50, 1],
        linen: [250, 240, 230, 1],
        magenta: [255, 0, 255, 1],
        maroon: [128, 0, 0, 1],
        mediumaquamarine: [102, 205, 170, 1],
        mediumblue: [0, 0, 205, 1],
        mediumorchid: [186, 85, 211, 1],
        mediumpurple: [147, 112, 219, 1],
        mediumseagreen: [60, 179, 113, 1],
        mediumslateblue: [123, 104, 238, 1],
        mediumspringgreen: [0, 250, 154, 1],
        mediumturquoise: [72, 209, 204, 1],
        mediumvioletred: [199, 21, 133, 1],
        midnightblue: [25, 25, 112, 1],
        mintcream: [245, 255, 250, 1],
        mistyrose: [255, 228, 225, 1],
        moccasin: [255, 228, 181, 1],
        navajowhite: [255, 222, 173, 1],
        navy: [0, 0, 128, 1],
        oldlace: [253, 245, 230, 1],
        olive: [128, 128, 0, 1],
        olivedrab: [107, 142, 35, 1],
        orange: [255, 165, 0, 1],
        orangered: [255, 69, 0, 1],
        orchid: [218, 112, 214, 1],
        palegoldenrod: [238, 232, 170, 1],
        palegreen: [152, 251, 152, 1],
        paleturquoise: [175, 238, 238, 1],
        palevioletred: [219, 112, 147, 1],
        papayawhip: [255, 239, 213, 1],
        peachpuff: [255, 218, 185, 1],
        peru: [205, 133, 63, 1],
        pink: [255, 192, 203, 1],
        plum: [221, 160, 221, 1],
        powderblue: [176, 224, 230, 1],
        purple: [128, 0, 128, 1],
        rebeccapurple: [102, 51, 153, 1],
        red: [255, 0, 0, 1],
        rosybrown: [188, 143, 143, 1],
        royalblue: [65, 105, 225, 1],
        saddlebrown: [139, 69, 19, 1],
        salmon: [250, 128, 114, 1],
        sandybrown: [244, 164, 96, 1],
        seagreen: [46, 139, 87, 1],
        seashell: [255, 245, 238, 1],
        sienna: [160, 82, 45, 1],
        silver: [192, 192, 192, 1],
        skyblue: [135, 206, 235, 1],
        slateblue: [106, 90, 205, 1],
        slategray: [112, 128, 144, 1],
        slategrey: [112, 128, 144, 1],
        snow: [255, 250, 250, 1],
        springgreen: [0, 255, 127, 1],
        steelblue: [70, 130, 180, 1],
        tan: [210, 180, 140, 1],
        teal: [0, 128, 128, 1],
        thistle: [216, 191, 216, 1],
        tomato: [255, 99, 71, 1],
        turquoise: [64, 224, 208, 1],
        violet: [238, 130, 238, 1],
        wheat: [245, 222, 179, 1],
        white: [255, 255, 255, 1],
        whitesmoke: [245, 245, 245, 1],
        yellow: [255, 255, 0, 1],
        yellowgreen: [154, 205, 50, 1]
      };

      function n(t) {
        return (t = Math.round(t)) < 0 ? 0 : t > 255 ? 255 : t;
      }

      function i(t) {
        return t < 0 ? 0 : t > 1 ? 1 : t;
      }

      function a(t) {
        return "%" === t[t.length - 1] ? n(parseFloat(t) / 100 * 255) : n(parseInt(t));
      }

      function o(t) {
        return "%" === t[t.length - 1] ? i(parseFloat(t) / 100) : i(parseFloat(t));
      }

      function s(t, e, r) {
        return r < 0 ? r += 1 : r > 1 && (r -= 1), 6 * r < 1 ? t + (e - t) * r * 6 : 2 * r < 1 ? e : 3 * r < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t;
      }

      try {
        e.parseCSSColor = function (t) {
          var e,
              i = t.replace(/ /g, "").toLowerCase();
          if (i in r) return r[i].slice();
          if ("#" === i[0]) return 4 === i.length ? (e = parseInt(i.substr(1), 16)) >= 0 && e <= 4095 ? [(3840 & e) >> 4 | (3840 & e) >> 8, 240 & e | (240 & e) >> 4, 15 & e | (15 & e) << 4, 1] : null : 7 === i.length && (e = parseInt(i.substr(1), 16)) >= 0 && e <= 16777215 ? [(16711680 & e) >> 16, (65280 & e) >> 8, 255 & e, 1] : null;
          var u = i.indexOf("("),
              l = i.indexOf(")");

          if (-1 !== u && l + 1 === i.length) {
            var p = i.substr(0, u),
                c = i.substr(u + 1, l - (u + 1)).split(","),
                h = 1;

            switch (p) {
              case "rgba":
                if (4 !== c.length) return null;
                h = o(c.pop());

              case "rgb":
                return 3 !== c.length ? null : [a(c[0]), a(c[1]), a(c[2]), h];

              case "hsla":
                if (4 !== c.length) return null;
                h = o(c.pop());

              case "hsl":
                if (3 !== c.length) return null;
                var f = (parseFloat(c[0]) % 360 + 360) % 360 / 360,
                    y = o(c[1]),
                    d = o(c[2]),
                    m = d <= .5 ? d * (y + 1) : d + y - d * y,
                    v = 2 * d - m;
                return [n(255 * s(v, m, f + 1 / 3)), n(255 * s(v, m, f)), n(255 * s(v, m, f - 1 / 3)), h];

              default:
                return null;
            }
          }

          return null;
        };
      } catch (t) {}
    }).parseCSSColor,
        Ht = function (t, e, r, n) {
      void 0 === n && (n = 1), this.r = t, this.g = e, this.b = r, this.a = n;
    };

    Ht.parse = function (t) {
      if (t) {
        if (t instanceof Ht) return t;

        if ("string" == typeof t) {
          var e = Jt(t);
          if (e) return new Ht(e[0] / 255 * e[3], e[1] / 255 * e[3], e[2] / 255 * e[3], e[3]);
        }
      }
    }, Ht.prototype.toString = function () {
      var t = this.toArray(),
          e = t[0],
          r = t[1],
          n = t[2],
          i = t[3];
      return "rgba(" + Math.round(e) + "," + Math.round(r) + "," + Math.round(n) + "," + i + ")";
    }, Ht.prototype.toArray = function () {
      var t = this.r,
          e = this.g,
          r = this.b,
          n = this.a;
      return 0 === n ? [0, 0, 0, 0] : [255 * t / n, 255 * e / n, 255 * r / n, n];
    }, Ht.black = new Ht(0, 0, 0, 1), Ht.white = new Ht(1, 1, 1, 1), Ht.transparent = new Ht(0, 0, 0, 0), Ht.red = new Ht(1, 0, 0, 1);

    var Yt = function (t, e, r) {
      this.sensitivity = t ? e ? "variant" : "case" : e ? "accent" : "base", this.locale = r, this.collator = new Intl.Collator(this.locale ? this.locale : [], {
        sensitivity: this.sensitivity,
        usage: "search"
      });
    };

    Yt.prototype.compare = function (t, e) {
      return this.collator.compare(t, e);
    }, Yt.prototype.resolvedLocale = function () {
      return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
    };

    var $t = function (t, e, r) {
      this.text = t, this.scale = e, this.fontStack = r;
    },
        Wt = function (t) {
      this.sections = t;
    };

    function Qt(t, e, r, n) {
      return "number" == typeof t && t >= 0 && t <= 255 && "number" == typeof e && e >= 0 && e <= 255 && "number" == typeof r && r >= 0 && r <= 255 ? void 0 === n || "number" == typeof n && n >= 0 && n <= 1 ? null : "Invalid rgba value [" + [t, e, r, n].join(", ") + "]: 'a' must be between 0 and 1." : "Invalid rgba value [" + ("number" == typeof n ? [t, e, r, n] : [t, e, r]).join(", ") + "]: 'r', 'g', and 'b' must be between 0 and 255.";
    }

    function te(t) {
      if (null === t) return Ft;
      if ("string" == typeof t) return Dt;
      if ("boolean" == typeof t) return Ot;
      if ("number" == typeof t) return Lt;
      if (t instanceof Ht) return Rt;
      if (t instanceof Yt) return qt;
      if (t instanceof Wt) return Nt;

      if (Array.isArray(t)) {
        for (var e, r = t.length, n = 0, i = t; n < i.length; n += 1) {
          var a = te(i[n]);

          if (e) {
            if (e === a) continue;
            e = jt;
            break;
          }

          e = a;
        }

        return Kt(e || jt, r);
      }

      return Ut;
    }

    function ee(t) {
      var e = _typeof(t);

      return null === t ? "" : "string" === e || "number" === e || "boolean" === e ? String(t) : t instanceof Ht || t instanceof Wt ? t.toString() : JSON.stringify(t);
    }

    Wt.fromString = function (t) {
      return new Wt([new $t(t, null, null)]);
    }, Wt.prototype.toString = function () {
      return this.sections.map(function (t) {
        return t.text;
      }).join("");
    }, Wt.prototype.serialize = function () {
      for (var t = ["format"], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t.push(n.text);
        var i = {};
        n.fontStack && (i["text-font"] = ["literal", n.fontStack.split(",")]), n.scale && (i["font-scale"] = n.scale), t.push(i);
      }

      return t;
    };

    var re = function (t, e) {
      this.type = t, this.value = e;
    };

    re.parse = function (t, e) {
      if (2 !== t.length) return e.error("'literal' expression requires exactly one argument, but found " + (t.length - 1) + " instead.");
      if (!function t(e) {
        if (null === e) return !0;
        if ("string" == typeof e) return !0;
        if ("boolean" == typeof e) return !0;
        if ("number" == typeof e) return !0;
        if (e instanceof Ht) return !0;
        if (e instanceof Yt) return !0;
        if (e instanceof Wt) return !0;

        if (Array.isArray(e)) {
          for (var r = 0, n = e; r < n.length; r += 1) {
            if (!t(n[r])) return !1;
          }

          return !0;
        }

        if ("object" == _typeof(e)) {
          for (var i in e) {
            if (!t(e[i])) return !1;
          }

          return !0;
        }

        return !1;
      }(t[1])) return e.error("invalid value");
      var r = t[1],
          n = te(r),
          i = e.expectedType;
      return "array" !== n.kind || 0 !== n.N || !i || "array" !== i.kind || "number" == typeof i.N && 0 !== i.N || (n = i), new re(n, r);
    }, re.prototype.evaluate = function () {
      return this.value;
    }, re.prototype.eachChild = function () {}, re.prototype.possibleOutputs = function () {
      return [this.value];
    }, re.prototype.serialize = function () {
      return "array" === this.type.kind || "object" === this.type.kind ? ["literal", this.value] : this.value instanceof Ht ? ["rgba"].concat(this.value.toArray()) : this.value instanceof Wt ? this.value.serialize() : this.value;
    };

    var ne = function (t) {
      this.name = "ExpressionEvaluationError", this.message = t;
    };

    ne.prototype.toJSON = function () {
      return this.message;
    };

    var ie = {
      string: Dt,
      number: Lt,
      boolean: Ot,
      object: Ut
    },
        ae = function (t, e) {
      this.type = t, this.args = e;
    };

    ae.parse = function (t, e) {
      if (t.length < 2) return e.error("Expected at least one argument.");
      var r,
          n = 1,
          i = t[0];

      if ("array" === i) {
        var a, o;

        if (t.length > 2) {
          var s = t[1];
          if ("string" != typeof s || !(s in ie) || "object" === s) return e.error('The item type argument of "array" must be one of string, number, boolean', 1);
          a = ie[s], n++;
        } else a = jt;

        if (t.length > 3) {
          if (null !== t[2] && ("number" != typeof t[2] || t[2] < 0 || t[2] !== Math.floor(t[2]))) return e.error('The length argument to "array" must be a positive integer literal', 2);
          o = t[2], n++;
        }

        r = Kt(a, o);
      } else r = ie[i];

      for (var u = []; n < t.length; n++) {
        var l = e.parse(t[n], n, jt);
        if (!l) return null;
        u.push(l);
      }

      return new ae(r, u);
    }, ae.prototype.evaluate = function (t) {
      for (var e = 0; e < this.args.length; e++) {
        var r = this.args[e].evaluate(t);
        if (!Xt(this.type, te(r))) return r;
        if (e === this.args.length - 1) throw new ne("Expected value to be of type " + Zt(this.type) + ", but found " + Zt(te(r)) + " instead.");
      }

      return null;
    }, ae.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }, ae.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.args.map(function (t) {
        return t.possibleOutputs();
      }));
    }, ae.prototype.serialize = function () {
      var t = this.type,
          e = [t.kind];

      if ("array" === t.kind) {
        var r = t.itemType;

        if ("string" === r.kind || "number" === r.kind || "boolean" === r.kind) {
          e.push(r.kind);
          var n = t.N;
          ("number" == typeof n || this.args.length > 1) && e.push(n);
        }
      }

      return e.concat(this.args.map(function (t) {
        return t.serialize();
      }));
    };

    var oe = function (t) {
      this.type = Nt, this.sections = t;
    };

    oe.parse = function (t, e) {
      if (t.length < 3) return e.error("Expected at least two arguments.");
      if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");

      for (var r = [], n = 1; n < t.length - 1; n += 2) {
        var i = e.parse(t[n], 1, jt);
        if (!i) return null;
        var a = i.type.kind;
        if ("string" !== a && "value" !== a && "null" !== a) return e.error("Formatted text type must be 'string', 'value', or 'null'.");
        var o = t[n + 1];
        if ("object" != _typeof(o) || Array.isArray(o)) return e.error("Format options argument must be an object.");
        var s = null;
        if (o["font-scale"] && !(s = e.parse(o["font-scale"], 1, Lt))) return null;
        var u = null;
        if (o["text-font"] && !(u = e.parse(o["text-font"], 1, Kt(Dt)))) return null;
        r.push({
          text: i,
          scale: s,
          font: u
        });
      }

      return new oe(r);
    }, oe.prototype.evaluate = function (t) {
      return new Wt(this.sections.map(function (e) {
        return new $t(ee(e.text.evaluate(t)), e.scale ? e.scale.evaluate(t) : null, e.font ? e.font.evaluate(t).join(",") : null);
      }));
    }, oe.prototype.eachChild = function (t) {
      for (var e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t(n.text), n.scale && t(n.scale), n.font && t(n.font);
      }
    }, oe.prototype.possibleOutputs = function () {
      return [void 0];
    }, oe.prototype.serialize = function () {
      for (var t = ["format"], e = 0, r = this.sections; e < r.length; e += 1) {
        var n = r[e];
        t.push(n.text.serialize());
        var i = {};
        n.scale && (i["font-scale"] = n.scale.serialize()), n.font && (i["text-font"] = n.font.serialize()), t.push(i);
      }

      return t;
    };

    var se = {
      "to-boolean": Ot,
      "to-color": Rt,
      "to-number": Lt,
      "to-string": Dt
    },
        ue = function (t, e) {
      this.type = t, this.args = e;
    };

    ue.parse = function (t, e) {
      if (t.length < 2) return e.error("Expected at least one argument.");
      var r = t[0];
      if (("to-boolean" === r || "to-string" === r) && 2 !== t.length) return e.error("Expected one argument.");

      for (var n = se[r], i = [], a = 1; a < t.length; a++) {
        var o = e.parse(t[a], a, jt);
        if (!o) return null;
        i.push(o);
      }

      return new ue(n, i);
    }, ue.prototype.evaluate = function (t) {
      if ("boolean" === this.type.kind) return Boolean(this.args[0].evaluate(t));

      if ("color" === this.type.kind) {
        for (var e, r, n = 0, i = this.args; n < i.length; n += 1) {
          if (r = null, (e = i[n].evaluate(t)) instanceof Ht) return e;

          if ("string" == typeof e) {
            var a = t.parseColor(e);
            if (a) return a;
          } else if (Array.isArray(e) && !(r = e.length < 3 || e.length > 4 ? "Invalid rbga value " + JSON.stringify(e) + ": expected an array containing either three or four numeric values." : Qt(e[0], e[1], e[2], e[3]))) return new Ht(e[0] / 255, e[1] / 255, e[2] / 255, e[3]);
        }

        throw new ne(r || "Could not parse color from value '" + ("string" == typeof e ? e : String(JSON.stringify(e))) + "'");
      }

      if ("number" === this.type.kind) {
        for (var o = null, s = 0, u = this.args; s < u.length; s += 1) {
          if (null === (o = u[s].evaluate(t))) return 0;
          var l = Number(o);
          if (!isNaN(l)) return l;
        }

        throw new ne("Could not convert " + JSON.stringify(o) + " to number.");
      }

      return "formatted" === this.type.kind ? Wt.fromString(ee(this.args[0].evaluate(t))) : ee(this.args[0].evaluate(t));
    }, ue.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }, ue.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.args.map(function (t) {
        return t.possibleOutputs();
      }));
    }, ue.prototype.serialize = function () {
      if ("formatted" === this.type.kind) return new oe([{
        text: this.args[0],
        scale: null,
        font: null
      }]).serialize();
      var t = ["to-" + this.type.kind];
      return this.eachChild(function (e) {
        t.push(e.serialize());
      }), t;
    };

    var le = ["Unknown", "Point", "LineString", "Polygon"],
        pe = function () {
      this.globals = null, this.feature = null, this.featureState = null, this._parseColorCache = {};
    };

    pe.prototype.id = function () {
      return this.feature && "id" in this.feature ? this.feature.id : null;
    }, pe.prototype.geometryType = function () {
      return this.feature ? "number" == typeof this.feature.type ? le[this.feature.type] : this.feature.type : null;
    }, pe.prototype.properties = function () {
      return this.feature && this.feature.properties || {};
    }, pe.prototype.parseColor = function (t) {
      var e = this._parseColorCache[t];
      return e || (e = this._parseColorCache[t] = Ht.parse(t)), e;
    };

    var ce = function (t, e, r, n) {
      this.name = t, this.type = e, this._evaluate = r, this.args = n;
    };

    ce.prototype.evaluate = function (t) {
      return this._evaluate(t, this.args);
    }, ce.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }, ce.prototype.possibleOutputs = function () {
      return [void 0];
    }, ce.prototype.serialize = function () {
      return [this.name].concat(this.args.map(function (t) {
        return t.serialize();
      }));
    }, ce.parse = function (t, e) {
      var r,
          n = t[0],
          i = ce.definitions[n];
      if (!i) return e.error('Unknown expression "' + n + '". If you wanted a literal array, use ["literal", [...]].', 0);

      for (var a = Array.isArray(i) ? i[0] : i.type, o = Array.isArray(i) ? [[i[1], i[2]]] : i.overloads, s = o.filter(function (e) {
        var r = e[0];
        return !Array.isArray(r) || r.length === t.length - 1;
      }), u = null, l = 0, p = s; l < p.length; l += 1) {
        var c = p[l],
            h = c[0],
            f = c[1];
        u = new ve(e.registry, e.path, null, e.scope);

        for (var y = [], d = !1, m = 1; m < t.length; m++) {
          var v = t[m],
              g = Array.isArray(h) ? h[m - 1] : h.type,
              x = u.parse(v, 1 + y.length, g);

          if (!x) {
            d = !0;
            break;
          }

          y.push(x);
        }

        if (!d) if (Array.isArray(h) && h.length !== y.length) u.error("Expected " + h.length + " arguments, but found " + y.length + " instead.");else {
          for (var b = 0; b < y.length; b++) {
            var _ = Array.isArray(h) ? h[b] : h.type,
                w = y[b];

            u.concat(b + 1).checkSubtype(_, w.type);
          }

          if (0 === u.errors.length) return new ce(n, a, f, y);
        }
      }

      if (1 === s.length) (r = e.errors).push.apply(r, u.errors);else {
        for (var A = (s.length ? s : o).map(function (t) {
          var e,
              r = t[0];
          return e = r, Array.isArray(e) ? "(" + e.map(Zt).join(", ") + ")" : "(" + Zt(e.type) + "...)";
        }).join(" | "), k = [], S = 1; S < t.length; S++) {
          var z = e.parse(t[S], 1 + k.length);
          if (!z) return null;
          k.push(Zt(z.type));
        }

        e.error("Expected arguments of type " + A + ", but found (" + k.join(", ") + ") instead.");
      }
      return null;
    }, ce.register = function (t, e) {
      for (var r in ce.definitions = e, e) {
        t[r] = ce;
      }
    };

    var he = function (t, e, r) {
      this.type = qt, this.locale = r, this.caseSensitive = t, this.diacriticSensitive = e;
    };

    function fe(t) {
      if (t instanceof ce) {
        if ("get" === t.name && 1 === t.args.length) return !1;
        if ("feature-state" === t.name) return !1;
        if ("has" === t.name && 1 === t.args.length) return !1;
        if ("properties" === t.name || "geometry-type" === t.name || "id" === t.name) return !1;
        if (/^filter-/.test(t.name)) return !1;
      }

      var e = !0;
      return t.eachChild(function (t) {
        e && !fe(t) && (e = !1);
      }), e;
    }

    function ye(t) {
      if (t instanceof ce && "feature-state" === t.name) return !1;
      var e = !0;
      return t.eachChild(function (t) {
        e && !ye(t) && (e = !1);
      }), e;
    }

    function de(t, e) {
      if (t instanceof ce && e.indexOf(t.name) >= 0) return !1;
      var r = !0;
      return t.eachChild(function (t) {
        r && !de(t, e) && (r = !1);
      }), r;
    }

    he.parse = function (t, e) {
      if (2 !== t.length) return e.error("Expected one argument.");
      var r = t[1];
      if ("object" != _typeof(r) || Array.isArray(r)) return e.error("Collator options argument must be an object.");
      var n = e.parse(void 0 !== r["case-sensitive"] && r["case-sensitive"], 1, Ot);
      if (!n) return null;
      var i = e.parse(void 0 !== r["diacritic-sensitive"] && r["diacritic-sensitive"], 1, Ot);
      if (!i) return null;
      var a = null;
      return r.locale && !(a = e.parse(r.locale, 1, Dt)) ? null : new he(n, i, a);
    }, he.prototype.evaluate = function (t) {
      return new Yt(this.caseSensitive.evaluate(t), this.diacriticSensitive.evaluate(t), this.locale ? this.locale.evaluate(t) : null);
    }, he.prototype.eachChild = function (t) {
      t(this.caseSensitive), t(this.diacriticSensitive), this.locale && t(this.locale);
    }, he.prototype.possibleOutputs = function () {
      return [void 0];
    }, he.prototype.serialize = function () {
      var t = {};
      return t["case-sensitive"] = this.caseSensitive.serialize(), t["diacritic-sensitive"] = this.diacriticSensitive.serialize(), this.locale && (t.locale = this.locale.serialize()), ["collator", t];
    };

    var me = function (t, e) {
      this.type = e.type, this.name = t, this.boundExpression = e;
    };

    me.parse = function (t, e) {
      if (2 !== t.length || "string" != typeof t[1]) return e.error("'var' expression requires exactly one string literal argument.");
      var r = t[1];
      return e.scope.has(r) ? new me(r, e.scope.get(r)) : e.error('Unknown variable "' + r + '". Make sure "' + r + '" has been bound in an enclosing "let" expression before using it.', 1);
    }, me.prototype.evaluate = function (t) {
      return this.boundExpression.evaluate(t);
    }, me.prototype.eachChild = function () {}, me.prototype.possibleOutputs = function () {
      return [void 0];
    }, me.prototype.serialize = function () {
      return ["var", this.name];
    };

    var ve = function (t, e, r, n, i) {
      void 0 === e && (e = []), void 0 === n && (n = new Vt()), void 0 === i && (i = []), this.registry = t, this.path = e, this.key = e.map(function (t) {
        return "[" + t + "]";
      }).join(""), this.scope = n, this.errors = i, this.expectedType = r;
    };

    function ge(t, e) {
      for (var r, n, i = t.length - 1, a = 0, o = i, s = 0; a <= o;) {
        if (r = t[s = Math.floor((a + o) / 2)], n = t[s + 1], r <= e) {
          if (s === i || e < n) return s;
          a = s + 1;
        } else {
          if (!(r > e)) throw new ne("Input is not a number.");
          o = s - 1;
        }
      }

      return 0;
    }

    ve.prototype.parse = function (t, e, r, n, i) {
      return void 0 === i && (i = {}), e ? this.concat(e, r, n)._parse(t, i) : this._parse(t, i);
    }, ve.prototype._parse = function (t, e) {
      function r(t, e, r) {
        return "assert" === r ? new ae(e, [t]) : "coerce" === r ? new ue(e, [t]) : t;
      }

      if (null !== t && "string" != typeof t && "boolean" != typeof t && "number" != typeof t || (t = ["literal", t]), Array.isArray(t)) {
        if (0 === t.length) return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
        var n = t[0];
        if ("string" != typeof n) return this.error("Expression name must be a string, but found " + _typeof(n) + ' instead. If you wanted a literal array, use ["literal", [...]].', 0), null;
        var i = this.registry[n];

        if (i) {
          var a = i.parse(t, this);
          if (!a) return null;

          if (this.expectedType) {
            var o = this.expectedType,
                s = a.type;
            if ("string" !== o.kind && "number" !== o.kind && "boolean" !== o.kind && "object" !== o.kind && "array" !== o.kind || "value" !== s.kind) {
              if ("color" !== o.kind && "formatted" !== o.kind || "value" !== s.kind && "string" !== s.kind) {
                if (this.checkSubtype(o, s)) return null;
              } else a = r(a, o, e.typeAnnotation || "coerce");
            } else a = r(a, o, e.typeAnnotation || "assert");
          }

          if (!(a instanceof re) && function t(e) {
            if (e instanceof me) return t(e.boundExpression);
            if (e instanceof ce && "error" === e.name) return !1;
            if (e instanceof he) return !1;
            var r = e instanceof ue || e instanceof ae;
            var n = !0;
            e.eachChild(function (e) {
              n = r ? n && t(e) : n && e instanceof re;
            });
            if (!n) return !1;
            return fe(e) && de(e, ["zoom", "heatmap-density", "line-progress", "accumulated", "is-supported-script"]);
          }(a)) {
            var u = new pe();

            try {
              a = new re(a.type, a.evaluate(u));
            } catch (t) {
              return this.error(t.message), null;
            }
          }

          return a;
        }

        return this.error('Unknown expression "' + n + '". If you wanted a literal array, use ["literal", [...]].', 0);
      }

      return void 0 === t ? this.error("'undefined' value invalid. Use null instead.") : "object" == _typeof(t) ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error("Expected an array, but found " + _typeof(t) + " instead.");
    }, ve.prototype.concat = function (t, e, r) {
      var n = "number" == typeof t ? this.path.concat(t) : this.path,
          i = r ? this.scope.concat(r) : this.scope;
      return new ve(this.registry, n, e || null, i, this.errors);
    }, ve.prototype.error = function (t) {
      for (var e = [], r = arguments.length - 1; r-- > 0;) {
        e[r] = arguments[r + 1];
      }

      var n = "" + this.key + e.map(function (t) {
        return "[" + t + "]";
      }).join("");
      this.errors.push(new Pt(n, t));
    }, ve.prototype.checkSubtype = function (t, e) {
      var r = Xt(t, e);
      return r && this.error(r), r;
    };

    var xe = function (t, e, r) {
      this.type = t, this.input = e, this.labels = [], this.outputs = [];

      for (var n = 0, i = r; n < i.length; n += 1) {
        var a = i[n],
            o = a[0],
            s = a[1];
        this.labels.push(o), this.outputs.push(s);
      }
    };

    function be(t, e, r) {
      return t * (1 - r) + e * r;
    }

    xe.parse = function (t, e) {
      if (t.length - 1 < 4) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
      if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");
      var r = e.parse(t[1], 1, Lt);
      if (!r) return null;
      var n = [],
          i = null;
      e.expectedType && "value" !== e.expectedType.kind && (i = e.expectedType);

      for (var a = 1; a < t.length; a += 2) {
        var o = 1 === a ? -1 / 0 : t[a],
            s = t[a + 1],
            u = a,
            l = a + 1;
        if ("number" != typeof o) return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', u);
        if (n.length && n[n.length - 1][0] >= o) return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', u);
        var p = e.parse(s, l, i);
        if (!p) return null;
        i = i || p.type, n.push([o, p]);
      }

      return new xe(i, r, n);
    }, xe.prototype.evaluate = function (t) {
      var e = this.labels,
          r = this.outputs;
      if (1 === e.length) return r[0].evaluate(t);
      var n = this.input.evaluate(t);
      if (n <= e[0]) return r[0].evaluate(t);
      var i = e.length;
      return n >= e[i - 1] ? r[i - 1].evaluate(t) : r[ge(e, n)].evaluate(t);
    }, xe.prototype.eachChild = function (t) {
      t(this.input);

      for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
      }
    }, xe.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.outputs.map(function (t) {
        return t.possibleOutputs();
      }));
    }, xe.prototype.serialize = function () {
      for (var t = ["step", this.input.serialize()], e = 0; e < this.labels.length; e++) {
        e > 0 && t.push(this.labels[e]), t.push(this.outputs[e].serialize());
      }

      return t;
    };

    var _e = Object.freeze({
      number: be,
      color: function (t, e, r) {
        return new Ht(be(t.r, e.r, r), be(t.g, e.g, r), be(t.b, e.b, r), be(t.a, e.a, r));
      },
      array: function (t, e, r) {
        return t.map(function (t, n) {
          return be(t, e[n], r);
        });
      }
    }),
        we = .95047,
        Ae = 1,
        ke = 1.08883,
        Se = 4 / 29,
        ze = 6 / 29,
        Ie = 3 * ze * ze,
        Be = ze * ze * ze,
        Ce = Math.PI / 180,
        Ee = 180 / Math.PI;

    function Me(t) {
      return t > Be ? Math.pow(t, 1 / 3) : t / Ie + Se;
    }

    function Te(t) {
      return t > ze ? t * t * t : Ie * (t - Se);
    }

    function Pe(t) {
      return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055);
    }

    function Ve(t) {
      return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4);
    }

    function Fe(t) {
      var e = Ve(t.r),
          r = Ve(t.g),
          n = Ve(t.b),
          i = Me((.4124564 * e + .3575761 * r + .1804375 * n) / we),
          a = Me((.2126729 * e + .7151522 * r + .072175 * n) / Ae);
      return {
        l: 116 * a - 16,
        a: 500 * (i - a),
        b: 200 * (a - Me((.0193339 * e + .119192 * r + .9503041 * n) / ke)),
        alpha: t.a
      };
    }

    function Le(t) {
      var e = (t.l + 16) / 116,
          r = isNaN(t.a) ? e : e + t.a / 500,
          n = isNaN(t.b) ? e : e - t.b / 200;
      return e = Ae * Te(e), r = we * Te(r), n = ke * Te(n), new Ht(Pe(3.2404542 * r - 1.5371385 * e - .4985314 * n), Pe(-.969266 * r + 1.8760108 * e + .041556 * n), Pe(.0556434 * r - .2040259 * e + 1.0572252 * n), t.alpha);
    }

    function De(t, e, r) {
      var n = e - t;
      return t + r * (n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n);
    }

    var Oe = {
      forward: Fe,
      reverse: Le,
      interpolate: function (t, e, r) {
        return {
          l: be(t.l, e.l, r),
          a: be(t.a, e.a, r),
          b: be(t.b, e.b, r),
          alpha: be(t.alpha, e.alpha, r)
        };
      }
    },
        Re = {
      forward: function (t) {
        var e = Fe(t),
            r = e.l,
            n = e.a,
            i = e.b,
            a = Math.atan2(i, n) * Ee;
        return {
          h: a < 0 ? a + 360 : a,
          c: Math.sqrt(n * n + i * i),
          l: r,
          alpha: t.a
        };
      },
      reverse: function (t) {
        var e = t.h * Ce,
            r = t.c;
        return Le({
          l: t.l,
          a: Math.cos(e) * r,
          b: Math.sin(e) * r,
          alpha: t.alpha
        });
      },
      interpolate: function (t, e, r) {
        return {
          h: De(t.h, e.h, r),
          c: be(t.c, e.c, r),
          l: be(t.l, e.l, r),
          alpha: be(t.alpha, e.alpha, r)
        };
      }
    },
        Ue = Object.freeze({
      lab: Oe,
      hcl: Re
    }),
        je = function (t, e, r, n, i) {
      this.type = t, this.operator = e, this.interpolation = r, this.input = n, this.labels = [], this.outputs = [];

      for (var a = 0, o = i; a < o.length; a += 1) {
        var s = o[a],
            u = s[0],
            l = s[1];
        this.labels.push(u), this.outputs.push(l);
      }
    };

    function qe(t, e, r, n) {
      var i = n - r,
          a = t - r;
      return 0 === i ? 0 : 1 === e ? a / i : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1);
    }

    je.interpolationFactor = function (t, e, n, i) {
      var a = 0;
      if ("exponential" === t.name) a = qe(e, t.base, n, i);else if ("linear" === t.name) a = qe(e, 1, n, i);else if ("cubic-bezier" === t.name) {
        var o = t.controlPoints;
        a = new r(o[0], o[1], o[2], o[3]).solve(qe(e, 1, n, i));
      }
      return a;
    }, je.parse = function (t, e) {
      var r = t[0],
          n = t[1],
          i = t[2],
          a = t.slice(3);
      if (!Array.isArray(n) || 0 === n.length) return e.error("Expected an interpolation type expression.", 1);
      if ("linear" === n[0]) n = {
        name: "linear"
      };else if ("exponential" === n[0]) {
        var o = n[1];
        if ("number" != typeof o) return e.error("Exponential interpolation requires a numeric base.", 1, 1);
        n = {
          name: "exponential",
          base: o
        };
      } else {
        if ("cubic-bezier" !== n[0]) return e.error("Unknown interpolation type " + String(n[0]), 1, 0);
        var s = n.slice(1);
        if (4 !== s.length || s.some(function (t) {
          return "number" != typeof t || t < 0 || t > 1;
        })) return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
        n = {
          name: "cubic-bezier",
          controlPoints: s
        };
      }
      if (t.length - 1 < 4) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
      if ((t.length - 1) % 2 != 0) return e.error("Expected an even number of arguments.");
      if (!(i = e.parse(i, 2, Lt))) return null;
      var u = [],
          l = null;
      "interpolate-hcl" === r || "interpolate-lab" === r ? l = Rt : e.expectedType && "value" !== e.expectedType.kind && (l = e.expectedType);

      for (var p = 0; p < a.length; p += 2) {
        var c = a[p],
            h = a[p + 1],
            f = p + 3,
            y = p + 4;
        if ("number" != typeof c) return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', f);
        if (u.length && u[u.length - 1][0] >= c) return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', f);
        var d = e.parse(h, y, l);
        if (!d) return null;
        l = l || d.type, u.push([c, d]);
      }

      return "number" === l.kind || "color" === l.kind || "array" === l.kind && "number" === l.itemType.kind && "number" == typeof l.N ? new je(l, r, n, i, u) : e.error("Type " + Zt(l) + " is not interpolatable.");
    }, je.prototype.evaluate = function (t) {
      var e = this.labels,
          r = this.outputs;
      if (1 === e.length) return r[0].evaluate(t);
      var n = this.input.evaluate(t);
      if (n <= e[0]) return r[0].evaluate(t);
      var i = e.length;
      if (n >= e[i - 1]) return r[i - 1].evaluate(t);
      var a = ge(e, n),
          o = e[a],
          s = e[a + 1],
          u = je.interpolationFactor(this.interpolation, n, o, s),
          l = r[a].evaluate(t),
          p = r[a + 1].evaluate(t);
      return "interpolate" === this.operator ? _e[this.type.kind.toLowerCase()](l, p, u) : "interpolate-hcl" === this.operator ? Re.reverse(Re.interpolate(Re.forward(l), Re.forward(p), u)) : Oe.reverse(Oe.interpolate(Oe.forward(l), Oe.forward(p), u));
    }, je.prototype.eachChild = function (t) {
      t(this.input);

      for (var e = 0, r = this.outputs; e < r.length; e += 1) {
        t(r[e]);
      }
    }, je.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.outputs.map(function (t) {
        return t.possibleOutputs();
      }));
    }, je.prototype.serialize = function () {
      var t;
      t = "linear" === this.interpolation.name ? ["linear"] : "exponential" === this.interpolation.name ? 1 === this.interpolation.base ? ["linear"] : ["exponential", this.interpolation.base] : ["cubic-bezier"].concat(this.interpolation.controlPoints);

      for (var e = [this.operator, t, this.input.serialize()], r = 0; r < this.labels.length; r++) {
        e.push(this.labels[r], this.outputs[r].serialize());
      }

      return e;
    };

    var Ne = function (t, e) {
      this.type = t, this.args = e;
    };

    Ne.parse = function (t, e) {
      if (t.length < 2) return e.error("Expectected at least one argument.");
      var r = null,
          n = e.expectedType;
      n && "value" !== n.kind && (r = n);

      for (var i = [], a = 0, o = t.slice(1); a < o.length; a += 1) {
        var s = o[a],
            u = e.parse(s, 1 + i.length, r, void 0, {
          typeAnnotation: "omit"
        });
        if (!u) return null;
        r = r || u.type, i.push(u);
      }

      var l = n && i.some(function (t) {
        return Xt(n, t.type);
      });
      return new Ne(l ? jt : r, i);
    }, Ne.prototype.evaluate = function (t) {
      for (var e = null, r = 0, n = this.args; r < n.length; r += 1) {
        if (null !== (e = n[r].evaluate(t))) break;
      }

      return e;
    }, Ne.prototype.eachChild = function (t) {
      this.args.forEach(t);
    }, Ne.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.args.map(function (t) {
        return t.possibleOutputs();
      }));
    }, Ne.prototype.serialize = function () {
      var t = ["coalesce"];
      return this.eachChild(function (e) {
        t.push(e.serialize());
      }), t;
    };

    var Ke = function (t, e) {
      this.type = e.type, this.bindings = [].concat(t), this.result = e;
    };

    Ke.prototype.evaluate = function (t) {
      return this.result.evaluate(t);
    }, Ke.prototype.eachChild = function (t) {
      for (var e = 0, r = this.bindings; e < r.length; e += 1) {
        t(r[e][1]);
      }

      t(this.result);
    }, Ke.parse = function (t, e) {
      if (t.length < 4) return e.error("Expected at least 3 arguments, but found " + (t.length - 1) + " instead.");

      for (var r = [], n = 1; n < t.length - 1; n += 2) {
        var i = t[n];
        if ("string" != typeof i) return e.error("Expected string, but found " + _typeof(i) + " instead.", n);
        if (/[^a-zA-Z0-9_]/.test(i)) return e.error("Variable names must contain only alphanumeric characters or '_'.", n);
        var a = e.parse(t[n + 1], n + 1);
        if (!a) return null;
        r.push([i, a]);
      }

      var o = e.parse(t[t.length - 1], t.length - 1, e.expectedType, r);
      return o ? new Ke(r, o) : null;
    }, Ke.prototype.possibleOutputs = function () {
      return this.result.possibleOutputs();
    }, Ke.prototype.serialize = function () {
      for (var t = ["let"], e = 0, r = this.bindings; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        t.push(i, a.serialize());
      }

      return t.push(this.result.serialize()), t;
    };

    var Ze = function (t, e, r) {
      this.type = t, this.index = e, this.input = r;
    };

    Ze.parse = function (t, e) {
      if (3 !== t.length) return e.error("Expected 2 arguments, but found " + (t.length - 1) + " instead.");
      var r = e.parse(t[1], 1, Lt),
          n = e.parse(t[2], 2, Kt(e.expectedType || jt));
      if (!r || !n) return null;
      var i = n.type;
      return new Ze(i.itemType, r, n);
    }, Ze.prototype.evaluate = function (t) {
      var e = this.index.evaluate(t),
          r = this.input.evaluate(t);
      if (e < 0) throw new ne("Array index out of bounds: " + e + " < 0.");
      if (e >= r.length) throw new ne("Array index out of bounds: " + e + " > " + (r.length - 1) + ".");
      if (e !== Math.floor(e)) throw new ne("Array index must be an integer, but found " + e + " instead.");
      return r[e];
    }, Ze.prototype.eachChild = function (t) {
      t(this.index), t(this.input);
    }, Ze.prototype.possibleOutputs = function () {
      return [void 0];
    }, Ze.prototype.serialize = function () {
      return ["at", this.index.serialize(), this.input.serialize()];
    };

    var Ge = function (t, e, r, n, i, a) {
      this.inputType = t, this.type = e, this.input = r, this.cases = n, this.outputs = i, this.otherwise = a;
    };

    Ge.parse = function (t, e) {
      if (t.length < 5) return e.error("Expected at least 4 arguments, but found only " + (t.length - 1) + ".");
      if (t.length % 2 != 1) return e.error("Expected an even number of arguments.");
      var r, n;
      e.expectedType && "value" !== e.expectedType.kind && (n = e.expectedType);

      for (var i = {}, a = [], o = 2; o < t.length - 1; o += 2) {
        var s = t[o],
            u = t[o + 1];
        Array.isArray(s) || (s = [s]);
        var l = e.concat(o);
        if (0 === s.length) return l.error("Expected at least one branch label.");

        for (var p = 0, c = s; p < c.length; p += 1) {
          var h = c[p];
          if ("number" != typeof h && "string" != typeof h) return l.error("Branch labels must be numbers or strings.");
          if ("number" == typeof h && Math.abs(h) > Number.MAX_SAFE_INTEGER) return l.error("Branch labels must be integers no larger than " + Number.MAX_SAFE_INTEGER + ".");
          if ("number" == typeof h && Math.floor(h) !== h) return l.error("Numeric branch labels must be integer values.");

          if (r) {
            if (l.checkSubtype(r, te(h))) return null;
          } else r = te(h);

          if (void 0 !== i[String(h)]) return l.error("Branch labels must be unique.");
          i[String(h)] = a.length;
        }

        var f = e.parse(u, o, n);
        if (!f) return null;
        n = n || f.type, a.push(f);
      }

      var y = e.parse(t[1], 1, jt);
      if (!y) return null;
      var d = e.parse(t[t.length - 1], t.length - 1, n);
      return d ? "value" !== y.type.kind && e.concat(1).checkSubtype(r, y.type) ? null : new Ge(r, n, y, i, a, d) : null;
    }, Ge.prototype.evaluate = function (t) {
      var e = this.input.evaluate(t);
      return (te(e) === this.inputType && this.outputs[this.cases[e]] || this.otherwise).evaluate(t);
    }, Ge.prototype.eachChild = function (t) {
      t(this.input), this.outputs.forEach(t), t(this.otherwise);
    }, Ge.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.outputs.map(function (t) {
        return t.possibleOutputs();
      })).concat(this.otherwise.possibleOutputs());
    }, Ge.prototype.serialize = function () {
      for (var t = this, e = ["match", this.input.serialize()], r = [], n = {}, i = 0, a = Object.keys(this.cases).sort(); i < a.length; i += 1) {
        var o = a[i];
        void 0 === (c = n[this.cases[o]]) ? (n[this.cases[o]] = r.length, r.push([this.cases[o], [o]])) : r[c][1].push(o);
      }

      for (var s = function (e) {
        return "number" === t.inputType.kind ? Number(e) : e;
      }, u = 0, l = r; u < l.length; u += 1) {
        var p = l[u],
            c = p[0],
            h = p[1];
        1 === h.length ? e.push(s(h[0])) : e.push(h.map(s)), e.push(this.outputs[outputIndex$1].serialize());
      }

      return e.push(this.otherwise.serialize()), e;
    };

    var Xe = function (t, e, r) {
      this.type = t, this.branches = e, this.otherwise = r;
    };

    function Je(t, e) {
      return "==" === t || "!=" === t ? "boolean" === e.kind || "string" === e.kind || "number" === e.kind || "null" === e.kind || "value" === e.kind : "string" === e.kind || "number" === e.kind || "value" === e.kind;
    }

    function He(t, e, r, n) {
      return 0 === n.compare(e, r);
    }

    function Ye(t, e, r) {
      var n = "==" !== t && "!=" !== t;
      return function () {
        function i(t, e, r) {
          this.type = Ot, this.lhs = t, this.rhs = e, this.collator = r, this.hasUntypedArgument = "value" === t.type.kind || "value" === e.type.kind;
        }

        return i.parse = function (t, e) {
          if (3 !== t.length && 4 !== t.length) return e.error("Expected two or three arguments.");
          var r = t[0],
              a = e.parse(t[1], 1, jt);
          if (!a) return null;
          if (!Je(r, a.type)) return e.concat(1).error('"' + r + "\" comparisons are not supported for type '" + Zt(a.type) + "'.");
          var o = e.parse(t[2], 2, jt);
          if (!o) return null;
          if (!Je(r, o.type)) return e.concat(2).error('"' + r + "\" comparisons are not supported for type '" + Zt(o.type) + "'.");
          if (a.type.kind !== o.type.kind && "value" !== a.type.kind && "value" !== o.type.kind) return e.error("Cannot compare types '" + Zt(a.type) + "' and '" + Zt(o.type) + "'.");
          n && ("value" === a.type.kind && "value" !== o.type.kind ? a = new ae(o.type, [a]) : "value" !== a.type.kind && "value" === o.type.kind && (o = new ae(a.type, [o])));
          var s = null;

          if (4 === t.length) {
            if ("string" !== a.type.kind && "string" !== o.type.kind && "value" !== a.type.kind && "value" !== o.type.kind) return e.error("Cannot use collator to compare non-string types.");
            if (!(s = e.parse(t[3], 3, qt))) return null;
          }

          return new i(a, o, s);
        }, i.prototype.evaluate = function (i) {
          var a = this.lhs.evaluate(i),
              o = this.rhs.evaluate(i);

          if (n && this.hasUntypedArgument) {
            var s = te(a),
                u = te(o);
            if (s.kind !== u.kind || "string" !== s.kind && "number" !== s.kind) throw new ne('Expected arguments for "' + t + '" to be (string, string) or (number, number), but found (' + s.kind + ", " + u.kind + ") instead.");
          }

          if (this.collator && !n && this.hasUntypedArgument) {
            var l = te(a),
                p = te(o);
            if ("string" !== l.kind || "string" !== p.kind) return e(i, a, o);
          }

          return this.collator ? r(i, a, o, this.collator.evaluate(i)) : e(i, a, o);
        }, i.prototype.eachChild = function (t) {
          t(this.lhs), t(this.rhs), this.collator && t(this.collator);
        }, i.prototype.possibleOutputs = function () {
          return [!0, !1];
        }, i.prototype.serialize = function () {
          var e = [t];
          return this.eachChild(function (t) {
            e.push(t.serialize());
          }), e;
        }, i;
      }();
    }

    Xe.parse = function (t, e) {
      if (t.length < 4) return e.error("Expected at least 3 arguments, but found only " + (t.length - 1) + ".");
      if (t.length % 2 != 0) return e.error("Expected an odd number of arguments.");
      var r;
      e.expectedType && "value" !== e.expectedType.kind && (r = e.expectedType);

      for (var n = [], i = 1; i < t.length - 1; i += 2) {
        var a = e.parse(t[i], i, Ot);
        if (!a) return null;
        var o = e.parse(t[i + 1], i + 1, r);
        if (!o) return null;
        n.push([a, o]), r = r || o.type;
      }

      var s = e.parse(t[t.length - 1], t.length - 1, r);
      return s ? new Xe(r, n, s) : null;
    }, Xe.prototype.evaluate = function (t) {
      for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        if (i.evaluate(t)) return a.evaluate(t);
      }

      return this.otherwise.evaluate(t);
    }, Xe.prototype.eachChild = function (t) {
      for (var e = 0, r = this.branches; e < r.length; e += 1) {
        var n = r[e],
            i = n[0],
            a = n[1];
        t(i), t(a);
      }

      t(this.otherwise);
    }, Xe.prototype.possibleOutputs = function () {
      var t;
      return (t = []).concat.apply(t, this.branches.map(function (t) {
        t[0];
        return t[1].possibleOutputs();
      })).concat(this.otherwise.possibleOutputs());
    }, Xe.prototype.serialize = function () {
      var t = ["case"];
      return this.eachChild(function (e) {
        t.push(e.serialize());
      }), t;
    };

    var $e = Ye("==", function (t, e, r) {
      return e === r;
    }, He),
        We = Ye("!=", function (t, e, r) {
      return e !== r;
    }, function (t, e, r, n) {
      return !He(0, e, r, n);
    }),
        Qe = Ye("<", function (t, e, r) {
      return e < r;
    }, function (t, e, r, n) {
      return n.compare(e, r) < 0;
    }),
        tr = Ye(">", function (t, e, r) {
      return e > r;
    }, function (t, e, r, n) {
      return n.compare(e, r) > 0;
    }),
        er = Ye("<=", function (t, e, r) {
      return e <= r;
    }, function (t, e, r, n) {
      return n.compare(e, r) <= 0;
    }),
        rr = Ye(">=", function (t, e, r) {
      return e >= r;
    }, function (t, e, r, n) {
      return n.compare(e, r) >= 0;
    }),
        nr = function (t, e, r, n, i) {
      this.type = Dt, this.number = t, this.locale = e, this.currency = r, this.minFractionDigits = n, this.maxFractionDigits = i;
    };

    nr.parse = function (t, e) {
      if (3 !== t.length) return e.error("Expected two arguments.");
      var r = e.parse(t[1], 1, Lt);
      if (!r) return null;
      var n = t[2];
      if ("object" != _typeof(n) || Array.isArray(n)) return e.error("NumberFormat options argument must be an object.");
      var i = null;
      if (n.locale && !(i = e.parse(n.locale, 1, Dt))) return null;
      var a = null;
      if (n.currency && !(a = e.parse(n.currency, 1, Dt))) return null;
      var o = null;
      if (n["min-fraction-digits"] && !(o = e.parse(n["min-fraction-digits"], 1, Lt))) return null;
      var s = null;
      return n["max-fraction-digits"] && !(s = e.parse(n["max-fraction-digits"], 1, Lt)) ? null : new nr(r, i, a, o, s);
    }, nr.prototype.evaluate = function (t) {
      return new Intl.NumberFormat(this.locale ? this.locale.evaluate(t) : [], {
        style: this.currency ? "currency" : "decimal",
        currency: this.currency ? this.currency.evaluate(t) : void 0,
        minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(t) : void 0,
        maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(t) : void 0
      }).format(this.number.evaluate(t));
    }, nr.prototype.eachChild = function (t) {
      t(this.number), this.locale && t(this.locale), this.currency && t(this.currency), this.minFractionDigits && t(this.minFractionDigits), this.maxFractionDigits && t(this.maxFractionDigits);
    }, nr.prototype.possibleOutputs = function () {
      return [void 0];
    }, nr.prototype.serialize = function () {
      var t = {};
      return this.locale && (t.locale = this.locale.serialize()), this.currency && (t.currency = this.currency.serialize()), this.minFractionDigits && (t["min-fraction-digits"] = this.minFractionDigits.serialize()), this.maxFractionDigits && (t["max-fraction-digits"] = this.maxFractionDigits.serialize()), ["number-format", this.number.serialize(), t];
    };

    var ir = function (t) {
      this.type = Lt, this.input = t;
    };

    ir.parse = function (t, e) {
      if (2 !== t.length) return e.error("Expected 1 argument, but found " + (t.length - 1) + " instead.");
      var r = e.parse(t[1], 1);
      return r ? "array" !== r.type.kind && "string" !== r.type.kind && "value" !== r.type.kind ? e.error("Expected argument of type string or array, but found " + Zt(r.type) + " instead.") : new ir(r) : null;
    }, ir.prototype.evaluate = function (t) {
      var e = this.input.evaluate(t);
      if ("string" == typeof e) return e.length;
      if (Array.isArray(e)) return e.length;
      throw new ne("Expected value to be of type string or array, but found " + Zt(te(e)) + " instead.");
    }, ir.prototype.eachChild = function (t) {
      t(this.input);
    }, ir.prototype.possibleOutputs = function () {
      return [void 0];
    }, ir.prototype.serialize = function () {
      var t = ["length"];
      return this.eachChild(function (e) {
        t.push(e.serialize());
      }), t;
    };
    var ar = {
      "==": $e,
      "!=": We,
      ">": tr,
      "<": Qe,
      ">=": rr,
      "<=": er,
      array: ae,
      at: Ze,
      boolean: ae,
      case: Xe,
      coalesce: Ne,
      collator: he,
      format: oe,
      interpolate: je,
      "interpolate-hcl": je,
      "interpolate-lab": je,
      length: ir,
      let: Ke,
      literal: re,
      match: Ge,
      number: ae,
      "number-format": nr,
      object: ae,
      step: xe,
      string: ae,
      "to-boolean": ue,
      "to-color": ue,
      "to-number": ue,
      "to-string": ue,
      var: me
    };

    function or(t, e) {
      var r = e[0],
          n = e[1],
          i = e[2],
          a = e[3];
      r = r.evaluate(t), n = n.evaluate(t), i = i.evaluate(t);
      var o = a ? a.evaluate(t) : 1,
          s = Qt(r, n, i, o);
      if (s) throw new ne(s);
      return new Ht(r / 255 * o, n / 255 * o, i / 255 * o, o);
    }

    function sr(t, e) {
      return t in e;
    }

    function ur(t, e) {
      var r = e[t];
      return void 0 === r ? null : r;
    }

    function lr(t) {
      return {
        type: t
      };
    }

    function pr(t) {
      return {
        result: "success",
        value: t
      };
    }

    function cr(t) {
      return {
        result: "error",
        value: t
      };
    }

    function hr(t) {
      return "data-driven" === t["property-type"] || "cross-faded-data-driven" === t["property-type"];
    }

    function fr(t) {
      return !!t.expression && t.expression.parameters.indexOf("zoom") > -1;
    }

    function yr(t) {
      return !!t.expression && t.expression.interpolated;
    }

    function dr(t) {
      return t instanceof Number ? "number" : t instanceof String ? "string" : t instanceof Boolean ? "boolean" : Array.isArray(t) ? "array" : null === t ? "null" : _typeof(t);
    }

    function mr(t) {
      return "object" == _typeof(t) && null !== t && !Array.isArray(t);
    }

    function vr(t) {
      return t;
    }

    function gr(t, e, r) {
      return void 0 !== t ? t : void 0 !== e ? e : void 0 !== r ? r : void 0;
    }

    function xr(t, e, r, n, i) {
      return gr(_typeof(r) === i ? n[r] : void 0, t.default, e.default);
    }

    function br(t, e, r) {
      if ("number" !== dr(r)) return gr(t.default, e.default);
      var n = t.stops.length;
      if (1 === n) return t.stops[0][1];
      if (r <= t.stops[0][0]) return t.stops[0][1];
      if (r >= t.stops[n - 1][0]) return t.stops[n - 1][1];
      var i = ge(t.stops.map(function (t) {
        return t[0];
      }), r);
      return t.stops[i][1];
    }

    function _r(t, e, r) {
      var n = void 0 !== t.base ? t.base : 1;
      if ("number" !== dr(r)) return gr(t.default, e.default);
      var i = t.stops.length;
      if (1 === i) return t.stops[0][1];
      if (r <= t.stops[0][0]) return t.stops[0][1];
      if (r >= t.stops[i - 1][0]) return t.stops[i - 1][1];

      var a = ge(t.stops.map(function (t) {
        return t[0];
      }), r),
          o = function (t, e, r, n) {
        var i = n - r,
            a = t - r;
        return 0 === i ? 0 : 1 === e ? a / i : (Math.pow(e, a) - 1) / (Math.pow(e, i) - 1);
      }(r, n, t.stops[a][0], t.stops[a + 1][0]),
          s = t.stops[a][1],
          u = t.stops[a + 1][1],
          l = _e[e.type] || vr;

      if (t.colorSpace && "rgb" !== t.colorSpace) {
        var p = Ue[t.colorSpace];

        l = function (t, e) {
          return p.reverse(p.interpolate(p.forward(t), p.forward(e), o));
        };
      }

      return "function" == typeof s.evaluate ? {
        evaluate: function () {
          for (var t = [], e = arguments.length; e--;) {
            t[e] = arguments[e];
          }

          var r = s.evaluate.apply(void 0, t),
              n = u.evaluate.apply(void 0, t);
          if (void 0 !== r && void 0 !== n) return l(r, n, o);
        }
      } : l(s, u, o);
    }

    function wr(t, e, r) {
      return "color" === e.type ? r = Ht.parse(r) : "formatted" === e.type ? r = Wt.fromString(r.toString()) : dr(r) === e.type || "enum" === e.type && e.values[r] || (r = void 0), gr(r, t.default, e.default);
    }

    ce.register(ar, {
      error: [{
        kind: "error"
      }, [Dt], function (t, e) {
        var r = e[0];
        throw new ne(r.evaluate(t));
      }],
      typeof: [Dt, [jt], function (t, e) {
        return Zt(te(e[0].evaluate(t)));
      }],
      "to-rgba": [Kt(Lt, 4), [Rt], function (t, e) {
        return e[0].evaluate(t).toArray();
      }],
      rgb: [Rt, [Lt, Lt, Lt], or],
      rgba: [Rt, [Lt, Lt, Lt, Lt], or],
      has: {
        type: Ot,
        overloads: [[[Dt], function (t, e) {
          return sr(e[0].evaluate(t), t.properties());
        }], [[Dt, Ut], function (t, e) {
          var r = e[0],
              n = e[1];
          return sr(r.evaluate(t), n.evaluate(t));
        }]]
      },
      get: {
        type: jt,
        overloads: [[[Dt], function (t, e) {
          return ur(e[0].evaluate(t), t.properties());
        }], [[Dt, Ut], function (t, e) {
          var r = e[0],
              n = e[1];
          return ur(r.evaluate(t), n.evaluate(t));
        }]]
      },
      "feature-state": [jt, [Dt], function (t, e) {
        return ur(e[0].evaluate(t), t.featureState || {});
      }],
      properties: [Ut, [], function (t) {
        return t.properties();
      }],
      "geometry-type": [Dt, [], function (t) {
        return t.geometryType();
      }],
      id: [jt, [], function (t) {
        return t.id();
      }],
      zoom: [Lt, [], function (t) {
        return t.globals.zoom;
      }],
      "heatmap-density": [Lt, [], function (t) {
        return t.globals.heatmapDensity || 0;
      }],
      "line-progress": [Lt, [], function (t) {
        return t.globals.lineProgress || 0;
      }],
      accumulated: [jt, [], function (t) {
        return void 0 === t.globals.accumulated ? null : t.globals.accumulated;
      }],
      "+": [Lt, lr(Lt), function (t, e) {
        for (var r = 0, n = 0, i = e; n < i.length; n += 1) {
          r += i[n].evaluate(t);
        }

        return r;
      }],
      "*": [Lt, lr(Lt), function (t, e) {
        for (var r = 1, n = 0, i = e; n < i.length; n += 1) {
          r *= i[n].evaluate(t);
        }

        return r;
      }],
      "-": {
        type: Lt,
        overloads: [[[Lt, Lt], function (t, e) {
          var r = e[0],
              n = e[1];
          return r.evaluate(t) - n.evaluate(t);
        }], [[Lt], function (t, e) {
          return -e[0].evaluate(t);
        }]]
      },
      "/": [Lt, [Lt, Lt], function (t, e) {
        var r = e[0],
            n = e[1];
        return r.evaluate(t) / n.evaluate(t);
      }],
      "%": [Lt, [Lt, Lt], function (t, e) {
        var r = e[0],
            n = e[1];
        return r.evaluate(t) % n.evaluate(t);
      }],
      ln2: [Lt, [], function () {
        return Math.LN2;
      }],
      pi: [Lt, [], function () {
        return Math.PI;
      }],
      e: [Lt, [], function () {
        return Math.E;
      }],
      "^": [Lt, [Lt, Lt], function (t, e) {
        var r = e[0],
            n = e[1];
        return Math.pow(r.evaluate(t), n.evaluate(t));
      }],
      sqrt: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.sqrt(r.evaluate(t));
      }],
      log10: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t)) / Math.LN10;
      }],
      ln: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t));
      }],
      log2: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.log(r.evaluate(t)) / Math.LN2;
      }],
      sin: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.sin(r.evaluate(t));
      }],
      cos: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.cos(r.evaluate(t));
      }],
      tan: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.tan(r.evaluate(t));
      }],
      asin: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.asin(r.evaluate(t));
      }],
      acos: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.acos(r.evaluate(t));
      }],
      atan: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.atan(r.evaluate(t));
      }],
      min: [Lt, lr(Lt), function (t, e) {
        return Math.min.apply(Math, e.map(function (e) {
          return e.evaluate(t);
        }));
      }],
      max: [Lt, lr(Lt), function (t, e) {
        return Math.max.apply(Math, e.map(function (e) {
          return e.evaluate(t);
        }));
      }],
      abs: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.abs(r.evaluate(t));
      }],
      round: [Lt, [Lt], function (t, e) {
        var r = e[0].evaluate(t);
        return r < 0 ? -Math.round(-r) : Math.round(r);
      }],
      floor: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.floor(r.evaluate(t));
      }],
      ceil: [Lt, [Lt], function (t, e) {
        var r = e[0];
        return Math.ceil(r.evaluate(t));
      }],
      "filter-==": [Ot, [Dt, jt], function (t, e) {
        var r = e[0],
            n = e[1];
        return t.properties()[r.value] === n.value;
      }],
      "filter-id-==": [Ot, [jt], function (t, e) {
        var r = e[0];
        return t.id() === r.value;
      }],
      "filter-type-==": [Ot, [Dt], function (t, e) {
        var r = e[0];
        return t.geometryType() === r.value;
      }],
      "filter-<": [Ot, [Dt, jt], function (t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return _typeof(i) == _typeof(a) && i < a;
      }],
      "filter-id-<": [Ot, [jt], function (t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return _typeof(n) == _typeof(i) && n < i;
      }],
      "filter->": [Ot, [Dt, jt], function (t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return _typeof(i) == _typeof(a) && i > a;
      }],
      "filter-id->": [Ot, [jt], function (t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return _typeof(n) == _typeof(i) && n > i;
      }],
      "filter-<=": [Ot, [Dt, jt], function (t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return _typeof(i) == _typeof(a) && i <= a;
      }],
      "filter-id-<=": [Ot, [jt], function (t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return _typeof(n) == _typeof(i) && n <= i;
      }],
      "filter->=": [Ot, [Dt, jt], function (t, e) {
        var r = e[0],
            n = e[1],
            i = t.properties()[r.value],
            a = n.value;
        return _typeof(i) == _typeof(a) && i >= a;
      }],
      "filter-id->=": [Ot, [jt], function (t, e) {
        var r = e[0],
            n = t.id(),
            i = r.value;
        return _typeof(n) == _typeof(i) && n >= i;
      }],
      "filter-has": [Ot, [jt], function (t, e) {
        return e[0].value in t.properties();
      }],
      "filter-has-id": [Ot, [], function (t) {
        return null !== t.id();
      }],
      "filter-type-in": [Ot, [Kt(Dt)], function (t, e) {
        return e[0].value.indexOf(t.geometryType()) >= 0;
      }],
      "filter-id-in": [Ot, [Kt(jt)], function (t, e) {
        return e[0].value.indexOf(t.id()) >= 0;
      }],
      "filter-in-small": [Ot, [Dt, Kt(jt)], function (t, e) {
        var r = e[0];
        return e[1].value.indexOf(t.properties()[r.value]) >= 0;
      }],
      "filter-in-large": [Ot, [Dt, Kt(jt)], function (t, e) {
        var r = e[0],
            n = e[1];
        return function (t, e, r, n) {
          for (; r <= n;) {
            var i = r + n >> 1;
            if (e[i] === t) return !0;
            e[i] > t ? n = i - 1 : r = i + 1;
          }

          return !1;
        }(t.properties()[r.value], n.value, 0, n.value.length - 1);
      }],
      all: {
        type: Ot,
        overloads: [[[Ot, Ot], function (t, e) {
          var r = e[0],
              n = e[1];
          return r.evaluate(t) && n.evaluate(t);
        }], [lr(Ot), function (t, e) {
          for (var r = 0, n = e; r < n.length; r += 1) {
            if (!n[r].evaluate(t)) return !1;
          }

          return !0;
        }]]
      },
      any: {
        type: Ot,
        overloads: [[[Ot, Ot], function (t, e) {
          var r = e[0],
              n = e[1];
          return r.evaluate(t) || n.evaluate(t);
        }], [lr(Ot), function (t, e) {
          for (var r = 0, n = e; r < n.length; r += 1) {
            if (n[r].evaluate(t)) return !0;
          }

          return !1;
        }]]
      },
      "!": [Ot, [Ot], function (t, e) {
        return !e[0].evaluate(t);
      }],
      "is-supported-script": [Ot, [Dt], function (t, e) {
        var r = e[0],
            n = t.globals && t.globals.isSupportedScript;
        return !n || n(r.evaluate(t));
      }],
      upcase: [Dt, [Dt], function (t, e) {
        return e[0].evaluate(t).toUpperCase();
      }],
      downcase: [Dt, [Dt], function (t, e) {
        return e[0].evaluate(t).toLowerCase();
      }],
      concat: [Dt, lr(jt), function (t, e) {
        return e.map(function (e) {
          return ee(e.evaluate(t));
        }).join("");
      }],
      "resolved-locale": [Dt, [qt], function (t, e) {
        return e[0].evaluate(t).resolvedLocale();
      }]
    });

    var Ar = function (t, e) {
      this.expression = t, this._warningHistory = {}, this._evaluator = new pe(), this._defaultValue = e ? function (t) {
        return "color" === t.type && mr(t.default) ? new Ht(0, 0, 0, 0) : "color" === t.type ? Ht.parse(t.default) || null : void 0 === t.default ? null : t.default;
      }(e) : null, this._enumValues = e && "enum" === e.type ? e.values : null;
    };

    function kr(t) {
      return Array.isArray(t) && t.length > 0 && "string" == typeof t[0] && t[0] in ar;
    }

    function Sr(t, e) {
      var r = new ve(ar, [], e ? function (t) {
        var e = {
          color: Rt,
          string: Dt,
          number: Lt,
          enum: Dt,
          boolean: Ot,
          formatted: Nt
        };
        if ("array" === t.type) return Kt(e[t.value] || jt, t.length);
        return e[t.type];
      }(e) : void 0),
          n = r.parse(t, void 0, void 0, void 0, e && "string" === e.type ? {
        typeAnnotation: "coerce"
      } : void 0);
      return n ? pr(new Ar(n, e)) : cr(r.errors);
    }

    Ar.prototype.evaluateWithoutErrorHandling = function (t, e, r) {
      return this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = r, this.expression.evaluate(this._evaluator);
    }, Ar.prototype.evaluate = function (t, e, r) {
      this._evaluator.globals = t, this._evaluator.feature = e || null, this._evaluator.featureState = r || null;

      try {
        var n = this.expression.evaluate(this._evaluator);
        if (null == n) return this._defaultValue;
        if (this._enumValues && !(n in this._enumValues)) throw new ne("Expected value to be one of " + Object.keys(this._enumValues).map(function (t) {
          return JSON.stringify(t);
        }).join(", ") + ", but found " + JSON.stringify(n) + " instead.");
        return n;
      } catch (t) {
        return this._warningHistory[t.message] || (this._warningHistory[t.message] = !0, "undefined" != typeof console && console.warn(t.message)), this._defaultValue;
      }
    };

    var zr = function (t, e) {
      this.kind = t, this._styleExpression = e, this.isStateDependent = "constant" !== t && !ye(e.expression);
    };

    zr.prototype.evaluateWithoutErrorHandling = function (t, e, r) {
      return this._styleExpression.evaluateWithoutErrorHandling(t, e, r);
    }, zr.prototype.evaluate = function (t, e, r) {
      return this._styleExpression.evaluate(t, e, r);
    };

    var Ir = function (t, e, r) {
      this.kind = t, this.zoomStops = r.labels, this._styleExpression = e, this.isStateDependent = "camera" !== t && !ye(e.expression), r instanceof je && (this.interpolationType = r.interpolation);
    };

    function Br(t, e) {
      if ("error" === (t = Sr(t, e)).result) return t;
      var r = t.value.expression,
          n = fe(r);
      if (!n && !hr(e)) return cr([new Pt("", "data expressions not supported")]);
      var i = de(r, ["zoom"]);
      if (!i && !fr(e)) return cr([new Pt("", "zoom expressions not supported")]);

      var a = function t(e) {
        var r = null;
        if (e instanceof Ke) r = t(e.result);else if (e instanceof Ne) for (var n = 0, i = e.args; n < i.length; n += 1) {
          var a = i[n];
          if (r = t(a)) break;
        } else (e instanceof xe || e instanceof je) && e.input instanceof ce && "zoom" === e.input.name && (r = e);
        if (r instanceof Pt) return r;
        e.eachChild(function (e) {
          var n = t(e);
          n instanceof Pt ? r = n : !r && n ? r = new Pt("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : r && n && r !== n && (r = new Pt("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
        });
        return r;
      }(r);

      return a || i ? a instanceof Pt ? cr([a]) : a instanceof je && !yr(e) ? cr([new Pt("", '"interpolate" expressions cannot be used with this property')]) : pr(a ? new Ir(n ? "camera" : "composite", t.value, a) : new zr(n ? "constant" : "source", t.value)) : cr([new Pt("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
    }

    Ir.prototype.evaluateWithoutErrorHandling = function (t, e, r) {
      return this._styleExpression.evaluateWithoutErrorHandling(t, e, r);
    }, Ir.prototype.evaluate = function (t, e, r) {
      return this._styleExpression.evaluate(t, e, r);
    }, Ir.prototype.interpolationFactor = function (t, e, r) {
      return this.interpolationType ? je.interpolationFactor(this.interpolationType, t, e, r) : 0;
    };

    var Cr = function (t, e) {
      this._parameters = t, this._specification = e, Ct(this, function t(e, r) {
        var n,
            i,
            a,
            o = "color" === r.type,
            s = e.stops && "object" == _typeof(e.stops[0][0]),
            u = s || void 0 !== e.property,
            l = s || !u,
            p = e.type || (yr(r) ? "exponential" : "interval");

        if (o && ((e = Ct({}, e)).stops && (e.stops = e.stops.map(function (t) {
          return [t[0], Ht.parse(t[1])];
        })), e.default ? e.default = Ht.parse(e.default) : e.default = Ht.parse(r.default)), e.colorSpace && "rgb" !== e.colorSpace && !Ue[e.colorSpace]) throw new Error("Unknown color space: " + e.colorSpace);
        if ("exponential" === p) n = _r;else if ("interval" === p) n = br;else if ("categorical" === p) {
          n = xr, i = Object.create(null);

          for (var c = 0, h = e.stops; c < h.length; c += 1) {
            var f = h[c];
            i[f[0]] = f[1];
          }

          a = _typeof(e.stops[0][0]);
        } else {
          if ("identity" !== p) throw new Error('Unknown function type "' + p + '"');
          n = wr;
        }

        if (s) {
          for (var y = {}, d = [], m = 0; m < e.stops.length; m++) {
            var v = e.stops[m],
                g = v[0].zoom;
            void 0 === y[g] && (y[g] = {
              zoom: g,
              type: e.type,
              property: e.property,
              default: e.default,
              stops: []
            }, d.push(g)), y[g].stops.push([v[0].value, v[1]]);
          }

          for (var x = [], b = 0, _ = d; b < _.length; b += 1) {
            var w = _[b];
            x.push([y[w].zoom, t(y[w], r)]);
          }

          var A = {
            name: "linear"
          };
          return {
            kind: "composite",
            interpolationType: A,
            interpolationFactor: je.interpolationFactor.bind(void 0, A),
            zoomStops: x.map(function (t) {
              return t[0];
            }),
            evaluate: function (t, n) {
              var i = t.zoom;
              return _r({
                stops: x,
                base: e.base
              }, r, i).evaluate(i, n);
            }
          };
        }

        if (l) {
          var k = "exponential" === p ? {
            name: "exponential",
            base: void 0 !== e.base ? e.base : 1
          } : null;
          return {
            kind: "camera",
            interpolationType: k,
            interpolationFactor: je.interpolationFactor.bind(void 0, k),
            zoomStops: e.stops.map(function (t) {
              return t[0];
            }),
            evaluate: function (t) {
              var o = t.zoom;
              return n(e, r, o, i, a);
            }
          };
        }

        return {
          kind: "source",
          evaluate: function (t, o) {
            var s = o && o.properties ? o.properties[e.property] : void 0;
            return void 0 === s ? gr(e.default, r.default) : n(e, r, s, i, a);
          }
        };
      }(this._parameters, this._specification));
    };

    function Er(t) {
      var e = t.key,
          r = t.value,
          n = t.valueSpec || {},
          i = t.objectElementValidators || {},
          a = t.style,
          o = t.styleSpec,
          s = [],
          u = dr(r);
      if ("object" !== u) return [new It(e, r, "object expected, " + u + " found")];

      for (var l in r) {
        var p = l.split(".")[0],
            c = n[p] || n["*"],
            h = void 0;
        if (i[p]) h = i[p];else if (n[p]) h = tn;else if (i["*"]) h = i["*"];else {
          if (!n["*"]) {
            s.push(new It(e, r[l], 'unknown property "' + l + '"'));
            continue;
          }

          h = tn;
        }
        s = s.concat(h({
          key: (e ? e + "." : e) + l,
          value: r[l],
          valueSpec: c,
          style: a,
          styleSpec: o,
          object: r,
          objectKey: l
        }, r));
      }

      for (var f in n) {
        i[f] || n[f].required && void 0 === n[f].default && void 0 === r[f] && s.push(new It(e, r, 'missing required property "' + f + '"'));
      }

      return s;
    }

    function Mr(t) {
      var e = t.value,
          r = t.valueSpec,
          n = t.style,
          i = t.styleSpec,
          a = t.key,
          o = t.arrayElementValidator || tn;
      if ("array" !== dr(e)) return [new It(a, e, "array expected, " + dr(e) + " found")];
      if (r.length && e.length !== r.length) return [new It(a, e, "array length " + r.length + " expected, length " + e.length + " found")];
      if (r["min-length"] && e.length < r["min-length"]) return [new It(a, e, "array length at least " + r["min-length"] + " expected, length " + e.length + " found")];
      var s = {
        type: r.value,
        values: r.values
      };
      i.$version < 7 && (s.function = r.function), "object" === dr(r.value) && (s = r.value);

      for (var u = [], l = 0; l < e.length; l++) {
        u = u.concat(o({
          array: e,
          arrayIndex: l,
          value: e[l],
          valueSpec: s,
          style: n,
          styleSpec: i,
          key: a + "[" + l + "]"
        }));
      }

      return u;
    }

    function Tr(t) {
      var e = t.key,
          r = t.value,
          n = t.valueSpec,
          i = dr(r);
      return "number" !== i ? [new It(e, r, "number expected, " + i + " found")] : "minimum" in n && r < n.minimum ? [new It(e, r, r + " is less than the minimum value " + n.minimum)] : "maximum" in n && r > n.maximum ? [new It(e, r, r + " is greater than the maximum value " + n.maximum)] : [];
    }

    function Pr(t) {
      var e,
          r,
          n,
          i = t.valueSpec,
          a = Mt(t.value.type),
          o = {},
          s = "categorical" !== a && void 0 === t.value.property,
          u = !s,
          l = "array" === dr(t.value.stops) && "array" === dr(t.value.stops[0]) && "object" === dr(t.value.stops[0][0]),
          p = Er({
        key: t.key,
        value: t.value,
        valueSpec: t.styleSpec.function,
        style: t.style,
        styleSpec: t.styleSpec,
        objectElementValidators: {
          stops: function (t) {
            if ("identity" === a) return [new It(t.key, t.value, 'identity function may not have a "stops" property')];
            var e = [],
                r = t.value;
            e = e.concat(Mr({
              key: t.key,
              value: r,
              valueSpec: t.valueSpec,
              style: t.style,
              styleSpec: t.styleSpec,
              arrayElementValidator: c
            })), "array" === dr(r) && 0 === r.length && e.push(new It(t.key, r, "array must have at least one stop"));
            return e;
          },
          default: function (t) {
            return tn({
              key: t.key,
              value: t.value,
              valueSpec: i,
              style: t.style,
              styleSpec: t.styleSpec
            });
          }
        }
      });
      return "identity" === a && s && p.push(new It(t.key, t.value, 'missing required property "property"')), "identity" === a || t.value.stops || p.push(new It(t.key, t.value, 'missing required property "stops"')), "exponential" === a && t.valueSpec.expression && !yr(t.valueSpec) && p.push(new It(t.key, t.value, "exponential functions not supported")), t.styleSpec.$version >= 8 && (u && !hr(t.valueSpec) ? p.push(new It(t.key, t.value, "property functions not supported")) : s && !fr(t.valueSpec) && p.push(new It(t.key, t.value, "zoom functions not supported"))), "categorical" !== a && !l || void 0 !== t.value.property || p.push(new It(t.key, t.value, '"property" property is required')), p;

      function c(t) {
        var e = [],
            a = t.value,
            s = t.key;
        if ("array" !== dr(a)) return [new It(s, a, "array expected, " + dr(a) + " found")];
        if (2 !== a.length) return [new It(s, a, "array length 2 expected, length " + a.length + " found")];

        if (l) {
          if ("object" !== dr(a[0])) return [new It(s, a, "object expected, " + dr(a[0]) + " found")];
          if (void 0 === a[0].zoom) return [new It(s, a, "object stop key must have zoom")];
          if (void 0 === a[0].value) return [new It(s, a, "object stop key must have value")];
          if (n && n > Mt(a[0].zoom)) return [new It(s, a[0].zoom, "stop zoom values must appear in ascending order")];
          Mt(a[0].zoom) !== n && (n = Mt(a[0].zoom), r = void 0, o = {}), e = e.concat(Er({
            key: s + "[0]",
            value: a[0],
            valueSpec: {
              zoom: {}
            },
            style: t.style,
            styleSpec: t.styleSpec,
            objectElementValidators: {
              zoom: Tr,
              value: h
            }
          }));
        } else e = e.concat(h({
          key: s + "[0]",
          value: a[0],
          valueSpec: {},
          style: t.style,
          styleSpec: t.styleSpec
        }, a));

        return kr(Tt(a[1])) ? e.concat([new It(s + "[1]", a[1], "expressions are not allowed in function stops.")]) : e.concat(tn({
          key: s + "[1]",
          value: a[1],
          valueSpec: i,
          style: t.style,
          styleSpec: t.styleSpec
        }));
      }

      function h(t, n) {
        var s = dr(t.value),
            u = Mt(t.value),
            l = null !== t.value ? t.value : n;

        if (e) {
          if (s !== e) return [new It(t.key, l, s + " stop domain type must match previous stop domain type " + e)];
        } else e = s;

        if ("number" !== s && "string" !== s && "boolean" !== s) return [new It(t.key, l, "stop domain value must be a number, string, or boolean")];

        if ("number" !== s && "categorical" !== a) {
          var p = "number expected, " + s + " found";
          return hr(i) && void 0 === a && (p += '\nIf you intended to use a categorical function, specify `"type": "categorical"`.'), [new It(t.key, l, p)];
        }

        return "categorical" !== a || "number" !== s || isFinite(u) && Math.floor(u) === u ? "categorical" !== a && "number" === s && void 0 !== r && u < r ? [new It(t.key, l, "stop domain values must appear in ascending order")] : (r = u, "categorical" === a && u in o ? [new It(t.key, l, "stop domain values must be unique")] : (o[u] = !0, [])) : [new It(t.key, l, "integer expected, found " + u)];
      }
    }

    function Vr(t) {
      var e = ("property" === t.expressionContext ? Br : Sr)(Tt(t.value), t.valueSpec);
      if ("error" === e.result) return e.value.map(function (e) {
        return new It("" + t.key + e.key, t.value, e.message);
      });
      var r = e.value.expression || e.value._styleExpression.expression;
      if ("property" === t.expressionContext && "text-font" === t.propertyKey && -1 !== r.possibleOutputs().indexOf(void 0)) return [new It(t.key, t.value, 'Invalid data expression for "' + t.propertyKey + '". Output values must be contained as literals within the expression.')];
      if ("property" === t.expressionContext && "layout" === t.propertyType && !ye(r)) return [new It(t.key, t.value, '"feature-state" data expressions are not supported with layout properties.')];
      if ("filter" === t.expressionContext && !ye(r)) return [new It(t.key, t.value, '"feature-state" data expressions are not supported with filters.')];

      if (t.expressionContext && 0 === t.expressionContext.indexOf("cluster")) {
        if (!de(r, ["zoom", "feature-state"])) return [new It(t.key, t.value, '"zoom" and "feature-state" expressions are not supported with cluster properties.')];
        if ("cluster-initial" === t.expressionContext && !fe(r)) return [new It(t.key, t.value, "Feature data expressions are not supported with initial expression part of cluster properties.")];
      }

      return [];
    }

    function Fr(t) {
      var e = t.key,
          r = t.value,
          n = t.valueSpec,
          i = [];
      return Array.isArray(n.values) ? -1 === n.values.indexOf(Mt(r)) && i.push(new It(e, r, "expected one of [" + n.values.join(", ") + "], " + JSON.stringify(r) + " found")) : -1 === Object.keys(n.values).indexOf(Mt(r)) && i.push(new It(e, r, "expected one of [" + Object.keys(n.values).join(", ") + "], " + JSON.stringify(r) + " found")), i;
    }

    function Lr(t) {
      if (!0 === t || !1 === t) return !0;
      if (!Array.isArray(t) || 0 === t.length) return !1;

      switch (t[0]) {
        case "has":
          return t.length >= 2 && "$id" !== t[1] && "$type" !== t[1];

        case "in":
        case "!in":
        case "!has":
        case "none":
          return !1;

        case "==":
        case "!=":
        case ">":
        case ">=":
        case "<":
        case "<=":
          return 3 !== t.length || Array.isArray(t[1]) || Array.isArray(t[2]);

        case "any":
        case "all":
          for (var e = 0, r = t.slice(1); e < r.length; e += 1) {
            var n = r[e];
            if (!Lr(n) && "boolean" != typeof n) return !1;
          }

          return !0;

        default:
          return !0;
      }
    }

    Cr.deserialize = function (t) {
      return new Cr(t._parameters, t._specification);
    }, Cr.serialize = function (t) {
      return {
        _parameters: t._parameters,
        _specification: t._specification
      };
    };
    var Dr = {
      type: "boolean",
      default: !1,
      transition: !1,
      "property-type": "data-driven",
      expression: {
        interpolated: !1,
        parameters: ["zoom", "feature"]
      }
    };

    function Or(t) {
      if (null == t) return function () {
        return !0;
      };
      Lr(t) || (t = Ur(t));
      var e = Sr(t, Dr);
      if ("error" === e.result) throw new Error(e.value.map(function (t) {
        return t.key + ": " + t.message;
      }).join(", "));
      return function (t, r) {
        return e.value.evaluate(t, r);
      };
    }

    function Rr(t, e) {
      return t < e ? -1 : t > e ? 1 : 0;
    }

    function Ur(t) {
      if (!t) return !0;
      var e,
          r = t[0];
      return t.length <= 1 ? "any" !== r : "==" === r ? jr(t[1], t[2], "==") : "!=" === r ? Kr(jr(t[1], t[2], "==")) : "<" === r || ">" === r || "<=" === r || ">=" === r ? jr(t[1], t[2], r) : "any" === r ? (e = t.slice(1), ["any"].concat(e.map(Ur))) : "all" === r ? ["all"].concat(t.slice(1).map(Ur)) : "none" === r ? ["all"].concat(t.slice(1).map(Ur).map(Kr)) : "in" === r ? qr(t[1], t.slice(2)) : "!in" === r ? Kr(qr(t[1], t.slice(2))) : "has" === r ? Nr(t[1]) : "!has" !== r || Kr(Nr(t[1]));
    }

    function jr(t, e, r) {
      switch (t) {
        case "$type":
          return ["filter-type-" + r, e];

        case "$id":
          return ["filter-id-" + r, e];

        default:
          return ["filter-" + r, t, e];
      }
    }

    function qr(t, e) {
      if (0 === e.length) return !1;

      switch (t) {
        case "$type":
          return ["filter-type-in", ["literal", e]];

        case "$id":
          return ["filter-id-in", ["literal", e]];

        default:
          return e.length > 200 && !e.some(function (t) {
            return _typeof(t) != _typeof(e[0]);
          }) ? ["filter-in-large", t, ["literal", e.sort(Rr)]] : ["filter-in-small", t, ["literal", e]];
      }
    }

    function Nr(t) {
      switch (t) {
        case "$type":
          return !0;

        case "$id":
          return ["filter-has-id"];

        default:
          return ["filter-has", t];
      }
    }

    function Kr(t) {
      return ["!", t];
    }

    function Zr(t) {
      return Lr(Tt(t.value)) ? Vr(Ct({}, t, {
        expressionContext: "filter",
        valueSpec: {
          value: "boolean"
        }
      })) : function t(e) {
        var r = e.value;
        var n = e.key;
        if ("array" !== dr(r)) return [new It(n, r, "array expected, " + dr(r) + " found")];
        var i = e.styleSpec;
        var a;
        var o = [];
        if (r.length < 1) return [new It(n, r, "filter array must have at least 1 element")];
        o = o.concat(Fr({
          key: n + "[0]",
          value: r[0],
          valueSpec: i.filter_operator,
          style: e.style,
          styleSpec: e.styleSpec
        }));

        switch (Mt(r[0])) {
          case "<":
          case "<=":
          case ">":
          case ">=":
            r.length >= 2 && "$type" === Mt(r[1]) && o.push(new It(n, r, '"$type" cannot be use with operator "' + r[0] + '"'));

          case "==":
          case "!=":
            3 !== r.length && o.push(new It(n, r, 'filter array for operator "' + r[0] + '" must have 3 elements'));

          case "in":
          case "!in":
            r.length >= 2 && "string" !== (a = dr(r[1])) && o.push(new It(n + "[1]", r[1], "string expected, " + a + " found"));

            for (var s = 2; s < r.length; s++) {
              a = dr(r[s]), "$type" === Mt(r[1]) ? o = o.concat(Fr({
                key: n + "[" + s + "]",
                value: r[s],
                valueSpec: i.geometry_type,
                style: e.style,
                styleSpec: e.styleSpec
              })) : "string" !== a && "number" !== a && "boolean" !== a && o.push(new It(n + "[" + s + "]", r[s], "string, number, or boolean expected, " + a + " found"));
            }

            break;

          case "any":
          case "all":
          case "none":
            for (var u = 1; u < r.length; u++) {
              o = o.concat(t({
                key: n + "[" + u + "]",
                value: r[u],
                style: e.style,
                styleSpec: e.styleSpec
              }));
            }

            break;

          case "has":
          case "!has":
            a = dr(r[1]), 2 !== r.length ? o.push(new It(n, r, 'filter array for "' + r[0] + '" operator must have 2 elements')) : "string" !== a && o.push(new It(n + "[1]", r[1], "string expected, " + a + " found"));
        }

        return o;
      }(t);
    }

    function Gr(t, e) {
      var r = t.key,
          n = t.style,
          i = t.styleSpec,
          a = t.value,
          o = t.objectKey,
          s = i[e + "_" + t.layerType];
      if (!s) return [];
      var u = o.match(/^(.*)-transition$/);
      if ("paint" === e && u && s[u[1]] && s[u[1]].transition) return tn({
        key: r,
        value: a,
        valueSpec: i.transition,
        style: n,
        styleSpec: i
      });
      var l,
          p = t.valueSpec || s[o];
      if (!p) return [new It(r, a, 'unknown property "' + o + '"')];
      if ("string" === dr(a) && hr(p) && !p.tokens && (l = /^{([^}]+)}$/.exec(a))) return [new It(r, a, '"' + o + '" does not support interpolation syntax\nUse an identity property function instead: `{ "type": "identity", "property": ' + JSON.stringify(l[1]) + " }`.")];
      var c = [];
      return "symbol" === t.layerType && ("text-field" === o && n && !n.glyphs && c.push(new It(r, a, 'use of "text-field" requires a style "glyphs" property')), "text-font" === o && mr(Tt(a)) && "identity" === Mt(a.type) && c.push(new It(r, a, '"text-font" does not support identity functions'))), c.concat(tn({
        key: t.key,
        value: a,
        valueSpec: p,
        style: n,
        styleSpec: i,
        expressionContext: "property",
        propertyType: e,
        propertyKey: o
      }));
    }

    function Xr(t) {
      return Gr(t, "paint");
    }

    function Jr(t) {
      return Gr(t, "layout");
    }

    function Hr(t) {
      var e = [],
          r = t.value,
          n = t.key,
          i = t.style,
          a = t.styleSpec;
      r.type || r.ref || e.push(new It(n, r, 'either "type" or "ref" is required'));
      var o,
          s = Mt(r.type),
          u = Mt(r.ref);
      if (r.id) for (var l = Mt(r.id), p = 0; p < t.arrayIndex; p++) {
        var c = i.layers[p];
        Mt(c.id) === l && e.push(new It(n, r.id, 'duplicate layer id "' + r.id + '", previously used at line ' + c.id.__line__));
      }
      if ("ref" in r) ["type", "source", "source-layer", "filter", "layout"].forEach(function (t) {
        t in r && e.push(new It(n, r[t], '"' + t + '" is prohibited for ref layers'));
      }), i.layers.forEach(function (t) {
        Mt(t.id) === u && (o = t);
      }), o ? o.ref ? e.push(new It(n, r.ref, "ref cannot reference another ref layer")) : s = Mt(o.type) : e.push(new It(n, r.ref, 'ref layer "' + u + '" not found'));else if ("background" !== s) if (r.source) {
        var h = i.sources && i.sources[r.source],
            f = h && Mt(h.type);
        h ? "vector" === f && "raster" === s ? e.push(new It(n, r.source, 'layer "' + r.id + '" requires a raster source')) : "raster" === f && "raster" !== s ? e.push(new It(n, r.source, 'layer "' + r.id + '" requires a vector source')) : "vector" !== f || r["source-layer"] ? "raster-dem" === f && "hillshade" !== s ? e.push(new It(n, r.source, "raster-dem source can only be used with layer type 'hillshade'.")) : "line" !== s || !r.paint || !r.paint["line-gradient"] || "geojson" === f && h.lineMetrics || e.push(new It(n, r, 'layer "' + r.id + '" specifies a line-gradient, which requires a GeoJSON source with `lineMetrics` enabled.')) : e.push(new It(n, r, 'layer "' + r.id + '" must specify a "source-layer"')) : e.push(new It(n, r.source, 'source "' + r.source + '" not found'));
      } else e.push(new It(n, r, 'missing required property "source"'));
      return e = e.concat(Er({
        key: n,
        value: r,
        valueSpec: a.layer,
        style: t.style,
        styleSpec: t.styleSpec,
        objectElementValidators: {
          "*": function () {
            return [];
          },
          type: function () {
            return tn({
              key: n + ".type",
              value: r.type,
              valueSpec: a.layer.type,
              style: t.style,
              styleSpec: t.styleSpec,
              object: r,
              objectKey: "type"
            });
          },
          filter: Zr,
          layout: function (t) {
            return Er({
              layer: r,
              key: t.key,
              value: t.value,
              style: t.style,
              styleSpec: t.styleSpec,
              objectElementValidators: {
                "*": function (t) {
                  return Jr(Ct({
                    layerType: s
                  }, t));
                }
              }
            });
          },
          paint: function (t) {
            return Er({
              layer: r,
              key: t.key,
              value: t.value,
              style: t.style,
              styleSpec: t.styleSpec,
              objectElementValidators: {
                "*": function (t) {
                  return Xr(Ct({
                    layerType: s
                  }, t));
                }
              }
            });
          }
        }
      }));
    }

    function Yr(t) {
      var e = t.value,
          r = t.key,
          n = t.styleSpec,
          i = t.style;
      if (!e.type) return [new It(r, e, '"type" is required')];
      var a,
          o = Mt(e.type);

      switch (o) {
        case "vector":
        case "raster":
        case "raster-dem":
          return a = Er({
            key: r,
            value: e,
            valueSpec: n["source_" + o.replace("-", "_")],
            style: t.style,
            styleSpec: n
          });

        case "geojson":
          if (a = Er({
            key: r,
            value: e,
            valueSpec: n.source_geojson,
            style: i,
            styleSpec: n
          }), e.cluster) for (var s in e.clusterProperties) {
            var u = e.clusterProperties[s],
                l = u[0],
                p = u[1],
                c = "string" == typeof l ? [l, ["accumulated"], ["get", s]] : l;
            a.push.apply(a, Vr({
              key: r + "." + s + ".map",
              value: p,
              expressionContext: "cluster-map"
            })), a.push.apply(a, Vr({
              key: r + "." + s + ".reduce",
              value: c,
              expressionContext: "cluster-reduce"
            }));
          }
          return a;

        case "video":
          return Er({
            key: r,
            value: e,
            valueSpec: n.source_video,
            style: i,
            styleSpec: n
          });

        case "image":
          return Er({
            key: r,
            value: e,
            valueSpec: n.source_image,
            style: i,
            styleSpec: n
          });

        case "canvas":
          return [new It(r, null, "Please use runtime APIs to add canvas sources, rather than including them in stylesheets.", "source.canvas")];

        default:
          return Fr({
            key: r + ".type",
            value: e.type,
            valueSpec: {
              values: ["vector", "raster", "raster-dem", "geojson", "video", "image"]
            },
            style: i,
            styleSpec: n
          });
      }
    }

    function $r(t) {
      var e = t.value,
          r = t.styleSpec,
          n = r.light,
          i = t.style,
          a = [],
          o = dr(e);
      if (void 0 === e) return a;
      if ("object" !== o) return a = a.concat([new It("light", e, "object expected, " + o + " found")]);

      for (var s in e) {
        var u = s.match(/^(.*)-transition$/);
        a = u && n[u[1]] && n[u[1]].transition ? a.concat(tn({
          key: s,
          value: e[s],
          valueSpec: r.transition,
          style: i,
          styleSpec: r
        })) : n[s] ? a.concat(tn({
          key: s,
          value: e[s],
          valueSpec: n[s],
          style: i,
          styleSpec: r
        })) : a.concat([new It(s, e[s], 'unknown property "' + s + '"')]);
      }

      return a;
    }

    function Wr(t) {
      var e = t.value,
          r = t.key,
          n = dr(e);
      return "string" !== n ? [new It(r, e, "string expected, " + n + " found")] : [];
    }

    var Qr = {
      "*": function () {
        return [];
      },
      array: Mr,
      boolean: function (t) {
        var e = t.value,
            r = t.key,
            n = dr(e);
        return "boolean" !== n ? [new It(r, e, "boolean expected, " + n + " found")] : [];
      },
      number: Tr,
      color: function (t) {
        var e = t.key,
            r = t.value,
            n = dr(r);
        return "string" !== n ? [new It(e, r, "color expected, " + n + " found")] : null === Jt(r) ? [new It(e, r, 'color expected, "' + r + '" found')] : [];
      },
      constants: Bt,
      enum: Fr,
      filter: Zr,
      function: Pr,
      layer: Hr,
      object: Er,
      source: Yr,
      light: $r,
      string: Wr,
      formatted: function (t) {
        return 0 === Wr(t).length ? [] : Vr(t);
      }
    };

    function tn(t) {
      var e = t.value,
          r = t.valueSpec,
          n = t.styleSpec;
      return r.expression && mr(Mt(e)) ? Pr(t) : r.expression && kr(Tt(e)) ? Vr(t) : r.type && Qr[r.type] ? Qr[r.type](t) : Er(Ct({}, t, {
        valueSpec: r.type ? n[r.type] : r
      }));
    }

    function en(t) {
      var e = t.value,
          r = t.key,
          n = Wr(t);
      return n.length ? n : (-1 === e.indexOf("{fontstack}") && n.push(new It(r, e, '"glyphs" url must include a "{fontstack}" token')), -1 === e.indexOf("{range}") && n.push(new It(r, e, '"glyphs" url must include a "{range}" token')), n);
    }

    function rn(t, e) {
      e = e || zt;
      var r = [];
      return r = r.concat(tn({
        key: "",
        value: t,
        valueSpec: e.$root,
        styleSpec: e,
        style: t,
        objectElementValidators: {
          glyphs: en,
          "*": function () {
            return [];
          }
        }
      })), t.constants && (r = r.concat(Bt({
        key: "constants",
        value: t.constants,
        style: t,
        styleSpec: e
      }))), nn(r);
    }

    function nn(t) {
      return [].concat(t).sort(function (t, e) {
        return t.line - e.line;
      });
    }

    function an(t) {
      return function () {
        for (var e = [], r = arguments.length; r--;) {
          e[r] = arguments[r];
        }

        return nn(t.apply(this, e));
      };
    }

    rn.source = an(Yr), rn.light = an($r), rn.layer = an(Hr), rn.filter = an(Zr), rn.paintProperty = an(Xr), rn.layoutProperty = an(Jr);
    var on = rn,
        sn = on.light,
        un = on.paintProperty,
        ln = on.layoutProperty;

    function pn(t, e) {
      var r = !1;
      if (e && e.length) for (var n = 0, i = e; n < i.length; n += 1) {
        var a = i[n];
        t.fire(new kt(new Error(a.message))), r = !0;
      }
      return r;
    }

    var cn = fn,
        hn = 3;

    function fn(t, e, r) {
      var n = this.cells = [];

      if (t instanceof ArrayBuffer) {
        this.arrayBuffer = t;
        var i = new Int32Array(this.arrayBuffer);
        t = i[0], e = i[1], r = i[2], this.d = e + 2 * r;

        for (var a = 0; a < this.d * this.d; a++) {
          var o = i[hn + a],
              s = i[hn + a + 1];
          n.push(o === s ? null : i.subarray(o, s));
        }

        var u = i[hn + n.length],
            l = i[hn + n.length + 1];
        this.keys = i.subarray(u, l), this.bboxes = i.subarray(l), this.insert = this._insertReadonly;
      } else {
        this.d = e + 2 * r;

        for (var p = 0; p < this.d * this.d; p++) {
          n.push([]);
        }

        this.keys = [], this.bboxes = [];
      }

      this.n = e, this.extent = t, this.padding = r, this.scale = e / t, this.uid = 0;
      var c = r / e * t;
      this.min = -c, this.max = t + c;
    }

    fn.prototype.insert = function (t, e, r, n, i) {
      this._forEachCell(e, r, n, i, this._insertCell, this.uid++), this.keys.push(t), this.bboxes.push(e), this.bboxes.push(r), this.bboxes.push(n), this.bboxes.push(i);
    }, fn.prototype._insertReadonly = function () {
      throw "Cannot insert into a GridIndex created from an ArrayBuffer.";
    }, fn.prototype._insertCell = function (t, e, r, n, i, a) {
      this.cells[i].push(a);
    }, fn.prototype.query = function (t, e, r, n, i) {
      var a = this.min,
          o = this.max;
      if (t <= a && e <= a && o <= r && o <= n && !i) return Array.prototype.slice.call(this.keys);
      var s = [];
      return this._forEachCell(t, e, r, n, this._queryCell, s, {}, i), s;
    }, fn.prototype._queryCell = function (t, e, r, n, i, a, o, s) {
      var u = this.cells[i];
      if (null !== u) for (var l = this.keys, p = this.bboxes, c = 0; c < u.length; c++) {
        var h = u[c];

        if (void 0 === o[h]) {
          var f = 4 * h;
          (s ? s(p[f + 0], p[f + 1], p[f + 2], p[f + 3]) : t <= p[f + 2] && e <= p[f + 3] && r >= p[f + 0] && n >= p[f + 1]) ? (o[h] = !0, a.push(l[h])) : o[h] = !1;
        }
      }
    }, fn.prototype._forEachCell = function (t, e, r, n, i, a, o, s) {
      for (var u = this._convertToCellCoord(t), l = this._convertToCellCoord(e), p = this._convertToCellCoord(r), c = this._convertToCellCoord(n), h = u; h <= p; h++) {
        for (var f = l; f <= c; f++) {
          var y = this.d * f + h;
          if ((!s || s(this._convertFromCellCoord(h), this._convertFromCellCoord(f), this._convertFromCellCoord(h + 1), this._convertFromCellCoord(f + 1))) && i.call(this, t, e, r, n, y, a, o, s)) return;
        }
      }
    }, fn.prototype._convertFromCellCoord = function (t) {
      return (t - this.padding) / this.scale;
    }, fn.prototype._convertToCellCoord = function (t) {
      return Math.max(0, Math.min(this.d - 1, Math.floor(t * this.scale) + this.padding));
    }, fn.prototype.toArrayBuffer = function () {
      if (this.arrayBuffer) return this.arrayBuffer;

      for (var t = this.cells, e = hn + this.cells.length + 1 + 1, r = 0, n = 0; n < this.cells.length; n++) {
        r += this.cells[n].length;
      }

      var i = new Int32Array(e + r + this.keys.length + this.bboxes.length);
      i[0] = this.extent, i[1] = this.n, i[2] = this.padding;

      for (var a = e, o = 0; o < t.length; o++) {
        var s = t[o];
        i[hn + o] = a, i.set(s, a), a += s.length;
      }

      return i[hn + t.length] = a, i.set(this.keys, a), a += this.keys.length, i[hn + t.length + 1] = a, i.set(this.bboxes, a), a += this.bboxes.length, i.buffer;
    };
    var yn = self.ImageData,
        dn = {};

    function mn(t, e, r) {
      void 0 === r && (r = {}), Object.defineProperty(e, "_classRegistryKey", {
        value: t,
        writeable: !1
      }), dn[t] = {
        klass: e,
        omit: r.omit || [],
        shallow: r.shallow || []
      };
    }

    for (var vn in mn("Object", Object), cn.serialize = function (t, e) {
      var r = t.toArrayBuffer();
      return e && e.push(r), {
        buffer: r
      };
    }, cn.deserialize = function (t) {
      return new cn(t.buffer);
    }, mn("Grid", cn), mn("Color", Ht), mn("Error", Error), mn("StylePropertyFunction", Cr), mn("StyleExpression", Ar, {
      omit: ["_evaluator"]
    }), mn("ZoomDependentExpression", Ir), mn("ZoomConstantExpression", zr), mn("CompoundExpression", ce, {
      omit: ["_evaluate"]
    }), ar) {
      ar[vn]._classRegistryKey || mn("Expression_" + vn, ar[vn]);
    }

    function gn(t, e) {
      if (null == t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || t instanceof Boolean || t instanceof Number || t instanceof String || t instanceof Date || t instanceof RegExp) return t;
      if (t instanceof ArrayBuffer) return e && e.push(t), t;

      if (ArrayBuffer.isView(t)) {
        var r = t;
        return e && e.push(r.buffer), r;
      }

      if (t instanceof yn) return e && e.push(t.data.buffer), t;

      if (Array.isArray(t)) {
        for (var n = [], i = 0, a = t; i < a.length; i += 1) {
          var o = a[i];
          n.push(gn(o, e));
        }

        return n;
      }

      if ("object" == _typeof(t)) {
        var s = t.constructor,
            u = s._classRegistryKey;
        if (!u) throw new Error("can't serialize object of unregistered class");
        var l = s.serialize ? s.serialize(t, e) : {};

        if (!s.serialize) {
          for (var p in t) {
            if (t.hasOwnProperty(p) && !(dn[u].omit.indexOf(p) >= 0)) {
              var c = t[p];
              l[p] = dn[u].shallow.indexOf(p) >= 0 ? c : gn(c, e);
            }
          }

          t instanceof Error && (l.message = t.message);
        }

        if (l.$name) throw new Error("$name property is reserved for worker serialization logic.");
        return "Object" !== u && (l.$name = u), l;
      }

      throw new Error("can't serialize object of type " + _typeof(t));
    }

    function xn(t) {
      if (null == t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || t instanceof Boolean || t instanceof Number || t instanceof String || t instanceof Date || t instanceof RegExp || t instanceof ArrayBuffer || ArrayBuffer.isView(t) || t instanceof yn) return t;
      if (Array.isArray(t)) return t.map(xn);

      if ("object" == _typeof(t)) {
        var e = t.$name || "Object",
            r = dn[e].klass;
        if (!r) throw new Error("can't deserialize unregistered class " + e);
        if (r.deserialize) return r.deserialize(t);

        for (var n = Object.create(r.prototype), i = 0, a = Object.keys(t); i < a.length; i += 1) {
          var o = a[i];

          if ("$name" !== o) {
            var s = t[o];
            n[o] = dn[e].shallow.indexOf(o) >= 0 ? s : xn(s);
          }
        }

        return n;
      }

      throw new Error("can't deserialize object of type " + _typeof(t));
    }

    var bn = function () {
      this.first = !0;
    };

    bn.prototype.update = function (t, e) {
      var r = Math.floor(t);
      return this.first ? (this.first = !1, this.lastIntegerZoom = r, this.lastIntegerZoomTime = 0, this.lastZoom = t, this.lastFloorZoom = r, !0) : (this.lastFloorZoom > r ? (this.lastIntegerZoom = r + 1, this.lastIntegerZoomTime = e) : this.lastFloorZoom < r && (this.lastIntegerZoom = r, this.lastIntegerZoomTime = e), t !== this.lastZoom && (this.lastZoom = t, this.lastFloorZoom = r, !0));
    };

    var _n = {
      "Latin-1 Supplement": function (t) {
        return t >= 128 && t <= 255;
      },
      Arabic: function (t) {
        return t >= 1536 && t <= 1791;
      },
      "Arabic Supplement": function (t) {
        return t >= 1872 && t <= 1919;
      },
      "Arabic Extended-A": function (t) {
        return t >= 2208 && t <= 2303;
      },
      "Hangul Jamo": function (t) {
        return t >= 4352 && t <= 4607;
      },
      "Unified Canadian Aboriginal Syllabics": function (t) {
        return t >= 5120 && t <= 5759;
      },
      Khmer: function (t) {
        return t >= 6016 && t <= 6143;
      },
      "Unified Canadian Aboriginal Syllabics Extended": function (t) {
        return t >= 6320 && t <= 6399;
      },
      "General Punctuation": function (t) {
        return t >= 8192 && t <= 8303;
      },
      "Letterlike Symbols": function (t) {
        return t >= 8448 && t <= 8527;
      },
      "Number Forms": function (t) {
        return t >= 8528 && t <= 8591;
      },
      "Miscellaneous Technical": function (t) {
        return t >= 8960 && t <= 9215;
      },
      "Control Pictures": function (t) {
        return t >= 9216 && t <= 9279;
      },
      "Optical Character Recognition": function (t) {
        return t >= 9280 && t <= 9311;
      },
      "Enclosed Alphanumerics": function (t) {
        return t >= 9312 && t <= 9471;
      },
      "Geometric Shapes": function (t) {
        return t >= 9632 && t <= 9727;
      },
      "Miscellaneous Symbols": function (t) {
        return t >= 9728 && t <= 9983;
      },
      "Miscellaneous Symbols and Arrows": function (t) {
        return t >= 11008 && t <= 11263;
      },
      "CJK Radicals Supplement": function (t) {
        return t >= 11904 && t <= 12031;
      },
      "Kangxi Radicals": function (t) {
        return t >= 12032 && t <= 12255;
      },
      "Ideographic Description Characters": function (t) {
        return t >= 12272 && t <= 12287;
      },
      "CJK Symbols and Punctuation": function (t) {
        return t >= 12288 && t <= 12351;
      },
      Hiragana: function (t) {
        return t >= 12352 && t <= 12447;
      },
      Katakana: function (t) {
        return t >= 12448 && t <= 12543;
      },
      Bopomofo: function (t) {
        return t >= 12544 && t <= 12591;
      },
      "Hangul Compatibility Jamo": function (t) {
        return t >= 12592 && t <= 12687;
      },
      Kanbun: function (t) {
        return t >= 12688 && t <= 12703;
      },
      "Bopomofo Extended": function (t) {
        return t >= 12704 && t <= 12735;
      },
      "CJK Strokes": function (t) {
        return t >= 12736 && t <= 12783;
      },
      "Katakana Phonetic Extensions": function (t) {
        return t >= 12784 && t <= 12799;
      },
      "Enclosed CJK Letters and Months": function (t) {
        return t >= 12800 && t <= 13055;
      },
      "CJK Compatibility": function (t) {
        return t >= 13056 && t <= 13311;
      },
      "CJK Unified Ideographs Extension A": function (t) {
        return t >= 13312 && t <= 19903;
      },
      "Yijing Hexagram Symbols": function (t) {
        return t >= 19904 && t <= 19967;
      },
      "CJK Unified Ideographs": function (t) {
        return t >= 19968 && t <= 40959;
      },
      "Yi Syllables": function (t) {
        return t >= 40960 && t <= 42127;
      },
      "Yi Radicals": function (t) {
        return t >= 42128 && t <= 42191;
      },
      "Hangul Jamo Extended-A": function (t) {
        return t >= 43360 && t <= 43391;
      },
      "Hangul Syllables": function (t) {
        return t >= 44032 && t <= 55215;
      },
      "Hangul Jamo Extended-B": function (t) {
        return t >= 55216 && t <= 55295;
      },
      "Private Use Area": function (t) {
        return t >= 57344 && t <= 63743;
      },
      "CJK Compatibility Ideographs": function (t) {
        return t >= 63744 && t <= 64255;
      },
      "Arabic Presentation Forms-A": function (t) {
        return t >= 64336 && t <= 65023;
      },
      "Vertical Forms": function (t) {
        return t >= 65040 && t <= 65055;
      },
      "CJK Compatibility Forms": function (t) {
        return t >= 65072 && t <= 65103;
      },
      "Small Form Variants": function (t) {
        return t >= 65104 && t <= 65135;
      },
      "Arabic Presentation Forms-B": function (t) {
        return t >= 65136 && t <= 65279;
      },
      "Halfwidth and Fullwidth Forms": function (t) {
        return t >= 65280 && t <= 65519;
      }
    };

    function wn(t) {
      for (var e = 0, r = t; e < r.length; e += 1) {
        if (Sn(r[e].charCodeAt(0))) return !0;
      }

      return !1;
    }

    function An(t) {
      for (var e = 0, r = t; e < r.length; e += 1) {
        if (!kn(r[e].charCodeAt(0))) return !1;
      }

      return !0;
    }

    function kn(t) {
      return !_n.Arabic(t) && !_n["Arabic Supplement"](t) && !_n["Arabic Extended-A"](t) && !_n["Arabic Presentation Forms-A"](t) && !_n["Arabic Presentation Forms-B"](t);
    }

    function Sn(t) {
      return 746 === t || 747 === t || !(t < 4352) && (!!_n["Bopomofo Extended"](t) || !!_n.Bopomofo(t) || !(!_n["CJK Compatibility Forms"](t) || t >= 65097 && t <= 65103) || !!_n["CJK Compatibility Ideographs"](t) || !!_n["CJK Compatibility"](t) || !!_n["CJK Radicals Supplement"](t) || !!_n["CJK Strokes"](t) || !(!_n["CJK Symbols and Punctuation"](t) || t >= 12296 && t <= 12305 || t >= 12308 && t <= 12319 || 12336 === t) || !!_n["CJK Unified Ideographs Extension A"](t) || !!_n["CJK Unified Ideographs"](t) || !!_n["Enclosed CJK Letters and Months"](t) || !!_n["Hangul Compatibility Jamo"](t) || !!_n["Hangul Jamo Extended-A"](t) || !!_n["Hangul Jamo Extended-B"](t) || !!_n["Hangul Jamo"](t) || !!_n["Hangul Syllables"](t) || !!_n.Hiragana(t) || !!_n["Ideographic Description Characters"](t) || !!_n.Kanbun(t) || !!_n["Kangxi Radicals"](t) || !!_n["Katakana Phonetic Extensions"](t) || !(!_n.Katakana(t) || 12540 === t) || !(!_n["Halfwidth and Fullwidth Forms"](t) || 65288 === t || 65289 === t || 65293 === t || t >= 65306 && t <= 65310 || 65339 === t || 65341 === t || 65343 === t || t >= 65371 && t <= 65503 || 65507 === t || t >= 65512 && t <= 65519) || !(!_n["Small Form Variants"](t) || t >= 65112 && t <= 65118 || t >= 65123 && t <= 65126) || !!_n["Unified Canadian Aboriginal Syllabics"](t) || !!_n["Unified Canadian Aboriginal Syllabics Extended"](t) || !!_n["Vertical Forms"](t) || !!_n["Yijing Hexagram Symbols"](t) || !!_n["Yi Syllables"](t) || !!_n["Yi Radicals"](t));
    }

    function zn(t) {
      return !(Sn(t) || function (t) {
        return !!(_n["Latin-1 Supplement"](t) && (167 === t || 169 === t || 174 === t || 177 === t || 188 === t || 189 === t || 190 === t || 215 === t || 247 === t) || _n["General Punctuation"](t) && (8214 === t || 8224 === t || 8225 === t || 8240 === t || 8241 === t || 8251 === t || 8252 === t || 8258 === t || 8263 === t || 8264 === t || 8265 === t || 8273 === t) || _n["Letterlike Symbols"](t) || _n["Number Forms"](t) || _n["Miscellaneous Technical"](t) && (t >= 8960 && t <= 8967 || t >= 8972 && t <= 8991 || t >= 8996 && t <= 9e3 || 9003 === t || t >= 9085 && t <= 9114 || t >= 9150 && t <= 9165 || 9167 === t || t >= 9169 && t <= 9179 || t >= 9186 && t <= 9215) || _n["Control Pictures"](t) && 9251 !== t || _n["Optical Character Recognition"](t) || _n["Enclosed Alphanumerics"](t) || _n["Geometric Shapes"](t) || _n["Miscellaneous Symbols"](t) && !(t >= 9754 && t <= 9759) || _n["Miscellaneous Symbols and Arrows"](t) && (t >= 11026 && t <= 11055 || t >= 11088 && t <= 11097 || t >= 11192 && t <= 11243) || _n["CJK Symbols and Punctuation"](t) || _n.Katakana(t) || _n["Private Use Area"](t) || _n["CJK Compatibility Forms"](t) || _n["Small Form Variants"](t) || _n["Halfwidth and Fullwidth Forms"](t) || 8734 === t || 8756 === t || 8757 === t || t >= 9984 && t <= 10087 || t >= 10102 && t <= 10131 || 65532 === t || 65533 === t);
      }(t));
    }

    function In(t, e) {
      return !(!e && (t >= 1424 && t <= 2303 || _n["Arabic Presentation Forms-A"](t) || _n["Arabic Presentation Forms-B"](t))) && !(t >= 2304 && t <= 3583 || t >= 3840 && t <= 4255 || _n.Khmer(t));
    }

    var Bn,
        Cn = !1,
        En = null,
        Mn = !1,
        Tn = new St(),
        Pn = {
      applyArabicShaping: null,
      processBidirectionalText: null,
      processStyledBidirectionalText: null,
      isLoaded: function () {
        return Mn || null != Pn.applyArabicShaping;
      }
    },
        Vn = function (t, e) {
      this.zoom = t, e ? (this.now = e.now, this.fadeDuration = e.fadeDuration, this.zoomHistory = e.zoomHistory, this.transition = e.transition) : (this.now = 0, this.fadeDuration = 0, this.zoomHistory = new bn(), this.transition = {});
    };

    Vn.prototype.isSupportedScript = function (t) {
      return function (t, e) {
        for (var r = 0, n = t; r < n.length; r += 1) {
          if (!In(n[r].charCodeAt(0), e)) return !1;
        }

        return !0;
      }(t, Pn.isLoaded());
    }, Vn.prototype.crossFadingFactor = function () {
      return 0 === this.fadeDuration ? 1 : Math.min((this.now - this.zoomHistory.lastIntegerZoomTime) / this.fadeDuration, 1);
    }, Vn.prototype.getCrossfadeParameters = function () {
      var t = this.zoom,
          e = t - Math.floor(t),
          r = this.crossFadingFactor();
      return t > this.zoomHistory.lastIntegerZoom ? {
        fromScale: 2,
        toScale: 1,
        t: e + (1 - e) * r
      } : {
        fromScale: .5,
        toScale: 1,
        t: 1 - (1 - r) * e
      };
    };

    var Fn = function (t, e) {
      this.property = t, this.value = e, this.expression = function (t, e) {
        if (mr(t)) return new Cr(t, e);

        if (kr(t)) {
          var r = Br(t, e);
          if ("error" === r.result) throw new Error(r.value.map(function (t) {
            return t.key + ": " + t.message;
          }).join(", "));
          return r.value;
        }

        var n = t;
        return "string" == typeof t && "color" === e.type && (n = Ht.parse(t)), {
          kind: "constant",
          evaluate: function () {
            return n;
          }
        };
      }(void 0 === e ? t.specification.default : e, t.specification);
    };

    Fn.prototype.isDataDriven = function () {
      return "source" === this.expression.kind || "composite" === this.expression.kind;
    }, Fn.prototype.possiblyEvaluate = function (t) {
      return this.property.possiblyEvaluate(this, t);
    };

    var Ln = function (t) {
      this.property = t, this.value = new Fn(t, void 0);
    };

    Ln.prototype.transitioned = function (t, e) {
      return new On(this.property, this.value, e, c({}, t.transition, this.transition), t.now);
    }, Ln.prototype.untransitioned = function () {
      return new On(this.property, this.value, null, {}, 0);
    };

    var Dn = function (t) {
      this._properties = t, this._values = Object.create(t.defaultTransitionablePropertyValues);
    };

    Dn.prototype.getValue = function (t) {
      return b(this._values[t].value.value);
    }, Dn.prototype.setValue = function (t, e) {
      this._values.hasOwnProperty(t) || (this._values[t] = new Ln(this._values[t].property)), this._values[t].value = new Fn(this._values[t].property, null === e ? void 0 : b(e));
    }, Dn.prototype.getTransition = function (t) {
      return b(this._values[t].transition);
    }, Dn.prototype.setTransition = function (t, e) {
      this._values.hasOwnProperty(t) || (this._values[t] = new Ln(this._values[t].property)), this._values[t].transition = b(e) || void 0;
    }, Dn.prototype.serialize = function () {
      for (var t = {}, e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e],
            i = this.getValue(n);
        void 0 !== i && (t[n] = i);
        var a = this.getTransition(n);
        void 0 !== a && (t[n + "-transition"] = a);
      }

      return t;
    }, Dn.prototype.transitioned = function (t, e) {
      for (var r = new Rn(this._properties), n = 0, i = Object.keys(this._values); n < i.length; n += 1) {
        var a = i[n];
        r._values[a] = this._values[a].transitioned(t, e._values[a]);
      }

      return r;
    }, Dn.prototype.untransitioned = function () {
      for (var t = new Rn(this._properties), e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e];
        t._values[n] = this._values[n].untransitioned();
      }

      return t;
    };

    var On = function (t, e, r, n, i) {
      this.property = t, this.value = e, this.begin = i + n.delay || 0, this.end = this.begin + n.duration || 0, t.specification.transition && (n.delay || n.duration) && (this.prior = r);
    };

    On.prototype.possiblyEvaluate = function (t) {
      var e = t.now || 0,
          r = this.value.possiblyEvaluate(t),
          n = this.prior;

      if (n) {
        if (e > this.end) return this.prior = null, r;
        if (this.value.isDataDriven()) return this.prior = null, r;
        if (e < this.begin) return n.possiblyEvaluate(t);
        var i = (e - this.begin) / (this.end - this.begin);
        return this.property.interpolate(n.possiblyEvaluate(t), r, function (t) {
          if (t <= 0) return 0;
          if (t >= 1) return 1;
          var e = t * t,
              r = e * t;
          return 4 * (t < .5 ? r : 3 * (t - e) + r - .75);
        }(i));
      }

      return r;
    };

    var Rn = function (t) {
      this._properties = t, this._values = Object.create(t.defaultTransitioningPropertyValues);
    };

    Rn.prototype.possiblyEvaluate = function (t) {
      for (var e = new qn(this._properties), r = 0, n = Object.keys(this._values); r < n.length; r += 1) {
        var i = n[r];
        e._values[i] = this._values[i].possiblyEvaluate(t);
      }

      return e;
    }, Rn.prototype.hasTransition = function () {
      for (var t = 0, e = Object.keys(this._values); t < e.length; t += 1) {
        var r = e[t];
        if (this._values[r].prior) return !0;
      }

      return !1;
    };

    var Un = function (t) {
      this._properties = t, this._values = Object.create(t.defaultPropertyValues);
    };

    Un.prototype.getValue = function (t) {
      return b(this._values[t].value);
    }, Un.prototype.setValue = function (t, e) {
      this._values[t] = new Fn(this._values[t].property, null === e ? void 0 : b(e));
    }, Un.prototype.serialize = function () {
      for (var t = {}, e = 0, r = Object.keys(this._values); e < r.length; e += 1) {
        var n = r[e],
            i = this.getValue(n);
        void 0 !== i && (t[n] = i);
      }

      return t;
    }, Un.prototype.possiblyEvaluate = function (t) {
      for (var e = new qn(this._properties), r = 0, n = Object.keys(this._values); r < n.length; r += 1) {
        var i = n[r];
        e._values[i] = this._values[i].possiblyEvaluate(t);
      }

      return e;
    };

    var jn = function (t, e, r) {
      this.property = t, this.value = e, this.parameters = r;
    };

    jn.prototype.isConstant = function () {
      return "constant" === this.value.kind;
    }, jn.prototype.constantOr = function (t) {
      return "constant" === this.value.kind ? this.value.value : t;
    }, jn.prototype.evaluate = function (t, e) {
      return this.property.evaluate(this.value, this.parameters, t, e);
    };

    var qn = function (t) {
      this._properties = t, this._values = Object.create(t.defaultPossiblyEvaluatedValues);
    };

    qn.prototype.get = function (t) {
      return this._values[t];
    };

    var Nn = function (t) {
      this.specification = t;
    };

    Nn.prototype.possiblyEvaluate = function (t, e) {
      return t.expression.evaluate(e);
    }, Nn.prototype.interpolate = function (t, e, r) {
      var n = _e[this.specification.type];
      return n ? n(t, e, r) : t;
    };

    var Kn = function (t) {
      this.specification = t;
    };

    Kn.prototype.possiblyEvaluate = function (t, e) {
      return "constant" === t.expression.kind || "camera" === t.expression.kind ? new jn(this, {
        kind: "constant",
        value: t.expression.evaluate(e)
      }, e) : new jn(this, t.expression, e);
    }, Kn.prototype.interpolate = function (t, e, r) {
      if ("constant" !== t.value.kind || "constant" !== e.value.kind) return t;
      if (void 0 === t.value.value || void 0 === e.value.value) return new jn(this, {
        kind: "constant",
        value: void 0
      }, t.parameters);
      var n = _e[this.specification.type];
      return n ? new jn(this, {
        kind: "constant",
        value: n(t.value.value, e.value.value, r)
      }, t.parameters) : t;
    }, Kn.prototype.evaluate = function (t, e, r, n) {
      return "constant" === t.kind ? t.value : t.evaluate(e, r, n);
    };

    var Zn = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.possiblyEvaluate = function (t, e) {
        if (void 0 === t.value) return new jn(this, {
          kind: "constant",
          value: void 0
        }, e);

        if ("constant" === t.expression.kind) {
          var r = t.expression.evaluate(e),
              n = this._calculate(r, r, r, e);

          return new jn(this, {
            kind: "constant",
            value: n
          }, e);
        }

        if ("camera" === t.expression.kind) {
          var i = this._calculate(t.expression.evaluate({
            zoom: e.zoom - 1
          }), t.expression.evaluate({
            zoom: e.zoom
          }), t.expression.evaluate({
            zoom: e.zoom + 1
          }), e);

          return new jn(this, {
            kind: "constant",
            value: i
          }, e);
        }

        return new jn(this, t.expression, e);
      }, e.prototype.evaluate = function (t, e, r, n) {
        if ("source" === t.kind) {
          var i = t.evaluate(e, r, n);
          return this._calculate(i, i, i, e);
        }

        return "composite" === t.kind ? this._calculate(t.evaluate({
          zoom: Math.floor(e.zoom) - 1
        }, r, n), t.evaluate({
          zoom: Math.floor(e.zoom)
        }, r, n), t.evaluate({
          zoom: Math.floor(e.zoom) + 1
        }, r, n), e) : t.value;
      }, e.prototype._calculate = function (t, e, r, n) {
        return n.zoom > n.zoomHistory.lastIntegerZoom ? {
          from: t,
          to: e
        } : {
          from: r,
          to: e
        };
      }, e.prototype.interpolate = function (t) {
        return t;
      }, e;
    }(Kn),
        Gn = function (t) {
      this.specification = t;
    };

    Gn.prototype.possiblyEvaluate = function (t, e) {
      if (void 0 !== t.value) {
        if ("constant" === t.expression.kind) {
          var r = t.expression.evaluate(e);
          return this._calculate(r, r, r, e);
        }

        return this._calculate(t.expression.evaluate(new Vn(Math.floor(e.zoom - 1), e)), t.expression.evaluate(new Vn(Math.floor(e.zoom), e)), t.expression.evaluate(new Vn(Math.floor(e.zoom + 1), e)), e);
      }
    }, Gn.prototype._calculate = function (t, e, r, n) {
      return n.zoom > n.zoomHistory.lastIntegerZoom ? {
        from: t,
        to: e
      } : {
        from: r,
        to: e
      };
    }, Gn.prototype.interpolate = function (t) {
      return t;
    };

    var Xn = function (t) {
      this.specification = t;
    };

    Xn.prototype.possiblyEvaluate = function (t, e) {
      return !!t.expression.evaluate(e);
    }, Xn.prototype.interpolate = function () {
      return !1;
    };

    var Jn = function (t) {
      for (var e in this.properties = t, this.defaultPropertyValues = {}, this.defaultTransitionablePropertyValues = {}, this.defaultTransitioningPropertyValues = {}, this.defaultPossiblyEvaluatedValues = {}, t) {
        var r = t[e],
            n = this.defaultPropertyValues[e] = new Fn(r, void 0),
            i = this.defaultTransitionablePropertyValues[e] = new Ln(r);
        this.defaultTransitioningPropertyValues[e] = i.untransitioned(), this.defaultPossiblyEvaluatedValues[e] = n.possiblyEvaluate({});
      }
    };

    mn("DataDrivenProperty", Kn), mn("DataConstantProperty", Nn), mn("CrossFadedDataDrivenProperty", Zn), mn("CrossFadedProperty", Gn), mn("ColorRampProperty", Xn);

    var Hn = function (t) {
      function e(e, r) {
        if (t.call(this), this.id = e.id, this.type = e.type, this._featureFilter = function () {
          return !0;
        }, "custom" !== e.type && (e = e, this.metadata = e.metadata, this.minzoom = e.minzoom, this.maxzoom = e.maxzoom, "background" !== e.type && (this.source = e.source, this.sourceLayer = e["source-layer"], this.filter = e.filter), r.layout && (this._unevaluatedLayout = new Un(r.layout)), r.paint)) {
          for (var n in this._transitionablePaint = new Dn(r.paint), e.paint) {
            this.setPaintProperty(n, e.paint[n], {
              validate: !1
            });
          }

          for (var i in e.layout) {
            this.setLayoutProperty(i, e.layout[i], {
              validate: !1
            });
          }

          this._transitioningPaint = this._transitionablePaint.untransitioned();
        }
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getCrossfadeParameters = function () {
        return this._crossfadeParameters;
      }, e.prototype.getLayoutProperty = function (t) {
        return "visibility" === t ? this.visibility : this._unevaluatedLayout.getValue(t);
      }, e.prototype.setLayoutProperty = function (t, e, r) {
        if (void 0 === r && (r = {}), null != e) {
          var n = "layers." + this.id + ".layout." + t;
          if (this._validate(ln, n, t, e, r)) return;
        }

        "visibility" !== t ? this._unevaluatedLayout.setValue(t, e) : this.visibility = e;
      }, e.prototype.getPaintProperty = function (t) {
        return v(t, "-transition") ? this._transitionablePaint.getTransition(t.slice(0, -"-transition".length)) : this._transitionablePaint.getValue(t);
      }, e.prototype.setPaintProperty = function (t, e, r) {
        if (void 0 === r && (r = {}), null != e) {
          var n = "layers." + this.id + ".paint." + t;
          if (this._validate(un, n, t, e, r)) return !1;
        }

        if (v(t, "-transition")) return this._transitionablePaint.setTransition(t.slice(0, -"-transition".length), e || void 0), !1;
        var i = this._transitionablePaint._values[t],
            a = "cross-faded-data-driven" === i.property.specification["property-type"],
            o = i.value.isDataDriven();
        return this._transitionablePaint.setValue(t, e), this._handleSpecialPaintPropertyUpdate(t), this._transitionablePaint._values[t].value.isDataDriven() || o || a;
      }, e.prototype._handleSpecialPaintPropertyUpdate = function (t) {}, e.prototype.isHidden = function (t) {
        return !!(this.minzoom && t < this.minzoom) || !!(this.maxzoom && t >= this.maxzoom) || "none" === this.visibility;
      }, e.prototype.updateTransitions = function (t) {
        this._transitioningPaint = this._transitionablePaint.transitioned(t, this._transitioningPaint);
      }, e.prototype.hasTransition = function () {
        return this._transitioningPaint.hasTransition();
      }, e.prototype.recalculate = function (t) {
        t.getCrossfadeParameters && (this._crossfadeParameters = t.getCrossfadeParameters()), this._unevaluatedLayout && (this.layout = this._unevaluatedLayout.possiblyEvaluate(t)), this.paint = this._transitioningPaint.possiblyEvaluate(t);
      }, e.prototype.serialize = function () {
        var t = {
          id: this.id,
          type: this.type,
          source: this.source,
          "source-layer": this.sourceLayer,
          metadata: this.metadata,
          minzoom: this.minzoom,
          maxzoom: this.maxzoom,
          filter: this.filter,
          layout: this._unevaluatedLayout && this._unevaluatedLayout.serialize(),
          paint: this._transitionablePaint && this._transitionablePaint.serialize()
        };
        return this.visibility && (t.layout = t.layout || {}, t.layout.visibility = this.visibility), x(t, function (t, e) {
          return !(void 0 === t || "layout" === e && !Object.keys(t).length || "paint" === e && !Object.keys(t).length);
        });
      }, e.prototype._validate = function (t, e, r, n, i) {
        return void 0 === i && (i = {}), (!i || !1 !== i.validate) && pn(this, t.call(on, {
          key: e,
          layerType: this.type,
          objectKey: r,
          value: n,
          styleSpec: zt,
          style: {
            glyphs: !0,
            sprite: !0
          }
        }));
      }, e.prototype.is3D = function () {
        return !1;
      }, e.prototype.isTileClipped = function () {
        return !1;
      }, e.prototype.hasOffscreenPass = function () {
        return !1;
      }, e.prototype.resize = function () {}, e.prototype.isStateDependent = function () {
        for (var t in this.paint._values) {
          var e = this.paint.get(t);
          if (e instanceof jn && hr(e.property.specification) && ("source" === e.value.kind || "composite" === e.value.kind) && e.value.isStateDependent) return !0;
        }

        return !1;
      }, e;
    }(St),
        Yn = {
      Int8: Int8Array,
      Uint8: Uint8Array,
      Int16: Int16Array,
      Uint16: Uint16Array,
      Int32: Int32Array,
      Uint32: Uint32Array,
      Float32: Float32Array
    },
        $n = function (t, e) {
      this._structArray = t, this._pos1 = e * this.size, this._pos2 = this._pos1 / 2, this._pos4 = this._pos1 / 4, this._pos8 = this._pos1 / 8;
    },
        Wn = function () {
      this.isTransferred = !1, this.capacity = -1, this.resize(0);
    };

    function Qn(t, e) {
      void 0 === e && (e = 1);
      var r = 0,
          n = 0;
      return {
        members: t.map(function (t) {
          var i,
              a = (i = t.type, Yn[i].BYTES_PER_ELEMENT),
              o = r = ti(r, Math.max(e, a)),
              s = t.components || 1;
          return n = Math.max(n, a), r += a * s, {
            name: t.name,
            type: t.type,
            components: s,
            offset: o
          };
        }),
        size: ti(r, Math.max(n, e)),
        alignment: e
      };
    }

    function ti(t, e) {
      return Math.ceil(t / e) * e;
    }

    Wn.serialize = function (t, e) {
      return t._trim(), e && (t.isTransferred = !0, e.push(t.arrayBuffer)), {
        length: t.length,
        arrayBuffer: t.arrayBuffer
      };
    }, Wn.deserialize = function (t) {
      var e = Object.create(this.prototype);
      return e.arrayBuffer = t.arrayBuffer, e.length = t.length, e.capacity = t.arrayBuffer.byteLength / e.bytesPerElement, e._refreshViews(), e;
    }, Wn.prototype._trim = function () {
      this.length !== this.capacity && (this.capacity = this.length, this.arrayBuffer = this.arrayBuffer.slice(0, this.length * this.bytesPerElement), this._refreshViews());
    }, Wn.prototype.clear = function () {
      this.length = 0;
    }, Wn.prototype.resize = function (t) {
      this.reserve(t), this.length = t;
    }, Wn.prototype.reserve = function (t) {
      if (t > this.capacity) {
        this.capacity = Math.max(t, Math.floor(5 * this.capacity), 128), this.arrayBuffer = new ArrayBuffer(this.capacity * this.bytesPerElement);
        var e = this.uint8;
        this._refreshViews(), e && this.uint8.set(e);
      }
    }, Wn.prototype._refreshViews = function () {
      throw new Error("_refreshViews() must be implemented by each concrete StructArray layout");
    };

    var ei = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }, e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return this.int16[n + 0] = e, this.int16[n + 1] = r, t;
      }, e;
    }(Wn);

    ei.prototype.bytesPerElement = 4, mn("StructArrayLayout2i4", ei);

    var ri = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n) {
        var i = this.length;
        return this.resize(i + 1), this.emplace(i, t, e, r, n);
      }, e.prototype.emplace = function (t, e, r, n, i) {
        var a = 4 * t;
        return this.int16[a + 0] = e, this.int16[a + 1] = r, this.int16[a + 2] = n, this.int16[a + 3] = i, t;
      }, e;
    }(Wn);

    ri.prototype.bytesPerElement = 8, mn("StructArrayLayout4i8", ri);

    var ni = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a) {
        var o = this.length;
        return this.resize(o + 1), this.emplace(o, t, e, r, n, i, a);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o) {
        var s = 6 * t;
        return this.int16[s + 0] = e, this.int16[s + 1] = r, this.int16[s + 2] = n, this.int16[s + 3] = i, this.int16[s + 4] = a, this.int16[s + 5] = o, t;
      }, e;
    }(Wn);

    ni.prototype.bytesPerElement = 12, mn("StructArrayLayout2i4i12", ni);

    var ii = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a) {
        var o = this.length;
        return this.resize(o + 1), this.emplace(o, t, e, r, n, i, a);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o) {
        var s = 4 * t,
            u = 8 * t;
        return this.int16[s + 0] = e, this.int16[s + 1] = r, this.uint8[u + 4] = n, this.uint8[u + 5] = i, this.uint8[u + 6] = a, this.uint8[u + 7] = o, t;
      }, e;
    }(Wn);

    ii.prototype.bytesPerElement = 8, mn("StructArrayLayout2i4ub8", ii);

    var ai = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s) {
        var u = this.length;
        return this.resize(u + 1), this.emplace(u, t, e, r, n, i, a, o, s);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o, s, u) {
        var l = 8 * t;
        return this.uint16[l + 0] = e, this.uint16[l + 1] = r, this.uint16[l + 2] = n, this.uint16[l + 3] = i, this.uint16[l + 4] = a, this.uint16[l + 5] = o, this.uint16[l + 6] = s, this.uint16[l + 7] = u, t;
      }, e;
    }(Wn);

    ai.prototype.bytesPerElement = 16, mn("StructArrayLayout8ui16", ai);

    var oi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s) {
        var u = this.length;
        return this.resize(u + 1), this.emplace(u, t, e, r, n, i, a, o, s);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o, s, u) {
        var l = 8 * t;
        return this.int16[l + 0] = e, this.int16[l + 1] = r, this.int16[l + 2] = n, this.int16[l + 3] = i, this.uint16[l + 4] = a, this.uint16[l + 5] = o, this.uint16[l + 6] = s, this.uint16[l + 7] = u, t;
      }, e;
    }(Wn);

    oi.prototype.bytesPerElement = 16, mn("StructArrayLayout4i4ui16", oi);

    var si = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }, e.prototype.emplace = function (t, e, r, n) {
        var i = 3 * t;
        return this.float32[i + 0] = e, this.float32[i + 1] = r, this.float32[i + 2] = n, t;
      }, e;
    }(Wn);

    si.prototype.bytesPerElement = 12, mn("StructArrayLayout3f12", si);

    var ui = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t) {
        var e = this.length;
        return this.resize(e + 1), this.emplace(e, t);
      }, e.prototype.emplace = function (t, e) {
        var r = 1 * t;
        return this.uint32[r + 0] = e, t;
      }, e;
    }(Wn);

    ui.prototype.bytesPerElement = 4, mn("StructArrayLayout1ul4", ui);

    var li = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s, u, l, p) {
        var c = this.length;
        return this.resize(c + 1), this.emplace(c, t, e, r, n, i, a, o, s, u, l, p);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o, s, u, l, p, c) {
        var h = 12 * t,
            f = 6 * t;
        return this.int16[h + 0] = e, this.int16[h + 1] = r, this.int16[h + 2] = n, this.int16[h + 3] = i, this.int16[h + 4] = a, this.int16[h + 5] = o, this.uint32[f + 3] = s, this.uint16[h + 8] = u, this.uint16[h + 9] = l, this.int16[h + 10] = p, this.int16[h + 11] = c, t;
      }, e;
    }(Wn);

    li.prototype.bytesPerElement = 24, mn("StructArrayLayout6i1ul2ui2i24", li);

    var pi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a) {
        var o = this.length;
        return this.resize(o + 1), this.emplace(o, t, e, r, n, i, a);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o) {
        var s = 6 * t;
        return this.int16[s + 0] = e, this.int16[s + 1] = r, this.int16[s + 2] = n, this.int16[s + 3] = i, this.int16[s + 4] = a, this.int16[s + 5] = o, t;
      }, e;
    }(Wn);

    pi.prototype.bytesPerElement = 12, mn("StructArrayLayout2i2i2i12", pi);

    var ci = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n) {
        var i = this.length;
        return this.resize(i + 1), this.emplace(i, t, e, r, n);
      }, e.prototype.emplace = function (t, e, r, n, i) {
        var a = 12 * t,
            o = 3 * t;
        return this.uint8[a + 0] = e, this.uint8[a + 1] = r, this.float32[o + 1] = n, this.float32[o + 2] = i, t;
      }, e;
    }(Wn);

    ci.prototype.bytesPerElement = 12, mn("StructArrayLayout2ub2f12", ci);

    var hi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s, u, l, p, c, h, f, y) {
        var d = this.length;
        return this.resize(d + 1), this.emplace(d, t, e, r, n, i, a, o, s, u, l, p, c, h, f, y);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o, s, u, l, p, c, h, f, y, d) {
        var m = 22 * t,
            v = 11 * t,
            g = 44 * t;
        return this.int16[m + 0] = e, this.int16[m + 1] = r, this.uint16[m + 2] = n, this.uint16[m + 3] = i, this.uint32[v + 2] = a, this.uint32[v + 3] = o, this.uint32[v + 4] = s, this.uint16[m + 10] = u, this.uint16[m + 11] = l, this.uint16[m + 12] = p, this.float32[v + 7] = c, this.float32[v + 8] = h, this.uint8[g + 36] = f, this.uint8[g + 37] = y, this.uint32[v + 10] = d, t;
      }, e;
    }(Wn);

    hi.prototype.bytesPerElement = 44, mn("StructArrayLayout2i2ui3ul3ui2f2ub1ul44", hi);

    var fi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n, i, a, o, s, u, l, p, c, h, f, y, d, m, v) {
        var g = this.length;
        return this.resize(g + 1), this.emplace(g, t, e, r, n, i, a, o, s, u, l, p, c, h, f, y, d, m, v);
      }, e.prototype.emplace = function (t, e, r, n, i, a, o, s, u, l, p, c, h, f, y, d, m, v, g) {
        var x = 22 * t,
            b = 11 * t;
        return this.int16[x + 0] = e, this.int16[x + 1] = r, this.int16[x + 2] = n, this.int16[x + 3] = i, this.int16[x + 4] = a, this.int16[x + 5] = o, this.uint16[x + 6] = s, this.uint16[x + 7] = u, this.uint16[x + 8] = l, this.uint16[x + 9] = p, this.uint16[x + 10] = c, this.uint16[x + 11] = h, this.uint16[x + 12] = f, this.uint16[x + 13] = y, this.uint16[x + 14] = d, this.uint32[b + 8] = m, this.float32[b + 9] = v, this.float32[b + 10] = g, t;
      }, e;
    }(Wn);

    fi.prototype.bytesPerElement = 44, mn("StructArrayLayout6i9ui1ul2f44", fi);

    var yi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t) {
        var e = this.length;
        return this.resize(e + 1), this.emplace(e, t);
      }, e.prototype.emplace = function (t, e) {
        var r = 1 * t;
        return this.float32[r + 0] = e, t;
      }, e;
    }(Wn);

    yi.prototype.bytesPerElement = 4, mn("StructArrayLayout1f4", yi);

    var di = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.int16 = new Int16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }, e.prototype.emplace = function (t, e, r, n) {
        var i = 3 * t;
        return this.int16[i + 0] = e, this.int16[i + 1] = r, this.int16[i + 2] = n, t;
      }, e;
    }(Wn);

    di.prototype.bytesPerElement = 6, mn("StructArrayLayout3i6", di);

    var mi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint32 = new Uint32Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }, e.prototype.emplace = function (t, e, r, n) {
        var i = 2 * t,
            a = 4 * t;
        return this.uint32[i + 0] = e, this.uint16[a + 2] = r, this.uint16[a + 3] = n, t;
      }, e;
    }(Wn);

    mi.prototype.bytesPerElement = 8, mn("StructArrayLayout1ul2ui8", mi);

    var vi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r) {
        var n = this.length;
        return this.resize(n + 1), this.emplace(n, t, e, r);
      }, e.prototype.emplace = function (t, e, r, n) {
        var i = 3 * t;
        return this.uint16[i + 0] = e, this.uint16[i + 1] = r, this.uint16[i + 2] = n, t;
      }, e;
    }(Wn);

    vi.prototype.bytesPerElement = 6, mn("StructArrayLayout3ui6", vi);

    var gi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }, e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return this.uint16[n + 0] = e, this.uint16[n + 1] = r, t;
      }, e;
    }(Wn);

    gi.prototype.bytesPerElement = 4, mn("StructArrayLayout2ui4", gi);

    var xi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.uint16 = new Uint16Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t) {
        var e = this.length;
        return this.resize(e + 1), this.emplace(e, t);
      }, e.prototype.emplace = function (t, e) {
        var r = 1 * t;
        return this.uint16[r + 0] = e, t;
      }, e;
    }(Wn);

    xi.prototype.bytesPerElement = 2, mn("StructArrayLayout1ui2", xi);

    var bi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e) {
        var r = this.length;
        return this.resize(r + 1), this.emplace(r, t, e);
      }, e.prototype.emplace = function (t, e, r) {
        var n = 2 * t;
        return this.float32[n + 0] = e, this.float32[n + 1] = r, t;
      }, e;
    }(Wn);

    bi.prototype.bytesPerElement = 8, mn("StructArrayLayout2f8", bi);

    var _i = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._refreshViews = function () {
        this.uint8 = new Uint8Array(this.arrayBuffer), this.float32 = new Float32Array(this.arrayBuffer);
      }, e.prototype.emplaceBack = function (t, e, r, n) {
        var i = this.length;
        return this.resize(i + 1), this.emplace(i, t, e, r, n);
      }, e.prototype.emplace = function (t, e, r, n, i) {
        var a = 4 * t;
        return this.float32[a + 0] = e, this.float32[a + 1] = r, this.float32[a + 2] = n, this.float32[a + 3] = i, t;
      }, e;
    }(Wn);

    _i.prototype.bytesPerElement = 16, mn("StructArrayLayout4f16", _i);

    var wi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        anchorPointX: {
          configurable: !0
        },
        anchorPointY: {
          configurable: !0
        },
        x1: {
          configurable: !0
        },
        y1: {
          configurable: !0
        },
        x2: {
          configurable: !0
        },
        y2: {
          configurable: !0
        },
        featureIndex: {
          configurable: !0
        },
        sourceLayerIndex: {
          configurable: !0
        },
        bucketIndex: {
          configurable: !0
        },
        radius: {
          configurable: !0
        },
        signedDistanceFromAnchor: {
          configurable: !0
        },
        anchorPoint: {
          configurable: !0
        }
      };
      return r.anchorPointX.get = function () {
        return this._structArray.int16[this._pos2 + 0];
      }, r.anchorPointX.set = function (t) {
        this._structArray.int16[this._pos2 + 0] = t;
      }, r.anchorPointY.get = function () {
        return this._structArray.int16[this._pos2 + 1];
      }, r.anchorPointY.set = function (t) {
        this._structArray.int16[this._pos2 + 1] = t;
      }, r.x1.get = function () {
        return this._structArray.int16[this._pos2 + 2];
      }, r.x1.set = function (t) {
        this._structArray.int16[this._pos2 + 2] = t;
      }, r.y1.get = function () {
        return this._structArray.int16[this._pos2 + 3];
      }, r.y1.set = function (t) {
        this._structArray.int16[this._pos2 + 3] = t;
      }, r.x2.get = function () {
        return this._structArray.int16[this._pos2 + 4];
      }, r.x2.set = function (t) {
        this._structArray.int16[this._pos2 + 4] = t;
      }, r.y2.get = function () {
        return this._structArray.int16[this._pos2 + 5];
      }, r.y2.set = function (t) {
        this._structArray.int16[this._pos2 + 5] = t;
      }, r.featureIndex.get = function () {
        return this._structArray.uint32[this._pos4 + 3];
      }, r.featureIndex.set = function (t) {
        this._structArray.uint32[this._pos4 + 3] = t;
      }, r.sourceLayerIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 8];
      }, r.sourceLayerIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 8] = t;
      }, r.bucketIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 9];
      }, r.bucketIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 9] = t;
      }, r.radius.get = function () {
        return this._structArray.int16[this._pos2 + 10];
      }, r.radius.set = function (t) {
        this._structArray.int16[this._pos2 + 10] = t;
      }, r.signedDistanceFromAnchor.get = function () {
        return this._structArray.int16[this._pos2 + 11];
      }, r.signedDistanceFromAnchor.set = function (t) {
        this._structArray.int16[this._pos2 + 11] = t;
      }, r.anchorPoint.get = function () {
        return new i(this.anchorPointX, this.anchorPointY);
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    wi.prototype.size = 24;

    var Ai = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
        return new wi(this, t);
      }, e;
    }(li);

    mn("CollisionBoxArray", Ai);

    var ki = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        anchorX: {
          configurable: !0
        },
        anchorY: {
          configurable: !0
        },
        glyphStartIndex: {
          configurable: !0
        },
        numGlyphs: {
          configurable: !0
        },
        vertexStartIndex: {
          configurable: !0
        },
        lineStartIndex: {
          configurable: !0
        },
        lineLength: {
          configurable: !0
        },
        segment: {
          configurable: !0
        },
        lowerSize: {
          configurable: !0
        },
        upperSize: {
          configurable: !0
        },
        lineOffsetX: {
          configurable: !0
        },
        lineOffsetY: {
          configurable: !0
        },
        writingMode: {
          configurable: !0
        },
        hidden: {
          configurable: !0
        },
        crossTileID: {
          configurable: !0
        }
      };
      return r.anchorX.get = function () {
        return this._structArray.int16[this._pos2 + 0];
      }, r.anchorX.set = function (t) {
        this._structArray.int16[this._pos2 + 0] = t;
      }, r.anchorY.get = function () {
        return this._structArray.int16[this._pos2 + 1];
      }, r.anchorY.set = function (t) {
        this._structArray.int16[this._pos2 + 1] = t;
      }, r.glyphStartIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 2];
      }, r.glyphStartIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 2] = t;
      }, r.numGlyphs.get = function () {
        return this._structArray.uint16[this._pos2 + 3];
      }, r.numGlyphs.set = function (t) {
        this._structArray.uint16[this._pos2 + 3] = t;
      }, r.vertexStartIndex.get = function () {
        return this._structArray.uint32[this._pos4 + 2];
      }, r.vertexStartIndex.set = function (t) {
        this._structArray.uint32[this._pos4 + 2] = t;
      }, r.lineStartIndex.get = function () {
        return this._structArray.uint32[this._pos4 + 3];
      }, r.lineStartIndex.set = function (t) {
        this._structArray.uint32[this._pos4 + 3] = t;
      }, r.lineLength.get = function () {
        return this._structArray.uint32[this._pos4 + 4];
      }, r.lineLength.set = function (t) {
        this._structArray.uint32[this._pos4 + 4] = t;
      }, r.segment.get = function () {
        return this._structArray.uint16[this._pos2 + 10];
      }, r.segment.set = function (t) {
        this._structArray.uint16[this._pos2 + 10] = t;
      }, r.lowerSize.get = function () {
        return this._structArray.uint16[this._pos2 + 11];
      }, r.lowerSize.set = function (t) {
        this._structArray.uint16[this._pos2 + 11] = t;
      }, r.upperSize.get = function () {
        return this._structArray.uint16[this._pos2 + 12];
      }, r.upperSize.set = function (t) {
        this._structArray.uint16[this._pos2 + 12] = t;
      }, r.lineOffsetX.get = function () {
        return this._structArray.float32[this._pos4 + 7];
      }, r.lineOffsetX.set = function (t) {
        this._structArray.float32[this._pos4 + 7] = t;
      }, r.lineOffsetY.get = function () {
        return this._structArray.float32[this._pos4 + 8];
      }, r.lineOffsetY.set = function (t) {
        this._structArray.float32[this._pos4 + 8] = t;
      }, r.writingMode.get = function () {
        return this._structArray.uint8[this._pos1 + 36];
      }, r.writingMode.set = function (t) {
        this._structArray.uint8[this._pos1 + 36] = t;
      }, r.hidden.get = function () {
        return this._structArray.uint8[this._pos1 + 37];
      }, r.hidden.set = function (t) {
        this._structArray.uint8[this._pos1 + 37] = t;
      }, r.crossTileID.get = function () {
        return this._structArray.uint32[this._pos4 + 10];
      }, r.crossTileID.set = function (t) {
        this._structArray.uint32[this._pos4 + 10] = t;
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    ki.prototype.size = 44;

    var Si = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
        return new ki(this, t);
      }, e;
    }(hi);

    mn("PlacedSymbolArray", Si);

    var zi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        anchorX: {
          configurable: !0
        },
        anchorY: {
          configurable: !0
        },
        rightJustifiedTextSymbolIndex: {
          configurable: !0
        },
        centerJustifiedTextSymbolIndex: {
          configurable: !0
        },
        leftJustifiedTextSymbolIndex: {
          configurable: !0
        },
        verticalPlacedTextSymbolIndex: {
          configurable: !0
        },
        key: {
          configurable: !0
        },
        textBoxStartIndex: {
          configurable: !0
        },
        textBoxEndIndex: {
          configurable: !0
        },
        iconBoxStartIndex: {
          configurable: !0
        },
        iconBoxEndIndex: {
          configurable: !0
        },
        featureIndex: {
          configurable: !0
        },
        numHorizontalGlyphVertices: {
          configurable: !0
        },
        numVerticalGlyphVertices: {
          configurable: !0
        },
        numIconVertices: {
          configurable: !0
        },
        crossTileID: {
          configurable: !0
        },
        textBoxScale: {
          configurable: !0
        },
        radialTextOffset: {
          configurable: !0
        }
      };
      return r.anchorX.get = function () {
        return this._structArray.int16[this._pos2 + 0];
      }, r.anchorX.set = function (t) {
        this._structArray.int16[this._pos2 + 0] = t;
      }, r.anchorY.get = function () {
        return this._structArray.int16[this._pos2 + 1];
      }, r.anchorY.set = function (t) {
        this._structArray.int16[this._pos2 + 1] = t;
      }, r.rightJustifiedTextSymbolIndex.get = function () {
        return this._structArray.int16[this._pos2 + 2];
      }, r.rightJustifiedTextSymbolIndex.set = function (t) {
        this._structArray.int16[this._pos2 + 2] = t;
      }, r.centerJustifiedTextSymbolIndex.get = function () {
        return this._structArray.int16[this._pos2 + 3];
      }, r.centerJustifiedTextSymbolIndex.set = function (t) {
        this._structArray.int16[this._pos2 + 3] = t;
      }, r.leftJustifiedTextSymbolIndex.get = function () {
        return this._structArray.int16[this._pos2 + 4];
      }, r.leftJustifiedTextSymbolIndex.set = function (t) {
        this._structArray.int16[this._pos2 + 4] = t;
      }, r.verticalPlacedTextSymbolIndex.get = function () {
        return this._structArray.int16[this._pos2 + 5];
      }, r.verticalPlacedTextSymbolIndex.set = function (t) {
        this._structArray.int16[this._pos2 + 5] = t;
      }, r.key.get = function () {
        return this._structArray.uint16[this._pos2 + 6];
      }, r.key.set = function (t) {
        this._structArray.uint16[this._pos2 + 6] = t;
      }, r.textBoxStartIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 7];
      }, r.textBoxStartIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 7] = t;
      }, r.textBoxEndIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 8];
      }, r.textBoxEndIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 8] = t;
      }, r.iconBoxStartIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 9];
      }, r.iconBoxStartIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 9] = t;
      }, r.iconBoxEndIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 10];
      }, r.iconBoxEndIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 10] = t;
      }, r.featureIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 11];
      }, r.featureIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 11] = t;
      }, r.numHorizontalGlyphVertices.get = function () {
        return this._structArray.uint16[this._pos2 + 12];
      }, r.numHorizontalGlyphVertices.set = function (t) {
        this._structArray.uint16[this._pos2 + 12] = t;
      }, r.numVerticalGlyphVertices.get = function () {
        return this._structArray.uint16[this._pos2 + 13];
      }, r.numVerticalGlyphVertices.set = function (t) {
        this._structArray.uint16[this._pos2 + 13] = t;
      }, r.numIconVertices.get = function () {
        return this._structArray.uint16[this._pos2 + 14];
      }, r.numIconVertices.set = function (t) {
        this._structArray.uint16[this._pos2 + 14] = t;
      }, r.crossTileID.get = function () {
        return this._structArray.uint32[this._pos4 + 8];
      }, r.crossTileID.set = function (t) {
        this._structArray.uint32[this._pos4 + 8] = t;
      }, r.textBoxScale.get = function () {
        return this._structArray.float32[this._pos4 + 9];
      }, r.textBoxScale.set = function (t) {
        this._structArray.float32[this._pos4 + 9] = t;
      }, r.radialTextOffset.get = function () {
        return this._structArray.float32[this._pos4 + 10];
      }, r.radialTextOffset.set = function (t) {
        this._structArray.float32[this._pos4 + 10] = t;
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    zi.prototype.size = 44;

    var Ii = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
        return new zi(this, t);
      }, e;
    }(fi);

    mn("SymbolInstanceArray", Ii);

    var Bi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        offsetX: {
          configurable: !0
        }
      };
      return r.offsetX.get = function () {
        return this._structArray.float32[this._pos4 + 0];
      }, r.offsetX.set = function (t) {
        this._structArray.float32[this._pos4 + 0] = t;
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    Bi.prototype.size = 4;

    var Ci = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getoffsetX = function (t) {
        return this.float32[1 * t + 0];
      }, e.prototype.get = function (t) {
        return new Bi(this, t);
      }, e;
    }(yi);

    mn("GlyphOffsetArray", Ci);

    var Ei = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        x: {
          configurable: !0
        },
        y: {
          configurable: !0
        },
        tileUnitDistanceFromAnchor: {
          configurable: !0
        }
      };
      return r.x.get = function () {
        return this._structArray.int16[this._pos2 + 0];
      }, r.x.set = function (t) {
        this._structArray.int16[this._pos2 + 0] = t;
      }, r.y.get = function () {
        return this._structArray.int16[this._pos2 + 1];
      }, r.y.set = function (t) {
        this._structArray.int16[this._pos2 + 1] = t;
      }, r.tileUnitDistanceFromAnchor.get = function () {
        return this._structArray.int16[this._pos2 + 2];
      }, r.tileUnitDistanceFromAnchor.set = function (t) {
        this._structArray.int16[this._pos2 + 2] = t;
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    Ei.prototype.size = 6;

    var Mi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getx = function (t) {
        return this.int16[3 * t + 0];
      }, e.prototype.gety = function (t) {
        return this.int16[3 * t + 1];
      }, e.prototype.gettileUnitDistanceFromAnchor = function (t) {
        return this.int16[3 * t + 2];
      }, e.prototype.get = function (t) {
        return new Ei(this, t);
      }, e;
    }(di);

    mn("SymbolLineVertexArray", Mi);

    var Ti = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var r = {
        featureIndex: {
          configurable: !0
        },
        sourceLayerIndex: {
          configurable: !0
        },
        bucketIndex: {
          configurable: !0
        }
      };
      return r.featureIndex.get = function () {
        return this._structArray.uint32[this._pos4 + 0];
      }, r.featureIndex.set = function (t) {
        this._structArray.uint32[this._pos4 + 0] = t;
      }, r.sourceLayerIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 2];
      }, r.sourceLayerIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 2] = t;
      }, r.bucketIndex.get = function () {
        return this._structArray.uint16[this._pos2 + 3];
      }, r.bucketIndex.set = function (t) {
        this._structArray.uint16[this._pos2 + 3] = t;
      }, Object.defineProperties(e.prototype, r), e;
    }($n);

    Ti.prototype.size = 8;

    var Pi = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.get = function (t) {
        return new Ti(this, t);
      }, e;
    }(mi);

    mn("FeatureIndexArray", Pi);

    var Vi = Qn([{
      name: "a_pos",
      components: 2,
      type: "Int16"
    }], 4).members,
        Fi = function (t) {
      void 0 === t && (t = []), this.segments = t;
    };

    function Li(t, e) {
      return 256 * (t = l(Math.floor(t), 0, 255)) + (e = l(Math.floor(e), 0, 255));
    }

    Fi.prototype.prepareSegment = function (t, e, r, n) {
      var i = this.segments[this.segments.length - 1];
      return t > Fi.MAX_VERTEX_ARRAY_LENGTH && w("Max vertices per segment is " + Fi.MAX_VERTEX_ARRAY_LENGTH + ": bucket requested " + t), (!i || i.vertexLength + t > Fi.MAX_VERTEX_ARRAY_LENGTH || i.sortKey !== n) && (i = {
        vertexOffset: e.length,
        primitiveOffset: r.length,
        vertexLength: 0,
        primitiveLength: 0
      }, void 0 !== n && (i.sortKey = n), this.segments.push(i)), i;
    }, Fi.prototype.get = function () {
      return this.segments;
    }, Fi.prototype.destroy = function () {
      for (var t = 0, e = this.segments; t < e.length; t += 1) {
        var r = e[t];

        for (var n in r.vaos) {
          r.vaos[n].destroy();
        }
      }
    }, Fi.simpleSegment = function (t, e, r, n) {
      return new Fi([{
        vertexOffset: t,
        primitiveOffset: e,
        vertexLength: r,
        primitiveLength: n,
        vaos: {},
        sortKey: 0
      }]);
    }, Fi.MAX_VERTEX_ARRAY_LENGTH = Math.pow(2, 16) - 1, mn("SegmentVector", Fi);

    var Di = function () {
      this.ids = [], this.positions = [], this.indexed = !1;
    };

    function Oi(t, e, r) {
      var n = t[e];
      t[e] = t[r], t[r] = n;
    }

    Di.prototype.add = function (t, e, r, n) {
      this.ids.push(t), this.positions.push(e, r, n);
    }, Di.prototype.getPositions = function (t) {
      for (var e = 0, r = this.ids.length - 1; e < r;) {
        var n = e + r >> 1;
        this.ids[n] >= t ? r = n : e = n + 1;
      }

      for (var i = []; this.ids[e] === t;) {
        var a = this.positions[3 * e],
            o = this.positions[3 * e + 1],
            s = this.positions[3 * e + 2];
        i.push({
          index: a,
          start: o,
          end: s
        }), e++;
      }

      return i;
    }, Di.serialize = function (t, e) {
      var r = new Float64Array(t.ids),
          n = new Uint32Array(t.positions);
      return function t(e, r, n, i) {
        if (n >= i) return;
        var a = e[n + i >> 1];
        var o = n - 1;
        var s = i + 1;

        for (;;) {
          do {
            o++;
          } while (e[o] < a);

          do {
            s--;
          } while (e[s] > a);

          if (o >= s) break;
          Oi(e, o, s), Oi(r, 3 * o, 3 * s), Oi(r, 3 * o + 1, 3 * s + 1), Oi(r, 3 * o + 2, 3 * s + 2);
        }

        t(e, r, n, s);
        t(e, r, s + 1, i);
      }(r, n, 0, r.length - 1), e.push(r.buffer, n.buffer), {
        ids: r,
        positions: n
      };
    }, Di.deserialize = function (t) {
      var e = new Di();
      return e.ids = t.ids, e.positions = t.positions, e.indexed = !0, e;
    }, mn("FeaturePositionMap", Di);

    var Ri = function (t, e) {
      this.gl = t.gl, this.location = e;
    },
        Ui = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = 0;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        this.current !== t && (this.current = t, this.gl.uniform1i(this.location, t));
      }, e;
    }(Ri),
        ji = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = 0;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        this.current !== t && (this.current = t, this.gl.uniform1f(this.location, t));
      }, e;
    }(Ri),
        qi = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = [0, 0];
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        t[0] === this.current[0] && t[1] === this.current[1] || (this.current = t, this.gl.uniform2f(this.location, t[0], t[1]));
      }, e;
    }(Ri),
        Ni = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = [0, 0, 0];
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        t[0] === this.current[0] && t[1] === this.current[1] && t[2] === this.current[2] || (this.current = t, this.gl.uniform3f(this.location, t[0], t[1], t[2]));
      }, e;
    }(Ri),
        Ki = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = [0, 0, 0, 0];
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        t[0] === this.current[0] && t[1] === this.current[1] && t[2] === this.current[2] && t[3] === this.current[3] || (this.current = t, this.gl.uniform4f(this.location, t[0], t[1], t[2], t[3]));
      }, e;
    }(Ri),
        Zi = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = Ht.transparent;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        t.r === this.current.r && t.g === this.current.g && t.b === this.current.b && t.a === this.current.a || (this.current = t, this.gl.uniform4f(this.location, t.r, t.g, t.b, t.a));
      }, e;
    }(Ri),
        Gi = new Float32Array(16),
        Xi = function (t) {
      function e(e, r) {
        t.call(this, e, r), this.current = Gi;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        if (t[12] !== this.current[12] || t[0] !== this.current[0]) return this.current = t, void this.gl.uniformMatrix4fv(this.location, !1, t);

        for (var e = 1; e < 16; e++) {
          if (t[e] !== this.current[e]) {
            this.current = t, this.gl.uniformMatrix4fv(this.location, !1, t);
            break;
          }
        }
      }, e;
    }(Ri);

    function Ji(t) {
      return [Li(255 * t.r, 255 * t.g), Li(255 * t.b, 255 * t.a)];
    }

    var Hi = function (t, e, r) {
      this.value = t, this.names = e, this.uniformNames = this.names.map(function (t) {
        return "u_" + t;
      }), this.type = r, this.maxValue = -1 / 0;
    };

    Hi.prototype.defines = function () {
      return this.names.map(function (t) {
        return "#define HAS_UNIFORM_u_" + t;
      });
    }, Hi.prototype.setConstantPatternPositions = function () {}, Hi.prototype.populatePaintArray = function () {}, Hi.prototype.updatePaintArray = function () {}, Hi.prototype.upload = function () {}, Hi.prototype.destroy = function () {}, Hi.prototype.setUniforms = function (t, e, r, n) {
      e.set(n.constantOr(this.value));
    }, Hi.prototype.getBinding = function (t, e) {
      return "color" === this.type ? new Zi(t, e) : new ji(t, e);
    }, Hi.serialize = function (t) {
      var e = t.value,
          r = t.names,
          n = t.type;
      return {
        value: gn(e),
        names: r,
        type: n
      };
    }, Hi.deserialize = function (t) {
      var e = t.value,
          r = t.names,
          n = t.type;
      return new Hi(xn(e), r, n);
    };

    var Yi = function (t, e, r) {
      this.value = t, this.names = e, this.uniformNames = this.names.map(function (t) {
        return "u_" + t;
      }), this.type = r, this.maxValue = -1 / 0, this.patternPositions = {
        patternTo: null,
        patternFrom: null
      };
    };

    Yi.prototype.defines = function () {
      return this.names.map(function (t) {
        return "#define HAS_UNIFORM_u_" + t;
      });
    }, Yi.prototype.populatePaintArray = function () {}, Yi.prototype.updatePaintArray = function () {}, Yi.prototype.upload = function () {}, Yi.prototype.destroy = function () {}, Yi.prototype.setConstantPatternPositions = function (t, e) {
      this.patternPositions.patternTo = t.tlbr, this.patternPositions.patternFrom = e.tlbr;
    }, Yi.prototype.setUniforms = function (t, e, r, n, i) {
      var a = this.patternPositions;
      "u_pattern_to" === i && a.patternTo && e.set(a.patternTo), "u_pattern_from" === i && a.patternFrom && e.set(a.patternFrom);
    }, Yi.prototype.getBinding = function (t, e) {
      return new Ki(t, e);
    };

    var $i = function (t, e, r, n) {
      this.expression = t, this.names = e, this.type = r, this.uniformNames = this.names.map(function (t) {
        return "a_" + t;
      }), this.maxValue = -1 / 0, this.paintVertexAttributes = e.map(function (t) {
        return {
          name: "a_" + t,
          type: "Float32",
          components: "color" === r ? 2 : 1,
          offset: 0
        };
      }), this.paintVertexArray = new n();
    };

    $i.prototype.defines = function () {
      return [];
    }, $i.prototype.setConstantPatternPositions = function () {}, $i.prototype.populatePaintArray = function (t, e) {
      var r = this.paintVertexArray,
          n = r.length;
      r.reserve(t);
      var i = this.expression.evaluate(new Vn(0), e, {});
      if ("color" === this.type) for (var a = Ji(i), o = n; o < t; o++) {
        r.emplaceBack(a[0], a[1]);
      } else {
        for (var s = n; s < t; s++) {
          r.emplaceBack(i);
        }

        this.maxValue = Math.max(this.maxValue, i);
      }
    }, $i.prototype.updatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
          a = this.expression.evaluate({
        zoom: 0
      }, r, n);
      if ("color" === this.type) for (var o = Ji(a), s = t; s < e; s++) {
        i.emplace(s, o[0], o[1]);
      } else {
        for (var u = t; u < e; u++) {
          i.emplace(u, a);
        }

        this.maxValue = Math.max(this.maxValue, a);
      }
    }, $i.prototype.upload = function (t) {
      this.paintVertexArray && this.paintVertexArray.arrayBuffer && (this.paintVertexBuffer && this.paintVertexBuffer.buffer ? this.paintVertexBuffer.updateData(this.paintVertexArray) : this.paintVertexBuffer = t.createVertexBuffer(this.paintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent));
    }, $i.prototype.destroy = function () {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy();
    }, $i.prototype.setUniforms = function (t, e) {
      e.set(0);
    }, $i.prototype.getBinding = function (t, e) {
      return new ji(t, e);
    };

    var Wi = function (t, e, r, n, i, a) {
      this.expression = t, this.names = e, this.uniformNames = this.names.map(function (t) {
        return "u_" + t + "_t";
      }), this.type = r, this.useIntegerZoom = n, this.zoom = i, this.maxValue = -1 / 0;
      var o = a;
      this.paintVertexAttributes = e.map(function (t) {
        return {
          name: "a_" + t,
          type: "Float32",
          components: "color" === r ? 4 : 2,
          offset: 0
        };
      }), this.paintVertexArray = new o();
    };

    Wi.prototype.defines = function () {
      return [];
    }, Wi.prototype.setConstantPatternPositions = function () {}, Wi.prototype.populatePaintArray = function (t, e) {
      var r = this.paintVertexArray,
          n = r.length;
      r.reserve(t);
      var i = this.expression.evaluate(new Vn(this.zoom), e, {}),
          a = this.expression.evaluate(new Vn(this.zoom + 1), e, {});
      if ("color" === this.type) for (var o = Ji(i), s = Ji(a), u = n; u < t; u++) {
        r.emplaceBack(o[0], o[1], s[0], s[1]);
      } else {
        for (var l = n; l < t; l++) {
          r.emplaceBack(i, a);
        }

        this.maxValue = Math.max(this.maxValue, i, a);
      }
    }, Wi.prototype.updatePaintArray = function (t, e, r, n) {
      var i = this.paintVertexArray,
          a = this.expression.evaluate({
        zoom: this.zoom
      }, r, n),
          o = this.expression.evaluate({
        zoom: this.zoom + 1
      }, r, n);
      if ("color" === this.type) for (var s = Ji(a), u = Ji(o), l = t; l < e; l++) {
        i.emplace(l, s[0], s[1], u[0], u[1]);
      } else {
        for (var p = t; p < e; p++) {
          i.emplace(p, a, o);
        }

        this.maxValue = Math.max(this.maxValue, a, o);
      }
    }, Wi.prototype.upload = function (t) {
      this.paintVertexArray && this.paintVertexArray.arrayBuffer && (this.paintVertexBuffer && this.paintVertexBuffer.buffer ? this.paintVertexBuffer.updateData(this.paintVertexArray) : this.paintVertexBuffer = t.createVertexBuffer(this.paintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent));
    }, Wi.prototype.destroy = function () {
      this.paintVertexBuffer && this.paintVertexBuffer.destroy();
    }, Wi.prototype.interpolationFactor = function (t) {
      return this.useIntegerZoom ? this.expression.interpolationFactor(Math.floor(t), this.zoom, this.zoom + 1) : this.expression.interpolationFactor(t, this.zoom, this.zoom + 1);
    }, Wi.prototype.setUniforms = function (t, e, r) {
      e.set(this.interpolationFactor(r.zoom));
    }, Wi.prototype.getBinding = function (t, e) {
      return new ji(t, e);
    };

    var Qi = function (t, e, r, n, i, a, o) {
      this.expression = t, this.names = e, this.type = r, this.uniformNames = this.names.map(function (t) {
        return "u_" + t + "_t";
      }), this.useIntegerZoom = n, this.zoom = i, this.maxValue = -1 / 0, this.layerId = o, this.paintVertexAttributes = e.map(function (t) {
        return {
          name: "a_" + t,
          type: "Uint16",
          components: 4,
          offset: 0
        };
      }), this.zoomInPaintVertexArray = new a(), this.zoomOutPaintVertexArray = new a();
    };

    Qi.prototype.defines = function () {
      return [];
    }, Qi.prototype.setConstantPatternPositions = function () {}, Qi.prototype.populatePaintArray = function (t, e, r) {
      var n = this.zoomInPaintVertexArray,
          i = this.zoomOutPaintVertexArray,
          a = this.layerId,
          o = n.length;

      if (n.reserve(t), i.reserve(t), r && e.patterns && e.patterns[a]) {
        var s = e.patterns[a],
            u = s.min,
            l = s.mid,
            p = s.max,
            c = r[u],
            h = r[l],
            f = r[p];
        if (!c || !h || !f) return;

        for (var y = o; y < t; y++) {
          n.emplaceBack(h.tl[0], h.tl[1], h.br[0], h.br[1], c.tl[0], c.tl[1], c.br[0], c.br[1]), i.emplaceBack(h.tl[0], h.tl[1], h.br[0], h.br[1], f.tl[0], f.tl[1], f.br[0], f.br[1]);
        }
      }
    }, Qi.prototype.updatePaintArray = function (t, e, r, n, i) {
      var a = this.zoomInPaintVertexArray,
          o = this.zoomOutPaintVertexArray,
          s = this.layerId;

      if (i && r.patterns && r.patterns[s]) {
        var u = r.patterns[s],
            l = u.min,
            p = u.mid,
            c = u.max,
            h = i[l],
            f = i[p],
            y = i[c];
        if (!h || !f || !y) return;

        for (var d = t; d < e; d++) {
          a.emplace(d, f.tl[0], f.tl[1], f.br[0], f.br[1], h.tl[0], h.tl[1], h.br[0], h.br[1]), o.emplace(d, f.tl[0], f.tl[1], f.br[0], f.br[1], y.tl[0], y.tl[1], y.br[0], y.br[1]);
        }
      }
    }, Qi.prototype.upload = function (t) {
      this.zoomInPaintVertexArray && this.zoomInPaintVertexArray.arrayBuffer && this.zoomOutPaintVertexArray && this.zoomOutPaintVertexArray.arrayBuffer && (this.zoomInPaintVertexBuffer = t.createVertexBuffer(this.zoomInPaintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent), this.zoomOutPaintVertexBuffer = t.createVertexBuffer(this.zoomOutPaintVertexArray, this.paintVertexAttributes, this.expression.isStateDependent));
    }, Qi.prototype.destroy = function () {
      this.zoomOutPaintVertexBuffer && this.zoomOutPaintVertexBuffer.destroy(), this.zoomInPaintVertexBuffer && this.zoomInPaintVertexBuffer.destroy();
    }, Qi.prototype.setUniforms = function (t, e) {
      e.set(0);
    }, Qi.prototype.getBinding = function (t, e) {
      return new ji(t, e);
    };

    var ta = function () {
      this.binders = {}, this.cacheKey = "", this._buffers = [], this._featureMap = new Di(), this._bufferOffset = 0;
    };

    ta.createDynamic = function (t, e, r) {
      var n = new ta(),
          i = [];

      for (var a in t.paint._values) {
        if (r(a)) {
          var o = t.paint.get(a);

          if (o instanceof jn && hr(o.property.specification)) {
            var s = ra(a, t.type),
                u = o.property.specification.type,
                l = o.property.useIntegerZoom;
            if ("cross-faded" === o.property.specification["property-type"] || "cross-faded-data-driven" === o.property.specification["property-type"]) {
              if ("constant" === o.value.kind) n.binders[a] = new Yi(o.value.value, s, u), i.push("/u_" + a);else {
                var p = na(a, u, "source");
                n.binders[a] = new Qi(o.value, s, u, l, e, p, t.id), i.push("/a_" + a);
              }
            } else if ("constant" === o.value.kind) n.binders[a] = new Hi(o.value.value, s, u), i.push("/u_" + a);else if ("source" === o.value.kind) {
              var c = na(a, u, "source");
              n.binders[a] = new $i(o.value, s, u, c), i.push("/a_" + a);
            } else {
              var h = na(a, u, "composite");
              n.binders[a] = new Wi(o.value, s, u, l, e, h), i.push("/z_" + a);
            }
          }
        }
      }

      return n.cacheKey = i.sort().join(""), n;
    }, ta.prototype.populatePaintArrays = function (t, e, r, n) {
      for (var i in this.binders) {
        this.binders[i].populatePaintArray(t, e, n);
      }

      void 0 !== e.id && this._featureMap.add(+e.id, r, this._bufferOffset, t), this._bufferOffset = t;
    }, ta.prototype.setConstantPatternPositions = function (t, e) {
      for (var r in this.binders) {
        this.binders[r].setConstantPatternPositions(t, e);
      }
    }, ta.prototype.updatePaintArrays = function (t, e, r, n) {
      var i = !1;

      for (var a in t) {
        for (var o = 0, s = this._featureMap.getPositions(+a); o < s.length; o += 1) {
          var u = s[o],
              l = e.feature(u.index);

          for (var p in this.binders) {
            var c = this.binders[p];

            if (!(c instanceof Hi || c instanceof Yi) && !0 === c.expression.isStateDependent) {
              var h = r.paint.get(p);
              c.expression = h.value, c.updatePaintArray(u.start, u.end, l, t[a], n), i = !0;
            }
          }
        }
      }

      return i;
    }, ta.prototype.defines = function () {
      var t = [];

      for (var e in this.binders) {
        t.push.apply(t, this.binders[e].defines());
      }

      return t;
    }, ta.prototype.getPaintVertexBuffers = function () {
      return this._buffers;
    }, ta.prototype.getUniforms = function (t, e) {
      var r = [];

      for (var n in this.binders) {
        for (var i = this.binders[n], a = 0, o = i.uniformNames; a < o.length; a += 1) {
          var s = o[a];

          if (e[s]) {
            var u = i.getBinding(t, e[s]);
            r.push({
              name: s,
              property: n,
              binding: u
            });
          }
        }
      }

      return r;
    }, ta.prototype.setUniforms = function (t, e, r, n) {
      for (var i = 0, a = e; i < a.length; i += 1) {
        var o = a[i],
            s = o.name,
            u = o.property,
            l = o.binding;
        this.binders[u].setUniforms(t, l, n, r.get(u), s);
      }
    }, ta.prototype.updatePatternPaintBuffers = function (t) {
      var e = [];

      for (var r in this.binders) {
        var n = this.binders[r];

        if (n instanceof Qi) {
          var i = 2 === t.fromScale ? n.zoomInPaintVertexBuffer : n.zoomOutPaintVertexBuffer;
          i && e.push(i);
        } else (n instanceof $i || n instanceof Wi) && n.paintVertexBuffer && e.push(n.paintVertexBuffer);
      }

      this._buffers = e;
    }, ta.prototype.upload = function (t) {
      for (var e in this.binders) {
        this.binders[e].upload(t);
      }

      var r = [];

      for (var n in this.binders) {
        var i = this.binders[n];
        (i instanceof $i || i instanceof Wi) && i.paintVertexBuffer && r.push(i.paintVertexBuffer);
      }

      this._buffers = r;
    }, ta.prototype.destroy = function () {
      for (var t in this.binders) {
        this.binders[t].destroy();
      }
    };

    var ea = function (t, e, r, n) {
      void 0 === n && (n = function () {
        return !0;
      }), this.programConfigurations = {};

      for (var i = 0, a = e; i < a.length; i += 1) {
        var o = a[i];
        this.programConfigurations[o.id] = ta.createDynamic(o, r, n), this.programConfigurations[o.id].layoutAttributes = t;
      }

      this.needsUpload = !1;
    };

    function ra(t, e) {
      return {
        "text-opacity": ["opacity"],
        "icon-opacity": ["opacity"],
        "text-color": ["fill_color"],
        "icon-color": ["fill_color"],
        "text-halo-color": ["halo_color"],
        "icon-halo-color": ["halo_color"],
        "text-halo-blur": ["halo_blur"],
        "icon-halo-blur": ["halo_blur"],
        "text-halo-width": ["halo_width"],
        "icon-halo-width": ["halo_width"],
        "line-gap-width": ["gapwidth"],
        "line-pattern": ["pattern_to", "pattern_from"],
        "fill-pattern": ["pattern_to", "pattern_from"],
        "fill-extrusion-pattern": ["pattern_to", "pattern_from"]
      }[t] || [t.replace(e + "-", "").replace(/-/g, "_")];
    }

    function na(t, e, r) {
      var n = {
        color: {
          source: bi,
          composite: _i
        },
        number: {
          source: yi,
          composite: bi
        }
      },
          i = function (t) {
        return {
          "line-pattern": {
            source: ai,
            composite: ai
          },
          "fill-pattern": {
            source: ai,
            composite: ai
          },
          "fill-extrusion-pattern": {
            source: ai,
            composite: ai
          }
        }[t];
      }(t);

      return i && i[r] || n[e][r];
    }

    ea.prototype.populatePaintArrays = function (t, e, r, n) {
      for (var i in this.programConfigurations) {
        this.programConfigurations[i].populatePaintArrays(t, e, r, n);
      }

      this.needsUpload = !0;
    }, ea.prototype.updatePaintArrays = function (t, e, r, n) {
      for (var i = 0, a = r; i < a.length; i += 1) {
        var o = a[i];
        this.needsUpload = this.programConfigurations[o.id].updatePaintArrays(t, e, o, n) || this.needsUpload;
      }
    }, ea.prototype.get = function (t) {
      return this.programConfigurations[t];
    }, ea.prototype.upload = function (t) {
      if (this.needsUpload) {
        for (var e in this.programConfigurations) {
          this.programConfigurations[e].upload(t);
        }

        this.needsUpload = !1;
      }
    }, ea.prototype.destroy = function () {
      for (var t in this.programConfigurations) {
        this.programConfigurations[t].destroy();
      }
    }, mn("ConstantBinder", Hi), mn("CrossFadedConstantBinder", Yi), mn("SourceExpressionBinder", $i), mn("CrossFadedCompositeBinder", Qi), mn("CompositeExpressionBinder", Wi), mn("ProgramConfiguration", ta, {
      omit: ["_buffers"]
    }), mn("ProgramConfigurationSet", ea);
    var ia = 8192;
    var aa,
        oa = (aa = 15, {
      min: -1 * Math.pow(2, aa - 1),
      max: Math.pow(2, aa - 1) - 1
    });

    function sa(t) {
      for (var e = ia / t.extent, r = t.loadGeometry(), n = 0; n < r.length; n++) {
        for (var i = r[n], a = 0; a < i.length; a++) {
          var o = i[a];
          o.x = Math.round(o.x * e), o.y = Math.round(o.y * e), (o.x < oa.min || o.x > oa.max || o.y < oa.min || o.y > oa.max) && (w("Geometry exceeds allowed extent, reduce your vector tile buffer size"), o.x = l(o.x, oa.min, oa.max), o.y = l(o.y, oa.min, oa.max));
        }
      }

      return r;
    }

    function ua(t, e, r, n, i) {
      t.emplaceBack(2 * e + (n + 1) / 2, 2 * r + (i + 1) / 2);
    }

    var la = function (t) {
      this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function (t) {
        return t.id;
      }), this.index = t.index, this.hasPattern = !1, this.layoutVertexArray = new ei(), this.indexArray = new vi(), this.segments = new Fi(), this.programConfigurations = new ea(Vi, t.layers, t.zoom), this.stateDependentLayerIds = this.layers.filter(function (t) {
        return t.isStateDependent();
      }).map(function (t) {
        return t.id;
      });
    };

    function pa(t, e) {
      for (var r = 0; r < t.length; r++) {
        if (xa(e, t[r])) return !0;
      }

      for (var n = 0; n < e.length; n++) {
        if (xa(t, e[n])) return !0;
      }

      return !!ya(t, e);
    }

    function ca(t, e, r) {
      return !!xa(t, e) || !!ma(e, t, r);
    }

    function ha(t, e) {
      if (1 === t.length) return ga(e, t[0]);

      for (var r = 0; r < e.length; r++) {
        for (var n = e[r], i = 0; i < n.length; i++) {
          if (xa(t, n[i])) return !0;
        }
      }

      for (var a = 0; a < t.length; a++) {
        if (ga(e, t[a])) return !0;
      }

      for (var o = 0; o < e.length; o++) {
        if (ya(t, e[o])) return !0;
      }

      return !1;
    }

    function fa(t, e, r) {
      if (t.length > 1) {
        if (ya(t, e)) return !0;

        for (var n = 0; n < e.length; n++) {
          if (ma(e[n], t, r)) return !0;
        }
      }

      for (var i = 0; i < t.length; i++) {
        if (ma(t[i], e, r)) return !0;
      }

      return !1;
    }

    function ya(t, e) {
      if (0 === t.length || 0 === e.length) return !1;

      for (var r = 0; r < t.length - 1; r++) {
        for (var n = t[r], i = t[r + 1], a = 0; a < e.length - 1; a++) {
          if (da(n, i, e[a], e[a + 1])) return !0;
        }
      }

      return !1;
    }

    function da(t, e, r, n) {
      return A(t, r, n) !== A(e, r, n) && A(t, e, r) !== A(t, e, n);
    }

    function ma(t, e, r) {
      var n = r * r;
      if (1 === e.length) return t.distSqr(e[0]) < n;

      for (var i = 1; i < e.length; i++) {
        if (va(t, e[i - 1], e[i]) < n) return !0;
      }

      return !1;
    }

    function va(t, e, r) {
      var n = e.distSqr(r);
      if (0 === n) return t.distSqr(e);
      var i = ((t.x - e.x) * (r.x - e.x) + (t.y - e.y) * (r.y - e.y)) / n;
      return i < 0 ? t.distSqr(e) : i > 1 ? t.distSqr(r) : t.distSqr(r.sub(e)._mult(i)._add(e));
    }

    function ga(t, e) {
      for (var r, n, i, a = !1, o = 0; o < t.length; o++) {
        for (var s = 0, u = (r = t[o]).length - 1; s < r.length; u = s++) {
          n = r[s], i = r[u], n.y > e.y != i.y > e.y && e.x < (i.x - n.x) * (e.y - n.y) / (i.y - n.y) + n.x && (a = !a);
        }
      }

      return a;
    }

    function xa(t, e) {
      for (var r = !1, n = 0, i = t.length - 1; n < t.length; i = n++) {
        var a = t[n],
            o = t[i];
        a.y > e.y != o.y > e.y && e.x < (o.x - a.x) * (e.y - a.y) / (o.y - a.y) + a.x && (r = !r);
      }

      return r;
    }

    function ba(t, e, r) {
      var n = r[0],
          i = r[2];
      if (t.x < n.x && e.x < n.x || t.x > i.x && e.x > i.x || t.y < n.y && e.y < n.y || t.y > i.y && e.y > i.y) return !1;
      var a = A(t, e, r[0]);
      return a !== A(t, e, r[1]) || a !== A(t, e, r[2]) || a !== A(t, e, r[3]);
    }

    function _a(t, e, r) {
      var n = e.paint.get(t).value;
      return "constant" === n.kind ? n.value : r.programConfigurations.get(e.id).binders[t].maxValue;
    }

    function wa(t) {
      return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
    }

    function Aa(t, e, r, n, a) {
      if (!e[0] && !e[1]) return t;

      var o = i.convert(e)._mult(a);

      "viewport" === r && o._rotate(-n);

      for (var s = [], u = 0; u < t.length; u++) {
        var l = t[u];
        s.push(l.sub(o));
      }

      return s;
    }

    la.prototype.populate = function (t, e) {
      var r = this.layers[0],
          n = [],
          i = null;
      "circle" === r.type && (i = r.layout.get("circle-sort-key"));

      for (var a = 0, o = t; a < o.length; a += 1) {
        var s = o[a],
            u = s.feature,
            l = s.index,
            p = s.sourceLayerIndex;

        if (this.layers[0]._featureFilter(new Vn(this.zoom), u)) {
          var c = sa(u),
              h = i ? i.evaluate(u, {}) : void 0,
              f = {
            id: u.id,
            properties: u.properties,
            type: u.type,
            sourceLayerIndex: p,
            index: l,
            geometry: c,
            patterns: {},
            sortKey: h
          };
          n.push(f);
        }
      }

      i && n.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });

      for (var y = 0, d = n; y < d.length; y += 1) {
        var m = d[y],
            v = m,
            g = v.geometry,
            x = v.index,
            b = v.sourceLayerIndex,
            _ = t[x].feature;
        this.addFeature(m, g, x), e.featureIndex.insert(_, g, x, b, this.index);
      }
    }, la.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers, r);
    }, la.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }, la.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }, la.prototype.upload = function (t) {
      this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Vi), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
    }, la.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
    }, la.prototype.addFeature = function (t, e, r) {
      for (var n = 0, i = e; n < i.length; n += 1) {
        for (var a = 0, o = i[n]; a < o.length; a += 1) {
          var s = o[a],
              u = s.x,
              l = s.y;

          if (!(u < 0 || u >= ia || l < 0 || l >= ia)) {
            var p = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray, t.sortKey),
                c = p.vertexLength;
            ua(this.layoutVertexArray, u, l, -1, -1), ua(this.layoutVertexArray, u, l, 1, -1), ua(this.layoutVertexArray, u, l, 1, 1), ua(this.layoutVertexArray, u, l, -1, 1), this.indexArray.emplaceBack(c, c + 1, c + 2), this.indexArray.emplaceBack(c, c + 3, c + 2), p.vertexLength += 4, p.primitiveLength += 2;
          }
        }
      }

      this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r, {});
    }, mn("CircleBucket", la, {
      omit: ["layers"]
    });
    var ka = new Jn({
      "circle-sort-key": new Kn(zt.layout_circle["circle-sort-key"])
    }),
        Sa = {
      paint: new Jn({
        "circle-radius": new Kn(zt.paint_circle["circle-radius"]),
        "circle-color": new Kn(zt.paint_circle["circle-color"]),
        "circle-blur": new Kn(zt.paint_circle["circle-blur"]),
        "circle-opacity": new Kn(zt.paint_circle["circle-opacity"]),
        "circle-translate": new Nn(zt.paint_circle["circle-translate"]),
        "circle-translate-anchor": new Nn(zt.paint_circle["circle-translate-anchor"]),
        "circle-pitch-scale": new Nn(zt.paint_circle["circle-pitch-scale"]),
        "circle-pitch-alignment": new Nn(zt.paint_circle["circle-pitch-alignment"]),
        "circle-stroke-width": new Kn(zt.paint_circle["circle-stroke-width"]),
        "circle-stroke-color": new Kn(zt.paint_circle["circle-stroke-color"]),
        "circle-stroke-opacity": new Kn(zt.paint_circle["circle-stroke-opacity"])
      }),
      layout: ka
    },
        za = "undefined" != typeof Float32Array ? Float32Array : Array;
    Math.PI;
    var Ia, Ba;
    Ia = new za(3), za != Float32Array && (Ia[0] = 0, Ia[1] = 0, Ia[2] = 0), Ba = Ia;

    function Ca(t, e, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[3];
      return t[0] = r[0] * n + r[4] * i + r[8] * a + r[12] * o, t[1] = r[1] * n + r[5] * i + r[9] * a + r[13] * o, t[2] = r[2] * n + r[6] * i + r[10] * a + r[14] * o, t[3] = r[3] * n + r[7] * i + r[11] * a + r[15] * o, t;
    }

    !function () {
      var t = function () {
        var t = new za(4);
        return za != Float32Array && (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0), t;
      }();
    }();

    var Ea = function (t) {
      function e(e) {
        t.call(this, e, Sa);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function (t) {
        return new la(t);
      }, e.prototype.queryRadius = function (t) {
        var e = t;
        return _a("circle-radius", this, e) + _a("circle-stroke-width", this, e) + wa(this.paint.get("circle-translate"));
      }, e.prototype.queryIntersectsFeature = function (t, e, r, n, i, a, o, s) {
        for (var u = Aa(t, this.paint.get("circle-translate"), this.paint.get("circle-translate-anchor"), a.angle, o), l = this.paint.get("circle-radius").evaluate(e, r) + this.paint.get("circle-stroke-width").evaluate(e, r), p = "map" === this.paint.get("circle-pitch-alignment"), c = p ? u : function (t, e) {
          return t.map(function (t) {
            return Ma(t, e);
          });
        }(u, s), h = p ? l * o : l, f = 0, y = n; f < y.length; f += 1) {
          for (var d = 0, m = y[f]; d < m.length; d += 1) {
            var v = m[d],
                g = p ? v : Ma(v, s),
                x = h,
                b = Ca([], [v.x, v.y, 0, 1], s);
            if ("viewport" === this.paint.get("circle-pitch-scale") && "map" === this.paint.get("circle-pitch-alignment") ? x *= b[3] / a.cameraToCenterDistance : "map" === this.paint.get("circle-pitch-scale") && "viewport" === this.paint.get("circle-pitch-alignment") && (x *= a.cameraToCenterDistance / b[3]), ca(c, g, x)) return !0;
          }
        }

        return !1;
      }, e;
    }(Hn);

    function Ma(t, e) {
      var r = Ca([], [t.x, t.y, 0, 1], e);
      return new i(r[0] / r[3], r[1] / r[3]);
    }

    var Ta = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(la);

    function Pa(t, e, r, n) {
      var i = e.width,
          a = e.height;

      if (n) {
        if (n instanceof Uint8ClampedArray) n = new Uint8Array(n.buffer);else if (n.length !== i * a * r) throw new RangeError("mismatched image size");
      } else n = new Uint8Array(i * a * r);

      return t.width = i, t.height = a, t.data = n, t;
    }

    function Va(t, e, r) {
      var n = e.width,
          i = e.height;

      if (n !== t.width || i !== t.height) {
        var a = Pa({}, {
          width: n,
          height: i
        }, r);
        Fa(t, a, {
          x: 0,
          y: 0
        }, {
          x: 0,
          y: 0
        }, {
          width: Math.min(t.width, n),
          height: Math.min(t.height, i)
        }, r), t.width = n, t.height = i, t.data = a.data;
      }
    }

    function Fa(t, e, r, n, i, a) {
      if (0 === i.width || 0 === i.height) return e;
      if (i.width > t.width || i.height > t.height || r.x > t.width - i.width || r.y > t.height - i.height) throw new RangeError("out of range source coordinates for image copy");
      if (i.width > e.width || i.height > e.height || n.x > e.width - i.width || n.y > e.height - i.height) throw new RangeError("out of range destination coordinates for image copy");

      for (var o = t.data, s = e.data, u = 0; u < i.height; u++) {
        for (var l = ((r.y + u) * t.width + r.x) * a, p = ((n.y + u) * e.width + n.x) * a, c = 0; c < i.width * a; c++) {
          s[p + c] = o[l + c];
        }
      }

      return e;
    }

    mn("HeatmapBucket", Ta, {
      omit: ["layers"]
    });

    var La = function (t, e) {
      Pa(this, t, 1, e);
    };

    La.prototype.resize = function (t) {
      Va(this, t, 1);
    }, La.prototype.clone = function () {
      return new La({
        width: this.width,
        height: this.height
      }, new Uint8Array(this.data));
    }, La.copy = function (t, e, r, n, i) {
      Fa(t, e, r, n, i, 1);
    };

    var Da = function (t, e) {
      Pa(this, t, 4, e);
    };

    Da.prototype.resize = function (t) {
      Va(this, t, 4);
    }, Da.prototype.replace = function (t, e) {
      e ? this.data.set(t) : t instanceof Uint8ClampedArray ? this.data = new Uint8Array(t.buffer) : this.data = t;
    }, Da.prototype.clone = function () {
      return new Da({
        width: this.width,
        height: this.height
      }, new Uint8Array(this.data));
    }, Da.copy = function (t, e, r, n, i) {
      Fa(t, e, r, n, i, 4);
    }, mn("AlphaImage", La), mn("RGBAImage", Da);
    var Oa = {
      paint: new Jn({
        "heatmap-radius": new Kn(zt.paint_heatmap["heatmap-radius"]),
        "heatmap-weight": new Kn(zt.paint_heatmap["heatmap-weight"]),
        "heatmap-intensity": new Nn(zt.paint_heatmap["heatmap-intensity"]),
        "heatmap-color": new Xn(zt.paint_heatmap["heatmap-color"]),
        "heatmap-opacity": new Nn(zt.paint_heatmap["heatmap-opacity"])
      })
    };

    function Ra(t, e) {
      for (var r = new Uint8Array(1024), n = {}, i = 0, a = 0; i < 256; i++, a += 4) {
        n[e] = i / 255;
        var o = t.evaluate(n);
        r[a + 0] = Math.floor(255 * o.r / o.a), r[a + 1] = Math.floor(255 * o.g / o.a), r[a + 2] = Math.floor(255 * o.b / o.a), r[a + 3] = Math.floor(255 * o.a);
      }

      return new Da({
        width: 256,
        height: 1
      }, r);
    }

    var Ua = function (t) {
      function e(e) {
        t.call(this, e, Oa), this._updateColorRamp();
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function (t) {
        return new Ta(t);
      }, e.prototype._handleSpecialPaintPropertyUpdate = function (t) {
        "heatmap-color" === t && this._updateColorRamp();
      }, e.prototype._updateColorRamp = function () {
        var t = this._transitionablePaint._values["heatmap-color"].value.expression;
        this.colorRamp = Ra(t, "heatmapDensity"), this.colorRampTexture = null;
      }, e.prototype.resize = function () {
        this.heatmapFbo && (this.heatmapFbo.destroy(), this.heatmapFbo = null);
      }, e.prototype.queryRadius = function () {
        return 0;
      }, e.prototype.queryIntersectsFeature = function () {
        return !1;
      }, e.prototype.hasOffscreenPass = function () {
        return 0 !== this.paint.get("heatmap-opacity") && "none" !== this.visibility;
      }, e;
    }(Hn),
        ja = {
      paint: new Jn({
        "hillshade-illumination-direction": new Nn(zt.paint_hillshade["hillshade-illumination-direction"]),
        "hillshade-illumination-anchor": new Nn(zt.paint_hillshade["hillshade-illumination-anchor"]),
        "hillshade-exaggeration": new Nn(zt.paint_hillshade["hillshade-exaggeration"]),
        "hillshade-shadow-color": new Nn(zt.paint_hillshade["hillshade-shadow-color"]),
        "hillshade-highlight-color": new Nn(zt.paint_hillshade["hillshade-highlight-color"]),
        "hillshade-accent-color": new Nn(zt.paint_hillshade["hillshade-accent-color"])
      })
    },
        qa = function (t) {
      function e(e) {
        t.call(this, e, ja);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.hasOffscreenPass = function () {
        return 0 !== this.paint.get("hillshade-exaggeration") && "none" !== this.visibility;
      }, e;
    }(Hn),
        Na = Qn([{
      name: "a_pos",
      components: 2,
      type: "Int16"
    }], 4).members,
        Ka = Ga,
        Za = Ga;

    function Ga(t, e, r) {
      r = r || 2;
      var n,
          i,
          a,
          o,
          s,
          u,
          l,
          p = e && e.length,
          c = p ? e[0] * r : t.length,
          h = Xa(t, 0, c, r, !0),
          f = [];
      if (!h || h.next === h.prev) return f;

      if (p && (h = function (t, e, r, n) {
        var i,
            a,
            o,
            s,
            u,
            l = [];

        for (i = 0, a = e.length; i < a; i++) {
          o = e[i] * n, s = i < a - 1 ? e[i + 1] * n : t.length, (u = Xa(t, o, s, n, !1)) === u.next && (u.steiner = !0), l.push(no(u));
        }

        for (l.sort(to), i = 0; i < l.length; i++) {
          eo(l[i], r), r = Ja(r, r.next);
        }

        return r;
      }(t, e, h, r)), t.length > 80 * r) {
        n = a = t[0], i = o = t[1];

        for (var y = r; y < c; y += r) {
          (s = t[y]) < n && (n = s), (u = t[y + 1]) < i && (i = u), s > a && (a = s), u > o && (o = u);
        }

        l = 0 !== (l = Math.max(a - n, o - i)) ? 1 / l : 0;
      }

      return Ha(h, f, r, n, i, l), f;
    }

    function Xa(t, e, r, n, i) {
      var a, o;
      if (i === yo(t, e, r, n) > 0) for (a = e; a < r; a += n) {
        o = co(a, t[a], t[a + 1], o);
      } else for (a = r - n; a >= e; a -= n) {
        o = co(a, t[a], t[a + 1], o);
      }
      return o && so(o, o.next) && (ho(o), o = o.next), o;
    }

    function Ja(t, e) {
      if (!t) return t;
      e || (e = t);
      var r,
          n = t;

      do {
        if (r = !1, n.steiner || !so(n, n.next) && 0 !== oo(n.prev, n, n.next)) n = n.next;else {
          if (ho(n), (n = e = n.prev) === n.next) break;
          r = !0;
        }
      } while (r || n !== e);

      return e;
    }

    function Ha(t, e, r, n, i, a, o) {
      if (t) {
        !o && a && function (t, e, r, n) {
          var i = t;

          do {
            null === i.z && (i.z = ro(i.x, i.y, e, r, n)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
          } while (i !== t);

          i.prevZ.nextZ = null, i.prevZ = null, function (t) {
            var e,
                r,
                n,
                i,
                a,
                o,
                s,
                u,
                l = 1;

            do {
              for (r = t, t = null, a = null, o = 0; r;) {
                for (o++, n = r, s = 0, e = 0; e < l && (s++, n = n.nextZ); e++) {
                  ;
                }

                for (u = l; s > 0 || u > 0 && n;) {
                  0 !== s && (0 === u || !n || r.z <= n.z) ? (i = r, r = r.nextZ, s--) : (i = n, n = n.nextZ, u--), a ? a.nextZ = i : t = i, i.prevZ = a, a = i;
                }

                r = n;
              }

              a.nextZ = null, l *= 2;
            } while (o > 1);
          }(i);
        }(t, n, i, a);

        for (var s, u, l = t; t.prev !== t.next;) {
          if (s = t.prev, u = t.next, a ? $a(t, n, i, a) : Ya(t)) e.push(s.i / r), e.push(t.i / r), e.push(u.i / r), ho(t), t = u.next, l = u.next;else if ((t = u) === l) {
            o ? 1 === o ? Ha(t = Wa(t, e, r), e, r, n, i, a, 2) : 2 === o && Qa(t, e, r, n, i, a) : Ha(Ja(t), e, r, n, i, a, 1);
            break;
          }
        }
      }
    }

    function Ya(t) {
      var e = t.prev,
          r = t,
          n = t.next;
      if (oo(e, r, n) >= 0) return !1;

      for (var i = t.next.next; i !== t.prev;) {
        if (io(e.x, e.y, r.x, r.y, n.x, n.y, i.x, i.y) && oo(i.prev, i, i.next) >= 0) return !1;
        i = i.next;
      }

      return !0;
    }

    function $a(t, e, r, n) {
      var i = t.prev,
          a = t,
          o = t.next;
      if (oo(i, a, o) >= 0) return !1;

      for (var s = i.x < a.x ? i.x < o.x ? i.x : o.x : a.x < o.x ? a.x : o.x, u = i.y < a.y ? i.y < o.y ? i.y : o.y : a.y < o.y ? a.y : o.y, l = i.x > a.x ? i.x > o.x ? i.x : o.x : a.x > o.x ? a.x : o.x, p = i.y > a.y ? i.y > o.y ? i.y : o.y : a.y > o.y ? a.y : o.y, c = ro(s, u, e, r, n), h = ro(l, p, e, r, n), f = t.prevZ, y = t.nextZ; f && f.z >= c && y && y.z <= h;) {
        if (f !== t.prev && f !== t.next && io(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && oo(f.prev, f, f.next) >= 0) return !1;
        if (f = f.prevZ, y !== t.prev && y !== t.next && io(i.x, i.y, a.x, a.y, o.x, o.y, y.x, y.y) && oo(y.prev, y, y.next) >= 0) return !1;
        y = y.nextZ;
      }

      for (; f && f.z >= c;) {
        if (f !== t.prev && f !== t.next && io(i.x, i.y, a.x, a.y, o.x, o.y, f.x, f.y) && oo(f.prev, f, f.next) >= 0) return !1;
        f = f.prevZ;
      }

      for (; y && y.z <= h;) {
        if (y !== t.prev && y !== t.next && io(i.x, i.y, a.x, a.y, o.x, o.y, y.x, y.y) && oo(y.prev, y, y.next) >= 0) return !1;
        y = y.nextZ;
      }

      return !0;
    }

    function Wa(t, e, r) {
      var n = t;

      do {
        var i = n.prev,
            a = n.next.next;
        !so(i, a) && uo(i, n, n.next, a) && lo(i, a) && lo(a, i) && (e.push(i.i / r), e.push(n.i / r), e.push(a.i / r), ho(n), ho(n.next), n = t = a), n = n.next;
      } while (n !== t);

      return n;
    }

    function Qa(t, e, r, n, i, a) {
      var o = t;

      do {
        for (var s = o.next.next; s !== o.prev;) {
          if (o.i !== s.i && ao(o, s)) {
            var u = po(o, s);
            return o = Ja(o, o.next), u = Ja(u, u.next), Ha(o, e, r, n, i, a), void Ha(u, e, r, n, i, a);
          }

          s = s.next;
        }

        o = o.next;
      } while (o !== t);
    }

    function to(t, e) {
      return t.x - e.x;
    }

    function eo(t, e) {
      if (e = function (t, e) {
        var r,
            n = e,
            i = t.x,
            a = t.y,
            o = -1 / 0;

        do {
          if (a <= n.y && a >= n.next.y && n.next.y !== n.y) {
            var s = n.x + (a - n.y) * (n.next.x - n.x) / (n.next.y - n.y);

            if (s <= i && s > o) {
              if (o = s, s === i) {
                if (a === n.y) return n;
                if (a === n.next.y) return n.next;
              }

              r = n.x < n.next.x ? n : n.next;
            }
          }

          n = n.next;
        } while (n !== e);

        if (!r) return null;
        if (i === o) return r.prev;
        var u,
            l = r,
            p = r.x,
            c = r.y,
            h = 1 / 0;
        n = r.next;

        for (; n !== l;) {
          i >= n.x && n.x >= p && i !== n.x && io(a < c ? i : o, a, p, c, a < c ? o : i, a, n.x, n.y) && ((u = Math.abs(a - n.y) / (i - n.x)) < h || u === h && n.x > r.x) && lo(n, t) && (r = n, h = u), n = n.next;
        }

        return r;
      }(t, e)) {
        var r = po(e, t);
        Ja(r, r.next);
      }
    }

    function ro(t, e, r, n, i) {
      return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - r) * i) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - n) * i) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1;
    }

    function no(t) {
      var e = t,
          r = t;

      do {
        (e.x < r.x || e.x === r.x && e.y < r.y) && (r = e), e = e.next;
      } while (e !== t);

      return r;
    }

    function io(t, e, r, n, i, a, o, s) {
      return (i - o) * (e - s) - (t - o) * (a - s) >= 0 && (t - o) * (n - s) - (r - o) * (e - s) >= 0 && (r - o) * (a - s) - (i - o) * (n - s) >= 0;
    }

    function ao(t, e) {
      return t.next.i !== e.i && t.prev.i !== e.i && !function (t, e) {
        var r = t;

        do {
          if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && uo(r, r.next, t, e)) return !0;
          r = r.next;
        } while (r !== t);

        return !1;
      }(t, e) && lo(t, e) && lo(e, t) && function (t, e) {
        var r = t,
            n = !1,
            i = (t.x + e.x) / 2,
            a = (t.y + e.y) / 2;

        do {
          r.y > a != r.next.y > a && r.next.y !== r.y && i < (r.next.x - r.x) * (a - r.y) / (r.next.y - r.y) + r.x && (n = !n), r = r.next;
        } while (r !== t);

        return n;
      }(t, e);
    }

    function oo(t, e, r) {
      return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y);
    }

    function so(t, e) {
      return t.x === e.x && t.y === e.y;
    }

    function uo(t, e, r, n) {
      return !!(so(t, e) && so(r, n) || so(t, n) && so(r, e)) || oo(t, e, r) > 0 != oo(t, e, n) > 0 && oo(r, n, t) > 0 != oo(r, n, e) > 0;
    }

    function lo(t, e) {
      return oo(t.prev, t, t.next) < 0 ? oo(t, e, t.next) >= 0 && oo(t, t.prev, e) >= 0 : oo(t, e, t.prev) < 0 || oo(t, t.next, e) < 0;
    }

    function po(t, e) {
      var r = new fo(t.i, t.x, t.y),
          n = new fo(e.i, e.x, e.y),
          i = t.next,
          a = e.prev;
      return t.next = e, e.prev = t, r.next = i, i.prev = r, n.next = r, r.prev = n, a.next = n, n.prev = a, n;
    }

    function co(t, e, r, n) {
      var i = new fo(t, e, r);
      return n ? (i.next = n.next, i.prev = n, n.next.prev = i, n.next = i) : (i.prev = i, i.next = i), i;
    }

    function ho(t) {
      t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ);
    }

    function fo(t, e, r) {
      this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1;
    }

    function yo(t, e, r, n) {
      for (var i = 0, a = e, o = r - n; a < r; a += n) {
        i += (t[o] - t[a]) * (t[a + 1] + t[o + 1]), o = a;
      }

      return i;
    }

    function mo(t, e, r, n, i) {
      !function t(e, r, n, i, a) {
        for (; i > n;) {
          if (i - n > 600) {
            var o = i - n + 1,
                s = r - n + 1,
                u = Math.log(o),
                l = .5 * Math.exp(2 * u / 3),
                p = .5 * Math.sqrt(u * l * (o - l) / o) * (s - o / 2 < 0 ? -1 : 1),
                c = Math.max(n, Math.floor(r - s * l / o + p)),
                h = Math.min(i, Math.floor(r + (o - s) * l / o + p));
            t(e, r, c, h, a);
          }

          var f = e[r],
              y = n,
              d = i;

          for (vo(e, n, r), a(e[i], f) > 0 && vo(e, n, i); y < d;) {
            for (vo(e, y, d), y++, d--; a(e[y], f) < 0;) {
              y++;
            }

            for (; a(e[d], f) > 0;) {
              d--;
            }
          }

          0 === a(e[n], f) ? vo(e, n, d) : vo(e, ++d, i), d <= r && (n = d + 1), r <= d && (i = d - 1);
        }
      }(t, e, r || 0, n || t.length - 1, i || go);
    }

    function vo(t, e, r) {
      var n = t[e];
      t[e] = t[r], t[r] = n;
    }

    function go(t, e) {
      return t < e ? -1 : t > e ? 1 : 0;
    }

    function xo(t, e) {
      var r = t.length;
      if (r <= 1) return [t];

      for (var n, i, a = [], o = 0; o < r; o++) {
        var s = k(t[o]);
        0 !== s && (t[o].area = Math.abs(s), void 0 === i && (i = s < 0), i === s < 0 ? (n && a.push(n), n = [t[o]]) : n.push(t[o]));
      }

      if (n && a.push(n), e > 1) for (var u = 0; u < a.length; u++) {
        a[u].length <= e || (mo(a[u], e, 1, a[u].length - 1, bo), a[u] = a[u].slice(0, e));
      }
      return a;
    }

    function bo(t, e) {
      return e.area - t.area;
    }

    function _o(t, e, r) {
      for (var n = r.patternDependencies, i = !1, a = 0, o = e; a < o.length; a += 1) {
        var s = o[a].paint.get(t + "-pattern");
        s.isConstant() || (i = !0);
        var u = s.constantOr(null);
        u && (i = !0, n[u.to] = !0, n[u.from] = !0);
      }

      return i;
    }

    function wo(t, e, r, n, i) {
      for (var a = i.patternDependencies, o = 0, s = e; o < s.length; o += 1) {
        var u = s[o],
            l = u.paint.get(t + "-pattern").value;

        if ("constant" !== l.kind) {
          var p = l.evaluate({
            zoom: n - 1
          }, r, {}),
              c = l.evaluate({
            zoom: n
          }, r, {}),
              h = l.evaluate({
            zoom: n + 1
          }, r, {});
          a[p] = !0, a[c] = !0, a[h] = !0, r.patterns[u.id] = {
            min: p,
            mid: c,
            max: h
          };
        }
      }

      return r;
    }

    Ga.deviation = function (t, e, r, n) {
      var i = e && e.length,
          a = i ? e[0] * r : t.length,
          o = Math.abs(yo(t, 0, a, r));
      if (i) for (var s = 0, u = e.length; s < u; s++) {
        var l = e[s] * r,
            p = s < u - 1 ? e[s + 1] * r : t.length;
        o -= Math.abs(yo(t, l, p, r));
      }
      var c = 0;

      for (s = 0; s < n.length; s += 3) {
        var h = n[s] * r,
            f = n[s + 1] * r,
            y = n[s + 2] * r;
        c += Math.abs((t[h] - t[y]) * (t[f + 1] - t[h + 1]) - (t[h] - t[f]) * (t[y + 1] - t[h + 1]));
      }

      return 0 === o && 0 === c ? 0 : Math.abs((c - o) / o);
    }, Ga.flatten = function (t) {
      for (var e = t[0][0].length, r = {
        vertices: [],
        holes: [],
        dimensions: e
      }, n = 0, i = 0; i < t.length; i++) {
        for (var a = 0; a < t[i].length; a++) {
          for (var o = 0; o < e; o++) {
            r.vertices.push(t[i][a][o]);
          }
        }

        i > 0 && (n += t[i - 1].length, r.holes.push(n));
      }

      return r;
    }, Ka.default = Za;

    var Ao = function (t) {
      this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function (t) {
        return t.id;
      }), this.index = t.index, this.hasPattern = !1, this.patternFeatures = [], this.layoutVertexArray = new ei(), this.indexArray = new vi(), this.indexArray2 = new gi(), this.programConfigurations = new ea(Na, t.layers, t.zoom), this.segments = new Fi(), this.segments2 = new Fi(), this.stateDependentLayerIds = this.layers.filter(function (t) {
        return t.isStateDependent();
      }).map(function (t) {
        return t.id;
      });
    };

    Ao.prototype.populate = function (t, e) {
      this.hasPattern = _o("fill", this.layers, e);

      for (var r = this.layers[0].layout.get("fill-sort-key"), n = [], i = 0, a = t; i < a.length; i += 1) {
        var o = a[i],
            s = o.feature,
            u = o.index,
            l = o.sourceLayerIndex;

        if (this.layers[0]._featureFilter(new Vn(this.zoom), s)) {
          var p = sa(s),
              c = r ? r.evaluate(s, {}) : void 0,
              h = {
            id: s.id,
            properties: s.properties,
            type: s.type,
            sourceLayerIndex: l,
            index: u,
            geometry: p,
            patterns: {},
            sortKey: c
          };
          n.push(h);
        }
      }

      r && n.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });

      for (var f = 0, y = n; f < y.length; f += 1) {
        var d = y[f],
            m = d,
            v = m.geometry,
            g = m.index,
            x = m.sourceLayerIndex;

        if (this.hasPattern) {
          var b = wo("fill", this.layers, d, this.zoom, e);
          this.patternFeatures.push(b);
        } else this.addFeature(d, v, g, {});

        var _ = t[g].feature;
        e.featureIndex.insert(_, v, g, x, this.index);
      }
    }, Ao.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers, r);
    }, Ao.prototype.addFeatures = function (t, e) {
      for (var r = 0, n = this.patternFeatures; r < n.length; r += 1) {
        var i = n[r];
        this.addFeature(i, i.geometry, i.index, e);
      }
    }, Ao.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }, Ao.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }, Ao.prototype.upload = function (t) {
      this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Na), this.indexBuffer = t.createIndexBuffer(this.indexArray), this.indexBuffer2 = t.createIndexBuffer(this.indexArray2)), this.programConfigurations.upload(t), this.uploaded = !0;
    }, Ao.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.indexBuffer2.destroy(), this.programConfigurations.destroy(), this.segments.destroy(), this.segments2.destroy());
    }, Ao.prototype.addFeature = function (t, e, r, n) {
      for (var i = 0, a = xo(e, 500); i < a.length; i += 1) {
        for (var o = a[i], s = 0, u = 0, l = o; u < l.length; u += 1) {
          s += l[u].length;
        }

        for (var p = this.segments.prepareSegment(s, this.layoutVertexArray, this.indexArray), c = p.vertexLength, h = [], f = [], y = 0, d = o; y < d.length; y += 1) {
          var m = d[y];

          if (0 !== m.length) {
            m !== o[0] && f.push(h.length / 2);
            var v = this.segments2.prepareSegment(m.length, this.layoutVertexArray, this.indexArray2),
                g = v.vertexLength;
            this.layoutVertexArray.emplaceBack(m[0].x, m[0].y), this.indexArray2.emplaceBack(g + m.length - 1, g), h.push(m[0].x), h.push(m[0].y);

            for (var x = 1; x < m.length; x++) {
              this.layoutVertexArray.emplaceBack(m[x].x, m[x].y), this.indexArray2.emplaceBack(g + x - 1, g + x), h.push(m[x].x), h.push(m[x].y);
            }

            v.vertexLength += m.length, v.primitiveLength += m.length;
          }
        }

        for (var b = Ka(h, f), _ = 0; _ < b.length; _ += 3) {
          this.indexArray.emplaceBack(c + b[_], c + b[_ + 1], c + b[_ + 2]);
        }

        p.vertexLength += s, p.primitiveLength += b.length / 3;
      }

      this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r, n);
    }, mn("FillBucket", Ao, {
      omit: ["layers", "patternFeatures"]
    });

    var ko = new Jn({
      "fill-sort-key": new Kn(zt.layout_fill["fill-sort-key"])
    }),
        So = {
      paint: new Jn({
        "fill-antialias": new Nn(zt.paint_fill["fill-antialias"]),
        "fill-opacity": new Kn(zt.paint_fill["fill-opacity"]),
        "fill-color": new Kn(zt.paint_fill["fill-color"]),
        "fill-outline-color": new Kn(zt.paint_fill["fill-outline-color"]),
        "fill-translate": new Nn(zt.paint_fill["fill-translate"]),
        "fill-translate-anchor": new Nn(zt.paint_fill["fill-translate-anchor"]),
        "fill-pattern": new Zn(zt.paint_fill["fill-pattern"])
      }),
      layout: ko
    },
        zo = function (t) {
      function e(e) {
        t.call(this, e, So);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.recalculate = function (e) {
        t.prototype.recalculate.call(this, e);
        var r = this.paint._values["fill-outline-color"];
        "constant" === r.value.kind && void 0 === r.value.value && (this.paint._values["fill-outline-color"] = this.paint._values["fill-color"]);
      }, e.prototype.createBucket = function (t) {
        return new Ao(t);
      }, e.prototype.queryRadius = function () {
        return wa(this.paint.get("fill-translate"));
      }, e.prototype.queryIntersectsFeature = function (t, e, r, n, i, a, o) {
        return ha(Aa(t, this.paint.get("fill-translate"), this.paint.get("fill-translate-anchor"), a.angle, o), n);
      }, e.prototype.isTileClipped = function () {
        return !0;
      }, e;
    }(Hn),
        Io = Qn([{
      name: "a_pos",
      components: 2,
      type: "Int16"
    }, {
      name: "a_normal_ed",
      components: 4,
      type: "Int16"
    }], 4).members,
        Bo = Co;

    function Co(t, e, r, n, i) {
      this.properties = {}, this.extent = r, this.type = 0, this._pbf = t, this._geometry = -1, this._keys = n, this._values = i, t.readFields(Eo, this, e);
    }

    function Eo(t, e, r) {
      1 == t ? e.id = r.readVarint() : 2 == t ? function (t, e) {
        var r = t.readVarint() + t.pos;

        for (; t.pos < r;) {
          var n = e._keys[t.readVarint()],
              i = e._values[t.readVarint()];

          e.properties[n] = i;
        }
      }(r, e) : 3 == t ? e.type = r.readVarint() : 4 == t && (e._geometry = r.pos);
    }

    function Mo(t) {
      for (var e, r, n = 0, i = 0, a = t.length, o = a - 1; i < a; o = i++) {
        e = t[i], n += ((r = t[o]).x - e.x) * (e.y + r.y);
      }

      return n;
    }

    Co.types = ["Unknown", "Point", "LineString", "Polygon"], Co.prototype.loadGeometry = function () {
      var t = this._pbf;
      t.pos = this._geometry;

      for (var e, r = t.readVarint() + t.pos, n = 1, a = 0, o = 0, s = 0, u = []; t.pos < r;) {
        if (a <= 0) {
          var l = t.readVarint();
          n = 7 & l, a = l >> 3;
        }

        if (a--, 1 === n || 2 === n) o += t.readSVarint(), s += t.readSVarint(), 1 === n && (e && u.push(e), e = []), e.push(new i(o, s));else {
          if (7 !== n) throw new Error("unknown command " + n);
          e && e.push(e[0].clone());
        }
      }

      return e && u.push(e), u;
    }, Co.prototype.bbox = function () {
      var t = this._pbf;
      t.pos = this._geometry;

      for (var e = t.readVarint() + t.pos, r = 1, n = 0, i = 0, a = 0, o = 1 / 0, s = -1 / 0, u = 1 / 0, l = -1 / 0; t.pos < e;) {
        if (n <= 0) {
          var p = t.readVarint();
          r = 7 & p, n = p >> 3;
        }

        if (n--, 1 === r || 2 === r) (i += t.readSVarint()) < o && (o = i), i > s && (s = i), (a += t.readSVarint()) < u && (u = a), a > l && (l = a);else if (7 !== r) throw new Error("unknown command " + r);
      }

      return [o, u, s, l];
    }, Co.prototype.toGeoJSON = function (t, e, r) {
      var n,
          i,
          a = this.extent * Math.pow(2, r),
          o = this.extent * t,
          s = this.extent * e,
          u = this.loadGeometry(),
          l = Co.types[this.type];

      function p(t) {
        for (var e = 0; e < t.length; e++) {
          var r = t[e],
              n = 180 - 360 * (r.y + s) / a;
          t[e] = [360 * (r.x + o) / a - 180, 360 / Math.PI * Math.atan(Math.exp(n * Math.PI / 180)) - 90];
        }
      }

      switch (this.type) {
        case 1:
          var c = [];

          for (n = 0; n < u.length; n++) {
            c[n] = u[n][0];
          }

          p(u = c);
          break;

        case 2:
          for (n = 0; n < u.length; n++) {
            p(u[n]);
          }

          break;

        case 3:
          for (u = function (t) {
            var e = t.length;
            if (e <= 1) return [t];

            for (var r, n, i = [], a = 0; a < e; a++) {
              var o = Mo(t[a]);
              0 !== o && (void 0 === n && (n = o < 0), n === o < 0 ? (r && i.push(r), r = [t[a]]) : r.push(t[a]));
            }

            r && i.push(r);
            return i;
          }(u), n = 0; n < u.length; n++) {
            for (i = 0; i < u[n].length; i++) {
              p(u[n][i]);
            }
          }

      }

      1 === u.length ? u = u[0] : l = "Multi" + l;
      var h = {
        type: "Feature",
        geometry: {
          type: l,
          coordinates: u
        },
        properties: this.properties
      };
      return "id" in this && (h.id = this.id), h;
    };
    var To = Po;

    function Po(t, e) {
      this.version = 1, this.name = null, this.extent = 4096, this.length = 0, this._pbf = t, this._keys = [], this._values = [], this._features = [], t.readFields(Vo, this, e), this.length = this._features.length;
    }

    function Vo(t, e, r) {
      15 === t ? e.version = r.readVarint() : 1 === t ? e.name = r.readString() : 5 === t ? e.extent = r.readVarint() : 2 === t ? e._features.push(r.pos) : 3 === t ? e._keys.push(r.readString()) : 4 === t && e._values.push(function (t) {
        var e = null,
            r = t.readVarint() + t.pos;

        for (; t.pos < r;) {
          var n = t.readVarint() >> 3;
          e = 1 === n ? t.readString() : 2 === n ? t.readFloat() : 3 === n ? t.readDouble() : 4 === n ? t.readVarint64() : 5 === n ? t.readVarint() : 6 === n ? t.readSVarint() : 7 === n ? t.readBoolean() : null;
        }

        return e;
      }(r));
    }

    function Fo(t, e, r) {
      if (3 === t) {
        var n = new To(r, r.readVarint() + r.pos);
        n.length && (e[n.name] = n);
      }
    }

    Po.prototype.feature = function (t) {
      if (t < 0 || t >= this._features.length) throw new Error("feature index out of bounds");
      this._pbf.pos = this._features[t];

      var e = this._pbf.readVarint() + this._pbf.pos;

      return new Bo(this._pbf, e, this.extent, this._keys, this._values);
    };

    var Lo = {
      VectorTile: function (t, e) {
        this.layers = t.readFields(Fo, {}, e);
      },
      VectorTileFeature: Bo,
      VectorTileLayer: To
    },
        Do = Lo.VectorTileFeature.types,
        Oo = Math.pow(2, 13);

    function Ro(t, e, r, n, i, a, o, s) {
      t.emplaceBack(e, r, 2 * Math.floor(n * Oo) + o, i * Oo * 2, a * Oo * 2, Math.round(s));
    }

    var Uo = function (t) {
      this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function (t) {
        return t.id;
      }), this.index = t.index, this.hasPattern = !1, this.layoutVertexArray = new ni(), this.indexArray = new vi(), this.programConfigurations = new ea(Io, t.layers, t.zoom), this.segments = new Fi(), this.stateDependentLayerIds = this.layers.filter(function (t) {
        return t.isStateDependent();
      }).map(function (t) {
        return t.id;
      });
    };

    function jo(t, e) {
      return t.x === e.x && (t.x < 0 || t.x > ia) || t.y === e.y && (t.y < 0 || t.y > ia);
    }

    function qo(t) {
      return t.every(function (t) {
        return t.x < 0;
      }) || t.every(function (t) {
        return t.x > ia;
      }) || t.every(function (t) {
        return t.y < 0;
      }) || t.every(function (t) {
        return t.y > ia;
      });
    }

    Uo.prototype.populate = function (t, e) {
      this.features = [], this.hasPattern = _o("fill-extrusion", this.layers, e);

      for (var r = 0, n = t; r < n.length; r += 1) {
        var i = n[r],
            a = i.feature,
            o = i.index,
            s = i.sourceLayerIndex;

        if (this.layers[0]._featureFilter(new Vn(this.zoom), a)) {
          var u = sa(a),
              l = {
            sourceLayerIndex: s,
            index: o,
            geometry: u,
            properties: a.properties,
            type: a.type,
            patterns: {}
          };
          void 0 !== a.id && (l.id = a.id), this.hasPattern ? this.features.push(wo("fill-extrusion", this.layers, l, this.zoom, e)) : this.addFeature(l, u, o, {}), e.featureIndex.insert(a, u, o, s, this.index, !0);
        }
      }
    }, Uo.prototype.addFeatures = function (t, e) {
      for (var r = 0, n = this.features; r < n.length; r += 1) {
        var i = n[r],
            a = i.geometry;
        this.addFeature(i, a, i.index, e);
      }
    }, Uo.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers, r);
    }, Uo.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }, Uo.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }, Uo.prototype.upload = function (t) {
      this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Io), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
    }, Uo.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
    }, Uo.prototype.addFeature = function (t, e, r, n) {
      for (var i = 0, a = xo(e, 500); i < a.length; i += 1) {
        for (var o = a[i], s = 0, u = 0, l = o; u < l.length; u += 1) {
          s += l[u].length;
        }

        for (var p = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray), c = 0, h = o; c < h.length; c += 1) {
          var f = h[c];
          if (0 !== f.length && !qo(f)) for (var y = 0, d = 0; d < f.length; d++) {
            var m = f[d];

            if (d >= 1) {
              var v = f[d - 1];

              if (!jo(m, v)) {
                p.vertexLength + 4 > Fi.MAX_VERTEX_ARRAY_LENGTH && (p = this.segments.prepareSegment(4, this.layoutVertexArray, this.indexArray));

                var g = m.sub(v)._perp()._unit(),
                    x = v.dist(m);

                y + x > 32768 && (y = 0), Ro(this.layoutVertexArray, m.x, m.y, g.x, g.y, 0, 0, y), Ro(this.layoutVertexArray, m.x, m.y, g.x, g.y, 0, 1, y), y += x, Ro(this.layoutVertexArray, v.x, v.y, g.x, g.y, 0, 0, y), Ro(this.layoutVertexArray, v.x, v.y, g.x, g.y, 0, 1, y);
                var b = p.vertexLength;
                this.indexArray.emplaceBack(b, b + 2, b + 1), this.indexArray.emplaceBack(b + 1, b + 2, b + 3), p.vertexLength += 4, p.primitiveLength += 2;
              }
            }
          }
        }

        if (p.vertexLength + s > Fi.MAX_VERTEX_ARRAY_LENGTH && (p = this.segments.prepareSegment(s, this.layoutVertexArray, this.indexArray)), "Polygon" === Do[t.type]) {
          for (var _ = [], w = [], A = p.vertexLength, k = 0, S = o; k < S.length; k += 1) {
            var z = S[k];

            if (0 !== z.length) {
              z !== o[0] && w.push(_.length / 2);

              for (var I = 0; I < z.length; I++) {
                var B = z[I];
                Ro(this.layoutVertexArray, B.x, B.y, 0, 0, 1, 1, 0), _.push(B.x), _.push(B.y);
              }
            }
          }

          for (var C = Ka(_, w), E = 0; E < C.length; E += 3) {
            this.indexArray.emplaceBack(A + C[E], A + C[E + 2], A + C[E + 1]);
          }

          p.primitiveLength += C.length / 3, p.vertexLength += s;
        }
      }

      this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, t, r, n);
    }, mn("FillExtrusionBucket", Uo, {
      omit: ["layers", "features"]
    });

    var No = {
      paint: new Jn({
        "fill-extrusion-opacity": new Nn(zt["paint_fill-extrusion"]["fill-extrusion-opacity"]),
        "fill-extrusion-color": new Kn(zt["paint_fill-extrusion"]["fill-extrusion-color"]),
        "fill-extrusion-translate": new Nn(zt["paint_fill-extrusion"]["fill-extrusion-translate"]),
        "fill-extrusion-translate-anchor": new Nn(zt["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),
        "fill-extrusion-pattern": new Zn(zt["paint_fill-extrusion"]["fill-extrusion-pattern"]),
        "fill-extrusion-height": new Kn(zt["paint_fill-extrusion"]["fill-extrusion-height"]),
        "fill-extrusion-base": new Kn(zt["paint_fill-extrusion"]["fill-extrusion-base"]),
        "fill-extrusion-vertical-gradient": new Nn(zt["paint_fill-extrusion"]["fill-extrusion-vertical-gradient"])
      })
    },
        Ko = function (t) {
      function e(e) {
        t.call(this, e, No);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.createBucket = function (t) {
        return new Uo(t);
      }, e.prototype.queryRadius = function () {
        return wa(this.paint.get("fill-extrusion-translate"));
      }, e.prototype.is3D = function () {
        return !0;
      }, e.prototype.queryIntersectsFeature = function (t, e, r, n, a, o, s, u) {
        var l = Aa(t, this.paint.get("fill-extrusion-translate"), this.paint.get("fill-extrusion-translate-anchor"), o.angle, s),
            p = this.paint.get("fill-extrusion-height").evaluate(e, r),
            c = this.paint.get("fill-extrusion-base").evaluate(e, r),
            h = function (t, e, r, n) {
          for (var a = [], o = 0, s = t; o < s.length; o += 1) {
            var u = s[o],
                l = [u.x, u.y, n, 1];
            Ca(l, l, e), a.push(new i(l[0] / l[3], l[1] / l[3]));
          }

          return a;
        }(l, u, 0, 0),
            f = function (t, e, r, n) {
          for (var a = [], o = [], s = n[8] * e, u = n[9] * e, l = n[10] * e, p = n[11] * e, c = n[8] * r, h = n[9] * r, f = n[10] * r, y = n[11] * r, d = 0, m = t; d < m.length; d += 1) {
            for (var v = m[d], g = [], x = [], b = 0, _ = v; b < _.length; b += 1) {
              var w = _[b],
                  A = w.x,
                  k = w.y,
                  S = n[0] * A + n[4] * k + n[12],
                  z = n[1] * A + n[5] * k + n[13],
                  I = n[2] * A + n[6] * k + n[14],
                  B = n[3] * A + n[7] * k + n[15],
                  C = S + s,
                  E = z + u,
                  M = I + l,
                  T = B + p,
                  P = S + c,
                  V = z + h,
                  F = I + f,
                  L = B + y,
                  D = new i(C / T, E / T);
              D.z = M / T, g.push(D);
              var O = new i(P / L, V / L);
              O.z = F / L, x.push(O);
            }

            a.push(g), o.push(x);
          }

          return [a, o];
        }(n, c, p, u);

        return function (t, e, r) {
          var n = 1 / 0;
          ha(r, e) && (n = Go(r, e[0]));

          for (var i = 0; i < e.length; i++) {
            for (var a = e[i], o = t[i], s = 0; s < a.length - 1; s++) {
              var u = a[s],
                  l = a[s + 1],
                  p = o[s],
                  c = o[s + 1],
                  h = [u, l, c, p, u];
              pa(r, h) && (n = Math.min(n, Go(r, h)));
            }
          }

          return n !== 1 / 0 && n;
        }(f[0], f[1], h);
      }, e;
    }(Hn);

    function Zo(t, e) {
      return t.x * e.x + t.y * e.y;
    }

    function Go(t, e) {
      if (1 === t.length) {
        var r = e[0],
            n = e[1],
            i = e[3],
            a = t[0],
            o = n.sub(r),
            s = i.sub(r),
            u = a.sub(r),
            l = Zo(o, o),
            p = Zo(o, s),
            c = Zo(s, s),
            h = Zo(u, o),
            f = Zo(u, s),
            y = l * c - p * p,
            d = (c * h - p * f) / y,
            m = (l * f - p * h) / y,
            v = 1 - d - m;
        return r.z * v + n.z * d + i.z * m;
      }

      for (var g = 1 / 0, x = 0, b = e; x < b.length; x += 1) {
        var _ = b[x];
        g = Math.min(g, _.z);
      }

      return g;
    }

    var Xo = Qn([{
      name: "a_pos_normal",
      components: 2,
      type: "Int16"
    }, {
      name: "a_data",
      components: 4,
      type: "Uint8"
    }], 4).members,
        Jo = Lo.VectorTileFeature.types,
        Ho = 63,
        Yo = Math.cos(Math.PI / 180 * 37.5),
        $o = .5,
        Wo = Math.pow(2, 14) / $o;

    function Qo(t, e, r, n, i, a, o) {
      t.emplaceBack((e.x << 1) + (n ? 1 : 0), (e.y << 1) + (i ? 1 : 0), Math.round(Ho * r.x) + 128, Math.round(Ho * r.y) + 128, 1 + (0 === a ? 0 : a < 0 ? -1 : 1) | (o * $o & 63) << 2, o * $o >> 6);
    }

    var ts = function (t) {
      this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function (t) {
        return t.id;
      }), this.index = t.index, this.hasPattern = !1, this.patternFeatures = [], this.layoutVertexArray = new ii(), this.indexArray = new vi(), this.programConfigurations = new ea(Xo, t.layers, t.zoom), this.segments = new Fi(), this.stateDependentLayerIds = this.layers.filter(function (t) {
        return t.isStateDependent();
      }).map(function (t) {
        return t.id;
      });
    };

    function es(t, e) {
      return (t / e.tileTotal * (e.end - e.start) + e.start) * (Wo - 1);
    }

    ts.prototype.populate = function (t, e) {
      this.hasPattern = _o("line", this.layers, e);

      for (var r = this.layers[0].layout.get("line-sort-key"), n = [], i = 0, a = t; i < a.length; i += 1) {
        var o = a[i],
            s = o.feature,
            u = o.index,
            l = o.sourceLayerIndex;

        if (this.layers[0]._featureFilter(new Vn(this.zoom), s)) {
          var p = sa(s),
              c = r ? r.evaluate(s, {}) : void 0,
              h = {
            id: s.id,
            properties: s.properties,
            type: s.type,
            sourceLayerIndex: l,
            index: u,
            geometry: p,
            patterns: {},
            sortKey: c
          };
          n.push(h);
        }
      }

      r && n.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });

      for (var f = 0, y = n; f < y.length; f += 1) {
        var d = y[f],
            m = d,
            v = m.geometry,
            g = m.index,
            x = m.sourceLayerIndex;

        if (this.hasPattern) {
          var b = wo("line", this.layers, d, this.zoom, e);
          this.patternFeatures.push(b);
        } else this.addFeature(d, v, g, {});

        var _ = t[g].feature;
        e.featureIndex.insert(_, v, g, x, this.index);
      }
    }, ts.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length && this.programConfigurations.updatePaintArrays(t, e, this.stateDependentLayers, r);
    }, ts.prototype.addFeatures = function (t, e) {
      for (var r = 0, n = this.patternFeatures; r < n.length; r += 1) {
        var i = n[r];
        this.addFeature(i, i.geometry, i.index, e);
      }
    }, ts.prototype.isEmpty = function () {
      return 0 === this.layoutVertexArray.length;
    }, ts.prototype.uploadPending = function () {
      return !this.uploaded || this.programConfigurations.needsUpload;
    }, ts.prototype.upload = function (t) {
      this.uploaded || (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, Xo), this.indexBuffer = t.createIndexBuffer(this.indexArray)), this.programConfigurations.upload(t), this.uploaded = !0;
    }, ts.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy());
    }, ts.prototype.addFeature = function (t, e, r, n) {
      for (var i = this.layers[0].layout, a = i.get("line-join").evaluate(t, {}), o = i.get("line-cap"), s = i.get("line-miter-limit"), u = i.get("line-round-limit"), l = 0, p = e; l < p.length; l += 1) {
        var c = p[l];
        this.addLine(c, t, a, o, s, u, r, n);
      }
    }, ts.prototype.addLine = function (t, e, r, n, i, a, o, s) {
      var u = null;
      e.properties && e.properties.hasOwnProperty("mapbox_clip_start") && e.properties.hasOwnProperty("mapbox_clip_end") && (u = {
        start: e.properties.mapbox_clip_start,
        end: e.properties.mapbox_clip_end,
        tileTotal: void 0
      });

      for (var l = "Polygon" === Jo[e.type], p = t.length; p >= 2 && t[p - 1].equals(t[p - 2]);) {
        p--;
      }

      for (var c = 0; c < p - 1 && t[c].equals(t[c + 1]);) {
        c++;
      }

      if (!(p < (l ? 3 : 2))) {
        u && (u.tileTotal = function (t, e, r) {
          for (var n, i, a = 0, o = e; o < r - 1; o++) {
            n = t[o], i = t[o + 1], a += n.dist(i);
          }

          return a;
        }(t, c, p)), "bevel" === r && (i = 1.05);
        var h = ia / (512 * this.overscaling) * 15,
            f = t[c],
            y = this.segments.prepareSegment(10 * p, this.layoutVertexArray, this.indexArray);
        this.distance = 0;

        var d,
            m,
            v,
            g = n,
            x = l ? "butt" : n,
            b = !0,
            _ = void 0,
            w = void 0,
            A = void 0,
            k = void 0;

        this.e1 = this.e2 = this.e3 = -1, l && (d = t[p - 2], k = f.sub(d)._unit()._perp());

        for (var S = c; S < p; S++) {
          if (!(w = l && S === p - 1 ? t[c + 1] : t[S + 1]) || !t[S].equals(w)) {
            k && (A = k), d && (_ = d), d = t[S], k = w ? w.sub(d)._unit()._perp() : A;
            var z = (A = A || k).add(k);
            0 === z.x && 0 === z.y || z._unit();
            var I = z.x * k.x + z.y * k.y,
                B = 0 !== I ? 1 / I : 1 / 0,
                C = I < Yo && _ && w;

            if (C && S > c) {
              var E = d.dist(_);

              if (E > 2 * h) {
                var M = d.sub(d.sub(_)._mult(h / E)._round());
                this.distance += M.dist(_), this.addCurrentVertex(M, this.distance, A.mult(1), 0, 0, !1, y, u), _ = M;
              }
            }

            var T = _ && w,
                P = T ? r : w ? g : x;
            if (T && "round" === P && (B < a ? P = "miter" : B <= 2 && (P = "fakeround")), "miter" === P && B > i && (P = "bevel"), "bevel" === P && (B > 2 && (P = "flipbevel"), B < i && (P = "miter")), _ && (this.distance += d.dist(_)), "miter" === P) z._mult(B), this.addCurrentVertex(d, this.distance, z, 0, 0, !1, y, u);else if ("flipbevel" === P) {
              if (B > 100) z = k.clone().mult(-1);else {
                var V = A.x * k.y - A.y * k.x > 0 ? -1 : 1,
                    F = B * A.add(k).mag() / A.sub(k).mag();

                z._perp()._mult(F * V);
              }
              this.addCurrentVertex(d, this.distance, z, 0, 0, !1, y, u), this.addCurrentVertex(d, this.distance, z.mult(-1), 0, 0, !1, y, u);
            } else if ("bevel" === P || "fakeround" === P) {
              var L = A.x * k.y - A.y * k.x > 0,
                  D = -Math.sqrt(B * B - 1);

              if (L ? (v = 0, m = D) : (m = 0, v = D), b || this.addCurrentVertex(d, this.distance, A, m, v, !1, y, u), "fakeround" === P) {
                for (var O = Math.floor(8 * (.5 - (I - .5))), R = void 0, U = 0; U < O; U++) {
                  R = k.mult((U + 1) / (O + 1))._add(A)._unit(), this.addPieSliceVertex(d, this.distance, R, L, y, u);
                }

                this.addPieSliceVertex(d, this.distance, z, L, y, u);

                for (var j = O - 1; j >= 0; j--) {
                  R = A.mult((j + 1) / (O + 1))._add(k)._unit(), this.addPieSliceVertex(d, this.distance, R, L, y, u);
                }
              }

              w && this.addCurrentVertex(d, this.distance, k, -m, -v, !1, y, u);
            } else "butt" === P ? (b || this.addCurrentVertex(d, this.distance, A, 0, 0, !1, y, u), w && this.addCurrentVertex(d, this.distance, k, 0, 0, !1, y, u)) : "square" === P ? (b || (this.addCurrentVertex(d, this.distance, A, 1, 1, !1, y, u), this.e1 = this.e2 = -1), w && this.addCurrentVertex(d, this.distance, k, -1, -1, !1, y, u)) : "round" === P && (b || (this.addCurrentVertex(d, this.distance, A, 0, 0, !1, y, u), this.addCurrentVertex(d, this.distance, A, 1, 1, !0, y, u), this.e1 = this.e2 = -1), w && (this.addCurrentVertex(d, this.distance, k, -1, -1, !0, y, u), this.addCurrentVertex(d, this.distance, k, 0, 0, !1, y, u)));

            if (C && S < p - 1) {
              var q = d.dist(w);

              if (q > 2 * h) {
                var N = d.add(w.sub(d)._mult(h / q)._round());
                this.distance += N.dist(d), this.addCurrentVertex(N, this.distance, k.mult(1), 0, 0, !1, y, u), d = N;
              }
            }

            b = !1;
          }
        }

        this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length, e, o, s);
      }
    }, ts.prototype.addCurrentVertex = function (t, e, r, n, i, a, o, s) {
      var u,
          l = this.layoutVertexArray,
          p = this.indexArray;
      s && (e = es(e, s)), u = r.clone(), n && u._sub(r.perp()._mult(n)), Qo(l, t, u, a, !1, n, e), this.e3 = o.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (p.emplaceBack(this.e1, this.e2, this.e3), o.primitiveLength++), this.e1 = this.e2, this.e2 = this.e3, u = r.mult(-1), i && u._sub(r.perp()._mult(i)), Qo(l, t, u, a, !0, -i, e), this.e3 = o.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (p.emplaceBack(this.e1, this.e2, this.e3), o.primitiveLength++), this.e1 = this.e2, this.e2 = this.e3, e > Wo / 2 && !s && (this.distance = 0, this.addCurrentVertex(t, this.distance, r, n, i, a, o));
    }, ts.prototype.addPieSliceVertex = function (t, e, r, n, i, a) {
      r = r.mult(n ? -1 : 1);
      var o = this.layoutVertexArray,
          s = this.indexArray;
      a && (e = es(e, a)), Qo(o, t, r, !1, n, 0, e), this.e3 = i.vertexLength++, this.e1 >= 0 && this.e2 >= 0 && (s.emplaceBack(this.e1, this.e2, this.e3), i.primitiveLength++), n ? this.e2 = this.e3 : this.e1 = this.e3;
    }, mn("LineBucket", ts, {
      omit: ["layers", "patternFeatures"]
    });
    var rs = new Jn({
      "line-cap": new Nn(zt.layout_line["line-cap"]),
      "line-join": new Kn(zt.layout_line["line-join"]),
      "line-miter-limit": new Nn(zt.layout_line["line-miter-limit"]),
      "line-round-limit": new Nn(zt.layout_line["line-round-limit"]),
      "line-sort-key": new Kn(zt.layout_line["line-sort-key"])
    }),
        ns = {
      paint: new Jn({
        "line-opacity": new Kn(zt.paint_line["line-opacity"]),
        "line-color": new Kn(zt.paint_line["line-color"]),
        "line-translate": new Nn(zt.paint_line["line-translate"]),
        "line-translate-anchor": new Nn(zt.paint_line["line-translate-anchor"]),
        "line-width": new Kn(zt.paint_line["line-width"]),
        "line-gap-width": new Kn(zt.paint_line["line-gap-width"]),
        "line-offset": new Kn(zt.paint_line["line-offset"]),
        "line-blur": new Kn(zt.paint_line["line-blur"]),
        "line-dasharray": new Gn(zt.paint_line["line-dasharray"]),
        "line-pattern": new Zn(zt.paint_line["line-pattern"]),
        "line-gradient": new Xn(zt.paint_line["line-gradient"])
      }),
      layout: rs
    },
        is = new (function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.possiblyEvaluate = function (e, r) {
        return r = new Vn(Math.floor(r.zoom), {
          now: r.now,
          fadeDuration: r.fadeDuration,
          zoomHistory: r.zoomHistory,
          transition: r.transition
        }), t.prototype.possiblyEvaluate.call(this, e, r);
      }, e.prototype.evaluate = function (e, r, n, i) {
        return r = c({}, r, {
          zoom: Math.floor(r.zoom)
        }), t.prototype.evaluate.call(this, e, r, n, i);
      }, e;
    }(Kn))(ns.paint.properties["line-width"].specification);
    is.useIntegerZoom = !0;

    var as = function (t) {
      function e(e) {
        t.call(this, e, ns);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._handleSpecialPaintPropertyUpdate = function (t) {
        "line-gradient" === t && this._updateGradient();
      }, e.prototype._updateGradient = function () {
        var t = this._transitionablePaint._values["line-gradient"].value.expression;
        this.gradient = Ra(t, "lineProgress"), this.gradientTexture = null;
      }, e.prototype.recalculate = function (e) {
        t.prototype.recalculate.call(this, e), this.paint._values["line-floorwidth"] = is.possiblyEvaluate(this._transitioningPaint._values["line-width"].value, e);
      }, e.prototype.createBucket = function (t) {
        return new ts(t);
      }, e.prototype.queryRadius = function (t) {
        var e = t,
            r = os(_a("line-width", this, e), _a("line-gap-width", this, e)),
            n = _a("line-offset", this, e);

        return r / 2 + Math.abs(n) + wa(this.paint.get("line-translate"));
      }, e.prototype.queryIntersectsFeature = function (t, e, r, n, a, o, s) {
        var u = Aa(t, this.paint.get("line-translate"), this.paint.get("line-translate-anchor"), o.angle, s),
            l = s / 2 * os(this.paint.get("line-width").evaluate(e, r), this.paint.get("line-gap-width").evaluate(e, r)),
            p = this.paint.get("line-offset").evaluate(e, r);
        return p && (n = function (t, e) {
          for (var r = [], n = new i(0, 0), a = 0; a < t.length; a++) {
            for (var o = t[a], s = [], u = 0; u < o.length; u++) {
              var l = o[u - 1],
                  p = o[u],
                  c = o[u + 1],
                  h = 0 === u ? n : p.sub(l)._unit()._perp(),
                  f = u === o.length - 1 ? n : c.sub(p)._unit()._perp(),
                  y = h._add(f)._unit(),
                  d = y.x * f.x + y.y * f.y;

              y._mult(1 / d), s.push(y._mult(e)._add(p));
            }

            r.push(s);
          }

          return r;
        }(n, p * s)), function (t, e, r) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            if (t.length >= 3) for (var a = 0; a < i.length; a++) {
              if (xa(t, i[a])) return !0;
            }
            if (fa(t, i, r)) return !0;
          }

          return !1;
        }(u, n, l);
      }, e.prototype.isTileClipped = function () {
        return !0;
      }, e;
    }(Hn);

    function os(t, e) {
      return e > 0 ? e + 2 * t : t;
    }

    var ss = Qn([{
      name: "a_pos_offset",
      components: 4,
      type: "Int16"
    }, {
      name: "a_data",
      components: 4,
      type: "Uint16"
    }]),
        us = Qn([{
      name: "a_projected_pos",
      components: 3,
      type: "Float32"
    }], 4),
        ls = (Qn([{
      name: "a_fade_opacity",
      components: 1,
      type: "Uint32"
    }], 4), Qn([{
      name: "a_placed",
      components: 2,
      type: "Uint8"
    }, {
      name: "a_shift",
      components: 2,
      type: "Float32"
    }])),
        ps = (Qn([{
      type: "Int16",
      name: "anchorPointX"
    }, {
      type: "Int16",
      name: "anchorPointY"
    }, {
      type: "Int16",
      name: "x1"
    }, {
      type: "Int16",
      name: "y1"
    }, {
      type: "Int16",
      name: "x2"
    }, {
      type: "Int16",
      name: "y2"
    }, {
      type: "Uint32",
      name: "featureIndex"
    }, {
      type: "Uint16",
      name: "sourceLayerIndex"
    }, {
      type: "Uint16",
      name: "bucketIndex"
    }, {
      type: "Int16",
      name: "radius"
    }, {
      type: "Int16",
      name: "signedDistanceFromAnchor"
    }]), Qn([{
      name: "a_pos",
      components: 2,
      type: "Int16"
    }, {
      name: "a_anchor_pos",
      components: 2,
      type: "Int16"
    }, {
      name: "a_extrude",
      components: 2,
      type: "Int16"
    }], 4)),
        cs = Qn([{
      name: "a_pos",
      components: 2,
      type: "Int16"
    }, {
      name: "a_anchor_pos",
      components: 2,
      type: "Int16"
    }, {
      name: "a_extrude",
      components: 2,
      type: "Int16"
    }], 4);
    Qn([{
      type: "Int16",
      name: "anchorX"
    }, {
      type: "Int16",
      name: "anchorY"
    }, {
      type: "Uint16",
      name: "glyphStartIndex"
    }, {
      type: "Uint16",
      name: "numGlyphs"
    }, {
      type: "Uint32",
      name: "vertexStartIndex"
    }, {
      type: "Uint32",
      name: "lineStartIndex"
    }, {
      type: "Uint32",
      name: "lineLength"
    }, {
      type: "Uint16",
      name: "segment"
    }, {
      type: "Uint16",
      name: "lowerSize"
    }, {
      type: "Uint16",
      name: "upperSize"
    }, {
      type: "Float32",
      name: "lineOffsetX"
    }, {
      type: "Float32",
      name: "lineOffsetY"
    }, {
      type: "Uint8",
      name: "writingMode"
    }, {
      type: "Uint8",
      name: "hidden"
    }, {
      type: "Uint32",
      name: "crossTileID"
    }]), Qn([{
      type: "Int16",
      name: "anchorX"
    }, {
      type: "Int16",
      name: "anchorY"
    }, {
      type: "Int16",
      name: "rightJustifiedTextSymbolIndex"
    }, {
      type: "Int16",
      name: "centerJustifiedTextSymbolIndex"
    }, {
      type: "Int16",
      name: "leftJustifiedTextSymbolIndex"
    }, {
      type: "Int16",
      name: "verticalPlacedTextSymbolIndex"
    }, {
      type: "Uint16",
      name: "key"
    }, {
      type: "Uint16",
      name: "textBoxStartIndex"
    }, {
      type: "Uint16",
      name: "textBoxEndIndex"
    }, {
      type: "Uint16",
      name: "iconBoxStartIndex"
    }, {
      type: "Uint16",
      name: "iconBoxEndIndex"
    }, {
      type: "Uint16",
      name: "featureIndex"
    }, {
      type: "Uint16",
      name: "numHorizontalGlyphVertices"
    }, {
      type: "Uint16",
      name: "numVerticalGlyphVertices"
    }, {
      type: "Uint16",
      name: "numIconVertices"
    }, {
      type: "Uint32",
      name: "crossTileID"
    }, {
      type: "Float32",
      name: "textBoxScale"
    }, {
      type: "Float32",
      name: "radialTextOffset"
    }]), Qn([{
      type: "Float32",
      name: "offsetX"
    }]), Qn([{
      type: "Int16",
      name: "x"
    }, {
      type: "Int16",
      name: "y"
    }, {
      type: "Int16",
      name: "tileUnitDistanceFromAnchor"
    }]);

    function hs(t, e, r) {
      return t.sections.forEach(function (t) {
        t.text = function (t, e, r) {
          var n = e.layout.get("text-transform").evaluate(r, {});
          return "uppercase" === n ? t = t.toLocaleUpperCase() : "lowercase" === n && (t = t.toLocaleLowerCase()), Pn.applyArabicShaping && (t = Pn.applyArabicShaping(t)), t;
        }(t.text, e, r);
      }), t;
    }

    var fs = {
      "!": "︕",
      "#": "＃",
      $: "＄",
      "%": "％",
      "&": "＆",
      "(": "︵",
      ")": "︶",
      "*": "＊",
      "+": "＋",
      ",": "︐",
      "-": "︲",
      ".": "・",
      "/": "／",
      ":": "︓",
      ";": "︔",
      "<": "︿",
      "=": "＝",
      ">": "﹀",
      "?": "︖",
      "@": "＠",
      "[": "﹇",
      "\\": "＼",
      "]": "﹈",
      "^": "＾",
      _: "︳",
      "`": "｀",
      "{": "︷",
      "|": "―",
      "}": "︸",
      "~": "～",
      "¢": "￠",
      "£": "￡",
      "¥": "￥",
      "¦": "￤",
      "¬": "￢",
      "¯": "￣",
      "–": "︲",
      "—": "︱",
      "‘": "﹃",
      "’": "﹄",
      "“": "﹁",
      "”": "﹂",
      "…": "︙",
      "‧": "・",
      "₩": "￦",
      "、": "︑",
      "。": "︒",
      "〈": "︿",
      "〉": "﹀",
      "《": "︽",
      "》": "︾",
      "「": "﹁",
      "」": "﹂",
      "『": "﹃",
      "』": "﹄",
      "【": "︻",
      "】": "︼",
      "〔": "︹",
      "〕": "︺",
      "〖": "︗",
      "〗": "︘",
      "！": "︕",
      "（": "︵",
      "）": "︶",
      "，": "︐",
      "－": "︲",
      "．": "・",
      "：": "︓",
      "；": "︔",
      "＜": "︿",
      "＞": "﹀",
      "？": "︖",
      "［": "﹇",
      "］": "﹈",
      "＿": "︳",
      "｛": "︷",
      "｜": "―",
      "｝": "︸",
      "｟": "︵",
      "｠": "︶",
      "｡": "︒",
      "｢": "﹁",
      "｣": "﹂"
    };

    var ys = function (t) {
      function e(e, r, n, i) {
        t.call(this, e, r), this.angle = n, void 0 !== i && (this.segment = i);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.clone = function () {
        return new e(this.x, this.y, this.angle, this.segment);
      }, e;
    }(i);

    mn("Anchor", ys);
    var ds = 256;

    function ms(t, e) {
      var r = e.expression;
      if ("constant" === r.kind) return {
        kind: "constant",
        layoutSize: r.evaluate(new Vn(t + 1))
      };
      if ("source" === r.kind) return {
        kind: "source"
      };

      for (var n = r.zoomStops, i = r.interpolationType, a = 0; a < n.length && n[a] <= t;) {
        a++;
      }

      for (var o = a = Math.max(0, a - 1); o < n.length && n[o] < t + 1;) {
        o++;
      }

      o = Math.min(n.length - 1, o);
      var s = n[a],
          u = n[o];
      return "composite" === r.kind ? {
        kind: "composite",
        minZoom: s,
        maxZoom: u,
        interpolationType: i
      } : {
        kind: "camera",
        minZoom: s,
        maxZoom: u,
        minSize: r.evaluate(new Vn(s)),
        maxSize: r.evaluate(new Vn(u)),
        interpolationType: i
      };
    }

    function vs(t, e, r) {
      var n = e.uSize,
          i = e.uSizeT,
          a = r.lowerSize,
          o = r.upperSize;
      return "source" === t.kind ? a / ds : "composite" === t.kind ? be(a / ds, o / ds, i) : n;
    }

    function gs(t, e) {
      var r = 0,
          n = 0;
      if ("constant" === t.kind) n = t.layoutSize;else if ("source" !== t.kind) {
        var i = t.interpolationType,
            a = t.minZoom,
            o = t.maxZoom,
            s = i ? l(je.interpolationFactor(i, e, a, o), 0, 1) : 0;
        "camera" === t.kind ? n = be(t.minSize, t.maxSize, s) : r = s;
      }
      return {
        uSizeT: r,
        uSize: n
      };
    }

    var xs = Object.freeze({
      getSizeData: ms,
      evaluateSizeForFeature: vs,
      evaluateSizeForZoom: gs,
      SIZE_PACK_FACTOR: ds
    }),
        bs = Lo.VectorTileFeature.types,
        _s = [{
      name: "a_fade_opacity",
      components: 1,
      type: "Uint8",
      offset: 0
    }];

    function ws(t, e, r, n, i, a, o, s) {
      t.emplaceBack(e, r, Math.round(32 * n), Math.round(32 * i), a, o, s ? s[0] : 0, s ? s[1] : 0);
    }

    function As(t, e, r) {
      t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r), t.emplaceBack(e.x, e.y, r);
    }

    var ks = function (t) {
      this.layoutVertexArray = new oi(), this.indexArray = new vi(), this.programConfigurations = t, this.segments = new Fi(), this.dynamicLayoutVertexArray = new si(), this.opacityVertexArray = new ui(), this.placedSymbolArray = new Si();
    };

    ks.prototype.upload = function (t, e, r, n) {
      r && (this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, ss.members), this.indexBuffer = t.createIndexBuffer(this.indexArray, e), this.dynamicLayoutVertexBuffer = t.createVertexBuffer(this.dynamicLayoutVertexArray, us.members, !0), this.opacityVertexBuffer = t.createVertexBuffer(this.opacityVertexArray, _s, !0), this.opacityVertexBuffer.itemSize = 1), (r || n) && this.programConfigurations.upload(t);
    }, ks.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.programConfigurations.destroy(), this.segments.destroy(), this.dynamicLayoutVertexBuffer.destroy(), this.opacityVertexBuffer.destroy());
    }, mn("SymbolBuffers", ks);

    var Ss = function (t, e, r) {
      this.layoutVertexArray = new t(), this.layoutAttributes = e, this.indexArray = new r(), this.segments = new Fi(), this.collisionVertexArray = new ci();
    };

    Ss.prototype.upload = function (t) {
      this.layoutVertexBuffer = t.createVertexBuffer(this.layoutVertexArray, this.layoutAttributes), this.indexBuffer = t.createIndexBuffer(this.indexArray), this.collisionVertexBuffer = t.createVertexBuffer(this.collisionVertexArray, ls.members, !0);
    }, Ss.prototype.destroy = function () {
      this.layoutVertexBuffer && (this.layoutVertexBuffer.destroy(), this.indexBuffer.destroy(), this.segments.destroy(), this.collisionVertexBuffer.destroy());
    }, mn("CollisionBuffers", Ss);

    var zs = function (t) {
      this.collisionBoxArray = t.collisionBoxArray, this.zoom = t.zoom, this.overscaling = t.overscaling, this.layers = t.layers, this.layerIds = this.layers.map(function (t) {
        return t.id;
      }), this.index = t.index, this.pixelRatio = t.pixelRatio, this.sourceLayerIndex = t.sourceLayerIndex, this.hasPattern = !1;
      var e = this.layers[0]._unevaluatedLayout._values;
      this.textSizeData = ms(this.zoom, e["text-size"]), this.iconSizeData = ms(this.zoom, e["icon-size"]);
      var r = this.layers[0].layout,
          n = r.get("symbol-sort-key"),
          i = r.get("symbol-z-order");
      this.sortFeaturesByKey = "viewport-y" !== i && void 0 !== n.constantOr(1);
      var a = "viewport-y" === i || "auto" === i && !this.sortFeaturesByKey;
      this.sortFeaturesByY = a && (r.get("text-allow-overlap") || r.get("icon-allow-overlap") || r.get("text-ignore-placement") || r.get("icon-ignore-placement")), this.stateDependentLayerIds = this.layers.filter(function (t) {
        return t.isStateDependent();
      }).map(function (t) {
        return t.id;
      }), this.sourceID = t.sourceID;
    };

    zs.prototype.createArrays = function () {
      this.text = new ks(new ea(ss.members, this.layers, this.zoom, function (t) {
        return /^text/.test(t);
      })), this.icon = new ks(new ea(ss.members, this.layers, this.zoom, function (t) {
        return /^icon/.test(t);
      })), this.collisionBox = new Ss(pi, ps.members, gi), this.collisionCircle = new Ss(pi, cs.members, vi), this.glyphOffsetArray = new Ci(), this.lineVertexArray = new Mi(), this.symbolInstances = new Ii();
    }, zs.prototype.calculateGlyphDependencies = function (t, e, r, n) {
      for (var i = 0; i < t.length; i++) {
        if (e[t.charCodeAt(i)] = !0, r && n) {
          var a = fs[t.charAt(i)];
          a && (e[a.charCodeAt(0)] = !0);
        }
      }
    }, zs.prototype.populate = function (t, e) {
      var r = this.layers[0],
          n = r.layout,
          i = n.get("text-font"),
          a = n.get("text-field"),
          o = n.get("icon-image"),
          s = ("constant" !== a.value.kind || a.value.value.toString().length > 0) && ("constant" !== i.value.kind || i.value.value.length > 0),
          u = "constant" !== o.value.kind || o.value.value && o.value.value.length > 0,
          l = n.get("symbol-sort-key");

      if (this.features = [], s || u) {
        for (var p = e.iconDependencies, c = e.glyphDependencies, h = new Vn(this.zoom), f = 0, y = t; f < y.length; f += 1) {
          var d = y[f],
              m = d.feature,
              v = d.index,
              g = d.sourceLayerIndex;

          if (r._featureFilter(h, m)) {
            var x = void 0;

            if (s) {
              var b = r.getValueAndResolveTokens("text-field", m);
              x = hs(b instanceof Wt ? b : Wt.fromString(b), r, m);
            }

            var _ = void 0;

            if (u && (_ = r.getValueAndResolveTokens("icon-image", m)), x || _) {
              var w = this.sortFeaturesByKey ? l.evaluate(m, {}) : void 0,
                  A = {
                text: x,
                icon: _,
                index: v,
                sourceLayerIndex: g,
                geometry: sa(m),
                properties: m.properties,
                type: bs[m.type],
                sortKey: w
              };
              if (void 0 !== m.id && (A.id = m.id), this.features.push(A), _ && (p[_] = !0), x) for (var k = i.evaluate(m, {}).join(","), S = "map" === n.get("text-rotation-alignment") && "point" !== n.get("symbol-placement"), z = 0, I = x.sections; z < I.length; z += 1) {
                var B = I[z],
                    C = wn(x.toString()),
                    E = B.fontStack || k,
                    M = c[E] = c[E] || {};
                this.calculateGlyphDependencies(B.text, M, S, C);
              }
            }
          }
        }

        "line" === n.get("symbol-placement") && (this.features = function (t) {
          var e = {},
              r = {},
              n = [],
              i = 0;

          function a(e) {
            n.push(t[e]), i++;
          }

          function o(t, e, i) {
            var a = r[t];
            return delete r[t], r[e] = a, n[a].geometry[0].pop(), n[a].geometry[0] = n[a].geometry[0].concat(i[0]), a;
          }

          function s(t, r, i) {
            var a = e[r];
            return delete e[r], e[t] = a, n[a].geometry[0].shift(), n[a].geometry[0] = i[0].concat(n[a].geometry[0]), a;
          }

          function u(t, e, r) {
            var n = r ? e[0][e[0].length - 1] : e[0][0];
            return t + ":" + n.x + ":" + n.y;
          }

          for (var l = 0; l < t.length; l++) {
            var p = t[l],
                c = p.geometry,
                h = p.text ? p.text.toString() : null;

            if (h) {
              var f = u(h, c),
                  y = u(h, c, !0);

              if (f in r && y in e && r[f] !== e[y]) {
                var d = s(f, y, c),
                    m = o(f, y, n[d].geometry);
                delete e[f], delete r[y], r[u(h, n[m].geometry, !0)] = m, n[d].geometry = null;
              } else f in r ? o(f, y, c) : y in e ? s(f, y, c) : (a(l), e[f] = i - 1, r[y] = i - 1);
            } else a(l);
          }

          return n.filter(function (t) {
            return t.geometry;
          });
        }(this.features)), this.sortFeaturesByKey && this.features.sort(function (t, e) {
          return t.sortKey - e.sortKey;
        });
      }
    }, zs.prototype.update = function (t, e, r) {
      this.stateDependentLayers.length && (this.text.programConfigurations.updatePaintArrays(t, e, this.layers, r), this.icon.programConfigurations.updatePaintArrays(t, e, this.layers, r));
    }, zs.prototype.isEmpty = function () {
      return 0 === this.symbolInstances.length;
    }, zs.prototype.uploadPending = function () {
      return !this.uploaded || this.text.programConfigurations.needsUpload || this.icon.programConfigurations.needsUpload;
    }, zs.prototype.upload = function (t) {
      this.uploaded || (this.collisionBox.upload(t), this.collisionCircle.upload(t)), this.text.upload(t, this.sortFeaturesByY, !this.uploaded, this.text.programConfigurations.needsUpload), this.icon.upload(t, this.sortFeaturesByY, !this.uploaded, this.icon.programConfigurations.needsUpload), this.uploaded = !0;
    }, zs.prototype.destroy = function () {
      this.text.destroy(), this.icon.destroy(), this.collisionBox.destroy(), this.collisionCircle.destroy();
    }, zs.prototype.addToLineVertexArray = function (t, e) {
      var r = this.lineVertexArray.length;

      if (void 0 !== t.segment) {
        for (var n = t.dist(e[t.segment + 1]), i = t.dist(e[t.segment]), a = {}, o = t.segment + 1; o < e.length; o++) {
          a[o] = {
            x: e[o].x,
            y: e[o].y,
            tileUnitDistanceFromAnchor: n
          }, o < e.length - 1 && (n += e[o + 1].dist(e[o]));
        }

        for (var s = t.segment || 0; s >= 0; s--) {
          a[s] = {
            x: e[s].x,
            y: e[s].y,
            tileUnitDistanceFromAnchor: i
          }, s > 0 && (i += e[s - 1].dist(e[s]));
        }

        for (var u = 0; u < e.length; u++) {
          var l = a[u];
          this.lineVertexArray.emplaceBack(l.x, l.y, l.tileUnitDistanceFromAnchor);
        }
      }

      return {
        lineStartIndex: r,
        lineLength: this.lineVertexArray.length - r
      };
    }, zs.prototype.addSymbols = function (t, e, r, n, i, a, o, s, u, l) {
      for (var p = t.indexArray, c = t.layoutVertexArray, h = t.dynamicLayoutVertexArray, f = t.segments.prepareSegment(4 * e.length, t.layoutVertexArray, t.indexArray, a.sortKey), y = this.glyphOffsetArray.length, d = f.vertexLength, m = 0, v = e; m < v.length; m += 1) {
        var g = v[m],
            x = g.tl,
            b = g.tr,
            _ = g.bl,
            w = g.br,
            A = g.tex,
            k = f.vertexLength,
            S = g.glyphOffset[1];
        ws(c, s.x, s.y, x.x, S + x.y, A.x, A.y, r), ws(c, s.x, s.y, b.x, S + b.y, A.x + A.w, A.y, r), ws(c, s.x, s.y, _.x, S + _.y, A.x, A.y + A.h, r), ws(c, s.x, s.y, w.x, S + w.y, A.x + A.w, A.y + A.h, r), As(h, s, 0), p.emplaceBack(k, k + 1, k + 2), p.emplaceBack(k + 1, k + 2, k + 3), f.vertexLength += 4, f.primitiveLength += 2, this.glyphOffsetArray.emplaceBack(g.glyphOffset[0]);
      }

      t.placedSymbolArray.emplaceBack(s.x, s.y, y, this.glyphOffsetArray.length - y, d, u, l, s.segment, r ? r[0] : 0, r ? r[1] : 0, n[0], n[1], o, !1, 0), t.programConfigurations.populatePaintArrays(t.layoutVertexArray.length, a, a.index, {});
    }, zs.prototype._addCollisionDebugVertex = function (t, e, r, n, i, a) {
      return e.emplaceBack(0, 0), t.emplaceBack(r.x, r.y, n, i, Math.round(a.x), Math.round(a.y));
    }, zs.prototype.addCollisionDebugVertices = function (t, e, r, n, a, o, s, u) {
      var l = a.segments.prepareSegment(4, a.layoutVertexArray, a.indexArray),
          p = l.vertexLength,
          c = a.layoutVertexArray,
          h = a.collisionVertexArray,
          f = s.anchorX,
          y = s.anchorY;

      if (this._addCollisionDebugVertex(c, h, o, f, y, new i(t, e)), this._addCollisionDebugVertex(c, h, o, f, y, new i(r, e)), this._addCollisionDebugVertex(c, h, o, f, y, new i(r, n)), this._addCollisionDebugVertex(c, h, o, f, y, new i(t, n)), l.vertexLength += 4, u) {
        var d = a.indexArray;
        d.emplaceBack(p, p + 1, p + 2), d.emplaceBack(p, p + 2, p + 3), l.primitiveLength += 2;
      } else {
        var m = a.indexArray;
        m.emplaceBack(p, p + 1), m.emplaceBack(p + 1, p + 2), m.emplaceBack(p + 2, p + 3), m.emplaceBack(p + 3, p), l.primitiveLength += 4;
      }
    }, zs.prototype.addDebugCollisionBoxes = function (t, e, r) {
      for (var n = t; n < e; n++) {
        var i = this.collisionBoxArray.get(n),
            a = i.x1,
            o = i.y1,
            s = i.x2,
            u = i.y2,
            l = i.radius > 0;
        this.addCollisionDebugVertices(a, o, s, u, l ? this.collisionCircle : this.collisionBox, i.anchorPoint, r, l);
      }
    }, zs.prototype.generateCollisionDebugBuffers = function () {
      for (var t = 0; t < this.symbolInstances.length; t++) {
        var e = this.symbolInstances.get(t);
        this.addDebugCollisionBoxes(e.textBoxStartIndex, e.textBoxEndIndex, e), this.addDebugCollisionBoxes(e.iconBoxStartIndex, e.iconBoxEndIndex, e);
      }
    }, zs.prototype._deserializeCollisionBoxesForSymbol = function (t, e, r, n, i) {
      for (var a = {}, o = e; o < r; o++) {
        var s = t.get(o);

        if (0 === s.radius) {
          a.textBox = {
            x1: s.x1,
            y1: s.y1,
            x2: s.x2,
            y2: s.y2,
            anchorPointX: s.anchorPointX,
            anchorPointY: s.anchorPointY
          }, a.textFeatureIndex = s.featureIndex;
          break;
        }

        a.textCircles || (a.textCircles = [], a.textFeatureIndex = s.featureIndex);
        a.textCircles.push(s.anchorPointX, s.anchorPointY, s.radius, s.signedDistanceFromAnchor, 1);
      }

      for (var u = n; u < i; u++) {
        var l = t.get(u);

        if (0 === l.radius) {
          a.iconBox = {
            x1: l.x1,
            y1: l.y1,
            x2: l.x2,
            y2: l.y2,
            anchorPointX: l.anchorPointX,
            anchorPointY: l.anchorPointY
          }, a.iconFeatureIndex = l.featureIndex;
          break;
        }
      }

      return a;
    }, zs.prototype.deserializeCollisionBoxes = function (t) {
      this.collisionArrays = [];

      for (var e = 0; e < this.symbolInstances.length; e++) {
        var r = this.symbolInstances.get(e);
        this.collisionArrays.push(this._deserializeCollisionBoxesForSymbol(t, r.textBoxStartIndex, r.textBoxEndIndex, r.iconBoxStartIndex, r.iconBoxEndIndex));
      }
    }, zs.prototype.hasTextData = function () {
      return this.text.segments.get().length > 0;
    }, zs.prototype.hasIconData = function () {
      return this.icon.segments.get().length > 0;
    }, zs.prototype.hasCollisionBoxData = function () {
      return this.collisionBox.segments.get().length > 0;
    }, zs.prototype.hasCollisionCircleData = function () {
      return this.collisionCircle.segments.get().length > 0;
    }, zs.prototype.addIndicesForPlacedTextSymbol = function (t) {
      for (var e = this.text.placedSymbolArray.get(t), r = e.vertexStartIndex + 4 * e.numGlyphs, n = e.vertexStartIndex; n < r; n += 4) {
        this.text.indexArray.emplaceBack(n, n + 1, n + 2), this.text.indexArray.emplaceBack(n + 1, n + 2, n + 3);
      }
    }, zs.prototype.getSortedSymbolIndexes = function (t) {
      if (this.sortedAngle === t && void 0 !== this.symbolInstanceIndexes) return this.symbolInstanceIndexes;

      for (var e = Math.sin(t), r = Math.cos(t), n = [], i = [], a = [], o = 0; o < this.symbolInstances.length; ++o) {
        a.push(o);
        var s = this.symbolInstances.get(o);
        n.push(0 | Math.round(e * s.anchorX + r * s.anchorY)), i.push(s.featureIndex);
      }

      return a.sort(function (t, e) {
        return n[t] - n[e] || i[e] - i[t];
      }), a;
    }, zs.prototype.sortFeatures = function (t) {
      var e = this;

      if (this.sortFeaturesByY && this.sortedAngle !== t && !(this.text.segments.get().length > 1 || this.icon.segments.get().length > 1)) {
        this.symbolInstanceIndexes = this.getSortedSymbolIndexes(t), this.sortedAngle = t, this.text.indexArray.clear(), this.icon.indexArray.clear(), this.featureSortOrder = [];

        for (var r = 0, n = this.symbolInstanceIndexes; r < n.length; r += 1) {
          var i = n[r],
              a = this.symbolInstances.get(i);
          this.featureSortOrder.push(a.featureIndex), [a.rightJustifiedTextSymbolIndex, a.centerJustifiedTextSymbolIndex, a.leftJustifiedTextSymbolIndex].forEach(function (t, r, n) {
            t >= 0 && n.indexOf(t) === r && e.addIndicesForPlacedTextSymbol(t);
          }), a.verticalPlacedTextSymbolIndex >= 0 && this.addIndicesForPlacedTextSymbol(a.verticalPlacedTextSymbolIndex);
          var o = this.icon.placedSymbolArray.get(i);

          if (o.numGlyphs) {
            var s = o.vertexStartIndex;
            this.icon.indexArray.emplaceBack(s, s + 1, s + 2), this.icon.indexArray.emplaceBack(s + 1, s + 2, s + 3);
          }
        }

        this.text.indexBuffer && this.text.indexBuffer.updateData(this.text.indexArray), this.icon.indexBuffer && this.icon.indexBuffer.updateData(this.icon.indexArray);
      }
    }, mn("SymbolBucket", zs, {
      omit: ["layers", "collisionBoxArray", "features", "compareText"]
    }), zs.MAX_GLYPHS = 65535, zs.addDynamicAttributes = As;

    var Is = new Jn({
      "symbol-placement": new Nn(zt.layout_symbol["symbol-placement"]),
      "symbol-spacing": new Nn(zt.layout_symbol["symbol-spacing"]),
      "symbol-avoid-edges": new Nn(zt.layout_symbol["symbol-avoid-edges"]),
      "symbol-sort-key": new Kn(zt.layout_symbol["symbol-sort-key"]),
      "symbol-z-order": new Nn(zt.layout_symbol["symbol-z-order"]),
      "icon-allow-overlap": new Nn(zt.layout_symbol["icon-allow-overlap"]),
      "icon-ignore-placement": new Nn(zt.layout_symbol["icon-ignore-placement"]),
      "icon-optional": new Nn(zt.layout_symbol["icon-optional"]),
      "icon-rotation-alignment": new Nn(zt.layout_symbol["icon-rotation-alignment"]),
      "icon-size": new Kn(zt.layout_symbol["icon-size"]),
      "icon-text-fit": new Nn(zt.layout_symbol["icon-text-fit"]),
      "icon-text-fit-padding": new Nn(zt.layout_symbol["icon-text-fit-padding"]),
      "icon-image": new Kn(zt.layout_symbol["icon-image"]),
      "icon-rotate": new Kn(zt.layout_symbol["icon-rotate"]),
      "icon-padding": new Nn(zt.layout_symbol["icon-padding"]),
      "icon-keep-upright": new Nn(zt.layout_symbol["icon-keep-upright"]),
      "icon-offset": new Kn(zt.layout_symbol["icon-offset"]),
      "icon-anchor": new Kn(zt.layout_symbol["icon-anchor"]),
      "icon-pitch-alignment": new Nn(zt.layout_symbol["icon-pitch-alignment"]),
      "text-pitch-alignment": new Nn(zt.layout_symbol["text-pitch-alignment"]),
      "text-rotation-alignment": new Nn(zt.layout_symbol["text-rotation-alignment"]),
      "text-field": new Kn(zt.layout_symbol["text-field"]),
      "text-font": new Kn(zt.layout_symbol["text-font"]),
      "text-size": new Kn(zt.layout_symbol["text-size"]),
      "text-max-width": new Kn(zt.layout_symbol["text-max-width"]),
      "text-line-height": new Nn(zt.layout_symbol["text-line-height"]),
      "text-letter-spacing": new Kn(zt.layout_symbol["text-letter-spacing"]),
      "text-justify": new Kn(zt.layout_symbol["text-justify"]),
      "text-radial-offset": new Kn(zt.layout_symbol["text-radial-offset"]),
      "text-variable-anchor": new Nn(zt.layout_symbol["text-variable-anchor"]),
      "text-anchor": new Kn(zt.layout_symbol["text-anchor"]),
      "text-max-angle": new Nn(zt.layout_symbol["text-max-angle"]),
      "text-rotate": new Kn(zt.layout_symbol["text-rotate"]),
      "text-padding": new Nn(zt.layout_symbol["text-padding"]),
      "text-keep-upright": new Nn(zt.layout_symbol["text-keep-upright"]),
      "text-transform": new Kn(zt.layout_symbol["text-transform"]),
      "text-offset": new Kn(zt.layout_symbol["text-offset"]),
      "text-allow-overlap": new Nn(zt.layout_symbol["text-allow-overlap"]),
      "text-ignore-placement": new Nn(zt.layout_symbol["text-ignore-placement"]),
      "text-optional": new Nn(zt.layout_symbol["text-optional"])
    }),
        Bs = {
      paint: new Jn({
        "icon-opacity": new Kn(zt.paint_symbol["icon-opacity"]),
        "icon-color": new Kn(zt.paint_symbol["icon-color"]),
        "icon-halo-color": new Kn(zt.paint_symbol["icon-halo-color"]),
        "icon-halo-width": new Kn(zt.paint_symbol["icon-halo-width"]),
        "icon-halo-blur": new Kn(zt.paint_symbol["icon-halo-blur"]),
        "icon-translate": new Nn(zt.paint_symbol["icon-translate"]),
        "icon-translate-anchor": new Nn(zt.paint_symbol["icon-translate-anchor"]),
        "text-opacity": new Kn(zt.paint_symbol["text-opacity"]),
        "text-color": new Kn(zt.paint_symbol["text-color"]),
        "text-halo-color": new Kn(zt.paint_symbol["text-halo-color"]),
        "text-halo-width": new Kn(zt.paint_symbol["text-halo-width"]),
        "text-halo-blur": new Kn(zt.paint_symbol["text-halo-blur"]),
        "text-translate": new Nn(zt.paint_symbol["text-translate"]),
        "text-translate-anchor": new Nn(zt.paint_symbol["text-translate-anchor"])
      }),
      layout: Is
    },
        Cs = function (t) {
      function e(e) {
        t.call(this, e, Bs);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.recalculate = function (e) {
        t.prototype.recalculate.call(this, e), "auto" === this.layout.get("icon-rotation-alignment") && ("point" !== this.layout.get("symbol-placement") ? this.layout._values["icon-rotation-alignment"] = "map" : this.layout._values["icon-rotation-alignment"] = "viewport"), "auto" === this.layout.get("text-rotation-alignment") && ("point" !== this.layout.get("symbol-placement") ? this.layout._values["text-rotation-alignment"] = "map" : this.layout._values["text-rotation-alignment"] = "viewport"), "auto" === this.layout.get("text-pitch-alignment") && (this.layout._values["text-pitch-alignment"] = this.layout.get("text-rotation-alignment")), "auto" === this.layout.get("icon-pitch-alignment") && (this.layout._values["icon-pitch-alignment"] = this.layout.get("icon-rotation-alignment"));
      }, e.prototype.getValueAndResolveTokens = function (t, e) {
        var r = this.layout.get(t).evaluate(e, {}),
            n = this._unevaluatedLayout._values[t];
        return n.isDataDriven() || kr(n.value) ? r : function (t, e) {
          return e.replace(/{([^{}]+)}/g, function (e, r) {
            return r in t ? String(t[r]) : "";
          });
        }(e.properties, r);
      }, e.prototype.createBucket = function (t) {
        return new zs(t);
      }, e.prototype.queryRadius = function () {
        return 0;
      }, e.prototype.queryIntersectsFeature = function () {
        return !1;
      }, e;
    }(Hn),
        Es = {
      paint: new Jn({
        "background-color": new Nn(zt.paint_background["background-color"]),
        "background-pattern": new Gn(zt.paint_background["background-pattern"]),
        "background-opacity": new Nn(zt.paint_background["background-opacity"])
      })
    },
        Ms = function (t) {
      function e(e) {
        t.call(this, e, Es);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Hn),
        Ts = {
      paint: new Jn({
        "raster-opacity": new Nn(zt.paint_raster["raster-opacity"]),
        "raster-hue-rotate": new Nn(zt.paint_raster["raster-hue-rotate"]),
        "raster-brightness-min": new Nn(zt.paint_raster["raster-brightness-min"]),
        "raster-brightness-max": new Nn(zt.paint_raster["raster-brightness-max"]),
        "raster-saturation": new Nn(zt.paint_raster["raster-saturation"]),
        "raster-contrast": new Nn(zt.paint_raster["raster-contrast"]),
        "raster-resampling": new Nn(zt.paint_raster["raster-resampling"]),
        "raster-fade-duration": new Nn(zt.paint_raster["raster-fade-duration"])
      })
    },
        Ps = function (t) {
      function e(e) {
        t.call(this, e, Ts);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e;
    }(Hn);

    var Vs = function (t) {
      function e(e) {
        t.call(this, e, {}), this.implementation = e;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.is3D = function () {
        return "3d" === this.implementation.renderingMode;
      }, e.prototype.hasOffscreenPass = function () {
        return void 0 !== this.implementation.prerender;
      }, e.prototype.recalculate = function () {}, e.prototype.updateTransitions = function () {}, e.prototype.hasTransition = function () {}, e.prototype.serialize = function () {}, e.prototype.onAdd = function (t) {
        this.implementation.onAdd && this.implementation.onAdd(t, t.painter.context.gl);
      }, e.prototype.onRemove = function (t) {
        this.implementation.onRemove && this.implementation.onRemove(t, t.painter.context.gl);
      }, e;
    }(Hn),
        Fs = {
      circle: Ea,
      heatmap: Ua,
      hillshade: qa,
      fill: zo,
      "fill-extrusion": Ko,
      line: as,
      symbol: Cs,
      background: Ms,
      raster: Ps
    };

    function Ls(t) {
      for (var e = 0, r = 0, n = 0, i = t; n < i.length; n += 1) {
        var a = i[n];
        e += a.w * a.h, r = Math.max(r, a.w);
      }

      t.sort(function (t, e) {
        return e.h - t.h;
      });

      for (var o = [{
        x: 0,
        y: 0,
        w: Math.max(Math.ceil(Math.sqrt(e / .95)), r),
        h: 1 / 0
      }], s = 0, u = 0, l = 0, p = t; l < p.length; l += 1) {
        for (var c = p[l], h = o.length - 1; h >= 0; h--) {
          var f = o[h];

          if (!(c.w > f.w || c.h > f.h)) {
            if (c.x = f.x, c.y = f.y, u = Math.max(u, c.y + c.h), s = Math.max(s, c.x + c.w), c.w === f.w && c.h === f.h) {
              var y = o.pop();
              h < o.length && (o[h] = y);
            } else c.h === f.h ? (f.x += c.w, f.w -= c.w) : c.w === f.w ? (f.y += c.h, f.h -= c.h) : (o.push({
              x: f.x + c.w,
              y: f.y,
              w: f.w - c.w,
              h: c.h
            }), f.y += c.h, f.h -= c.h);

            break;
          }
        }
      }

      return {
        w: s,
        h: u,
        fill: e / (s * u) || 0
      };
    }

    var Ds = function (t, e) {
      var r = e.pixelRatio,
          n = e.version;
      this.paddedRect = t, this.pixelRatio = r, this.version = n;
    },
        Os = {
      tl: {
        configurable: !0
      },
      br: {
        configurable: !0
      },
      tlbr: {
        configurable: !0
      },
      displaySize: {
        configurable: !0
      }
    };

    Os.tl.get = function () {
      return [this.paddedRect.x + 1, this.paddedRect.y + 1];
    }, Os.br.get = function () {
      return [this.paddedRect.x + this.paddedRect.w - 1, this.paddedRect.y + this.paddedRect.h - 1];
    }, Os.tlbr.get = function () {
      return this.tl.concat(this.br);
    }, Os.displaySize.get = function () {
      return [(this.paddedRect.w - 2) / this.pixelRatio, (this.paddedRect.h - 2) / this.pixelRatio];
    }, Object.defineProperties(Ds.prototype, Os);

    var Rs = function (t, e) {
      var r = {},
          n = {};
      this.haveRenderCallbacks = [];
      var i = [];
      this.addImages(t, r, i), this.addImages(e, n, i);
      var a = Ls(i),
          o = a.w,
          s = a.h,
          u = new Da({
        width: o || 1,
        height: s || 1
      });

      for (var l in t) {
        var p = t[l],
            c = r[l].paddedRect;
        Da.copy(p.data, u, {
          x: 0,
          y: 0
        }, {
          x: c.x + 1,
          y: c.y + 1
        }, p.data);
      }

      for (var h in e) {
        var f = e[h],
            y = n[h].paddedRect,
            d = y.x + 1,
            m = y.y + 1,
            v = f.data.width,
            g = f.data.height;
        Da.copy(f.data, u, {
          x: 0,
          y: 0
        }, {
          x: d,
          y: m
        }, f.data), Da.copy(f.data, u, {
          x: 0,
          y: g - 1
        }, {
          x: d,
          y: m - 1
        }, {
          width: v,
          height: 1
        }), Da.copy(f.data, u, {
          x: 0,
          y: 0
        }, {
          x: d,
          y: m + g
        }, {
          width: v,
          height: 1
        }), Da.copy(f.data, u, {
          x: v - 1,
          y: 0
        }, {
          x: d - 1,
          y: m
        }, {
          width: 1,
          height: g
        }), Da.copy(f.data, u, {
          x: 0,
          y: 0
        }, {
          x: d + v,
          y: m
        }, {
          width: 1,
          height: g
        });
      }

      this.image = u, this.iconPositions = r, this.patternPositions = n;
    };

    Rs.prototype.addImages = function (t, e, r) {
      for (var n in t) {
        var i = t[n],
            a = {
          x: 0,
          y: 0,
          w: i.data.width + 2,
          h: i.data.height + 2
        };
        r.push(a), e[n] = new Ds(a, i), i.hasRenderCallback && this.haveRenderCallbacks.push(n);
      }
    }, Rs.prototype.patchUpdatedImages = function (t, e) {
      for (var r in t.dispatchRenderCallbacks(this.haveRenderCallbacks), t.updatedImages) {
        this.patchUpdatedImage(this.iconPositions[r], t.getImage(r), e), this.patchUpdatedImage(this.patternPositions[r], t.getImage(r), e);
      }
    }, Rs.prototype.patchUpdatedImage = function (t, e, r) {
      if (t && e && t.version !== e.version) {
        t.version = e.version;
        var n = t.tl,
            i = n[0],
            a = n[1];
        r.update(e.data, void 0, {
          x: i,
          y: a
        });
      }
    }, mn("ImagePosition", Ds), mn("ImageAtlas", Rs);

    var Us = self.HTMLImageElement,
        js = self.HTMLCanvasElement,
        qs = self.HTMLVideoElement,
        Ns = self.ImageData,
        Ks = function (t, e, r, n) {
      this.context = t, this.format = r, this.texture = t.gl.createTexture(), this.update(e, n);
    };

    Ks.prototype.update = function (t, e, r) {
      var n = t.width,
          i = t.height,
          a = !(this.size && this.size[0] === n && this.size[1] === i || r),
          o = this.context,
          s = o.gl;
      if (this.useMipmap = Boolean(e && e.useMipmap), s.bindTexture(s.TEXTURE_2D, this.texture), o.pixelStoreUnpackFlipY.set(!1), o.pixelStoreUnpack.set(1), o.pixelStoreUnpackPremultiplyAlpha.set(this.format === s.RGBA && (!e || !1 !== e.premultiply)), a) this.size = [n, i], t instanceof Us || t instanceof js || t instanceof qs || t instanceof Ns ? s.texImage2D(s.TEXTURE_2D, 0, this.format, this.format, s.UNSIGNED_BYTE, t) : s.texImage2D(s.TEXTURE_2D, 0, this.format, n, i, 0, this.format, s.UNSIGNED_BYTE, t.data);else {
        var u = r || {
          x: 0,
          y: 0
        },
            l = u.x,
            p = u.y;
        t instanceof Us || t instanceof js || t instanceof qs || t instanceof Ns ? s.texSubImage2D(s.TEXTURE_2D, 0, l, p, s.RGBA, s.UNSIGNED_BYTE, t) : s.texSubImage2D(s.TEXTURE_2D, 0, l, p, n, i, s.RGBA, s.UNSIGNED_BYTE, t.data);
      }
      this.useMipmap && this.isSizePowerOfTwo() && s.generateMipmap(s.TEXTURE_2D);
    }, Ks.prototype.bind = function (t, e, r) {
      var n = this.context.gl;
      n.bindTexture(n.TEXTURE_2D, this.texture), r !== n.LINEAR_MIPMAP_NEAREST || this.isSizePowerOfTwo() || (r = n.LINEAR), t !== this.filter && (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, t), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, r || t), this.filter = t), e !== this.wrap && (n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, e), this.wrap = e);
    }, Ks.prototype.isSizePowerOfTwo = function () {
      return this.size[0] === this.size[1] && Math.log(this.size[0]) / Math.LN2 % 1 == 0;
    }, Ks.prototype.destroy = function () {
      this.context.gl.deleteTexture(this.texture), this.texture = null;
    };

    var Zs = function (t, e, r, n, i) {
      var a,
          o,
          s = 8 * i - n - 1,
          u = (1 << s) - 1,
          l = u >> 1,
          p = -7,
          c = r ? i - 1 : 0,
          h = r ? -1 : 1,
          f = t[e + c];

      for (c += h, a = f & (1 << -p) - 1, f >>= -p, p += s; p > 0; a = 256 * a + t[e + c], c += h, p -= 8) {
        ;
      }

      for (o = a & (1 << -p) - 1, a >>= -p, p += n; p > 0; o = 256 * o + t[e + c], c += h, p -= 8) {
        ;
      }

      if (0 === a) a = 1 - l;else {
        if (a === u) return o ? NaN : 1 / 0 * (f ? -1 : 1);
        o += Math.pow(2, n), a -= l;
      }
      return (f ? -1 : 1) * o * Math.pow(2, a - n);
    },
        Gs = function (t, e, r, n, i, a) {
      var o,
          s,
          u,
          l = 8 * a - i - 1,
          p = (1 << l) - 1,
          c = p >> 1,
          h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          f = n ? 0 : a - 1,
          y = n ? 1 : -1,
          d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, o = p) : (o = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (e += o + c >= 1 ? h / u : h * Math.pow(2, 1 - c)) * u >= 2 && (o++, u /= 2), o + c >= p ? (s = 0, o = p) : o + c >= 1 ? (s = (e * u - 1) * Math.pow(2, i), o += c) : (s = e * Math.pow(2, c - 1) * Math.pow(2, i), o = 0)); i >= 8; t[r + f] = 255 & s, f += y, s /= 256, i -= 8) {
        ;
      }

      for (o = o << i | s, l += i; l > 0; t[r + f] = 255 & o, f += y, o /= 256, l -= 8) {
        ;
      }

      t[r + f - y] |= 128 * d;
    },
        Xs = Js;

    function Js(t) {
      this.buf = ArrayBuffer.isView && ArrayBuffer.isView(t) ? t : new Uint8Array(t || 0), this.pos = 0, this.type = 0, this.length = this.buf.length;
    }

    Js.Varint = 0, Js.Fixed64 = 1, Js.Bytes = 2, Js.Fixed32 = 5;

    function Hs(t) {
      return t.type === Js.Bytes ? t.readVarint() + t.pos : t.pos + 1;
    }

    function Ys(t, e, r) {
      return r ? 4294967296 * e + (t >>> 0) : 4294967296 * (e >>> 0) + (t >>> 0);
    }

    function $s(t, e, r) {
      var n = e <= 16383 ? 1 : e <= 2097151 ? 2 : e <= 268435455 ? 3 : Math.floor(Math.log(e) / (7 * Math.LN2));
      r.realloc(n);

      for (var i = r.pos - 1; i >= t; i--) {
        r.buf[i + n] = r.buf[i];
      }
    }

    function Ws(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeVarint(t[r]);
      }
    }

    function Qs(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeSVarint(t[r]);
      }
    }

    function tu(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeFloat(t[r]);
      }
    }

    function eu(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeDouble(t[r]);
      }
    }

    function ru(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeBoolean(t[r]);
      }
    }

    function nu(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeFixed32(t[r]);
      }
    }

    function iu(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeSFixed32(t[r]);
      }
    }

    function au(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeFixed64(t[r]);
      }
    }

    function ou(t, e) {
      for (var r = 0; r < t.length; r++) {
        e.writeSFixed64(t[r]);
      }
    }

    function su(t, e) {
      return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + 16777216 * t[e + 3];
    }

    function uu(t, e, r) {
      t[r] = e, t[r + 1] = e >>> 8, t[r + 2] = e >>> 16, t[r + 3] = e >>> 24;
    }

    function lu(t, e) {
      return (t[e] | t[e + 1] << 8 | t[e + 2] << 16) + (t[e + 3] << 24);
    }

    Js.prototype = {
      destroy: function () {
        this.buf = null;
      },
      readFields: function (t, e, r) {
        for (r = r || this.length; this.pos < r;) {
          var n = this.readVarint(),
              i = n >> 3,
              a = this.pos;
          this.type = 7 & n, t(i, e, this), this.pos === a && this.skip(n);
        }

        return e;
      },
      readMessage: function (t, e) {
        return this.readFields(t, e, this.readVarint() + this.pos);
      },
      readFixed32: function () {
        var t = su(this.buf, this.pos);
        return this.pos += 4, t;
      },
      readSFixed32: function () {
        var t = lu(this.buf, this.pos);
        return this.pos += 4, t;
      },
      readFixed64: function () {
        var t = su(this.buf, this.pos) + 4294967296 * su(this.buf, this.pos + 4);
        return this.pos += 8, t;
      },
      readSFixed64: function () {
        var t = su(this.buf, this.pos) + 4294967296 * lu(this.buf, this.pos + 4);
        return this.pos += 8, t;
      },
      readFloat: function () {
        var t = Zs(this.buf, this.pos, !0, 23, 4);
        return this.pos += 4, t;
      },
      readDouble: function () {
        var t = Zs(this.buf, this.pos, !0, 52, 8);
        return this.pos += 8, t;
      },
      readVarint: function (t) {
        var e,
            r,
            n = this.buf;
        return e = 127 & (r = n[this.pos++]), r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 7, r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 14, r < 128 ? e : (e |= (127 & (r = n[this.pos++])) << 21, r < 128 ? e : function (t, e, r) {
          var n,
              i,
              a = r.buf;
          if (i = a[r.pos++], n = (112 & i) >> 4, i < 128) return Ys(t, n, e);
          if (i = a[r.pos++], n |= (127 & i) << 3, i < 128) return Ys(t, n, e);
          if (i = a[r.pos++], n |= (127 & i) << 10, i < 128) return Ys(t, n, e);
          if (i = a[r.pos++], n |= (127 & i) << 17, i < 128) return Ys(t, n, e);
          if (i = a[r.pos++], n |= (127 & i) << 24, i < 128) return Ys(t, n, e);
          if (i = a[r.pos++], n |= (1 & i) << 31, i < 128) return Ys(t, n, e);
          throw new Error("Expected varint not more than 10 bytes");
        }(e |= (15 & (r = n[this.pos])) << 28, t, this))));
      },
      readVarint64: function () {
        return this.readVarint(!0);
      },
      readSVarint: function () {
        var t = this.readVarint();
        return t % 2 == 1 ? (t + 1) / -2 : t / 2;
      },
      readBoolean: function () {
        return Boolean(this.readVarint());
      },
      readString: function () {
        var t = this.readVarint() + this.pos,
            e = function (t, e, r) {
          var n = "",
              i = e;

          for (; i < r;) {
            var a,
                o,
                s,
                u = t[i],
                l = null,
                p = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
            if (i + p > r) break;
            1 === p ? u < 128 && (l = u) : 2 === p ? 128 == (192 & (a = t[i + 1])) && (l = (31 & u) << 6 | 63 & a) <= 127 && (l = null) : 3 === p ? (a = t[i + 1], o = t[i + 2], 128 == (192 & a) && 128 == (192 & o) && ((l = (15 & u) << 12 | (63 & a) << 6 | 63 & o) <= 2047 || l >= 55296 && l <= 57343) && (l = null)) : 4 === p && (a = t[i + 1], o = t[i + 2], s = t[i + 3], 128 == (192 & a) && 128 == (192 & o) && 128 == (192 & s) && ((l = (15 & u) << 18 | (63 & a) << 12 | (63 & o) << 6 | 63 & s) <= 65535 || l >= 1114112) && (l = null)), null === l ? (l = 65533, p = 1) : l > 65535 && (l -= 65536, n += String.fromCharCode(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), n += String.fromCharCode(l), i += p;
          }

          return n;
        }(this.buf, this.pos, t);

        return this.pos = t, e;
      },
      readBytes: function () {
        var t = this.readVarint() + this.pos,
            e = this.buf.subarray(this.pos, t);
        return this.pos = t, e;
      },
      readPackedVarint: function (t, e) {
        if (this.type !== Js.Bytes) return t.push(this.readVarint(e));
        var r = Hs(this);

        for (t = t || []; this.pos < r;) {
          t.push(this.readVarint(e));
        }

        return t;
      },
      readPackedSVarint: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readSVarint());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readSVarint());
        }

        return t;
      },
      readPackedBoolean: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readBoolean());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readBoolean());
        }

        return t;
      },
      readPackedFloat: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readFloat());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readFloat());
        }

        return t;
      },
      readPackedDouble: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readDouble());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readDouble());
        }

        return t;
      },
      readPackedFixed32: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readFixed32());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readFixed32());
        }

        return t;
      },
      readPackedSFixed32: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readSFixed32());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readSFixed32());
        }

        return t;
      },
      readPackedFixed64: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readFixed64());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readFixed64());
        }

        return t;
      },
      readPackedSFixed64: function (t) {
        if (this.type !== Js.Bytes) return t.push(this.readSFixed64());
        var e = Hs(this);

        for (t = t || []; this.pos < e;) {
          t.push(this.readSFixed64());
        }

        return t;
      },
      skip: function (t) {
        var e = 7 & t;
        if (e === Js.Varint) for (; this.buf[this.pos++] > 127;) {
          ;
        } else if (e === Js.Bytes) this.pos = this.readVarint() + this.pos;else if (e === Js.Fixed32) this.pos += 4;else {
          if (e !== Js.Fixed64) throw new Error("Unimplemented type: " + e);
          this.pos += 8;
        }
      },
      writeTag: function (t, e) {
        this.writeVarint(t << 3 | e);
      },
      realloc: function (t) {
        for (var e = this.length || 16; e < this.pos + t;) {
          e *= 2;
        }

        if (e !== this.length) {
          var r = new Uint8Array(e);
          r.set(this.buf), this.buf = r, this.length = e;
        }
      },
      finish: function () {
        return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length);
      },
      writeFixed32: function (t) {
        this.realloc(4), uu(this.buf, t, this.pos), this.pos += 4;
      },
      writeSFixed32: function (t) {
        this.realloc(4), uu(this.buf, t, this.pos), this.pos += 4;
      },
      writeFixed64: function (t) {
        this.realloc(8), uu(this.buf, -1 & t, this.pos), uu(this.buf, Math.floor(t * (1 / 4294967296)), this.pos + 4), this.pos += 8;
      },
      writeSFixed64: function (t) {
        this.realloc(8), uu(this.buf, -1 & t, this.pos), uu(this.buf, Math.floor(t * (1 / 4294967296)), this.pos + 4), this.pos += 8;
      },
      writeVarint: function (t) {
        (t = +t || 0) > 268435455 || t < 0 ? function (t, e) {
          var r, n;
          t >= 0 ? (r = t % 4294967296 | 0, n = t / 4294967296 | 0) : (n = ~(-t / 4294967296), 4294967295 ^ (r = ~(-t % 4294967296)) ? r = r + 1 | 0 : (r = 0, n = n + 1 | 0));
          if (t >= 0x10000000000000000 || t < -0x10000000000000000) throw new Error("Given varint doesn't fit into 10 bytes");
          e.realloc(10), function (t, e, r) {
            r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos++] = 127 & t | 128, t >>>= 7, r.buf[r.pos] = 127 & t;
          }(r, 0, e), function (t, e) {
            var r = (7 & t) << 4;
            if (e.buf[e.pos++] |= r | ((t >>>= 3) ? 128 : 0), !t) return;
            if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
            if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
            if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
            if (e.buf[e.pos++] = 127 & t | ((t >>>= 7) ? 128 : 0), !t) return;
            e.buf[e.pos++] = 127 & t;
          }(n, e);
        }(t, this) : (this.realloc(4), this.buf[this.pos++] = 127 & t | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = 127 & (t >>>= 7) | (t > 127 ? 128 : 0), t <= 127 || (this.buf[this.pos++] = t >>> 7 & 127))));
      },
      writeSVarint: function (t) {
        this.writeVarint(t < 0 ? 2 * -t - 1 : 2 * t);
      },
      writeBoolean: function (t) {
        this.writeVarint(Boolean(t));
      },
      writeString: function (t) {
        t = String(t), this.realloc(4 * t.length), this.pos++;
        var e = this.pos;

        this.pos = function (t, e, r) {
          for (var n, i, a = 0; a < e.length; a++) {
            if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
              if (!i) {
                n > 56319 || a + 1 === e.length ? (t[r++] = 239, t[r++] = 191, t[r++] = 189) : i = n;
                continue;
              }

              if (n < 56320) {
                t[r++] = 239, t[r++] = 191, t[r++] = 189, i = n;
                continue;
              }

              n = i - 55296 << 10 | n - 56320 | 65536, i = null;
            } else i && (t[r++] = 239, t[r++] = 191, t[r++] = 189, i = null);

            n < 128 ? t[r++] = n : (n < 2048 ? t[r++] = n >> 6 | 192 : (n < 65536 ? t[r++] = n >> 12 | 224 : (t[r++] = n >> 18 | 240, t[r++] = n >> 12 & 63 | 128), t[r++] = n >> 6 & 63 | 128), t[r++] = 63 & n | 128);
          }

          return r;
        }(this.buf, t, this.pos);

        var r = this.pos - e;
        r >= 128 && $s(e, r, this), this.pos = e - 1, this.writeVarint(r), this.pos += r;
      },
      writeFloat: function (t) {
        this.realloc(4), Gs(this.buf, t, this.pos, !0, 23, 4), this.pos += 4;
      },
      writeDouble: function (t) {
        this.realloc(8), Gs(this.buf, t, this.pos, !0, 52, 8), this.pos += 8;
      },
      writeBytes: function (t) {
        var e = t.length;
        this.writeVarint(e), this.realloc(e);

        for (var r = 0; r < e; r++) {
          this.buf[this.pos++] = t[r];
        }
      },
      writeRawMessage: function (t, e) {
        this.pos++;
        var r = this.pos;
        t(e, this);
        var n = this.pos - r;
        n >= 128 && $s(r, n, this), this.pos = r - 1, this.writeVarint(n), this.pos += n;
      },
      writeMessage: function (t, e, r) {
        this.writeTag(t, Js.Bytes), this.writeRawMessage(e, r);
      },
      writePackedVarint: function (t, e) {
        e.length && this.writeMessage(t, Ws, e);
      },
      writePackedSVarint: function (t, e) {
        e.length && this.writeMessage(t, Qs, e);
      },
      writePackedBoolean: function (t, e) {
        e.length && this.writeMessage(t, ru, e);
      },
      writePackedFloat: function (t, e) {
        e.length && this.writeMessage(t, tu, e);
      },
      writePackedDouble: function (t, e) {
        e.length && this.writeMessage(t, eu, e);
      },
      writePackedFixed32: function (t, e) {
        e.length && this.writeMessage(t, nu, e);
      },
      writePackedSFixed32: function (t, e) {
        e.length && this.writeMessage(t, iu, e);
      },
      writePackedFixed64: function (t, e) {
        e.length && this.writeMessage(t, au, e);
      },
      writePackedSFixed64: function (t, e) {
        e.length && this.writeMessage(t, ou, e);
      },
      writeBytesField: function (t, e) {
        this.writeTag(t, Js.Bytes), this.writeBytes(e);
      },
      writeFixed32Field: function (t, e) {
        this.writeTag(t, Js.Fixed32), this.writeFixed32(e);
      },
      writeSFixed32Field: function (t, e) {
        this.writeTag(t, Js.Fixed32), this.writeSFixed32(e);
      },
      writeFixed64Field: function (t, e) {
        this.writeTag(t, Js.Fixed64), this.writeFixed64(e);
      },
      writeSFixed64Field: function (t, e) {
        this.writeTag(t, Js.Fixed64), this.writeSFixed64(e);
      },
      writeVarintField: function (t, e) {
        this.writeTag(t, Js.Varint), this.writeVarint(e);
      },
      writeSVarintField: function (t, e) {
        this.writeTag(t, Js.Varint), this.writeSVarint(e);
      },
      writeStringField: function (t, e) {
        this.writeTag(t, Js.Bytes), this.writeString(e);
      },
      writeFloatField: function (t, e) {
        this.writeTag(t, Js.Fixed32), this.writeFloat(e);
      },
      writeDoubleField: function (t, e) {
        this.writeTag(t, Js.Fixed64), this.writeDouble(e);
      },
      writeBooleanField: function (t, e) {
        this.writeVarintField(t, Boolean(e));
      }
    };
    var pu = 3;

    function cu(t, e, r) {
      1 === t && r.readMessage(hu, e);
    }

    function hu(t, e, r) {
      if (3 === t) {
        var n = r.readMessage(fu, {}),
            i = n.id,
            a = n.bitmap,
            o = n.width,
            s = n.height,
            u = n.left,
            l = n.top,
            p = n.advance;
        e.push({
          id: i,
          bitmap: new La({
            width: o + 2 * pu,
            height: s + 2 * pu
          }, a),
          metrics: {
            width: o,
            height: s,
            left: u,
            top: l,
            advance: p
          }
        });
      }
    }

    function fu(t, e, r) {
      1 === t ? e.id = r.readVarint() : 2 === t ? e.bitmap = r.readBytes() : 3 === t ? e.width = r.readVarint() : 4 === t ? e.height = r.readVarint() : 5 === t ? e.left = r.readSVarint() : 6 === t ? e.top = r.readSVarint() : 7 === t && (e.advance = r.readVarint());
    }

    var yu = pu,
        du = function (t, e, r) {
      this.target = t, this.parent = e, this.mapId = r, this.callbacks = {}, this.callbackID = 0, m(["receive"], this), this.target.addEventListener("message", this.receive, !1);
    };

    function mu(t, e, r) {
      var n = 2 * Math.PI * 6378137 / 256 / Math.pow(2, r);
      return [t * n - 2 * Math.PI * 6378137 / 2, e * n - 2 * Math.PI * 6378137 / 2];
    }

    du.prototype.send = function (t, e, r, n) {
      var i = this,
          a = r ? this.mapId + ":" + this.callbackID++ : null;
      r && (this.callbacks[a] = r);
      var o = [];
      if (this.target.postMessage({
        targetMapId: n,
        sourceMapId: this.mapId,
        type: t,
        id: String(a),
        data: gn(e, o)
      }, o), r) return {
        cancel: function () {
          i.callbacks[a] = null, i.target.postMessage({
            targetMapId: n,
            sourceMapId: i.mapId,
            type: "<cancel>",
            id: String(a)
          });
        }
      };
    }, du.prototype.receive = function (t) {
      var e,
          r = this,
          n = t.data,
          i = n.id;

      if (!n.targetMapId || this.mapId === n.targetMapId) {
        var a = function (t, e) {
          delete r.callbacks[i];
          var n = [];
          r.target.postMessage({
            sourceMapId: r.mapId,
            type: "<response>",
            id: String(i),
            error: t ? gn(t) : null,
            data: gn(e, n)
          }, n);
        };

        if ("<response>" === n.type || "<cancel>" === n.type) e = this.callbacks[n.id], delete this.callbacks[n.id], e && n.error ? e(xn(n.error)) : e && e(null, xn(n.data));else if (void 0 !== n.id && this.parent[n.type]) {
          this.callbacks[n.id] = null;
          var o = this.parent[n.type](n.sourceMapId, xn(n.data), a);
          o && null === this.callbacks[n.id] && (this.callbacks[n.id] = o.cancel);
        } else if (void 0 !== n.id && this.parent.getWorkerSource) {
          var s = n.type.split("."),
              u = xn(n.data);
          this.parent.getWorkerSource(n.sourceMapId, s[0], u.source)[s[1]](u, a);
        } else this.parent[n.type](xn(n.data));
      }
    }, du.prototype.remove = function () {
      this.target.removeEventListener("message", this.receive, !1);
    };

    var vu = function (t, e) {
      t && (e ? this.setSouthWest(t).setNorthEast(e) : 4 === t.length ? this.setSouthWest([t[0], t[1]]).setNorthEast([t[2], t[3]]) : this.setSouthWest(t[0]).setNorthEast(t[1]));
    };

    vu.prototype.setNorthEast = function (t) {
      return this._ne = t instanceof gu ? new gu(t.lng, t.lat) : gu.convert(t), this;
    }, vu.prototype.setSouthWest = function (t) {
      return this._sw = t instanceof gu ? new gu(t.lng, t.lat) : gu.convert(t), this;
    }, vu.prototype.extend = function (t) {
      var e,
          r,
          n = this._sw,
          i = this._ne;
      if (t instanceof gu) e = t, r = t;else {
        if (!(t instanceof vu)) return Array.isArray(t) ? t.every(Array.isArray) ? this.extend(vu.convert(t)) : this.extend(gu.convert(t)) : this;
        if (e = t._sw, r = t._ne, !e || !r) return this;
      }
      return n || i ? (n.lng = Math.min(e.lng, n.lng), n.lat = Math.min(e.lat, n.lat), i.lng = Math.max(r.lng, i.lng), i.lat = Math.max(r.lat, i.lat)) : (this._sw = new gu(e.lng, e.lat), this._ne = new gu(r.lng, r.lat)), this;
    }, vu.prototype.getCenter = function () {
      return new gu((this._sw.lng + this._ne.lng) / 2, (this._sw.lat + this._ne.lat) / 2);
    }, vu.prototype.getSouthWest = function () {
      return this._sw;
    }, vu.prototype.getNorthEast = function () {
      return this._ne;
    }, vu.prototype.getNorthWest = function () {
      return new gu(this.getWest(), this.getNorth());
    }, vu.prototype.getSouthEast = function () {
      return new gu(this.getEast(), this.getSouth());
    }, vu.prototype.getWest = function () {
      return this._sw.lng;
    }, vu.prototype.getSouth = function () {
      return this._sw.lat;
    }, vu.prototype.getEast = function () {
      return this._ne.lng;
    }, vu.prototype.getNorth = function () {
      return this._ne.lat;
    }, vu.prototype.toArray = function () {
      return [this._sw.toArray(), this._ne.toArray()];
    }, vu.prototype.toString = function () {
      return "LngLatBounds(" + this._sw.toString() + ", " + this._ne.toString() + ")";
    }, vu.prototype.isEmpty = function () {
      return !(this._sw && this._ne);
    }, vu.convert = function (t) {
      return !t || t instanceof vu ? t : new vu(t);
    };

    var gu = function (t, e) {
      if (isNaN(t) || isNaN(e)) throw new Error("Invalid LngLat object: (" + t + ", " + e + ")");
      if (this.lng = +t, this.lat = +e, this.lat > 90 || this.lat < -90) throw new Error("Invalid LngLat latitude value: must be between -90 and 90");
    };

    function xu(t) {
      return 2 * Math.PI * 6378137 * Math.cos(t * Math.PI / 180);
    }

    function bu(t) {
      return (180 + t) / 360;
    }

    function _u(t) {
      return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + t * Math.PI / 360))) / 360;
    }

    function wu(t, e) {
      return t / xu(e);
    }

    function Au(t) {
      var e = 180 - 360 * t;
      return 360 / Math.PI * Math.atan(Math.exp(e * Math.PI / 180)) - 90;
    }

    gu.prototype.wrap = function () {
      return new gu(p(this.lng, -180, 180), this.lat);
    }, gu.prototype.toArray = function () {
      return [this.lng, this.lat];
    }, gu.prototype.toString = function () {
      return "LngLat(" + this.lng + ", " + this.lat + ")";
    }, gu.prototype.toBounds = function (t) {
      void 0 === t && (t = 0);
      var e = 360 * t / 40075017,
          r = e / Math.cos(Math.PI / 180 * this.lat);
      return new vu(new gu(this.lng - r, this.lat - e), new gu(this.lng + r, this.lat + e));
    }, gu.convert = function (t) {
      if (t instanceof gu) return t;
      if (Array.isArray(t) && (2 === t.length || 3 === t.length)) return new gu(Number(t[0]), Number(t[1]));
      if (!Array.isArray(t) && "object" == _typeof(t) && null !== t) return new gu(Number("lng" in t ? t.lng : t.lon), Number(t.lat));
      throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]");
    };

    var ku = function (t, e, r) {
      void 0 === r && (r = 0), this.x = +t, this.y = +e, this.z = +r;
    };

    ku.fromLngLat = function (t, e) {
      void 0 === e && (e = 0);
      var r = gu.convert(t);
      return new ku(bu(r.lng), _u(r.lat), wu(e, r.lat));
    }, ku.prototype.toLngLat = function () {
      return new gu(360 * this.x - 180, Au(this.y));
    }, ku.prototype.toAltitude = function () {
      return t = this.z, e = this.y, t * xu(Au(e));
      var t, e;
    };

    var Su = function (t, e, r) {
      this.z = t, this.x = e, this.y = r, this.key = Bu(0, t, e, r);
    };

    Su.prototype.equals = function (t) {
      return this.z === t.z && this.x === t.x && this.y === t.y;
    }, Su.prototype.url = function (t, e) {
      var r,
          n,
          i,
          a,
          o,
          s = (r = this.x, n = this.y, i = this.z, a = mu(256 * r, 256 * (n = Math.pow(2, i) - n - 1), i), o = mu(256 * (r + 1), 256 * (n + 1), i), a[0] + "," + a[1] + "," + o[0] + "," + o[1]),
          u = function (t, e, r) {
        for (var n, i = "", a = t; a > 0; a--) {
          i += (e & (n = 1 << a - 1) ? 1 : 0) + (r & n ? 2 : 0);
        }

        return i;
      }(this.z, this.x, this.y);

      return t[(this.x + this.y) % t.length].replace("{prefix}", (this.x % 16).toString(16) + (this.y % 16).toString(16)).replace("{z}", String(this.z)).replace("{x}", String(this.x)).replace("{y}", String("tms" === e ? Math.pow(2, this.z) - this.y - 1 : this.y)).replace("{quadkey}", u).replace("{bbox-epsg-3857}", s);
    }, Su.prototype.getTilePoint = function (t) {
      var e = Math.pow(2, this.z);
      return new i((t.x * e - this.x) * ia, (t.y * e - this.y) * ia);
    };

    var zu = function (t, e) {
      this.wrap = t, this.canonical = e, this.key = Bu(t, e.z, e.x, e.y);
    },
        Iu = function (t, e, r, n, i) {
      this.overscaledZ = t, this.wrap = e, this.canonical = new Su(r, +n, +i), this.key = Bu(e, t, n, i);
    };

    function Bu(t, e, r, n) {
      (t *= 2) < 0 && (t = -1 * t - 1);
      var i = 1 << e;
      return 32 * (i * i * t + i * n + r) + e;
    }

    Iu.prototype.equals = function (t) {
      return this.overscaledZ === t.overscaledZ && this.wrap === t.wrap && this.canonical.equals(t.canonical);
    }, Iu.prototype.scaledTo = function (t) {
      var e = this.canonical.z - t;
      return t > this.canonical.z ? new Iu(t, this.wrap, this.canonical.z, this.canonical.x, this.canonical.y) : new Iu(t, this.wrap, t, this.canonical.x >> e, this.canonical.y >> e);
    }, Iu.prototype.isChildOf = function (t) {
      if (t.wrap !== this.wrap) return !1;
      var e = this.canonical.z - t.canonical.z;
      return 0 === t.overscaledZ || t.overscaledZ < this.overscaledZ && t.canonical.x === this.canonical.x >> e && t.canonical.y === this.canonical.y >> e;
    }, Iu.prototype.children = function (t) {
      if (this.overscaledZ >= t) return [new Iu(this.overscaledZ + 1, this.wrap, this.canonical.z, this.canonical.x, this.canonical.y)];
      var e = this.canonical.z + 1,
          r = 2 * this.canonical.x,
          n = 2 * this.canonical.y;
      return [new Iu(e, this.wrap, e, r, n), new Iu(e, this.wrap, e, r + 1, n), new Iu(e, this.wrap, e, r, n + 1), new Iu(e, this.wrap, e, r + 1, n + 1)];
    }, Iu.prototype.isLessThan = function (t) {
      return this.wrap < t.wrap || !(this.wrap > t.wrap) && (this.overscaledZ < t.overscaledZ || !(this.overscaledZ > t.overscaledZ) && (this.canonical.x < t.canonical.x || !(this.canonical.x > t.canonical.x) && this.canonical.y < t.canonical.y));
    }, Iu.prototype.wrapped = function () {
      return new Iu(this.overscaledZ, 0, this.canonical.z, this.canonical.x, this.canonical.y);
    }, Iu.prototype.unwrapTo = function (t) {
      return new Iu(this.overscaledZ, t, this.canonical.z, this.canonical.x, this.canonical.y);
    }, Iu.prototype.overscaleFactor = function () {
      return Math.pow(2, this.overscaledZ - this.canonical.z);
    }, Iu.prototype.toUnwrapped = function () {
      return new zu(this.wrap, this.canonical);
    }, Iu.prototype.toString = function () {
      return this.overscaledZ + "/" + this.canonical.x + "/" + this.canonical.y;
    }, Iu.prototype.getTilePoint = function (t) {
      return this.canonical.getTilePoint(new ku(t.x - this.wrap, t.y));
    }, mn("CanonicalTileID", Su), mn("OverscaledTileID", Iu, {
      omit: ["posMatrix"]
    });

    var Cu = function (t, e, r) {
      if (this.uid = t, e.height !== e.width) throw new RangeError("DEM tiles must be square");
      if (r && "mapbox" !== r && "terrarium" !== r) return w('"' + r + '" is not a valid encoding type. Valid types include "mapbox" and "terrarium".');
      var n = this.dim = e.height;
      this.stride = this.dim + 2, this.data = new Int32Array(this.stride * this.stride);

      for (var i = e.data, a = "terrarium" === r ? this._unpackTerrarium : this._unpackMapbox, o = 0; o < n; o++) {
        for (var s = 0; s < n; s++) {
          var u = 4 * (o * n + s);
          this.set(s, o, a(i[u], i[u + 1], i[u + 2]));
        }
      }

      for (var l = 0; l < n; l++) {
        this.set(-1, l, this.get(0, l)), this.set(n, l, this.get(n - 1, l)), this.set(l, -1, this.get(l, 0)), this.set(l, n, this.get(l, n - 1));
      }

      this.set(-1, -1, this.get(0, 0)), this.set(n, -1, this.get(n - 1, 0)), this.set(-1, n, this.get(0, n - 1)), this.set(n, n, this.get(n - 1, n - 1));
    };

    Cu.prototype.set = function (t, e, r) {
      this.data[this._idx(t, e)] = r + 65536;
    }, Cu.prototype.get = function (t, e) {
      return this.data[this._idx(t, e)] - 65536;
    }, Cu.prototype._idx = function (t, e) {
      if (t < -1 || t >= this.dim + 1 || e < -1 || e >= this.dim + 1) throw new RangeError("out of range source coordinates for DEM data");
      return (e + 1) * this.stride + (t + 1);
    }, Cu.prototype._unpackMapbox = function (t, e, r) {
      return (256 * t * 256 + 256 * e + r) / 10 - 1e4;
    }, Cu.prototype._unpackTerrarium = function (t, e, r) {
      return 256 * t + e + r / 256 - 32768;
    }, Cu.prototype.getPixels = function () {
      return new Da({
        width: this.stride,
        height: this.stride
      }, new Uint8Array(this.data.buffer));
    }, Cu.prototype.backfillBorder = function (t, e, r) {
      if (this.dim !== t.dim) throw new Error("dem dimension mismatch");
      var n = e * this.dim,
          i = e * this.dim + this.dim,
          a = r * this.dim,
          o = r * this.dim + this.dim;

      switch (e) {
        case -1:
          n = i - 1;
          break;

        case 1:
          i = n + 1;
      }

      switch (r) {
        case -1:
          a = o - 1;
          break;

        case 1:
          o = a + 1;
      }

      for (var s = -e * this.dim, u = -r * this.dim, l = a; l < o; l++) {
        for (var p = n; p < i; p++) {
          this.set(p, l, t.get(p + s, l + u));
        }
      }
    }, mn("DEMData", Cu);
    var Eu = Qn([{
      name: "a_pos",
      type: "Int16",
      components: 2
    }, {
      name: "a_texture_pos",
      type: "Int16",
      components: 2
    }]);

    var Mu = function (t) {
      this._stringToNumber = {}, this._numberToString = [];

      for (var e = 0; e < t.length; e++) {
        var r = t[e];
        this._stringToNumber[r] = e, this._numberToString[e] = r;
      }
    };

    Mu.prototype.encode = function (t) {
      return this._stringToNumber[t];
    }, Mu.prototype.decode = function (t) {
      return this._numberToString[t];
    };

    var Tu = function (t, e, r, n) {
      this.type = "Feature", this._vectorTileFeature = t, t._z = e, t._x = r, t._y = n, this.properties = t.properties, null != t.id && (this.id = t.id);
    },
        Pu = {
      geometry: {
        configurable: !0
      }
    };

    Pu.geometry.get = function () {
      return void 0 === this._geometry && (this._geometry = this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x, this._vectorTileFeature._y, this._vectorTileFeature._z).geometry), this._geometry;
    }, Pu.geometry.set = function (t) {
      this._geometry = t;
    }, Tu.prototype.toJSON = function () {
      var t = {
        geometry: this.geometry
      };

      for (var e in this) {
        "_geometry" !== e && "_vectorTileFeature" !== e && (t[e] = this[e]);
      }

      return t;
    }, Object.defineProperties(Tu.prototype, Pu);

    var Vu = function () {
      this.state = {}, this.stateChanges = {}, this.deletedStates = {};
    };

    Vu.prototype.updateState = function (t, e, r) {
      var n = String(e);
      if (this.stateChanges[t] = this.stateChanges[t] || {}, this.stateChanges[t][n] = this.stateChanges[t][n] || {}, c(this.stateChanges[t][n], r), null === this.deletedStates[t]) for (var i in this.deletedStates[t] = {}, this.state[t]) {
        i !== n && (this.deletedStates[t][i] = null);
      } else if (this.deletedStates[t] && null === this.deletedStates[t][n]) for (var a in this.deletedStates[t][n] = {}, this.state[t][n]) {
        r[a] || (this.deletedStates[t][n][a] = null);
      } else for (var o in r) {
        this.deletedStates[t] && this.deletedStates[t][n] && null === this.deletedStates[t][n][o] && delete this.deletedStates[t][n][o];
      }
    }, Vu.prototype.removeFeatureState = function (t, e, r) {
      if (!(null === this.deletedStates[t])) {
        var n = String(e);
        if (this.deletedStates[t] = this.deletedStates[t] || {}, r && void 0 !== e && e >= 0) null !== this.deletedStates[t][n] && (this.deletedStates[t][n] = this.deletedStates[t][n] || {}, this.deletedStates[t][n][r] = null);else if (void 0 !== e && e >= 0) {
          if (this.stateChanges[t] && this.stateChanges[t][n]) for (r in this.deletedStates[t][n] = {}, this.stateChanges[t][n]) {
            this.deletedStates[t][n][r] = null;
          } else this.deletedStates[t][n] = null;
        } else this.deletedStates[t] = null;
      }
    }, Vu.prototype.getState = function (t, e) {
      var r = String(e),
          n = this.state[t] || {},
          i = this.stateChanges[t] || {},
          a = c({}, n[r], i[r]);
      if (null === this.deletedStates[t]) return {};

      if (this.deletedStates[t]) {
        var o = this.deletedStates[t][e];
        if (null === o) return {};

        for (var s in o) {
          delete a[s];
        }
      }

      return a;
    }, Vu.prototype.initializeTileState = function (t, e) {
      t.setFeatureState(this.state, e);
    }, Vu.prototype.coalesceChanges = function (t, e) {
      var r = {};

      for (var n in this.stateChanges) {
        this.state[n] = this.state[n] || {};
        var i = {};

        for (var a in this.stateChanges[n]) {
          this.state[n][a] || (this.state[n][a] = {}), c(this.state[n][a], this.stateChanges[n][a]), i[a] = this.state[n][a];
        }

        r[n] = i;
      }

      for (var o in this.deletedStates) {
        this.state[o] = this.state[o] || {};
        var s = {};
        if (null === this.deletedStates[o]) for (var u in this.state[o]) {
          s[u] = {}, this.state[o][u] = {};
        } else for (var l in this.deletedStates[o]) {
          if (null === this.deletedStates[o][l]) this.state[o][l] = {};else for (var p = 0, h = Object.keys(this.deletedStates[o][l]); p < h.length; p += 1) {
            var f = h[p];
            delete this.state[o][l][f];
          }
          s[l] = this.state[o][l];
        }
        r[o] = r[o] || {}, c(r[o], s);
      }

      if (this.stateChanges = {}, this.deletedStates = {}, 0 !== Object.keys(r).length) for (var y in t) {
        t[y].setFeatureState(r, e);
      }
    };

    var Fu = function (t, e, r) {
      this.tileID = t, this.x = t.canonical.x, this.y = t.canonical.y, this.z = t.canonical.z, this.grid = e || new cn(ia, 16, 0), this.grid3D = new cn(ia, 16, 0), this.featureIndexArray = r || new Pi();
    };

    function Lu(t) {
      for (var e = 1 / 0, r = 1 / 0, n = -1 / 0, i = -1 / 0, a = 0, o = t; a < o.length; a += 1) {
        var s = o[a];
        e = Math.min(e, s.x), r = Math.min(r, s.y), n = Math.max(n, s.x), i = Math.max(i, s.y);
      }

      return {
        minX: e,
        minY: r,
        maxX: n,
        maxY: i
      };
    }

    function Du(t, e) {
      return e - t;
    }

    Fu.prototype.insert = function (t, e, r, n, i, a) {
      var o = this.featureIndexArray.length;
      this.featureIndexArray.emplaceBack(r, n, i);

      for (var s = a ? this.grid3D : this.grid, u = 0; u < e.length; u++) {
        for (var l = e[u], p = [1 / 0, 1 / 0, -1 / 0, -1 / 0], c = 0; c < l.length; c++) {
          var h = l[c];
          p[0] = Math.min(p[0], h.x), p[1] = Math.min(p[1], h.y), p[2] = Math.max(p[2], h.x), p[3] = Math.max(p[3], h.y);
        }

        p[0] < ia && p[1] < ia && p[2] >= 0 && p[3] >= 0 && s.insert(o, p[0], p[1], p[2], p[3]);
      }
    }, Fu.prototype.loadVTLayers = function () {
      return this.vtLayers || (this.vtLayers = new Lo.VectorTile(new Xs(this.rawTileData)).layers, this.sourceLayerCoder = new Mu(this.vtLayers ? Object.keys(this.vtLayers).sort() : ["_geojsonTileLayer"])), this.vtLayers;
    }, Fu.prototype.query = function (t, e, r) {
      var n = this;
      this.loadVTLayers();

      for (var a = t.params || {}, o = ia / t.tileSize / t.scale, s = Or(a.filter), u = t.queryGeometry, l = t.queryPadding * o, p = Lu(u), c = this.grid.query(p.minX - l, p.minY - l, p.maxX + l, p.maxY + l), h = Lu(t.cameraQueryGeometry), f = this.grid3D.query(h.minX - l, h.minY - l, h.maxX + l, h.maxY + l, function (e, r, n, a) {
        return function (t, e, r, n, a) {
          for (var o = 0, s = t; o < s.length; o += 1) {
            var u = s[o];
            if (e <= u.x && r <= u.y && n >= u.x && a >= u.y) return !0;
          }

          var l = [new i(e, r), new i(e, a), new i(n, a), new i(n, r)];
          if (t.length > 2) for (var p = 0, c = l; p < c.length; p += 1) {
            if (xa(t, c[p])) return !0;
          }

          for (var h = 0; h < t.length - 1; h++) {
            if (ba(t[h], t[h + 1], l)) return !0;
          }

          return !1;
        }(t.cameraQueryGeometry, e - l, r - l, n + l, a + l);
      }), y = 0, d = f; y < d.length; y += 1) {
        var m = d[y];
        c.push(m);
      }

      c.sort(Du);

      for (var v, g = {}, x = function (i) {
        var l = c[i];

        if (l !== v) {
          v = l;
          var p = n.featureIndexArray.get(l),
              h = null;
          n.loadMatchingFeature(g, p.bucketIndex, p.sourceLayerIndex, p.featureIndex, s, a.layers, e, function (e, i) {
            h || (h = sa(e));
            var a = {};
            return e.id && (a = r.getState(i.sourceLayer || "_geojsonTileLayer", e.id)), i.queryIntersectsFeature(u, e, a, h, n.z, t.transform, o, t.pixelPosMatrix);
          });
        }
      }, b = 0; b < c.length; b++) {
        x(b);
      }

      return g;
    }, Fu.prototype.loadMatchingFeature = function (t, e, r, n, i, a, o, s) {
      var u = this.bucketLayerIDs[e];

      if (!a || function (t, e) {
        for (var r = 0; r < t.length; r++) {
          if (e.indexOf(t[r]) >= 0) return !0;
        }

        return !1;
      }(a, u)) {
        var l = this.sourceLayerCoder.decode(r),
            p = this.vtLayers[l].feature(n);
        if (i(new Vn(this.tileID.overscaledZ), p)) for (var c = 0; c < u.length; c++) {
          var h = u[c];

          if (!(a && a.indexOf(h) < 0)) {
            var f = o[h];

            if (f) {
              var y = !s || s(p, f);

              if (y) {
                var d = new Tu(p, this.z, this.x, this.y);
                d.layer = f.serialize();
                var m = t[h];
                void 0 === m && (m = t[h] = []), m.push({
                  featureIndex: n,
                  feature: d,
                  intersectionZ: y
                });
              }
            }
          }
        }
      }
    }, Fu.prototype.lookupSymbolFeatures = function (t, e, r, n, i, a) {
      var o = {};
      this.loadVTLayers();

      for (var s = Or(n), u = 0, l = t; u < l.length; u += 1) {
        var p = l[u];
        this.loadMatchingFeature(o, e, r, p, s, i, a);
      }

      return o;
    }, Fu.prototype.hasLayer = function (t) {
      for (var e = 0, r = this.bucketLayerIDs; e < r.length; e += 1) {
        for (var n = 0, i = r[e]; n < i.length; n += 1) {
          if (t === i[n]) return !0;
        }
      }

      return !1;
    }, mn("FeatureIndex", Fu, {
      omit: ["rawTileData", "sourceLayerCoder"]
    });

    var Ou = function (t, e) {
      this.tileID = t, this.uid = f(), this.uses = 0, this.tileSize = e, this.buckets = {}, this.expirationTime = null, this.queryPadding = 0, this.hasSymbolBuckets = !1, this.expiredRequestCount = 0, this.state = "loading";
    };

    Ou.prototype.registerFadeDuration = function (t) {
      var e = t + this.timeAdded;
      e < V.now() || this.fadeEndTime && e < this.fadeEndTime || (this.fadeEndTime = e);
    }, Ou.prototype.wasRequested = function () {
      return "errored" === this.state || "loaded" === this.state || "reloading" === this.state;
    }, Ou.prototype.loadVectorData = function (t, e, r) {
      if (this.hasData() && this.unloadVectorData(), this.state = "loaded", t) {
        for (var n in t.featureIndex && (this.latestFeatureIndex = t.featureIndex, t.rawTileData ? (this.latestRawTileData = t.rawTileData, this.latestFeatureIndex.rawTileData = t.rawTileData) : this.latestRawTileData && (this.latestFeatureIndex.rawTileData = this.latestRawTileData)), this.collisionBoxArray = t.collisionBoxArray, this.buckets = function (t, e) {
          var r = {};
          if (!e) return r;

          for (var n = function () {
            var t = a[i],
                n = t.layerIds.map(function (t) {
              return e.getLayer(t);
            }).filter(Boolean);

            if (0 !== n.length) {
              t.layers = n, t.stateDependentLayerIds && (t.stateDependentLayers = t.stateDependentLayerIds.map(function (t) {
                return n.filter(function (e) {
                  return e.id === t;
                })[0];
              }));

              for (var o = 0, s = n; o < s.length; o += 1) {
                var u = s[o];
                r[u.id] = t;
              }
            }
          }, i = 0, a = t; i < a.length; i += 1) {
            n();
          }

          return r;
        }(t.buckets, e.style), this.hasSymbolBuckets = !1, this.buckets) {
          var i = this.buckets[n];

          if (i instanceof zs) {
            if (this.hasSymbolBuckets = !0, !r) break;
            i.justReloaded = !0;
          }
        }

        for (var a in this.queryPadding = 0, this.buckets) {
          var o = this.buckets[a];
          this.queryPadding = Math.max(this.queryPadding, e.style.getLayer(a).queryRadius(o));
        }

        t.imageAtlas && (this.imageAtlas = t.imageAtlas), t.glyphAtlasImage && (this.glyphAtlasImage = t.glyphAtlasImage);
      } else this.collisionBoxArray = new Ai();
    }, Ou.prototype.unloadVectorData = function () {
      for (var t in this.buckets) {
        this.buckets[t].destroy();
      }

      this.buckets = {}, this.imageAtlasTexture && this.imageAtlasTexture.destroy(), this.imageAtlas && (this.imageAtlas = null), this.glyphAtlasTexture && this.glyphAtlasTexture.destroy(), this.latestFeatureIndex = null, this.state = "unloaded";
    }, Ou.prototype.unloadDEMData = function () {
      this.dem = null, this.neighboringTiles = null, this.state = "unloaded";
    }, Ou.prototype.getBucket = function (t) {
      return this.buckets[t.id];
    }, Ou.prototype.upload = function (t) {
      for (var e in this.buckets) {
        var r = this.buckets[e];
        r.uploadPending() && r.upload(t);
      }

      var n = t.gl;
      this.imageAtlas && !this.imageAtlas.uploaded && (this.imageAtlasTexture = new Ks(t, this.imageAtlas.image, n.RGBA), this.imageAtlas.uploaded = !0), this.glyphAtlasImage && (this.glyphAtlasTexture = new Ks(t, this.glyphAtlasImage, n.ALPHA), this.glyphAtlasImage = null);
    }, Ou.prototype.prepare = function (t) {
      this.imageAtlas && this.imageAtlas.patchUpdatedImages(t, this.imageAtlasTexture);
    }, Ou.prototype.queryRenderedFeatures = function (t, e, r, n, i, a, o, s, u) {
      return this.latestFeatureIndex && this.latestFeatureIndex.rawTileData ? this.latestFeatureIndex.query({
        queryGeometry: r,
        cameraQueryGeometry: n,
        scale: i,
        tileSize: this.tileSize,
        pixelPosMatrix: u,
        transform: o,
        params: a,
        queryPadding: this.queryPadding * s
      }, t, e) : {};
    }, Ou.prototype.querySourceFeatures = function (t, e) {
      if (this.latestFeatureIndex && this.latestFeatureIndex.rawTileData) {
        var r = this.latestFeatureIndex.loadVTLayers(),
            n = e ? e.sourceLayer : "",
            i = r._geojsonTileLayer || r[n];
        if (i) for (var a = Or(e && e.filter), o = this.tileID.canonical, s = o.z, u = o.x, l = o.y, p = {
          z: s,
          x: u,
          y: l
        }, c = 0; c < i.length; c++) {
          var h = i.feature(c);

          if (a(new Vn(this.tileID.overscaledZ), h)) {
            var f = new Tu(h, s, u, l);
            f.tile = p, t.push(f);
          }
        }
      }
    }, Ou.prototype.clearMask = function () {
      this.segments && (this.segments.destroy(), delete this.segments), this.maskedBoundsBuffer && (this.maskedBoundsBuffer.destroy(), delete this.maskedBoundsBuffer), this.maskedIndexBuffer && (this.maskedIndexBuffer.destroy(), delete this.maskedIndexBuffer);
    }, Ou.prototype.setMask = function (t, e) {
      if (!o(this.mask, t) && (this.mask = t, this.clearMask(), !o(t, {
        0: !0
      }))) {
        var r = new ri(),
            n = new vi();
        this.segments = new Fi(), this.segments.prepareSegment(0, r, n);

        for (var a = Object.keys(t), s = 0; s < a.length; s++) {
          var u = t[+a[s]],
              l = ia >> u.z,
              p = new i(u.x * l, u.y * l),
              c = new i(p.x + l, p.y + l),
              h = this.segments.prepareSegment(4, r, n);
          r.emplaceBack(p.x, p.y, p.x, p.y), r.emplaceBack(c.x, p.y, c.x, p.y), r.emplaceBack(p.x, c.y, p.x, c.y), r.emplaceBack(c.x, c.y, c.x, c.y);
          var f = h.vertexLength;
          n.emplaceBack(f, f + 1, f + 2), n.emplaceBack(f + 1, f + 2, f + 3), h.vertexLength += 4, h.primitiveLength += 2;
        }

        this.maskedBoundsBuffer = e.createVertexBuffer(r, Eu.members), this.maskedIndexBuffer = e.createIndexBuffer(n);
      }
    }, Ou.prototype.hasData = function () {
      return "loaded" === this.state || "reloading" === this.state || "expired" === this.state;
    }, Ou.prototype.patternsLoaded = function () {
      return this.imageAtlas && !!Object.keys(this.imageAtlas.patternPositions).length;
    }, Ou.prototype.setExpiryData = function (t) {
      var e = this.expirationTime;

      if (t.cacheControl) {
        var r = S(t.cacheControl);
        r["max-age"] && (this.expirationTime = Date.now() + 1e3 * r["max-age"]);
      } else t.expires && (this.expirationTime = new Date(t.expires).getTime());

      if (this.expirationTime) {
        var n = Date.now(),
            i = !1;
        if (this.expirationTime > n) i = !1;else if (e) {
          if (this.expirationTime < e) i = !0;else {
            var a = this.expirationTime - e;
            a ? this.expirationTime = n + Math.max(a, 3e4) : i = !0;
          }
        } else i = !0;
        i ? (this.expiredRequestCount++, this.state = "expired") : this.expiredRequestCount = 0;
      }
    }, Ou.prototype.getExpiryTimeout = function () {
      if (this.expirationTime) return this.expiredRequestCount ? 1e3 * (1 << Math.min(this.expiredRequestCount - 1, 31)) : Math.min(this.expirationTime - new Date().getTime(), Math.pow(2, 31) - 1);
    }, Ou.prototype.setFeatureState = function (t, e) {
      if (this.latestFeatureIndex && this.latestFeatureIndex.rawTileData && 0 !== Object.keys(t).length) {
        var r = this.latestFeatureIndex.loadVTLayers();

        for (var n in this.buckets) {
          var i = this.buckets[n],
              a = i.layers[0].sourceLayer || "_geojsonTileLayer",
              o = r[a],
              s = t[a];
          o && s && 0 !== Object.keys(s).length && (i.update(s, o, this.imageAtlas && this.imageAtlas.patternPositions || {}), e && e.style && (this.queryPadding = Math.max(this.queryPadding, e.style.getLayer(n).queryRadius(i))));
        }
      }
    }, Ou.prototype.holdingForFade = function () {
      return void 0 !== this.symbolFadeHoldUntil;
    }, Ou.prototype.symbolFadeFinished = function () {
      return !this.symbolFadeHoldUntil || this.symbolFadeHoldUntil < V.now();
    }, Ou.prototype.clearFadeHold = function () {
      this.symbolFadeHoldUntil = void 0;
    }, Ou.prototype.setHoldDuration = function (t) {
      this.symbolFadeHoldUntil = V.now() + t;
    };

    var Ru = 24,
        Uu = {
      horizontal: 1,
      vertical: 2,
      horizontalOnly: 3
    },
        ju = function () {
      this.text = "", this.sectionIndex = [], this.sections = [];
    };

    function qu(t, e, r, n, i, a, o, s, u, l) {
      var p,
          c = ju.fromFeature(t, r);
      l === Uu.vertical && c.verticalizePunctuation();
      var h = Pn.processBidirectionalText,
          f = Pn.processStyledBidirectionalText;

      if (h && 1 === c.sections.length) {
        p = [];

        for (var y = 0, d = h(c.toString(), Ju(c, s, n, e)); y < d.length; y += 1) {
          var m = d[y],
              v = new ju();
          v.text = m, v.sections = c.sections;

          for (var g = 0; g < m.length; g++) {
            v.sectionIndex.push(0);
          }

          p.push(v);
        }
      } else if (f) {
        p = [];

        for (var x = 0, b = f(c.text, c.sectionIndex, Ju(c, s, n, e)); x < b.length; x += 1) {
          var _ = b[x],
              w = new ju();
          w.text = _[0], w.sectionIndex = _[1], w.sections = c.sections, p.push(w);
        }
      } else p = function (t, e) {
        for (var r = [], n = t.text, i = 0, a = 0, o = e; a < o.length; a += 1) {
          var s = o[a];
          r.push(t.substring(i, s)), i = s;
        }

        return i < n.length && r.push(t.substring(i, n.length)), r;
      }(c, Ju(c, s, n, e));

      var A = [],
          k = {
        positionedGlyphs: A,
        text: c.toString(),
        top: u[1],
        bottom: u[1],
        left: u[0],
        right: u[0],
        writingMode: l,
        lineCount: p.length
      };
      return function (t, e, r, n, i, a, o, s) {
        for (var u = 0, l = -17, p = 0, c = t.positionedGlyphs, h = "right" === a ? 1 : "left" === a ? 0 : .5, f = 0, y = r; f < y.length; f += 1) {
          var d = y[f];
          d.trim();
          var m = d.getMaxScale();

          if (d.length()) {
            for (var v = c.length, g = 0; g < d.length(); g++) {
              var x = d.getSection(g),
                  b = d.getCharCode(g),
                  _ = 24 * (m - x.scale),
                  w = e[x.fontStack],
                  A = w && w[b];

              A && (Sn(b) && o !== Uu.horizontal ? (c.push({
                glyph: b,
                x: u,
                y: _,
                vertical: !0,
                scale: x.scale,
                fontStack: x.fontStack
              }), u += Ru * x.scale + s) : (c.push({
                glyph: b,
                x: u,
                y: l + _,
                vertical: !1,
                scale: x.scale,
                fontStack: x.fontStack
              }), u += A.metrics.advance * x.scale + s));
            }

            if (c.length !== v) {
              var k = u - s;
              p = Math.max(k, p), Yu(c, e, v, c.length - 1, h);
            }

            u = 0, l += n * m;
          } else l += n;
        }

        var S = Hu(i),
            z = S.horizontalAlign,
            I = S.verticalAlign;
        !function (t, e, r, n, i, a, o) {
          for (var s = (e - r) * i, u = (-n * o + .5) * a, l = 0; l < t.length; l++) {
            t[l].x += s, t[l].y += u;
          }
        }(c, h, z, I, p, n, r.length);
        var B = l - -17;
        t.top += -I * B, t.bottom = t.top + B, t.left += -z * p, t.right = t.left + p;
      }(k, e, p, i, a, o, l, s), !!A.length && k;
    }

    ju.fromFeature = function (t, e) {
      for (var r = new ju(), n = 0; n < t.sections.length; n++) {
        var i = t.sections[n];
        r.sections.push({
          scale: i.scale || 1,
          fontStack: i.fontStack || e
        }), r.text += i.text;

        for (var a = 0; a < i.text.length; a++) {
          r.sectionIndex.push(n);
        }
      }

      return r;
    }, ju.prototype.length = function () {
      return this.text.length;
    }, ju.prototype.getSection = function (t) {
      return this.sections[this.sectionIndex[t]];
    }, ju.prototype.getCharCode = function (t) {
      return this.text.charCodeAt(t);
    }, ju.prototype.verticalizePunctuation = function () {
      this.text = function (t) {
        for (var e = "", r = 0; r < t.length; r++) {
          var n = t.charCodeAt(r + 1) || null,
              i = t.charCodeAt(r - 1) || null;
          n && zn(n) && !fs[t[r + 1]] || i && zn(i) && !fs[t[r - 1]] || !fs[t[r]] ? e += t[r] : e += fs[t[r]];
        }

        return e;
      }(this.text);
    }, ju.prototype.trim = function () {
      for (var t = 0, e = 0; e < this.text.length && Nu[this.text.charCodeAt(e)]; e++) {
        t++;
      }

      for (var r = this.text.length, n = this.text.length - 1; n >= 0 && n >= t && Nu[this.text.charCodeAt(n)]; n--) {
        r--;
      }

      this.text = this.text.substring(t, r), this.sectionIndex = this.sectionIndex.slice(t, r);
    }, ju.prototype.substring = function (t, e) {
      var r = new ju();
      return r.text = this.text.substring(t, e), r.sectionIndex = this.sectionIndex.slice(t, e), r.sections = this.sections, r;
    }, ju.prototype.toString = function () {
      return this.text;
    }, ju.prototype.getMaxScale = function () {
      var t = this;
      return this.sectionIndex.reduce(function (e, r) {
        return Math.max(e, t.sections[r].scale);
      }, 0);
    };
    var Nu = {
      9: !0,
      10: !0,
      11: !0,
      12: !0,
      13: !0,
      32: !0
    },
        Ku = {};

    function Zu(t, e, r, n) {
      var i = Math.pow(t - e, 2);
      return n ? t < e ? i / 2 : 2 * i : i + Math.abs(r) * r;
    }

    function Gu(t, e, r) {
      var n = 0;
      return 10 === t && (n -= 1e4), r && (n += 150), 40 !== t && 65288 !== t || (n += 50), 41 !== e && 65289 !== e || (n += 50), n;
    }

    function Xu(t, e, r, n, i, a) {
      for (var o = null, s = Zu(e, r, i, a), u = 0, l = n; u < l.length; u += 1) {
        var p = l[u],
            c = Zu(e - p.x, r, i, a) + p.badness;
        c <= s && (o = p, s = c);
      }

      return {
        index: t,
        x: e,
        priorBreak: o,
        badness: s
      };
    }

    function Ju(t, e, r, n) {
      if (!r) return [];
      if (!t) return [];

      for (var i, a = [], o = function (t, e, r, n) {
        for (var i = 0, a = 0; a < t.length(); a++) {
          var o = t.getSection(a),
              s = n[o.fontStack],
              u = s && s[t.getCharCode(a)];
          u && (i += u.metrics.advance * o.scale + e);
        }

        return i / Math.max(1, Math.ceil(i / r));
      }(t, e, r, n), s = t.text.indexOf("​") >= 0, u = 0, l = 0; l < t.length(); l++) {
        var p = t.getSection(l),
            c = t.getCharCode(l),
            h = n[p.fontStack],
            f = h && h[c];

        if (f && !Nu[c] && (u += f.metrics.advance * p.scale + e), l < t.length() - 1) {
          var y = !!(!((i = c) < 11904) && (_n["Bopomofo Extended"](i) || _n.Bopomofo(i) || _n["CJK Compatibility Forms"](i) || _n["CJK Compatibility Ideographs"](i) || _n["CJK Compatibility"](i) || _n["CJK Radicals Supplement"](i) || _n["CJK Strokes"](i) || _n["CJK Symbols and Punctuation"](i) || _n["CJK Unified Ideographs Extension A"](i) || _n["CJK Unified Ideographs"](i) || _n["Enclosed CJK Letters and Months"](i) || _n["Halfwidth and Fullwidth Forms"](i) || _n.Hiragana(i) || _n["Ideographic Description Characters"](i) || _n["Kangxi Radicals"](i) || _n["Katakana Phonetic Extensions"](i) || _n.Katakana(i) || _n["Vertical Forms"](i) || _n["Yi Radicals"](i) || _n["Yi Syllables"](i)));
          (Ku[c] || y) && a.push(Xu(l + 1, u, o, a, Gu(c, t.getCharCode(l + 1), y && s), !1));
        }
      }

      return function t(e) {
        return e ? t(e.priorBreak).concat(e.index) : [];
      }(Xu(t.length(), u, o, a, 0, !0));
    }

    function Hu(t) {
      var e = .5,
          r = .5;

      switch (t) {
        case "right":
        case "top-right":
        case "bottom-right":
          e = 1;
          break;

        case "left":
        case "top-left":
        case "bottom-left":
          e = 0;
      }

      switch (t) {
        case "bottom":
        case "bottom-right":
        case "bottom-left":
          r = 1;
          break;

        case "top":
        case "top-right":
        case "top-left":
          r = 0;
      }

      return {
        horizontalAlign: e,
        verticalAlign: r
      };
    }

    function Yu(t, e, r, n, i) {
      if (i) {
        var a = t[n],
            o = e[a.fontStack],
            s = o && o[a.glyph];
        if (s) for (var u = s.metrics.advance * a.scale, l = (t[n].x + u) * i, p = r; p <= n; p++) {
          t[p].x -= l;
        }
      }
    }

    function $u(t, e, r) {
      var n = Hu(r),
          i = n.horizontalAlign,
          a = n.verticalAlign,
          o = e[0],
          s = e[1],
          u = o - t.displaySize[0] * i,
          l = u + t.displaySize[0],
          p = s - t.displaySize[1] * a;
      return {
        image: t,
        top: p,
        bottom: p + t.displaySize[1],
        left: u,
        right: l
      };
    }

    function Wu(t, e, r, n, i) {
      if (void 0 === e.segment) return !0;

      for (var a = e, o = e.segment + 1, s = 0; s > -r / 2;) {
        if (--o < 0) return !1;
        s -= t[o].dist(a), a = t[o];
      }

      s += t[o].dist(t[o + 1]), o++;

      for (var u = [], l = 0; s < r / 2;) {
        var p = t[o - 1],
            c = t[o],
            h = t[o + 1];
        if (!h) return !1;
        var f = p.angleTo(c) - c.angleTo(h);

        for (f = Math.abs((f + 3 * Math.PI) % (2 * Math.PI) - Math.PI), u.push({
          distance: s,
          angleDelta: f
        }), l += f; s - u[0].distance > n;) {
          l -= u.shift().angleDelta;
        }

        if (l > i) return !1;
        o++, s += c.dist(h);
      }

      return !0;
    }

    function Qu(t) {
      for (var e = 0, r = 0; r < t.length - 1; r++) {
        e += t[r].dist(t[r + 1]);
      }

      return e;
    }

    function tl(t, e, r) {
      return t ? .6 * e * r : 0;
    }

    function el(t, e) {
      return Math.max(t ? t.right - t.left : 0, e ? e.right - e.left : 0);
    }

    function rl(t, e, r, n, i, a) {
      for (var o = tl(r, i, a), s = el(r, n) * a, u = 0, l = Qu(t) / 2, p = 0; p < t.length - 1; p++) {
        var c = t[p],
            h = t[p + 1],
            f = c.dist(h);

        if (u + f > l) {
          var y = (l - u) / f,
              d = be(c.x, h.x, y),
              m = be(c.y, h.y, y),
              v = new ys(d, m, h.angleTo(c), p);
          return v._round(), !o || Wu(t, v, s, o, e) ? v : void 0;
        }

        u += f;
      }
    }

    function nl(t, e, r, n, i, a, o, s, u) {
      var l = tl(n, a, o),
          p = el(n, i),
          c = p * o,
          h = 0 === t[0].x || t[0].x === u || 0 === t[0].y || t[0].y === u;
      return e - c < e / 4 && (e = c + e / 4), function t(e, r, n, i, a, o, s, u, l) {
        var p = o / 2;
        var c = Qu(e);
        var h = 0,
            f = r - n;
        var y = [];

        for (var d = 0; d < e.length - 1; d++) {
          for (var m = e[d], v = e[d + 1], g = m.dist(v), x = v.angleTo(m); f + n < h + g;) {
            var b = ((f += n) - h) / g,
                _ = be(m.x, v.x, b),
                w = be(m.y, v.y, b);

            if (_ >= 0 && _ < l && w >= 0 && w < l && f - p >= 0 && f + p <= c) {
              var A = new ys(_, w, x, d);
              A._round(), i && !Wu(e, A, o, i, a) || y.push(A);
            }
          }

          h += g;
        }

        u || y.length || s || (y = t(e, h / 2, n, i, a, o, s, !0, l));
        return y;
      }(t, h ? e / 2 * s % e : (p / 2 + 2 * a) * o * s % e, e, l, r, c, h, !1, u);
    }

    Ku[10] = !0, Ku[32] = !0, Ku[38] = !0, Ku[40] = !0, Ku[41] = !0, Ku[43] = !0, Ku[45] = !0, Ku[47] = !0, Ku[173] = !0, Ku[183] = !0, Ku[8203] = !0, Ku[8208] = !0, Ku[8211] = !0, Ku[8231] = !0;

    var il = function (t, e, r, n, a, o, s, u, l, p, c, h) {
      var f = s.top * u - l,
          y = s.bottom * u + l,
          d = s.left * u - l,
          m = s.right * u + l;

      if (this.boxStartIndex = t.length, p) {
        var v = y - f,
            g = m - d;
        v > 0 && (v = Math.max(10 * u, v), this._addLineCollisionCircles(t, e, r, r.segment, g, v, n, a, o, c));
      } else {
        if (h) {
          var x = new i(d, f),
              b = new i(m, f),
              _ = new i(d, y),
              w = new i(m, y),
              A = h * Math.PI / 180;

          x._rotate(A), b._rotate(A), _._rotate(A), w._rotate(A), d = Math.min(x.x, b.x, _.x, w.x), m = Math.max(x.x, b.x, _.x, w.x), f = Math.min(x.y, b.y, _.y, w.y), y = Math.max(x.y, b.y, _.y, w.y);
        }

        t.emplaceBack(r.x, r.y, d, f, m, y, n, a, o, 0, 0);
      }

      this.boxEndIndex = t.length;
    };

    il.prototype._addLineCollisionCircles = function (t, e, r, n, i, a, o, s, u, l) {
      var p = a / 2,
          c = Math.floor(i / p) || 1,
          h = 1 + .4 * Math.log(l) / Math.LN2,
          f = Math.floor(c * h / 2),
          y = -a / 2,
          d = r,
          m = n + 1,
          v = y,
          g = -i / 2,
          x = g - i / 4;

      do {
        if (--m < 0) {
          if (v > g) return;
          m = 0;
          break;
        }

        v -= e[m].dist(d), d = e[m];
      } while (v > x);

      for (var b = e[m].dist(e[m + 1]), _ = -f; _ < c + f; _++) {
        var w = _ * p,
            A = g + w;

        if (w < 0 && (A += w), w > i && (A += w - i), !(A < v)) {
          for (; v + b < A;) {
            if (v += b, ++m + 1 >= e.length) return;
            b = e[m].dist(e[m + 1]);
          }

          var k = A - v,
              S = e[m],
              z = e[m + 1].sub(S)._unit()._mult(k)._add(S)._round(),
              I = Math.abs(A - y) < p ? 0 : .8 * (A - y);

          t.emplaceBack(z.x, z.y, -a / 2, -a / 2, a / 2, a / 2, o, s, u, a / 2, I);
        }
      }
    };

    var al = function (t, e) {
      if (void 0 === t && (t = []), void 0 === e && (e = ol), this.data = t, this.length = this.data.length, this.compare = e, this.length > 0) for (var r = (this.length >> 1) - 1; r >= 0; r--) {
        this._down(r);
      }
    };

    function ol(t, e) {
      return t < e ? -1 : t > e ? 1 : 0;
    }

    function sl(t, e, r) {
      void 0 === e && (e = 1), void 0 === r && (r = !1);

      for (var n = 1 / 0, a = 1 / 0, o = -1 / 0, s = -1 / 0, u = t[0], l = 0; l < u.length; l++) {
        var p = u[l];
        (!l || p.x < n) && (n = p.x), (!l || p.y < a) && (a = p.y), (!l || p.x > o) && (o = p.x), (!l || p.y > s) && (s = p.y);
      }

      var c = o - n,
          h = s - a,
          f = Math.min(c, h),
          y = f / 2,
          d = new al([], ul);
      if (0 === f) return new i(n, a);

      for (var m = n; m < o; m += f) {
        for (var v = a; v < s; v += f) {
          d.push(new ll(m + y, v + y, y, t));
        }
      }

      for (var g = function (t) {
        for (var e = 0, r = 0, n = 0, i = t[0], a = 0, o = i.length, s = o - 1; a < o; s = a++) {
          var u = i[a],
              l = i[s],
              p = u.x * l.y - l.x * u.y;
          r += (u.x + l.x) * p, n += (u.y + l.y) * p, e += 3 * p;
        }

        return new ll(r / e, n / e, 0, t);
      }(t), x = d.length; d.length;) {
        var b = d.pop();
        (b.d > g.d || !g.d) && (g = b, r && console.log("found best %d after %d probes", Math.round(1e4 * b.d) / 1e4, x)), b.max - g.d <= e || (y = b.h / 2, d.push(new ll(b.p.x - y, b.p.y - y, y, t)), d.push(new ll(b.p.x + y, b.p.y - y, y, t)), d.push(new ll(b.p.x - y, b.p.y + y, y, t)), d.push(new ll(b.p.x + y, b.p.y + y, y, t)), x += 4);
      }

      return r && (console.log("num probes: " + x), console.log("best distance: " + g.d)), g.p;
    }

    function ul(t, e) {
      return e.max - t.max;
    }

    function ll(t, e, r, n) {
      this.p = new i(t, e), this.h = r, this.d = function (t, e) {
        for (var r = !1, n = 1 / 0, i = 0; i < e.length; i++) {
          for (var a = e[i], o = 0, s = a.length, u = s - 1; o < s; u = o++) {
            var l = a[o],
                p = a[u];
            l.y > t.y != p.y > t.y && t.x < (p.x - l.x) * (t.y - l.y) / (p.y - l.y) + l.x && (r = !r), n = Math.min(n, va(t, l, p));
          }
        }

        return (r ? 1 : -1) * Math.sqrt(n);
      }(this.p, n), this.max = this.d + this.h * Math.SQRT2;
    }

    al.prototype.push = function (t) {
      this.data.push(t), this.length++, this._up(this.length - 1);
    }, al.prototype.pop = function () {
      if (0 !== this.length) {
        var t = this.data[0];
        return this.length--, this.length > 0 && (this.data[0] = this.data[this.length], this._down(0)), this.data.pop(), t;
      }
    }, al.prototype.peek = function () {
      return this.data[0];
    }, al.prototype._up = function (t) {
      for (var e = this.data, r = this.compare, n = e[t]; t > 0;) {
        var i = t - 1 >> 1,
            a = e[i];
        if (r(n, a) >= 0) break;
        e[t] = a, t = i;
      }

      e[t] = n;
    }, al.prototype._down = function (t) {
      for (var e = this.data, r = this.compare, n = this.length >> 1, i = e[t]; t < n;) {
        var a = 1 + (t << 1),
            o = e[a],
            s = a + 1;
        if (s < this.length && r(e[s], o) < 0 && (a = s, o = e[s]), r(o, i) >= 0) break;
        e[t] = o, t = a;
      }

      e[t] = i;
    };
    var pl = e(function (t) {
      t.exports = function (t, e) {
        var r, n, i, a, o, s, u, l;

        for (r = 3 & t.length, n = t.length - r, i = e, o = 3432918353, s = 461845907, l = 0; l < n;) {
          u = 255 & t.charCodeAt(l) | (255 & t.charCodeAt(++l)) << 8 | (255 & t.charCodeAt(++l)) << 16 | (255 & t.charCodeAt(++l)) << 24, ++l, i = 27492 + (65535 & (a = 5 * (65535 & (i = (i ^= u = (65535 & (u = (u = (65535 & u) * o + (((u >>> 16) * o & 65535) << 16) & 4294967295) << 15 | u >>> 17)) * s + (((u >>> 16) * s & 65535) << 16) & 4294967295) << 13 | i >>> 19)) + ((5 * (i >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (a >>> 16) & 65535) << 16);
        }

        switch (u = 0, r) {
          case 3:
            u ^= (255 & t.charCodeAt(l + 2)) << 16;

          case 2:
            u ^= (255 & t.charCodeAt(l + 1)) << 8;

          case 1:
            i ^= u = (65535 & (u = (u = (65535 & (u ^= 255 & t.charCodeAt(l))) * o + (((u >>> 16) * o & 65535) << 16) & 4294967295) << 15 | u >>> 17)) * s + (((u >>> 16) * s & 65535) << 16) & 4294967295;
        }

        return i ^= t.length, i = 2246822507 * (65535 & (i ^= i >>> 16)) + ((2246822507 * (i >>> 16) & 65535) << 16) & 4294967295, i = 3266489909 * (65535 & (i ^= i >>> 13)) + ((3266489909 * (i >>> 16) & 65535) << 16) & 4294967295, (i ^= i >>> 16) >>> 0;
      };
    }),
        cl = e(function (t) {
      t.exports = function (t, e) {
        for (var r, n = t.length, i = e ^ n, a = 0; n >= 4;) {
          r = 1540483477 * (65535 & (r = 255 & t.charCodeAt(a) | (255 & t.charCodeAt(++a)) << 8 | (255 & t.charCodeAt(++a)) << 16 | (255 & t.charCodeAt(++a)) << 24)) + ((1540483477 * (r >>> 16) & 65535) << 16), i = 1540483477 * (65535 & i) + ((1540483477 * (i >>> 16) & 65535) << 16) ^ (r = 1540483477 * (65535 & (r ^= r >>> 24)) + ((1540483477 * (r >>> 16) & 65535) << 16)), n -= 4, ++a;
        }

        switch (n) {
          case 3:
            i ^= (255 & t.charCodeAt(a + 2)) << 16;

          case 2:
            i ^= (255 & t.charCodeAt(a + 1)) << 8;

          case 1:
            i = 1540483477 * (65535 & (i ^= 255 & t.charCodeAt(a))) + ((1540483477 * (i >>> 16) & 65535) << 16);
        }

        return i = 1540483477 * (65535 & (i ^= i >>> 13)) + ((1540483477 * (i >>> 16) & 65535) << 16), (i ^= i >>> 15) >>> 0;
      };
    }),
        hl = pl,
        fl = pl,
        yl = cl;
    hl.murmur3 = fl, hl.murmur2 = yl;
    var dl = 7;

    function ml(t, e) {
      var r = 0,
          n = 0,
          i = e / Math.sqrt(2);

      switch (t) {
        case "top-right":
        case "top-left":
          n = i - dl;
          break;

        case "bottom-right":
        case "bottom-left":
          n = -i + dl;
          break;

        case "bottom":
          n = -e + dl;
          break;

        case "top":
          n = e - dl;
      }

      switch (t) {
        case "top-right":
        case "bottom-right":
          r = -i;
          break;

        case "top-left":
        case "bottom-left":
          r = i;
          break;

        case "left":
          r = e;
          break;

        case "right":
          r = -e;
      }

      return [r, n];
    }

    function vl(t) {
      switch (t) {
        case "right":
        case "top-right":
        case "bottom-right":
          return "right";

        case "left":
        case "top-left":
        case "bottom-left":
          return "left";
      }

      return "center";
    }

    function gl(t, e, r, n, a, o, s) {
      var u = o.layoutTextSize.evaluate(e, {}),
          l = o.layoutIconSize.evaluate(e, {}),
          p = o.textMaxSize.evaluate(e, {});
      void 0 === p && (p = u);

      var c = t.layers[0].layout,
          h = c.get("icon-offset").evaluate(e, {}),
          f = _l(r.horizontal),
          y = u / 24,
          d = t.tilePixelRatio * y,
          m = t.tilePixelRatio * p / 24,
          v = t.tilePixelRatio * l,
          g = t.tilePixelRatio * c.get("symbol-spacing"),
          x = c.get("text-padding") * t.tilePixelRatio,
          b = c.get("icon-padding") * t.tilePixelRatio,
          _ = c.get("text-max-angle") / 180 * Math.PI,
          A = "map" === c.get("text-rotation-alignment") && "point" !== c.get("symbol-placement"),
          k = "map" === c.get("icon-rotation-alignment") && "point" !== c.get("symbol-placement"),
          S = c.get("symbol-placement"),
          z = g / 2,
          I = function (u, l) {
        l.x < 0 || l.x >= ia || l.y < 0 || l.y >= ia || function (t, e, r, n, a, o, s, u, l, p, c, h, f, y, d, m, v, g, x, b, _) {
          var A,
              k,
              S = t.addToLineVertexArray(e, r),
              z = 0,
              I = 0,
              B = 0,
              C = {},
              E = hl(""),
              M = (o.layout.get("text-radial-offset").evaluate(x, {}) || 0) * Ru;

          for (var T in n.horizontal) {
            var P = n.horizontal[T];

            if (!A) {
              E = hl(P.text);
              var V = o.layout.get("text-rotate").evaluate(x, {});
              A = new il(s, r, e, u, l, p, P, c, h, f, t.overscaling, V);
            }

            var F = 1 === P.lineCount;
            if (I += bl(t, e, P, o, f, x, y, S, n.vertical ? Uu.horizontal : Uu.horizontalOnly, F ? Object.keys(n.horizontal) : [T], C, b, _), F) break;
          }

          n.vertical && (B += bl(t, e, n.vertical, o, f, x, y, S, Uu.vertical, ["vertical"], C, b, _));
          var L = A ? A.boxStartIndex : t.collisionBoxArray.length,
              D = A ? A.boxEndIndex : t.collisionBoxArray.length;

          if (a) {
            var O = function (t, e, r, n, a, o) {
              var s,
                  u,
                  l,
                  p,
                  c = e.image,
                  h = r.layout,
                  f = e.top - 1 / c.pixelRatio,
                  y = e.left - 1 / c.pixelRatio,
                  d = e.bottom + 1 / c.pixelRatio,
                  m = e.right + 1 / c.pixelRatio;

              if ("none" !== h.get("icon-text-fit") && a) {
                var v = m - y,
                    g = d - f,
                    x = h.get("text-size").evaluate(o, {}) / 24,
                    b = a.left * x,
                    _ = a.right * x,
                    w = a.top * x,
                    A = _ - b,
                    k = a.bottom * x - w,
                    S = h.get("icon-text-fit-padding")[0],
                    z = h.get("icon-text-fit-padding")[1],
                    I = h.get("icon-text-fit-padding")[2],
                    B = h.get("icon-text-fit-padding")[3],
                    C = "width" === h.get("icon-text-fit") ? .5 * (k - g) : 0,
                    E = "height" === h.get("icon-text-fit") ? .5 * (A - v) : 0,
                    M = "width" === h.get("icon-text-fit") || "both" === h.get("icon-text-fit") ? A : v,
                    T = "height" === h.get("icon-text-fit") || "both" === h.get("icon-text-fit") ? k : g;

                s = new i(b + E - B, w + C - S), u = new i(b + E + z + M, w + C - S), l = new i(b + E + z + M, w + C + I + T), p = new i(b + E - B, w + C + I + T);
              } else s = new i(y, f), u = new i(m, f), l = new i(m, d), p = new i(y, d);

              var P = r.layout.get("icon-rotate").evaluate(o, {}) * Math.PI / 180;

              if (P) {
                var V = Math.sin(P),
                    F = Math.cos(P),
                    L = [F, -V, V, F];
                s._matMult(L), u._matMult(L), p._matMult(L), l._matMult(L);
              }

              return [{
                tl: s,
                tr: u,
                bl: p,
                br: l,
                tex: c.paddedRect,
                writingMode: void 0,
                glyphOffset: [0, 0]
              }];
            }(0, a, o, 0, _l(n.horizontal), x),
                R = o.layout.get("icon-rotate").evaluate(x, {});

            k = new il(s, r, e, u, l, p, a, d, m, !1, t.overscaling, R), z = 4 * O.length;
            var U = t.iconSizeData,
                j = null;
            "source" === U.kind ? (j = [ds * o.layout.get("icon-size").evaluate(x, {})])[0] > xl && w(t.layerIds[0] + ': Value for "icon-size" is >= 256. Reduce your "icon-size".') : "composite" === U.kind && ((j = [ds * _.compositeIconSizes[0].evaluate(x, {}), ds * _.compositeIconSizes[1].evaluate(x, {})])[0] > xl || j[1] > xl) && w(t.layerIds[0] + ': Value for "icon-size" is >= 256. Reduce your "icon-size".'), t.addSymbols(t.icon, O, j, g, v, x, !1, e, S.lineStartIndex, S.lineLength);
          }

          var q = k ? k.boxStartIndex : t.collisionBoxArray.length,
              N = k ? k.boxEndIndex : t.collisionBoxArray.length;
          t.glyphOffsetArray.length >= zs.MAX_GLYPHS && w("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907");
          t.symbolInstances.emplaceBack(e.x, e.y, C.right >= 0 ? C.right : -1, C.center >= 0 ? C.center : -1, C.left >= 0 ? C.left : -1, C.vertical || -1, E, L, D, q, N, u, I, B, z, 0, c, M);
        }(t, l, u, r, n, t.layers[0], t.collisionBoxArray, e.index, e.sourceLayerIndex, t.index, d, x, A, s, v, b, k, h, e, a, o);
      };

      if ("line" === S) for (var B = 0, C = function (t, e, r, n, a) {
        for (var o = [], s = 0; s < t.length; s++) {
          for (var u = t[s], l = void 0, p = 0; p < u.length - 1; p++) {
            var c = u[p],
                h = u[p + 1];
            c.x < e && h.x < e || (c.x < e ? c = new i(e, c.y + (h.y - c.y) * ((e - c.x) / (h.x - c.x)))._round() : h.x < e && (h = new i(e, c.y + (h.y - c.y) * ((e - c.x) / (h.x - c.x)))._round()), c.y < r && h.y < r || (c.y < r ? c = new i(c.x + (h.x - c.x) * ((r - c.y) / (h.y - c.y)), r)._round() : h.y < r && (h = new i(c.x + (h.x - c.x) * ((r - c.y) / (h.y - c.y)), r)._round()), c.x >= n && h.x >= n || (c.x >= n ? c = new i(n, c.y + (h.y - c.y) * ((n - c.x) / (h.x - c.x)))._round() : h.x >= n && (h = new i(n, c.y + (h.y - c.y) * ((n - c.x) / (h.x - c.x)))._round()), c.y >= a && h.y >= a || (c.y >= a ? c = new i(c.x + (h.x - c.x) * ((a - c.y) / (h.y - c.y)), a)._round() : h.y >= a && (h = new i(c.x + (h.x - c.x) * ((a - c.y) / (h.y - c.y)), a)._round()), l && c.equals(l[l.length - 1]) || (l = [c], o.push(l)), l.push(h)))));
          }
        }

        return o;
      }(e.geometry, 0, 0, ia, ia); B < C.length; B += 1) {
        for (var E = C[B], M = 0, T = nl(E, g, _, r.vertical || f, n, 24, m, t.overscaling, ia); M < T.length; M += 1) {
          var P = T[M];
          f && wl(t, f.text, z, P) || I(E, P);
        }
      } else if ("line-center" === S) for (var V = 0, F = e.geometry; V < F.length; V += 1) {
        var L = F[V];

        if (L.length > 1) {
          var D = rl(L, _, r.vertical || f, n, 24, m);
          D && I(L, D);
        }
      } else if ("Polygon" === e.type) for (var O = 0, R = xo(e.geometry, 0); O < R.length; O += 1) {
        var U = R[O],
            j = sl(U, 16);
        I(U[0], new ys(j.x, j.y, 0));
      } else if ("LineString" === e.type) for (var q = 0, N = e.geometry; q < N.length; q += 1) {
        var K = N[q];
        I(K, new ys(K[0].x, K[0].y, 0));
      } else if ("Point" === e.type) for (var Z = 0, G = e.geometry; Z < G.length; Z += 1) {
        for (var X = 0, J = G[Z]; X < J.length; X += 1) {
          var H = J[X];
          I([H], new ys(H.x, H.y, 0));
        }
      }
    }

    var xl = 65535;

    function bl(t, e, r, n, a, o, s, u, l, p, c, h, f) {
      var y = function (t, e, r, n, a, o, s) {
        for (var u = n.layout.get("text-rotate").evaluate(o, {}) * Math.PI / 180, l = e.positionedGlyphs, p = [], c = 0; c < l.length; c++) {
          var h = l[c],
              f = s[h.fontStack],
              y = f && f[h.glyph];

          if (y) {
            var d = y.rect;

            if (d) {
              var m = yu + 1,
                  v = y.metrics.advance * h.scale / 2,
                  g = a ? [h.x + v, h.y] : [0, 0],
                  x = a ? [0, 0] : [h.x + v + r[0], h.y + r[1]],
                  b = (y.metrics.left - m) * h.scale - v + x[0],
                  _ = (-y.metrics.top - m) * h.scale + x[1],
                  w = b + d.w * h.scale,
                  A = _ + d.h * h.scale,
                  k = new i(b, _),
                  S = new i(w, _),
                  z = new i(b, A),
                  I = new i(w, A);

              if (a && h.vertical) {
                var B = new i(-v, v),
                    C = -Math.PI / 2,
                    E = new i(5, 0);
                k._rotateAround(C, B)._add(E), S._rotateAround(C, B)._add(E), z._rotateAround(C, B)._add(E), I._rotateAround(C, B)._add(E);
              }

              if (u) {
                var M = Math.sin(u),
                    T = Math.cos(u),
                    P = [T, -M, M, T];
                k._matMult(P), S._matMult(P), z._matMult(P), I._matMult(P);
              }

              p.push({
                tl: k,
                tr: S,
                bl: z,
                br: I,
                tex: d,
                writingMode: e.writingMode,
                glyphOffset: g
              });
            }
          }
        }

        return p;
      }(0, r, s, n, a, o, h),
          d = t.textSizeData,
          m = null;

      "source" === d.kind ? (m = [ds * n.layout.get("text-size").evaluate(o, {})])[0] > xl && w(t.layerIds[0] + ': Value for "text-size" is >= 256. Reduce your "text-size".') : "composite" === d.kind && ((m = [ds * f.compositeTextSizes[0].evaluate(o, {}), ds * f.compositeTextSizes[1].evaluate(o, {})])[0] > xl || m[1] > xl) && w(t.layerIds[0] + ': Value for "text-size" is >= 256. Reduce your "text-size".'), t.addSymbols(t.text, y, m, s, a, o, l, e, u.lineStartIndex, u.lineLength);

      for (var v = 0, g = p; v < g.length; v += 1) {
        c[g[v]] = t.text.placedSymbolArray.length - 1;
      }

      return 4 * y.length;
    }

    function _l(t) {
      for (var e in t) {
        return t[e];
      }

      return null;
    }

    function wl(t, e, r, n) {
      var i = t.compareText;

      if (e in i) {
        for (var a = i[e], o = a.length - 1; o >= 0; o--) {
          if (n.dist(a[o]) < r) return !0;
        }
      } else i[e] = [];

      return i[e].push(n), !1;
    }

    t.Actor = du, t.AlphaImage = La, t.CanonicalTileID = Su, t.CollisionBoxArray = Ai, t.Color = Ht, t.DEMData = Cu, t.DataConstantProperty = Nn, t.DictionaryCoder = Mu, t.EXTENT = ia, t.ErrorEvent = kt, t.EvaluationParameters = Vn, t.Event = At, t.Evented = St, t.FeatureIndex = Fu, t.FillBucket = Ao, t.FillExtrusionBucket = Uo, t.ImageAtlas = Rs, t.ImagePosition = Ds, t.LineBucket = ts, t.LngLat = gu, t.LngLatBounds = vu, t.MercatorCoordinate = ku, t.ONE_EM = Ru, t.OverscaledTileID = Iu, t.Point = i, t.Point$1 = i, t.ProgramConfiguration = ta, t.Properties = Jn, t.Protobuf = Xs, t.RGBAImage = Da, t.RequestManager = j, t.ResourceType = pt, t.SegmentVector = Fi, t.SourceFeatureState = Vu, t.StructArrayLayout1ui2 = xi, t.StructArrayLayout2i4 = ei, t.StructArrayLayout2ui4 = gi, t.StructArrayLayout3ui6 = vi, t.StructArrayLayout4i8 = ri, t.SymbolBucket = zs, t.Texture = Ks, t.Tile = Ou, t.Transitionable = Dn, t.Uniform1f = ji, t.Uniform1i = Ui, t.Uniform2f = qi, t.Uniform3f = Ni, t.Uniform4f = Ki, t.UniformColor = Zi, t.UniformMatrix4f = Xi, t.UnwrappedTileID = zu, t.ValidationError = It, t.WritingMode = Uu, t.ZoomHistory = bn, t.addDynamicAttributes = As, t.asyncAll = function (t, e, r) {
      if (!t.length) return r(null, []);
      var n = t.length,
          i = new Array(t.length),
          a = null;
      t.forEach(function (t, o) {
        e(t, function (t, e) {
          t && (a = t), i[o] = e, 0 == --n && r(a, i);
        });
      });
    }, t.bezier = s, t.bindAll = m, t.browser = V, t.cacheEntryPossiblyAdded = function (t) {
      ++lt > it && (t.send("enforceCacheSizeLimit", nt), lt = 0);
    }, t.clamp = l, t.clearTileCache = function (t) {
      var e = self.caches.delete(rt);
      t && e.catch(t).then(function () {
        return t();
      });
    }, t.clone = function (t) {
      var e = new za(16);
      return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
    }, t.clone$1 = b, t.config = F, t.create = function () {
      var t = new za(16);
      return za != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0), t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t;
    }, t.create$1 = function () {
      var t = new za(9);
      return za != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[5] = 0, t[6] = 0, t[7] = 0), t[0] = 1, t[4] = 1, t[8] = 1, t;
    }, t.create$2 = function () {
      var t = new za(4);
      return za != Float32Array && (t[1] = 0, t[2] = 0), t[0] = 1, t[3] = 1, t;
    }, t.createCommonjsModule = e, t.createExpression = Sr, t.createLayout = Qn, t.createStyleLayer = function (t) {
      return "custom" === t.type ? new Vs(t) : new Fs[t.type](t);
    }, t.deepEqual = o, t.ease = u, t.emitValidationErrors = pn, t.endsWith = v, t.enforceCacheSizeLimit = function (t) {
      self.caches && self.caches.open(rt).then(function (e) {
        e.keys().then(function (r) {
          for (var n = 0; n < r.length - t; n++) {
            e.delete(r[n]);
          }
        });
      });
    }, t.evaluateRadialOffset = ml, t.evaluateSizeForFeature = vs, t.evaluateSizeForZoom = gs, t.evented = Tn, t.extend = c, t.featureFilter = Or, t.filterObject = x, t.fromRotation = function (t, e) {
      var r = Math.sin(e),
          n = Math.cos(e);
      return t[0] = n, t[1] = r, t[2] = 0, t[3] = -r, t[4] = n, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    }, t.getAnchorAlignment = Hu, t.getAnchorJustification = vl, t.getArrayBuffer = mt, t.getImage = bt, t.getJSON = function (t, e) {
      return dt(c(t, {
        type: "json"
      }), e);
    }, t.getReferrer = ft, t.getVideo = function (t, e) {
      var r,
          n,
          i = self.document.createElement("video");
      i.muted = !0, i.onloadstart = function () {
        e(null, i);
      };

      for (var a = 0; a < t.length; a++) {
        var o = self.document.createElement("source");
        r = t[a], n = void 0, (n = self.document.createElement("a")).href = r, (n.protocol !== self.document.location.protocol || n.host !== self.document.location.host) && (i.crossOrigin = "Anonymous"), o.src = t[a], i.appendChild(o);
      }

      return {
        cancel: function () {}
      };
    }, t.identity = function (t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, t.invert = function (t, e) {
      var r = e[0],
          n = e[1],
          i = e[2],
          a = e[3],
          o = e[4],
          s = e[5],
          u = e[6],
          l = e[7],
          p = e[8],
          c = e[9],
          h = e[10],
          f = e[11],
          y = e[12],
          d = e[13],
          m = e[14],
          v = e[15],
          g = r * s - n * o,
          x = r * u - i * o,
          b = r * l - a * o,
          _ = n * u - i * s,
          w = n * l - a * s,
          A = i * l - a * u,
          k = p * d - c * y,
          S = p * m - h * y,
          z = p * v - f * y,
          I = c * m - h * d,
          B = c * v - f * d,
          C = h * v - f * m,
          E = g * C - x * B + b * I + _ * z - w * S + A * k;

      return E ? (E = 1 / E, t[0] = (s * C - u * B + l * I) * E, t[1] = (i * B - n * C - a * I) * E, t[2] = (d * A - m * w + v * _) * E, t[3] = (h * w - c * A - f * _) * E, t[4] = (u * z - o * C - l * S) * E, t[5] = (r * C - i * z + a * S) * E, t[6] = (m * b - y * A - v * x) * E, t[7] = (p * A - h * b + f * x) * E, t[8] = (o * B - s * z + l * k) * E, t[9] = (n * z - r * B - a * k) * E, t[10] = (y * w - d * b + v * g) * E, t[11] = (c * b - p * w - f * g) * E, t[12] = (s * S - o * I - u * k) * E, t[13] = (r * I - n * S + i * k) * E, t[14] = (d * x - y * _ - m * g) * E, t[15] = (p * _ - c * x + h * g) * E, t) : null;
    }, t.isChar = _n, t.isMapboxURL = q, t.keysDifference = function (t, e) {
      var r = [];

      for (var n in t) {
        n in e || r.push(n);
      }

      return r;
    }, t.makeRequest = dt, t.mapObject = g, t.mercatorXfromLng = bu, t.mercatorYfromLat = _u, t.mercatorZfromAltitude = wu, t.multiply = function (t, e, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[3],
          s = e[4],
          u = e[5],
          l = e[6],
          p = e[7],
          c = e[8],
          h = e[9],
          f = e[10],
          y = e[11],
          d = e[12],
          m = e[13],
          v = e[14],
          g = e[15],
          x = r[0],
          b = r[1],
          _ = r[2],
          w = r[3];
      return t[0] = x * n + b * s + _ * c + w * d, t[1] = x * i + b * u + _ * h + w * m, t[2] = x * a + b * l + _ * f + w * v, t[3] = x * o + b * p + _ * y + w * g, x = r[4], b = r[5], _ = r[6], w = r[7], t[4] = x * n + b * s + _ * c + w * d, t[5] = x * i + b * u + _ * h + w * m, t[6] = x * a + b * l + _ * f + w * v, t[7] = x * o + b * p + _ * y + w * g, x = r[8], b = r[9], _ = r[10], w = r[11], t[8] = x * n + b * s + _ * c + w * d, t[9] = x * i + b * u + _ * h + w * m, t[10] = x * a + b * l + _ * f + w * v, t[11] = x * o + b * p + _ * y + w * g, x = r[12], b = r[13], _ = r[14], w = r[15], t[12] = x * n + b * s + _ * c + w * d, t[13] = x * i + b * u + _ * h + w * m, t[14] = x * a + b * l + _ * f + w * v, t[15] = x * o + b * p + _ * y + w * g, t;
    }, t.mvt = Lo, t.number = be, t.ortho = function (t, e, r, n, i, a, o) {
      var s = 1 / (e - r),
          u = 1 / (n - i),
          l = 1 / (a - o);
      return t[0] = -2 * s, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * u, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * l, t[11] = 0, t[12] = (e + r) * s, t[13] = (i + n) * u, t[14] = (o + a) * l, t[15] = 1, t;
    }, t.parseGlyphPBF = function (t) {
      return new Xs(t).readFields(cu, []);
    }, t.pbf = Xs, t.performSymbolLayout = function (t, e, r, n, i, a) {
      t.createArrays();
      var o = 512 * t.overscaling;
      t.tilePixelRatio = ia / o, t.compareText = {}, t.iconsNeedLinear = !1;
      var s = t.layers[0].layout,
          u = t.layers[0]._unevaluatedLayout._values,
          l = {};

      if ("composite" === t.textSizeData.kind) {
        var p = t.textSizeData,
            c = p.minZoom,
            h = p.maxZoom;
        l.compositeTextSizes = [u["text-size"].possiblyEvaluate(new Vn(c)), u["text-size"].possiblyEvaluate(new Vn(h))];
      }

      if ("composite" === t.iconSizeData.kind) {
        var f = t.iconSizeData,
            y = f.minZoom,
            d = f.maxZoom;
        l.compositeIconSizes = [u["icon-size"].possiblyEvaluate(new Vn(y)), u["icon-size"].possiblyEvaluate(new Vn(d))];
      }

      l.layoutTextSize = u["text-size"].possiblyEvaluate(new Vn(t.zoom + 1)), l.layoutIconSize = u["icon-size"].possiblyEvaluate(new Vn(t.zoom + 1)), l.textMaxSize = u["text-size"].possiblyEvaluate(new Vn(18));

      for (var m = s.get("text-line-height") * Ru, v = "map" === s.get("text-rotation-alignment") && "point" !== s.get("symbol-placement"), g = s.get("text-keep-upright"), x = 0, b = t.features; x < b.length; x += 1) {
        var _ = b[x],
            A = s.get("text-font").evaluate(_, {}).join(","),
            k = r,
            S = {
          horizontal: {},
          vertical: void 0
        },
            z = _.text,
            I = [0, 0];

        if (z) {
          var B = z.toString(),
              C = s.get("text-letter-spacing").evaluate(_, {}) * Ru,
              E = An(B) ? C : 0,
              M = s.get("text-anchor").evaluate(_, {}),
              T = s.get("text-variable-anchor"),
              P = s.get("text-radial-offset").evaluate(_, {});
          T || (I = P ? ml(M, P * Ru) : s.get("text-offset").evaluate(_, {}).map(function (t) {
            return t * Ru;
          }));
          var V = v ? "center" : s.get("text-justify").evaluate(_, {}),
              F = "point" === s.get("symbol-placement") ? s.get("text-max-width").evaluate(_, {}) * Ru : 0;
          if (!v && T) for (var L = "auto" === V ? T.map(function (t) {
            return vl(t);
          }) : [V], D = !1, O = 0; O < L.length; O++) {
            var R = L[O];
            if (!S.horizontal[R]) if (D) S.horizontal[R] = S.horizontal[0];else {
              var U = qu(z, e, A, F, m, "center", R, E, I, Uu.horizontal);
              U && (S.horizontal[R] = U, D = 1 === U.lineCount);
            }
          } else {
            "auto" === V && (V = vl(M));
            var j = qu(z, e, A, F, m, M, V, E, I, Uu.horizontal);
            j && (S.horizontal[V] = j), wn(B) && v && g && (S.vertical = qu(z, e, A, F, m, M, V, E, I, Uu.vertical));
          }
        }

        var q = void 0;

        if (_.icon) {
          var N = n[_.icon];
          N && (q = $u(i[_.icon], s.get("icon-offset").evaluate(_, {}), s.get("icon-anchor").evaluate(_, {})), void 0 === t.sdfIcons ? t.sdfIcons = N.sdf : t.sdfIcons !== N.sdf && w("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"), N.pixelRatio !== t.pixelRatio ? t.iconsNeedLinear = !0 : 0 !== s.get("icon-rotate").constantOr(1) && (t.iconsNeedLinear = !0));
        }

        (Object.keys(S.horizontal).length || q) && gl(t, _, S, q, k, l, I);
      }

      a && t.generateCollisionDebugBuffers();
    }, t.perspective = function (t, e, r, n, i) {
      var a,
          o = 1 / Math.tan(e / 2);
      return t[0] = o / r, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = o, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, null != i && i !== 1 / 0 ? (a = 1 / (n - i), t[10] = (i + n) * a, t[14] = 2 * i * n * a) : (t[10] = -1, t[14] = -2 * n), t;
    }, t.pick = function (t, e) {
      for (var r = {}, n = 0; n < e.length; n++) {
        var i = e[n];
        i in t && (r[i] = t[i]);
      }

      return r;
    }, t.plugin = Pn, t.polygonIntersectsPolygon = pa, t.postMapLoadEvent = et, t.postTurnstileEvent = Q, t.potpack = Ls, t.rasterBoundsAttributes = Eu, t.refProperties = ["type", "source", "source-layer", "minzoom", "maxzoom", "filter", "layout"], t.register = mn, t.registerForPluginAvailability = function (t) {
      return En ? t({
        pluginURL: En,
        completionCallback: Bn
      }) : Tn.once("pluginAvailable", t), t;
    }, t.rotate = function (t, e, r) {
      var n = e[0],
          i = e[1],
          a = e[2],
          o = e[3],
          s = Math.sin(r),
          u = Math.cos(r);
      return t[0] = n * u + a * s, t[1] = i * u + o * s, t[2] = n * -s + a * u, t[3] = i * -s + o * u, t;
    }, t.rotateX = function (t, e, r) {
      var n = Math.sin(r),
          i = Math.cos(r),
          a = e[4],
          o = e[5],
          s = e[6],
          u = e[7],
          l = e[8],
          p = e[9],
          c = e[10],
          h = e[11];
      return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = a * i + l * n, t[5] = o * i + p * n, t[6] = s * i + c * n, t[7] = u * i + h * n, t[8] = l * i - a * n, t[9] = p * i - o * n, t[10] = c * i - s * n, t[11] = h * i - u * n, t;
    }, t.rotateZ = function (t, e, r) {
      var n = Math.sin(r),
          i = Math.cos(r),
          a = e[0],
          o = e[1],
          s = e[2],
          u = e[3],
          l = e[4],
          p = e[5],
          c = e[6],
          h = e[7];
      return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = a * i + l * n, t[1] = o * i + p * n, t[2] = s * i + c * n, t[3] = u * i + h * n, t[4] = l * i - a * n, t[5] = p * i - o * n, t[6] = c * i - s * n, t[7] = h * i - u * n, t;
    }, t.scale = function (t, e, r) {
      var n = r[0],
          i = r[1],
          a = r[2];
      return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * i, t[5] = e[5] * i, t[6] = e[6] * i, t[7] = e[7] * i, t[8] = e[8] * a, t[9] = e[9] * a, t[10] = e[10] * a, t[11] = e[11] * a, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
    }, t.setCacheLimits = function (t, e) {
      nt = t, it = e;
    }, t.setRTLTextPlugin = function (t, e) {
      if (Cn) throw new Error("setRTLTextPlugin cannot be called multiple times.");
      Cn = !0, En = V.resolveURL(t), Bn = function (t) {
        t ? (Cn = !1, En = null, e && e(t)) : Mn = !0;
      }, Tn.fire(new At("pluginAvailable", {
        pluginURL: En,
        completionCallback: Bn
      }));
    }, t.sphericalToCartesian = function (t) {
      var e = t[0],
          r = t[1],
          n = t[2];
      return r += 90, r *= Math.PI / 180, n *= Math.PI / 180, {
        x: e * Math.cos(r) * Math.sin(n),
        y: e * Math.sin(r) * Math.sin(n),
        z: e * Math.cos(n)
      };
    }, t.styleSpec = zt, t.symbolSize = xs, t.transformMat3 = function (t, e, r) {
      var n = e[0],
          i = e[1],
          a = e[2];
      return t[0] = n * r[0] + i * r[3] + a * r[6], t[1] = n * r[1] + i * r[4] + a * r[7], t[2] = n * r[2] + i * r[5] + a * r[8], t;
    }, t.transformMat4 = Ca, t.translate = function (t, e, r) {
      var n,
          i,
          a,
          o,
          s,
          u,
          l,
          p,
          c,
          h,
          f,
          y,
          d = r[0],
          m = r[1],
          v = r[2];
      return e === t ? (t[12] = e[0] * d + e[4] * m + e[8] * v + e[12], t[13] = e[1] * d + e[5] * m + e[9] * v + e[13], t[14] = e[2] * d + e[6] * m + e[10] * v + e[14], t[15] = e[3] * d + e[7] * m + e[11] * v + e[15]) : (n = e[0], i = e[1], a = e[2], o = e[3], s = e[4], u = e[5], l = e[6], p = e[7], c = e[8], h = e[9], f = e[10], y = e[11], t[0] = n, t[1] = i, t[2] = a, t[3] = o, t[4] = s, t[5] = u, t[6] = l, t[7] = p, t[8] = c, t[9] = h, t[10] = f, t[11] = y, t[12] = n * d + s * m + c * v + e[12], t[13] = i * d + u * m + h * v + e[13], t[14] = a * d + l * m + f * v + e[14], t[15] = o * d + p * m + y * v + e[15]), t;
    }, t.uniqueId = f, t.validateCustomStyleLayer = function (t) {
      var e = [],
          r = t.id;
      return void 0 === r && e.push({
        message: "layers." + r + ': missing required property "id"'
      }), void 0 === t.render && e.push({
        message: "layers." + r + ': missing required method "render"'
      }), t.renderingMode && "2d" !== t.renderingMode && "3d" !== t.renderingMode && e.push({
        message: "layers." + r + ': property "renderingMode" must be either "2d" or "3d"'
      }), e;
    }, t.validateLight = sn, t.validateStyle = on, t.values = function (t) {
      var e = [];

      for (var r in t) {
        e.push(t[r]);
      }

      return e;
    }, t.vectorTile = Lo, t.version = "1.2.1", t.warnOnce = w, t.webpSupported = L, t.window = self, t.wrap = p;
  });
  define(["./shared"], function (e) {
    "use strict";

    function t(e) {
      var r = _typeof(e);

      if ("number" === r || "boolean" === r || "string" === r || null == e) return JSON.stringify(e);

      if (Array.isArray(e)) {
        for (var o = "[", i = 0, n = e; i < n.length; i += 1) {
          o += t(n[i]) + ",";
        }

        return o + "]";
      }

      for (var a = Object.keys(e).sort(), s = "{", u = 0; u < a.length; u++) {
        s += JSON.stringify(a[u]) + ":" + t(e[a[u]]) + ",";
      }

      return s + "}";
    }

    function r(r) {
      for (var o = "", i = 0, n = e.refProperties; i < n.length; i += 1) {
        o += "/" + t(r[n[i]]);
      }

      return o;
    }

    var o = function (e) {
      this.keyCache = {}, e && this.replace(e);
    };

    o.prototype.replace = function (e) {
      this._layerConfigs = {}, this._layers = {}, this.update(e, []);
    }, o.prototype.update = function (t, o) {
      for (var i = this, n = 0, a = t; n < a.length; n += 1) {
        var s = a[n];
        this._layerConfigs[s.id] = s;
        var u = this._layers[s.id] = e.createStyleLayer(s);
        u._featureFilter = e.featureFilter(u.filter), this.keyCache[s.id] && delete this.keyCache[s.id];
      }

      for (var l = 0, h = o; l < h.length; l += 1) {
        var c = h[l];
        delete this.keyCache[c], delete this._layerConfigs[c], delete this._layers[c];
      }

      this.familiesBySource = {};

      for (var p = 0, f = function (e, t) {
        for (var o = {}, i = 0; i < e.length; i++) {
          var n = t && t[e[i].id] || r(e[i]);
          t && (t[e[i].id] = n);
          var a = o[n];
          a || (a = o[n] = []), a.push(e[i]);
        }

        var s = [];

        for (var u in o) {
          s.push(o[u]);
        }

        return s;
      }(e.values(this._layerConfigs), this.keyCache); p < f.length; p += 1) {
        var d = f[p].map(function (e) {
          return i._layers[e.id];
        }),
            g = d[0];

        if ("none" !== g.visibility) {
          var m = g.source || "",
              v = this.familiesBySource[m];
          v || (v = this.familiesBySource[m] = {});
          var y = g.sourceLayer || "_geojsonTileLayer",
              x = v[y];
          x || (x = v[y] = []), x.push(d);
        }
      }
    };

    var i = function (t) {
      var r = {},
          o = [];

      for (var i in t) {
        var n = t[i],
            a = r[i] = {};

        for (var s in n) {
          var u = n[+s];

          if (u && 0 !== u.bitmap.width && 0 !== u.bitmap.height) {
            var l = {
              x: 0,
              y: 0,
              w: u.bitmap.width + 2,
              h: u.bitmap.height + 2
            };
            o.push(l), a[s] = {
              rect: l,
              metrics: u.metrics
            };
          }
        }
      }

      var h = e.potpack(o),
          c = h.w,
          p = h.h,
          f = new e.AlphaImage({
        width: c || 1,
        height: p || 1
      });

      for (var d in t) {
        var g = t[d];

        for (var m in g) {
          var v = g[+m];

          if (v && 0 !== v.bitmap.width && 0 !== v.bitmap.height) {
            var y = r[d][m].rect;
            e.AlphaImage.copy(v.bitmap, f, {
              x: 0,
              y: 0
            }, {
              x: y.x + 1,
              y: y.y + 1
            }, v.bitmap);
          }
        }
      }

      this.image = f, this.positions = r;
    };

    e.register("GlyphAtlas", i);

    var n = function (t) {
      this.tileID = new e.OverscaledTileID(t.tileID.overscaledZ, t.tileID.wrap, t.tileID.canonical.z, t.tileID.canonical.x, t.tileID.canonical.y), this.uid = t.uid, this.zoom = t.zoom, this.pixelRatio = t.pixelRatio, this.tileSize = t.tileSize, this.source = t.source, this.overscaling = this.tileID.overscaleFactor(), this.showCollisionBoxes = t.showCollisionBoxes, this.collectResourceTiming = !!t.collectResourceTiming, this.returnDependencies = !!t.returnDependencies;
    };

    function a(t, r) {
      for (var o = new e.EvaluationParameters(r), i = 0, n = t; i < n.length; i += 1) {
        n[i].recalculate(o);
      }
    }

    n.prototype.parse = function (t, r, o, n) {
      var s = this;
      this.status = "parsing", this.data = t, this.collisionBoxArray = new e.CollisionBoxArray();
      var u = new e.DictionaryCoder(Object.keys(t.layers).sort()),
          l = new e.FeatureIndex(this.tileID);
      l.bucketLayerIDs = [];
      var h,
          c,
          p,
          f,
          d = {},
          g = {
        featureIndex: l,
        iconDependencies: {},
        patternDependencies: {},
        glyphDependencies: {}
      },
          m = r.familiesBySource[this.source];

      for (var v in m) {
        var y = t.layers[v];

        if (y) {
          1 === y.version && e.warnOnce('Vector tile source "' + this.source + '" layer "' + v + '" does not use vector tile spec v2 and therefore may have some rendering errors.');

          for (var x = u.encode(v), w = [], S = 0; S < y.length; S++) {
            var M = y.feature(S);
            w.push({
              feature: M,
              index: S,
              sourceLayerIndex: x
            });
          }

          for (var k = 0, b = m[v]; k < b.length; k += 1) {
            var _ = b[k],
                P = _[0];
            if (!(P.minzoom && this.zoom < Math.floor(P.minzoom))) if (!(P.maxzoom && this.zoom >= P.maxzoom)) if ("none" !== P.visibility) a(_, this.zoom), (d[P.id] = P.createBucket({
              index: l.bucketLayerIDs.length,
              layers: _,
              zoom: this.zoom,
              pixelRatio: this.pixelRatio,
              overscaling: this.overscaling,
              collisionBoxArray: this.collisionBoxArray,
              sourceLayerIndex: x,
              sourceID: this.source
            })).populate(w, g), l.bucketLayerIDs.push(_.map(function (e) {
              return e.id;
            }));
          }
        }
      }

      var I = e.mapObject(g.glyphDependencies, function (e) {
        return Object.keys(e).map(Number);
      });
      Object.keys(I).length ? o.send("getGlyphs", {
        uid: this.uid,
        stacks: I
      }, function (e, t) {
        h || (h = e, c = t, D.call(s));
      }) : c = {};
      var T = Object.keys(g.iconDependencies);
      T.length ? o.send("getImages", {
        icons: T
      }, function (e, t) {
        h || (h = e, p = t, D.call(s));
      }) : p = {};
      var L = Object.keys(g.patternDependencies);

      function D() {
        if (h) return n(h);

        if (c && p && f) {
          var t = new i(c),
              r = new e.ImageAtlas(p, f);

          for (var o in d) {
            var s = d[o];
            s instanceof e.SymbolBucket ? (a(s.layers, this.zoom), e.performSymbolLayout(s, c, t.positions, p, r.iconPositions, this.showCollisionBoxes)) : s.hasPattern && (s instanceof e.LineBucket || s instanceof e.FillBucket || s instanceof e.FillExtrusionBucket) && (a(s.layers, this.zoom), s.addFeatures(g, r.patternPositions));
          }

          this.status = "done", n(null, {
            buckets: e.values(d).filter(function (e) {
              return !e.isEmpty();
            }),
            featureIndex: l,
            collisionBoxArray: this.collisionBoxArray,
            glyphAtlasImage: t.image,
            imageAtlas: r,
            glyphMap: this.returnDependencies ? c : null,
            iconMap: this.returnDependencies ? p : null,
            glyphPositions: this.returnDependencies ? t.positions : null
          });
        }
      }

      L.length ? o.send("getImages", {
        icons: L
      }, function (e, t) {
        h || (h = e, f = t, D.call(s));
      }) : f = {}, D.call(this);
    };

    var s = "undefined" != typeof performance,
        u = {
      getEntriesByName: function (e) {
        return !!(s && performance && performance.getEntriesByName) && performance.getEntriesByName(e);
      },
      mark: function (e) {
        return !!(s && performance && performance.mark) && performance.mark(e);
      },
      measure: function (e, t, r) {
        return !!(s && performance && performance.measure) && performance.measure(e, t, r);
      },
      clearMarks: function (e) {
        return !!(s && performance && performance.clearMarks) && performance.clearMarks(e);
      },
      clearMeasures: function (e) {
        return !!(s && performance && performance.clearMeasures) && performance.clearMeasures(e);
      }
    },
        l = function (e) {
      this._marks = {
        start: [e.url, "start"].join("#"),
        end: [e.url, "end"].join("#"),
        measure: e.url.toString()
      }, u.mark(this._marks.start);
    };

    function h(t, r) {
      var o = e.getArrayBuffer(t.request, function (t, o, i, n) {
        t ? r(t) : o && r(null, {
          vectorTile: new e.vectorTile.VectorTile(new e.pbf(o)),
          rawData: o,
          cacheControl: i,
          expires: n
        });
      });
      return function () {
        o.cancel(), r();
      };
    }

    l.prototype.finish = function () {
      u.mark(this._marks.end);
      var e = u.getEntriesByName(this._marks.measure);
      return 0 === e.length && (u.measure(this._marks.measure, this._marks.start, this._marks.end), e = u.getEntriesByName(this._marks.measure), u.clearMarks(this._marks.start), u.clearMarks(this._marks.end), u.clearMeasures(this._marks.measure)), e;
    }, u.Performance = l;

    var c = function (e, t, r) {
      this.actor = e, this.layerIndex = t, this.loadVectorData = r || h, this.loading = {}, this.loaded = {};
    };

    c.prototype.loadTile = function (t, r) {
      var o = this,
          i = t.uid;
      this.loading || (this.loading = {});
      var a = !!(t && t.request && t.request.collectResourceTiming) && new u.Performance(t.request),
          s = this.loading[i] = new n(t);
      s.abort = this.loadVectorData(t, function (t, n) {
        if (delete o.loading[i], t || !n) return s.status = "done", o.loaded[i] = s, r(t);
        var u = n.rawData,
            l = {};
        n.expires && (l.expires = n.expires), n.cacheControl && (l.cacheControl = n.cacheControl);
        var h = {};

        if (a) {
          var c = a.finish();
          c && (h.resourceTiming = JSON.parse(JSON.stringify(c)));
        }

        s.vectorTile = n.vectorTile, s.parse(n.vectorTile, o.layerIndex, o.actor, function (t, o) {
          if (t || !o) return r(t);
          r(null, e.extend({
            rawTileData: u.slice(0)
          }, o, l, h));
        }), o.loaded = o.loaded || {}, o.loaded[i] = s;
      });
    }, c.prototype.reloadTile = function (e, t) {
      var r = this.loaded,
          o = e.uid,
          i = this;

      if (r && r[o]) {
        var n = r[o];
        n.showCollisionBoxes = e.showCollisionBoxes;

        var a = function (e, r) {
          var o = n.reloadCallback;
          o && (delete n.reloadCallback, n.parse(n.vectorTile, i.layerIndex, i.actor, o)), t(e, r);
        };

        "parsing" === n.status ? n.reloadCallback = a : "done" === n.status && (n.vectorTile ? n.parse(n.vectorTile, this.layerIndex, this.actor, a) : a());
      }
    }, c.prototype.abortTile = function (e, t) {
      var r = this.loading,
          o = e.uid;
      r && r[o] && r[o].abort && (r[o].abort(), delete r[o]), t();
    }, c.prototype.removeTile = function (e, t) {
      var r = this.loaded,
          o = e.uid;
      r && r[o] && delete r[o], t();
    };

    var p = function () {
      this.loaded = {};
    };

    p.prototype.loadTile = function (t, r) {
      var o = t.uid,
          i = t.encoding,
          n = t.rawImageData,
          a = new e.DEMData(o, n, i);
      this.loaded = this.loaded || {}, this.loaded[o] = a, r(null, a);
    }, p.prototype.removeTile = function (e) {
      var t = this.loaded,
          r = e.uid;
      t && t[r] && delete t[r];
    };
    var f = {
      RADIUS: 6378137,
      FLATTENING: 1 / 298.257223563,
      POLAR_RADIUS: 6356752.3142
    };

    function d(e) {
      var t = 0;

      if (e && e.length > 0) {
        t += Math.abs(g(e[0]));

        for (var r = 1; r < e.length; r++) {
          t -= Math.abs(g(e[r]));
        }
      }

      return t;
    }

    function g(e) {
      var t,
          r,
          o,
          i,
          n,
          a,
          s = 0,
          u = e.length;

      if (u > 2) {
        for (a = 0; a < u; a++) {
          a === u - 2 ? (o = u - 2, i = u - 1, n = 0) : a === u - 1 ? (o = u - 1, i = 0, n = 1) : (o = a, i = a + 1, n = a + 2), t = e[o], r = e[i], s += (m(e[n][0]) - m(t[0])) * Math.sin(m(r[1]));
        }

        s = s * f.RADIUS * f.RADIUS / 2;
      }

      return s;
    }

    function m(e) {
      return e * Math.PI / 180;
    }

    var v = {
      geometry: function e(t) {
        var r,
            o = 0;

        switch (t.type) {
          case "Polygon":
            return d(t.coordinates);

          case "MultiPolygon":
            for (r = 0; r < t.coordinates.length; r++) {
              o += d(t.coordinates[r]);
            }

            return o;

          case "Point":
          case "MultiPoint":
          case "LineString":
          case "MultiLineString":
            return 0;

          case "GeometryCollection":
            for (r = 0; r < t.geometries.length; r++) {
              o += e(t.geometries[r]);
            }

            return o;
        }
      },
      ring: g
    },
        y = function e(t, r) {
      switch (t && t.type || null) {
        case "FeatureCollection":
          return t.features = t.features.map(x(e, r)), t;

        case "GeometryCollection":
          return t.geometries = t.geometries.map(x(e, r)), t;

        case "Feature":
          return t.geometry = e(t.geometry, r), t;

        case "Polygon":
        case "MultiPolygon":
          return function (e, t) {
            "Polygon" === e.type ? e.coordinates = w(e.coordinates, t) : "MultiPolygon" === e.type && (e.coordinates = e.coordinates.map(x(w, t)));
            return e;
          }(t, r);

        default:
          return t;
      }
    };

    function x(e, t) {
      return function (r) {
        return e(r, t);
      };
    }

    function w(e, t) {
      t = !!t, e[0] = S(e[0], t);

      for (var r = 1; r < e.length; r++) {
        e[r] = S(e[r], !t);
      }

      return e;
    }

    function S(e, t) {
      return function (e) {
        return v.ring(e) >= 0;
      }(e) === t ? e : e.reverse();
    }

    var M = e.vectorTile.VectorTileFeature.prototype.toGeoJSON,
        k = function (t) {
      this._feature = t, this.extent = e.EXTENT, this.type = t.type, this.properties = t.tags, "id" in t && !isNaN(t.id) && (this.id = parseInt(t.id, 10));
    };

    k.prototype.loadGeometry = function () {
      if (1 === this._feature.type) {
        for (var t = [], r = 0, o = this._feature.geometry; r < o.length; r += 1) {
          var i = o[r];
          t.push([new e.Point$1(i[0], i[1])]);
        }

        return t;
      }

      for (var n = [], a = 0, s = this._feature.geometry; a < s.length; a += 1) {
        for (var u = [], l = 0, h = s[a]; l < h.length; l += 1) {
          var c = h[l];
          u.push(new e.Point$1(c[0], c[1]));
        }

        n.push(u);
      }

      return n;
    }, k.prototype.toGeoJSON = function (e, t, r) {
      return M.call(this, e, t, r);
    };

    var b = function (t) {
      this.layers = {
        _geojsonTileLayer: this
      }, this.name = "_geojsonTileLayer", this.extent = e.EXTENT, this.length = t.length, this._features = t;
    };

    b.prototype.feature = function (e) {
      return new k(this._features[e]);
    };

    var _ = e.vectorTile.VectorTileFeature,
        P = I;

    function I(e, t) {
      this.options = t || {}, this.features = e, this.length = e.length;
    }

    function T(e, t) {
      this.id = "number" == typeof e.id ? e.id : void 0, this.type = e.type, this.rawGeometry = 1 === e.type ? [e.geometry] : e.geometry, this.properties = e.tags, this.extent = t || 4096;
    }

    I.prototype.feature = function (e) {
      return new T(this.features[e], this.options.extent);
    }, T.prototype.loadGeometry = function () {
      var t = this.rawGeometry;
      this.geometry = [];

      for (var r = 0; r < t.length; r++) {
        for (var o = t[r], i = [], n = 0; n < o.length; n++) {
          i.push(new e.Point$1(o[n][0], o[n][1]));
        }

        this.geometry.push(i);
      }

      return this.geometry;
    }, T.prototype.bbox = function () {
      this.geometry || this.loadGeometry();

      for (var e = this.geometry, t = 1 / 0, r = -1 / 0, o = 1 / 0, i = -1 / 0, n = 0; n < e.length; n++) {
        for (var a = e[n], s = 0; s < a.length; s++) {
          var u = a[s];
          t = Math.min(t, u.x), r = Math.max(r, u.x), o = Math.min(o, u.y), i = Math.max(i, u.y);
        }
      }

      return [t, o, r, i];
    }, T.prototype.toGeoJSON = _.prototype.toGeoJSON;

    var L = O,
        D = O,
        C = function (e, t) {
      t = t || {};
      var r = {};

      for (var o in e) {
        r[o] = new P(e[o].features, t), r[o].name = o, r[o].version = t.version, r[o].extent = t.extent;
      }

      return O({
        layers: r
      });
    },
        z = P;

    function O(t) {
      var r = new e.pbf();
      return function (e, t) {
        for (var r in e.layers) {
          t.writeMessage(3, E, e.layers[r]);
        }
      }(t, r), r.finish();
    }

    function E(e, t) {
      var r;
      t.writeVarintField(15, e.version || 1), t.writeStringField(1, e.name || ""), t.writeVarintField(5, e.extent || 4096);
      var o = {
        keys: [],
        values: [],
        keycache: {},
        valuecache: {}
      };

      for (r = 0; r < e.length; r++) {
        o.feature = e.feature(r), t.writeMessage(2, N, o);
      }

      var i = o.keys;

      for (r = 0; r < i.length; r++) {
        t.writeStringField(3, i[r]);
      }

      var n = o.values;

      for (r = 0; r < n.length; r++) {
        t.writeMessage(4, G, n[r]);
      }
    }

    function N(e, t) {
      var r = e.feature;
      void 0 !== r.id && t.writeVarintField(1, r.id), t.writeMessage(2, F, e), t.writeVarintField(3, r.type), t.writeMessage(4, J, r);
    }

    function F(e, t) {
      var r = e.feature,
          o = e.keys,
          i = e.values,
          n = e.keycache,
          a = e.valuecache;

      for (var s in r.properties) {
        var u = n[s];
        void 0 === u && (o.push(s), u = o.length - 1, n[s] = u), t.writeVarint(u);

        var l = r.properties[s],
            h = _typeof(l);

        "string" !== h && "boolean" !== h && "number" !== h && (l = JSON.stringify(l));
        var c = h + ":" + l,
            p = a[c];
        void 0 === p && (i.push(l), p = i.length - 1, a[c] = p), t.writeVarint(p);
      }
    }

    function A(e, t) {
      return (t << 3) + (7 & e);
    }

    function B(e) {
      return e << 1 ^ e >> 31;
    }

    function J(e, t) {
      for (var r = e.loadGeometry(), o = e.type, i = 0, n = 0, a = r.length, s = 0; s < a; s++) {
        var u = r[s],
            l = 1;
        1 === o && (l = u.length), t.writeVarint(A(1, l));

        for (var h = 3 === o ? u.length - 1 : u.length, c = 0; c < h; c++) {
          1 === c && 1 !== o && t.writeVarint(A(2, h - 1));
          var p = u[c].x - i,
              f = u[c].y - n;
          t.writeVarint(B(p)), t.writeVarint(B(f)), i += p, n += f;
        }

        3 === o && t.writeVarint(A(7, 1));
      }
    }

    function G(e, t) {
      var r = _typeof(e);

      "string" === r ? t.writeStringField(1, e) : "boolean" === r ? t.writeBooleanField(7, e) : "number" === r && (e % 1 != 0 ? t.writeDoubleField(3, e) : e < 0 ? t.writeSVarintField(6, e) : t.writeVarintField(5, e));
    }

    function Z(e, t, r, o, i, n) {
      if (!(i - o <= r)) {
        var a = o + i >> 1;
        !function e(t, r, o, i, n, a) {
          for (; n > i;) {
            if (n - i > 600) {
              var s = n - i + 1,
                  u = o - i + 1,
                  l = Math.log(s),
                  h = .5 * Math.exp(2 * l / 3),
                  c = .5 * Math.sqrt(l * h * (s - h) / s) * (u - s / 2 < 0 ? -1 : 1),
                  p = Math.max(i, Math.floor(o - u * h / s + c)),
                  f = Math.min(n, Math.floor(o + (s - u) * h / s + c));
              e(t, r, o, p, f, a);
            }

            var d = r[2 * o + a],
                g = i,
                m = n;

            for (j(t, r, i, o), r[2 * n + a] > d && j(t, r, i, n); g < m;) {
              for (j(t, r, g, m), g++, m--; r[2 * g + a] < d;) {
                g++;
              }

              for (; r[2 * m + a] > d;) {
                m--;
              }
            }

            r[2 * i + a] === d ? j(t, r, i, m) : j(t, r, ++m, n), m <= o && (i = m + 1), o <= m && (n = m - 1);
          }
        }(e, t, a, o, i, n % 2), Z(e, t, r, o, a - 1, n + 1), Z(e, t, r, a + 1, i, n + 1);
      }
    }

    function j(e, t, r, o) {
      Y(e, r, o), Y(t, 2 * r, 2 * o), Y(t, 2 * r + 1, 2 * o + 1);
    }

    function Y(e, t, r) {
      var o = e[t];
      e[t] = e[r], e[r] = o;
    }

    function V(e, t, r, o) {
      var i = e - r,
          n = t - o;
      return i * i + n * n;
    }

    L.fromVectorTileJs = D, L.fromGeojsonVt = C, L.GeoJSONWrapper = z;

    var X = function (e) {
      return e[0];
    },
        W = function (e) {
      return e[1];
    },
        R = function (e, t, r, o, i) {
      void 0 === t && (t = X), void 0 === r && (r = W), void 0 === o && (o = 64), void 0 === i && (i = Float64Array), this.nodeSize = o, this.points = e;

      for (var n = e.length < 65536 ? Uint16Array : Uint32Array, a = this.ids = new n(e.length), s = this.coords = new i(2 * e.length), u = 0; u < e.length; u++) {
        a[u] = u, s[2 * u] = t(e[u]), s[2 * u + 1] = r(e[u]);
      }

      Z(a, s, o, 0, a.length - 1, 0);
    };

    R.prototype.range = function (e, t, r, o) {
      return function (e, t, r, o, i, n, a) {
        for (var s, u, l = [0, e.length - 1, 0], h = []; l.length;) {
          var c = l.pop(),
              p = l.pop(),
              f = l.pop();
          if (p - f <= a) for (var d = f; d <= p; d++) {
            s = t[2 * d], u = t[2 * d + 1], s >= r && s <= i && u >= o && u <= n && h.push(e[d]);
          } else {
            var g = Math.floor((f + p) / 2);
            s = t[2 * g], u = t[2 * g + 1], s >= r && s <= i && u >= o && u <= n && h.push(e[g]);
            var m = (c + 1) % 2;
            (0 === c ? r <= s : o <= u) && (l.push(f), l.push(g - 1), l.push(m)), (0 === c ? i >= s : n >= u) && (l.push(g + 1), l.push(p), l.push(m));
          }
        }

        return h;
      }(this.ids, this.coords, e, t, r, o, this.nodeSize);
    }, R.prototype.within = function (e, t, r) {
      return function (e, t, r, o, i, n) {
        for (var a = [0, e.length - 1, 0], s = [], u = i * i; a.length;) {
          var l = a.pop(),
              h = a.pop(),
              c = a.pop();
          if (h - c <= n) for (var p = c; p <= h; p++) {
            V(t[2 * p], t[2 * p + 1], r, o) <= u && s.push(e[p]);
          } else {
            var f = Math.floor((c + h) / 2),
                d = t[2 * f],
                g = t[2 * f + 1];
            V(d, g, r, o) <= u && s.push(e[f]);
            var m = (l + 1) % 2;
            (0 === l ? r - i <= d : o - i <= g) && (a.push(c), a.push(f - 1), a.push(m)), (0 === l ? r + i >= d : o + i >= g) && (a.push(f + 1), a.push(h), a.push(m));
          }
        }

        return s;
      }(this.ids, this.coords, e, t, r, this.nodeSize);
    };

    var q = {
      minZoom: 0,
      maxZoom: 16,
      radius: 40,
      extent: 512,
      nodeSize: 64,
      log: !1,
      reduce: null,
      map: function (e) {
        return e;
      }
    },
        U = function (e) {
      this.options = re(Object.create(q), e), this.trees = new Array(this.options.maxZoom + 1);
    };

    function $(e, t, r, o, i) {
      return {
        x: e,
        y: t,
        zoom: 1 / 0,
        id: r,
        parentId: -1,
        numPoints: o,
        properties: i
      };
    }

    function H(e, t) {
      var r = e.geometry.coordinates,
          o = r[0],
          i = r[1];
      return {
        x: ee(o),
        y: te(i),
        zoom: 1 / 0,
        index: t,
        parentId: -1
      };
    }

    function K(e) {
      return {
        type: "Feature",
        id: e.id,
        properties: Q(e),
        geometry: {
          type: "Point",
          coordinates: [(o = e.x, 360 * (o - .5)), (t = e.y, r = (180 - 360 * t) * Math.PI / 180, 360 * Math.atan(Math.exp(r)) / Math.PI - 90)]
        }
      };
      var t, r, o;
    }

    function Q(e) {
      var t = e.numPoints,
          r = t >= 1e4 ? Math.round(t / 1e3) + "k" : t >= 1e3 ? Math.round(t / 100) / 10 + "k" : t;
      return re(re({}, e.properties), {
        cluster: !0,
        cluster_id: e.id,
        point_count: t,
        point_count_abbreviated: r
      });
    }

    function ee(e) {
      return e / 360 + .5;
    }

    function te(e) {
      var t = Math.sin(e * Math.PI / 180),
          r = .5 - .25 * Math.log((1 + t) / (1 - t)) / Math.PI;
      return r < 0 ? 0 : r > 1 ? 1 : r;
    }

    function re(e, t) {
      for (var r in t) {
        e[r] = t[r];
      }

      return e;
    }

    function oe(e) {
      return e.x;
    }

    function ie(e) {
      return e.y;
    }

    function ne(e, t, r, o, i, n) {
      var a = i - r,
          s = n - o;

      if (0 !== a || 0 !== s) {
        var u = ((e - r) * a + (t - o) * s) / (a * a + s * s);
        u > 1 ? (r = i, o = n) : u > 0 && (r += a * u, o += s * u);
      }

      return (a = e - r) * a + (s = t - o) * s;
    }

    function ae(e, t, r, o) {
      var i = {
        id: void 0 === e ? null : e,
        type: t,
        geometry: r,
        tags: o,
        minX: 1 / 0,
        minY: 1 / 0,
        maxX: -1 / 0,
        maxY: -1 / 0
      };
      return function (e) {
        var t = e.geometry,
            r = e.type;
        if ("Point" === r || "MultiPoint" === r || "LineString" === r) se(e, t);else if ("Polygon" === r || "MultiLineString" === r) for (var o = 0; o < t.length; o++) {
          se(e, t[o]);
        } else if ("MultiPolygon" === r) for (o = 0; o < t.length; o++) {
          for (var i = 0; i < t[o].length; i++) {
            se(e, t[o][i]);
          }
        }
      }(i), i;
    }

    function se(e, t) {
      for (var r = 0; r < t.length; r += 3) {
        e.minX = Math.min(e.minX, t[r]), e.minY = Math.min(e.minY, t[r + 1]), e.maxX = Math.max(e.maxX, t[r]), e.maxY = Math.max(e.maxY, t[r + 1]);
      }
    }

    function ue(e, t, r, o) {
      if (t.geometry) {
        var i = t.geometry.coordinates,
            n = t.geometry.type,
            a = Math.pow(r.tolerance / ((1 << r.maxZoom) * r.extent), 2),
            s = [],
            u = t.id;
        if (r.promoteId ? u = t.properties[r.promoteId] : r.generateId && (u = o || 0), "Point" === n) le(i, s);else if ("MultiPoint" === n) for (var l = 0; l < i.length; l++) {
          le(i[l], s);
        } else if ("LineString" === n) he(i, s, a, !1);else if ("MultiLineString" === n) {
          if (r.lineMetrics) {
            for (l = 0; l < i.length; l++) {
              s = [], he(i[l], s, a, !1), e.push(ae(u, "LineString", s, t.properties));
            }

            return;
          }

          ce(i, s, a, !1);
        } else if ("Polygon" === n) ce(i, s, a, !0);else {
          if ("MultiPolygon" !== n) {
            if ("GeometryCollection" === n) {
              for (l = 0; l < t.geometry.geometries.length; l++) {
                ue(e, {
                  id: u,
                  geometry: t.geometry.geometries[l],
                  properties: t.properties
                }, r, o);
              }

              return;
            }

            throw new Error("Input data is not a valid GeoJSON object.");
          }

          for (l = 0; l < i.length; l++) {
            var h = [];
            ce(i[l], h, a, !0), s.push(h);
          }
        }
        e.push(ae(u, n, s, t.properties));
      }
    }

    function le(e, t) {
      t.push(pe(e[0])), t.push(fe(e[1])), t.push(0);
    }

    function he(e, t, r, o) {
      for (var i, n, a = 0, s = 0; s < e.length; s++) {
        var u = pe(e[s][0]),
            l = fe(e[s][1]);
        t.push(u), t.push(l), t.push(0), s > 0 && (a += o ? (i * l - u * n) / 2 : Math.sqrt(Math.pow(u - i, 2) + Math.pow(l - n, 2))), i = u, n = l;
      }

      var h = t.length - 3;
      t[2] = 1, function e(t, r, o, i) {
        for (var n, a = i, s = o - r >> 1, u = o - r, l = t[r], h = t[r + 1], c = t[o], p = t[o + 1], f = r + 3; f < o; f += 3) {
          var d = ne(t[f], t[f + 1], l, h, c, p);
          if (d > a) n = f, a = d;else if (d === a) {
            var g = Math.abs(f - s);
            g < u && (n = f, u = g);
          }
        }

        a > i && (n - r > 3 && e(t, r, n, i), t[n + 2] = a, o - n > 3 && e(t, n, o, i));
      }(t, 0, h, r), t[h + 2] = 1, t.size = Math.abs(a), t.start = 0, t.end = t.size;
    }

    function ce(e, t, r, o) {
      for (var i = 0; i < e.length; i++) {
        var n = [];
        he(e[i], n, r, o), t.push(n);
      }
    }

    function pe(e) {
      return e / 360 + .5;
    }

    function fe(e) {
      var t = Math.sin(e * Math.PI / 180),
          r = .5 - .25 * Math.log((1 + t) / (1 - t)) / Math.PI;
      return r < 0 ? 0 : r > 1 ? 1 : r;
    }

    function de(e, t, r, o, i, n, a, s) {
      if (o /= t, n >= (r /= t) && a < o) return e;
      if (a < r || n >= o) return null;

      for (var u = [], l = 0; l < e.length; l++) {
        var h = e[l],
            c = h.geometry,
            p = h.type,
            f = 0 === i ? h.minX : h.minY,
            d = 0 === i ? h.maxX : h.maxY;
        if (f >= r && d < o) u.push(h);else if (!(d < r || f >= o)) {
          var g = [];
          if ("Point" === p || "MultiPoint" === p) ge(c, g, r, o, i);else if ("LineString" === p) me(c, g, r, o, i, !1, s.lineMetrics);else if ("MultiLineString" === p) ye(c, g, r, o, i, !1);else if ("Polygon" === p) ye(c, g, r, o, i, !0);else if ("MultiPolygon" === p) for (var m = 0; m < c.length; m++) {
            var v = [];
            ye(c[m], v, r, o, i, !0), v.length && g.push(v);
          }

          if (g.length) {
            if (s.lineMetrics && "LineString" === p) {
              for (m = 0; m < g.length; m++) {
                u.push(ae(h.id, p, g[m], h.tags));
              }

              continue;
            }

            "LineString" !== p && "MultiLineString" !== p || (1 === g.length ? (p = "LineString", g = g[0]) : p = "MultiLineString"), "Point" !== p && "MultiPoint" !== p || (p = 3 === g.length ? "Point" : "MultiPoint"), u.push(ae(h.id, p, g, h.tags));
          }
        }
      }

      return u.length ? u : null;
    }

    function ge(e, t, r, o, i) {
      for (var n = 0; n < e.length; n += 3) {
        var a = e[n + i];
        a >= r && a <= o && (t.push(e[n]), t.push(e[n + 1]), t.push(e[n + 2]));
      }
    }

    function me(e, t, r, o, i, n, a) {
      for (var s, u, l = ve(e), h = 0 === i ? we : Se, c = e.start, p = 0; p < e.length - 3; p += 3) {
        var f = e[p],
            d = e[p + 1],
            g = e[p + 2],
            m = e[p + 3],
            v = e[p + 4],
            y = 0 === i ? f : d,
            x = 0 === i ? m : v,
            w = !1;
        a && (s = Math.sqrt(Math.pow(f - m, 2) + Math.pow(d - v, 2))), y < r ? x > r && (u = h(l, f, d, m, v, r), a && (l.start = c + s * u)) : y > o ? x < o && (u = h(l, f, d, m, v, o), a && (l.start = c + s * u)) : xe(l, f, d, g), x < r && y >= r && (u = h(l, f, d, m, v, r), w = !0), x > o && y <= o && (u = h(l, f, d, m, v, o), w = !0), !n && w && (a && (l.end = c + s * u), t.push(l), l = ve(e)), a && (c += s);
      }

      var S = e.length - 3;
      f = e[S], d = e[S + 1], g = e[S + 2], (y = 0 === i ? f : d) >= r && y <= o && xe(l, f, d, g), S = l.length - 3, n && S >= 3 && (l[S] !== l[0] || l[S + 1] !== l[1]) && xe(l, l[0], l[1], l[2]), l.length && t.push(l);
    }

    function ve(e) {
      var t = [];
      return t.size = e.size, t.start = e.start, t.end = e.end, t;
    }

    function ye(e, t, r, o, i, n) {
      for (var a = 0; a < e.length; a++) {
        me(e[a], t, r, o, i, n, !1);
      }
    }

    function xe(e, t, r, o) {
      e.push(t), e.push(r), e.push(o);
    }

    function we(e, t, r, o, i, n) {
      var a = (n - t) / (o - t);
      return e.push(n), e.push(r + (i - r) * a), e.push(1), a;
    }

    function Se(e, t, r, o, i, n) {
      var a = (n - r) / (i - r);
      return e.push(t + (o - t) * a), e.push(n), e.push(1), a;
    }

    function Me(e, t) {
      for (var r = [], o = 0; o < e.length; o++) {
        var i,
            n = e[o],
            a = n.type;
        if ("Point" === a || "MultiPoint" === a || "LineString" === a) i = ke(n.geometry, t);else if ("MultiLineString" === a || "Polygon" === a) {
          i = [];

          for (var s = 0; s < n.geometry.length; s++) {
            i.push(ke(n.geometry[s], t));
          }
        } else if ("MultiPolygon" === a) for (i = [], s = 0; s < n.geometry.length; s++) {
          for (var u = [], l = 0; l < n.geometry[s].length; l++) {
            u.push(ke(n.geometry[s][l], t));
          }

          i.push(u);
        }
        r.push(ae(n.id, a, i, n.tags));
      }

      return r;
    }

    function ke(e, t) {
      var r = [];
      r.size = e.size, void 0 !== e.start && (r.start = e.start, r.end = e.end);

      for (var o = 0; o < e.length; o += 3) {
        r.push(e[o] + t, e[o + 1], e[o + 2]);
      }

      return r;
    }

    function be(e, t) {
      if (e.transformed) return e;
      var r,
          o,
          i,
          n = 1 << e.z,
          a = e.x,
          s = e.y;

      for (r = 0; r < e.features.length; r++) {
        var u = e.features[r],
            l = u.geometry,
            h = u.type;
        if (u.geometry = [], 1 === h) for (o = 0; o < l.length; o += 2) {
          u.geometry.push(_e(l[o], l[o + 1], t, n, a, s));
        } else for (o = 0; o < l.length; o++) {
          var c = [];

          for (i = 0; i < l[o].length; i += 2) {
            c.push(_e(l[o][i], l[o][i + 1], t, n, a, s));
          }

          u.geometry.push(c);
        }
      }

      return e.transformed = !0, e;
    }

    function _e(e, t, r, o, i, n) {
      return [Math.round(r * (e * o - i)), Math.round(r * (t * o - n))];
    }

    function Pe(e, t, r, o, i) {
      for (var n = t === i.maxZoom ? 0 : i.tolerance / ((1 << t) * i.extent), a = {
        features: [],
        numPoints: 0,
        numSimplified: 0,
        numFeatures: 0,
        source: null,
        x: r,
        y: o,
        z: t,
        transformed: !1,
        minX: 2,
        minY: 1,
        maxX: -1,
        maxY: 0
      }, s = 0; s < e.length; s++) {
        a.numFeatures++, Ie(a, e[s], n, i);
        var u = e[s].minX,
            l = e[s].minY,
            h = e[s].maxX,
            c = e[s].maxY;
        u < a.minX && (a.minX = u), l < a.minY && (a.minY = l), h > a.maxX && (a.maxX = h), c > a.maxY && (a.maxY = c);
      }

      return a;
    }

    function Ie(e, t, r, o) {
      var i = t.geometry,
          n = t.type,
          a = [];
      if ("Point" === n || "MultiPoint" === n) for (var s = 0; s < i.length; s += 3) {
        a.push(i[s]), a.push(i[s + 1]), e.numPoints++, e.numSimplified++;
      } else if ("LineString" === n) Te(a, i, e, r, !1, !1);else if ("MultiLineString" === n || "Polygon" === n) for (s = 0; s < i.length; s++) {
        Te(a, i[s], e, r, "Polygon" === n, 0 === s);
      } else if ("MultiPolygon" === n) for (var u = 0; u < i.length; u++) {
        var l = i[u];

        for (s = 0; s < l.length; s++) {
          Te(a, l[s], e, r, !0, 0 === s);
        }
      }

      if (a.length) {
        var h = t.tags || null;

        if ("LineString" === n && o.lineMetrics) {
          for (var c in h = {}, t.tags) {
            h[c] = t.tags[c];
          }

          h.mapbox_clip_start = i.start / i.size, h.mapbox_clip_end = i.end / i.size;
        }

        var p = {
          geometry: a,
          type: "Polygon" === n || "MultiPolygon" === n ? 3 : "LineString" === n || "MultiLineString" === n ? 2 : 1,
          tags: h
        };
        null !== t.id && (p.id = t.id), e.features.push(p);
      }
    }

    function Te(e, t, r, o, i, n) {
      var a = o * o;
      if (o > 0 && t.size < (i ? a : o)) r.numPoints += t.length / 3;else {
        for (var s = [], u = 0; u < t.length; u += 3) {
          (0 === o || t[u + 2] > a) && (r.numSimplified++, s.push(t[u]), s.push(t[u + 1])), r.numPoints++;
        }

        i && function (e, t) {
          for (var r = 0, o = 0, i = e.length, n = i - 2; o < i; n = o, o += 2) {
            r += (e[o] - e[n]) * (e[o + 1] + e[n + 1]);
          }

          if (r > 0 === t) for (o = 0, i = e.length; o < i / 2; o += 2) {
            var a = e[o],
                s = e[o + 1];
            e[o] = e[i - 2 - o], e[o + 1] = e[i - 1 - o], e[i - 2 - o] = a, e[i - 1 - o] = s;
          }
        }(s, n), e.push(s);
      }
    }

    function Le(e, t) {
      var r = (t = this.options = function (e, t) {
        for (var r in t) {
          e[r] = t[r];
        }

        return e;
      }(Object.create(this.options), t)).debug;

      if (r && console.time("preprocess data"), t.maxZoom < 0 || t.maxZoom > 24) throw new Error("maxZoom should be in the 0-24 range");
      if (t.promoteId && t.generateId) throw new Error("promoteId and generateId cannot be used together.");

      var o = function (e, t) {
        var r = [];
        if ("FeatureCollection" === e.type) for (var o = 0; o < e.features.length; o++) {
          ue(r, e.features[o], t, o);
        } else "Feature" === e.type ? ue(r, e, t) : ue(r, {
          geometry: e
        }, t);
        return r;
      }(e, t);

      this.tiles = {}, this.tileCoords = [], r && (console.timeEnd("preprocess data"), console.log("index: maxZoom: %d, maxPoints: %d", t.indexMaxZoom, t.indexMaxPoints), console.time("generate tiles"), this.stats = {}, this.total = 0), (o = function (e, t) {
        var r = t.buffer / t.extent,
            o = e,
            i = de(e, 1, -1 - r, r, 0, -1, 2, t),
            n = de(e, 1, 1 - r, 2 + r, 0, -1, 2, t);
        return (i || n) && (o = de(e, 1, -r, 1 + r, 0, -1, 2, t) || [], i && (o = Me(i, 1).concat(o)), n && (o = o.concat(Me(n, -1)))), o;
      }(o, t)).length && this.splitTile(o, 0, 0, 0), r && (o.length && console.log("features: %d, points: %d", this.tiles[0].numFeatures, this.tiles[0].numPoints), console.timeEnd("generate tiles"), console.log("tiles generated:", this.total, JSON.stringify(this.stats)));
    }

    function De(e, t, r) {
      return 32 * ((1 << e) * r + t) + e;
    }

    function Ce(e, t) {
      var r = e.tileID.canonical;
      if (!this._geoJSONIndex) return t(null, null);

      var o = this._geoJSONIndex.getTile(r.z, r.x, r.y);

      if (!o) return t(null, null);
      var i = new b(o.features),
          n = L(i);
      0 === n.byteOffset && n.byteLength === n.buffer.byteLength || (n = new Uint8Array(n)), t(null, {
        vectorTile: i,
        rawData: n.buffer
      });
    }

    U.prototype.load = function (e) {
      var t = this.options,
          r = t.log,
          o = t.minZoom,
          i = t.maxZoom,
          n = t.nodeSize;
      r && console.time("total time");
      var a = "prepare " + e.length + " points";
      r && console.time(a), this.points = e;

      for (var s = [], u = 0; u < e.length; u++) {
        e[u].geometry && s.push(H(e[u], u));
      }

      this.trees[i + 1] = new R(s, oe, ie, n, Float32Array), r && console.timeEnd(a);

      for (var l = i; l >= o; l--) {
        var h = +Date.now();
        s = this._cluster(s, l), this.trees[l] = new R(s, oe, ie, n, Float32Array), r && console.log("z%d: %d clusters in %dms", l, s.length, +Date.now() - h);
      }

      return r && console.timeEnd("total time"), this;
    }, U.prototype.getClusters = function (e, t) {
      var r = ((e[0] + 180) % 360 + 360) % 360 - 180,
          o = Math.max(-90, Math.min(90, e[1])),
          i = 180 === e[2] ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180,
          n = Math.max(-90, Math.min(90, e[3]));
      if (e[2] - e[0] >= 360) r = -180, i = 180;else if (r > i) {
        var a = this.getClusters([r, o, 180, n], t),
            s = this.getClusters([-180, o, i, n], t);
        return a.concat(s);
      }

      for (var u = this.trees[this._limitZoom(t)], l = [], h = 0, c = u.range(ee(r), te(n), ee(i), te(o)); h < c.length; h += 1) {
        var p = c[h],
            f = u.points[p];
        l.push(f.numPoints ? K(f) : this.points[f.index]);
      }

      return l;
    }, U.prototype.getChildren = function (e) {
      var t = e >> 5,
          r = e % 32,
          o = "No cluster with the specified id.",
          i = this.trees[r];
      if (!i) throw new Error(o);
      var n = i.points[t];
      if (!n) throw new Error(o);

      for (var a = this.options.radius / (this.options.extent * Math.pow(2, r - 1)), s = [], u = 0, l = i.within(n.x, n.y, a); u < l.length; u += 1) {
        var h = l[u],
            c = i.points[h];
        c.parentId === e && s.push(c.numPoints ? K(c) : this.points[c.index]);
      }

      if (0 === s.length) throw new Error(o);
      return s;
    }, U.prototype.getLeaves = function (e, t, r) {
      t = t || 10, r = r || 0;
      var o = [];
      return this._appendLeaves(o, e, t, r, 0), o;
    }, U.prototype.getTile = function (e, t, r) {
      var o = this.trees[this._limitZoom(e)],
          i = Math.pow(2, e),
          n = this.options,
          a = n.extent,
          s = n.radius / a,
          u = (r - s) / i,
          l = (r + 1 + s) / i,
          h = {
        features: []
      };

      return this._addTileFeatures(o.range((t - s) / i, u, (t + 1 + s) / i, l), o.points, t, r, i, h), 0 === t && this._addTileFeatures(o.range(1 - s / i, u, 1, l), o.points, i, r, i, h), t === i - 1 && this._addTileFeatures(o.range(0, u, s / i, l), o.points, -1, r, i, h), h.features.length ? h : null;
    }, U.prototype.getClusterExpansionZoom = function (e) {
      for (var t = e % 32 - 1; t <= this.options.maxZoom;) {
        var r = this.getChildren(e);
        if (t++, 1 !== r.length) break;
        e = r[0].properties.cluster_id;
      }

      return t;
    }, U.prototype._appendLeaves = function (e, t, r, o, i) {
      for (var n = 0, a = this.getChildren(t); n < a.length; n += 1) {
        var s = a[n],
            u = s.properties;
        if (u && u.cluster ? i + u.point_count <= o ? i += u.point_count : i = this._appendLeaves(e, u.cluster_id, r, o, i) : i < o ? i++ : e.push(s), e.length === r) break;
      }

      return i;
    }, U.prototype._addTileFeatures = function (e, t, r, o, i, n) {
      for (var a = 0, s = e; a < s.length; a += 1) {
        var u = t[s[a]],
            l = {
          type: 1,
          geometry: [[Math.round(this.options.extent * (u.x * i - r)), Math.round(this.options.extent * (u.y * i - o))]],
          tags: u.numPoints ? Q(u) : this.points[u.index].properties
        },
            h = u.numPoints ? u.id : this.points[u.index].id;
        void 0 !== h && (l.id = h), n.features.push(l);
      }
    }, U.prototype._limitZoom = function (e) {
      return Math.max(this.options.minZoom, Math.min(e, this.options.maxZoom + 1));
    }, U.prototype._cluster = function (e, t) {
      for (var r = [], o = this.options, i = o.radius, n = o.extent, a = o.reduce, s = i / (n * Math.pow(2, t)), u = 0; u < e.length; u++) {
        var l = e[u];

        if (!(l.zoom <= t)) {
          l.zoom = t;

          for (var h = this.trees[t + 1], c = h.within(l.x, l.y, s), p = l.numPoints || 1, f = l.x * p, d = l.y * p, g = a ? this._map(l, !0) : null, m = (u << 5) + (t + 1), v = 0, y = c; v < y.length; v += 1) {
            var x = y[v],
                w = h.points[x];

            if (!(w.zoom <= t)) {
              w.zoom = t;
              var S = w.numPoints || 1;
              f += w.x * S, d += w.y * S, p += S, w.parentId = m, a && a(g, this._map(w));
            }
          }

          1 === p ? r.push(l) : (l.parentId = m, r.push($(f / p, d / p, m, p, g)));
        }
      }

      return r;
    }, U.prototype._map = function (e, t) {
      if (e.numPoints) return t ? re({}, e.properties) : e.properties;
      var r = this.points[e.index].properties,
          o = this.options.map(r);
      return t && o === r ? re({}, o) : o;
    }, Le.prototype.options = {
      maxZoom: 14,
      indexMaxZoom: 5,
      indexMaxPoints: 1e5,
      tolerance: 3,
      extent: 4096,
      buffer: 64,
      lineMetrics: !1,
      promoteId: null,
      generateId: !1,
      debug: 0
    }, Le.prototype.splitTile = function (e, t, r, o, i, n, a) {
      for (var s = [e, t, r, o], u = this.options, l = u.debug; s.length;) {
        o = s.pop(), r = s.pop(), t = s.pop(), e = s.pop();
        var h = 1 << t,
            c = De(t, r, o),
            p = this.tiles[c];

        if (!p && (l > 1 && console.time("creation"), p = this.tiles[c] = Pe(e, t, r, o, u), this.tileCoords.push({
          z: t,
          x: r,
          y: o
        }), l)) {
          l > 1 && (console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)", t, r, o, p.numFeatures, p.numPoints, p.numSimplified), console.timeEnd("creation"));
          var f = "z" + t;
          this.stats[f] = (this.stats[f] || 0) + 1, this.total++;
        }

        if (p.source = e, i) {
          if (t === u.maxZoom || t === i) continue;
          var d = 1 << i - t;
          if (r !== Math.floor(n / d) || o !== Math.floor(a / d)) continue;
        } else if (t === u.indexMaxZoom || p.numPoints <= u.indexMaxPoints) continue;

        if (p.source = null, 0 !== e.length) {
          l > 1 && console.time("clipping");
          var g,
              m,
              v,
              y,
              x,
              w,
              S = .5 * u.buffer / u.extent,
              M = .5 - S,
              k = .5 + S,
              b = 1 + S;
          g = m = v = y = null, x = de(e, h, r - S, r + k, 0, p.minX, p.maxX, u), w = de(e, h, r + M, r + b, 0, p.minX, p.maxX, u), e = null, x && (g = de(x, h, o - S, o + k, 1, p.minY, p.maxY, u), m = de(x, h, o + M, o + b, 1, p.minY, p.maxY, u), x = null), w && (v = de(w, h, o - S, o + k, 1, p.minY, p.maxY, u), y = de(w, h, o + M, o + b, 1, p.minY, p.maxY, u), w = null), l > 1 && console.timeEnd("clipping"), s.push(g || [], t + 1, 2 * r, 2 * o), s.push(m || [], t + 1, 2 * r, 2 * o + 1), s.push(v || [], t + 1, 2 * r + 1, 2 * o), s.push(y || [], t + 1, 2 * r + 1, 2 * o + 1);
        }
      }
    }, Le.prototype.getTile = function (e, t, r) {
      var o = this.options,
          i = o.extent,
          n = o.debug;
      if (e < 0 || e > 24) return null;
      var a = 1 << e,
          s = De(e, t = (t % a + a) % a, r);
      if (this.tiles[s]) return be(this.tiles[s], i);
      n > 1 && console.log("drilling down to z%d-%d-%d", e, t, r);

      for (var u, l = e, h = t, c = r; !u && l > 0;) {
        l--, h = Math.floor(h / 2), c = Math.floor(c / 2), u = this.tiles[De(l, h, c)];
      }

      return u && u.source ? (n > 1 && console.log("found parent tile z%d-%d-%d", l, h, c), n > 1 && console.time("drilling down"), this.splitTile(u.source, l, h, c, e, t, r), n > 1 && console.timeEnd("drilling down"), this.tiles[s] ? be(this.tiles[s], i) : null) : null;
    };

    var ze = function (t) {
      function r(e, r, o) {
        t.call(this, e, r, Ce), o && (this.loadGeoJSON = o);
      }

      return t && (r.__proto__ = t), r.prototype = Object.create(t && t.prototype), r.prototype.constructor = r, r.prototype.loadData = function (e, t) {
        this._pendingCallback && this._pendingCallback(null, {
          abandoned: !0
        }), this._pendingCallback = t, this._pendingLoadDataParams = e, this._state && "Idle" !== this._state ? this._state = "NeedsLoadData" : (this._state = "Coalescing", this._loadData());
      }, r.prototype._loadData = function () {
        var t = this;

        if (this._pendingCallback && this._pendingLoadDataParams) {
          var r = this._pendingCallback,
              o = this._pendingLoadDataParams;
          delete this._pendingCallback, delete this._pendingLoadDataParams;
          var i = !!(o && o.request && o.request.collectResourceTiming) && new u.Performance(o.request);
          this.loadGeoJSON(o, function (n, a) {
            if (n || !a) return r(n);
            if ("object" != _typeof(a)) return r(new Error("Input data given to '" + o.source + "' is not a valid GeoJSON object."));
            y(a, !0);

            try {
              t._geoJSONIndex = o.cluster ? new U(function (t) {
                var r = t.superclusterOptions,
                    o = t.clusterProperties;
                if (!o || !r) return r;

                for (var i = {}, n = {}, a = {
                  accumulated: null,
                  zoom: 0
                }, s = {
                  properties: null
                }, u = Object.keys(o), l = 0, h = u; l < h.length; l += 1) {
                  var c = h[l],
                      p = o[c],
                      f = p[0],
                      d = p[1],
                      g = e.createExpression(d),
                      m = e.createExpression("string" == typeof f ? [f, ["accumulated"], ["get", c]] : f);
                  i[c] = g.value, n[c] = m.value;
                }

                return r.map = function (e) {
                  s.properties = e;

                  for (var t = {}, r = 0, o = u; r < o.length; r += 1) {
                    var n = o[r];
                    t[n] = i[n].evaluate(a, s);
                  }

                  return t;
                }, r.reduce = function (e, t) {
                  s.properties = t;

                  for (var r = 0, o = u; r < o.length; r += 1) {
                    var i = o[r];
                    a.accumulated = e[i], e[i] = n[i].evaluate(a, s);
                  }
                }, r;
              }(o)).load(a.features) : function (e, t) {
                return new Le(e, t);
              }(a, o.geojsonVtOptions);
            } catch (n) {
              return r(n);
            }

            t.loaded = {};
            var s = {};

            if (i) {
              var u = i.finish();
              u && (s.resourceTiming = {}, s.resourceTiming[o.source] = JSON.parse(JSON.stringify(u)));
            }

            r(null, s);
          });
        }
      }, r.prototype.coalesce = function () {
        "Coalescing" === this._state ? this._state = "Idle" : "NeedsLoadData" === this._state && (this._state = "Coalescing", this._loadData());
      }, r.prototype.reloadTile = function (e, r) {
        var o = this.loaded,
            i = e.uid;
        return o && o[i] ? t.prototype.reloadTile.call(this, e, r) : this.loadTile(e, r);
      }, r.prototype.loadGeoJSON = function (t, r) {
        if (t.request) e.getJSON(t.request, r);else {
          if ("string" != typeof t.data) return r(new Error("Input data given to '" + t.source + "' is not a valid GeoJSON object."));

          try {
            return r(null, JSON.parse(t.data));
          } catch (e) {
            return r(new Error("Input data given to '" + t.source + "' is not a valid GeoJSON object."));
          }
        }
      }, r.prototype.removeSource = function (e, t) {
        this._pendingCallback && this._pendingCallback(null, {
          abandoned: !0
        }), t();
      }, r.prototype.getClusterExpansionZoom = function (e, t) {
        t(null, this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));
      }, r.prototype.getClusterChildren = function (e, t) {
        t(null, this._geoJSONIndex.getChildren(e.clusterId));
      }, r.prototype.getClusterLeaves = function (e, t) {
        t(null, this._geoJSONIndex.getLeaves(e.clusterId, e.limit, e.offset));
      }, r;
    }(c);

    var Oe = function (t) {
      var r = this;
      this.self = t, this.actor = new e.Actor(t, this), this.layerIndexes = {}, this.workerSourceTypes = {
        vector: c,
        geojson: ze
      }, this.workerSources = {}, this.demWorkerSources = {}, this.self.registerWorkerSource = function (e, t) {
        if (r.workerSourceTypes[e]) throw new Error('Worker source with name "' + e + '" already registered.');
        r.workerSourceTypes[e] = t;
      }, this.self.registerRTLTextPlugin = function (t) {
        if (e.plugin.isLoaded()) throw new Error("RTL text plugin already registered.");
        e.plugin.applyArabicShaping = t.applyArabicShaping, e.plugin.processBidirectionalText = t.processBidirectionalText, e.plugin.processStyledBidirectionalText = t.processStyledBidirectionalText;
      };
    };

    return Oe.prototype.setReferrer = function (e, t) {
      this.referrer = t;
    }, Oe.prototype.setLayers = function (e, t, r) {
      this.getLayerIndex(e).replace(t), r();
    }, Oe.prototype.updateLayers = function (e, t, r) {
      this.getLayerIndex(e).update(t.layers, t.removedIds), r();
    }, Oe.prototype.loadTile = function (e, t, r) {
      this.getWorkerSource(e, t.type, t.source).loadTile(t, r);
    }, Oe.prototype.loadDEMTile = function (e, t, r) {
      this.getDEMWorkerSource(e, t.source).loadTile(t, r);
    }, Oe.prototype.reloadTile = function (e, t, r) {
      this.getWorkerSource(e, t.type, t.source).reloadTile(t, r);
    }, Oe.prototype.abortTile = function (e, t, r) {
      this.getWorkerSource(e, t.type, t.source).abortTile(t, r);
    }, Oe.prototype.removeTile = function (e, t, r) {
      this.getWorkerSource(e, t.type, t.source).removeTile(t, r);
    }, Oe.prototype.removeDEMTile = function (e, t) {
      this.getDEMWorkerSource(e, t.source).removeTile(t);
    }, Oe.prototype.removeSource = function (e, t, r) {
      if (this.workerSources[e] && this.workerSources[e][t.type] && this.workerSources[e][t.type][t.source]) {
        var o = this.workerSources[e][t.type][t.source];
        delete this.workerSources[e][t.type][t.source], void 0 !== o.removeSource ? o.removeSource(t, r) : r();
      }
    }, Oe.prototype.loadWorkerSource = function (e, t, r) {
      try {
        this.self.importScripts(t.url), r();
      } catch (e) {
        r(e.toString());
      }
    }, Oe.prototype.loadRTLTextPlugin = function (t, r, o) {
      try {
        e.plugin.isLoaded() || (this.self.importScripts(r), o(e.plugin.isLoaded() ? null : new Error("RTL Text Plugin failed to import scripts from " + r)));
      } catch (e) {
        o(e.toString());
      }
    }, Oe.prototype.getLayerIndex = function (e) {
      var t = this.layerIndexes[e];
      return t || (t = this.layerIndexes[e] = new o()), t;
    }, Oe.prototype.getWorkerSource = function (e, t, r) {
      var o = this;

      if (this.workerSources[e] || (this.workerSources[e] = {}), this.workerSources[e][t] || (this.workerSources[e][t] = {}), !this.workerSources[e][t][r]) {
        var i = {
          send: function (t, r, i) {
            o.actor.send(t, r, i, e);
          }
        };
        this.workerSources[e][t][r] = new this.workerSourceTypes[t](i, this.getLayerIndex(e));
      }

      return this.workerSources[e][t][r];
    }, Oe.prototype.getDEMWorkerSource = function (e, t) {
      return this.demWorkerSources[e] || (this.demWorkerSources[e] = {}), this.demWorkerSources[e][t] || (this.demWorkerSources[e][t] = new p()), this.demWorkerSources[e][t];
    }, Oe.prototype.enforceCacheSizeLimit = function (t, r) {
      e.enforceCacheSizeLimit(r);
    }, "undefined" != typeof WorkerGlobalScope && void 0 !== e.window && e.window instanceof WorkerGlobalScope && (e.window.worker = new Oe(e.window)), Oe;
  });
  define(["./shared"], function (t) {
    "use strict";

    var e = t.createCommonjsModule(function (t) {
      function e(t) {
        return !!("undefined" != typeof window && "undefined" != typeof document && Array.prototype && Array.prototype.every && Array.prototype.filter && Array.prototype.forEach && Array.prototype.indexOf && Array.prototype.lastIndexOf && Array.prototype.map && Array.prototype.some && Array.prototype.reduce && Array.prototype.reduceRight && Array.isArray && Function.prototype && Function.prototype.bind && Object.keys && Object.create && Object.getPrototypeOf && Object.getOwnPropertyNames && Object.isSealed && Object.isFrozen && Object.isExtensible && Object.getOwnPropertyDescriptor && Object.defineProperty && Object.defineProperties && Object.seal && Object.freeze && Object.preventExtensions && "JSON" in window && "parse" in JSON && "stringify" in JSON && function () {
          if (!("Worker" in window && "Blob" in window && "URL" in window)) return !1;
          var t,
              e,
              i = new Blob([""], {
            type: "text/javascript"
          }),
              o = URL.createObjectURL(i);

          try {
            e = new Worker(o), t = !0;
          } catch (e) {
            t = !1;
          }

          e && e.terminate();
          return URL.revokeObjectURL(o), t;
        }() && "Uint8ClampedArray" in window && ArrayBuffer.isView && function (t) {
          void 0 === i[t] && (i[t] = function (t) {
            var i = document.createElement("canvas"),
                o = Object.create(e.webGLContextAttributes);
            return o.failIfMajorPerformanceCaveat = t, i.probablySupportsContext ? i.probablySupportsContext("webgl", o) || i.probablySupportsContext("experimental-webgl", o) : i.supportsContext ? i.supportsContext("webgl", o) || i.supportsContext("experimental-webgl", o) : i.getContext("webgl", o) || i.getContext("experimental-webgl", o);
          }(t));
          return i[t];
        }(t && t.failIfMajorPerformanceCaveat));
      }

      t.exports ? t.exports = e : window && (window.mapboxgl = window.mapboxgl || {}, window.mapboxgl.supported = e);
      var i = {};
      e.webGLContextAttributes = {
        antialias: !1,
        alpha: !0,
        stencil: !0,
        depth: !0
      };
    }),
        i = {
      create: function (e, i, o) {
        var r = t.window.document.createElement(e);
        return void 0 !== i && (r.className = i), o && o.appendChild(r), r;
      },
      createNS: function (e, i) {
        return t.window.document.createElementNS(e, i);
      }
    },
        o = t.window.document.documentElement.style;

    function r(t) {
      if (!o) return t[0];

      for (var e = 0; e < t.length; e++) {
        if (t[e] in o) return t[e];
      }

      return t[0];
    }

    var a,
        n = r(["userSelect", "MozUserSelect", "WebkitUserSelect", "msUserSelect"]);
    i.disableDrag = function () {
      o && n && (a = o[n], o[n] = "none");
    }, i.enableDrag = function () {
      o && n && (o[n] = a);
    };
    var s = r(["transform", "WebkitTransform"]);

    i.setTransform = function (t, e) {
      t.style[s] = e;
    };

    var l = !1;

    try {
      var c = Object.defineProperty({}, "passive", {
        get: function () {
          l = !0;
        }
      });
      t.window.addEventListener("test", c, c), t.window.removeEventListener("test", c, c);
    } catch (t) {
      l = !1;
    }

    i.addEventListener = function (t, e, i, o) {
      void 0 === o && (o = {}), "passive" in o && l ? t.addEventListener(e, i, o) : t.addEventListener(e, i, o.capture);
    }, i.removeEventListener = function (t, e, i, o) {
      void 0 === o && (o = {}), "passive" in o && l ? t.removeEventListener(e, i, o) : t.removeEventListener(e, i, o.capture);
    };

    var u = function (e) {
      e.preventDefault(), e.stopPropagation(), t.window.removeEventListener("click", u, !0);
    };

    function h(t) {
      var e = t.userImage;
      if (e && e.render && e.render()) return t.data.replace(new Uint8Array(e.data.buffer)), !0;
      return !1;
    }

    i.suppressClick = function () {
      t.window.addEventListener("click", u, !0), t.window.setTimeout(function () {
        t.window.removeEventListener("click", u, !0);
      }, 0);
    }, i.mousePos = function (e, i) {
      var o = e.getBoundingClientRect(),
          r = t.window.TouchEvent && i instanceof t.window.TouchEvent ? i.touches[0] : i;
      return new t.Point(r.clientX - o.left - e.clientLeft, r.clientY - o.top - e.clientTop);
    }, i.touchPos = function (e, i) {
      for (var o = e.getBoundingClientRect(), r = [], a = "touchend" === i.type ? i.changedTouches : i.touches, n = 0; n < a.length; n++) {
        r.push(new t.Point(a[n].clientX - o.left - e.clientLeft, a[n].clientY - o.top - e.clientTop));
      }

      return r;
    }, i.mouseButton = function (e) {
      return void 0 !== t.window.InstallTrigger && 2 === e.button && e.ctrlKey && t.window.navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? 0 : e.button;
    }, i.remove = function (t) {
      t.parentNode && t.parentNode.removeChild(t);
    };

    var p = function (e) {
      function i() {
        e.call(this), this.images = {}, this.updatedImages = {}, this.callbackDispatchedThisFrame = {}, this.loaded = !1, this.requestors = [], this.patterns = {}, this.atlasImage = new t.RGBAImage({
          width: 1,
          height: 1
        }), this.dirty = !0;
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.isLoaded = function () {
        return this.loaded;
      }, i.prototype.setLoaded = function (t) {
        if (this.loaded !== t && (this.loaded = t, t)) {
          for (var e = 0, i = this.requestors; e < i.length; e += 1) {
            var o = i[e],
                r = o.ids,
                a = o.callback;

            this._notify(r, a);
          }

          this.requestors = [];
        }
      }, i.prototype.getImage = function (t) {
        return this.images[t];
      }, i.prototype.addImage = function (t, e) {
        this.images[t] = e;
      }, i.prototype.updateImage = function (t, e) {
        var i = this.images[t];
        e.version = i.version + 1, this.images[t] = e, this.updatedImages[t] = !0;
      }, i.prototype.removeImage = function (t) {
        var e = this.images[t];
        delete this.images[t], delete this.patterns[t], e.userImage && e.userImage.onRemove && e.userImage.onRemove();
      }, i.prototype.listImages = function () {
        return Object.keys(this.images);
      }, i.prototype.getImages = function (t, e) {
        var i = !0;
        if (!this.isLoaded()) for (var o = 0, r = t; o < r.length; o += 1) {
          var a = r[o];
          this.images[a] || (i = !1);
        }
        this.isLoaded() || i ? this._notify(t, e) : this.requestors.push({
          ids: t,
          callback: e
        });
      }, i.prototype._notify = function (e, i) {
        for (var o = {}, r = 0, a = e; r < a.length; r += 1) {
          var n = a[r];
          this.images[n] || this.fire(new t.Event("styleimagemissing", {
            id: n
          }));
          var s = this.images[n];
          s ? o[n] = {
            data: s.data.clone(),
            pixelRatio: s.pixelRatio,
            sdf: s.sdf,
            version: s.version,
            hasRenderCallback: Boolean(s.userImage && s.userImage.render)
          } : t.warnOnce('Image "' + n + '" could not be loaded. Please make sure you have added the image with map.addImage() or a "sprite" property in your style. You can provide missing images by listening for the "styleimagemissing" map event.');
        }

        i(null, o);
      }, i.prototype.getPixelSize = function () {
        var t = this.atlasImage;
        return {
          width: t.width,
          height: t.height
        };
      }, i.prototype.getPattern = function (e) {
        var i = this.patterns[e],
            o = this.getImage(e);
        if (!o) return null;
        if (i && i.position.version === o.version) return i.position;
        if (i) i.position.version = o.version;else {
          var r = {
            w: o.data.width + 2,
            h: o.data.height + 2,
            x: 0,
            y: 0
          },
              a = new t.ImagePosition(r, o);
          this.patterns[e] = {
            bin: r,
            position: a
          };
        }
        return this._updatePatternAtlas(), this.patterns[e].position;
      }, i.prototype.bind = function (e) {
        var i = e.gl;
        this.atlasTexture ? this.dirty && (this.atlasTexture.update(this.atlasImage), this.dirty = !1) : this.atlasTexture = new t.Texture(e, this.atlasImage, i.RGBA), this.atlasTexture.bind(i.LINEAR, i.CLAMP_TO_EDGE);
      }, i.prototype._updatePatternAtlas = function () {
        var e = [];

        for (var i in this.patterns) {
          e.push(this.patterns[i].bin);
        }

        var o = t.potpack(e),
            r = o.w,
            a = o.h,
            n = this.atlasImage;

        for (var s in n.resize({
          width: r || 1,
          height: a || 1
        }), this.patterns) {
          var l = this.patterns[s].bin,
              c = l.x + 1,
              u = l.y + 1,
              h = this.images[s].data,
              p = h.width,
              d = h.height;
          t.RGBAImage.copy(h, n, {
            x: 0,
            y: 0
          }, {
            x: c,
            y: u
          }, {
            width: p,
            height: d
          }), t.RGBAImage.copy(h, n, {
            x: 0,
            y: d - 1
          }, {
            x: c,
            y: u - 1
          }, {
            width: p,
            height: 1
          }), t.RGBAImage.copy(h, n, {
            x: 0,
            y: 0
          }, {
            x: c,
            y: u + d
          }, {
            width: p,
            height: 1
          }), t.RGBAImage.copy(h, n, {
            x: p - 1,
            y: 0
          }, {
            x: c - 1,
            y: u
          }, {
            width: 1,
            height: d
          }), t.RGBAImage.copy(h, n, {
            x: 0,
            y: 0
          }, {
            x: c + p,
            y: u
          }, {
            width: 1,
            height: d
          });
        }

        this.dirty = !0;
      }, i.prototype.beginFrame = function () {
        this.callbackDispatchedThisFrame = {};
      }, i.prototype.dispatchRenderCallbacks = function (t) {
        for (var e = 0, i = t; e < i.length; e += 1) {
          var o = i[e];

          if (!this.callbackDispatchedThisFrame[o]) {
            this.callbackDispatchedThisFrame[o] = !0;
            var r = this.images[o];
            h(r) && this.updateImage(o, r);
          }
        }
      }, i;
    }(t.Evented);

    var d = f,
        _ = 1e20;

    function f(t, e, i, o, r, a) {
      this.fontSize = t || 24, this.buffer = void 0 === e ? 3 : e, this.cutoff = o || .25, this.fontFamily = r || "sans-serif", this.fontWeight = a || "normal", this.radius = i || 8;
      var n = this.size = this.fontSize + 2 * this.buffer;
      this.canvas = document.createElement("canvas"), this.canvas.width = this.canvas.height = n, this.ctx = this.canvas.getContext("2d"), this.ctx.font = this.fontWeight + " " + this.fontSize + "px " + this.fontFamily, this.ctx.textBaseline = "middle", this.ctx.fillStyle = "black", this.gridOuter = new Float64Array(n * n), this.gridInner = new Float64Array(n * n), this.f = new Float64Array(n), this.d = new Float64Array(n), this.z = new Float64Array(n + 1), this.v = new Int16Array(n), this.middle = Math.round(n / 2 * (navigator.userAgent.indexOf("Gecko/") >= 0 ? 1.2 : 1));
    }

    function m(t, e, i, o, r, a, n) {
      for (var s = 0; s < e; s++) {
        for (var l = 0; l < i; l++) {
          o[l] = t[l * e + s];
        }

        for (g(o, r, a, n, i), l = 0; l < i; l++) {
          t[l * e + s] = r[l];
        }
      }

      for (l = 0; l < i; l++) {
        for (s = 0; s < e; s++) {
          o[s] = t[l * e + s];
        }

        for (g(o, r, a, n, e), s = 0; s < e; s++) {
          t[l * e + s] = Math.sqrt(r[s]);
        }
      }
    }

    function g(t, e, i, o, r) {
      i[0] = 0, o[0] = -_, o[1] = +_;

      for (var a = 1, n = 0; a < r; a++) {
        for (var s = (t[a] + a * a - (t[i[n]] + i[n] * i[n])) / (2 * a - 2 * i[n]); s <= o[n];) {
          n--, s = (t[a] + a * a - (t[i[n]] + i[n] * i[n])) / (2 * a - 2 * i[n]);
        }

        i[++n] = a, o[n] = s, o[n + 1] = +_;
      }

      for (a = 0, n = 0; a < r; a++) {
        for (; o[n + 1] < a;) {
          n++;
        }

        e[a] = (a - i[n]) * (a - i[n]) + t[i[n]];
      }
    }

    f.prototype.draw = function (t) {
      this.ctx.clearRect(0, 0, this.size, this.size), this.ctx.fillText(t, this.buffer, this.middle);

      for (var e = this.ctx.getImageData(0, 0, this.size, this.size), i = new Uint8ClampedArray(this.size * this.size), o = 0; o < this.size * this.size; o++) {
        var r = e.data[4 * o + 3] / 255;
        this.gridOuter[o] = 1 === r ? 0 : 0 === r ? _ : Math.pow(Math.max(0, .5 - r), 2), this.gridInner[o] = 1 === r ? _ : 0 === r ? 0 : Math.pow(Math.max(0, r - .5), 2);
      }

      for (m(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z), m(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z), o = 0; o < this.size * this.size; o++) {
        var a = this.gridOuter[o] - this.gridInner[o];
        i[o] = Math.max(0, Math.min(255, Math.round(255 - 255 * (a / this.radius + this.cutoff))));
      }

      return i;
    };

    var v = function (t, e) {
      this.requestManager = t, this.localIdeographFontFamily = e, this.entries = {};
    };

    v.prototype.setURL = function (t) {
      this.url = t;
    }, v.prototype.getGlyphs = function (e, i) {
      var o = this,
          r = [];

      for (var a in e) {
        for (var n = 0, s = e[a]; n < s.length; n += 1) {
          var l = s[n];
          r.push({
            stack: a,
            id: l
          });
        }
      }

      t.asyncAll(r, function (t, e) {
        var i = t.stack,
            r = t.id,
            a = o.entries[i];
        a || (a = o.entries[i] = {
          glyphs: {},
          requests: {}
        });
        var n = a.glyphs[r];
        if (void 0 === n) {
          if (n = o._tinySDF(a, i, r)) e(null, {
            stack: i,
            id: r,
            glyph: n
          });else {
            var s = Math.floor(r / 256);
            if (256 * s > 65535) e(new Error("glyphs > 65535 not supported"));else {
              var l = a.requests[s];
              l || (l = a.requests[s] = [], v.loadGlyphRange(i, s, o.url, o.requestManager, function (t, e) {
                if (e) for (var i in e) {
                  a.glyphs[+i] = e[+i];
                }

                for (var o = 0, r = l; o < r.length; o += 1) {
                  (0, r[o])(t, e);
                }

                delete a.requests[s];
              })), l.push(function (t, o) {
                t ? e(t) : o && e(null, {
                  stack: i,
                  id: r,
                  glyph: o[r] || null
                });
              });
            }
          }
        } else e(null, {
          stack: i,
          id: r,
          glyph: n
        });
      }, function (t, e) {
        if (t) i(t);else if (e) {
          for (var o = {}, r = 0, a = e; r < a.length; r += 1) {
            var n = a[r],
                s = n.stack,
                l = n.id,
                c = n.glyph;
            (o[s] || (o[s] = {}))[l] = c && {
              id: c.id,
              bitmap: c.bitmap.clone(),
              metrics: c.metrics
            };
          }

          i(null, o);
        }
      });
    }, v.prototype._tinySDF = function (e, i, o) {
      var r = this.localIdeographFontFamily;

      if (r && (t.isChar["CJK Unified Ideographs"](o) || t.isChar["Hangul Syllables"](o) || t.isChar.Hiragana(o) || t.isChar.Katakana(o))) {
        var a = e.tinySDF;

        if (!a) {
          var n = "400";
          /bold/i.test(i) ? n = "900" : /medium/i.test(i) ? n = "500" : /light/i.test(i) && (n = "200"), a = e.tinySDF = new v.TinySDF(24, 3, 8, .25, r, n);
        }

        return {
          id: o,
          bitmap: new t.AlphaImage({
            width: 30,
            height: 30
          }, a.draw(String.fromCharCode(o))),
          metrics: {
            width: 24,
            height: 24,
            left: 0,
            top: -8,
            advance: 24
          }
        };
      }
    }, v.loadGlyphRange = function (e, i, o, r, a) {
      var n = 256 * i,
          s = n + 255,
          l = r.transformRequest(r.normalizeGlyphsURL(o).replace("{fontstack}", e).replace("{range}", n + "-" + s), t.ResourceType.Glyphs);
      t.getArrayBuffer(l, function (e, i) {
        if (e) a(e);else if (i) {
          for (var o = {}, r = 0, n = t.parseGlyphPBF(i); r < n.length; r += 1) {
            var s = n[r];
            o[s.id] = s;
          }

          a(null, o);
        }
      });
    }, v.TinySDF = d;

    var y = function () {
      this.specification = t.styleSpec.light.position;
    };

    y.prototype.possiblyEvaluate = function (e, i) {
      return t.sphericalToCartesian(e.expression.evaluate(i));
    }, y.prototype.interpolate = function (e, i, o) {
      return {
        x: t.number(e.x, i.x, o),
        y: t.number(e.y, i.y, o),
        z: t.number(e.z, i.z, o)
      };
    };

    var x = new t.Properties({
      anchor: new t.DataConstantProperty(t.styleSpec.light.anchor),
      position: new y(),
      color: new t.DataConstantProperty(t.styleSpec.light.color),
      intensity: new t.DataConstantProperty(t.styleSpec.light.intensity)
    }),
        b = function (e) {
      function i(i) {
        e.call(this), this._transitionable = new t.Transitionable(x), this.setLight(i), this._transitioning = this._transitionable.untransitioned();
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getLight = function () {
        return this._transitionable.serialize();
      }, i.prototype.setLight = function (e, i) {
        if (void 0 === i && (i = {}), !this._validate(t.validateLight, e, i)) for (var o in e) {
          var r = e[o];
          t.endsWith(o, "-transition") ? this._transitionable.setTransition(o.slice(0, -"-transition".length), r) : this._transitionable.setValue(o, r);
        }
      }, i.prototype.updateTransitions = function (t) {
        this._transitioning = this._transitionable.transitioned(t, this._transitioning);
      }, i.prototype.hasTransition = function () {
        return this._transitioning.hasTransition();
      }, i.prototype.recalculate = function (t) {
        this.properties = this._transitioning.possiblyEvaluate(t);
      }, i.prototype._validate = function (e, i, o) {
        return (!o || !1 !== o.validate) && t.emitValidationErrors(this, e.call(t.validateStyle, t.extend({
          value: i,
          style: {
            glyphs: !0,
            sprite: !0
          },
          styleSpec: t.styleSpec
        })));
      }, i;
    }(t.Evented),
        w = function (t, e) {
      this.width = t, this.height = e, this.nextRow = 0, this.bytes = 4, this.data = new Uint8Array(this.width * this.height * this.bytes), this.positions = {};
    };

    w.prototype.getDash = function (t, e) {
      var i = t.join(",") + String(e);
      return this.positions[i] || (this.positions[i] = this.addDash(t, e)), this.positions[i];
    }, w.prototype.addDash = function (e, i) {
      var o = i ? 7 : 0,
          r = 2 * o + 1;
      if (this.nextRow + r > this.height) return t.warnOnce("LineAtlas out of space"), null;

      for (var a = 0, n = 0; n < e.length; n++) {
        a += e[n];
      }

      for (var s = this.width / a, l = s / 2, c = e.length % 2 == 1, u = -o; u <= o; u++) {
        for (var h = this.nextRow + o + u, p = this.width * h, d = c ? -e[e.length - 1] : 0, _ = e[0], f = 1, m = 0; m < this.width; m++) {
          for (; _ < m / s;) {
            d = _, _ += e[f], c && f === e.length - 1 && (_ += e[0]), f++;
          }

          var g = Math.abs(m - d * s),
              v = Math.abs(m - _ * s),
              y = Math.min(g, v),
              x = f % 2 == 1,
              b = void 0;

          if (i) {
            var w = o ? u / o * (l + 1) : 0;

            if (x) {
              var E = l - Math.abs(w);
              b = Math.sqrt(y * y + E * E);
            } else b = l - Math.sqrt(y * y + w * w);
          } else b = (x ? 1 : -1) * y;

          this.data[3 + 4 * (p + m)] = Math.max(0, Math.min(255, b + 128));
        }
      }

      var T = {
        y: (this.nextRow + o + .5) / this.height,
        height: 2 * o / this.height,
        width: a
      };
      return this.nextRow += r, this.dirty = !0, T;
    }, w.prototype.bind = function (t) {
      var e = t.gl;
      this.texture ? (e.bindTexture(e.TEXTURE_2D, this.texture), this.dirty && (this.dirty = !1, e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, this.width, this.height, e.RGBA, e.UNSIGNED_BYTE, this.data))) : (this.texture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, this.width, this.height, 0, e.RGBA, e.UNSIGNED_BYTE, this.data));
    };

    var E = function e(i, o) {
      this.workerPool = i, this.actors = [], this.currentActor = 0, this.id = t.uniqueId();

      for (var r = this.workerPool.acquire(this.id), a = 0; a < r.length; a++) {
        var n = r[a],
            s = new e.Actor(n, o, this.id);
        s.name = "Worker " + a, this.actors.push(s);
      }
    };

    function T(e, i, o) {
      var r = function (r, a) {
        if (r) return o(r);

        if (a) {
          var n = t.pick(t.extend(a, e), ["tiles", "minzoom", "maxzoom", "attribution", "mapbox_logo", "bounds", "scheme", "tileSize", "encoding"]);
          a.vector_layers && (n.vectorLayers = a.vector_layers, n.vectorLayerIds = n.vectorLayers.map(function (t) {
            return t.id;
          })), e.url && (n.tiles = i.canonicalizeTileset(n, e.url)), o(null, n);
        }
      };

      return e.url ? t.getJSON(i.transformRequest(i.normalizeSourceURL(e.url), t.ResourceType.Source), r) : t.browser.frame(function () {
        return r(null, e);
      });
    }

    E.prototype.broadcast = function (e, i, o) {
      o = o || function () {}, t.asyncAll(this.actors, function (t, o) {
        t.send(e, i, o);
      }, o);
    }, E.prototype.send = function (t, e, i, o) {
      return ("number" != typeof o || isNaN(o)) && (o = this.currentActor = (this.currentActor + 1) % this.actors.length), this.actors[o].send(t, e, i), o;
    }, E.prototype.remove = function () {
      this.actors.forEach(function (t) {
        t.remove();
      }), this.actors = [], this.workerPool.release(this.id);
    }, E.Actor = t.Actor;

    var I = function (e, i, o) {
      this.bounds = t.LngLatBounds.convert(this.validateBounds(e)), this.minzoom = i || 0, this.maxzoom = o || 24;
    };

    I.prototype.validateBounds = function (t) {
      return Array.isArray(t) && 4 === t.length ? [Math.max(-180, t[0]), Math.max(-90, t[1]), Math.min(180, t[2]), Math.min(90, t[3])] : [-180, -90, 180, 90];
    }, I.prototype.contains = function (e) {
      var i = Math.pow(2, e.z),
          o = Math.floor(t.mercatorXfromLng(this.bounds.getWest()) * i),
          r = Math.floor(t.mercatorYfromLat(this.bounds.getNorth()) * i),
          a = Math.ceil(t.mercatorXfromLng(this.bounds.getEast()) * i),
          n = Math.ceil(t.mercatorYfromLat(this.bounds.getSouth()) * i);
      return e.x >= o && e.x < a && e.y >= r && e.y < n;
    };

    var C = function (e) {
      function i(i, o, r, a) {
        if (e.call(this), this.id = i, this.dispatcher = r, this.type = "vector", this.minzoom = 0, this.maxzoom = 22, this.scheme = "xyz", this.tileSize = 512, this.reparseOverscaled = !0, this.isTileClipped = !0, t.extend(this, t.pick(o, ["url", "scheme", "tileSize"])), this._options = t.extend({
          type: "vector"
        }, o), this._collectResourceTiming = o.collectResourceTiming, 512 !== this.tileSize) throw new Error("vector tile sources must have a tileSize of 512");
        this.setEventedParent(a);
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function () {
        var e = this;
        this.fire(new t.Event("dataloading", {
          dataType: "source"
        })), this._tileJSONRequest = T(this._options, this.map._requestManager, function (i, o) {
          e._tileJSONRequest = null, i ? e.fire(new t.ErrorEvent(i)) : o && (t.extend(e, o), o.bounds && (e.tileBounds = new I(o.bounds, e.minzoom, e.maxzoom)), t.postTurnstileEvent(o.tiles, e.map._requestManager._customAccessToken), t.postMapLoadEvent(o.tiles, e.map._getMapId(), e.map._requestManager._skuToken, e.map._requestManager._customAccessToken), e.fire(new t.Event("data", {
            dataType: "source",
            sourceDataType: "metadata"
          })), e.fire(new t.Event("data", {
            dataType: "source",
            sourceDataType: "content"
          })));
        });
      }, i.prototype.hasTile = function (t) {
        return !this.tileBounds || this.tileBounds.contains(t.canonical);
      }, i.prototype.onAdd = function (t) {
        this.map = t, this.load();
      }, i.prototype.onRemove = function () {
        this._tileJSONRequest && (this._tileJSONRequest.cancel(), this._tileJSONRequest = null);
      }, i.prototype.serialize = function () {
        return t.extend({}, this._options);
      }, i.prototype.loadTile = function (e, i) {
        var o = this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles, this.scheme), this.url, null),
            r = {
          request: this.map._requestManager.transformRequest(o, t.ResourceType.Tile),
          uid: e.uid,
          tileID: e.tileID,
          zoom: e.tileID.overscaledZ,
          tileSize: this.tileSize * e.tileID.overscaleFactor(),
          type: this.type,
          source: this.id,
          pixelRatio: t.browser.devicePixelRatio,
          showCollisionBoxes: this.map.showCollisionBoxes
        };

        function a(o, r) {
          return e.aborted ? i(null) : o && 404 !== o.status ? i(o) : (r && r.resourceTiming && (e.resourceTiming = r.resourceTiming), this.map._refreshExpiredTiles && r && e.setExpiryData(r), e.loadVectorData(r, this.map.painter), t.cacheEntryPossiblyAdded(this.dispatcher), i(null), void (e.reloadCallback && (this.loadTile(e, e.reloadCallback), e.reloadCallback = null)));
        }

        r.request.collectResourceTiming = this._collectResourceTiming, void 0 === e.workerID || "expired" === e.state ? e.workerID = this.dispatcher.send("loadTile", r, a.bind(this)) : "loading" === e.state ? e.reloadCallback = i : this.dispatcher.send("reloadTile", r, a.bind(this), e.workerID);
      }, i.prototype.abortTile = function (t) {
        this.dispatcher.send("abortTile", {
          uid: t.uid,
          type: this.type,
          source: this.id
        }, void 0, t.workerID);
      }, i.prototype.unloadTile = function (t) {
        t.unloadVectorData(), this.dispatcher.send("removeTile", {
          uid: t.uid,
          type: this.type,
          source: this.id
        }, void 0, t.workerID);
      }, i.prototype.hasTransition = function () {
        return !1;
      }, i;
    }(t.Evented),
        S = function (e) {
      function i(i, o, r, a) {
        e.call(this), this.id = i, this.dispatcher = r, this.setEventedParent(a), this.type = "raster", this.minzoom = 0, this.maxzoom = 22, this.roundZoom = !0, this.scheme = "xyz", this.tileSize = 512, this._loaded = !1, this._options = t.extend({
          type: "raster"
        }, o), t.extend(this, t.pick(o, ["url", "scheme", "tileSize"]));
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function () {
        var e = this;
        this.fire(new t.Event("dataloading", {
          dataType: "source"
        })), this._tileJSONRequest = T(this._options, this.map._requestManager, function (i, o) {
          e._tileJSONRequest = null, i ? e.fire(new t.ErrorEvent(i)) : o && (t.extend(e, o), o.bounds && (e.tileBounds = new I(o.bounds, e.minzoom, e.maxzoom)), t.postTurnstileEvent(o.tiles), t.postMapLoadEvent(o.tiles, e.map._getMapId(), e.map._requestManager._skuToken), e.fire(new t.Event("data", {
            dataType: "source",
            sourceDataType: "metadata"
          })), e.fire(new t.Event("data", {
            dataType: "source",
            sourceDataType: "content"
          })));
        });
      }, i.prototype.onAdd = function (t) {
        this.map = t, this.load();
      }, i.prototype.onRemove = function () {
        this._tileJSONRequest && (this._tileJSONRequest.cancel(), this._tileJSONRequest = null);
      }, i.prototype.serialize = function () {
        return t.extend({}, this._options);
      }, i.prototype.hasTile = function (t) {
        return !this.tileBounds || this.tileBounds.contains(t.canonical);
      }, i.prototype.loadTile = function (e, i) {
        var o = this,
            r = this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles, this.scheme), this.url, this.tileSize);

        e.request = t.getImage(this.map._requestManager.transformRequest(r, t.ResourceType.Tile), function (r, a) {
          if (delete e.request, e.aborted) e.state = "unloaded", i(null);else if (r) e.state = "errored", i(r);else if (a) {
            o.map._refreshExpiredTiles && e.setExpiryData(a), delete a.cacheControl, delete a.expires;
            var n = o.map.painter.context,
                s = n.gl;
            e.texture = o.map.painter.getTileTexture(a.width), e.texture ? e.texture.update(a, {
              useMipmap: !0
            }) : (e.texture = new t.Texture(n, a, s.RGBA, {
              useMipmap: !0
            }), e.texture.bind(s.LINEAR, s.CLAMP_TO_EDGE, s.LINEAR_MIPMAP_NEAREST), n.extTextureFilterAnisotropic && s.texParameterf(s.TEXTURE_2D, n.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, n.extTextureFilterAnisotropicMax)), e.state = "loaded", t.cacheEntryPossiblyAdded(o.dispatcher), i(null);
          }
        });
      }, i.prototype.abortTile = function (t, e) {
        t.request && (t.request.cancel(), delete t.request), e();
      }, i.prototype.unloadTile = function (t, e) {
        t.texture && this.map.painter.saveTileTexture(t.texture), e();
      }, i.prototype.hasTransition = function () {
        return !1;
      }, i;
    }(t.Evented),
        P = function (e) {
      function i(i, o, r, a) {
        e.call(this, i, o, r, a), this.type = "raster-dem", this.maxzoom = 22, this._options = t.extend({
          type: "raster-dem"
        }, o), this.encoding = o.encoding || "mapbox";
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.serialize = function () {
        return {
          type: "raster-dem",
          url: this.url,
          tileSize: this.tileSize,
          tiles: this.tiles,
          bounds: this.bounds,
          encoding: this.encoding
        };
      }, i.prototype.loadTile = function (e, i) {
        var o = this.map._requestManager.normalizeTileURL(e.tileID.canonical.url(this.tiles, this.scheme), this.url, this.tileSize);

        e.request = t.getImage(this.map._requestManager.transformRequest(o, t.ResourceType.Tile), function (o, r) {
          if (delete e.request, e.aborted) e.state = "unloaded", i(null);else if (o) e.state = "errored", i(o);else if (r) {
            this.map._refreshExpiredTiles && e.setExpiryData(r), delete r.cacheControl, delete r.expires;
            var a = t.browser.getImageData(r),
                n = {
              uid: e.uid,
              coord: e.tileID,
              source: this.id,
              rawImageData: a,
              encoding: this.encoding
            };
            e.workerID && "expired" !== e.state || (e.workerID = this.dispatcher.send("loadDEMTile", n, function (t, o) {
              t && (e.state = "errored", i(t));
              o && (e.dem = o, e.needsHillshadePrepare = !0, e.state = "loaded", i(null));
            }.bind(this)));
          }
        }.bind(this)), e.neighboringTiles = this._getNeighboringTiles(e.tileID);
      }, i.prototype._getNeighboringTiles = function (e) {
        var i = e.canonical,
            o = Math.pow(2, i.z),
            r = (i.x - 1 + o) % o,
            a = 0 === i.x ? e.wrap - 1 : e.wrap,
            n = (i.x + 1 + o) % o,
            s = i.x + 1 === o ? e.wrap + 1 : e.wrap,
            l = {};
        return l[new t.OverscaledTileID(e.overscaledZ, a, i.z, r, i.y).key] = {
          backfilled: !1
        }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, n, i.y).key] = {
          backfilled: !1
        }, i.y > 0 && (l[new t.OverscaledTileID(e.overscaledZ, a, i.z, r, i.y - 1).key] = {
          backfilled: !1
        }, l[new t.OverscaledTileID(e.overscaledZ, e.wrap, i.z, i.x, i.y - 1).key] = {
          backfilled: !1
        }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, n, i.y - 1).key] = {
          backfilled: !1
        }), i.y + 1 < o && (l[new t.OverscaledTileID(e.overscaledZ, a, i.z, r, i.y + 1).key] = {
          backfilled: !1
        }, l[new t.OverscaledTileID(e.overscaledZ, e.wrap, i.z, i.x, i.y + 1).key] = {
          backfilled: !1
        }, l[new t.OverscaledTileID(e.overscaledZ, s, i.z, n, i.y + 1).key] = {
          backfilled: !1
        }), l;
      }, i.prototype.unloadTile = function (t) {
        t.demTexture && this.map.painter.saveTileTexture(t.demTexture), t.fbo && (t.fbo.destroy(), delete t.fbo), t.dem && delete t.dem, delete t.neighboringTiles, t.state = "unloaded", this.dispatcher.send("removeDEMTile", {
          uid: t.uid,
          source: this.id
        }, void 0, t.workerID);
      }, i;
    }(S),
        z = function (e) {
      function i(i, o, r, a) {
        e.call(this), this.id = i, this.type = "geojson", this.minzoom = 0, this.maxzoom = 18, this.tileSize = 512, this.isTileClipped = !0, this.reparseOverscaled = !0, this._removed = !1, this.dispatcher = r, this.setEventedParent(a), this._data = o.data, this._options = t.extend({}, o), this._collectResourceTiming = o.collectResourceTiming, this._resourceTiming = [], void 0 !== o.maxzoom && (this.maxzoom = o.maxzoom), o.type && (this.type = o.type), o.attribution && (this.attribution = o.attribution);
        var n = t.EXTENT / this.tileSize;
        this.workerOptions = t.extend({
          source: this.id,
          cluster: o.cluster || !1,
          geojsonVtOptions: {
            buffer: (void 0 !== o.buffer ? o.buffer : 128) * n,
            tolerance: (void 0 !== o.tolerance ? o.tolerance : .375) * n,
            extent: t.EXTENT,
            maxZoom: this.maxzoom,
            lineMetrics: o.lineMetrics || !1,
            generateId: o.generateId || !1
          },
          superclusterOptions: {
            maxZoom: void 0 !== o.clusterMaxZoom ? Math.min(o.clusterMaxZoom, this.maxzoom - 1) : this.maxzoom - 1,
            extent: t.EXTENT,
            radius: (o.clusterRadius || 50) * n,
            log: !1
          },
          clusterProperties: o.clusterProperties
        }, o.workerOptions);
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function () {
        var e = this;
        this.fire(new t.Event("dataloading", {
          dataType: "source"
        })), this._updateWorkerData(function (i) {
          if (i) e.fire(new t.ErrorEvent(i));else {
            var o = {
              dataType: "source",
              sourceDataType: "metadata"
            };
            e._collectResourceTiming && e._resourceTiming && e._resourceTiming.length > 0 && (o.resourceTiming = e._resourceTiming, e._resourceTiming = []), e.fire(new t.Event("data", o));
          }
        });
      }, i.prototype.onAdd = function (t) {
        this.map = t, this.load();
      }, i.prototype.setData = function (e) {
        var i = this;
        return this._data = e, this.fire(new t.Event("dataloading", {
          dataType: "source"
        })), this._updateWorkerData(function (e) {
          if (e) i.fire(new t.ErrorEvent(e));else {
            var o = {
              dataType: "source",
              sourceDataType: "content"
            };
            i._collectResourceTiming && i._resourceTiming && i._resourceTiming.length > 0 && (o.resourceTiming = i._resourceTiming, i._resourceTiming = []), i.fire(new t.Event("data", o));
          }
        }), this;
      }, i.prototype.getClusterExpansionZoom = function (t, e) {
        return this.dispatcher.send("geojson.getClusterExpansionZoom", {
          clusterId: t,
          source: this.id
        }, e, this.workerID), this;
      }, i.prototype.getClusterChildren = function (t, e) {
        return this.dispatcher.send("geojson.getClusterChildren", {
          clusterId: t,
          source: this.id
        }, e, this.workerID), this;
      }, i.prototype.getClusterLeaves = function (t, e, i, o) {
        return this.dispatcher.send("geojson.getClusterLeaves", {
          source: this.id,
          clusterId: t,
          limit: e,
          offset: i
        }, o, this.workerID), this;
      }, i.prototype._updateWorkerData = function (e) {
        var i = this,
            o = t.extend({}, this.workerOptions),
            r = this._data;
        "string" == typeof r ? (o.request = this.map._requestManager.transformRequest(t.browser.resolveURL(r), t.ResourceType.Source), o.request.collectResourceTiming = this._collectResourceTiming) : o.data = JSON.stringify(r), this.workerID = this.dispatcher.send(this.type + ".loadData", o, function (t, r) {
          i._removed || r && r.abandoned || (i._loaded = !0, r && r.resourceTiming && r.resourceTiming[i.id] && (i._resourceTiming = r.resourceTiming[i.id].slice(0)), i.dispatcher.send(i.type + ".coalesce", {
            source: o.source
          }, null, i.workerID), e(t));
        }, this.workerID);
      }, i.prototype.loadTile = function (e, i) {
        var o = this,
            r = void 0 === e.workerID ? "loadTile" : "reloadTile",
            a = {
          type: this.type,
          uid: e.uid,
          tileID: e.tileID,
          zoom: e.tileID.overscaledZ,
          maxZoom: this.maxzoom,
          tileSize: this.tileSize,
          source: this.id,
          pixelRatio: t.browser.devicePixelRatio,
          showCollisionBoxes: this.map.showCollisionBoxes
        };
        e.workerID = this.dispatcher.send(r, a, function (t, a) {
          return e.unloadVectorData(), e.aborted ? i(null) : t ? i(t) : (e.loadVectorData(a, o.map.painter, "reloadTile" === r), i(null));
        }, this.workerID);
      }, i.prototype.abortTile = function (t) {
        t.aborted = !0;
      }, i.prototype.unloadTile = function (t) {
        t.unloadVectorData(), this.dispatcher.send("removeTile", {
          uid: t.uid,
          type: this.type,
          source: this.id
        }, null, t.workerID);
      }, i.prototype.onRemove = function () {
        this._removed = !0, this.dispatcher.send("removeSource", {
          type: this.type,
          source: this.id
        }, null, this.workerID);
      }, i.prototype.serialize = function () {
        return t.extend({}, this._options, {
          type: this.type,
          data: this._data
        });
      }, i.prototype.hasTransition = function () {
        return !1;
      }, i;
    }(t.Evented),
        L = function (e) {
      function i(t, i, o, r) {
        e.call(this), this.id = t, this.dispatcher = o, this.coordinates = i.coordinates, this.type = "image", this.minzoom = 0, this.maxzoom = 22, this.tileSize = 512, this.tiles = {}, this.setEventedParent(r), this.options = i;
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function (e, i) {
        var o = this;
        this.fire(new t.Event("dataloading", {
          dataType: "source"
        })), this.url = this.options.url, t.getImage(this.map._requestManager.transformRequest(this.url, t.ResourceType.Image), function (r, a) {
          r ? o.fire(new t.ErrorEvent(r)) : a && (o.image = a, e && (o.coordinates = e), i && i(), o._finishLoading());
        });
      }, i.prototype.updateImage = function (t) {
        var e = this;
        return this.image && t.url ? (this.options.url = t.url, this.load(t.coordinates, function () {
          e.texture = null;
        }), this) : this;
      }, i.prototype._finishLoading = function () {
        this.map && (this.setCoordinates(this.coordinates), this.fire(new t.Event("data", {
          dataType: "source",
          sourceDataType: "metadata"
        })));
      }, i.prototype.onAdd = function (t) {
        this.map = t, this.load();
      }, i.prototype.setCoordinates = function (e) {
        var i = this;
        this.coordinates = e;
        var o = e.map(t.MercatorCoordinate.fromLngLat);
        this.tileID = function (e) {
          for (var i = 1 / 0, o = 1 / 0, r = -1 / 0, a = -1 / 0, n = 0, s = e; n < s.length; n += 1) {
            var l = s[n];
            i = Math.min(i, l.x), o = Math.min(o, l.y), r = Math.max(r, l.x), a = Math.max(a, l.y);
          }

          var c = r - i,
              u = a - o,
              h = Math.max(c, u),
              p = Math.max(0, Math.floor(-Math.log(h) / Math.LN2)),
              d = Math.pow(2, p);
          return new t.CanonicalTileID(p, Math.floor((i + r) / 2 * d), Math.floor((o + a) / 2 * d));
        }(o), this.minzoom = this.maxzoom = this.tileID.z;
        var r = o.map(function (t) {
          return i.tileID.getTilePoint(t)._round();
        });
        return this._boundsArray = new t.StructArrayLayout4i8(), this._boundsArray.emplaceBack(r[0].x, r[0].y, 0, 0), this._boundsArray.emplaceBack(r[1].x, r[1].y, t.EXTENT, 0), this._boundsArray.emplaceBack(r[3].x, r[3].y, 0, t.EXTENT), this._boundsArray.emplaceBack(r[2].x, r[2].y, t.EXTENT, t.EXTENT), this.boundsBuffer && (this.boundsBuffer.destroy(), delete this.boundsBuffer), this.fire(new t.Event("data", {
          dataType: "source",
          sourceDataType: "content"
        })), this;
      }, i.prototype.prepare = function () {
        if (0 !== Object.keys(this.tiles).length && this.image) {
          var e = this.map.painter.context,
              i = e.gl;

          for (var o in this.boundsBuffer || (this.boundsBuffer = e.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsSegments || (this.boundsSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2)), this.texture || (this.texture = new t.Texture(e, this.image, i.RGBA), this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE)), this.tiles) {
            var r = this.tiles[o];
            "loaded" !== r.state && (r.state = "loaded", r.texture = this.texture);
          }
        }
      }, i.prototype.loadTile = function (t, e) {
        this.tileID && this.tileID.equals(t.tileID.canonical) ? (this.tiles[String(t.tileID.wrap)] = t, t.buckets = {}, e(null)) : (t.state = "errored", e(null));
      }, i.prototype.serialize = function () {
        return {
          type: "image",
          url: this.options.url,
          coordinates: this.coordinates
        };
      }, i.prototype.hasTransition = function () {
        return !1;
      }, i;
    }(t.Evented);

    var D = function (e) {
      function i(t, i, o, r) {
        e.call(this, t, i, o, r), this.roundZoom = !0, this.type = "video", this.options = i;
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function () {
        var e = this,
            i = this.options;
        this.urls = [];

        for (var o = 0, r = i.urls; o < r.length; o += 1) {
          var a = r[o];
          this.urls.push(this.map._requestManager.transformRequest(a, t.ResourceType.Source).url);
        }

        t.getVideo(this.urls, function (i, o) {
          i ? e.fire(new t.ErrorEvent(i)) : o && (e.video = o, e.video.loop = !0, e.video.addEventListener("playing", function () {
            e.map.triggerRepaint();
          }), e.map && e.video.play(), e._finishLoading());
        });
      }, i.prototype.getVideo = function () {
        return this.video;
      }, i.prototype.onAdd = function (t) {
        this.map || (this.map = t, this.load(), this.video && (this.video.play(), this.setCoordinates(this.coordinates)));
      }, i.prototype.prepare = function () {
        if (!(0 === Object.keys(this.tiles).length || this.video.readyState < 2)) {
          var e = this.map.painter.context,
              i = e.gl;

          for (var o in this.boundsBuffer || (this.boundsBuffer = e.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsSegments || (this.boundsSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2)), this.texture ? this.video.paused || (this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE), i.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, i.RGBA, i.UNSIGNED_BYTE, this.video)) : (this.texture = new t.Texture(e, this.video, i.RGBA), this.texture.bind(i.LINEAR, i.CLAMP_TO_EDGE)), this.tiles) {
            var r = this.tiles[o];
            "loaded" !== r.state && (r.state = "loaded", r.texture = this.texture);
          }
        }
      }, i.prototype.serialize = function () {
        return {
          type: "video",
          urls: this.urls,
          coordinates: this.coordinates
        };
      }, i.prototype.hasTransition = function () {
        return this.video && !this.video.paused;
      }, i;
    }(L),
        M = function (e) {
      function i(i, o, r, a) {
        e.call(this, i, o, r, a), o.coordinates ? Array.isArray(o.coordinates) && 4 === o.coordinates.length && !o.coordinates.some(function (t) {
          return !Array.isArray(t) || 2 !== t.length || t.some(function (t) {
            return "number" != typeof t;
          });
        }) || this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, '"coordinates" property must be an array of 4 longitude/latitude array pairs'))) : this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'missing required property "coordinates"'))), o.animate && "boolean" != typeof o.animate && this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'optional "animate" property must be a boolean value'))), o.canvas ? "string" == typeof o.canvas || o.canvas instanceof t.window.HTMLCanvasElement || this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, '"canvas" must be either a string representing the ID of the canvas element from which to read, or an HTMLCanvasElement instance'))) : this.fire(new t.ErrorEvent(new t.ValidationError("sources." + i, null, 'missing required property "canvas"'))), this.options = o, this.animate = void 0 === o.animate || o.animate;
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.load = function () {
        this.canvas || (this.canvas = this.options.canvas instanceof t.window.HTMLCanvasElement ? this.options.canvas : t.window.document.getElementById(this.options.canvas)), this.width = this.canvas.width, this.height = this.canvas.height, this._hasInvalidDimensions() ? this.fire(new t.ErrorEvent(new Error("Canvas dimensions cannot be less than or equal to zero."))) : (this.play = function () {
          this._playing = !0, this.map.triggerRepaint();
        }, this.pause = function () {
          this._playing && (this.prepare(), this._playing = !1);
        }, this._finishLoading());
      }, i.prototype.getCanvas = function () {
        return this.canvas;
      }, i.prototype.onAdd = function (t) {
        this.map = t, this.load(), this.canvas && this.animate && this.play();
      }, i.prototype.onRemove = function () {
        this.pause();
      }, i.prototype.prepare = function () {
        var e = !1;

        if (this.canvas.width !== this.width && (this.width = this.canvas.width, e = !0), this.canvas.height !== this.height && (this.height = this.canvas.height, e = !0), !this._hasInvalidDimensions() && 0 !== Object.keys(this.tiles).length) {
          var i = this.map.painter.context,
              o = i.gl;

          for (var r in this.boundsBuffer || (this.boundsBuffer = i.createVertexBuffer(this._boundsArray, t.rasterBoundsAttributes.members)), this.boundsSegments || (this.boundsSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2)), this.texture ? (e || this._playing) && this.texture.update(this.canvas, {
            premultiply: !0
          }) : this.texture = new t.Texture(i, this.canvas, o.RGBA, {
            premultiply: !0
          }), this.tiles) {
            var a = this.tiles[r];
            "loaded" !== a.state && (a.state = "loaded", a.texture = this.texture);
          }
        }
      }, i.prototype.serialize = function () {
        return {
          type: "canvas",
          coordinates: this.coordinates
        };
      }, i.prototype.hasTransition = function () {
        return this._playing;
      }, i.prototype._hasInvalidDimensions = function () {
        for (var t = 0, e = [this.canvas.width, this.canvas.height]; t < e.length; t += 1) {
          var i = e[t];
          if (isNaN(i) || i <= 0) return !0;
        }

        return !1;
      }, i;
    }(L),
        R = {
      vector: C,
      raster: S,
      "raster-dem": P,
      geojson: z,
      video: D,
      image: L,
      canvas: M
    },
        A = function (e, i, o, r) {
      var a = new R[i.type](e, i, o, r);
      if (a.id !== e) throw new Error("Expected Source id to be " + e + " instead of " + a.id);
      return t.bindAll(["load", "abort", "unload", "serialize", "prepare"], a), a;
    };

    function k(e, i) {
      var o = t.identity([]);
      return t.translate(o, o, [1, 1, 0]), t.scale(o, o, [.5 * e.width, .5 * e.height, 1]), t.multiply(o, o, e.calculatePosMatrix(i.toUnwrapped()));
    }

    function B(t, e, i, o, r) {
      var a = function (t, e, i) {
        if (t) for (var o = 0, r = t; o < r.length; o += 1) {
          var a = e[r[o]];
          if (a && a.source === i && "fill-extrusion" === a.type) return !0;
        } else for (var n in e) {
          var s = e[n];
          if (s.source === i && "fill-extrusion" === s.type) return !0;
        }
        return !1;
      }(o && o.layers, e, t.id),
          n = r.maxPitchScaleFactor(),
          s = t.tilesIn(i, n, a);

      s.sort(O);

      for (var l = [], c = 0, u = s; c < u.length; c += 1) {
        var h = u[c];
        l.push({
          wrappedTileID: h.tileID.wrapped().key,
          queryResults: h.tile.queryRenderedFeatures(e, t._state, h.queryGeometry, h.cameraQueryGeometry, h.scale, o, r, n, k(t.transform, h.tileID))
        });
      }

      var p = function (t) {
        for (var e = {}, i = {}, o = 0, r = t; o < r.length; o += 1) {
          var a = r[o],
              n = a.queryResults,
              s = a.wrappedTileID,
              l = i[s] = i[s] || {};

          for (var c in n) {
            for (var u = n[c], h = l[c] = l[c] || {}, p = e[c] = e[c] || [], d = 0, _ = u; d < _.length; d += 1) {
              var f = _[d];
              h[f.featureIndex] || (h[f.featureIndex] = !0, p.push(f));
            }
          }
        }

        return e;
      }(l);

      for (var d in p) {
        p[d].forEach(function (e) {
          var i = e.feature,
              o = t.getFeatureState(i.layer["source-layer"], i.id);
          i.source = i.layer.source, i.layer["source-layer"] && (i.sourceLayer = i.layer["source-layer"]), i.state = o;
        });
      }

      return p;
    }

    function O(t, e) {
      var i = t.tileID,
          o = e.tileID;
      return i.overscaledZ - o.overscaledZ || i.canonical.y - o.canonical.y || i.wrap - o.wrap || i.canonical.x - o.canonical.x;
    }

    var F = function (t, e) {
      this.max = t, this.onRemove = e, this.reset();
    };

    F.prototype.reset = function () {
      for (var t in this.data) {
        for (var e = 0, i = this.data[t]; e < i.length; e += 1) {
          var o = i[e];
          o.timeout && clearTimeout(o.timeout), this.onRemove(o.value);
        }
      }

      return this.data = {}, this.order = [], this;
    }, F.prototype.add = function (t, e, i) {
      var o = this,
          r = t.wrapped().key;
      void 0 === this.data[r] && (this.data[r] = []);
      var a = {
        value: e,
        timeout: void 0
      };

      if (void 0 !== i && (a.timeout = setTimeout(function () {
        o.remove(t, a);
      }, i)), this.data[r].push(a), this.order.push(r), this.order.length > this.max) {
        var n = this._getAndRemoveByKey(this.order[0]);

        n && this.onRemove(n);
      }

      return this;
    }, F.prototype.has = function (t) {
      return t.wrapped().key in this.data;
    }, F.prototype.getAndRemove = function (t) {
      return this.has(t) ? this._getAndRemoveByKey(t.wrapped().key) : null;
    }, F.prototype._getAndRemoveByKey = function (t) {
      var e = this.data[t].shift();
      return e.timeout && clearTimeout(e.timeout), 0 === this.data[t].length && delete this.data[t], this.order.splice(this.order.indexOf(t), 1), e.value;
    }, F.prototype.get = function (t) {
      return this.has(t) ? this.data[t.wrapped().key][0].value : null;
    }, F.prototype.remove = function (t, e) {
      if (!this.has(t)) return this;
      var i = t.wrapped().key,
          o = void 0 === e ? 0 : this.data[i].indexOf(e),
          r = this.data[i][o];
      return this.data[i].splice(o, 1), r.timeout && clearTimeout(r.timeout), 0 === this.data[i].length && delete this.data[i], this.onRemove(r.value), this.order.splice(this.order.indexOf(i), 1), this;
    }, F.prototype.setMaxSize = function (t) {
      for (this.max = t; this.order.length > this.max;) {
        var e = this._getAndRemoveByKey(this.order[0]);

        e && this.onRemove(e);
      }

      return this;
    };

    var U = function (t, e, i) {
      this.context = t;
      var o = t.gl;
      this.buffer = o.createBuffer(), this.dynamicDraw = Boolean(i), this.context.unbindVAO(), t.bindElementBuffer.set(this.buffer), o.bufferData(o.ELEMENT_ARRAY_BUFFER, e.arrayBuffer, this.dynamicDraw ? o.DYNAMIC_DRAW : o.STATIC_DRAW), this.dynamicDraw || delete e.arrayBuffer;
    };

    U.prototype.bind = function () {
      this.context.bindElementBuffer.set(this.buffer);
    }, U.prototype.updateData = function (t) {
      var e = this.context.gl;
      this.context.unbindVAO(), this.bind(), e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, 0, t.arrayBuffer);
    }, U.prototype.destroy = function () {
      var t = this.context.gl;
      this.buffer && (t.deleteBuffer(this.buffer), delete this.buffer);
    };

    var N = {
      Int8: "BYTE",
      Uint8: "UNSIGNED_BYTE",
      Int16: "SHORT",
      Uint16: "UNSIGNED_SHORT",
      Int32: "INT",
      Uint32: "UNSIGNED_INT",
      Float32: "FLOAT"
    },
        Z = function (t, e, i, o) {
      this.length = e.length, this.attributes = i, this.itemSize = e.bytesPerElement, this.dynamicDraw = o, this.context = t;
      var r = t.gl;
      this.buffer = r.createBuffer(), t.bindVertexBuffer.set(this.buffer), r.bufferData(r.ARRAY_BUFFER, e.arrayBuffer, this.dynamicDraw ? r.DYNAMIC_DRAW : r.STATIC_DRAW), this.dynamicDraw || delete e.arrayBuffer;
    };

    Z.prototype.bind = function () {
      this.context.bindVertexBuffer.set(this.buffer);
    }, Z.prototype.updateData = function (t) {
      var e = this.context.gl;
      this.bind(), e.bufferSubData(e.ARRAY_BUFFER, 0, t.arrayBuffer);
    }, Z.prototype.enableAttributes = function (t, e) {
      for (var i = 0; i < this.attributes.length; i++) {
        var o = this.attributes[i],
            r = e.attributes[o.name];
        void 0 !== r && t.enableVertexAttribArray(r);
      }
    }, Z.prototype.setVertexAttribPointers = function (t, e, i) {
      for (var o = 0; o < this.attributes.length; o++) {
        var r = this.attributes[o],
            a = e.attributes[r.name];
        void 0 !== a && t.vertexAttribPointer(a, r.components, t[N[r.type]], !1, this.itemSize, r.offset + this.itemSize * (i || 0));
      }
    }, Z.prototype.destroy = function () {
      var t = this.context.gl;
      this.buffer && (t.deleteBuffer(this.buffer), delete this.buffer);
    };

    var j = function (t) {
      this.gl = t.gl, this.default = this.getDefault(), this.current = this.default, this.dirty = !1;
    };

    j.prototype.get = function () {
      return this.current;
    }, j.prototype.set = function (t) {}, j.prototype.getDefault = function () {
      return this.default;
    }, j.prototype.setDefault = function () {
      this.set(this.default);
    };

    var q = function (e) {
      function i() {
        e.apply(this, arguments);
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getDefault = function () {
        return t.Color.transparent;
      }, i.prototype.set = function (t) {
        var e = this.current;
        (t.r !== e.r || t.g !== e.g || t.b !== e.b || t.a !== e.a || this.dirty) && (this.gl.clearColor(t.r, t.g, t.b, t.a), this.current = t, this.dirty = !1);
      }, i;
    }(j),
        V = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return 1;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.clearDepth(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        G = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return 0;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.clearStencil(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        W = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return [!0, !0, !0, !0];
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || t[3] !== e[3] || this.dirty) && (this.gl.colorMask(t[0], t[1], t[2], t[3]), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        X = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !0;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.depthMask(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        H = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return 255;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.stencilMask(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        K = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return {
          func: this.gl.ALWAYS,
          ref: 0,
          mask: 255
        };
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t.func !== e.func || t.ref !== e.ref || t.mask !== e.mask || this.dirty) && (this.gl.stencilFunc(t.func, t.ref, t.mask), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        Y = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        var t = this.gl;
        return [t.KEEP, t.KEEP, t.KEEP];
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || this.dirty) && (this.gl.stencilOp(t[0], t[1], t[2]), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        J = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          t ? e.enable(e.STENCIL_TEST) : e.disable(e.STENCIL_TEST), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        Q = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return [0, 1];
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t[0] !== e[0] || t[1] !== e[1] || this.dirty) && (this.gl.depthRange(t[0], t[1]), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        $ = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          t ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        tt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return this.gl.LESS;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.depthFunc(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        et = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          t ? e.enable(e.BLEND) : e.disable(e.BLEND), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        it = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        var t = this.gl;
        return [t.ONE, t.ZERO];
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t[0] !== e[0] || t[1] !== e[1] || this.dirty) && (this.gl.blendFunc(t[0], t[1]), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        ot = function (e) {
      function i() {
        e.apply(this, arguments);
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getDefault = function () {
        return t.Color.transparent;
      }, i.prototype.set = function (t) {
        var e = this.current;
        (t.r !== e.r || t.g !== e.g || t.b !== e.b || t.a !== e.a || this.dirty) && (this.gl.blendColor(t.r, t.g, t.b, t.a), this.current = t, this.dirty = !1);
      }, i;
    }(j),
        rt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return this.gl.FUNC_ADD;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.blendEquation(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        at = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          t ? e.enable(e.CULL_FACE) : e.disable(e.CULL_FACE), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        nt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return this.gl.BACK;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.cullFace(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        st = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return this.gl.CCW;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.frontFace(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        lt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.useProgram(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        ct = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return this.gl.TEXTURE0;
      }, e.prototype.set = function (t) {
        (t !== this.current || this.dirty) && (this.gl.activeTexture(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        ut = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        var t = this.gl;
        return [0, 0, t.drawingBufferWidth, t.drawingBufferHeight];
      }, e.prototype.set = function (t) {
        var e = this.current;
        (t[0] !== e[0] || t[1] !== e[1] || t[2] !== e[2] || t[3] !== e[3] || this.dirty) && (this.gl.viewport(t[0], t[1], t[2], t[3]), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        ht = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.bindFramebuffer(e.FRAMEBUFFER, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        pt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.bindRenderbuffer(e.RENDERBUFFER, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        dt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.bindTexture(e.TEXTURE_2D, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        _t = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.bindBuffer(e.ARRAY_BUFFER, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        ft = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        var e = this.gl;
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t), this.current = t, this.dirty = !1;
      }, e;
    }(j),
        mt = function (t) {
      function e(e) {
        t.call(this, e), this.vao = e.extVertexArrayObject;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e.prototype.set = function (t) {
        this.vao && (t !== this.current || this.dirty) && (this.vao.bindVertexArrayOES(t), this.current = t, this.dirty = !1);
      }, e;
    }(j),
        gt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return 4;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.pixelStorei(e.UNPACK_ALIGNMENT, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        vt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        yt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return !1;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          var e = this.gl;
          e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(j),
        xt = function (t) {
      function e(e, i) {
        t.call(this, e), this.context = e, this.parent = i;
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.getDefault = function () {
        return null;
      }, e;
    }(j),
        bt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.setDirty = function () {
        this.dirty = !0;
      }, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          this.context.bindFramebuffer.set(this.parent);
          var e = this.gl;
          e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0), this.current = t, this.dirty = !1;
        }
      }, e;
    }(xt),
        wt = function (t) {
      function e() {
        t.apply(this, arguments);
      }

      return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.set = function (t) {
        if (t !== this.current || this.dirty) {
          this.context.bindFramebuffer.set(this.parent);
          var e = this.gl;
          e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER, t), this.current = t, this.dirty = !1;
        }
      }, e;
    }(xt),
        Et = function (t, e, i) {
      this.context = t, this.width = e, this.height = i;
      var o = t.gl,
          r = this.framebuffer = o.createFramebuffer();
      this.colorAttachment = new bt(t, r), this.depthAttachment = new wt(t, r);
    };

    Et.prototype.destroy = function () {
      var t = this.context.gl,
          e = this.colorAttachment.get();
      e && t.deleteTexture(e);
      var i = this.depthAttachment.get();
      i && t.deleteRenderbuffer(i), t.deleteFramebuffer(this.framebuffer);
    };

    var Tt = function (t, e, i) {
      this.func = t, this.mask = e, this.range = i;
    };

    Tt.ReadOnly = !1, Tt.ReadWrite = !0, Tt.disabled = new Tt(519, Tt.ReadOnly, [0, 1]);

    var It = function (t, e, i, o, r, a) {
      this.test = t, this.ref = e, this.mask = i, this.fail = o, this.depthFail = r, this.pass = a;
    };

    It.disabled = new It({
      func: 519,
      mask: 0
    }, 0, 0, 7680, 7680, 7680);

    var Ct = function (t, e, i) {
      this.blendFunction = t, this.blendColor = e, this.mask = i;
    };

    Ct.Replace = [1, 0], Ct.disabled = new Ct(Ct.Replace, t.Color.transparent, [!1, !1, !1, !1]), Ct.unblended = new Ct(Ct.Replace, t.Color.transparent, [!0, !0, !0, !0]), Ct.alphaBlended = new Ct([1, 771], t.Color.transparent, [!0, !0, !0, !0]);

    var St = function (t, e, i) {
      this.enable = t, this.mode = e, this.frontFace = i;
    };

    St.disabled = new St(!1, 1029, 2305), St.backCCW = new St(!0, 1029, 2305);

    var Pt = function (t) {
      this.gl = t, this.extVertexArrayObject = this.gl.getExtension("OES_vertex_array_object"), this.clearColor = new q(this), this.clearDepth = new V(this), this.clearStencil = new G(this), this.colorMask = new W(this), this.depthMask = new X(this), this.stencilMask = new H(this), this.stencilFunc = new K(this), this.stencilOp = new Y(this), this.stencilTest = new J(this), this.depthRange = new Q(this), this.depthTest = new $(this), this.depthFunc = new tt(this), this.blend = new et(this), this.blendFunc = new it(this), this.blendColor = new ot(this), this.blendEquation = new rt(this), this.cullFace = new at(this), this.cullFaceSide = new nt(this), this.frontFace = new st(this), this.program = new lt(this), this.activeTexture = new ct(this), this.viewport = new ut(this), this.bindFramebuffer = new ht(this), this.bindRenderbuffer = new pt(this), this.bindTexture = new dt(this), this.bindVertexBuffer = new _t(this), this.bindElementBuffer = new ft(this), this.bindVertexArrayOES = this.extVertexArrayObject && new mt(this), this.pixelStoreUnpack = new gt(this), this.pixelStoreUnpackPremultiplyAlpha = new vt(this), this.pixelStoreUnpackFlipY = new yt(this), this.extTextureFilterAnisotropic = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), this.extTextureFilterAnisotropic && (this.extTextureFilterAnisotropicMax = t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)), this.extTextureHalfFloat = t.getExtension("OES_texture_half_float"), this.extTextureHalfFloat && t.getExtension("OES_texture_half_float_linear");
    };

    Pt.prototype.setDefault = function () {
      this.unbindVAO(), this.clearColor.setDefault(), this.clearDepth.setDefault(), this.clearStencil.setDefault(), this.colorMask.setDefault(), this.depthMask.setDefault(), this.stencilMask.setDefault(), this.stencilFunc.setDefault(), this.stencilOp.setDefault(), this.stencilTest.setDefault(), this.depthRange.setDefault(), this.depthTest.setDefault(), this.depthFunc.setDefault(), this.blend.setDefault(), this.blendFunc.setDefault(), this.blendColor.setDefault(), this.blendEquation.setDefault(), this.cullFace.setDefault(), this.cullFaceSide.setDefault(), this.frontFace.setDefault(), this.program.setDefault(), this.activeTexture.setDefault(), this.bindFramebuffer.setDefault(), this.pixelStoreUnpack.setDefault(), this.pixelStoreUnpackPremultiplyAlpha.setDefault(), this.pixelStoreUnpackFlipY.setDefault();
    }, Pt.prototype.setDirty = function () {
      this.clearColor.dirty = !0, this.clearDepth.dirty = !0, this.clearStencil.dirty = !0, this.colorMask.dirty = !0, this.depthMask.dirty = !0, this.stencilMask.dirty = !0, this.stencilFunc.dirty = !0, this.stencilOp.dirty = !0, this.stencilTest.dirty = !0, this.depthRange.dirty = !0, this.depthTest.dirty = !0, this.depthFunc.dirty = !0, this.blend.dirty = !0, this.blendFunc.dirty = !0, this.blendColor.dirty = !0, this.blendEquation.dirty = !0, this.cullFace.dirty = !0, this.cullFaceSide.dirty = !0, this.frontFace.dirty = !0, this.program.dirty = !0, this.activeTexture.dirty = !0, this.viewport.dirty = !0, this.bindFramebuffer.dirty = !0, this.bindRenderbuffer.dirty = !0, this.bindTexture.dirty = !0, this.bindVertexBuffer.dirty = !0, this.bindElementBuffer.dirty = !0, this.extVertexArrayObject && (this.bindVertexArrayOES.dirty = !0), this.pixelStoreUnpack.dirty = !0, this.pixelStoreUnpackPremultiplyAlpha.dirty = !0, this.pixelStoreUnpackFlipY.dirty = !0;
    }, Pt.prototype.createIndexBuffer = function (t, e) {
      return new U(this, t, e);
    }, Pt.prototype.createVertexBuffer = function (t, e, i) {
      return new Z(this, t, e, i);
    }, Pt.prototype.createRenderbuffer = function (t, e, i) {
      var o = this.gl,
          r = o.createRenderbuffer();
      return this.bindRenderbuffer.set(r), o.renderbufferStorage(o.RENDERBUFFER, t, e, i), this.bindRenderbuffer.set(null), r;
    }, Pt.prototype.createFramebuffer = function (t, e) {
      return new Et(this, t, e);
    }, Pt.prototype.clear = function (t) {
      var e = t.color,
          i = t.depth,
          o = this.gl,
          r = 0;
      e && (r |= o.COLOR_BUFFER_BIT, this.clearColor.set(e), this.colorMask.set([!0, !0, !0, !0])), void 0 !== i && (r |= o.DEPTH_BUFFER_BIT, this.depthRange.set([0, 1]), this.clearDepth.set(i), this.depthMask.set(!0)), o.clear(r);
    }, Pt.prototype.setCullFace = function (t) {
      !1 === t.enable ? this.cullFace.set(!1) : (this.cullFace.set(!0), this.cullFaceSide.set(t.mode), this.frontFace.set(t.frontFace));
    }, Pt.prototype.setDepthMode = function (t) {
      t.func !== this.gl.ALWAYS || t.mask ? (this.depthTest.set(!0), this.depthFunc.set(t.func), this.depthMask.set(t.mask), this.depthRange.set(t.range)) : this.depthTest.set(!1);
    }, Pt.prototype.setStencilMode = function (t) {
      t.test.func !== this.gl.ALWAYS || t.mask ? (this.stencilTest.set(!0), this.stencilMask.set(t.mask), this.stencilOp.set([t.fail, t.depthFail, t.pass]), this.stencilFunc.set({
        func: t.test.func,
        ref: t.ref,
        mask: t.test.mask
      })) : this.stencilTest.set(!1);
    }, Pt.prototype.setColorMode = function (e) {
      t.deepEqual(e.blendFunction, Ct.Replace) ? this.blend.set(!1) : (this.blend.set(!0), this.blendFunc.set(e.blendFunction), this.blendColor.set(e.blendColor)), this.colorMask.set(e.mask);
    }, Pt.prototype.unbindVAO = function () {
      this.extVertexArrayObject && this.bindVertexArrayOES.set(null);
    };

    var zt = function (e) {
      function i(i, o, r) {
        var a = this;
        e.call(this), this.id = i, this.dispatcher = r, this.on("data", function (t) {
          "source" === t.dataType && "metadata" === t.sourceDataType && (a._sourceLoaded = !0), a._sourceLoaded && !a._paused && "source" === t.dataType && "content" === t.sourceDataType && (a.reload(), a.transform && a.update(a.transform));
        }), this.on("error", function () {
          a._sourceErrored = !0;
        }), this._source = A(i, o, r, this), this._tiles = {}, this._cache = new F(0, this._unloadTile.bind(this)), this._timers = {}, this._cacheTimers = {}, this._maxTileCacheSize = null, this._coveredTiles = {}, this._state = new t.SourceFeatureState();
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.onAdd = function (t) {
        this.map = t, this._maxTileCacheSize = t ? t._maxTileCacheSize : null, this._source && this._source.onAdd && this._source.onAdd(t);
      }, i.prototype.onRemove = function (t) {
        this._source && this._source.onRemove && this._source.onRemove(t);
      }, i.prototype.loaded = function () {
        if (this._sourceErrored) return !0;
        if (!this._sourceLoaded) return !1;

        for (var t in this._tiles) {
          var e = this._tiles[t];
          if ("loaded" !== e.state && "errored" !== e.state) return !1;
        }

        return !0;
      }, i.prototype.getSource = function () {
        return this._source;
      }, i.prototype.pause = function () {
        this._paused = !0;
      }, i.prototype.resume = function () {
        if (this._paused) {
          var t = this._shouldReloadOnResume;
          this._paused = !1, this._shouldReloadOnResume = !1, t && this.reload(), this.transform && this.update(this.transform);
        }
      }, i.prototype._loadTile = function (t, e) {
        return this._source.loadTile(t, e);
      }, i.prototype._unloadTile = function (t) {
        if (this._source.unloadTile) return this._source.unloadTile(t, function () {});
      }, i.prototype._abortTile = function (t) {
        if (this._source.abortTile) return this._source.abortTile(t, function () {});
      }, i.prototype.serialize = function () {
        return this._source.serialize();
      }, i.prototype.prepare = function (t) {
        for (var e in this._source.prepare && this._source.prepare(), this._state.coalesceChanges(this._tiles, this.map ? this.map.painter : null), this._tiles) {
          var i = this._tiles[e];
          i.upload(t), i.prepare(this.map.style.imageManager);
        }
      }, i.prototype.getIds = function () {
        return Object.keys(this._tiles).map(Number).sort(Lt);
      }, i.prototype.getRenderableIds = function (e) {
        var i = this,
            o = [];

        for (var r in this._tiles) {
          this._isIdRenderable(+r, e) && o.push(+r);
        }

        return e ? o.sort(function (e, o) {
          var r = i._tiles[e].tileID,
              a = i._tiles[o].tileID,
              n = new t.Point(r.canonical.x, r.canonical.y)._rotate(i.transform.angle),
              s = new t.Point(a.canonical.x, a.canonical.y)._rotate(i.transform.angle);

          return r.overscaledZ - a.overscaledZ || s.y - n.y || s.x - n.x;
        }) : o.sort(Lt);
      }, i.prototype.hasRenderableParent = function (t) {
        var e = this.findLoadedParent(t, 0);
        return !!e && this._isIdRenderable(e.tileID.key);
      }, i.prototype._isIdRenderable = function (t, e) {
        return this._tiles[t] && this._tiles[t].hasData() && !this._coveredTiles[t] && (e || !this._tiles[t].holdingForFade());
      }, i.prototype.reload = function () {
        if (this._paused) this._shouldReloadOnResume = !0;else for (var t in this._cache.reset(), this._tiles) {
          "errored" !== this._tiles[t].state && this._reloadTile(t, "reloading");
        }
      }, i.prototype._reloadTile = function (t, e) {
        var i = this._tiles[t];
        i && ("loading" !== i.state && (i.state = e), this._loadTile(i, this._tileLoaded.bind(this, i, t, e)));
      }, i.prototype._tileLoaded = function (e, i, o, r) {
        if (r) return e.state = "errored", void (404 !== r.status ? this._source.fire(new t.ErrorEvent(r, {
          tile: e
        })) : this.update(this.transform));
        e.timeAdded = t.browser.now(), "expired" === o && (e.refreshedUponExpiration = !0), this._setTileReloadTimer(i, e), "raster-dem" === this.getSource().type && e.dem && this._backfillDEM(e), this._state.initializeTileState(e, this.map ? this.map.painter : null), this._source.fire(new t.Event("data", {
          dataType: "source",
          tile: e,
          coord: e.tileID
        }));
      }, i.prototype._backfillDEM = function (t) {
        for (var e = this.getRenderableIds(), i = 0; i < e.length; i++) {
          var o = e[i];

          if (t.neighboringTiles && t.neighboringTiles[o]) {
            var r = this.getTileByID(o);
            a(t, r), a(r, t);
          }
        }

        function a(t, e) {
          t.needsHillshadePrepare = !0;
          var i = e.tileID.canonical.x - t.tileID.canonical.x,
              o = e.tileID.canonical.y - t.tileID.canonical.y,
              r = Math.pow(2, t.tileID.canonical.z),
              a = e.tileID.key;
          0 === i && 0 === o || Math.abs(o) > 1 || (Math.abs(i) > 1 && (1 === Math.abs(i + r) ? i += r : 1 === Math.abs(i - r) && (i -= r)), e.dem && t.dem && (t.dem.backfillBorder(e.dem, i, o), t.neighboringTiles && t.neighboringTiles[a] && (t.neighboringTiles[a].backfilled = !0)));
        }
      }, i.prototype.getTile = function (t) {
        return this.getTileByID(t.key);
      }, i.prototype.getTileByID = function (t) {
        return this._tiles[t];
      }, i.prototype.getZoom = function (t) {
        return t.zoom + t.scaleZoom(t.tileSize / this._source.tileSize);
      }, i.prototype._retainLoadedChildren = function (t, e, i, o) {
        for (var r in this._tiles) {
          var a = this._tiles[r];

          if (!(o[r] || !a.hasData() || a.tileID.overscaledZ <= e || a.tileID.overscaledZ > i)) {
            for (var n = a.tileID; a && a.tileID.overscaledZ > e + 1;) {
              var s = a.tileID.scaledTo(a.tileID.overscaledZ - 1);
              (a = this._tiles[s.key]) && a.hasData() && (n = s);
            }

            for (var l = n; l.overscaledZ > e;) {
              if (t[(l = l.scaledTo(l.overscaledZ - 1)).key]) {
                o[n.key] = n;
                break;
              }
            }
          }
        }
      }, i.prototype.findLoadedParent = function (t, e) {
        for (var i = t.overscaledZ - 1; i >= e; i--) {
          var o = t.scaledTo(i);
          if (!o) return;
          var r = String(o.key),
              a = this._tiles[r];
          if (a && a.hasData()) return a;
          if (this._cache.has(o)) return this._cache.get(o);
        }
      }, i.prototype.updateCacheSize = function (t) {
        var e = (Math.ceil(t.width / this._source.tileSize) + 1) * (Math.ceil(t.height / this._source.tileSize) + 1),
            i = Math.floor(5 * e),
            o = "number" == typeof this._maxTileCacheSize ? Math.min(this._maxTileCacheSize, i) : i;

        this._cache.setMaxSize(o);
      }, i.prototype.handleWrapJump = function (t) {
        var e = (t - (void 0 === this._prevLng ? t : this._prevLng)) / 360,
            i = Math.round(e);

        if (this._prevLng = t, i) {
          var o = {};

          for (var r in this._tiles) {
            var a = this._tiles[r];
            a.tileID = a.tileID.unwrapTo(a.tileID.wrap + i), o[a.tileID.key] = a;
          }

          for (var n in this._tiles = o, this._timers) {
            clearTimeout(this._timers[n]), delete this._timers[n];
          }

          for (var s in this._tiles) {
            var l = this._tiles[s];

            this._setTileReloadTimer(s, l);
          }
        }
      }, i.prototype.update = function (e) {
        var o = this;

        if (this.transform = e, this._sourceLoaded && !this._paused) {
          var r;
          this.updateCacheSize(e), this.handleWrapJump(this.transform.center.lng), this._coveredTiles = {}, this.used ? this._source.tileID ? r = e.getVisibleUnwrappedCoordinates(this._source.tileID).map(function (e) {
            return new t.OverscaledTileID(e.canonical.z, e.wrap, e.canonical.z, e.canonical.x, e.canonical.y);
          }) : (r = e.coveringTiles({
            tileSize: this._source.tileSize,
            minzoom: this._source.minzoom,
            maxzoom: this._source.maxzoom,
            roundZoom: this._source.roundZoom,
            reparseOverscaled: this._source.reparseOverscaled
          }), this._source.hasTile && (r = r.filter(function (t) {
            return o._source.hasTile(t);
          }))) : r = [];

          var a = (this._source.roundZoom ? Math.round : Math.floor)(this.getZoom(e)),
              n = Math.max(a - i.maxOverzooming, this._source.minzoom),
              s = Math.max(a + i.maxUnderzooming, this._source.minzoom),
              l = this._updateRetainedTiles(r, a);

          if (Dt(this._source.type)) {
            for (var c = {}, u = {}, h = 0, p = Object.keys(l); h < p.length; h += 1) {
              var d = p[h],
                  _ = l[d],
                  f = this._tiles[d];

              if (f && !(f.fadeEndTime && f.fadeEndTime <= t.browser.now())) {
                var m = this.findLoadedParent(_, n);
                m && (this._addTile(m.tileID), c[m.tileID.key] = m.tileID), u[d] = _;
              }
            }

            for (var g in this._retainLoadedChildren(u, a, s, l), c) {
              l[g] || (this._coveredTiles[g] = !0, l[g] = c[g]);
            }
          }

          for (var v in l) {
            this._tiles[v].clearFadeHold();
          }

          for (var y = 0, x = t.keysDifference(this._tiles, l); y < x.length; y += 1) {
            var b = x[y],
                w = this._tiles[b];
            w.hasSymbolBuckets && !w.holdingForFade() ? w.setHoldDuration(this.map._fadeDuration) : w.hasSymbolBuckets && !w.symbolFadeFinished() || this._removeTile(b);
          }
        }
      }, i.prototype.releaseSymbolFadeTiles = function () {
        for (var t in this._tiles) {
          this._tiles[t].holdingForFade() && this._removeTile(t);
        }
      }, i.prototype._updateRetainedTiles = function (t, e) {
        for (var o = {}, r = {}, a = Math.max(e - i.maxOverzooming, this._source.minzoom), n = Math.max(e + i.maxUnderzooming, this._source.minzoom), s = {}, l = 0, c = t; l < c.length; l += 1) {
          var u = c[l],
              h = this._addTile(u);

          o[u.key] = u, h.hasData() || e < this._source.maxzoom && (s[u.key] = u);
        }

        this._retainLoadedChildren(s, e, n, o);

        for (var p = 0, d = t; p < d.length; p += 1) {
          var _ = d[p],
              f = this._tiles[_.key];

          if (!f.hasData()) {
            if (e + 1 > this._source.maxzoom) {
              var m = _.children(this._source.maxzoom)[0],
                  g = this.getTile(m);

              if (g && g.hasData()) {
                o[m.key] = m;
                continue;
              }
            } else {
              var v = _.children(this._source.maxzoom);

              if (o[v[0].key] && o[v[1].key] && o[v[2].key] && o[v[3].key]) continue;
            }

            for (var y = f.wasRequested(), x = _.overscaledZ - 1; x >= a; --x) {
              var b = _.scaledTo(x);

              if (r[b.key]) break;
              if (r[b.key] = !0, !(f = this.getTile(b)) && y && (f = this._addTile(b)), f && (o[b.key] = b, y = f.wasRequested(), f.hasData())) break;
            }
          }
        }

        return o;
      }, i.prototype._addTile = function (e) {
        var i = this._tiles[e.key];
        if (i) return i;
        (i = this._cache.getAndRemove(e)) && (this._setTileReloadTimer(e.key, i), i.tileID = e, this._state.initializeTileState(i, this.map ? this.map.painter : null), this._cacheTimers[e.key] && (clearTimeout(this._cacheTimers[e.key]), delete this._cacheTimers[e.key], this._setTileReloadTimer(e.key, i)));
        var o = Boolean(i);
        return o || (i = new t.Tile(e, this._source.tileSize * e.overscaleFactor()), this._loadTile(i, this._tileLoaded.bind(this, i, e.key, i.state))), i ? (i.uses++, this._tiles[e.key] = i, o || this._source.fire(new t.Event("dataloading", {
          tile: i,
          coord: i.tileID,
          dataType: "source"
        })), i) : null;
      }, i.prototype._setTileReloadTimer = function (t, e) {
        var i = this;
        t in this._timers && (clearTimeout(this._timers[t]), delete this._timers[t]);
        var o = e.getExpiryTimeout();
        o && (this._timers[t] = setTimeout(function () {
          i._reloadTile(t, "expired"), delete i._timers[t];
        }, o));
      }, i.prototype._removeTile = function (t) {
        var e = this._tiles[t];
        e && (e.uses--, delete this._tiles[t], this._timers[t] && (clearTimeout(this._timers[t]), delete this._timers[t]), e.uses > 0 || (e.hasData() ? this._cache.add(e.tileID, e, e.getExpiryTimeout()) : (e.aborted = !0, this._abortTile(e), this._unloadTile(e))));
      }, i.prototype.clearTiles = function () {
        for (var t in this._shouldReloadOnResume = !1, this._paused = !1, this._tiles) {
          this._removeTile(t);
        }

        this._cache.reset();
      }, i.prototype.tilesIn = function (e, i, o) {
        var r = this,
            a = [],
            n = this.transform;
        if (!n) return a;

        for (var s = o ? n.getCameraQueryGeometry(e) : e, l = e.map(function (t) {
          return n.pointCoordinate(t);
        }), c = s.map(function (t) {
          return n.pointCoordinate(t);
        }), u = this.getIds(), h = 1 / 0, p = 1 / 0, d = -1 / 0, _ = -1 / 0, f = 0, m = c; f < m.length; f += 1) {
          var g = m[f];
          h = Math.min(h, g.x), p = Math.min(p, g.y), d = Math.max(d, g.x), _ = Math.max(_, g.y);
        }

        for (var v = function (e) {
          var o = r._tiles[u[e]];

          if (!o.holdingForFade()) {
            var s = o.tileID,
                f = Math.pow(2, n.zoom - o.tileID.overscaledZ),
                m = i * o.queryPadding * t.EXTENT / o.tileSize / f,
                g = [s.getTilePoint(new t.MercatorCoordinate(h, p)), s.getTilePoint(new t.MercatorCoordinate(d, _))];

            if (g[0].x - m < t.EXTENT && g[0].y - m < t.EXTENT && g[1].x + m >= 0 && g[1].y + m >= 0) {
              var v = l.map(function (t) {
                return s.getTilePoint(t);
              }),
                  y = c.map(function (t) {
                return s.getTilePoint(t);
              });
              a.push({
                tile: o,
                tileID: s,
                queryGeometry: v,
                cameraQueryGeometry: y,
                scale: f
              });
            }
          }
        }, y = 0; y < u.length; y++) {
          v(y);
        }

        return a;
      }, i.prototype.getVisibleCoordinates = function (t) {
        for (var e = this, i = this.getRenderableIds(t).map(function (t) {
          return e._tiles[t].tileID;
        }), o = 0, r = i; o < r.length; o += 1) {
          var a = r[o];
          a.posMatrix = this.transform.calculatePosMatrix(a.toUnwrapped());
        }

        return i;
      }, i.prototype.hasTransition = function () {
        if (this._source.hasTransition()) return !0;
        if (Dt(this._source.type)) for (var e in this._tiles) {
          var i = this._tiles[e];
          if (void 0 !== i.fadeEndTime && i.fadeEndTime >= t.browser.now()) return !0;
        }
        return !1;
      }, i.prototype.setFeatureState = function (t, e, i) {
        t = t || "_geojsonTileLayer", this._state.updateState(t, e, i);
      }, i.prototype.removeFeatureState = function (t, e, i) {
        t = t || "_geojsonTileLayer", this._state.removeFeatureState(t, e, i);
      }, i.prototype.getFeatureState = function (t, e) {
        return t = t || "_geojsonTileLayer", this._state.getState(t, e);
      }, i;
    }(t.Evented);

    function Lt(t, e) {
      return t % 32 - e % 32 || e - t;
    }

    function Dt(t) {
      return "raster" === t || "image" === t || "video" === t;
    }

    function Mt() {
      return new t.window.Worker($o.workerUrl);
    }

    zt.maxOverzooming = 10, zt.maxUnderzooming = 3;

    var Rt = function () {
      this.active = {};
    };

    Rt.prototype.acquire = function (t) {
      if (!this.workers) for (this.workers = []; this.workers.length < Rt.workerCount;) {
        this.workers.push(new Mt());
      }
      return this.active[t] = !0, this.workers.slice();
    }, Rt.prototype.release = function (t) {
      delete this.active[t], 0 === Object.keys(this.active).length && (this.workers.forEach(function (t) {
        t.terminate();
      }), this.workers = null);
    };
    var At,
        kt = Math.floor(t.browser.hardwareConcurrency / 2);

    function Bt(e, i) {
      var o = {};

      for (var r in e) {
        "ref" !== r && (o[r] = e[r]);
      }

      return t.refProperties.forEach(function (t) {
        t in i && (o[t] = i[t]);
      }), o;
    }

    function Ot(t) {
      t = t.slice();

      for (var e = Object.create(null), i = 0; i < t.length; i++) {
        e[t[i].id] = t[i];
      }

      for (var o = 0; o < t.length; o++) {
        "ref" in t[o] && (t[o] = Bt(t[o], e[t[o].ref]));
      }

      return t;
    }

    Rt.workerCount = Math.max(Math.min(kt, 6), 1);
    var Ft = {
      setStyle: "setStyle",
      addLayer: "addLayer",
      removeLayer: "removeLayer",
      setPaintProperty: "setPaintProperty",
      setLayoutProperty: "setLayoutProperty",
      setFilter: "setFilter",
      addSource: "addSource",
      removeSource: "removeSource",
      setGeoJSONSourceData: "setGeoJSONSourceData",
      setLayerZoomRange: "setLayerZoomRange",
      setLayerProperty: "setLayerProperty",
      setCenter: "setCenter",
      setZoom: "setZoom",
      setBearing: "setBearing",
      setPitch: "setPitch",
      setSprite: "setSprite",
      setGlyphs: "setGlyphs",
      setTransition: "setTransition",
      setLight: "setLight"
    };

    function Ut(t, e, i) {
      i.push({
        command: Ft.addSource,
        args: [t, e[t]]
      });
    }

    function Nt(t, e, i) {
      e.push({
        command: Ft.removeSource,
        args: [t]
      }), i[t] = !0;
    }

    function Zt(t, e, i, o) {
      Nt(t, i, o), Ut(t, e, i);
    }

    function jt(e, i, o) {
      var r;

      for (r in e[o]) {
        if (e[o].hasOwnProperty(r) && "data" !== r && !t.deepEqual(e[o][r], i[o][r])) return !1;
      }

      for (r in i[o]) {
        if (i[o].hasOwnProperty(r) && "data" !== r && !t.deepEqual(e[o][r], i[o][r])) return !1;
      }

      return !0;
    }

    function qt(e, i, o, r, a, n) {
      var s;

      for (s in i = i || {}, e = e || {}) {
        e.hasOwnProperty(s) && (t.deepEqual(e[s], i[s]) || o.push({
          command: n,
          args: [r, s, i[s], a]
        }));
      }

      for (s in i) {
        i.hasOwnProperty(s) && !e.hasOwnProperty(s) && (t.deepEqual(e[s], i[s]) || o.push({
          command: n,
          args: [r, s, i[s], a]
        }));
      }
    }

    function Vt(t) {
      return t.id;
    }

    function Gt(t, e) {
      return t[e.id] = e, t;
    }

    function Wt(e, i) {
      if (!e) return [{
        command: Ft.setStyle,
        args: [i]
      }];
      var o = [];

      try {
        if (!t.deepEqual(e.version, i.version)) return [{
          command: Ft.setStyle,
          args: [i]
        }];
        t.deepEqual(e.center, i.center) || o.push({
          command: Ft.setCenter,
          args: [i.center]
        }), t.deepEqual(e.zoom, i.zoom) || o.push({
          command: Ft.setZoom,
          args: [i.zoom]
        }), t.deepEqual(e.bearing, i.bearing) || o.push({
          command: Ft.setBearing,
          args: [i.bearing]
        }), t.deepEqual(e.pitch, i.pitch) || o.push({
          command: Ft.setPitch,
          args: [i.pitch]
        }), t.deepEqual(e.sprite, i.sprite) || o.push({
          command: Ft.setSprite,
          args: [i.sprite]
        }), t.deepEqual(e.glyphs, i.glyphs) || o.push({
          command: Ft.setGlyphs,
          args: [i.glyphs]
        }), t.deepEqual(e.transition, i.transition) || o.push({
          command: Ft.setTransition,
          args: [i.transition]
        }), t.deepEqual(e.light, i.light) || o.push({
          command: Ft.setLight,
          args: [i.light]
        });
        var r = {},
            a = [];
        !function (e, i, o, r) {
          var a;

          for (a in i = i || {}, e = e || {}) {
            e.hasOwnProperty(a) && (i.hasOwnProperty(a) || Nt(a, o, r));
          }

          for (a in i) {
            i.hasOwnProperty(a) && (e.hasOwnProperty(a) ? t.deepEqual(e[a], i[a]) || ("geojson" === e[a].type && "geojson" === i[a].type && jt(e, i, a) ? o.push({
              command: Ft.setGeoJSONSourceData,
              args: [a, i[a].data]
            }) : Zt(a, i, o, r)) : Ut(a, i, o));
          }
        }(e.sources, i.sources, a, r);
        var n = [];
        e.layers && e.layers.forEach(function (t) {
          r[t.source] ? o.push({
            command: Ft.removeLayer,
            args: [t.id]
          }) : n.push(t);
        }), o = o.concat(a), function (e, i, o) {
          i = i || [];

          var r,
              a,
              n,
              s,
              l,
              c,
              u,
              h = (e = e || []).map(Vt),
              p = i.map(Vt),
              d = e.reduce(Gt, {}),
              _ = i.reduce(Gt, {}),
              f = h.slice(),
              m = Object.create(null);

          for (r = 0, a = 0; r < h.length; r++) {
            n = h[r], _.hasOwnProperty(n) ? a++ : (o.push({
              command: Ft.removeLayer,
              args: [n]
            }), f.splice(f.indexOf(n, a), 1));
          }

          for (r = 0, a = 0; r < p.length; r++) {
            n = p[p.length - 1 - r], f[f.length - 1 - r] !== n && (d.hasOwnProperty(n) ? (o.push({
              command: Ft.removeLayer,
              args: [n]
            }), f.splice(f.lastIndexOf(n, f.length - a), 1)) : a++, c = f[f.length - r], o.push({
              command: Ft.addLayer,
              args: [_[n], c]
            }), f.splice(f.length - r, 0, n), m[n] = !0);
          }

          for (r = 0; r < p.length; r++) {
            if (s = d[n = p[r]], l = _[n], !m[n] && !t.deepEqual(s, l)) if (t.deepEqual(s.source, l.source) && t.deepEqual(s["source-layer"], l["source-layer"]) && t.deepEqual(s.type, l.type)) {
              for (u in qt(s.layout, l.layout, o, n, null, Ft.setLayoutProperty), qt(s.paint, l.paint, o, n, null, Ft.setPaintProperty), t.deepEqual(s.filter, l.filter) || o.push({
                command: Ft.setFilter,
                args: [n, l.filter]
              }), t.deepEqual(s.minzoom, l.minzoom) && t.deepEqual(s.maxzoom, l.maxzoom) || o.push({
                command: Ft.setLayerZoomRange,
                args: [n, l.minzoom, l.maxzoom]
              }), s) {
                s.hasOwnProperty(u) && "layout" !== u && "paint" !== u && "filter" !== u && "metadata" !== u && "minzoom" !== u && "maxzoom" !== u && (0 === u.indexOf("paint.") ? qt(s[u], l[u], o, n, u.slice(6), Ft.setPaintProperty) : t.deepEqual(s[u], l[u]) || o.push({
                  command: Ft.setLayerProperty,
                  args: [n, u, l[u]]
                }));
              }

              for (u in l) {
                l.hasOwnProperty(u) && !s.hasOwnProperty(u) && "layout" !== u && "paint" !== u && "filter" !== u && "metadata" !== u && "minzoom" !== u && "maxzoom" !== u && (0 === u.indexOf("paint.") ? qt(s[u], l[u], o, n, u.slice(6), Ft.setPaintProperty) : t.deepEqual(s[u], l[u]) || o.push({
                  command: Ft.setLayerProperty,
                  args: [n, u, l[u]]
                }));
              }
            } else o.push({
              command: Ft.removeLayer,
              args: [n]
            }), c = f[f.lastIndexOf(n) + 1], o.push({
              command: Ft.addLayer,
              args: [l, c]
            });
          }
        }(n, i.layers, o);
      } catch (t) {
        console.warn("Unable to compute style diff:", t), o = [{
          command: Ft.setStyle,
          args: [i]
        }];
      }

      return o;
    }

    var Xt = function (t, e, i) {
      var o = this.boxCells = [],
          r = this.circleCells = [];
      this.xCellCount = Math.ceil(t / i), this.yCellCount = Math.ceil(e / i);

      for (var a = 0; a < this.xCellCount * this.yCellCount; a++) {
        o.push([]), r.push([]);
      }

      this.circleKeys = [], this.boxKeys = [], this.bboxes = [], this.circles = [], this.width = t, this.height = e, this.xScale = this.xCellCount / t, this.yScale = this.yCellCount / e, this.boxUid = 0, this.circleUid = 0;
    };

    function Ht(e, i, o, r, a) {
      var n = t.create();
      return i ? (t.scale(n, n, [1 / a, 1 / a, 1]), o || t.rotateZ(n, n, r.angle)) : t.multiply(n, r.labelPlaneMatrix, e), n;
    }

    function Kt(e, i, o, r, a) {
      if (i) {
        var n = t.clone(e);
        return t.scale(n, n, [a, a, 1]), o || t.rotateZ(n, n, -r.angle), n;
      }

      return r.glCoordMatrix;
    }

    function Yt(e, i) {
      var o = [e.x, e.y, 0, 1];
      ne(o, o, i);
      var r = o[3];
      return {
        point: new t.Point(o[0] / r, o[1] / r),
        signedDistanceFromCamera: r
      };
    }

    function Jt(t, e) {
      var i = t[0] / t[3],
          o = t[1] / t[3];
      return i >= -e[0] && i <= e[0] && o >= -e[1] && o <= e[1];
    }

    function Qt(e, i, o, r, a, n, s, l) {
      var c = r ? e.textSizeData : e.iconSizeData,
          u = t.evaluateSizeForZoom(c, o.transform.zoom),
          h = [256 / o.width * 2 + 1, 256 / o.height * 2 + 1],
          p = r ? e.text.dynamicLayoutVertexArray : e.icon.dynamicLayoutVertexArray;
      p.clear();

      for (var d = e.lineVertexArray, _ = r ? e.text.placedSymbolArray : e.icon.placedSymbolArray, f = o.transform.width / o.transform.height, m = !1, g = 0; g < _.length; g++) {
        var v = _.get(g);

        if (v.hidden || v.writingMode === t.WritingMode.vertical && !m) ae(v.numGlyphs, p);else {
          m = !1;
          var y = [v.anchorX, v.anchorY, 0, 1];

          if (t.transformMat4(y, y, i), Jt(y, h)) {
            var x = .5 + y[3] / o.transform.cameraToCenterDistance * .5,
                b = t.evaluateSizeForFeature(c, u, v),
                w = s ? b * x : b / x,
                E = new t.Point(v.anchorX, v.anchorY),
                T = Yt(E, a).point,
                I = {},
                C = ee(v, w, !1, l, i, a, n, e.glyphOffsetArray, d, p, T, E, I, f);
            m = C.useVertical, (C.notEnoughRoom || m || C.needsFlipping && ee(v, w, !0, l, i, a, n, e.glyphOffsetArray, d, p, T, E, I, f).notEnoughRoom) && ae(v.numGlyphs, p);
          } else ae(v.numGlyphs, p);
        }
      }

      r ? e.text.dynamicLayoutVertexBuffer.updateData(p) : e.icon.dynamicLayoutVertexBuffer.updateData(p);
    }

    function $t(t, e, i, o, r, a, n, s, l, c, u, h) {
      var p = s.glyphStartIndex + s.numGlyphs,
          d = s.lineStartIndex,
          _ = s.lineStartIndex + s.lineLength,
          f = e.getoffsetX(s.glyphStartIndex),
          m = e.getoffsetX(p - 1),
          g = oe(t * f, i, o, r, a, n, s.segment, d, _, l, c, u, h);

      if (!g) return null;
      var v = oe(t * m, i, o, r, a, n, s.segment, d, _, l, c, u, h);
      return v ? {
        first: g,
        last: v
      } : null;
    }

    function te(e, i, o, r) {
      if (e === t.WritingMode.horizontal && Math.abs(o.y - i.y) > Math.abs(o.x - i.x) * r) return {
        useVertical: !0
      };
      return (e === t.WritingMode.vertical ? i.y < o.y : i.x > o.x) ? {
        needsFlipping: !0
      } : null;
    }

    function ee(e, i, o, r, a, n, s, l, c, u, h, p, d, _) {
      var f,
          m = i / 24,
          g = e.lineOffsetX * m,
          v = e.lineOffsetY * m;

      if (e.numGlyphs > 1) {
        var y = e.glyphStartIndex + e.numGlyphs,
            x = e.lineStartIndex,
            b = e.lineStartIndex + e.lineLength,
            w = $t(m, l, g, v, o, h, p, e, c, n, d, !1);
        if (!w) return {
          notEnoughRoom: !0
        };
        var E = Yt(w.first.point, s).point,
            T = Yt(w.last.point, s).point;

        if (r && !o) {
          var I = te(e.writingMode, E, T, _);
          if (I) return I;
        }

        f = [w.first];

        for (var C = e.glyphStartIndex + 1; C < y - 1; C++) {
          f.push(oe(m * l.getoffsetX(C), g, v, o, h, p, e.segment, x, b, c, n, d, !1));
        }

        f.push(w.last);
      } else {
        if (r && !o) {
          var S = Yt(p, a).point,
              P = e.lineStartIndex + e.segment + 1,
              z = new t.Point(c.getx(P), c.gety(P)),
              L = Yt(z, a),
              D = L.signedDistanceFromCamera > 0 ? L.point : ie(p, z, S, 1, a),
              M = te(e.writingMode, S, D, _);
          if (M) return M;
        }

        var R = oe(m * l.getoffsetX(e.glyphStartIndex), g, v, o, h, p, e.segment, e.lineStartIndex, e.lineStartIndex + e.lineLength, c, n, d, !1);
        if (!R) return {
          notEnoughRoom: !0
        };
        f = [R];
      }

      for (var A = 0, k = f; A < k.length; A += 1) {
        var B = k[A];
        t.addDynamicAttributes(u, B.point, B.angle);
      }

      return {};
    }

    function ie(t, e, i, o, r) {
      var a = Yt(t.add(t.sub(e)._unit()), r).point,
          n = i.sub(a);
      return i.add(n._mult(o / n.mag()));
    }

    function oe(e, i, o, r, a, n, s, l, c, u, h, p, d) {
      var _ = r ? e - i : e + i,
          f = _ > 0 ? 1 : -1,
          m = 0;

      r && (f *= -1, m = Math.PI), f < 0 && (m += Math.PI);

      for (var g = f > 0 ? l + s : l + s + 1, v = g, y = a, x = a, b = 0, w = 0, E = Math.abs(_); b + w <= E;) {
        if ((g += f) < l || g >= c) return null;

        if (x = y, void 0 === (y = p[g])) {
          var T = new t.Point(u.getx(g), u.gety(g)),
              I = Yt(T, h);
          if (I.signedDistanceFromCamera > 0) y = p[g] = I.point;else {
            var C = g - f;
            y = ie(0 === b ? n : new t.Point(u.getx(C), u.gety(C)), T, x, E - b + 1, h);
          }
        }

        b += w, w = x.dist(y);
      }

      var S = (E - b) / w,
          P = y.sub(x),
          z = P.mult(S)._add(x);

      return z._add(P._unit()._perp()._mult(o * f)), {
        point: z,
        angle: m + Math.atan2(y.y - x.y, y.x - x.x),
        tileDistance: d ? {
          prevTileDistance: g - f === v ? 0 : u.gettileUnitDistanceFromAnchor(g - f),
          lastSegmentViewportDistance: E - b
        } : null
      };
    }

    Xt.prototype.keysLength = function () {
      return this.boxKeys.length + this.circleKeys.length;
    }, Xt.prototype.insert = function (t, e, i, o, r) {
      this._forEachCell(e, i, o, r, this._insertBoxCell, this.boxUid++), this.boxKeys.push(t), this.bboxes.push(e), this.bboxes.push(i), this.bboxes.push(o), this.bboxes.push(r);
    }, Xt.prototype.insertCircle = function (t, e, i, o) {
      this._forEachCell(e - o, i - o, e + o, i + o, this._insertCircleCell, this.circleUid++), this.circleKeys.push(t), this.circles.push(e), this.circles.push(i), this.circles.push(o);
    }, Xt.prototype._insertBoxCell = function (t, e, i, o, r, a) {
      this.boxCells[r].push(a);
    }, Xt.prototype._insertCircleCell = function (t, e, i, o, r, a) {
      this.circleCells[r].push(a);
    }, Xt.prototype._query = function (t, e, i, o, r, a) {
      if (i < 0 || t > this.width || o < 0 || e > this.height) return !r && [];
      var n = [];

      if (t <= 0 && e <= 0 && this.width <= i && this.height <= o) {
        if (r) return !0;

        for (var s = 0; s < this.boxKeys.length; s++) {
          n.push({
            key: this.boxKeys[s],
            x1: this.bboxes[4 * s],
            y1: this.bboxes[4 * s + 1],
            x2: this.bboxes[4 * s + 2],
            y2: this.bboxes[4 * s + 3]
          });
        }

        for (var l = 0; l < this.circleKeys.length; l++) {
          var c = this.circles[3 * l],
              u = this.circles[3 * l + 1],
              h = this.circles[3 * l + 2];
          n.push({
            key: this.circleKeys[l],
            x1: c - h,
            y1: u - h,
            x2: c + h,
            y2: u + h
          });
        }

        return a ? n.filter(a) : n;
      }

      var p = {
        hitTest: r,
        seenUids: {
          box: {},
          circle: {}
        }
      };
      return this._forEachCell(t, e, i, o, this._queryCell, n, p, a), r ? n.length > 0 : n;
    }, Xt.prototype._queryCircle = function (t, e, i, o, r) {
      var a = t - i,
          n = t + i,
          s = e - i,
          l = e + i;
      if (n < 0 || a > this.width || l < 0 || s > this.height) return !o && [];
      var c = [],
          u = {
        hitTest: o,
        circle: {
          x: t,
          y: e,
          radius: i
        },
        seenUids: {
          box: {},
          circle: {}
        }
      };
      return this._forEachCell(a, s, n, l, this._queryCellCircle, c, u, r), o ? c.length > 0 : c;
    }, Xt.prototype.query = function (t, e, i, o, r) {
      return this._query(t, e, i, o, !1, r);
    }, Xt.prototype.hitTest = function (t, e, i, o, r) {
      return this._query(t, e, i, o, !0, r);
    }, Xt.prototype.hitTestCircle = function (t, e, i, o) {
      return this._queryCircle(t, e, i, !0, o);
    }, Xt.prototype._queryCell = function (t, e, i, o, r, a, n, s) {
      var l = n.seenUids,
          c = this.boxCells[r];
      if (null !== c) for (var u = this.bboxes, h = 0, p = c; h < p.length; h += 1) {
        var d = p[h];

        if (!l.box[d]) {
          l.box[d] = !0;

          var _ = 4 * d;

          if (t <= u[_ + 2] && e <= u[_ + 3] && i >= u[_ + 0] && o >= u[_ + 1] && (!s || s(this.boxKeys[d]))) {
            if (n.hitTest) return a.push(!0), !0;
            a.push({
              key: this.boxKeys[d],
              x1: u[_],
              y1: u[_ + 1],
              x2: u[_ + 2],
              y2: u[_ + 3]
            });
          }
        }
      }
      var f = this.circleCells[r];
      if (null !== f) for (var m = this.circles, g = 0, v = f; g < v.length; g += 1) {
        var y = v[g];

        if (!l.circle[y]) {
          l.circle[y] = !0;
          var x = 3 * y;

          if (this._circleAndRectCollide(m[x], m[x + 1], m[x + 2], t, e, i, o) && (!s || s(this.circleKeys[y]))) {
            if (n.hitTest) return a.push(!0), !0;
            var b = m[x],
                w = m[x + 1],
                E = m[x + 2];
            a.push({
              key: this.circleKeys[y],
              x1: b - E,
              y1: w - E,
              x2: b + E,
              y2: w + E
            });
          }
        }
      }
    }, Xt.prototype._queryCellCircle = function (t, e, i, o, r, a, n, s) {
      var l = n.circle,
          c = n.seenUids,
          u = this.boxCells[r];
      if (null !== u) for (var h = this.bboxes, p = 0, d = u; p < d.length; p += 1) {
        var _ = d[p];

        if (!c.box[_]) {
          c.box[_] = !0;
          var f = 4 * _;
          if (this._circleAndRectCollide(l.x, l.y, l.radius, h[f + 0], h[f + 1], h[f + 2], h[f + 3]) && (!s || s(this.boxKeys[_]))) return a.push(!0), !0;
        }
      }
      var m = this.circleCells[r];
      if (null !== m) for (var g = this.circles, v = 0, y = m; v < y.length; v += 1) {
        var x = y[v];

        if (!c.circle[x]) {
          c.circle[x] = !0;
          var b = 3 * x;
          if (this._circlesCollide(g[b], g[b + 1], g[b + 2], l.x, l.y, l.radius) && (!s || s(this.circleKeys[x]))) return a.push(!0), !0;
        }
      }
    }, Xt.prototype._forEachCell = function (t, e, i, o, r, a, n, s) {
      for (var l = this._convertToXCellCoord(t), c = this._convertToYCellCoord(e), u = this._convertToXCellCoord(i), h = this._convertToYCellCoord(o), p = l; p <= u; p++) {
        for (var d = c; d <= h; d++) {
          var _ = this.xCellCount * d + p;

          if (r.call(this, t, e, i, o, _, a, n, s)) return;
        }
      }
    }, Xt.prototype._convertToXCellCoord = function (t) {
      return Math.max(0, Math.min(this.xCellCount - 1, Math.floor(t * this.xScale)));
    }, Xt.prototype._convertToYCellCoord = function (t) {
      return Math.max(0, Math.min(this.yCellCount - 1, Math.floor(t * this.yScale)));
    }, Xt.prototype._circlesCollide = function (t, e, i, o, r, a) {
      var n = o - t,
          s = r - e,
          l = i + a;
      return l * l > n * n + s * s;
    }, Xt.prototype._circleAndRectCollide = function (t, e, i, o, r, a, n) {
      var s = (a - o) / 2,
          l = Math.abs(t - (o + s));
      if (l > s + i) return !1;
      var c = (n - r) / 2,
          u = Math.abs(e - (r + c));
      if (u > c + i) return !1;
      if (l <= s || u <= c) return !0;
      var h = l - s,
          p = u - c;
      return h * h + p * p <= i * i;
    };
    var re = new Float32Array([-1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0, -1 / 0, -1 / 0, 0]);

    function ae(t, e) {
      for (var i = 0; i < t; i++) {
        var o = e.length;
        e.resize(o + 4), e.float32.set(re, 3 * o);
      }
    }

    function ne(t, e, i) {
      var o = e[0],
          r = e[1];
      return t[0] = i[0] * o + i[4] * r + i[12], t[1] = i[1] * o + i[5] * r + i[13], t[3] = i[3] * o + i[7] * r + i[15], t;
    }

    var se = function (t, e, i) {
      void 0 === e && (e = new Xt(t.width + 200, t.height + 200, 25)), void 0 === i && (i = new Xt(t.width + 200, t.height + 200, 25)), this.transform = t, this.grid = e, this.ignoredGrid = i, this.pitchfactor = Math.cos(t._pitch) * t.cameraToCenterDistance, this.screenRightBoundary = t.width + 100, this.screenBottomBoundary = t.height + 100, this.gridRightBoundary = t.width + 200, this.gridBottomBoundary = t.height + 200;
    };

    function le(t, e, i) {
      t[e + 4] = i ? 1 : 0;
    }

    function ce(e, i, o) {
      return i * (t.EXTENT / (e.tileSize * Math.pow(2, o - e.tileID.overscaledZ)));
    }

    se.prototype.placeCollisionBox = function (t, e, i, o, r) {
      var a = this.projectAndGetPerspectiveRatio(o, t.anchorPointX, t.anchorPointY),
          n = i * a.perspectiveRatio,
          s = t.x1 * n + a.point.x,
          l = t.y1 * n + a.point.y,
          c = t.x2 * n + a.point.x,
          u = t.y2 * n + a.point.y;
      return !this.isInsideGrid(s, l, c, u) || !e && this.grid.hitTest(s, l, c, u, r) ? {
        box: [],
        offscreen: !1
      } : {
        box: [s, l, c, u],
        offscreen: this.isOffscreen(s, l, c, u)
      };
    }, se.prototype.approximateTileDistance = function (t, e, i, o, r) {
      var a = r ? 1 : o / this.pitchfactor,
          n = t.lastSegmentViewportDistance * i;
      return t.prevTileDistance + n + (a - 1) * n * Math.abs(Math.sin(e));
    }, se.prototype.placeCollisionCircles = function (e, i, o, r, a, n, s, l, c, u, h, p, d) {
      var _ = [],
          f = this.projectAnchor(c, a.anchorX, a.anchorY),
          m = l / 24,
          g = a.lineOffsetX * l,
          v = a.lineOffsetY * l,
          y = new t.Point(a.anchorX, a.anchorY),
          x = $t(m, s, g, v, !1, Yt(y, u).point, y, a, n, u, {}, !0),
          b = !1,
          w = !1,
          E = !0,
          T = f.perspectiveRatio * r,
          I = 1 / (r * o),
          C = 0,
          S = 0;
      x && (C = this.approximateTileDistance(x.first.tileDistance, x.first.angle, I, f.cameraDistance, p), S = this.approximateTileDistance(x.last.tileDistance, x.last.angle, I, f.cameraDistance, p));

      for (var P = 0; P < e.length; P += 5) {
        var z = e[P],
            L = e[P + 1],
            D = e[P + 2],
            M = e[P + 3];
        if (!x || M < -C || M > S) le(e, P, !1);else {
          var R = this.projectPoint(c, z, L),
              A = D * T;

          if (_.length > 0) {
            var k = R.x - _[_.length - 4],
                B = R.y - _[_.length - 3];
            if (A * A * 2 > k * k + B * B) if (P + 8 < e.length) {
              var O = e[P + 8];

              if (O > -C && O < S) {
                le(e, P, !1);
                continue;
              }
            }
          }

          var F = P / 5;
          _.push(R.x, R.y, A, F), le(e, P, !0);
          var U = R.x - A,
              N = R.y - A,
              Z = R.x + A,
              j = R.y + A;

          if (E = E && this.isOffscreen(U, N, Z, j), w = w || this.isInsideGrid(U, N, Z, j), !i && this.grid.hitTestCircle(R.x, R.y, A, d)) {
            if (!h) return {
              circles: [],
              offscreen: !1
            };
            b = !0;
          }
        }
      }

      return {
        circles: b || !w ? [] : _,
        offscreen: E
      };
    }, se.prototype.queryRenderedSymbols = function (e) {
      if (0 === e.length || 0 === this.grid.keysLength() && 0 === this.ignoredGrid.keysLength()) return {};

      for (var i = [], o = 1 / 0, r = 1 / 0, a = -1 / 0, n = -1 / 0, s = 0, l = e; s < l.length; s += 1) {
        var c = l[s],
            u = new t.Point(c.x + 100, c.y + 100);
        o = Math.min(o, u.x), r = Math.min(r, u.y), a = Math.max(a, u.x), n = Math.max(n, u.y), i.push(u);
      }

      for (var h = {}, p = {}, d = 0, _ = this.grid.query(o, r, a, n).concat(this.ignoredGrid.query(o, r, a, n)); d < _.length; d += 1) {
        var f = _[d],
            m = f.key;

        if (void 0 === h[m.bucketInstanceId] && (h[m.bucketInstanceId] = {}), !h[m.bucketInstanceId][m.featureIndex]) {
          var g = [new t.Point(f.x1, f.y1), new t.Point(f.x2, f.y1), new t.Point(f.x2, f.y2), new t.Point(f.x1, f.y2)];
          t.polygonIntersectsPolygon(i, g) && (h[m.bucketInstanceId][m.featureIndex] = !0, void 0 === p[m.bucketInstanceId] && (p[m.bucketInstanceId] = []), p[m.bucketInstanceId].push(m.featureIndex));
        }
      }

      return p;
    }, se.prototype.insertCollisionBox = function (t, e, i, o, r) {
      var a = {
        bucketInstanceId: i,
        featureIndex: o,
        collisionGroupID: r
      };
      (e ? this.ignoredGrid : this.grid).insert(a, t[0], t[1], t[2], t[3]);
    }, se.prototype.insertCollisionCircles = function (t, e, i, o, r) {
      for (var a = e ? this.ignoredGrid : this.grid, n = {
        bucketInstanceId: i,
        featureIndex: o,
        collisionGroupID: r
      }, s = 0; s < t.length; s += 4) {
        a.insertCircle(n, t[s], t[s + 1], t[s + 2]);
      }
    }, se.prototype.projectAnchor = function (t, e, i) {
      var o = [e, i, 0, 1];
      return ne(o, o, t), {
        perspectiveRatio: .5 + this.transform.cameraToCenterDistance / o[3] * .5,
        cameraDistance: o[3]
      };
    }, se.prototype.projectPoint = function (e, i, o) {
      var r = [i, o, 0, 1];
      return ne(r, r, e), new t.Point((r[0] / r[3] + 1) / 2 * this.transform.width + 100, (-r[1] / r[3] + 1) / 2 * this.transform.height + 100);
    }, se.prototype.projectAndGetPerspectiveRatio = function (e, i, o) {
      var r = [i, o, 0, 1];
      return ne(r, r, e), {
        point: new t.Point((r[0] / r[3] + 1) / 2 * this.transform.width + 100, (-r[1] / r[3] + 1) / 2 * this.transform.height + 100),
        perspectiveRatio: .5 + this.transform.cameraToCenterDistance / r[3] * .5
      };
    }, se.prototype.isOffscreen = function (t, e, i, o) {
      return i < 100 || t >= this.screenRightBoundary || o < 100 || e > this.screenBottomBoundary;
    }, se.prototype.isInsideGrid = function (t, e, i, o) {
      return i >= 0 && t < this.gridRightBoundary && o >= 0 && e < this.gridBottomBoundary;
    };

    var ue = function (t, e, i, o) {
      this.opacity = t ? Math.max(0, Math.min(1, t.opacity + (t.placed ? e : -e))) : o && i ? 1 : 0, this.placed = i;
    };

    ue.prototype.isHidden = function () {
      return 0 === this.opacity && !this.placed;
    };

    var he = function (t, e, i, o, r) {
      this.text = new ue(t ? t.text : null, e, i, r), this.icon = new ue(t ? t.icon : null, e, o, r);
    };

    he.prototype.isHidden = function () {
      return this.text.isHidden() && this.icon.isHidden();
    };

    var pe = function (t, e, i) {
      this.text = t, this.icon = e, this.skipFade = i;
    },
        de = function (t, e, i, o, r) {
      this.bucketInstanceId = t, this.featureIndex = e, this.sourceLayerIndex = i, this.bucketIndex = o, this.tileID = r;
    },
        _e = function (t) {
      this.crossSourceCollisions = t, this.maxGroupID = 0, this.collisionGroups = {};
    };

    function fe(e, i, o, r, a) {
      var n = t.getAnchorAlignment(e),
          s = -(n.horizontalAlign - .5) * i,
          l = -(n.verticalAlign - .5) * o,
          c = t.evaluateRadialOffset(e, r);
      return new t.Point(s + c[0] * a, l + c[1] * a);
    }

    _e.prototype.get = function (t) {
      if (this.crossSourceCollisions) return {
        ID: 0,
        predicate: null
      };

      if (!this.collisionGroups[t]) {
        var e = ++this.maxGroupID;
        this.collisionGroups[t] = {
          ID: e,
          predicate: function (t) {
            return t.collisionGroupID === e;
          }
        };
      }

      return this.collisionGroups[t];
    };

    var me = function (t, e, i, o) {
      this.transform = t.clone(), this.collisionIndex = new se(this.transform), this.placements = {}, this.opacities = {}, this.variableOffsets = {}, this.stale = !1, this.commitTime = 0, this.fadeDuration = e, this.retainedQueryData = {}, this.collisionGroups = new _e(i), this.prevPlacement = o, o && (o.prevPlacement = void 0);
    };

    function ge(t, e, i, o, r) {
      t.emplaceBack(e ? 1 : 0, i ? 1 : 0, o || 0, r || 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0, o || 0, r || 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0, o || 0, r || 0), t.emplaceBack(e ? 1 : 0, i ? 1 : 0, o || 0, r || 0);
    }

    me.prototype.placeLayerTile = function (e, i, o, r) {
      var a = i.getBucket(e),
          n = i.latestFeatureIndex;

      if (a && n && e.id === a.layerIds[0]) {
        var s = i.collisionBoxArray,
            l = a.layers[0].layout,
            c = Math.pow(2, this.transform.zoom - i.tileID.overscaledZ),
            u = i.tileSize / t.EXTENT,
            h = this.transform.calculatePosMatrix(i.tileID.toUnwrapped()),
            p = Ht(h, "map" === l.get("text-pitch-alignment"), "map" === l.get("text-rotation-alignment"), this.transform, ce(i, 1, this.transform.zoom)),
            d = Ht(h, "map" === l.get("icon-pitch-alignment"), "map" === l.get("icon-rotation-alignment"), this.transform, ce(i, 1, this.transform.zoom));
        this.retainedQueryData[a.bucketInstanceId] = new de(a.bucketInstanceId, n, a.sourceLayerIndex, a.index, i.tileID), this.placeLayerBucket(a, h, p, d, c, u, o, i.holdingForFade(), r, s);
      }
    }, me.prototype.attemptAnchorPlacement = function (e, i, o, r, a, n, s, l, c, u, h, p, d, _) {
      var f,
          m = fe(e, o, r, a, n),
          g = this.collisionIndex.placeCollisionBox(function (e, i, o, r, a, n) {
        var s = e.x1,
            l = e.x2,
            c = e.y1,
            u = e.y2,
            h = e.anchorPointX,
            p = e.anchorPointY,
            d = new t.Point(i, o);
        return r && d._rotate(a ? n : -n), {
          x1: s + d.x,
          y1: c + d.y,
          x2: l + d.x,
          y2: u + d.y,
          anchorPointX: h,
          anchorPointY: p
        };
      }(i, m.x, m.y, s, l, this.transform.angle), p, c, u, h.predicate);
      if (g.box.length > 0) return this.prevPlacement && this.prevPlacement.variableOffsets[d.crossTileID] && this.prevPlacement.placements[d.crossTileID] && this.prevPlacement.placements[d.crossTileID].text && (f = this.prevPlacement.variableOffsets[d.crossTileID].anchor), this.variableOffsets[d.crossTileID] = {
        radialOffset: a,
        width: o,
        height: r,
        anchor: e,
        textBoxScale: n,
        prevAnchor: f
      }, this.markUsedJustification(_, e, d), g;
    }, me.prototype.placeLayerBucket = function (e, i, o, r, a, n, s, l, c, u) {
      var h = this,
          p = e.layers[0].layout,
          d = t.evaluateSizeForZoom(e.textSizeData, this.transform.zoom),
          _ = p.get("text-optional"),
          f = p.get("icon-optional"),
          m = p.get("text-allow-overlap"),
          g = p.get("icon-allow-overlap"),
          v = m && (g || !e.hasIconData() || f),
          y = g && (m || !e.hasTextData() || _),
          x = this.collisionGroups.get(e.sourceID),
          b = "map" === p.get("text-rotation-alignment"),
          w = "map" === p.get("text-pitch-alignment"),
          E = "viewport-y" === p.get("symbol-z-order");

      !e.collisionArrays && u && e.deserializeCollisionBoxes(u);

      var T = function (r, u) {
        if (!c[r.crossTileID]) if (l) h.placements[r.crossTileID] = new pe(!1, !1, !1);else {
          var g = !1,
              E = !1,
              T = !0,
              I = null,
              C = null,
              S = null,
              P = 0,
              z = 0;
          u.textFeatureIndex && (P = u.textFeatureIndex);
          var L = u.textBox;
          if (L) if (p.get("text-variable-anchor")) {
            var D = L.x2 - L.x1,
                M = L.y2 - L.y1,
                R = r.textBoxScale,
                A = p.get("text-variable-anchor");

            if (h.prevPlacement && h.prevPlacement.variableOffsets[r.crossTileID]) {
              var k = h.prevPlacement.variableOffsets[r.crossTileID];
              A.indexOf(k.anchor) > 0 && (A = A.filter(function (t) {
                return t !== k.anchor;
              })).unshift(k.anchor);
            }

            for (var B = 0, O = A; B < O.length; B += 1) {
              var F = O[B];

              if (I = h.attemptAnchorPlacement(F, L, D, M, r.radialTextOffset, R, b, w, n, i, x, m, r, e)) {
                g = !0;
                break;
              }
            }

            if (!h.variableOffsets[r.crossTileID] && h.prevPlacement) {
              var U = h.prevPlacement.variableOffsets[r.crossTileID];
              U && (h.variableOffsets[r.crossTileID] = U, h.markUsedJustification(e, U.anchor, r));
            }
          } else g = (I = h.collisionIndex.placeCollisionBox(L, p.get("text-allow-overlap"), n, i, x.predicate)).box.length > 0;
          T = I && I.offscreen;
          var N = u.textCircles;

          if (N) {
            var Z = e.text.placedSymbolArray.get(r.centerJustifiedTextSymbolIndex),
                j = t.evaluateSizeForFeature(e.textSizeData, d, Z);
            C = h.collisionIndex.placeCollisionCircles(N, p.get("text-allow-overlap"), a, n, Z, e.lineVertexArray, e.glyphOffsetArray, j, i, o, s, w, x.predicate), g = p.get("text-allow-overlap") || C.circles.length > 0, T = T && C.offscreen;
          }

          u.iconFeatureIndex && (z = u.iconFeatureIndex), u.iconBox && (E = (S = h.collisionIndex.placeCollisionBox(u.iconBox, p.get("icon-allow-overlap"), n, i, x.predicate)).box.length > 0, T = T && S.offscreen);
          var q = _ || 0 === r.numHorizontalGlyphVertices && 0 === r.numVerticalGlyphVertices,
              V = f || 0 === r.numIconVertices;
          q || V ? V ? q || (E = E && g) : g = E && g : E = g = E && g, g && I && h.collisionIndex.insertCollisionBox(I.box, p.get("text-ignore-placement"), e.bucketInstanceId, P, x.ID), E && S && h.collisionIndex.insertCollisionBox(S.box, p.get("icon-ignore-placement"), e.bucketInstanceId, z, x.ID), g && C && h.collisionIndex.insertCollisionCircles(C.circles, p.get("text-ignore-placement"), e.bucketInstanceId, P, x.ID), h.placements[r.crossTileID] = new pe(g || v, E || y, T || e.justReloaded), c[r.crossTileID] = !0;
        }
      };

      if (E) for (var I = e.getSortedSymbolIndexes(this.transform.angle), C = I.length - 1; C >= 0; --C) {
        var S = I[C];
        T(e.symbolInstances.get(S), e.collisionArrays[S]);
      } else for (var P = 0; P < e.symbolInstances.length; ++P) {
        T(e.symbolInstances.get(P), e.collisionArrays[P]);
      }
      e.justReloaded = !1;
    }, me.prototype.markUsedJustification = function (e, i, o) {
      var r = {
        left: o.leftJustifiedTextSymbolIndex,
        center: o.centerJustifiedTextSymbolIndex,
        right: o.rightJustifiedTextSymbolIndex
      },
          a = r[t.getAnchorJustification(i)];

      for (var n in r) {
        var s = r[n];
        s >= 0 && (e.text.placedSymbolArray.get(s).crossTileID = a >= 0 && s !== a ? 0 : o.crossTileID);
      }
    }, me.prototype.commit = function (t) {
      this.commitTime = t;
      var e = this.prevPlacement,
          i = !1,
          o = e && 0 !== this.fadeDuration ? (this.commitTime - e.commitTime) / this.fadeDuration : 1,
          r = e ? e.opacities : {},
          a = e ? e.variableOffsets : {};

      for (var n in this.placements) {
        var s = this.placements[n],
            l = r[n];
        l ? (this.opacities[n] = new he(l, o, s.text, s.icon), i = i || s.text !== l.text.placed || s.icon !== l.icon.placed) : (this.opacities[n] = new he(null, o, s.text, s.icon, s.skipFade), i = i || s.text || s.icon);
      }

      for (var c in r) {
        var u = r[c];

        if (!this.opacities[c]) {
          var h = new he(u, o, !1, !1);
          h.isHidden() || (this.opacities[c] = h, i = i || u.text.placed || u.icon.placed);
        }
      }

      for (var p in a) {
        this.variableOffsets[p] || !this.opacities[p] || this.opacities[p].isHidden() || (this.variableOffsets[p] = a[p]);
      }

      i ? this.lastPlacementChangeTime = t : "number" != typeof this.lastPlacementChangeTime && (this.lastPlacementChangeTime = e ? e.lastPlacementChangeTime : t);
    }, me.prototype.updateLayerOpacities = function (t, e) {
      for (var i = {}, o = 0, r = e; o < r.length; o += 1) {
        var a = r[o],
            n = a.getBucket(t);
        n && a.latestFeatureIndex && t.id === n.layerIds[0] && this.updateBucketOpacities(n, i, a.collisionBoxArray);
      }
    }, me.prototype.updateBucketOpacities = function (e, i, o) {
      e.hasTextData() && e.text.opacityVertexArray.clear(), e.hasIconData() && e.icon.opacityVertexArray.clear(), e.hasCollisionBoxData() && e.collisionBox.collisionVertexArray.clear(), e.hasCollisionCircleData() && e.collisionCircle.collisionVertexArray.clear();
      var r = e.layers[0].layout,
          a = new he(null, 0, !1, !1, !0),
          n = r.get("text-allow-overlap"),
          s = r.get("icon-allow-overlap"),
          l = r.get("text-variable-anchor"),
          c = "map" === r.get("text-rotation-alignment"),
          u = "map" === r.get("text-pitch-alignment"),
          h = new he(null, 0, n && (s || !e.hasIconData() || r.get("icon-optional")), s && (n || !e.hasTextData() || r.get("text-optional")), !0);
      !e.collisionArrays && o && (e.hasCollisionBoxData() || e.hasCollisionCircleData()) && e.deserializeCollisionBoxes(o);

      for (var p = 0; p < e.symbolInstances.length; p++) {
        var d = e.symbolInstances.get(p),
            _ = d.numHorizontalGlyphVertices,
            f = d.numVerticalGlyphVertices,
            m = d.crossTileID,
            g = i[m],
            v = this.opacities[m];
        g ? v = a : v || (v = h, this.opacities[m] = v), i[m] = !0;
        var y = _ > 0 || f > 0,
            x = d.numIconVertices > 0;

        if (y) {
          for (var b = Ie(v.text), w = (_ + f) / 4, E = 0; E < w; E++) {
            e.text.opacityVertexArray.emplaceBack(b);
          }

          var T = v.text.isHidden() ? 1 : 0;
          [d.rightJustifiedTextSymbolIndex, d.centerJustifiedTextSymbolIndex, d.leftJustifiedTextSymbolIndex, d.verticalPlacedTextSymbolIndex].forEach(function (t) {
            t >= 0 && (e.text.placedSymbolArray.get(t).hidden = T);
          });
          var I = this.variableOffsets[d.crossTileID];
          I && this.markUsedJustification(e, I.anchor, d);
        }

        if (x) {
          for (var C = Ie(v.icon), S = 0; S < d.numIconVertices / 4; S++) {
            e.icon.opacityVertexArray.emplaceBack(C);
          }

          e.icon.placedSymbolArray.get(p).hidden = v.icon.isHidden();
        }

        if (e.hasCollisionBoxData() || e.hasCollisionCircleData()) {
          var P = e.collisionArrays[p];

          if (P) {
            if (P.textBox) {
              var z = new t.Point(0, 0),
                  L = !0;

              if (l) {
                var D = this.variableOffsets[m];
                D ? (z = fe(D.anchor, D.width, D.height, D.radialOffset, D.textBoxScale), c && z._rotate(u ? this.transform.angle : -this.transform.angle)) : L = !1;
              }

              ge(e.collisionBox.collisionVertexArray, v.text.placed, !L, z.x, z.y);
            }

            P.iconBox && ge(e.collisionBox.collisionVertexArray, v.icon.placed, !1);
            var M = P.textCircles;
            if (M && e.hasCollisionCircleData()) for (var R = 0; R < M.length; R += 5) {
              var A = g || 0 === M[R + 4];
              ge(e.collisionCircle.collisionVertexArray, v.text.placed, A);
            }
          }
        }
      }

      e.sortFeatures(this.transform.angle), this.retainedQueryData[e.bucketInstanceId] && (this.retainedQueryData[e.bucketInstanceId].featureSortOrder = e.featureSortOrder), e.hasTextData() && e.text.opacityVertexBuffer && e.text.opacityVertexBuffer.updateData(e.text.opacityVertexArray), e.hasIconData() && e.icon.opacityVertexBuffer && e.icon.opacityVertexBuffer.updateData(e.icon.opacityVertexArray), e.hasCollisionBoxData() && e.collisionBox.collisionVertexBuffer && e.collisionBox.collisionVertexBuffer.updateData(e.collisionBox.collisionVertexArray), e.hasCollisionCircleData() && e.collisionCircle.collisionVertexBuffer && e.collisionCircle.collisionVertexBuffer.updateData(e.collisionCircle.collisionVertexArray);
    }, me.prototype.symbolFadeChange = function (t) {
      return 0 === this.fadeDuration ? 1 : (t - this.commitTime) / this.fadeDuration;
    }, me.prototype.hasTransitions = function (t) {
      return this.stale || t - this.lastPlacementChangeTime < this.fadeDuration;
    }, me.prototype.stillRecent = function (t) {
      return this.commitTime + this.fadeDuration > t;
    }, me.prototype.setStale = function () {
      this.stale = !0;
    };
    var ve = Math.pow(2, 25),
        ye = Math.pow(2, 24),
        xe = Math.pow(2, 17),
        be = Math.pow(2, 16),
        we = Math.pow(2, 9),
        Ee = Math.pow(2, 8),
        Te = Math.pow(2, 1);

    function Ie(t) {
      if (0 === t.opacity && !t.placed) return 0;
      if (1 === t.opacity && t.placed) return 4294967295;
      var e = t.placed ? 1 : 0,
          i = Math.floor(127 * t.opacity);
      return i * ve + e * ye + i * xe + e * be + i * we + e * Ee + i * Te + e;
    }

    var Ce = function () {
      this._currentTileIndex = 0, this._seenCrossTileIDs = {};
    };

    Ce.prototype.continuePlacement = function (t, e, i, o, r) {
      for (; this._currentTileIndex < t.length;) {
        var a = t[this._currentTileIndex];
        if (e.placeLayerTile(o, a, i, this._seenCrossTileIDs), this._currentTileIndex++, r()) return !0;
      }
    };

    var Se = function (t, e, i, o, r, a, n) {
      this.placement = new me(t, r, a, n), this._currentPlacementIndex = e.length - 1, this._forceFullPlacement = i, this._showCollisionBoxes = o, this._done = !1;
    };

    Se.prototype.isDone = function () {
      return this._done;
    }, Se.prototype.continuePlacement = function (e, i, o) {
      for (var r = this, a = t.browser.now(), n = function () {
        var e = t.browser.now() - a;
        return !r._forceFullPlacement && e > 2;
      }; this._currentPlacementIndex >= 0;) {
        var s = i[e[this._currentPlacementIndex]],
            l = this.placement.collisionIndex.transform.zoom;

        if ("symbol" === s.type && (!s.minzoom || s.minzoom <= l) && (!s.maxzoom || s.maxzoom > l)) {
          if (this._inProgressLayer || (this._inProgressLayer = new Ce()), this._inProgressLayer.continuePlacement(o[s.source], this.placement, this._showCollisionBoxes, s, n)) return;
          delete this._inProgressLayer;
        }

        this._currentPlacementIndex--;
      }

      this._done = !0;
    }, Se.prototype.commit = function (t) {
      return this.placement.commit(t), this.placement;
    };

    var Pe = 512 / t.EXTENT / 2,
        ze = function (t, e, i) {
      this.tileID = t, this.indexedSymbolInstances = {}, this.bucketInstanceId = i;

      for (var o = 0; o < e.length; o++) {
        var r = e.get(o),
            a = r.key;
        this.indexedSymbolInstances[a] || (this.indexedSymbolInstances[a] = []), this.indexedSymbolInstances[a].push({
          crossTileID: r.crossTileID,
          coord: this.getScaledCoordinates(r, t)
        });
      }
    };

    ze.prototype.getScaledCoordinates = function (e, i) {
      var o = i.canonical.z - this.tileID.canonical.z,
          r = Pe / Math.pow(2, o);
      return {
        x: Math.floor((i.canonical.x * t.EXTENT + e.anchorX) * r),
        y: Math.floor((i.canonical.y * t.EXTENT + e.anchorY) * r)
      };
    }, ze.prototype.findMatches = function (t, e, i) {
      for (var o = this.tileID.canonical.z < e.canonical.z ? 1 : Math.pow(2, this.tileID.canonical.z - e.canonical.z), r = 0; r < t.length; r++) {
        var a = t.get(r);

        if (!a.crossTileID) {
          var n = this.indexedSymbolInstances[a.key];
          if (n) for (var s = this.getScaledCoordinates(a, e), l = 0, c = n; l < c.length; l += 1) {
            var u = c[l];

            if (Math.abs(u.coord.x - s.x) <= o && Math.abs(u.coord.y - s.y) <= o && !i[u.crossTileID]) {
              i[u.crossTileID] = !0, a.crossTileID = u.crossTileID;
              break;
            }
          }
        }
      }
    };

    var Le = function () {
      this.maxCrossTileID = 0;
    };

    Le.prototype.generate = function () {
      return ++this.maxCrossTileID;
    };

    var De = function () {
      this.indexes = {}, this.usedCrossTileIDs = {}, this.lng = 0;
    };

    De.prototype.handleWrapJump = function (t) {
      var e = Math.round((t - this.lng) / 360);
      if (0 !== e) for (var i in this.indexes) {
        var o = this.indexes[i],
            r = {};

        for (var a in o) {
          var n = o[a];
          n.tileID = n.tileID.unwrapTo(n.tileID.wrap + e), r[n.tileID.key] = n;
        }

        this.indexes[i] = r;
      }
      this.lng = t;
    }, De.prototype.addBucket = function (t, e, i) {
      if (this.indexes[t.overscaledZ] && this.indexes[t.overscaledZ][t.key]) {
        if (this.indexes[t.overscaledZ][t.key].bucketInstanceId === e.bucketInstanceId) return !1;
        this.removeBucketCrossTileIDs(t.overscaledZ, this.indexes[t.overscaledZ][t.key]);
      }

      for (var o = 0; o < e.symbolInstances.length; o++) {
        e.symbolInstances.get(o).crossTileID = 0;
      }

      this.usedCrossTileIDs[t.overscaledZ] || (this.usedCrossTileIDs[t.overscaledZ] = {});
      var r = this.usedCrossTileIDs[t.overscaledZ];

      for (var a in this.indexes) {
        var n = this.indexes[a];
        if (Number(a) > t.overscaledZ) for (var s in n) {
          var l = n[s];
          l.tileID.isChildOf(t) && l.findMatches(e.symbolInstances, t, r);
        } else {
          var c = n[t.scaledTo(Number(a)).key];
          c && c.findMatches(e.symbolInstances, t, r);
        }
      }

      for (var u = 0; u < e.symbolInstances.length; u++) {
        var h = e.symbolInstances.get(u);
        h.crossTileID || (h.crossTileID = i.generate(), r[h.crossTileID] = !0);
      }

      return void 0 === this.indexes[t.overscaledZ] && (this.indexes[t.overscaledZ] = {}), this.indexes[t.overscaledZ][t.key] = new ze(t, e.symbolInstances, e.bucketInstanceId), !0;
    }, De.prototype.removeBucketCrossTileIDs = function (t, e) {
      for (var i in e.indexedSymbolInstances) {
        for (var o = 0, r = e.indexedSymbolInstances[i]; o < r.length; o += 1) {
          var a = r[o];
          delete this.usedCrossTileIDs[t][a.crossTileID];
        }
      }
    }, De.prototype.removeStaleBuckets = function (t) {
      var e = !1;

      for (var i in this.indexes) {
        var o = this.indexes[i];

        for (var r in o) {
          t[o[r].bucketInstanceId] || (this.removeBucketCrossTileIDs(i, o[r]), delete o[r], e = !0);
        }
      }

      return e;
    };

    var Me = function () {
      this.layerIndexes = {}, this.crossTileIDs = new Le(), this.maxBucketInstanceId = 0, this.bucketsInCurrentPlacement = {};
    };

    Me.prototype.addLayer = function (t, e, i) {
      var o = this.layerIndexes[t.id];
      void 0 === o && (o = this.layerIndexes[t.id] = new De());
      var r = !1,
          a = {};
      o.handleWrapJump(i);

      for (var n = 0, s = e; n < s.length; n += 1) {
        var l = s[n],
            c = l.getBucket(t);
        c && t.id === c.layerIds[0] && (c.bucketInstanceId || (c.bucketInstanceId = ++this.maxBucketInstanceId), o.addBucket(l.tileID, c, this.crossTileIDs) && (r = !0), a[c.bucketInstanceId] = !0);
      }

      return o.removeStaleBuckets(a) && (r = !0), r;
    }, Me.prototype.pruneUnusedLayers = function (t) {
      var e = {};

      for (var i in t.forEach(function (t) {
        e[t] = !0;
      }), this.layerIndexes) {
        e[i] || delete this.layerIndexes[i];
      }
    };

    var Re = function (e, i) {
      return t.emitValidationErrors(e, i && i.filter(function (t) {
        return "source.canvas" !== t.identifier;
      }));
    },
        Ae = t.pick(Ft, ["addLayer", "removeLayer", "setPaintProperty", "setLayoutProperty", "setFilter", "addSource", "removeSource", "setLayerZoomRange", "setLight", "setTransition", "setGeoJSONSourceData"]),
        ke = t.pick(Ft, ["setCenter", "setZoom", "setBearing", "setPitch"]),
        Be = function (e) {
      function i(o, r) {
        var a = this;
        void 0 === r && (r = {}), e.call(this), this.map = o, this.dispatcher = new E((At || (At = new Rt()), At), this), this.imageManager = new p(), this.imageManager.setEventedParent(this), this.glyphManager = new v(o._requestManager, r.localIdeographFontFamily), this.lineAtlas = new w(256, 512), this.crossTileSymbolIndex = new Me(), this._layers = {}, this._order = [], this.sourceCaches = {}, this.zoomHistory = new t.ZoomHistory(), this._loaded = !1, this._resetUpdates(), this.dispatcher.broadcast("setReferrer", t.getReferrer());
        var n = this;
        this._rtlTextPluginCallback = i.registerForPluginAvailability(function (t) {
          for (var e in n.dispatcher.broadcast("loadRTLTextPlugin", t.pluginURL, t.completionCallback), n.sourceCaches) {
            n.sourceCaches[e].reload();
          }
        }), this.on("data", function (t) {
          if ("source" === t.dataType && "metadata" === t.sourceDataType) {
            var e = a.sourceCaches[t.sourceId];

            if (e) {
              var i = e.getSource();
              if (i && i.vectorLayerIds) for (var o in a._layers) {
                var r = a._layers[o];
                r.source === i.id && a._validateLayer(r);
              }
            }
          }
        });
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.loadURL = function (e, i) {
        var o = this;
        void 0 === i && (i = {}), this.fire(new t.Event("dataloading", {
          dataType: "style"
        }));
        var r = "boolean" == typeof i.validate ? i.validate : !t.isMapboxURL(e);
        e = this.map._requestManager.normalizeStyleURL(e, i.accessToken);

        var a = this.map._requestManager.transformRequest(e, t.ResourceType.Style);

        this._request = t.getJSON(a, function (e, i) {
          o._request = null, e ? o.fire(new t.ErrorEvent(e)) : i && o._load(i, r);
        });
      }, i.prototype.loadJSON = function (e, i) {
        var o = this;
        void 0 === i && (i = {}), this.fire(new t.Event("dataloading", {
          dataType: "style"
        })), this._request = t.browser.frame(function () {
          o._request = null, o._load(e, !1 !== i.validate);
        });
      }, i.prototype._load = function (e, i) {
        var o = this;

        if (!i || !Re(this, t.validateStyle(e))) {
          for (var r in this._loaded = !0, this.stylesheet = e, e.sources) {
            this.addSource(r, e.sources[r], {
              validate: !1
            });
          }

          e.sprite ? this._spriteRequest = function (e, i, o) {
            var r,
                a,
                n,
                s = t.browser.devicePixelRatio > 1 ? "@2x" : "",
                l = t.getJSON(i.transformRequest(i.normalizeSpriteURL(e, s, ".json"), t.ResourceType.SpriteJSON), function (t, e) {
              l = null, n || (n = t, r = e, u());
            }),
                c = t.getImage(i.transformRequest(i.normalizeSpriteURL(e, s, ".png"), t.ResourceType.SpriteImage), function (t, e) {
              c = null, n || (n = t, a = e, u());
            });

            function u() {
              if (n) o(n);else if (r && a) {
                var e = t.browser.getImageData(a),
                    i = {};

                for (var s in r) {
                  var l = r[s],
                      c = l.width,
                      u = l.height,
                      h = l.x,
                      p = l.y,
                      d = l.sdf,
                      _ = l.pixelRatio,
                      f = new t.RGBAImage({
                    width: c,
                    height: u
                  });
                  t.RGBAImage.copy(e, f, {
                    x: h,
                    y: p
                  }, {
                    x: 0,
                    y: 0
                  }, {
                    width: c,
                    height: u
                  }), i[s] = {
                    data: f,
                    pixelRatio: _,
                    sdf: d
                  };
                }

                o(null, i);
              }
            }

            return {
              cancel: function () {
                l && (l.cancel(), l = null), c && (c.cancel(), c = null);
              }
            };
          }(e.sprite, this.map._requestManager, function (e, i) {
            if (o._spriteRequest = null, e) o.fire(new t.ErrorEvent(e));else if (i) for (var r in i) {
              o.imageManager.addImage(r, i[r]);
            }
            o.imageManager.setLoaded(!0), o.fire(new t.Event("data", {
              dataType: "style"
            }));
          }) : this.imageManager.setLoaded(!0), this.glyphManager.setURL(e.glyphs);
          var a = Ot(this.stylesheet.layers);
          this._order = a.map(function (t) {
            return t.id;
          }), this._layers = {};

          for (var n = 0, s = a; n < s.length; n += 1) {
            var l = s[n];
            (l = t.createStyleLayer(l)).setEventedParent(this, {
              layer: {
                id: l.id
              }
            }), this._layers[l.id] = l;
          }

          this.dispatcher.broadcast("setLayers", this._serializeLayers(this._order)), this.light = new b(this.stylesheet.light), this.fire(new t.Event("data", {
            dataType: "style"
          })), this.fire(new t.Event("style.load"));
        }
      }, i.prototype._validateLayer = function (e) {
        var i = this.sourceCaches[e.source];

        if (i) {
          var o = e.sourceLayer;

          if (o) {
            var r = i.getSource();
            ("geojson" === r.type || r.vectorLayerIds && -1 === r.vectorLayerIds.indexOf(o)) && this.fire(new t.ErrorEvent(new Error('Source layer "' + o + '" does not exist on source "' + r.id + '" as specified by style layer "' + e.id + '"')));
          }
        }
      }, i.prototype.loaded = function () {
        if (!this._loaded) return !1;
        if (Object.keys(this._updatedSources).length) return !1;

        for (var t in this.sourceCaches) {
          if (!this.sourceCaches[t].loaded()) return !1;
        }

        return !!this.imageManager.isLoaded();
      }, i.prototype._serializeLayers = function (t) {
        for (var e = [], i = 0, o = t; i < o.length; i += 1) {
          var r = o[i],
              a = this._layers[r];
          "custom" !== a.type && e.push(a.serialize());
        }

        return e;
      }, i.prototype.hasTransitions = function () {
        if (this.light && this.light.hasTransition()) return !0;

        for (var t in this.sourceCaches) {
          if (this.sourceCaches[t].hasTransition()) return !0;
        }

        for (var e in this._layers) {
          if (this._layers[e].hasTransition()) return !0;
        }

        return !1;
      }, i.prototype._checkLoaded = function () {
        if (!this._loaded) throw new Error("Style is not done loading");
      }, i.prototype.update = function (e) {
        if (this._loaded) {
          var i = this._changed;

          if (this._changed) {
            var o = Object.keys(this._updatedLayers),
                r = Object.keys(this._removedLayers);

            for (var a in (o.length || r.length) && this._updateWorkerLayers(o, r), this._updatedSources) {
              var n = this._updatedSources[a];
              "reload" === n ? this._reloadSource(a) : "clear" === n && this._clearSource(a);
            }

            for (var s in this._updatedPaintProps) {
              this._layers[s].updateTransitions(e);
            }

            this.light.updateTransitions(e), this._resetUpdates();
          }

          for (var l in this.sourceCaches) {
            this.sourceCaches[l].used = !1;
          }

          for (var c = 0, u = this._order; c < u.length; c += 1) {
            var h = u[c],
                p = this._layers[h];
            p.recalculate(e), !p.isHidden(e.zoom) && p.source && (this.sourceCaches[p.source].used = !0);
          }

          this.light.recalculate(e), this.z = e.zoom, i && this.fire(new t.Event("data", {
            dataType: "style"
          }));
        }
      }, i.prototype._updateWorkerLayers = function (t, e) {
        this.dispatcher.broadcast("updateLayers", {
          layers: this._serializeLayers(t),
          removedIds: e
        });
      }, i.prototype._resetUpdates = function () {
        this._changed = !1, this._updatedLayers = {}, this._removedLayers = {}, this._updatedSources = {}, this._updatedPaintProps = {};
      }, i.prototype.setState = function (e) {
        var i = this;
        if (this._checkLoaded(), Re(this, t.validateStyle(e))) return !1;
        (e = t.clone$1(e)).layers = Ot(e.layers);
        var o = Wt(this.serialize(), e).filter(function (t) {
          return !(t.command in ke);
        });
        if (0 === o.length) return !1;
        var r = o.filter(function (t) {
          return !(t.command in Ae);
        });
        if (r.length > 0) throw new Error("Unimplemented: " + r.map(function (t) {
          return t.command;
        }).join(", ") + ".");
        return o.forEach(function (t) {
          "setTransition" !== t.command && i[t.command].apply(i, t.args);
        }), this.stylesheet = e, !0;
      }, i.prototype.addImage = function (e, i) {
        if (this.getImage(e)) return this.fire(new t.ErrorEvent(new Error("An image with this name already exists.")));
        this.imageManager.addImage(e, i), this.fire(new t.Event("data", {
          dataType: "style"
        }));
      }, i.prototype.updateImage = function (t, e) {
        this.imageManager.updateImage(t, e);
      }, i.prototype.getImage = function (t) {
        return this.imageManager.getImage(t);
      }, i.prototype.removeImage = function (e) {
        if (!this.getImage(e)) return this.fire(new t.ErrorEvent(new Error("No image with this name exists.")));
        this.imageManager.removeImage(e), this.fire(new t.Event("data", {
          dataType: "style"
        }));
      }, i.prototype.listImages = function () {
        return this._checkLoaded(), this.imageManager.listImages();
      }, i.prototype.addSource = function (e, i, o) {
        var r = this;
        if (void 0 === o && (o = {}), this._checkLoaded(), void 0 !== this.sourceCaches[e]) throw new Error("There is already a source with this ID");
        if (!i.type) throw new Error("The type property must be defined, but the only the following properties were given: " + Object.keys(i).join(", ") + ".");

        if (!(["vector", "raster", "geojson", "video", "image"].indexOf(i.type) >= 0) || !this._validate(t.validateStyle.source, "sources." + e, i, null, o)) {
          this.map && this.map._collectResourceTiming && (i.collectResourceTiming = !0);
          var a = this.sourceCaches[e] = new zt(e, i, this.dispatcher);
          a.style = this, a.setEventedParent(this, function () {
            return {
              isSourceLoaded: r.loaded(),
              source: a.serialize(),
              sourceId: e
            };
          }), a.onAdd(this.map), this._changed = !0;
        }
      }, i.prototype.removeSource = function (e) {
        if (this._checkLoaded(), void 0 === this.sourceCaches[e]) throw new Error("There is no source with this ID");

        for (var i in this._layers) {
          if (this._layers[i].source === e) return this.fire(new t.ErrorEvent(new Error('Source "' + e + '" cannot be removed while layer "' + i + '" is using it.')));
        }

        var o = this.sourceCaches[e];
        delete this.sourceCaches[e], delete this._updatedSources[e], o.fire(new t.Event("data", {
          sourceDataType: "metadata",
          dataType: "source",
          sourceId: e
        })), o.setEventedParent(null), o.clearTiles(), o.onRemove && o.onRemove(this.map), this._changed = !0;
      }, i.prototype.setGeoJSONSourceData = function (t, e) {
        this._checkLoaded(), this.sourceCaches[t].getSource().setData(e), this._changed = !0;
      }, i.prototype.getSource = function (t) {
        return this.sourceCaches[t] && this.sourceCaches[t].getSource();
      }, i.prototype.addLayer = function (e, i, o) {
        void 0 === o && (o = {}), this._checkLoaded();
        var r = e.id;
        if (this.getLayer(r)) this.fire(new t.ErrorEvent(new Error('Layer with id "' + r + '" already exists on this map')));else {
          var a;

          if ("custom" === e.type) {
            if (Re(this, t.validateCustomStyleLayer(e))) return;
            a = t.createStyleLayer(e);
          } else {
            if ("object" == _typeof(e.source) && (this.addSource(r, e.source), e = t.clone$1(e), e = t.extend(e, {
              source: r
            })), this._validate(t.validateStyle.layer, "layers." + r, e, {
              arrayIndex: -1
            }, o)) return;
            a = t.createStyleLayer(e), this._validateLayer(a), a.setEventedParent(this, {
              layer: {
                id: r
              }
            });
          }

          var n = i ? this._order.indexOf(i) : this._order.length;
          if (i && -1 === n) this.fire(new t.ErrorEvent(new Error('Layer with id "' + i + '" does not exist on this map.')));else {
            if (this._order.splice(n, 0, r), this._layerOrderChanged = !0, this._layers[r] = a, this._removedLayers[r] && a.source && "custom" !== a.type) {
              var s = this._removedLayers[r];
              delete this._removedLayers[r], s.type !== a.type ? this._updatedSources[a.source] = "clear" : (this._updatedSources[a.source] = "reload", this.sourceCaches[a.source].pause());
            }

            this._updateLayer(a), a.onAdd && a.onAdd(this.map);
          }
        }
      }, i.prototype.moveLayer = function (e, i) {
        if (this._checkLoaded(), this._changed = !0, this._layers[e]) {
          if (e !== i) {
            var o = this._order.indexOf(e);

            this._order.splice(o, 1);

            var r = i ? this._order.indexOf(i) : this._order.length;
            i && -1 === r ? this.fire(new t.ErrorEvent(new Error('Layer with id "' + i + '" does not exist on this map.'))) : (this._order.splice(r, 0, e), this._layerOrderChanged = !0);
          }
        } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be moved.")));
      }, i.prototype.removeLayer = function (e) {
        this._checkLoaded();

        var i = this._layers[e];

        if (i) {
          i.setEventedParent(null);

          var o = this._order.indexOf(e);

          this._order.splice(o, 1), this._layerOrderChanged = !0, this._changed = !0, this._removedLayers[e] = i, delete this._layers[e], delete this._updatedLayers[e], delete this._updatedPaintProps[e], i.onRemove && i.onRemove(this.map);
        } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be removed.")));
      }, i.prototype.getLayer = function (t) {
        return this._layers[t];
      }, i.prototype.setLayerZoomRange = function (e, i, o) {
        this._checkLoaded();

        var r = this.getLayer(e);
        r ? r.minzoom === i && r.maxzoom === o || (null != i && (r.minzoom = i), null != o && (r.maxzoom = o), this._updateLayer(r)) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot have zoom extent.")));
      }, i.prototype.setFilter = function (e, i, o) {
        void 0 === o && (o = {}), this._checkLoaded();
        var r = this.getLayer(e);

        if (r) {
          if (!t.deepEqual(r.filter, i)) return null == i ? (r.filter = void 0, void this._updateLayer(r)) : void (this._validate(t.validateStyle.filter, "layers." + r.id + ".filter", i, null, o) || (r.filter = t.clone$1(i), this._updateLayer(r)));
        } else this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be filtered.")));
      }, i.prototype.getFilter = function (e) {
        return t.clone$1(this.getLayer(e).filter);
      }, i.prototype.setLayoutProperty = function (e, i, o, r) {
        void 0 === r && (r = {}), this._checkLoaded();
        var a = this.getLayer(e);
        a ? t.deepEqual(a.getLayoutProperty(i), o) || (a.setLayoutProperty(i, o, r), this._updateLayer(a)) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be styled.")));
      }, i.prototype.getLayoutProperty = function (e, i) {
        var o = this.getLayer(e);
        if (o) return o.getLayoutProperty(i);
        this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style.")));
      }, i.prototype.setPaintProperty = function (e, i, o, r) {
        void 0 === r && (r = {}), this._checkLoaded();
        var a = this.getLayer(e);
        a ? t.deepEqual(a.getPaintProperty(i), o) || (a.setPaintProperty(i, o, r) && this._updateLayer(a), this._changed = !0, this._updatedPaintProps[e] = !0) : this.fire(new t.ErrorEvent(new Error("The layer '" + e + "' does not exist in the map's style and cannot be styled.")));
      }, i.prototype.getPaintProperty = function (t, e) {
        return this.getLayer(t).getPaintProperty(e);
      }, i.prototype.setFeatureState = function (e, i) {
        this._checkLoaded();

        var o = e.source,
            r = e.sourceLayer,
            a = this.sourceCaches[o],
            n = parseInt(e.id, 10);

        if (void 0 !== a) {
          var s = a.getSource().type;
          "geojson" === s && r ? this.fire(new t.ErrorEvent(new Error("GeoJSON sources cannot have a sourceLayer parameter."))) : "vector" !== s || r ? isNaN(n) || n < 0 ? this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided and non-negative."))) : a.setFeatureState(r, n, i) : this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));
        } else this.fire(new t.ErrorEvent(new Error("The source '" + o + "' does not exist in the map's style.")));
      }, i.prototype.removeFeatureState = function (e, i) {
        this._checkLoaded();

        var o = e.source,
            r = this.sourceCaches[o];

        if (void 0 !== r) {
          var a = r.getSource().type,
              n = "vector" === a ? e.sourceLayer : void 0,
              s = parseInt(e.id, 10);
          "vector" !== a || n ? void 0 !== e.id && isNaN(s) || s < 0 ? this.fire(new t.ErrorEvent(new Error("The feature id parameter must be non-negative."))) : i && "string" != typeof e.id && "number" != typeof e.id ? this.fire(new t.ErrorEvent(new Error("A feature id is requred to remove its specific state property."))) : r.removeFeatureState(n, s, i) : this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));
        } else this.fire(new t.ErrorEvent(new Error("The source '" + o + "' does not exist in the map's style.")));
      }, i.prototype.getFeatureState = function (e) {
        this._checkLoaded();

        var i = e.source,
            o = e.sourceLayer,
            r = this.sourceCaches[i],
            a = parseInt(e.id, 10);
        if (void 0 !== r) {
          if ("vector" !== r.getSource().type || o) {
            if (!(isNaN(a) || a < 0)) return r.getFeatureState(o, a);
            this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided and non-negative.")));
          } else this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));
        } else this.fire(new t.ErrorEvent(new Error("The source '" + i + "' does not exist in the map's style.")));
      }, i.prototype.getTransition = function () {
        return t.extend({
          duration: 300,
          delay: 0
        }, this.stylesheet && this.stylesheet.transition);
      }, i.prototype.serialize = function () {
        return t.filterObject({
          version: this.stylesheet.version,
          name: this.stylesheet.name,
          metadata: this.stylesheet.metadata,
          light: this.stylesheet.light,
          center: this.stylesheet.center,
          zoom: this.stylesheet.zoom,
          bearing: this.stylesheet.bearing,
          pitch: this.stylesheet.pitch,
          sprite: this.stylesheet.sprite,
          glyphs: this.stylesheet.glyphs,
          transition: this.stylesheet.transition,
          sources: t.mapObject(this.sourceCaches, function (t) {
            return t.serialize();
          }),
          layers: this._serializeLayers(this._order)
        }, function (t) {
          return void 0 !== t;
        });
      }, i.prototype._updateLayer = function (t) {
        this._updatedLayers[t.id] = !0, t.source && !this._updatedSources[t.source] && (this._updatedSources[t.source] = "reload", this.sourceCaches[t.source].pause()), this._changed = !0;
      }, i.prototype._flattenAndSortRenderedFeatures = function (t) {
        for (var e = this, i = function (t) {
          return "fill-extrusion" === e._layers[t].type;
        }, o = {}, r = [], a = this._order.length - 1; a >= 0; a--) {
          var n = this._order[a];

          if (i(n)) {
            o[n] = a;

            for (var s = 0, l = t; s < l.length; s += 1) {
              var c = l[s][n];
              if (c) for (var u = 0, h = c; u < h.length; u += 1) {
                var p = h[u];
                r.push(p);
              }
            }
          }
        }

        r.sort(function (t, e) {
          return e.intersectionZ - t.intersectionZ;
        });

        for (var d = [], _ = this._order.length - 1; _ >= 0; _--) {
          var f = this._order[_];
          if (i(f)) for (var m = r.length - 1; m >= 0; m--) {
            var g = r[m].feature;
            if (o[g.layer.id] < _) break;
            d.push(g), r.pop();
          } else for (var v = 0, y = t; v < y.length; v += 1) {
            var x = y[v][f];
            if (x) for (var b = 0, w = x; b < w.length; b += 1) {
              var E = w[b];
              d.push(E.feature);
            }
          }
        }

        return d;
      }, i.prototype.queryRenderedFeatures = function (e, i, o) {
        i && i.filter && this._validate(t.validateStyle.filter, "queryRenderedFeatures.filter", i.filter, null, i);
        var r = {};

        if (i && i.layers) {
          if (!Array.isArray(i.layers)) return this.fire(new t.ErrorEvent(new Error("parameters.layers must be an Array."))), [];

          for (var a = 0, n = i.layers; a < n.length; a += 1) {
            var s = n[a],
                l = this._layers[s];
            if (!l) return this.fire(new t.ErrorEvent(new Error("The layer '" + s + "' does not exist in the map's style and cannot be queried for features."))), [];
            r[l.source] = !0;
          }
        }

        var c = [];

        for (var u in this.sourceCaches) {
          i.layers && !r[u] || c.push(B(this.sourceCaches[u], this._layers, e, i, o));
        }

        return this.placement && c.push(function (t, e, i, o, r, a) {
          for (var n = {}, s = r.queryRenderedSymbols(i), l = [], c = 0, u = Object.keys(s).map(Number); c < u.length; c += 1) {
            var h = u[c];
            l.push(a[h]);
          }

          l.sort(O);

          for (var p = function () {
            var e = _[d],
                i = e.featureIndex.lookupSymbolFeatures(s[e.bucketInstanceId], e.bucketIndex, e.sourceLayerIndex, o.filter, o.layers, t);

            for (var r in i) {
              var a = n[r] = n[r] || [],
                  l = i[r];
              l.sort(function (t, i) {
                var o = e.featureSortOrder;

                if (o) {
                  var r = o.indexOf(t.featureIndex);
                  return o.indexOf(i.featureIndex) - r;
                }

                return i.featureIndex - t.featureIndex;
              });

              for (var c = 0, u = l; c < u.length; c += 1) {
                var h = u[c];
                a.push(h);
              }
            }
          }, d = 0, _ = l; d < _.length; d += 1) {
            p();
          }

          var f = function (i) {
            n[i].forEach(function (o) {
              var r = o.feature,
                  a = t[i],
                  n = e[a.source].getFeatureState(r.layer["source-layer"], r.id);
              r.source = r.layer.source, r.layer["source-layer"] && (r.sourceLayer = r.layer["source-layer"]), r.state = n;
            });
          };

          for (var m in n) {
            f(m);
          }

          return n;
        }(this._layers, this.sourceCaches, e, i, this.placement.collisionIndex, this.placement.retainedQueryData)), this._flattenAndSortRenderedFeatures(c);
      }, i.prototype.querySourceFeatures = function (e, i) {
        i && i.filter && this._validate(t.validateStyle.filter, "querySourceFeatures.filter", i.filter, null, i);
        var o = this.sourceCaches[e];
        return o ? function (t, e) {
          for (var i = t.getRenderableIds().map(function (e) {
            return t.getTileByID(e);
          }), o = [], r = {}, a = 0; a < i.length; a++) {
            var n = i[a],
                s = n.tileID.canonical.key;
            r[s] || (r[s] = !0, n.querySourceFeatures(o, e));
          }

          return o;
        }(o, i) : [];
      }, i.prototype.addSourceType = function (t, e, o) {
        return i.getSourceType(t) ? o(new Error('A source type called "' + t + '" already exists.')) : (i.setSourceType(t, e), e.workerSourceURL ? void this.dispatcher.broadcast("loadWorkerSource", {
          name: t,
          url: e.workerSourceURL
        }, o) : o(null, null));
      }, i.prototype.getLight = function () {
        return this.light.getLight();
      }, i.prototype.setLight = function (e, i) {
        void 0 === i && (i = {}), this._checkLoaded();
        var o = this.light.getLight(),
            r = !1;

        for (var a in e) {
          if (!t.deepEqual(e[a], o[a])) {
            r = !0;
            break;
          }
        }

        if (r) {
          var n = {
            now: t.browser.now(),
            transition: t.extend({
              duration: 300,
              delay: 0
            }, this.stylesheet.transition)
          };
          this.light.setLight(e, i), this.light.updateTransitions(n);
        }
      }, i.prototype._validate = function (e, i, o, r, a) {
        return void 0 === a && (a = {}), (!a || !1 !== a.validate) && Re(this, e.call(t.validateStyle, t.extend({
          key: i,
          style: this.serialize(),
          value: o,
          styleSpec: t.styleSpec
        }, r)));
      }, i.prototype._remove = function () {
        for (var e in this._request && (this._request.cancel(), this._request = null), this._spriteRequest && (this._spriteRequest.cancel(), this._spriteRequest = null), t.evented.off("pluginAvailable", this._rtlTextPluginCallback), this.sourceCaches) {
          this.sourceCaches[e].clearTiles();
        }

        this.dispatcher.remove();
      }, i.prototype._clearSource = function (t) {
        this.sourceCaches[t].clearTiles();
      }, i.prototype._reloadSource = function (t) {
        this.sourceCaches[t].resume(), this.sourceCaches[t].reload();
      }, i.prototype._updateSources = function (t) {
        for (var e in this.sourceCaches) {
          this.sourceCaches[e].update(t);
        }
      }, i.prototype._generateCollisionBoxes = function () {
        for (var t in this.sourceCaches) {
          this._reloadSource(t);
        }
      }, i.prototype._updatePlacement = function (e, i, o, r) {
        for (var a = !1, n = !1, s = {}, l = 0, c = this._order; l < c.length; l += 1) {
          var u = c[l],
              h = this._layers[u];

          if ("symbol" === h.type) {
            if (!s[h.source]) {
              var p = this.sourceCaches[h.source];
              s[h.source] = p.getRenderableIds(!0).map(function (t) {
                return p.getTileByID(t);
              }).sort(function (t, e) {
                return e.tileID.overscaledZ - t.tileID.overscaledZ || (t.tileID.isLessThan(e.tileID) ? -1 : 1);
              });
            }

            var d = this.crossTileSymbolIndex.addLayer(h, s[h.source], e.center.lng);
            a = a || d;
          }
        }

        this.crossTileSymbolIndex.pruneUnusedLayers(this._order);

        var _ = this._layerOrderChanged || 0 === o;

        if ((_ || !this.pauseablePlacement || this.pauseablePlacement.isDone() && !this.placement.stillRecent(t.browser.now())) && (this.pauseablePlacement = new Se(e, this._order, _, i, o, r, this.placement), this._layerOrderChanged = !1), this.pauseablePlacement.isDone() ? this.placement.setStale() : (this.pauseablePlacement.continuePlacement(this._order, this._layers, s), this.pauseablePlacement.isDone() && (this.placement = this.pauseablePlacement.commit(t.browser.now()), n = !0), a && this.pauseablePlacement.placement.setStale()), n || a) for (var f = 0, m = this._order; f < m.length; f += 1) {
          var g = m[f],
              v = this._layers[g];
          "symbol" === v.type && this.placement.updateLayerOpacities(v, s[v.source]);
        }
        return !this.pauseablePlacement.isDone() || this.placement.hasTransitions(t.browser.now());
      }, i.prototype._releaseSymbolFadeTiles = function () {
        for (var t in this.sourceCaches) {
          this.sourceCaches[t].releaseSymbolFadeTiles();
        }
      }, i.prototype.getImages = function (t, e, i) {
        this.imageManager.getImages(e.icons, i);
      }, i.prototype.getGlyphs = function (t, e, i) {
        this.glyphManager.getGlyphs(e.stacks, i);
      }, i.prototype.getResource = function (e, i, o) {
        return t.makeRequest(i, o);
      }, i;
    }(t.Evented);

    Be.getSourceType = function (t) {
      return R[t];
    }, Be.setSourceType = function (t, e) {
      R[t] = e;
    }, Be.registerForPluginAvailability = t.registerForPluginAvailability;
    var Oe = t.createLayout([{
      name: "a_pos",
      type: "Int16",
      components: 2
    }]),
        Fe = ci("#ifdef GL_ES\nprecision mediump float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif", "#ifdef GL_ES\nprecision highp float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif\nvec2 unpack_float(const float packedValue) {int packedIntValue=int(packedValue);int v0=packedIntValue/256;return vec2(v0,packedIntValue-v0*256);}vec2 unpack_opacity(const float packedOpacity) {int intOpacity=int(packedOpacity)/2;return vec2(float(intOpacity)/127.0,mod(packedOpacity,2.0));}vec4 decode_color(const vec2 encodedColor) {return vec4(unpack_float(encodedColor[0])/255.0,unpack_float(encodedColor[1])/255.0\n);}float unpack_mix_vec2(const vec2 packedValue,const float t) {return mix(packedValue[0],packedValue[1],t);}vec4 unpack_mix_color(const vec4 packedColors,const float t) {vec4 minColor=decode_color(vec2(packedColors[0],packedColors[1]));vec4 maxColor=decode_color(vec2(packedColors[2],packedColors[3]));return mix(minColor,maxColor,t);}vec2 get_pattern_pos(const vec2 pixel_coord_upper,const vec2 pixel_coord_lower,const vec2 pattern_size,const float tile_units_to_pixels,const vec2 pos) {vec2 offset=mod(mod(mod(pixel_coord_upper,pattern_size)*256.0,pattern_size)*256.0+pixel_coord_lower,pattern_size);return (tile_units_to_pixels*pos+offset)/pattern_size;}"),
        Ue = ci("uniform vec4 u_color;uniform float u_opacity;void main() {gl_FragColor=u_color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),
        Ne = ci("uniform vec2 u_pattern_tl_a;uniform vec2 u_pattern_br_a;uniform vec2 u_pattern_tl_b;uniform vec2 u_pattern_br_b;uniform vec2 u_texsize;uniform float u_mix;uniform float u_opacity;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(u_pattern_tl_a/u_texsize,u_pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(u_pattern_tl_b/u_texsize,u_pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_mix)*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_pattern_size_a;uniform vec2 u_pattern_size_b;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_scale_a;uniform float u_scale_b;uniform float u_tile_units_to_pixels;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_a*u_pattern_size_a,u_tile_units_to_pixels,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_b*u_pattern_size_b,u_tile_units_to_pixels,a_pos);}"),
        Ze = ci("varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=v_data.xy;float extrude_length=length(extrude);lowp float antialiasblur=v_data.z;float antialiased_blur=-max(blur,antialiasblur);float opacity_t=smoothstep(0.0,antialiased_blur,extrude_length-1.0);float color_t=stroke_width < 0.01 ? 0.0 : smoothstep(antialiased_blur,0.0,extrude_length-radius/(radius+stroke_width));gl_FragColor=opacity_t*mix(color*opacity,stroke_color*stroke_opacity,color_t);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform bool u_scale_with_map;uniform bool u_pitch_with_map;uniform vec2 u_extrude_scale;uniform lowp float u_device_pixel_ratio;uniform highp float u_camera_to_center_distance;attribute vec2 a_pos;varying vec3 v_data;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvoid main(void) {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=vec2(mod(a_pos,2.0)*2.0-1.0);vec2 circle_center=floor(a_pos*0.5);if (u_pitch_with_map) {vec2 corner_position=circle_center;if (u_scale_with_map) {corner_position+=extrude*(radius+stroke_width)*u_extrude_scale;} else {vec4 projected_center=u_matrix*vec4(circle_center,0,1);corner_position+=extrude*(radius+stroke_width)*u_extrude_scale*(projected_center.w/u_camera_to_center_distance);}gl_Position=u_matrix*vec4(corner_position,0,1);} else {gl_Position=u_matrix*vec4(circle_center,0,1);if (u_scale_with_map) {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*u_camera_to_center_distance;} else {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*gl_Position.w;}}lowp float antialiasblur=1.0/u_device_pixel_ratio/(radius+stroke_width);v_data=vec3(extrude.x,extrude.y,antialiasblur);}"),
        je = ci("void main() {gl_FragColor=vec4(1.0);}", "attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),
        qe = ci("uniform highp float u_intensity;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#define GAUSS_COEF 0.3989422804014327\nvoid main() {\n#pragma mapbox: initialize highp float weight\nfloat d=-0.5*3.0*3.0*dot(v_extrude,v_extrude);float val=weight*u_intensity*GAUSS_COEF*exp(d);gl_FragColor=vec4(val,1.0,1.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform float u_extrude_scale;uniform float u_opacity;uniform float u_intensity;attribute vec2 a_pos;varying vec2 v_extrude;\n#pragma mapbox: define highp float weight\n#pragma mapbox: define mediump float radius\nconst highp float ZERO=1.0/255.0/16.0;\n#define GAUSS_COEF 0.3989422804014327\nvoid main(void) {\n#pragma mapbox: initialize highp float weight\n#pragma mapbox: initialize mediump float radius\nvec2 unscaled_extrude=vec2(mod(a_pos,2.0)*2.0-1.0);float S=sqrt(-2.0*log(ZERO/weight/u_intensity/GAUSS_COEF))/3.0;v_extrude=S*unscaled_extrude;vec2 extrude=v_extrude*radius*u_extrude_scale;vec4 pos=vec4(floor(a_pos*0.5)+extrude,0,1);gl_Position=u_matrix*pos;}"),
        Ve = ci("uniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform float u_opacity;varying vec2 v_pos;void main() {float t=texture2D(u_image,v_pos).r;vec4 color=texture2D(u_color_ramp,vec2(t,0.5));gl_FragColor=color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(0.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_world;attribute vec2 a_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos*u_world,0,1);v_pos.x=a_pos.x;v_pos.y=1.0-a_pos.y;}"),
        Ge = ci("varying float v_placed;varying float v_notUsed;void main() {float alpha=0.5;gl_FragColor=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {gl_FragColor=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {gl_FragColor*=.1;}}", "attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;attribute vec2 a_shift;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);gl_Position.xy+=(a_extrude+a_shift)*u_extrude_scale*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;}"),
        We = ci("uniform float u_overscale_factor;varying float v_placed;varying float v_notUsed;varying float v_radius;varying vec2 v_extrude;varying vec2 v_extrude_scale;void main() {float alpha=0.5;vec4 color=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {color=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {color*=.2;}float extrude_scale_length=length(v_extrude_scale);float extrude_length=length(v_extrude)*extrude_scale_length;float stroke_width=15.0*extrude_scale_length/u_overscale_factor;float radius=v_radius*extrude_scale_length;float distance_to_edge=abs(extrude_length-radius);float opacity_t=smoothstep(-stroke_width,0.0,-distance_to_edge);gl_FragColor=opacity_t*color;}", "attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;varying float v_radius;varying vec2 v_extrude;varying vec2 v_extrude_scale;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);highp float padding_factor=1.2;gl_Position.xy+=a_extrude*u_extrude_scale*padding_factor*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;v_radius=abs(a_extrude.y);v_extrude=a_extrude*padding_factor;v_extrude_scale=u_extrude_scale*u_camera_to_center_distance*collision_perspective_ratio;}"),
        Xe = ci("uniform highp vec4 u_color;void main() {gl_FragColor=u_color;}", "attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),
        He = ci("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_FragColor=color*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "attribute vec2 a_pos;uniform mat4 u_matrix;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);}"),
        Ke = ci("varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=outline_color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "attribute vec2 a_pos;uniform mat4 u_matrix;uniform vec2 u_world;varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),
        Ye = ci("uniform vec2 u_texsize;uniform sampler2D u_image;uniform float u_fade;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);float dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=mix(color1,color2,u_fade)*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_world;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec4 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;gl_Position=u_matrix*vec4(a_pos,0,1);vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,a_pos);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),
        Je = ci("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_fade)*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec4 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileZoomRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileZoomRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileZoomRatio,a_pos);}"),
        Qe = ci("varying vec4 v_color;void main() {gl_FragColor=v_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;uniform float u_vertical_gradient;uniform lowp float u_opacity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec4 v_color;\n#pragma mapbox: define highp float base\n#pragma mapbox: define highp float height\n#pragma mapbox: define highp vec4 color\nvoid main() {\n#pragma mapbox: initialize highp float base\n#pragma mapbox: initialize highp float height\n#pragma mapbox: initialize highp vec4 color\nvec3 normal=a_normal_ed.xyz;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);gl_Position=u_matrix*vec4(a_pos,t > 0.0 ? height : base,1);float colorvalue=color.r*0.2126+color.g*0.7152+color.b*0.0722;v_color=vec4(0.0,0.0,0.0,1.0);vec4 ambientlight=vec4(0.03,0.03,0.03,1.0);color+=ambientlight;float directional=clamp(dot(normal/16384.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((1.0-colorvalue+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_color.r+=clamp(color.r*directional*u_lightcolor.r,mix(0.0,0.3,1.0-u_lightcolor.r),1.0);v_color.g+=clamp(color.g*directional*u_lightcolor.g,mix(0.0,0.3,1.0-u_lightcolor.g),1.0);v_color.b+=clamp(color.b*directional*u_lightcolor.b,mix(0.0,0.3,1.0-u_lightcolor.b),1.0);v_color*=u_opacity;}"),
        $e = ci("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);vec4 mixedColor=mix(color1,color2,u_fade);gl_FragColor=mixedColor*v_lighting;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_height_factor;uniform vec4 u_scale;uniform float u_vertical_gradient;uniform lowp float u_opacity;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec3 normal=a_normal_ed.xyz;float edgedistance=a_normal_ed.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);float z=t > 0.0 ? height : base;gl_Position=u_matrix*vec4(a_pos,z,1);vec2 pos=normal.x==1.0 && normal.y==0.0 && normal.z==16384.0\n? a_pos\n: vec2(edgedistance,z*u_height_factor);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,pos);v_lighting=vec4(0.0,0.0,0.0,1.0);float directional=clamp(dot(normal/16383.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((0.5+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_lighting.rgb+=clamp(directional*u_lightcolor,mix(vec3(0.0),vec3(0.3),1.0-u_lightcolor),vec3(1.0));v_lighting*=u_opacity;}"),
        ti = ci("#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_dimension;uniform float u_zoom;uniform float u_maxzoom;float getElevation(vec2 coord,float bias) {vec4 data=texture2D(u_image,coord)*255.0;return (data.r+data.g*256.0+data.b*256.0*256.0)/4.0;}void main() {vec2 epsilon=1.0/u_dimension;float a=getElevation(v_pos+vec2(-epsilon.x,-epsilon.y),0.0);float b=getElevation(v_pos+vec2(0,-epsilon.y),0.0);float c=getElevation(v_pos+vec2(epsilon.x,-epsilon.y),0.0);float d=getElevation(v_pos+vec2(-epsilon.x,0),0.0);float e=getElevation(v_pos,0.0);float f=getElevation(v_pos+vec2(epsilon.x,0),0.0);float g=getElevation(v_pos+vec2(-epsilon.x,epsilon.y),0.0);float h=getElevation(v_pos+vec2(0,epsilon.y),0.0);float i=getElevation(v_pos+vec2(epsilon.x,epsilon.y),0.0);float exaggeration=u_zoom < 2.0 ? 0.4 : u_zoom < 4.5 ? 0.35 : 0.3;vec2 deriv=vec2((c+f+f+i)-(a+d+d+g),(g+h+h+i)-(a+b+b+c))/ pow(2.0,(u_zoom-u_maxzoom)*exaggeration+19.2562-u_zoom);gl_FragColor=clamp(vec4(deriv.x/2.0+0.5,deriv.y/2.0+0.5,1.0,1.0),0.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_dimension;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);highp vec2 epsilon=1.0/u_dimension;float scale=(u_dimension.x-2.0)/u_dimension.x;v_pos=(a_texture_pos/8192.0)*scale+epsilon;}"),
        ei = ci("uniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_latrange;uniform vec2 u_light;uniform vec4 u_shadow;uniform vec4 u_highlight;uniform vec4 u_accent;\n#define PI 3.141592653589793\nvoid main() {vec4 pixel=texture2D(u_image,v_pos);vec2 deriv=((pixel.rg*2.0)-1.0);float scaleFactor=cos(radians((u_latrange[0]-u_latrange[1])*(1.0-v_pos.y)+u_latrange[1]));float slope=atan(1.25*length(deriv)/scaleFactor);float aspect=deriv.x !=0.0 ? atan(deriv.y,-deriv.x) : PI/2.0*(deriv.y > 0.0 ? 1.0 :-1.0);float intensity=u_light.x;float azimuth=u_light.y+PI;float base=1.875-intensity*1.75;float maxValue=0.5*PI;float scaledSlope=intensity !=0.5 ? ((pow(base,slope)-1.0)/(pow(base,maxValue)-1.0))*maxValue : slope;float accent=cos(scaledSlope);vec4 accent_color=(1.0-accent)*u_accent*clamp(intensity*2.0,0.0,1.0);float shade=abs(mod((aspect+azimuth)/PI+0.5,2.0)-1.0);vec4 shade_color=mix(u_shadow,u_highlight,shade)*sin(scaledSlope)*clamp(intensity*2.0,0.0,1.0);gl_FragColor=accent_color*(1.0-shade_color.a)+shade_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos=a_texture_pos/8192.0;}"),
        ii = ci("uniform lowp float u_device_pixel_ratio;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_units_to_pixels;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_linesofar;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),
        oi = ci("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;varying highp float v_lineprogress;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);vec4 color=texture2D(u_image,vec2(v_lineprogress,0.5));gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "\n#define MAX_LINE_DISTANCE 32767.0\n#define scale 0.015873016\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_lineprogress;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_lineprogress=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0/MAX_LINE_DISTANCE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),
        ri = ci("uniform lowp float u_device_pixel_ratio;uniform vec2 u_texsize;uniform float u_fade;uniform mediump vec4 u_scale;uniform sampler2D u_image;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileZoomRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);vec2 pattern_size_a=vec2(display_size_a.x*fromScale/tileZoomRatio,display_size_a.y);vec2 pattern_size_b=vec2(display_size_b.x*toScale/tileZoomRatio,display_size_b.y);float dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float x_a=mod(v_linesofar/pattern_size_a.x,1.0);float x_b=mod(v_linesofar/pattern_size_b.x,1.0);float y_a=0.5+(v_normal.y*clamp(v_width2.s,0.0,(pattern_size_a.y+2.0)/2.0)/pattern_size_a.y);float y_b=0.5+(v_normal.y*clamp(v_width2.s,0.0,(pattern_size_b.y+2.0)/2.0)/pattern_size_b.y);vec2 pos_a=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,vec2(x_a,y_a));vec2 pos_b=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,vec2(x_b,y_b));vec4 color=mix(texture2D(u_image,pos_a),texture2D(u_image,pos_b),u_fade);gl_FragColor=color*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform vec2 u_units_to_pixels;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_linesofar=a_linesofar;v_width2=vec2(outset,inset);}"),
        ai = ci("uniform lowp float u_device_pixel_ratio;uniform sampler2D u_image;uniform float u_sdfgamma;uniform float u_mix;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/u_device_pixel_ratio)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float sdfdist_a=texture2D(u_image,v_tex_a).a;float sdfdist_b=texture2D(u_image,v_tex_b).a;float sdfdist=mix(sdfdist_a,sdfdist_b,u_mix);alpha*=smoothstep(0.5-u_sdfgamma/floorwidth,0.5+u_sdfgamma/floorwidth,sdfdist);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\nattribute vec2 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform lowp float u_device_pixel_ratio;uniform vec2 u_patternscale_a;uniform float u_tex_y_a;uniform vec2 u_patternscale_b;uniform float u_tex_y_b;uniform vec2 u_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat ANTIALIASING=1.0/u_device_pixel_ratio/2.0;vec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=floor(a_pos_normal*0.5);mediump vec2 normal=a_pos_normal-2.0*pos;normal.y=normal.y*2.0-1.0;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_tex_a=vec2(a_linesofar*u_patternscale_a.x/floorwidth,normal.y*u_patternscale_a.y+u_tex_y_a);v_tex_b=vec2(a_linesofar*u_patternscale_b.x/floorwidth,normal.y*u_patternscale_b.y+u_tex_y_b);v_width2=vec2(outset,inset);}"),
        ni = ci("uniform float u_fade_t;uniform float u_opacity;uniform sampler2D u_image0;uniform sampler2D u_image1;varying vec2 v_pos0;varying vec2 v_pos1;uniform float u_brightness_low;uniform float u_brightness_high;uniform float u_saturation_factor;uniform float u_contrast_factor;uniform vec3 u_spin_weights;void main() {vec4 color0=texture2D(u_image0,v_pos0);vec4 color1=texture2D(u_image1,v_pos1);if (color0.a > 0.0) {color0.rgb=color0.rgb/color0.a;}if (color1.a > 0.0) {color1.rgb=color1.rgb/color1.a;}vec4 color=mix(color0,color1,u_fade_t);color.a*=u_opacity;vec3 rgb=color.rgb;rgb=vec3(dot(rgb,u_spin_weights.xyz),dot(rgb,u_spin_weights.zxy),dot(rgb,u_spin_weights.yzx));float average=(color.r+color.g+color.b)/3.0;rgb+=(average-rgb)*u_saturation_factor;rgb=(rgb-0.5)*u_contrast_factor+0.5;vec3 u_high_vec=vec3(u_brightness_low,u_brightness_low,u_brightness_low);vec3 u_low_vec=vec3(u_brightness_high,u_brightness_high,u_brightness_high);gl_FragColor=vec4(mix(u_high_vec,u_low_vec,rgb)*color.a,color.a);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "uniform mat4 u_matrix;uniform vec2 u_tl_parent;uniform float u_scale_parent;uniform float u_buffer_scale;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos0;varying vec2 v_pos1;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos0=(((a_texture_pos/8192.0)-0.5)/u_buffer_scale )+0.5;v_pos1=(v_pos0*u_scale_parent)+u_tl_parent;}"),
        si = ci("uniform sampler2D u_texture;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nlowp float alpha=opacity*v_fade_opacity;gl_FragColor=texture2D(u_texture,v_tex)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform highp float u_camera_to_center_distance;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform float u_fade_change;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform vec2 u_texsize;varying vec2 v_tex;varying float v_fade_opacity;\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size[0],a_size[1],u_size_t)/256.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size[0]/256.0;} else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {size=u_size;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);v_tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;v_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));}"),
        li = ci("#define SDF_PX 8.0\nuniform bool u_is_halo;uniform sampler2D u_texture;uniform highp float u_gamma_scale;uniform lowp float u_device_pixel_ratio;uniform bool u_is_text;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nfloat EDGE_GAMMA=0.105/u_device_pixel_ratio;vec2 tex=v_data0.xy;float gamma_scale=v_data1.x;float size=v_data1.y;float fade_opacity=v_data1[2];float fontScale=u_is_text ? size/24.0 : size;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}", "const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;varying vec2 v_data0;varying vec3 v_data1;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nvoid main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size[0],a_size[1],u_size_t)/256.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size[0]/256.0;} else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {size=u_size;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);float gamma_scale=gl_Position.w;vec2 tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0=vec2(tex.x,tex.y);v_data1=vec3(gamma_scale,size,interpolated_fade_opacity);}");

    function ci(t, e) {
      var i = /#pragma mapbox: ([\w]+) ([\w]+) ([\w]+) ([\w]+)/g,
          o = {};
      return {
        fragmentSource: t = t.replace(i, function (t, e, i, r, a) {
          return o[a] = !0, "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + a + "\nvarying " + i + " " + r + " " + a + ";\n#else\nuniform " + i + " " + r + " u_" + a + ";\n#endif\n" : "\n#ifdef HAS_UNIFORM_u_" + a + "\n    " + i + " " + r + " " + a + " = u_" + a + ";\n#endif\n";
        }),
        vertexSource: e = e.replace(i, function (t, e, i, r, a) {
          var n = "float" === r ? "vec2" : "vec4",
              s = a.match(/color/) ? "color" : n;
          return o[a] ? "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + a + "\nuniform lowp float u_" + a + "_t;\nattribute " + i + " " + n + " a_" + a + ";\nvarying " + i + " " + r + " " + a + ";\n#else\nuniform " + i + " " + r + " u_" + a + ";\n#endif\n" : "vec4" === s ? "\n#ifndef HAS_UNIFORM_u_" + a + "\n    " + a + " = a_" + a + ";\n#else\n    " + i + " " + r + " " + a + " = u_" + a + ";\n#endif\n" : "\n#ifndef HAS_UNIFORM_u_" + a + "\n    " + a + " = unpack_mix_" + s + "(a_" + a + ", u_" + a + "_t);\n#else\n    " + i + " " + r + " " + a + " = u_" + a + ";\n#endif\n" : "define" === e ? "\n#ifndef HAS_UNIFORM_u_" + a + "\nuniform lowp float u_" + a + "_t;\nattribute " + i + " " + n + " a_" + a + ";\n#else\nuniform " + i + " " + r + " u_" + a + ";\n#endif\n" : "vec4" === s ? "\n#ifndef HAS_UNIFORM_u_" + a + "\n    " + i + " " + r + " " + a + " = a_" + a + ";\n#else\n    " + i + " " + r + " " + a + " = u_" + a + ";\n#endif\n" : "\n#ifndef HAS_UNIFORM_u_" + a + "\n    " + i + " " + r + " " + a + " = unpack_mix_" + s + "(a_" + a + ", u_" + a + "_t);\n#else\n    " + i + " " + r + " " + a + " = u_" + a + ";\n#endif\n";
        })
      };
    }

    var ui = Object.freeze({
      prelude: Fe,
      background: Ue,
      backgroundPattern: Ne,
      circle: Ze,
      clippingMask: je,
      heatmap: qe,
      heatmapTexture: Ve,
      collisionBox: Ge,
      collisionCircle: We,
      debug: Xe,
      fill: He,
      fillOutline: Ke,
      fillOutlinePattern: Ye,
      fillPattern: Je,
      fillExtrusion: Qe,
      fillExtrusionPattern: $e,
      hillshadePrepare: ti,
      hillshade: ei,
      line: ii,
      lineGradient: oi,
      linePattern: ri,
      lineSDF: ai,
      raster: ni,
      symbolIcon: si,
      symbolSDF: li
    }),
        hi = function () {
      this.boundProgram = null, this.boundLayoutVertexBuffer = null, this.boundPaintVertexBuffers = [], this.boundIndexBuffer = null, this.boundVertexOffset = null, this.boundDynamicVertexBuffer = null, this.vao = null;
    };

    hi.prototype.bind = function (t, e, i, o, r, a, n, s) {
      this.context = t;

      for (var l = this.boundPaintVertexBuffers.length !== o.length, c = 0; !l && c < o.length; c++) {
        this.boundPaintVertexBuffers[c] !== o[c] && (l = !0);
      }

      var u = !this.vao || this.boundProgram !== e || this.boundLayoutVertexBuffer !== i || l || this.boundIndexBuffer !== r || this.boundVertexOffset !== a || this.boundDynamicVertexBuffer !== n || this.boundDynamicVertexBuffer2 !== s;
      !t.extVertexArrayObject || u ? this.freshBind(e, i, o, r, a, n, s) : (t.bindVertexArrayOES.set(this.vao), n && n.bind(), r && r.dynamicDraw && r.bind(), s && s.bind());
    }, hi.prototype.freshBind = function (t, e, i, o, r, a, n) {
      var s,
          l = t.numAttributes,
          c = this.context,
          u = c.gl;
      if (c.extVertexArrayObject) this.vao && this.destroy(), this.vao = c.extVertexArrayObject.createVertexArrayOES(), c.bindVertexArrayOES.set(this.vao), s = 0, this.boundProgram = t, this.boundLayoutVertexBuffer = e, this.boundPaintVertexBuffers = i, this.boundIndexBuffer = o, this.boundVertexOffset = r, this.boundDynamicVertexBuffer = a, this.boundDynamicVertexBuffer2 = n;else {
        s = c.currentNumAttributes || 0;

        for (var h = l; h < s; h++) {
          u.disableVertexAttribArray(h);
        }
      }
      e.enableAttributes(u, t);

      for (var p = 0, d = i; p < d.length; p += 1) {
        d[p].enableAttributes(u, t);
      }

      a && a.enableAttributes(u, t), n && n.enableAttributes(u, t), e.bind(), e.setVertexAttribPointers(u, t, r);

      for (var _ = 0, f = i; _ < f.length; _ += 1) {
        var m = f[_];
        m.bind(), m.setVertexAttribPointers(u, t, r);
      }

      a && (a.bind(), a.setVertexAttribPointers(u, t, r)), o && o.bind(), n && (n.bind(), n.setVertexAttribPointers(u, t, r)), c.currentNumAttributes = l;
    }, hi.prototype.destroy = function () {
      this.vao && (this.context.extVertexArrayObject.deleteVertexArrayOES(this.vao), this.vao = null);
    };

    var pi = function (t, e, i, o, r) {
      var a = t.gl;
      this.program = a.createProgram();
      var n = i.defines();
      r && n.push("#define OVERDRAW_INSPECTOR;");
      var s = n.concat(Fe.fragmentSource, e.fragmentSource).join("\n"),
          l = n.concat(Fe.vertexSource, e.vertexSource).join("\n"),
          c = a.createShader(a.FRAGMENT_SHADER);
      a.shaderSource(c, s), a.compileShader(c), a.attachShader(this.program, c);
      var u = a.createShader(a.VERTEX_SHADER);
      a.shaderSource(u, l), a.compileShader(u), a.attachShader(this.program, u);

      for (var h = i.layoutAttributes || [], p = 0; p < h.length; p++) {
        a.bindAttribLocation(this.program, p, h[p].name);
      }

      a.linkProgram(this.program), this.numAttributes = a.getProgramParameter(this.program, a.ACTIVE_ATTRIBUTES), this.attributes = {};

      for (var d = {}, _ = 0; _ < this.numAttributes; _++) {
        var f = a.getActiveAttrib(this.program, _);
        f && (this.attributes[f.name] = a.getAttribLocation(this.program, f.name));
      }

      for (var m = a.getProgramParameter(this.program, a.ACTIVE_UNIFORMS), g = 0; g < m; g++) {
        var v = a.getActiveUniform(this.program, g);
        v && (d[v.name] = a.getUniformLocation(this.program, v.name));
      }

      this.fixedUniforms = o(t, d), this.binderUniforms = i.getUniforms(t, d);
    };

    function di(e, i, o) {
      var r = 1 / ce(o, 1, i.transform.tileZoom),
          a = Math.pow(2, o.tileID.overscaledZ),
          n = o.tileSize * Math.pow(2, i.transform.tileZoom) / a,
          s = n * (o.tileID.canonical.x + o.tileID.wrap * a),
          l = n * o.tileID.canonical.y;
      return {
        u_image: 0,
        u_texsize: o.imageAtlasTexture.size,
        u_scale: [t.browser.devicePixelRatio, r, e.fromScale, e.toScale],
        u_fade: e.t,
        u_pixel_coord_upper: [s >> 16, l >> 16],
        u_pixel_coord_lower: [65535 & s, 65535 & l]
      };
    }

    pi.prototype.draw = function (t, e, i, o, r, a, n, s, l, c, u, h, p, d, _, f) {
      var m,
          g = t.gl;

      for (var v in t.program.set(this.program), t.setDepthMode(i), t.setStencilMode(o), t.setColorMode(r), t.setCullFace(a), this.fixedUniforms) {
        this.fixedUniforms[v].set(n[v]);
      }

      d && d.setUniforms(t, this.binderUniforms, h, {
        zoom: p
      });

      for (var y = (m = {}, m[g.LINES] = 2, m[g.TRIANGLES] = 3, m[g.LINE_STRIP] = 1, m)[e], x = 0, b = u.get(); x < b.length; x += 1) {
        var w = b[x],
            E = w.vaos || (w.vaos = {});
        (E[s] || (E[s] = new hi())).bind(t, this, l, d ? d.getPaintVertexBuffers() : [], c, w.vertexOffset, _, f), g.drawElements(e, w.primitiveLength * y, g.UNSIGNED_SHORT, w.primitiveOffset * y * 2);
      }
    };

    var _i = function (e, i, o, r) {
      var a = i.style.light,
          n = a.properties.get("position"),
          s = [n.x, n.y, n.z],
          l = t.create$1();
      "viewport" === a.properties.get("anchor") && t.fromRotation(l, -i.transform.angle), t.transformMat3(s, s, l);
      var c = a.properties.get("color");
      return {
        u_matrix: e,
        u_lightpos: s,
        u_lightintensity: a.properties.get("intensity"),
        u_lightcolor: [c.r, c.g, c.b],
        u_vertical_gradient: +o,
        u_opacity: r
      };
    },
        fi = function (e, i, o, r, a, n, s) {
      return t.extend(_i(e, i, o, r), di(n, i, s), {
        u_height_factor: -Math.pow(2, a.overscaledZ) / s.tileSize / 8
      });
    },
        mi = function (t) {
      return {
        u_matrix: t
      };
    },
        gi = function (e, i, o, r) {
      return t.extend(mi(e), di(o, i, r));
    },
        vi = function (t, e) {
      return {
        u_matrix: t,
        u_world: e
      };
    },
        yi = function (e, i, o, r, a) {
      return t.extend(gi(e, i, o, r), {
        u_world: a
      });
    },
        xi = function (e, i, o, r) {
      var a,
          n,
          s = e.transform;

      if ("map" === r.paint.get("circle-pitch-alignment")) {
        var l = ce(o, 1, s.zoom);
        a = !0, n = [l, l];
      } else a = !1, n = s.pixelsToGLUnits;

      return {
        u_camera_to_center_distance: s.cameraToCenterDistance,
        u_scale_with_map: +("map" === r.paint.get("circle-pitch-scale")),
        u_matrix: e.translatePosMatrix(i.posMatrix, o, r.paint.get("circle-translate"), r.paint.get("circle-translate-anchor")),
        u_pitch_with_map: +a,
        u_device_pixel_ratio: t.browser.devicePixelRatio,
        u_extrude_scale: n
      };
    },
        bi = function (e, i) {
      return {
        u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
        u_camera_to_center_distance: new t.Uniform1f(e, i.u_camera_to_center_distance),
        u_pixels_to_tile_units: new t.Uniform1f(e, i.u_pixels_to_tile_units),
        u_extrude_scale: new t.Uniform2f(e, i.u_extrude_scale),
        u_overscale_factor: new t.Uniform1f(e, i.u_overscale_factor)
      };
    },
        wi = function (t, e, i) {
      var o = ce(i, 1, e.zoom),
          r = Math.pow(2, e.zoom - i.tileID.overscaledZ),
          a = i.tileID.overscaleFactor();
      return {
        u_matrix: t,
        u_camera_to_center_distance: e.cameraToCenterDistance,
        u_pixels_to_tile_units: o,
        u_extrude_scale: [e.pixelsToGLUnits[0] / (o * r), e.pixelsToGLUnits[1] / (o * r)],
        u_overscale_factor: a
      };
    },
        Ei = function (t, e) {
      return {
        u_matrix: t,
        u_color: e
      };
    },
        Ti = function (t) {
      return {
        u_matrix: t
      };
    },
        Ii = function (t, e, i, o) {
      return {
        u_matrix: t,
        u_extrude_scale: ce(e, 1, i),
        u_intensity: o
      };
    },
        Ci = function (e, i, o, r) {
      var a = t.create();
      t.ortho(a, 0, e.width, e.height, 0, 0, 1);
      var n = e.context.gl;
      return {
        u_matrix: a,
        u_world: [n.drawingBufferWidth, n.drawingBufferHeight],
        u_image: o,
        u_color_ramp: r,
        u_opacity: i.paint.get("heatmap-opacity")
      };
    },
        Si = function (t, e, i) {
      var o = i.paint.get("hillshade-shadow-color"),
          r = i.paint.get("hillshade-highlight-color"),
          a = i.paint.get("hillshade-accent-color"),
          n = i.paint.get("hillshade-illumination-direction") * (Math.PI / 180);
      "viewport" === i.paint.get("hillshade-illumination-anchor") && (n -= t.transform.angle);
      var s = !t.options.moving;
      return {
        u_matrix: t.transform.calculatePosMatrix(e.tileID.toUnwrapped(), s),
        u_image: 0,
        u_latrange: zi(t, e.tileID),
        u_light: [i.paint.get("hillshade-exaggeration"), n],
        u_shadow: o,
        u_highlight: r,
        u_accent: a
      };
    },
        Pi = function (e, i) {
      var o = e.dem.stride,
          r = t.create();
      return t.ortho(r, 0, t.EXTENT, -t.EXTENT, 0, 0, 1), t.translate(r, r, [0, -t.EXTENT, 0]), {
        u_matrix: r,
        u_image: 1,
        u_dimension: [o, o],
        u_zoom: e.tileID.overscaledZ,
        u_maxzoom: i
      };
    };

    function zi(e, i) {
      var o = Math.pow(2, i.canonical.z),
          r = i.canonical.y;
      return [new t.MercatorCoordinate(0, r / o).toLngLat().lat, new t.MercatorCoordinate(0, (r + 1) / o).toLngLat().lat];
    }

    var Li = function (e, i, o) {
      var r = e.transform;
      return {
        u_matrix: ki(e, i, o),
        u_ratio: 1 / ce(i, 1, r.zoom),
        u_device_pixel_ratio: t.browser.devicePixelRatio,
        u_units_to_pixels: [1 / r.pixelsToGLUnits[0], 1 / r.pixelsToGLUnits[1]]
      };
    },
        Di = function (e, i, o) {
      return t.extend(Li(e, i, o), {
        u_image: 0
      });
    },
        Mi = function (e, i, o, r) {
      var a = e.transform,
          n = Ai(i, a);
      return {
        u_matrix: ki(e, i, o),
        u_texsize: i.imageAtlasTexture.size,
        u_ratio: 1 / ce(i, 1, a.zoom),
        u_device_pixel_ratio: t.browser.devicePixelRatio,
        u_image: 0,
        u_scale: [t.browser.devicePixelRatio, n, r.fromScale, r.toScale],
        u_fade: r.t,
        u_units_to_pixels: [1 / a.pixelsToGLUnits[0], 1 / a.pixelsToGLUnits[1]]
      };
    },
        Ri = function (e, i, o, r, a) {
      var n = e.transform,
          s = e.lineAtlas,
          l = Ai(i, n),
          c = "round" === o.layout.get("line-cap"),
          u = s.getDash(r.from, c),
          h = s.getDash(r.to, c),
          p = u.width * a.fromScale,
          d = h.width * a.toScale;
      return t.extend(Li(e, i, o), {
        u_patternscale_a: [l / p, -u.height / 2],
        u_patternscale_b: [l / d, -h.height / 2],
        u_sdfgamma: s.width / (256 * Math.min(p, d) * t.browser.devicePixelRatio) / 2,
        u_image: 0,
        u_tex_y_a: u.y,
        u_tex_y_b: h.y,
        u_mix: a.t
      });
    };

    function Ai(t, e) {
      return 1 / ce(t, 1, e.tileZoom);
    }

    function ki(t, e, i) {
      return t.translatePosMatrix(e.tileID.posMatrix, e, i.paint.get("line-translate"), i.paint.get("line-translate-anchor"));
    }

    var Bi = function (t, e, i, o, r) {
      return {
        u_matrix: t,
        u_tl_parent: e,
        u_scale_parent: i,
        u_buffer_scale: 1,
        u_fade_t: o.mix,
        u_opacity: o.opacity * r.paint.get("raster-opacity"),
        u_image0: 0,
        u_image1: 1,
        u_brightness_low: r.paint.get("raster-brightness-min"),
        u_brightness_high: r.paint.get("raster-brightness-max"),
        u_saturation_factor: (n = r.paint.get("raster-saturation"), n > 0 ? 1 - 1 / (1.001 - n) : -n),
        u_contrast_factor: (a = r.paint.get("raster-contrast"), a > 0 ? 1 / (1 - a) : 1 + a),
        u_spin_weights: Oi(r.paint.get("raster-hue-rotate"))
      };
      var a, n;
    };

    function Oi(t) {
      t *= Math.PI / 180;
      var e = Math.sin(t),
          i = Math.cos(t);
      return [(2 * i + 1) / 3, (-Math.sqrt(3) * e - i + 1) / 3, (Math.sqrt(3) * e - i + 1) / 3];
    }

    var Fi = function (t, e, i, o, r, a, n, s, l, c) {
      var u = r.transform;
      return {
        u_is_size_zoom_constant: +("constant" === t || "source" === t),
        u_is_size_feature_constant: +("constant" === t || "camera" === t),
        u_size_t: e ? e.uSizeT : 0,
        u_size: e ? e.uSize : 0,
        u_camera_to_center_distance: u.cameraToCenterDistance,
        u_pitch: u.pitch / 360 * 2 * Math.PI,
        u_rotate_symbol: +i,
        u_aspect_ratio: u.width / u.height,
        u_fade_change: r.options.fadeDuration ? r.symbolFadeChange : 1,
        u_matrix: a,
        u_label_plane_matrix: n,
        u_coord_matrix: s,
        u_is_text: +l,
        u_pitch_with_map: +o,
        u_texsize: c,
        u_texture: 0
      };
    },
        Ui = function (e, i, o, r, a, n, s, l, c, u, h) {
      var p = a.transform;
      return t.extend(Fi(e, i, o, r, a, n, s, l, c, u), {
        u_gamma_scale: r ? Math.cos(p._pitch) * p.cameraToCenterDistance : 1,
        u_device_pixel_ratio: t.browser.devicePixelRatio,
        u_is_halo: +h
      });
    },
        Ni = function (t, e, i) {
      return {
        u_matrix: t,
        u_opacity: e,
        u_color: i
      };
    },
        Zi = function (e, i, o, r, a, n) {
      return t.extend(function (t, e, i, o) {
        var r = i.imageManager.getPattern(t.from),
            a = i.imageManager.getPattern(t.to),
            n = i.imageManager.getPixelSize(),
            s = n.width,
            l = n.height,
            c = Math.pow(2, o.tileID.overscaledZ),
            u = o.tileSize * Math.pow(2, i.transform.tileZoom) / c,
            h = u * (o.tileID.canonical.x + o.tileID.wrap * c),
            p = u * o.tileID.canonical.y;
        return {
          u_image: 0,
          u_pattern_tl_a: r.tl,
          u_pattern_br_a: r.br,
          u_pattern_tl_b: a.tl,
          u_pattern_br_b: a.br,
          u_texsize: [s, l],
          u_mix: e.t,
          u_pattern_size_a: r.displaySize,
          u_pattern_size_b: a.displaySize,
          u_scale_a: e.fromScale,
          u_scale_b: e.toScale,
          u_tile_units_to_pixels: 1 / ce(o, 1, i.transform.tileZoom),
          u_pixel_coord_upper: [h >> 16, p >> 16],
          u_pixel_coord_lower: [65535 & h, 65535 & p]
        };
      }(r, n, o, a), {
        u_matrix: e,
        u_opacity: i
      });
    },
        ji = {
      fillExtrusion: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_lightpos: new t.Uniform3f(e, i.u_lightpos),
          u_lightintensity: new t.Uniform1f(e, i.u_lightintensity),
          u_lightcolor: new t.Uniform3f(e, i.u_lightcolor),
          u_vertical_gradient: new t.Uniform1f(e, i.u_vertical_gradient),
          u_opacity: new t.Uniform1f(e, i.u_opacity)
        };
      },
      fillExtrusionPattern: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_lightpos: new t.Uniform3f(e, i.u_lightpos),
          u_lightintensity: new t.Uniform1f(e, i.u_lightintensity),
          u_lightcolor: new t.Uniform3f(e, i.u_lightcolor),
          u_vertical_gradient: new t.Uniform1f(e, i.u_vertical_gradient),
          u_height_factor: new t.Uniform1f(e, i.u_height_factor),
          u_image: new t.Uniform1i(e, i.u_image),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_pixel_coord_upper: new t.Uniform2f(e, i.u_pixel_coord_upper),
          u_pixel_coord_lower: new t.Uniform2f(e, i.u_pixel_coord_lower),
          u_scale: new t.Uniform4f(e, i.u_scale),
          u_fade: new t.Uniform1f(e, i.u_fade),
          u_opacity: new t.Uniform1f(e, i.u_opacity)
        };
      },
      fill: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix)
        };
      },
      fillPattern: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_image: new t.Uniform1i(e, i.u_image),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_pixel_coord_upper: new t.Uniform2f(e, i.u_pixel_coord_upper),
          u_pixel_coord_lower: new t.Uniform2f(e, i.u_pixel_coord_lower),
          u_scale: new t.Uniform4f(e, i.u_scale),
          u_fade: new t.Uniform1f(e, i.u_fade)
        };
      },
      fillOutline: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_world: new t.Uniform2f(e, i.u_world)
        };
      },
      fillOutlinePattern: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_world: new t.Uniform2f(e, i.u_world),
          u_image: new t.Uniform1i(e, i.u_image),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_pixel_coord_upper: new t.Uniform2f(e, i.u_pixel_coord_upper),
          u_pixel_coord_lower: new t.Uniform2f(e, i.u_pixel_coord_lower),
          u_scale: new t.Uniform4f(e, i.u_scale),
          u_fade: new t.Uniform1f(e, i.u_fade)
        };
      },
      circle: function (e, i) {
        return {
          u_camera_to_center_distance: new t.Uniform1f(e, i.u_camera_to_center_distance),
          u_scale_with_map: new t.Uniform1i(e, i.u_scale_with_map),
          u_pitch_with_map: new t.Uniform1i(e, i.u_pitch_with_map),
          u_extrude_scale: new t.Uniform2f(e, i.u_extrude_scale),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix)
        };
      },
      collisionBox: bi,
      collisionCircle: bi,
      debug: function (e, i) {
        return {
          u_color: new t.UniformColor(e, i.u_color),
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix)
        };
      },
      clippingMask: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix)
        };
      },
      heatmap: function (e, i) {
        return {
          u_extrude_scale: new t.Uniform1f(e, i.u_extrude_scale),
          u_intensity: new t.Uniform1f(e, i.u_intensity),
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix)
        };
      },
      heatmapTexture: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_world: new t.Uniform2f(e, i.u_world),
          u_image: new t.Uniform1i(e, i.u_image),
          u_color_ramp: new t.Uniform1i(e, i.u_color_ramp),
          u_opacity: new t.Uniform1f(e, i.u_opacity)
        };
      },
      hillshade: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_image: new t.Uniform1i(e, i.u_image),
          u_latrange: new t.Uniform2f(e, i.u_latrange),
          u_light: new t.Uniform2f(e, i.u_light),
          u_shadow: new t.UniformColor(e, i.u_shadow),
          u_highlight: new t.UniformColor(e, i.u_highlight),
          u_accent: new t.UniformColor(e, i.u_accent)
        };
      },
      hillshadePrepare: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_image: new t.Uniform1i(e, i.u_image),
          u_dimension: new t.Uniform2f(e, i.u_dimension),
          u_zoom: new t.Uniform1f(e, i.u_zoom),
          u_maxzoom: new t.Uniform1f(e, i.u_maxzoom)
        };
      },
      line: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_ratio: new t.Uniform1f(e, i.u_ratio),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_units_to_pixels: new t.Uniform2f(e, i.u_units_to_pixels)
        };
      },
      lineGradient: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_ratio: new t.Uniform1f(e, i.u_ratio),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_units_to_pixels: new t.Uniform2f(e, i.u_units_to_pixels),
          u_image: new t.Uniform1i(e, i.u_image)
        };
      },
      linePattern: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_ratio: new t.Uniform1f(e, i.u_ratio),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_image: new t.Uniform1i(e, i.u_image),
          u_units_to_pixels: new t.Uniform2f(e, i.u_units_to_pixels),
          u_scale: new t.Uniform4f(e, i.u_scale),
          u_fade: new t.Uniform1f(e, i.u_fade)
        };
      },
      lineSDF: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_ratio: new t.Uniform1f(e, i.u_ratio),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_units_to_pixels: new t.Uniform2f(e, i.u_units_to_pixels),
          u_patternscale_a: new t.Uniform2f(e, i.u_patternscale_a),
          u_patternscale_b: new t.Uniform2f(e, i.u_patternscale_b),
          u_sdfgamma: new t.Uniform1f(e, i.u_sdfgamma),
          u_image: new t.Uniform1i(e, i.u_image),
          u_tex_y_a: new t.Uniform1f(e, i.u_tex_y_a),
          u_tex_y_b: new t.Uniform1f(e, i.u_tex_y_b),
          u_mix: new t.Uniform1f(e, i.u_mix)
        };
      },
      raster: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_tl_parent: new t.Uniform2f(e, i.u_tl_parent),
          u_scale_parent: new t.Uniform1f(e, i.u_scale_parent),
          u_buffer_scale: new t.Uniform1f(e, i.u_buffer_scale),
          u_fade_t: new t.Uniform1f(e, i.u_fade_t),
          u_opacity: new t.Uniform1f(e, i.u_opacity),
          u_image0: new t.Uniform1i(e, i.u_image0),
          u_image1: new t.Uniform1i(e, i.u_image1),
          u_brightness_low: new t.Uniform1f(e, i.u_brightness_low),
          u_brightness_high: new t.Uniform1f(e, i.u_brightness_high),
          u_saturation_factor: new t.Uniform1f(e, i.u_saturation_factor),
          u_contrast_factor: new t.Uniform1f(e, i.u_contrast_factor),
          u_spin_weights: new t.Uniform3f(e, i.u_spin_weights)
        };
      },
      symbolIcon: function (e, i) {
        return {
          u_is_size_zoom_constant: new t.Uniform1i(e, i.u_is_size_zoom_constant),
          u_is_size_feature_constant: new t.Uniform1i(e, i.u_is_size_feature_constant),
          u_size_t: new t.Uniform1f(e, i.u_size_t),
          u_size: new t.Uniform1f(e, i.u_size),
          u_camera_to_center_distance: new t.Uniform1f(e, i.u_camera_to_center_distance),
          u_pitch: new t.Uniform1f(e, i.u_pitch),
          u_rotate_symbol: new t.Uniform1i(e, i.u_rotate_symbol),
          u_aspect_ratio: new t.Uniform1f(e, i.u_aspect_ratio),
          u_fade_change: new t.Uniform1f(e, i.u_fade_change),
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_label_plane_matrix: new t.UniformMatrix4f(e, i.u_label_plane_matrix),
          u_coord_matrix: new t.UniformMatrix4f(e, i.u_coord_matrix),
          u_is_text: new t.Uniform1f(e, i.u_is_text),
          u_pitch_with_map: new t.Uniform1i(e, i.u_pitch_with_map),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_texture: new t.Uniform1i(e, i.u_texture)
        };
      },
      symbolSDF: function (e, i) {
        return {
          u_is_size_zoom_constant: new t.Uniform1i(e, i.u_is_size_zoom_constant),
          u_is_size_feature_constant: new t.Uniform1i(e, i.u_is_size_feature_constant),
          u_size_t: new t.Uniform1f(e, i.u_size_t),
          u_size: new t.Uniform1f(e, i.u_size),
          u_camera_to_center_distance: new t.Uniform1f(e, i.u_camera_to_center_distance),
          u_pitch: new t.Uniform1f(e, i.u_pitch),
          u_rotate_symbol: new t.Uniform1i(e, i.u_rotate_symbol),
          u_aspect_ratio: new t.Uniform1f(e, i.u_aspect_ratio),
          u_fade_change: new t.Uniform1f(e, i.u_fade_change),
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_label_plane_matrix: new t.UniformMatrix4f(e, i.u_label_plane_matrix),
          u_coord_matrix: new t.UniformMatrix4f(e, i.u_coord_matrix),
          u_is_text: new t.Uniform1f(e, i.u_is_text),
          u_pitch_with_map: new t.Uniform1i(e, i.u_pitch_with_map),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_texture: new t.Uniform1i(e, i.u_texture),
          u_gamma_scale: new t.Uniform1f(e, i.u_gamma_scale),
          u_device_pixel_ratio: new t.Uniform1f(e, i.u_device_pixel_ratio),
          u_is_halo: new t.Uniform1f(e, i.u_is_halo)
        };
      },
      background: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_opacity: new t.Uniform1f(e, i.u_opacity),
          u_color: new t.UniformColor(e, i.u_color)
        };
      },
      backgroundPattern: function (e, i) {
        return {
          u_matrix: new t.UniformMatrix4f(e, i.u_matrix),
          u_opacity: new t.Uniform1f(e, i.u_opacity),
          u_image: new t.Uniform1i(e, i.u_image),
          u_pattern_tl_a: new t.Uniform2f(e, i.u_pattern_tl_a),
          u_pattern_br_a: new t.Uniform2f(e, i.u_pattern_br_a),
          u_pattern_tl_b: new t.Uniform2f(e, i.u_pattern_tl_b),
          u_pattern_br_b: new t.Uniform2f(e, i.u_pattern_br_b),
          u_texsize: new t.Uniform2f(e, i.u_texsize),
          u_mix: new t.Uniform1f(e, i.u_mix),
          u_pattern_size_a: new t.Uniform2f(e, i.u_pattern_size_a),
          u_pattern_size_b: new t.Uniform2f(e, i.u_pattern_size_b),
          u_scale_a: new t.Uniform1f(e, i.u_scale_a),
          u_scale_b: new t.Uniform1f(e, i.u_scale_b),
          u_pixel_coord_upper: new t.Uniform2f(e, i.u_pixel_coord_upper),
          u_pixel_coord_lower: new t.Uniform2f(e, i.u_pixel_coord_lower),
          u_tile_units_to_pixels: new t.Uniform1f(e, i.u_tile_units_to_pixels)
        };
      }
    };

    function qi(e, i) {
      for (var o = e.sort(function (t, e) {
        return t.tileID.isLessThan(e.tileID) ? -1 : e.tileID.isLessThan(t.tileID) ? 1 : 0;
      }), r = 0; r < o.length; r++) {
        var a = {},
            n = o[r],
            s = o.slice(r + 1);
        Vi(n.tileID.wrapped(), n.tileID, s, new t.OverscaledTileID(0, n.tileID.wrap + 1, 0, 0, 0), a), n.setMask(a, i);
      }
    }

    function Vi(e, i, o, r, a) {
      for (var n = 0; n < o.length; n++) {
        var s = o[n];
        if (r.isLessThan(s.tileID)) break;
        if (i.key === s.tileID.key) return;

        if (s.tileID.isChildOf(i)) {
          for (var l = i.children(1 / 0), c = 0; c < l.length; c++) {
            Vi(e, l[c], o.slice(n), r, a);
          }

          return;
        }
      }

      var u = i.overscaledZ - e.overscaledZ,
          h = new t.CanonicalTileID(u, i.canonical.x - (e.canonical.x << u), i.canonical.y - (e.canonical.y << u));
      a[h.key] = a[h.key] || h;
    }

    function Gi(t, e, i, o, r) {
      for (var a = t.context, n = a.gl, s = r ? t.useProgram("collisionCircle") : t.useProgram("collisionBox"), l = 0; l < o.length; l++) {
        var c = o[l],
            u = e.getTile(c),
            h = u.getBucket(i);

        if (h) {
          var p = r ? h.collisionCircle : h.collisionBox;
          p && s.draw(a, r ? n.TRIANGLES : n.LINES, Tt.disabled, It.disabled, t.colorModeForRenderPass(), St.disabled, wi(c.posMatrix, t.transform, u), i.id, p.layoutVertexBuffer, p.indexBuffer, p.segments, null, t.transform.zoom, null, null, p.collisionVertexBuffer);
        }
      }
    }

    var Wi = t.identity(new Float32Array(16));

    function Xi(e, i, o, r, a, n) {
      var s = t.getAnchorAlignment(e),
          l = -(s.horizontalAlign - .5) * i,
          c = -(s.verticalAlign - .5) * o,
          u = t.evaluateRadialOffset(e, r);
      return new t.Point((l / a + u[0]) * n, (c / a + u[1]) * n);
    }

    function Hi(e, i, o, r, a, n, s, l, c, u) {
      var h = e.text.placedSymbolArray,
          p = e.text.dynamicLayoutVertexArray;
      p.clear();

      for (var d = 0; d < h.length; d++) {
        var _ = h.get(d),
            f = !_.hidden && _.crossTileID ? r[_.crossTileID] : null;

        if (f) {
          var m = new t.Point(_.anchorX, _.anchorY),
              g = Yt(m, o ? l : s),
              v = .5 + n.cameraToCenterDistance / g.signedDistanceFromCamera * .5,
              y = a.evaluateSizeForFeature(e.textSizeData, u, _) * v / t.ONE_EM;
          o && (y *= e.tilePixelRatio / c);

          for (var x = f.width, b = f.height, w = f.radialOffset, E = f.textBoxScale, T = Xi(f.anchor, x, b, w, E, y), I = o ? Yt(m.add(T), s).point : g.point.add(i ? T.rotate(-n.angle) : T), C = 0; C < _.numGlyphs; C++) {
            t.addDynamicAttributes(p, I, 0);
          }
        } else ae(_.numGlyphs, p);
      }

      e.text.dynamicLayoutVertexBuffer.updateData(p);
    }

    function Ki(e, i, o, r, a, n, s, l, c, u, h, p, d) {
      for (var _, f, m = e.context, g = m.gl, v = e.transform, y = "map" === l, x = "map" === c, b = y && "point" !== o.layout.get("symbol-placement"), w = y && !x && !b, E = void 0 !== o.layout.get("symbol-sort-key").constantOr(1), T = e.depthModeForSublayer(0, Tt.ReadOnly), I = o.layout.get("text-variable-anchor"), C = [], S = 0, P = r; S < P.length; S += 1) {
        var z = P[S],
            L = i.getTile(z),
            D = L.getBucket(o);

        if (D) {
          var M = a ? D.text : D.icon;

          if (M && M.segments.get().length) {
            var R = M.programConfigurations.get(o.id),
                A = a || D.sdfIcons,
                k = a ? D.textSizeData : D.iconSizeData;
            _ || (_ = e.useProgram(A ? "symbolSDF" : "symbolIcon", R), f = t.evaluateSizeForZoom(k, v.zoom)), m.activeTexture.set(g.TEXTURE0);
            var B = void 0,
                O = void 0,
                F = void 0;
            if (a) O = L.glyphAtlasTexture, F = g.LINEAR, B = L.glyphAtlasTexture.size;else {
              var U = 1 !== o.layout.get("icon-size").constantOr(0) || D.iconsNeedLinear,
                  N = x || 0 !== v.pitch;
              O = L.imageAtlasTexture, F = A || e.options.rotating || e.options.zooming || U || N ? g.LINEAR : g.NEAREST, B = L.imageAtlasTexture.size;
            }
            var Z = ce(L, 1, e.transform.zoom),
                j = Ht(z.posMatrix, x, y, e.transform, Z),
                q = Kt(z.posMatrix, x, y, e.transform, Z);
            if (b) Qt(D, z.posMatrix, e, a, j, q, x, u);else if (a && f && I) {
              var V = Math.pow(2, v.zoom - L.tileID.overscaledZ);
              Hi(D, y, x, d, t.symbolSize, v, j, z.posMatrix, V, f);
            }
            var G = e.translatePosMatrix(z.posMatrix, L, n, s),
                W = b || a && I ? Wi : j,
                X = e.translatePosMatrix(q, L, n, s, !0),
                H = A && 0 !== o.paint.get(a ? "text-halo-width" : "icon-halo-width").constantOr(1),
                K = {
              program: _,
              buffers: M,
              uniformValues: A ? Ui(k.kind, f, w, x, e, G, W, X, a, B, !0) : Fi(k.kind, f, w, x, e, G, W, X, a, B),
              atlasTexture: O,
              atlasInterpolation: F,
              isSDF: A,
              hasHalo: H
            };
            if (E) for (var Y = 0, J = M.segments.get(); Y < J.length; Y += 1) {
              var Q = J[Y];
              C.push({
                segments: new t.SegmentVector([Q]),
                sortKey: Q.sortKey,
                state: K
              });
            } else C.push({
              segments: M.segments,
              sortKey: 0,
              state: K
            });
          }
        }
      }

      E && C.sort(function (t, e) {
        return t.sortKey - e.sortKey;
      });

      for (var $ = 0, tt = C; $ < tt.length; $ += 1) {
        var et = tt[$],
            it = et.state;

        if (it.atlasTexture.bind(it.atlasInterpolation, g.CLAMP_TO_EDGE), it.isSDF) {
          var ot = it.uniformValues;
          it.hasHalo && (ot.u_is_halo = 1, Yi(it.buffers, et.segments, o, e, it.program, T, h, p, ot)), ot.u_is_halo = 0;
        }

        Yi(it.buffers, et.segments, o, e, it.program, T, h, p, it.uniformValues);
      }
    }

    function Yi(t, e, i, o, r, a, n, s, l) {
      var c = o.context,
          u = c.gl;
      r.draw(c, u.TRIANGLES, a, n, s, St.disabled, l, i.id, t.layoutVertexBuffer, t.indexBuffer, e, i.paint, o.transform.zoom, t.programConfigurations.get(i.id), t.dynamicLayoutVertexBuffer, t.opacityVertexBuffer);
    }

    function Ji(t, e, i, o, r, a, n) {
      var s,
          l,
          c,
          u,
          h,
          p = t.context.gl,
          d = i.paint.get("fill-pattern"),
          _ = d && d.constantOr(1),
          f = i.getCrossfadeParameters();

      n ? (l = _ && !i.getPaintProperty("fill-outline-color") ? "fillOutlinePattern" : "fillOutline", s = p.LINES) : (l = _ ? "fillPattern" : "fill", s = p.TRIANGLES);

      for (var m = 0, g = o; m < g.length; m += 1) {
        var v = g[m],
            y = e.getTile(v);

        if (!_ || y.patternsLoaded()) {
          var x = y.getBucket(i);

          if (x) {
            var b = x.programConfigurations.get(i.id),
                w = t.useProgram(l, b);
            _ && (t.context.activeTexture.set(p.TEXTURE0), y.imageAtlasTexture.bind(p.LINEAR, p.CLAMP_TO_EDGE), b.updatePatternPaintBuffers(f));
            var E = d.constantOr(null);

            if (E && y.imageAtlas) {
              var T = y.imageAtlas.patternPositions[E.to],
                  I = y.imageAtlas.patternPositions[E.from];
              T && I && b.setConstantPatternPositions(T, I);
            }

            var C = t.translatePosMatrix(v.posMatrix, y, i.paint.get("fill-translate"), i.paint.get("fill-translate-anchor"));

            if (n) {
              u = x.indexBuffer2, h = x.segments2;
              var S = [p.drawingBufferWidth, p.drawingBufferHeight];
              c = "fillOutlinePattern" === l && _ ? yi(C, t, f, y, S) : vi(C, S);
            } else u = x.indexBuffer, h = x.segments, c = _ ? gi(C, t, f, y) : mi(C);

            w.draw(t.context, s, r, t.stencilModeForClipping(v), a, St.disabled, c, i.id, x.layoutVertexBuffer, u, h, i.paint, t.transform.zoom, b);
          }
        }
      }
    }

    function Qi(t, e, i, o, r, a, n) {
      for (var s = t.context, l = s.gl, c = i.paint.get("fill-extrusion-pattern"), u = c.constantOr(1), h = i.getCrossfadeParameters(), p = i.paint.get("fill-extrusion-opacity"), d = 0, _ = o; d < _.length; d += 1) {
        var f = _[d],
            m = e.getTile(f),
            g = m.getBucket(i);

        if (g) {
          var v = g.programConfigurations.get(i.id),
              y = t.useProgram(u ? "fillExtrusionPattern" : "fillExtrusion", v);
          u && (t.context.activeTexture.set(l.TEXTURE0), m.imageAtlasTexture.bind(l.LINEAR, l.CLAMP_TO_EDGE), v.updatePatternPaintBuffers(h));
          var x = c.constantOr(null);

          if (x && m.imageAtlas) {
            var b = m.imageAtlas.patternPositions[x.to],
                w = m.imageAtlas.patternPositions[x.from];
            b && w && v.setConstantPatternPositions(b, w);
          }

          var E = t.translatePosMatrix(f.posMatrix, m, i.paint.get("fill-extrusion-translate"), i.paint.get("fill-extrusion-translate-anchor")),
              T = i.paint.get("fill-extrusion-vertical-gradient"),
              I = u ? fi(E, t, T, p, f, h, m) : _i(E, t, T, p);
          y.draw(s, s.gl.TRIANGLES, r, a, n, St.backCCW, I, i.id, g.layoutVertexBuffer, g.indexBuffer, g.segments, i.paint, t.transform.zoom, v);
        }
      }
    }

    function $i(t, e, i, o, r, a) {
      var n = t.context,
          s = n.gl,
          l = e.fbo;

      if (l) {
        var c = t.useProgram("hillshade");
        n.activeTexture.set(s.TEXTURE0), s.bindTexture(s.TEXTURE_2D, l.colorAttachment.get());
        var u = Si(t, e, i);
        e.maskedBoundsBuffer && e.maskedIndexBuffer && e.segments ? c.draw(n, s.TRIANGLES, o, r, a, St.disabled, u, i.id, e.maskedBoundsBuffer, e.maskedIndexBuffer, e.segments) : c.draw(n, s.TRIANGLES, o, r, a, St.disabled, u, i.id, t.rasterBoundsBuffer, t.quadTriangleIndexBuffer, t.rasterBoundsSegments);
      }
    }

    function to(e, i, o, r, a, n, s) {
      var l = e.context,
          c = l.gl;

      if (i.dem && i.dem.data) {
        var u = i.dem.dim,
            h = i.dem.stride,
            p = i.dem.getPixels();

        if (l.activeTexture.set(c.TEXTURE1), l.pixelStoreUnpackPremultiplyAlpha.set(!1), i.demTexture = i.demTexture || e.getTileTexture(h), i.demTexture) {
          var d = i.demTexture;
          d.update(p, {
            premultiply: !1
          }), d.bind(c.NEAREST, c.CLAMP_TO_EDGE);
        } else i.demTexture = new t.Texture(l, p, c.RGBA, {
          premultiply: !1
        }), i.demTexture.bind(c.NEAREST, c.CLAMP_TO_EDGE);

        l.activeTexture.set(c.TEXTURE0);
        var _ = i.fbo;

        if (!_) {
          var f = new t.Texture(l, {
            width: u,
            height: u,
            data: null
          }, c.RGBA);
          f.bind(c.LINEAR, c.CLAMP_TO_EDGE), (_ = i.fbo = l.createFramebuffer(u, u)).colorAttachment.set(f.texture);
        }

        l.bindFramebuffer.set(_.framebuffer), l.viewport.set([0, 0, u, u]), e.useProgram("hillshadePrepare").draw(l, c.TRIANGLES, a, n, s, St.disabled, Pi(i, r), o.id, e.rasterBoundsBuffer, e.quadTriangleIndexBuffer, e.rasterBoundsSegments), i.needsHillshadePrepare = !1;
      }
    }

    function eo(e, i, o, r, a) {
      var n = r.paint.get("raster-fade-duration");

      if (n > 0) {
        var s = t.browser.now(),
            l = (s - e.timeAdded) / n,
            c = i ? (s - i.timeAdded) / n : -1,
            u = o.getSource(),
            h = a.coveringZoomLevel({
          tileSize: u.tileSize,
          roundZoom: u.roundZoom
        }),
            p = !i || Math.abs(i.tileID.overscaledZ - h) > Math.abs(e.tileID.overscaledZ - h),
            d = p && e.refreshedUponExpiration ? 1 : t.clamp(p ? l : 1 - c, 0, 1);
        return e.refreshedUponExpiration && l >= 1 && (e.refreshedUponExpiration = !1), i ? {
          opacity: 1,
          mix: 1 - d
        } : {
          opacity: d,
          mix: 0
        };
      }

      return {
        opacity: 1,
        mix: 0
      };
    }

    function io(e, i, o) {
      var r = e.context,
          a = r.gl,
          n = o.posMatrix,
          s = e.useProgram("debug"),
          l = Tt.disabled,
          c = It.disabled,
          u = e.colorModeForRenderPass(),
          h = "$debug";
      s.draw(r, a.LINE_STRIP, l, c, u, St.disabled, Ei(n, t.Color.red), h, e.debugBuffer, e.tileBorderIndexBuffer, e.debugSegments);

      for (var p = i.getTileByID(o.key).latestRawTileData, d = p && p.byteLength || 0, _ = Math.floor(d / 1024), f = function (t, e, i, o) {
        o = o || 1;
        var r,
            a,
            n,
            s,
            l,
            c,
            u,
            h,
            p = [];

        for (r = 0, a = t.length; r < a; r++) {
          if (l = oo[t[r]]) {
            for (h = null, n = 0, s = l[1].length; n < s; n += 2) {
              -1 === l[1][n] && -1 === l[1][n + 1] ? h = null : (c = e + l[1][n] * o, u = i - l[1][n + 1] * o, h && p.push(h.x, h.y, c, u), h = {
                x: c,
                y: u
              });
            }

            e += l[0] * o;
          }
        }

        return p;
      }(o.toString() + " " + _ + "kb", 50, 200, 5), m = new t.StructArrayLayout2i4(), g = new t.StructArrayLayout2ui4(), v = 0; v < f.length; v += 2) {
        m.emplaceBack(f[v], f[v + 1]), g.emplaceBack(v, v + 1);
      }

      for (var y = r.createVertexBuffer(m, Oe.members), x = r.createIndexBuffer(g), b = t.SegmentVector.simpleSegment(0, 0, m.length / 2, m.length / 2), w = i.getTile(o).tileSize, E = t.EXTENT / (Math.pow(2, e.transform.zoom - o.overscaledZ) * w), T = [[-1, -1], [-1, 1], [1, -1], [1, 1]], I = 0; I < T.length; I++) {
        var C = T[I];
        s.draw(r, a.LINES, l, c, u, St.disabled, Ei(t.translate([], n, [E * C[0], E * C[1], 0]), t.Color.white), h, y, x, b);
      }

      s.draw(r, a.LINES, l, c, u, St.disabled, Ei(n, t.Color.black), h, y, x, b);
    }

    var oo = {
      " ": [16, []],
      "!": [10, [5, 21, 5, 7, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
      '"': [16, [4, 21, 4, 14, -1, -1, 12, 21, 12, 14]],
      "#": [21, [11, 25, 4, -7, -1, -1, 17, 25, 10, -7, -1, -1, 4, 12, 18, 12, -1, -1, 3, 6, 17, 6]],
      $: [20, [8, 25, 8, -4, -1, -1, 12, 25, 12, -4, -1, -1, 17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
      "%": [24, [21, 21, 3, 0, -1, -1, 8, 21, 10, 19, 10, 17, 9, 15, 7, 14, 5, 14, 3, 16, 3, 18, 4, 20, 6, 21, 8, 21, 10, 20, 13, 19, 16, 19, 19, 20, 21, 21, -1, -1, 17, 7, 15, 6, 14, 4, 14, 2, 16, 0, 18, 0, 20, 1, 21, 3, 21, 5, 19, 7, 17, 7]],
      "&": [26, [23, 12, 23, 13, 22, 14, 21, 14, 20, 13, 19, 11, 17, 6, 15, 3, 13, 1, 11, 0, 7, 0, 5, 1, 4, 2, 3, 4, 3, 6, 4, 8, 5, 9, 12, 13, 13, 14, 14, 16, 14, 18, 13, 20, 11, 21, 9, 20, 8, 18, 8, 16, 9, 13, 11, 10, 16, 3, 18, 1, 20, 0, 22, 0, 23, 1, 23, 2]],
      "'": [10, [5, 19, 4, 20, 5, 21, 6, 20, 6, 18, 5, 16, 4, 15]],
      "(": [14, [11, 25, 9, 23, 7, 20, 5, 16, 4, 11, 4, 7, 5, 2, 7, -2, 9, -5, 11, -7]],
      ")": [14, [3, 25, 5, 23, 7, 20, 9, 16, 10, 11, 10, 7, 9, 2, 7, -2, 5, -5, 3, -7]],
      "*": [16, [8, 21, 8, 9, -1, -1, 3, 18, 13, 12, -1, -1, 13, 18, 3, 12]],
      "+": [26, [13, 18, 13, 0, -1, -1, 4, 9, 22, 9]],
      ",": [10, [6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
      "-": [26, [4, 9, 22, 9]],
      ".": [10, [5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
      "/": [22, [20, 25, 2, -7]],
      0: [20, [9, 21, 6, 20, 4, 17, 3, 12, 3, 9, 4, 4, 6, 1, 9, 0, 11, 0, 14, 1, 16, 4, 17, 9, 17, 12, 16, 17, 14, 20, 11, 21, 9, 21]],
      1: [20, [6, 17, 8, 18, 11, 21, 11, 0]],
      2: [20, [4, 16, 4, 17, 5, 19, 6, 20, 8, 21, 12, 21, 14, 20, 15, 19, 16, 17, 16, 15, 15, 13, 13, 10, 3, 0, 17, 0]],
      3: [20, [5, 21, 16, 21, 10, 13, 13, 13, 15, 12, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
      4: [20, [13, 21, 3, 7, 18, 7, -1, -1, 13, 21, 13, 0]],
      5: [20, [15, 21, 5, 21, 4, 12, 5, 13, 8, 14, 11, 14, 14, 13, 16, 11, 17, 8, 17, 6, 16, 3, 14, 1, 11, 0, 8, 0, 5, 1, 4, 2, 3, 4]],
      6: [20, [16, 18, 15, 20, 12, 21, 10, 21, 7, 20, 5, 17, 4, 12, 4, 7, 5, 3, 7, 1, 10, 0, 11, 0, 14, 1, 16, 3, 17, 6, 17, 7, 16, 10, 14, 12, 11, 13, 10, 13, 7, 12, 5, 10, 4, 7]],
      7: [20, [17, 21, 7, 0, -1, -1, 3, 21, 17, 21]],
      8: [20, [8, 21, 5, 20, 4, 18, 4, 16, 5, 14, 7, 13, 11, 12, 14, 11, 16, 9, 17, 7, 17, 4, 16, 2, 15, 1, 12, 0, 8, 0, 5, 1, 4, 2, 3, 4, 3, 7, 4, 9, 6, 11, 9, 12, 13, 13, 15, 14, 16, 16, 16, 18, 15, 20, 12, 21, 8, 21]],
      9: [20, [16, 14, 15, 11, 13, 9, 10, 8, 9, 8, 6, 9, 4, 11, 3, 14, 3, 15, 4, 18, 6, 20, 9, 21, 10, 21, 13, 20, 15, 18, 16, 14, 16, 9, 15, 4, 13, 1, 10, 0, 8, 0, 5, 1, 4, 3]],
      ":": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 5, 2, 4, 1, 5, 0, 6, 1, 5, 2]],
      ";": [10, [5, 14, 4, 13, 5, 12, 6, 13, 5, 14, -1, -1, 6, 1, 5, 0, 4, 1, 5, 2, 6, 1, 6, -1, 5, -3, 4, -4]],
      "<": [24, [20, 18, 4, 9, 20, 0]],
      "=": [26, [4, 12, 22, 12, -1, -1, 4, 6, 22, 6]],
      ">": [24, [4, 18, 20, 9, 4, 0]],
      "?": [18, [3, 16, 3, 17, 4, 19, 5, 20, 7, 21, 11, 21, 13, 20, 14, 19, 15, 17, 15, 15, 14, 13, 13, 12, 9, 10, 9, 7, -1, -1, 9, 2, 8, 1, 9, 0, 10, 1, 9, 2]],
      "@": [27, [18, 13, 17, 15, 15, 16, 12, 16, 10, 15, 9, 14, 8, 11, 8, 8, 9, 6, 11, 5, 14, 5, 16, 6, 17, 8, -1, -1, 12, 16, 10, 14, 9, 11, 9, 8, 10, 6, 11, 5, -1, -1, 18, 16, 17, 8, 17, 6, 19, 5, 21, 5, 23, 7, 24, 10, 24, 12, 23, 15, 22, 17, 20, 19, 18, 20, 15, 21, 12, 21, 9, 20, 7, 19, 5, 17, 4, 15, 3, 12, 3, 9, 4, 6, 5, 4, 7, 2, 9, 1, 12, 0, 15, 0, 18, 1, 20, 2, 21, 3, -1, -1, 19, 16, 18, 8, 18, 6, 19, 5]],
      A: [18, [9, 21, 1, 0, -1, -1, 9, 21, 17, 0, -1, -1, 4, 7, 14, 7]],
      B: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, -1, -1, 4, 11, 13, 11, 16, 10, 17, 9, 18, 7, 18, 4, 17, 2, 16, 1, 13, 0, 4, 0]],
      C: [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5]],
      D: [21, [4, 21, 4, 0, -1, -1, 4, 21, 11, 21, 14, 20, 16, 18, 17, 16, 18, 13, 18, 8, 17, 5, 16, 3, 14, 1, 11, 0, 4, 0]],
      E: [19, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11, -1, -1, 4, 0, 17, 0]],
      F: [18, [4, 21, 4, 0, -1, -1, 4, 21, 17, 21, -1, -1, 4, 11, 12, 11]],
      G: [21, [18, 16, 17, 18, 15, 20, 13, 21, 9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 18, 8, -1, -1, 13, 8, 18, 8]],
      H: [22, [4, 21, 4, 0, -1, -1, 18, 21, 18, 0, -1, -1, 4, 11, 18, 11]],
      I: [8, [4, 21, 4, 0]],
      J: [16, [12, 21, 12, 5, 11, 2, 10, 1, 8, 0, 6, 0, 4, 1, 3, 2, 2, 5, 2, 7]],
      K: [21, [4, 21, 4, 0, -1, -1, 18, 21, 4, 7, -1, -1, 9, 12, 18, 0]],
      L: [17, [4, 21, 4, 0, -1, -1, 4, 0, 16, 0]],
      M: [24, [4, 21, 4, 0, -1, -1, 4, 21, 12, 0, -1, -1, 20, 21, 12, 0, -1, -1, 20, 21, 20, 0]],
      N: [22, [4, 21, 4, 0, -1, -1, 4, 21, 18, 0, -1, -1, 18, 21, 18, 0]],
      O: [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21]],
      P: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 14, 17, 12, 16, 11, 13, 10, 4, 10]],
      Q: [22, [9, 21, 7, 20, 5, 18, 4, 16, 3, 13, 3, 8, 4, 5, 5, 3, 7, 1, 9, 0, 13, 0, 15, 1, 17, 3, 18, 5, 19, 8, 19, 13, 18, 16, 17, 18, 15, 20, 13, 21, 9, 21, -1, -1, 12, 4, 18, -2]],
      R: [21, [4, 21, 4, 0, -1, -1, 4, 21, 13, 21, 16, 20, 17, 19, 18, 17, 18, 15, 17, 13, 16, 12, 13, 11, 4, 11, -1, -1, 11, 11, 18, 0]],
      S: [20, [17, 18, 15, 20, 12, 21, 8, 21, 5, 20, 3, 18, 3, 16, 4, 14, 5, 13, 7, 12, 13, 10, 15, 9, 16, 8, 17, 6, 17, 3, 15, 1, 12, 0, 8, 0, 5, 1, 3, 3]],
      T: [16, [8, 21, 8, 0, -1, -1, 1, 21, 15, 21]],
      U: [22, [4, 21, 4, 6, 5, 3, 7, 1, 10, 0, 12, 0, 15, 1, 17, 3, 18, 6, 18, 21]],
      V: [18, [1, 21, 9, 0, -1, -1, 17, 21, 9, 0]],
      W: [24, [2, 21, 7, 0, -1, -1, 12, 21, 7, 0, -1, -1, 12, 21, 17, 0, -1, -1, 22, 21, 17, 0]],
      X: [20, [3, 21, 17, 0, -1, -1, 17, 21, 3, 0]],
      Y: [18, [1, 21, 9, 11, 9, 0, -1, -1, 17, 21, 9, 11]],
      Z: [20, [17, 21, 3, 0, -1, -1, 3, 21, 17, 21, -1, -1, 3, 0, 17, 0]],
      "[": [14, [4, 25, 4, -7, -1, -1, 5, 25, 5, -7, -1, -1, 4, 25, 11, 25, -1, -1, 4, -7, 11, -7]],
      "\\": [14, [0, 21, 14, -3]],
      "]": [14, [9, 25, 9, -7, -1, -1, 10, 25, 10, -7, -1, -1, 3, 25, 10, 25, -1, -1, 3, -7, 10, -7]],
      "^": [16, [6, 15, 8, 18, 10, 15, -1, -1, 3, 12, 8, 17, 13, 12, -1, -1, 8, 17, 8, 0]],
      _: [16, [0, -2, 16, -2]],
      "`": [10, [6, 21, 5, 20, 4, 18, 4, 16, 5, 15, 6, 16, 5, 17]],
      a: [19, [15, 14, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      b: [19, [4, 21, 4, 0, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
      c: [18, [15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      d: [19, [15, 21, 15, 0, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      e: [18, [3, 8, 15, 8, 15, 10, 14, 12, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      f: [12, [10, 21, 8, 21, 6, 20, 5, 17, 5, 0, -1, -1, 2, 14, 9, 14]],
      g: [19, [15, 14, 15, -2, 14, -5, 13, -6, 11, -7, 8, -7, 6, -6, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      h: [19, [4, 21, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
      i: [8, [3, 21, 4, 20, 5, 21, 4, 22, 3, 21, -1, -1, 4, 14, 4, 0]],
      j: [10, [5, 21, 6, 20, 7, 21, 6, 22, 5, 21, -1, -1, 6, 14, 6, -3, 5, -6, 3, -7, 1, -7]],
      k: [17, [4, 21, 4, 0, -1, -1, 14, 14, 4, 4, -1, -1, 8, 8, 15, 0]],
      l: [8, [4, 21, 4, 0]],
      m: [30, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0, -1, -1, 15, 10, 18, 13, 20, 14, 23, 14, 25, 13, 26, 10, 26, 0]],
      n: [19, [4, 14, 4, 0, -1, -1, 4, 10, 7, 13, 9, 14, 12, 14, 14, 13, 15, 10, 15, 0]],
      o: [19, [8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3, 16, 6, 16, 8, 15, 11, 13, 13, 11, 14, 8, 14]],
      p: [19, [4, 14, 4, -7, -1, -1, 4, 11, 6, 13, 8, 14, 11, 14, 13, 13, 15, 11, 16, 8, 16, 6, 15, 3, 13, 1, 11, 0, 8, 0, 6, 1, 4, 3]],
      q: [19, [15, 14, 15, -7, -1, -1, 15, 11, 13, 13, 11, 14, 8, 14, 6, 13, 4, 11, 3, 8, 3, 6, 4, 3, 6, 1, 8, 0, 11, 0, 13, 1, 15, 3]],
      r: [13, [4, 14, 4, 0, -1, -1, 4, 8, 5, 11, 7, 13, 9, 14, 12, 14]],
      s: [17, [14, 11, 13, 13, 10, 14, 7, 14, 4, 13, 3, 11, 4, 9, 6, 8, 11, 7, 13, 6, 14, 4, 14, 3, 13, 1, 10, 0, 7, 0, 4, 1, 3, 3]],
      t: [12, [5, 21, 5, 4, 6, 1, 8, 0, 10, 0, -1, -1, 2, 14, 9, 14]],
      u: [19, [4, 14, 4, 4, 5, 1, 7, 0, 10, 0, 12, 1, 15, 4, -1, -1, 15, 14, 15, 0]],
      v: [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0]],
      w: [22, [3, 14, 7, 0, -1, -1, 11, 14, 7, 0, -1, -1, 11, 14, 15, 0, -1, -1, 19, 14, 15, 0]],
      x: [17, [3, 14, 14, 0, -1, -1, 14, 14, 3, 0]],
      y: [16, [2, 14, 8, 0, -1, -1, 14, 14, 8, 0, 6, -4, 4, -6, 2, -7, 1, -7]],
      z: [17, [14, 14, 3, 0, -1, -1, 3, 14, 14, 14, -1, -1, 3, 0, 14, 0]],
      "{": [14, [9, 25, 7, 24, 6, 23, 5, 21, 5, 19, 6, 17, 7, 16, 8, 14, 8, 12, 6, 10, -1, -1, 7, 24, 6, 22, 6, 20, 7, 18, 8, 17, 9, 15, 9, 13, 8, 11, 4, 9, 8, 7, 9, 5, 9, 3, 8, 1, 7, 0, 6, -2, 6, -4, 7, -6, -1, -1, 6, 8, 8, 6, 8, 4, 7, 2, 6, 1, 5, -1, 5, -3, 6, -5, 7, -6, 9, -7]],
      "|": [8, [4, 25, 4, -7]],
      "}": [14, [5, 25, 7, 24, 8, 23, 9, 21, 9, 19, 8, 17, 7, 16, 6, 14, 6, 12, 8, 10, -1, -1, 7, 24, 8, 22, 8, 20, 7, 18, 6, 17, 5, 15, 5, 13, 6, 11, 10, 9, 6, 7, 5, 5, 5, 3, 6, 1, 7, 0, 8, -2, 8, -4, 7, -6, -1, -1, 8, 8, 6, 6, 6, 4, 7, 2, 8, 1, 9, -1, 9, -3, 8, -5, 7, -6, 5, -7]],
      "~": [24, [3, 6, 3, 8, 4, 11, 6, 12, 8, 12, 10, 11, 14, 8, 16, 7, 18, 7, 20, 8, 21, 10, -1, -1, 3, 8, 4, 10, 6, 11, 8, 11, 10, 10, 14, 7, 16, 6, 18, 6, 20, 7, 21, 10, 21, 12]]
    };

    var ro = {
      symbol: function (t, e, i, o, r) {
        if ("translucent" === t.renderPass) {
          var a = It.disabled,
              n = t.colorModeForRenderPass();
          0 !== i.paint.get("icon-opacity").constantOr(1) && Ki(t, e, i, o, !1, i.paint.get("icon-translate"), i.paint.get("icon-translate-anchor"), i.layout.get("icon-rotation-alignment"), i.layout.get("icon-pitch-alignment"), i.layout.get("icon-keep-upright"), a, n, r), 0 !== i.paint.get("text-opacity").constantOr(1) && Ki(t, e, i, o, !0, i.paint.get("text-translate"), i.paint.get("text-translate-anchor"), i.layout.get("text-rotation-alignment"), i.layout.get("text-pitch-alignment"), i.layout.get("text-keep-upright"), a, n, r), e.map.showCollisionBoxes && function (t, e, i, o) {
            Gi(t, e, i, o, !1), Gi(t, e, i, o, !0);
          }(t, e, i, o);
        }
      },
      circle: function (e, i, o, r) {
        if ("translucent" === e.renderPass) {
          var a = o.paint.get("circle-opacity"),
              n = o.paint.get("circle-stroke-width"),
              s = o.paint.get("circle-stroke-opacity"),
              l = void 0 !== o.layout.get("circle-sort-key").constantOr(1);

          if (0 !== a.constantOr(1) || 0 !== n.constantOr(1) && 0 !== s.constantOr(1)) {
            for (var c = e.context, u = c.gl, h = e.depthModeForSublayer(0, Tt.ReadOnly), p = It.disabled, d = e.colorModeForRenderPass(), _ = [], f = 0; f < r.length; f++) {
              var m = r[f],
                  g = i.getTile(m),
                  v = g.getBucket(o);

              if (v) {
                var y = v.programConfigurations.get(o.id),
                    x = {
                  programConfiguration: y,
                  program: e.useProgram("circle", y),
                  layoutVertexBuffer: v.layoutVertexBuffer,
                  indexBuffer: v.indexBuffer,
                  uniformValues: xi(e, m, g, o)
                };
                if (l) for (var b = 0, w = v.segments.get(); b < w.length; b += 1) {
                  var E = w[b];

                  _.push({
                    segments: new t.SegmentVector([E]),
                    sortKey: E.sortKey,
                    state: x
                  });
                } else _.push({
                  segments: v.segments,
                  sortKey: 0,
                  state: x
                });
              }
            }

            l && _.sort(function (t, e) {
              return t.sortKey - e.sortKey;
            });

            for (var T = 0, I = _; T < I.length; T += 1) {
              var C = I[T],
                  S = C.state,
                  P = S.programConfiguration,
                  z = S.program,
                  L = S.layoutVertexBuffer,
                  D = S.indexBuffer,
                  M = S.uniformValues,
                  R = C.segments;
              z.draw(c, u.TRIANGLES, h, p, d, St.disabled, M, o.id, L, D, R, o.paint, e.transform.zoom, P);
            }
          }
        }
      },
      heatmap: function (e, i, o, r) {
        if (0 !== o.paint.get("heatmap-opacity")) if ("offscreen" === e.renderPass) {
          var a = e.context,
              n = a.gl,
              s = e.depthModeForSublayer(0, Tt.ReadOnly),
              l = It.disabled,
              c = new Ct([n.ONE, n.ONE], t.Color.transparent, [!0, !0, !0, !0]);
          !function (t, e, i) {
            var o = t.gl;
            t.activeTexture.set(o.TEXTURE1), t.viewport.set([0, 0, e.width / 4, e.height / 4]);
            var r = i.heatmapFbo;
            if (r) o.bindTexture(o.TEXTURE_2D, r.colorAttachment.get()), t.bindFramebuffer.set(r.framebuffer);else {
              var a = o.createTexture();
              o.bindTexture(o.TEXTURE_2D, a), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MAG_FILTER, o.LINEAR), r = i.heatmapFbo = t.createFramebuffer(e.width / 4, e.height / 4), function t(e, i, o, r) {
                var a = e.gl;
                a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, i.width / 4, i.height / 4, 0, a.RGBA, e.extTextureHalfFloat ? e.extTextureHalfFloat.HALF_FLOAT_OES : a.UNSIGNED_BYTE, null), r.colorAttachment.set(o), e.extTextureHalfFloat && a.checkFramebufferStatus(a.FRAMEBUFFER) !== a.FRAMEBUFFER_COMPLETE && (e.extTextureHalfFloat = null, r.colorAttachment.setDirty(), t(e, i, o, r));
              }(t, e, a, r);
            }
          }(a, e, o), a.clear({
            color: t.Color.transparent
          });

          for (var u = 0; u < r.length; u++) {
            var h = r[u];

            if (!i.hasRenderableParent(h)) {
              var p = i.getTile(h),
                  d = p.getBucket(o);

              if (d) {
                var _ = d.programConfigurations.get(o.id),
                    f = e.useProgram("heatmap", _),
                    m = e.transform.zoom;

                f.draw(a, n.TRIANGLES, s, l, c, St.disabled, Ii(h.posMatrix, p, m, o.paint.get("heatmap-intensity")), o.id, d.layoutVertexBuffer, d.indexBuffer, d.segments, o.paint, e.transform.zoom, _);
              }
            }
          }

          a.viewport.set([0, 0, e.width, e.height]);
        } else "translucent" === e.renderPass && (e.context.setColorMode(e.colorModeForRenderPass()), function (e, i) {
          var o = e.context,
              r = o.gl,
              a = i.heatmapFbo;

          if (a) {
            o.activeTexture.set(r.TEXTURE0), r.bindTexture(r.TEXTURE_2D, a.colorAttachment.get()), o.activeTexture.set(r.TEXTURE1);
            var n = i.colorRampTexture;
            n || (n = i.colorRampTexture = new t.Texture(o, i.colorRamp, r.RGBA)), n.bind(r.LINEAR, r.CLAMP_TO_EDGE), e.useProgram("heatmapTexture").draw(o, r.TRIANGLES, Tt.disabled, It.disabled, e.colorModeForRenderPass(), St.disabled, Ci(e, i, 0, 1), i.id, e.viewportBuffer, e.quadTriangleIndexBuffer, e.viewportSegments, i.paint, e.transform.zoom);
          }
        }(e, o));
      },
      line: function (e, i, o, r) {
        if ("translucent" === e.renderPass) {
          var a = o.paint.get("line-opacity"),
              n = o.paint.get("line-width");

          if (0 !== a.constantOr(1) && 0 !== n.constantOr(1)) {
            var s = e.depthModeForSublayer(0, Tt.ReadOnly),
                l = e.colorModeForRenderPass(),
                c = o.paint.get("line-dasharray"),
                u = o.paint.get("line-pattern"),
                h = u.constantOr(1),
                p = o.paint.get("line-gradient"),
                d = o.getCrossfadeParameters(),
                _ = c ? "lineSDF" : h ? "linePattern" : p ? "lineGradient" : "line",
                f = e.context,
                m = f.gl,
                g = !0;

            if (p) {
              f.activeTexture.set(m.TEXTURE0);
              var v = o.gradientTexture;
              if (!o.gradient) return;
              v || (v = o.gradientTexture = new t.Texture(f, o.gradient, m.RGBA)), v.bind(m.LINEAR, m.CLAMP_TO_EDGE);
            }

            for (var y = 0, x = r; y < x.length; y += 1) {
              var b = x[y],
                  w = i.getTile(b);

              if (!h || w.patternsLoaded()) {
                var E = w.getBucket(o);

                if (E) {
                  var T = E.programConfigurations.get(o.id),
                      I = e.context.program.get(),
                      C = e.useProgram(_, T),
                      S = g || C.program !== I,
                      P = u.constantOr(null);

                  if (P && w.imageAtlas) {
                    var z = w.imageAtlas.patternPositions[P.to],
                        L = w.imageAtlas.patternPositions[P.from];
                    z && L && T.setConstantPatternPositions(z, L);
                  }

                  var D = c ? Ri(e, w, o, c, d) : h ? Mi(e, w, o, d) : p ? Di(e, w, o) : Li(e, w, o);
                  c && (S || e.lineAtlas.dirty) ? (f.activeTexture.set(m.TEXTURE0), e.lineAtlas.bind(f)) : h && (f.activeTexture.set(m.TEXTURE0), w.imageAtlasTexture.bind(m.LINEAR, m.CLAMP_TO_EDGE), T.updatePatternPaintBuffers(d)), C.draw(f, m.TRIANGLES, s, e.stencilModeForClipping(b), l, St.disabled, D, o.id, E.layoutVertexBuffer, E.indexBuffer, E.segments, o.paint, e.transform.zoom, T), g = !1;
                }
              }
            }
          }
        }
      },
      fill: function (e, i, o, r) {
        var a = o.paint.get("fill-color"),
            n = o.paint.get("fill-opacity");

        if (0 !== n.constantOr(1)) {
          var s = e.colorModeForRenderPass(),
              l = o.paint.get("fill-pattern"),
              c = e.opaquePassEnabledForLayer() && !l.constantOr(1) && 1 === a.constantOr(t.Color.transparent).a && 1 === n.constantOr(0) ? "opaque" : "translucent";

          if (e.renderPass === c) {
            var u = e.depthModeForSublayer(1, "opaque" === e.renderPass ? Tt.ReadWrite : Tt.ReadOnly);
            Ji(e, i, o, r, u, s, !1);
          }

          if ("translucent" === e.renderPass && o.paint.get("fill-antialias")) {
            var h = e.depthModeForSublayer(o.getPaintProperty("fill-outline-color") ? 2 : 0, Tt.ReadOnly);
            Ji(e, i, o, r, h, s, !0);
          }
        }
      },
      "fill-extrusion": function (t, e, i, o) {
        var r = i.paint.get("fill-extrusion-opacity");

        if (0 !== r && "translucent" === t.renderPass) {
          var a = new Tt(t.context.gl.LEQUAL, Tt.ReadWrite, t.depthRangeFor3D);
          if (1 !== r || i.paint.get("fill-extrusion-pattern").constantOr(1)) Qi(t, e, i, o, a, It.disabled, Ct.disabled), Qi(t, e, i, o, a, t.stencilModeFor3D(), t.colorModeForRenderPass());else {
            var n = t.colorModeForRenderPass();
            Qi(t, e, i, o, a, It.disabled, n);
          }
        }
      },
      hillshade: function (t, e, i, o) {
        if ("offscreen" === t.renderPass || "translucent" === t.renderPass) {
          for (var r = t.context, a = e.getSource().maxzoom, n = t.depthModeForSublayer(0, Tt.ReadOnly), s = It.disabled, l = t.colorModeForRenderPass(), c = 0, u = o; c < u.length; c += 1) {
            var h = u[c],
                p = e.getTile(h);
            p.needsHillshadePrepare && "offscreen" === t.renderPass ? to(t, p, i, a, n, s, l) : "translucent" === t.renderPass && $i(t, p, i, n, s, l);
          }

          r.viewport.set([0, 0, t.width, t.height]);
        }
      },
      raster: function (t, e, i, o) {
        if ("translucent" === t.renderPass && 0 !== i.paint.get("raster-opacity")) for (var r = t.context, a = r.gl, n = e.getSource(), s = t.useProgram("raster"), l = It.disabled, c = t.colorModeForRenderPass(), u = o.length && o[0].overscaledZ, h = !t.options.moving, p = 0, d = o; p < d.length; p += 1) {
          var _ = d[p],
              f = t.depthModeForSublayer(_.overscaledZ - u, 1 === i.paint.get("raster-opacity") ? Tt.ReadWrite : Tt.ReadOnly, a.LESS),
              m = e.getTile(_),
              g = t.transform.calculatePosMatrix(_.toUnwrapped(), h);
          m.registerFadeDuration(i.paint.get("raster-fade-duration"));
          var v = e.findLoadedParent(_, 0),
              y = eo(m, v, e, i, t.transform),
              x = void 0,
              b = void 0,
              w = "nearest" === i.paint.get("raster-resampling") ? a.NEAREST : a.LINEAR;
          r.activeTexture.set(a.TEXTURE0), m.texture.bind(w, a.CLAMP_TO_EDGE, a.LINEAR_MIPMAP_NEAREST), r.activeTexture.set(a.TEXTURE1), v ? (v.texture.bind(w, a.CLAMP_TO_EDGE, a.LINEAR_MIPMAP_NEAREST), x = Math.pow(2, v.tileID.overscaledZ - m.tileID.overscaledZ), b = [m.tileID.canonical.x * x % 1, m.tileID.canonical.y * x % 1]) : m.texture.bind(w, a.CLAMP_TO_EDGE, a.LINEAR_MIPMAP_NEAREST);
          var E = Bi(g, b || [0, 0], x || 1, y, i);
          n instanceof L ? s.draw(r, a.TRIANGLES, f, l, c, St.disabled, E, i.id, n.boundsBuffer, t.quadTriangleIndexBuffer, n.boundsSegments) : m.maskedBoundsBuffer && m.maskedIndexBuffer && m.segments ? s.draw(r, a.TRIANGLES, f, l, c, St.disabled, E, i.id, m.maskedBoundsBuffer, m.maskedIndexBuffer, m.segments, i.paint, t.transform.zoom) : s.draw(r, a.TRIANGLES, f, l, c, St.disabled, E, i.id, t.rasterBoundsBuffer, t.quadTriangleIndexBuffer, t.rasterBoundsSegments);
        }
      },
      background: function (t, e, i) {
        var o = i.paint.get("background-color"),
            r = i.paint.get("background-opacity");

        if (0 !== r) {
          var a = t.context,
              n = a.gl,
              s = t.transform,
              l = s.tileSize,
              c = i.paint.get("background-pattern");

          if (!t.isPatternMissing(c)) {
            var u = !c && 1 === o.a && 1 === r && t.opaquePassEnabledForLayer() ? "opaque" : "translucent";

            if (t.renderPass === u) {
              var h = It.disabled,
                  p = t.depthModeForSublayer(0, "opaque" === u ? Tt.ReadWrite : Tt.ReadOnly),
                  d = t.colorModeForRenderPass(),
                  _ = t.useProgram(c ? "backgroundPattern" : "background"),
                  f = s.coveringTiles({
                tileSize: l
              });

              c && (a.activeTexture.set(n.TEXTURE0), t.imageManager.bind(t.context));

              for (var m = i.getCrossfadeParameters(), g = 0, v = f; g < v.length; g += 1) {
                var y = v[g],
                    x = t.transform.calculatePosMatrix(y.toUnwrapped()),
                    b = c ? Zi(x, r, t, c, {
                  tileID: y,
                  tileSize: l
                }, m) : Ni(x, r, o);

                _.draw(a, n.TRIANGLES, p, h, d, St.disabled, b, i.id, t.tileExtentBuffer, t.quadTriangleIndexBuffer, t.tileExtentSegments);
              }
            }
          }
        }
      },
      debug: function (t, e, i) {
        for (var o = 0; o < i.length; o++) {
          io(t, e, i[o]);
        }
      },
      custom: function (t, e, i) {
        var o = t.context,
            r = i.implementation;

        if ("offscreen" === t.renderPass) {
          var a = r.prerender;
          a && (t.setCustomLayerDefaults(), o.setColorMode(t.colorModeForRenderPass()), a.call(r, o.gl, t.transform.customLayerMatrix()), o.setDirty(), t.setBaseState());
        } else if ("translucent" === t.renderPass) {
          t.setCustomLayerDefaults(), o.setColorMode(t.colorModeForRenderPass()), o.setStencilMode(It.disabled);
          var n = "3d" === r.renderingMode ? new Tt(t.context.gl.LEQUAL, Tt.ReadWrite, t.depthRangeFor3D) : t.depthModeForSublayer(0, Tt.ReadOnly);
          o.setDepthMode(n), r.render(o.gl, t.transform.customLayerMatrix()), o.setDirty(), t.setBaseState(), o.bindFramebuffer.set(null);
        }
      }
    },
        ao = function (e, i) {
      this.context = new Pt(e), this.transform = i, this._tileTextures = {}, this.setup(), this.numSublayers = zt.maxUnderzooming + zt.maxOverzooming + 1, this.depthEpsilon = 1 / Math.pow(2, 16), this.depthRboNeedsClear = !0, this.emptyProgramConfiguration = new t.ProgramConfiguration(), this.crossTileSymbolIndex = new Me();
    };

    function no(t, e) {
      if (t.y > e.y) {
        var i = t;
        t = e, e = i;
      }

      return {
        x0: t.x,
        y0: t.y,
        x1: e.x,
        y1: e.y,
        dx: e.x - t.x,
        dy: e.y - t.y
      };
    }

    function so(t, e, i, o, r) {
      var a = Math.max(i, Math.floor(e.y0)),
          n = Math.min(o, Math.ceil(e.y1));

      if (t.x0 === e.x0 && t.y0 === e.y0 ? t.x0 + e.dy / t.dy * t.dx < e.x1 : t.x1 - e.dy / t.dy * t.dx < e.x0) {
        var s = t;
        t = e, e = s;
      }

      for (var l = t.dx / t.dy, c = e.dx / e.dy, u = t.dx > 0, h = e.dx < 0, p = a; p < n; p++) {
        var d = l * Math.max(0, Math.min(t.dy, p + u - t.y0)) + t.x0,
            _ = c * Math.max(0, Math.min(e.dy, p + h - e.y0)) + e.x0;

        r(Math.floor(_), Math.ceil(d), p);
      }
    }

    function lo(t, e, i, o, r, a) {
      var n,
          s = no(t, e),
          l = no(e, i),
          c = no(i, t);
      s.dy > l.dy && (n = s, s = l, l = n), s.dy > c.dy && (n = s, s = c, c = n), l.dy > c.dy && (n = l, l = c, c = n), s.dy && so(c, s, o, r, a), l.dy && so(c, l, o, r, a);
    }

    ao.prototype.resize = function (e, i) {
      var o = this.context.gl;
      if (this.width = e * t.browser.devicePixelRatio, this.height = i * t.browser.devicePixelRatio, this.context.viewport.set([0, 0, this.width, this.height]), this.style) for (var r = 0, a = this.style._order; r < a.length; r += 1) {
        var n = a[r];

        this.style._layers[n].resize();
      }
      this.depthRbo && (o.deleteRenderbuffer(this.depthRbo), this.depthRbo = null);
    }, ao.prototype.setup = function () {
      var e = this.context,
          i = new t.StructArrayLayout2i4();
      i.emplaceBack(0, 0), i.emplaceBack(t.EXTENT, 0), i.emplaceBack(0, t.EXTENT), i.emplaceBack(t.EXTENT, t.EXTENT), this.tileExtentBuffer = e.createVertexBuffer(i, Oe.members), this.tileExtentSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2);
      var o = new t.StructArrayLayout2i4();
      o.emplaceBack(0, 0), o.emplaceBack(t.EXTENT, 0), o.emplaceBack(0, t.EXTENT), o.emplaceBack(t.EXTENT, t.EXTENT), this.debugBuffer = e.createVertexBuffer(o, Oe.members), this.debugSegments = t.SegmentVector.simpleSegment(0, 0, 4, 5);
      var r = new t.StructArrayLayout4i8();
      r.emplaceBack(0, 0, 0, 0), r.emplaceBack(t.EXTENT, 0, t.EXTENT, 0), r.emplaceBack(0, t.EXTENT, 0, t.EXTENT), r.emplaceBack(t.EXTENT, t.EXTENT, t.EXTENT, t.EXTENT), this.rasterBoundsBuffer = e.createVertexBuffer(r, t.rasterBoundsAttributes.members), this.rasterBoundsSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2);
      var a = new t.StructArrayLayout2i4();
      a.emplaceBack(0, 0), a.emplaceBack(1, 0), a.emplaceBack(0, 1), a.emplaceBack(1, 1), this.viewportBuffer = e.createVertexBuffer(a, Oe.members), this.viewportSegments = t.SegmentVector.simpleSegment(0, 0, 4, 2);
      var n = new t.StructArrayLayout1ui2();
      n.emplaceBack(0), n.emplaceBack(1), n.emplaceBack(3), n.emplaceBack(2), n.emplaceBack(0), this.tileBorderIndexBuffer = e.createIndexBuffer(n);
      var s = new t.StructArrayLayout3ui6();
      s.emplaceBack(0, 1, 2), s.emplaceBack(2, 1, 3), this.quadTriangleIndexBuffer = e.createIndexBuffer(s);
      var l = this.context.gl;
      this.stencilClearMode = new It({
        func: l.ALWAYS,
        mask: 0
      }, 0, 255, l.ZERO, l.ZERO, l.ZERO);
    }, ao.prototype.clearStencil = function () {
      var e = this.context,
          i = e.gl;
      this.nextStencilID = 1, this.currentStencilSource = void 0;
      var o = t.create();
      t.ortho(o, 0, this.width, this.height, 0, 0, 1), t.scale(o, o, [i.drawingBufferWidth, i.drawingBufferHeight, 0]), this.useProgram("clippingMask").draw(e, i.TRIANGLES, Tt.disabled, this.stencilClearMode, Ct.disabled, St.disabled, Ti(o), "$clipping", this.viewportBuffer, this.quadTriangleIndexBuffer, this.viewportSegments);
    }, ao.prototype._renderTileClippingMasks = function (t, e) {
      if (this.currentStencilSource !== t.source && t.isTileClipped() && e && e.length) {
        this.currentStencilSource = t.source;
        var i = this.context,
            o = i.gl;
        this.nextStencilID + e.length > 256 && this.clearStencil(), i.setColorMode(Ct.disabled), i.setDepthMode(Tt.disabled);
        var r = this.useProgram("clippingMask");
        this._tileClippingMaskIDs = {};

        for (var a = 0, n = e; a < n.length; a += 1) {
          var s = n[a],
              l = this._tileClippingMaskIDs[s.key] = this.nextStencilID++;
          r.draw(i, o.TRIANGLES, Tt.disabled, new It({
            func: o.ALWAYS,
            mask: 0
          }, l, 255, o.KEEP, o.KEEP, o.REPLACE), Ct.disabled, St.disabled, Ti(s.posMatrix), "$clipping", this.tileExtentBuffer, this.quadTriangleIndexBuffer, this.tileExtentSegments);
        }
      }
    }, ao.prototype.stencilModeFor3D = function () {
      this.nextStencilID + 1 > 256 && this.clearStencil();
      var t = this.nextStencilID++,
          e = this.context.gl;
      return new It({
        func: e.NOTEQUAL,
        mask: 255
      }, t, 255, e.KEEP, e.KEEP, e.REPLACE);
    }, ao.prototype.stencilModeForClipping = function (t) {
      var e = this.context.gl;
      return new It({
        func: e.EQUAL,
        mask: 255
      }, this._tileClippingMaskIDs[t.key], 0, e.KEEP, e.KEEP, e.REPLACE);
    }, ao.prototype.colorModeForRenderPass = function () {
      var e = this.context.gl;

      if (this._showOverdrawInspector) {
        return new Ct([e.CONSTANT_COLOR, e.ONE], new t.Color(1 / 8, 1 / 8, 1 / 8, 0), [!0, !0, !0, !0]);
      }

      return "opaque" === this.renderPass ? Ct.unblended : Ct.alphaBlended;
    }, ao.prototype.depthModeForSublayer = function (t, e, i) {
      if (!this.opaquePassEnabledForLayer()) return Tt.disabled;
      var o = 1 - ((1 + this.currentLayer) * this.numSublayers + t) * this.depthEpsilon;
      return new Tt(i || this.context.gl.LEQUAL, e, [o, o]);
    }, ao.prototype.opaquePassEnabledForLayer = function () {
      return this.currentLayer < this.opaquePassCutoff;
    }, ao.prototype.render = function (e, i) {
      this.style = e, this.options = i, this.lineAtlas = e.lineAtlas, this.imageManager = e.imageManager, this.glyphManager = e.glyphManager, this.symbolFadeChange = e.placement.symbolFadeChange(t.browser.now()), this.imageManager.beginFrame();
      var o = this.style._order,
          r = this.style.sourceCaches;

      for (var a in r) {
        var n = r[a];
        n.used && n.prepare(this.context);
      }

      var s = {},
          l = {},
          c = {};

      for (var u in r) {
        var h = r[u];
        s[u] = h.getVisibleCoordinates(), l[u] = s[u].slice().reverse(), c[u] = h.getVisibleCoordinates(!0).reverse();
      }

      for (var p in r) {
        var d = r[p],
            _ = d.getSource();

        if ("raster" === _.type || "raster-dem" === _.type) {
          for (var f = [], m = 0, g = s[p]; m < g.length; m += 1) {
            var v = g[m];
            f.push(d.getTile(v));
          }

          qi(f, this.context);
        }
      }

      this.opaquePassCutoff = 1 / 0;

      for (var y = 0; y < o.length; y++) {
        var x = o[y];

        if (this.style._layers[x].is3D()) {
          this.opaquePassCutoff = y;
          break;
        }
      }

      this.renderPass = "offscreen", this.depthRboNeedsClear = !0;

      for (var b = 0, w = o; b < w.length; b += 1) {
        var E = w[b],
            T = this.style._layers[E];

        if (T.hasOffscreenPass() && !T.isHidden(this.transform.zoom)) {
          var I = l[T.source];
          ("custom" === T.type || I.length) && this.renderLayer(this, r[T.source], T, I);
        }
      }

      for (this.context.bindFramebuffer.set(null), this.context.clear({
        color: i.showOverdrawInspector ? t.Color.black : t.Color.transparent,
        depth: 1
      }), this.clearStencil(), this._showOverdrawInspector = i.showOverdrawInspector, this.depthRangeFor3D = [0, 1 - (e._order.length + 2) * this.numSublayers * this.depthEpsilon], this.renderPass = "opaque", this.currentLayer = o.length - 1; this.currentLayer >= 0; this.currentLayer--) {
        var C = this.style._layers[o[this.currentLayer]],
            S = r[C.source],
            P = s[C.source];
        this._renderTileClippingMasks(C, P), this.renderLayer(this, S, C, P);
      }

      for (this.renderPass = "translucent", this.currentLayer = 0; this.currentLayer < o.length; this.currentLayer++) {
        var z = this.style._layers[o[this.currentLayer]],
            L = r[z.source],
            D = ("symbol" === z.type ? c : l)[z.source];
        this._renderTileClippingMasks(z, s[z.source]), this.renderLayer(this, L, z, D);
      }

      if (this.options.showTileBoundaries) for (var M in r) {
        ro.debug(this, r[M], s[M]);
        break;
      }
      this.context.setDefault();
    }, ao.prototype.setupOffscreenDepthRenderbuffer = function () {
      var t = this.context;
      this.depthRbo || (this.depthRbo = t.createRenderbuffer(t.gl.DEPTH_COMPONENT16, this.width, this.height));
    }, ao.prototype.renderLayer = function (t, e, i, o) {
      i.isHidden(this.transform.zoom) || ("background" === i.type || "custom" === i.type || o.length) && (this.id = i.id, ro[i.type](t, e, i, o, this.style.placement.variableOffsets));
    }, ao.prototype.translatePosMatrix = function (e, i, o, r, a) {
      if (!o[0] && !o[1]) return e;
      var n = a ? "map" === r ? this.transform.angle : 0 : "viewport" === r ? -this.transform.angle : 0;

      if (n) {
        var s = Math.sin(n),
            l = Math.cos(n);
        o = [o[0] * l - o[1] * s, o[0] * s + o[1] * l];
      }

      var c = [a ? o[0] : ce(i, o[0], this.transform.zoom), a ? o[1] : ce(i, o[1], this.transform.zoom), 0],
          u = new Float32Array(16);
      return t.translate(u, e, c), u;
    }, ao.prototype.saveTileTexture = function (t) {
      var e = this._tileTextures[t.size[0]];
      e ? e.push(t) : this._tileTextures[t.size[0]] = [t];
    }, ao.prototype.getTileTexture = function (t) {
      var e = this._tileTextures[t];
      return e && e.length > 0 ? e.pop() : null;
    }, ao.prototype.isPatternMissing = function (t) {
      if (!t) return !1;
      var e = this.imageManager.getPattern(t.from),
          i = this.imageManager.getPattern(t.to);
      return !e || !i;
    }, ao.prototype.useProgram = function (t, e) {
      void 0 === e && (e = this.emptyProgramConfiguration), this.cache = this.cache || {};
      var i = "" + t + (e.cacheKey || "") + (this._showOverdrawInspector ? "/overdraw" : "");
      return this.cache[i] || (this.cache[i] = new pi(this.context, ui[t], e, ji[t], this._showOverdrawInspector)), this.cache[i];
    }, ao.prototype.setCustomLayerDefaults = function () {
      this.context.unbindVAO(), this.context.cullFace.setDefault(), this.context.activeTexture.setDefault(), this.context.pixelStoreUnpack.setDefault(), this.context.pixelStoreUnpackPremultiplyAlpha.setDefault(), this.context.pixelStoreUnpackFlipY.setDefault();
    }, ao.prototype.setBaseState = function () {
      var t = this.context.gl;
      this.context.cullFace.set(!1), this.context.viewport.set([0, 0, this.width, this.height]), this.context.blendEquation.set(t.FUNC_ADD);
    };

    var co = function (e, i, o) {
      this.tileSize = 512, this.maxValidLatitude = 85.051129, this._renderWorldCopies = void 0 === o || o, this._minZoom = e || 0, this._maxZoom = i || 22, this.setMaxBounds(), this.width = 0, this.height = 0, this._center = new t.LngLat(0, 0), this.zoom = 0, this.angle = 0, this._fov = .6435011087932844, this._pitch = 0, this._unmodified = !0, this._posMatrixCache = {}, this._alignedPosMatrixCache = {};
    },
        uo = {
      minZoom: {
        configurable: !0
      },
      maxZoom: {
        configurable: !0
      },
      renderWorldCopies: {
        configurable: !0
      },
      worldSize: {
        configurable: !0
      },
      centerPoint: {
        configurable: !0
      },
      size: {
        configurable: !0
      },
      bearing: {
        configurable: !0
      },
      pitch: {
        configurable: !0
      },
      fov: {
        configurable: !0
      },
      zoom: {
        configurable: !0
      },
      center: {
        configurable: !0
      },
      unmodified: {
        configurable: !0
      },
      point: {
        configurable: !0
      }
    };

    co.prototype.clone = function () {
      var t = new co(this._minZoom, this._maxZoom, this._renderWorldCopies);
      return t.tileSize = this.tileSize, t.latRange = this.latRange, t.width = this.width, t.height = this.height, t._center = this._center, t.zoom = this.zoom, t.angle = this.angle, t._fov = this._fov, t._pitch = this._pitch, t._unmodified = this._unmodified, t._calcMatrices(), t;
    }, uo.minZoom.get = function () {
      return this._minZoom;
    }, uo.minZoom.set = function (t) {
      this._minZoom !== t && (this._minZoom = t, this.zoom = Math.max(this.zoom, t));
    }, uo.maxZoom.get = function () {
      return this._maxZoom;
    }, uo.maxZoom.set = function (t) {
      this._maxZoom !== t && (this._maxZoom = t, this.zoom = Math.min(this.zoom, t));
    }, uo.renderWorldCopies.get = function () {
      return this._renderWorldCopies;
    }, uo.renderWorldCopies.set = function (t) {
      void 0 === t ? t = !0 : null === t && (t = !1), this._renderWorldCopies = t;
    }, uo.worldSize.get = function () {
      return this.tileSize * this.scale;
    }, uo.centerPoint.get = function () {
      return this.size._div(2);
    }, uo.size.get = function () {
      return new t.Point(this.width, this.height);
    }, uo.bearing.get = function () {
      return -this.angle / Math.PI * 180;
    }, uo.bearing.set = function (e) {
      var i = -t.wrap(e, -180, 180) * Math.PI / 180;
      this.angle !== i && (this._unmodified = !1, this.angle = i, this._calcMatrices(), this.rotationMatrix = t.create$2(), t.rotate(this.rotationMatrix, this.rotationMatrix, this.angle));
    }, uo.pitch.get = function () {
      return this._pitch / Math.PI * 180;
    }, uo.pitch.set = function (e) {
      var i = t.clamp(e, 0, 60) / 180 * Math.PI;
      this._pitch !== i && (this._unmodified = !1, this._pitch = i, this._calcMatrices());
    }, uo.fov.get = function () {
      return this._fov / Math.PI * 180;
    }, uo.fov.set = function (t) {
      t = Math.max(.01, Math.min(60, t)), this._fov !== t && (this._unmodified = !1, this._fov = t / 180 * Math.PI, this._calcMatrices());
    }, uo.zoom.get = function () {
      return this._zoom;
    }, uo.zoom.set = function (t) {
      var e = Math.min(Math.max(t, this.minZoom), this.maxZoom);
      this._zoom !== e && (this._unmodified = !1, this._zoom = e, this.scale = this.zoomScale(e), this.tileZoom = Math.floor(e), this.zoomFraction = e - this.tileZoom, this._constrain(), this._calcMatrices());
    }, uo.center.get = function () {
      return this._center;
    }, uo.center.set = function (t) {
      t.lat === this._center.lat && t.lng === this._center.lng || (this._unmodified = !1, this._center = t, this._constrain(), this._calcMatrices());
    }, co.prototype.coveringZoomLevel = function (t) {
      return (t.roundZoom ? Math.round : Math.floor)(this.zoom + this.scaleZoom(this.tileSize / t.tileSize));
    }, co.prototype.getVisibleUnwrappedCoordinates = function (e) {
      var i = [new t.UnwrappedTileID(0, e)];
      if (this._renderWorldCopies) for (var o = this.pointCoordinate(new t.Point(0, 0)), r = this.pointCoordinate(new t.Point(this.width, 0)), a = this.pointCoordinate(new t.Point(this.width, this.height)), n = this.pointCoordinate(new t.Point(0, this.height)), s = Math.floor(Math.min(o.x, r.x, a.x, n.x)), l = Math.floor(Math.max(o.x, r.x, a.x, n.x)), c = s - 1; c <= l + 1; c++) {
        0 !== c && i.push(new t.UnwrappedTileID(c, e));
      }
      return i;
    }, co.prototype.coveringTiles = function (e) {
      var i = this.coveringZoomLevel(e),
          o = i;
      if (void 0 !== e.minzoom && i < e.minzoom) return [];
      void 0 !== e.maxzoom && i > e.maxzoom && (i = e.maxzoom);
      var r = t.MercatorCoordinate.fromLngLat(this.center),
          a = Math.pow(2, i),
          n = new t.Point(a * r.x - .5, a * r.y - .5);
      return function (e, i, o, r) {
        void 0 === r && (r = !0);
        var a = 1 << e,
            n = {};

        function s(i, s, l) {
          var c, u, h, p;
          if (l >= 0 && l <= a) for (c = i; c < s; c++) {
            u = Math.floor(c / a), h = (c % a + a) % a, 0 !== u && !0 !== r || (p = new t.OverscaledTileID(o, u, e, h, l), n[p.key] = p);
          }
        }

        var l = i.map(function (e) {
          return new t.Point(e.x, e.y)._mult(a);
        });
        return lo(l[0], l[1], l[2], 0, a, s), lo(l[2], l[3], l[0], 0, a, s), Object.keys(n).map(function (t) {
          return n[t];
        });
      }(i, [this.pointCoordinate(new t.Point(0, 0)), this.pointCoordinate(new t.Point(this.width, 0)), this.pointCoordinate(new t.Point(this.width, this.height)), this.pointCoordinate(new t.Point(0, this.height))], e.reparseOverscaled ? o : i, this._renderWorldCopies).sort(function (t, e) {
        return n.dist(t.canonical) - n.dist(e.canonical);
      });
    }, co.prototype.resize = function (t, e) {
      this.width = t, this.height = e, this.pixelsToGLUnits = [2 / t, -2 / e], this._constrain(), this._calcMatrices();
    }, uo.unmodified.get = function () {
      return this._unmodified;
    }, co.prototype.zoomScale = function (t) {
      return Math.pow(2, t);
    }, co.prototype.scaleZoom = function (t) {
      return Math.log(t) / Math.LN2;
    }, co.prototype.project = function (e) {
      var i = t.clamp(e.lat, -this.maxValidLatitude, this.maxValidLatitude);
      return new t.Point(t.mercatorXfromLng(e.lng) * this.worldSize, t.mercatorYfromLat(i) * this.worldSize);
    }, co.prototype.unproject = function (e) {
      return new t.MercatorCoordinate(e.x / this.worldSize, e.y / this.worldSize).toLngLat();
    }, uo.point.get = function () {
      return this.project(this.center);
    }, co.prototype.setLocationAtPoint = function (e, i) {
      var o = this.pointCoordinate(i),
          r = this.pointCoordinate(this.centerPoint),
          a = this.locationCoordinate(e),
          n = new t.MercatorCoordinate(a.x - (o.x - r.x), a.y - (o.y - r.y));
      this.center = this.coordinateLocation(n), this._renderWorldCopies && (this.center = this.center.wrap());
    }, co.prototype.locationPoint = function (t) {
      return this.coordinatePoint(this.locationCoordinate(t));
    }, co.prototype.pointLocation = function (t) {
      return this.coordinateLocation(this.pointCoordinate(t));
    }, co.prototype.locationCoordinate = function (e) {
      return t.MercatorCoordinate.fromLngLat(e);
    }, co.prototype.coordinateLocation = function (t) {
      return t.toLngLat();
    }, co.prototype.pointCoordinate = function (e) {
      var i = [e.x, e.y, 0, 1],
          o = [e.x, e.y, 1, 1];
      t.transformMat4(i, i, this.pixelMatrixInverse), t.transformMat4(o, o, this.pixelMatrixInverse);
      var r = i[3],
          a = o[3],
          n = i[0] / r,
          s = o[0] / a,
          l = i[1] / r,
          c = o[1] / a,
          u = i[2] / r,
          h = o[2] / a,
          p = u === h ? 0 : (0 - u) / (h - u);
      return new t.MercatorCoordinate(t.number(n, s, p) / this.worldSize, t.number(l, c, p) / this.worldSize);
    }, co.prototype.coordinatePoint = function (e) {
      var i = [e.x * this.worldSize, e.y * this.worldSize, 0, 1];
      return t.transformMat4(i, i, this.pixelMatrix), new t.Point(i[0] / i[3], i[1] / i[3]);
    }, co.prototype.getBounds = function () {
      return new t.LngLatBounds().extend(this.pointLocation(new t.Point(0, 0))).extend(this.pointLocation(new t.Point(this.width, 0))).extend(this.pointLocation(new t.Point(this.width, this.height))).extend(this.pointLocation(new t.Point(0, this.height)));
    }, co.prototype.getMaxBounds = function () {
      return this.latRange && 2 === this.latRange.length && this.lngRange && 2 === this.lngRange.length ? new t.LngLatBounds([this.lngRange[0], this.latRange[0]], [this.lngRange[1], this.latRange[1]]) : null;
    }, co.prototype.setMaxBounds = function (t) {
      t ? (this.lngRange = [t.getWest(), t.getEast()], this.latRange = [t.getSouth(), t.getNorth()], this._constrain()) : (this.lngRange = null, this.latRange = [-this.maxValidLatitude, this.maxValidLatitude]);
    }, co.prototype.calculatePosMatrix = function (e, i) {
      void 0 === i && (i = !1);
      var o = e.key,
          r = i ? this._alignedPosMatrixCache : this._posMatrixCache;
      if (r[o]) return r[o];
      var a = e.canonical,
          n = this.worldSize / this.zoomScale(a.z),
          s = a.x + Math.pow(2, a.z) * e.wrap,
          l = t.identity(new Float64Array(16));
      return t.translate(l, l, [s * n, a.y * n, 0]), t.scale(l, l, [n / t.EXTENT, n / t.EXTENT, 1]), t.multiply(l, i ? this.alignedProjMatrix : this.projMatrix, l), r[o] = new Float32Array(l), r[o];
    }, co.prototype.customLayerMatrix = function () {
      return this.mercatorMatrix.slice();
    }, co.prototype._constrain = function () {
      if (this.center && this.width && this.height && !this._constraining) {
        this._constraining = !0;
        var e,
            i,
            o,
            r,
            a = -90,
            n = 90,
            s = -180,
            l = 180,
            c = this.size,
            u = this._unmodified;

        if (this.latRange) {
          var h = this.latRange;
          a = t.mercatorYfromLat(h[1]) * this.worldSize, e = (n = t.mercatorYfromLat(h[0]) * this.worldSize) - a < c.y ? c.y / (n - a) : 0;
        }

        if (this.lngRange) {
          var p = this.lngRange;
          s = t.mercatorXfromLng(p[0]) * this.worldSize, i = (l = t.mercatorXfromLng(p[1]) * this.worldSize) - s < c.x ? c.x / (l - s) : 0;
        }

        var d = this.point,
            _ = Math.max(i || 0, e || 0);

        if (_) return this.center = this.unproject(new t.Point(i ? (l + s) / 2 : d.x, e ? (n + a) / 2 : d.y)), this.zoom += this.scaleZoom(_), this._unmodified = u, void (this._constraining = !1);

        if (this.latRange) {
          var f = d.y,
              m = c.y / 2;
          f - m < a && (r = a + m), f + m > n && (r = n - m);
        }

        if (this.lngRange) {
          var g = d.x,
              v = c.x / 2;
          g - v < s && (o = s + v), g + v > l && (o = l - v);
        }

        void 0 === o && void 0 === r || (this.center = this.unproject(new t.Point(void 0 !== o ? o : d.x, void 0 !== r ? r : d.y))), this._unmodified = u, this._constraining = !1;
      }
    }, co.prototype._calcMatrices = function () {
      if (this.height) {
        this.cameraToCenterDistance = .5 / Math.tan(this._fov / 2) * this.height;
        var e = this._fov / 2,
            i = Math.PI / 2 + this._pitch,
            o = Math.sin(e) * this.cameraToCenterDistance / Math.sin(Math.PI - i - e),
            r = this.point,
            a = r.x,
            n = r.y,
            s = 1.01 * (Math.cos(Math.PI / 2 - this._pitch) * o + this.cameraToCenterDistance),
            l = new Float64Array(16);
        t.perspective(l, this._fov, this.width / this.height, 1, s), t.scale(l, l, [1, -1, 1]), t.translate(l, l, [0, 0, -this.cameraToCenterDistance]), t.rotateX(l, l, this._pitch), t.rotateZ(l, l, this.angle), t.translate(l, l, [-a, -n, 0]), this.mercatorMatrix = t.scale([], l, [this.worldSize, this.worldSize, this.worldSize]), t.scale(l, l, [1, 1, t.mercatorZfromAltitude(1, this.center.lat) * this.worldSize, 1]), this.projMatrix = l;

        var c = this.width % 2 / 2,
            u = this.height % 2 / 2,
            h = Math.cos(this.angle),
            p = Math.sin(this.angle),
            d = a - Math.round(a) + h * c + p * u,
            _ = n - Math.round(n) + h * u + p * c,
            f = new Float64Array(l);

        if (t.translate(f, f, [d > .5 ? d - 1 : d, _ > .5 ? _ - 1 : _, 0]), this.alignedProjMatrix = f, l = t.create(), t.scale(l, l, [this.width / 2, -this.height / 2, 1]), t.translate(l, l, [1, -1, 0]), this.labelPlaneMatrix = l, l = t.create(), t.scale(l, l, [1, -1, 1]), t.translate(l, l, [-1, -1, 0]), t.scale(l, l, [2 / this.width, 2 / this.height, 1]), this.glCoordMatrix = l, this.pixelMatrix = t.multiply(new Float64Array(16), this.labelPlaneMatrix, this.projMatrix), !(l = t.invert(new Float64Array(16), this.pixelMatrix))) throw new Error("failed to invert matrix");
        this.pixelMatrixInverse = l, this._posMatrixCache = {}, this._alignedPosMatrixCache = {};
      }
    }, co.prototype.maxPitchScaleFactor = function () {
      if (!this.pixelMatrixInverse) return 1;
      var e = this.pointCoordinate(new t.Point(0, 0)),
          i = [e.x * this.worldSize, e.y * this.worldSize, 0, 1];
      return t.transformMat4(i, i, this.pixelMatrix)[3] / this.cameraToCenterDistance;
    }, co.prototype.getCameraPoint = function () {
      var e = this._pitch,
          i = Math.tan(e) * (this.cameraToCenterDistance || 1);
      return this.centerPoint.add(new t.Point(0, i));
    }, co.prototype.getCameraQueryGeometry = function (e) {
      var i = this.getCameraPoint();
      if (1 === e.length) return [e[0], i];

      for (var o = i.x, r = i.y, a = i.x, n = i.y, s = 0, l = e; s < l.length; s += 1) {
        var c = l[s];
        o = Math.min(o, c.x), r = Math.min(r, c.y), a = Math.max(a, c.x), n = Math.max(n, c.y);
      }

      return [new t.Point(o, r), new t.Point(a, r), new t.Point(a, n), new t.Point(o, n), new t.Point(o, r)];
    }, Object.defineProperties(co.prototype, uo);

    var ho = function () {
      var e, i, o, r, a;
      t.bindAll(["_onHashChange", "_updateHash"], this), this._updateHash = (e = this._updateHashUnthrottled.bind(this), i = 300, o = !1, r = null, a = function () {
        r = null, o && (e(), r = setTimeout(a, i), o = !1);
      }, function () {
        return o = !0, r || a(), r;
      });
    };

    ho.prototype.addTo = function (e) {
      return this._map = e, t.window.addEventListener("hashchange", this._onHashChange, !1), this._map.on("moveend", this._updateHash), this;
    }, ho.prototype.remove = function () {
      return t.window.removeEventListener("hashchange", this._onHashChange, !1), this._map.off("moveend", this._updateHash), clearTimeout(this._updateHash()), delete this._map, this;
    }, ho.prototype.getHashString = function (t) {
      var e = this._map.getCenter(),
          i = Math.round(100 * this._map.getZoom()) / 100,
          o = Math.ceil((i * Math.LN2 + Math.log(512 / 360 / .5)) / Math.LN10),
          r = Math.pow(10, o),
          a = Math.round(e.lng * r) / r,
          n = Math.round(e.lat * r) / r,
          s = this._map.getBearing(),
          l = this._map.getPitch(),
          c = "";

      return c += t ? "#/" + a + "/" + n + "/" + i : "#" + i + "/" + n + "/" + a, (s || l) && (c += "/" + Math.round(10 * s) / 10), l && (c += "/" + Math.round(l)), c;
    }, ho.prototype._onHashChange = function () {
      var e = t.window.location.hash.replace("#", "").split("/");
      return e.length >= 3 && (this._map.jumpTo({
        center: [+e[2], +e[1]],
        zoom: +e[0],
        bearing: +(e[3] || 0),
        pitch: +(e[4] || 0)
      }), !0);
    }, ho.prototype._updateHashUnthrottled = function () {
      var e = this.getHashString();

      try {
        t.window.history.replaceState(t.window.history.state, "", e);
      } catch (t) {}
    };

    var po = function (e) {
      function o(o, r, a, n) {
        void 0 === n && (n = {});
        var s = i.mousePos(r.getCanvasContainer(), a),
            l = r.unproject(s);
        e.call(this, o, t.extend({
          point: s,
          lngLat: l,
          originalEvent: a
        }, n)), this._defaultPrevented = !1, this.target = r;
      }

      e && (o.__proto__ = e), o.prototype = Object.create(e && e.prototype), o.prototype.constructor = o;
      var r = {
        defaultPrevented: {
          configurable: !0
        }
      };
      return o.prototype.preventDefault = function () {
        this._defaultPrevented = !0;
      }, r.defaultPrevented.get = function () {
        return this._defaultPrevented;
      }, Object.defineProperties(o.prototype, r), o;
    }(t.Event),
        _o = function (e) {
      function o(o, r, a) {
        var n = i.touchPos(r.getCanvasContainer(), a),
            s = n.map(function (t) {
          return r.unproject(t);
        }),
            l = n.reduce(function (t, e, i, o) {
          return t.add(e.div(o.length));
        }, new t.Point(0, 0)),
            c = r.unproject(l);
        e.call(this, o, {
          points: n,
          point: l,
          lngLats: s,
          lngLat: c,
          originalEvent: a
        }), this._defaultPrevented = !1;
      }

      e && (o.__proto__ = e), o.prototype = Object.create(e && e.prototype), o.prototype.constructor = o;
      var r = {
        defaultPrevented: {
          configurable: !0
        }
      };
      return o.prototype.preventDefault = function () {
        this._defaultPrevented = !0;
      }, r.defaultPrevented.get = function () {
        return this._defaultPrevented;
      }, Object.defineProperties(o.prototype, r), o;
    }(t.Event),
        fo = function (t) {
      function e(e, i, o) {
        t.call(this, e, {
          originalEvent: o
        }), this._defaultPrevented = !1;
      }

      t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e;
      var i = {
        defaultPrevented: {
          configurable: !0
        }
      };
      return e.prototype.preventDefault = function () {
        this._defaultPrevented = !0;
      }, i.defaultPrevented.get = function () {
        return this._defaultPrevented;
      }, Object.defineProperties(e.prototype, i), e;
    }(t.Event),
        mo = function (e) {
      this._map = e, this._el = e.getCanvasContainer(), this._delta = 0, this._defaultZoomRate = .01, this._wheelZoomRate = 1 / 450, t.bindAll(["_onWheel", "_onTimeout", "_onScrollFrame", "_onScrollFinished"], this);
    };

    mo.prototype.setZoomRate = function (t) {
      this._defaultZoomRate = t;
    }, mo.prototype.setWheelZoomRate = function (t) {
      this._wheelZoomRate = t;
    }, mo.prototype.isEnabled = function () {
      return !!this._enabled;
    }, mo.prototype.isActive = function () {
      return !!this._active;
    }, mo.prototype.isZooming = function () {
      return !!this._zooming;
    }, mo.prototype.enable = function (t) {
      this.isEnabled() || (this._enabled = !0, this._aroundCenter = t && "center" === t.around);
    }, mo.prototype.disable = function () {
      this.isEnabled() && (this._enabled = !1);
    }, mo.prototype.onWheel = function (e) {
      if (this.isEnabled()) {
        var i = e.deltaMode === t.window.WheelEvent.DOM_DELTA_LINE ? 40 * e.deltaY : e.deltaY,
            o = t.browser.now(),
            r = o - (this._lastWheelEventTime || 0);
        this._lastWheelEventTime = o, 0 !== i && i % 4.000244140625 == 0 ? this._type = "wheel" : 0 !== i && Math.abs(i) < 4 ? this._type = "trackpad" : r > 400 ? (this._type = null, this._lastValue = i, this._timeout = setTimeout(this._onTimeout, 40, e)) : this._type || (this._type = Math.abs(r * i) < 200 ? "trackpad" : "wheel", this._timeout && (clearTimeout(this._timeout), this._timeout = null, i += this._lastValue)), e.shiftKey && i && (i /= 4), this._type && (this._lastWheelEvent = e, this._delta -= i, this.isActive() || this._start(e)), e.preventDefault();
      }
    }, mo.prototype._onTimeout = function (t) {
      this._type = "wheel", this._delta -= this._lastValue, this.isActive() || this._start(t);
    }, mo.prototype._start = function (e) {
      if (this._delta) {
        this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), this._active = !0, this.isZooming() || (this._zooming = !0, this._map.fire(new t.Event("movestart", {
          originalEvent: e
        })), this._map.fire(new t.Event("zoomstart", {
          originalEvent: e
        }))), this._finishTimeout && clearTimeout(this._finishTimeout);
        var o = i.mousePos(this._el, e);
        this._around = t.LngLat.convert(this._aroundCenter ? this._map.getCenter() : this._map.unproject(o)), this._aroundPoint = this._map.transform.locationPoint(this._around), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onScrollFrame));
      }
    }, mo.prototype._onScrollFrame = function () {
      var e = this;

      if (this._frameId = null, this.isActive()) {
        var i = this._map.transform;

        if (0 !== this._delta) {
          var o = "wheel" === this._type && Math.abs(this._delta) > 4.000244140625 ? this._wheelZoomRate : this._defaultZoomRate,
              r = 2 / (1 + Math.exp(-Math.abs(this._delta * o)));
          this._delta < 0 && 0 !== r && (r = 1 / r);
          var a = "number" == typeof this._targetZoom ? i.zoomScale(this._targetZoom) : i.scale;
          this._targetZoom = Math.min(i.maxZoom, Math.max(i.minZoom, i.scaleZoom(a * r))), "wheel" === this._type && (this._startZoom = i.zoom, this._easing = this._smoothOutEasing(200)), this._delta = 0;
        }

        var n = "number" == typeof this._targetZoom ? this._targetZoom : i.zoom,
            s = this._startZoom,
            l = this._easing,
            c = !1;

        if ("wheel" === this._type && s && l) {
          var u = Math.min((t.browser.now() - this._lastWheelEventTime) / 200, 1),
              h = l(u);
          i.zoom = t.number(s, n, h), u < 1 ? this._frameId || (this._frameId = this._map._requestRenderFrame(this._onScrollFrame)) : c = !0;
        } else i.zoom = n, c = !0;

        i.setLocationAtPoint(this._around, this._aroundPoint), this._map.fire(new t.Event("move", {
          originalEvent: this._lastWheelEvent
        })), this._map.fire(new t.Event("zoom", {
          originalEvent: this._lastWheelEvent
        })), c && (this._active = !1, this._finishTimeout = setTimeout(function () {
          e._zooming = !1, e._map.fire(new t.Event("zoomend", {
            originalEvent: e._lastWheelEvent
          })), e._map.fire(new t.Event("moveend", {
            originalEvent: e._lastWheelEvent
          })), delete e._targetZoom;
        }, 200));
      }
    }, mo.prototype._smoothOutEasing = function (e) {
      var i = t.ease;

      if (this._prevEase) {
        var o = this._prevEase,
            r = (t.browser.now() - o.start) / o.duration,
            a = o.easing(r + .01) - o.easing(r),
            n = .27 / Math.sqrt(a * a + 1e-4) * .01,
            s = Math.sqrt(.0729 - n * n);
        i = t.bezier(n, s, .25, 1);
      }

      return this._prevEase = {
        start: t.browser.now(),
        duration: e,
        easing: i
      }, i;
    };

    var go = function (e, i) {
      this._map = e, this._el = e.getCanvasContainer(), this._container = e.getContainer(), this._clickTolerance = i.clickTolerance || 1, t.bindAll(["_onMouseMove", "_onMouseUp", "_onKeyDown"], this);
    };

    go.prototype.isEnabled = function () {
      return !!this._enabled;
    }, go.prototype.isActive = function () {
      return !!this._active;
    }, go.prototype.enable = function () {
      this.isEnabled() || (this._enabled = !0);
    }, go.prototype.disable = function () {
      this.isEnabled() && (this._enabled = !1);
    }, go.prototype.onMouseDown = function (e) {
      this.isEnabled() && e.shiftKey && 0 === e.button && (t.window.document.addEventListener("mousemove", this._onMouseMove, !1), t.window.document.addEventListener("keydown", this._onKeyDown, !1), t.window.document.addEventListener("mouseup", this._onMouseUp, !1), i.disableDrag(), this._startPos = this._lastPos = i.mousePos(this._el, e), this._active = !0);
    }, go.prototype._onMouseMove = function (t) {
      var e = i.mousePos(this._el, t);

      if (!(this._lastPos.equals(e) || !this._box && e.dist(this._startPos) < this._clickTolerance)) {
        var o = this._startPos;
        this._lastPos = e, this._box || (this._box = i.create("div", "mapboxgl-boxzoom", this._container), this._container.classList.add("mapboxgl-crosshair"), this._fireEvent("boxzoomstart", t));
        var r = Math.min(o.x, e.x),
            a = Math.max(o.x, e.x),
            n = Math.min(o.y, e.y),
            s = Math.max(o.y, e.y);
        i.setTransform(this._box, "translate(" + r + "px," + n + "px)"), this._box.style.width = a - r + "px", this._box.style.height = s - n + "px";
      }
    }, go.prototype._onMouseUp = function (e) {
      if (0 === e.button) {
        var o = this._startPos,
            r = i.mousePos(this._el, e);
        this._finish(), i.suppressClick(), o.x === r.x && o.y === r.y ? this._fireEvent("boxzoomcancel", e) : this._map.fitScreenCoordinates(o, r, this._map.getBearing(), {
          linear: !0
        }).fire(new t.Event("boxzoomend", {
          originalEvent: e
        }));
      }
    }, go.prototype._onKeyDown = function (t) {
      27 === t.keyCode && (this._finish(), this._fireEvent("boxzoomcancel", t));
    }, go.prototype._finish = function () {
      this._active = !1, t.window.document.removeEventListener("mousemove", this._onMouseMove, !1), t.window.document.removeEventListener("keydown", this._onKeyDown, !1), t.window.document.removeEventListener("mouseup", this._onMouseUp, !1), this._container.classList.remove("mapboxgl-crosshair"), this._box && (i.remove(this._box), this._box = null), i.enableDrag(), delete this._startPos, delete this._lastPos;
    }, go.prototype._fireEvent = function (e, i) {
      return this._map.fire(new t.Event(e, {
        originalEvent: i
      }));
    };

    var vo = t.bezier(0, 0, .25, 1),
        yo = function (e, i) {
      this._map = e, this._el = i.element || e.getCanvasContainer(), this._state = "disabled", this._button = i.button || "right", this._bearingSnap = i.bearingSnap || 0, this._pitchWithRotate = !1 !== i.pitchWithRotate, t.bindAll(["onMouseDown", "_onMouseMove", "_onMouseUp", "_onBlur", "_onDragFrame"], this);
    };

    yo.prototype.isEnabled = function () {
      return "disabled" !== this._state;
    }, yo.prototype.isActive = function () {
      return "active" === this._state;
    }, yo.prototype.enable = function () {
      this.isEnabled() || (this._state = "enabled");
    }, yo.prototype.disable = function () {
      if (this.isEnabled()) switch (this._state) {
        case "active":
          this._state = "disabled", this._unbind(), this._deactivate(), this._fireEvent("rotateend"), this._pitchWithRotate && this._fireEvent("pitchend"), this._fireEvent("moveend");
          break;

        case "pending":
          this._state = "disabled", this._unbind();
          break;

        default:
          this._state = "disabled";
      }
    }, yo.prototype.onMouseDown = function (e) {
      if ("enabled" === this._state) {
        var o = "touchstart" === e.type;
        if (o) this._startTime = Date.now();else if ("right" === this._button) {
          if (this._eventButton = i.mouseButton(e), this._eventButton !== (e.ctrlKey ? 0 : 2)) return;
        } else {
          if (e.ctrlKey || 0 !== i.mouseButton(e)) return;
          this._eventButton = 0;
        }
        i.disableDrag(), o ? (t.window.document.addEventListener("touchmove", this._onMouseMove, {
          capture: !0
        }), t.window.document.addEventListener("touchend", this._onMouseUp)) : (t.window.document.addEventListener("mousemove", this._onMouseMove, {
          capture: !0
        }), t.window.document.addEventListener("mouseup", this._onMouseUp)), t.window.addEventListener("blur", this._onBlur), this._state = "pending", this._inertia = [[t.browser.now(), this._map.getBearing()]], this._startPos = this._prevPos = this._lastPos = i.mousePos(this._el, e), this._center = this._map.transform.centerPoint, e.preventDefault();
      }
    }, yo.prototype._onMouseMove = function (t) {
      var e = i.mousePos(this._el, t);
      this._lastPos.equals(e) || (this._lastMoveEvent = t, this._lastPos = e, "pending" === this._state && (this._state = "active", this._fireEvent("rotatestart", t), this._fireEvent("movestart", t), this._pitchWithRotate && this._fireEvent("pitchstart", t)), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onDragFrame)));
    }, yo.prototype._onDragFrame = function () {
      this._frameId = null;
      var e = this._lastMoveEvent;

      if (e) {
        var i = this._map.transform,
            o = this._prevPos,
            r = this._lastPos,
            a = .8 * (o.x - r.x),
            n = -.5 * (o.y - r.y),
            s = i.bearing - a,
            l = i.pitch - n,
            c = this._inertia,
            u = c[c.length - 1];
        this._drainInertiaBuffer(), c.push([t.browser.now(), this._map._normalizeBearing(s, u[1])]), i.bearing = s, this._pitchWithRotate && (this._fireEvent("pitch", e), i.pitch = l), this._fireEvent("rotate", e), this._fireEvent("move", e), delete this._lastMoveEvent, this._prevPos = this._lastPos;
      }
    }, yo.prototype._onMouseUp = function (t) {
      if ("touchend" === t.type && this._startPos === this._lastPos && Date.now() - this._startTime < 300 && this._el.click(), i.mouseButton(t) === this._eventButton) switch (this._state) {
        case "active":
          this._state = "enabled", i.suppressClick(), this._unbind(), this._deactivate(), this._inertialRotate(t);
          break;

        case "pending":
          this._state = "enabled", this._unbind();
      }
    }, yo.prototype._onBlur = function (t) {
      switch (this._state) {
        case "active":
          this._state = "enabled", this._unbind(), this._deactivate(), this._fireEvent("rotateend", t), this._pitchWithRotate && this._fireEvent("pitchend", t), this._fireEvent("moveend", t);
          break;

        case "pending":
          this._state = "enabled", this._unbind();
      }
    }, yo.prototype._unbind = function () {
      t.window.document.removeEventListener("mousemove", this._onMouseMove, {
        capture: !0
      }), t.window.document.removeEventListener("mouseup", this._onMouseUp), t.window.document.removeEventListener("touchmove", this._onMouseMove, {
        capture: !0
      }), t.window.document.removeEventListener("touchend", this._onMouseUp), t.window.removeEventListener("blur", this._onBlur), i.enableDrag();
    }, yo.prototype._deactivate = function () {
      this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._lastMoveEvent, delete this._startPos, delete this._prevPos, delete this._lastPos;
    }, yo.prototype._inertialRotate = function (t) {
      var e = this;
      this._fireEvent("rotateend", t), this._drainInertiaBuffer();

      var i = this._map,
          o = i.getBearing(),
          r = this._inertia,
          a = function () {
        Math.abs(o) < e._bearingSnap ? i.resetNorth({
          noMoveStart: !0
        }, {
          originalEvent: t
        }) : e._fireEvent("moveend", t), e._pitchWithRotate && e._fireEvent("pitchend", t);
      };

      if (r.length < 2) a();else {
        var n = r[0],
            s = r[r.length - 1],
            l = r[r.length - 2],
            c = i._normalizeBearing(o, l[1]),
            u = s[1] - n[1],
            h = u < 0 ? -1 : 1,
            p = (s[0] - n[0]) / 1e3;

        if (0 !== u && 0 !== p) {
          var d = Math.abs(u * (.25 / p));
          d > 180 && (d = 180);

          var _ = d / 180;

          c += h * d * (_ / 2), Math.abs(i._normalizeBearing(c, 0)) < this._bearingSnap && (c = i._normalizeBearing(0, c)), i.rotateTo(c, {
            duration: 1e3 * _,
            easing: vo,
            noMoveStart: !0
          }, {
            originalEvent: t
          });
        } else a();
      }
    }, yo.prototype._fireEvent = function (e, i) {
      return this._map.fire(new t.Event(e, i ? {
        originalEvent: i
      } : {}));
    }, yo.prototype._drainInertiaBuffer = function () {
      for (var e = this._inertia, i = t.browser.now(); e.length > 0 && i - e[0][0] > 160;) {
        e.shift();
      }
    };

    var xo = t.bezier(0, 0, .3, 1),
        bo = function (e, i) {
      this._map = e, this._el = e.getCanvasContainer(), this._state = "disabled", this._clickTolerance = i.clickTolerance || 1, t.bindAll(["_onMove", "_onMouseUp", "_onTouchEnd", "_onBlur", "_onDragFrame"], this);
    };

    bo.prototype.isEnabled = function () {
      return "disabled" !== this._state;
    }, bo.prototype.isActive = function () {
      return "active" === this._state;
    }, bo.prototype.enable = function () {
      this.isEnabled() || (this._el.classList.add("mapboxgl-touch-drag-pan"), this._state = "enabled");
    }, bo.prototype.disable = function () {
      if (this.isEnabled()) switch (this._el.classList.remove("mapboxgl-touch-drag-pan"), this._state) {
        case "active":
          this._state = "disabled", this._unbind(), this._deactivate(), this._fireEvent("dragend"), this._fireEvent("moveend");
          break;

        case "pending":
          this._state = "disabled", this._unbind();
          break;

        default:
          this._state = "disabled";
      }
    }, bo.prototype.onMouseDown = function (e) {
      "enabled" === this._state && (e.ctrlKey || 0 !== i.mouseButton(e) || (i.addEventListener(t.window.document, "mousemove", this._onMove, {
        capture: !0
      }), i.addEventListener(t.window.document, "mouseup", this._onMouseUp), this._start(e)));
    }, bo.prototype.onTouchStart = function (e) {
      "enabled" === this._state && (e.touches.length > 1 || (i.addEventListener(t.window.document, "touchmove", this._onMove, {
        capture: !0,
        passive: !1
      }), i.addEventListener(t.window.document, "touchend", this._onTouchEnd), this._start(e)));
    }, bo.prototype._start = function (e) {
      t.window.addEventListener("blur", this._onBlur), this._state = "pending", this._startPos = this._mouseDownPos = this._prevPos = this._lastPos = i.mousePos(this._el, e), this._inertia = [[t.browser.now(), this._startPos]];
    }, bo.prototype._onMove = function (e) {
      e.preventDefault();
      var o = i.mousePos(this._el, e);
      this._lastPos.equals(o) || "pending" === this._state && o.dist(this._mouseDownPos) < this._clickTolerance || (this._lastMoveEvent = e, this._lastPos = o, this._drainInertiaBuffer(), this._inertia.push([t.browser.now(), this._lastPos]), "pending" === this._state && (this._state = "active", this._fireEvent("dragstart", e), this._fireEvent("movestart", e)), this._frameId || (this._frameId = this._map._requestRenderFrame(this._onDragFrame)));
    }, bo.prototype._onDragFrame = function () {
      this._frameId = null;
      var t = this._lastMoveEvent;

      if (t) {
        var e = this._map.transform;
        e.setLocationAtPoint(e.pointLocation(this._prevPos), this._lastPos), this._fireEvent("drag", t), this._fireEvent("move", t), this._prevPos = this._lastPos, delete this._lastMoveEvent;
      }
    }, bo.prototype._onMouseUp = function (t) {
      if (0 === i.mouseButton(t)) switch (this._state) {
        case "active":
          this._state = "enabled", i.suppressClick(), this._unbind(), this._deactivate(), this._inertialPan(t);
          break;

        case "pending":
          this._state = "enabled", this._unbind();
      }
    }, bo.prototype._onTouchEnd = function (t) {
      switch (this._state) {
        case "active":
          this._state = "enabled", this._unbind(), this._deactivate(), this._inertialPan(t);
          break;

        case "pending":
          this._state = "enabled", this._unbind();
      }
    }, bo.prototype._onBlur = function (t) {
      switch (this._state) {
        case "active":
          this._state = "enabled", this._unbind(), this._deactivate(), this._fireEvent("dragend", t), this._fireEvent("moveend", t);
          break;

        case "pending":
          this._state = "enabled", this._unbind();
      }
    }, bo.prototype._unbind = function () {
      i.removeEventListener(t.window.document, "touchmove", this._onMove, {
        capture: !0,
        passive: !1
      }), i.removeEventListener(t.window.document, "touchend", this._onTouchEnd), i.removeEventListener(t.window.document, "mousemove", this._onMove, {
        capture: !0
      }), i.removeEventListener(t.window.document, "mouseup", this._onMouseUp), i.removeEventListener(t.window, "blur", this._onBlur);
    }, bo.prototype._deactivate = function () {
      this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._lastMoveEvent, delete this._startPos, delete this._prevPos, delete this._mouseDownPos, delete this._lastPos;
    }, bo.prototype._inertialPan = function (t) {
      this._fireEvent("dragend", t), this._drainInertiaBuffer();
      var e = this._inertia;
      if (e.length < 2) this._fireEvent("moveend", t);else {
        var i = e[e.length - 1],
            o = e[0],
            r = i[1].sub(o[1]),
            a = (i[0] - o[0]) / 1e3;
        if (0 === a || i[1].equals(o[1])) this._fireEvent("moveend", t);else {
          var n = r.mult(.3 / a),
              s = n.mag();
          s > 1400 && (s = 1400, n._unit()._mult(s));
          var l = s / 750,
              c = n.mult(-l / 2);

          this._map.panBy(c, {
            duration: 1e3 * l,
            easing: xo,
            noMoveStart: !0
          }, {
            originalEvent: t
          });
        }
      }
    }, bo.prototype._fireEvent = function (e, i) {
      return this._map.fire(new t.Event(e, i ? {
        originalEvent: i
      } : {}));
    }, bo.prototype._drainInertiaBuffer = function () {
      for (var e = this._inertia, i = t.browser.now(); e.length > 0 && i - e[0][0] > 160;) {
        e.shift();
      }
    };

    var wo = function (e) {
      this._map = e, this._el = e.getCanvasContainer(), t.bindAll(["_onKeyDown"], this);
    };

    function Eo(t) {
      return t * (2 - t);
    }

    wo.prototype.isEnabled = function () {
      return !!this._enabled;
    }, wo.prototype.enable = function () {
      this.isEnabled() || (this._el.addEventListener("keydown", this._onKeyDown, !1), this._enabled = !0);
    }, wo.prototype.disable = function () {
      this.isEnabled() && (this._el.removeEventListener("keydown", this._onKeyDown), this._enabled = !1);
    }, wo.prototype._onKeyDown = function (t) {
      if (!(t.altKey || t.ctrlKey || t.metaKey)) {
        var e = 0,
            i = 0,
            o = 0,
            r = 0,
            a = 0;

        switch (t.keyCode) {
          case 61:
          case 107:
          case 171:
          case 187:
            e = 1;
            break;

          case 189:
          case 109:
          case 173:
            e = -1;
            break;

          case 37:
            t.shiftKey ? i = -1 : (t.preventDefault(), r = -1);
            break;

          case 39:
            t.shiftKey ? i = 1 : (t.preventDefault(), r = 1);
            break;

          case 38:
            t.shiftKey ? o = 1 : (t.preventDefault(), a = -1);
            break;

          case 40:
            t.shiftKey ? o = -1 : (a = 1, t.preventDefault());
            break;

          default:
            return;
        }

        var n = this._map,
            s = n.getZoom(),
            l = {
          duration: 300,
          delayEndEvents: 500,
          easing: Eo,
          zoom: e ? Math.round(s) + e * (t.shiftKey ? 2 : 1) : s,
          bearing: n.getBearing() + 15 * i,
          pitch: n.getPitch() + 10 * o,
          offset: [100 * -r, 100 * -a],
          center: n.getCenter()
        };
        n.easeTo(l, {
          originalEvent: t
        });
      }
    };

    var To = function (e) {
      this._map = e, t.bindAll(["_onDblClick", "_onZoomEnd"], this);
    };

    To.prototype.isEnabled = function () {
      return !!this._enabled;
    }, To.prototype.isActive = function () {
      return !!this._active;
    }, To.prototype.enable = function () {
      this.isEnabled() || (this._enabled = !0);
    }, To.prototype.disable = function () {
      this.isEnabled() && (this._enabled = !1);
    }, To.prototype.onTouchStart = function (t) {
      var e = this;
      if (this.isEnabled() && !(t.points.length > 1)) if (this._tapped) {
        var i = t.points[0],
            o = this._tappedPoint;

        if (o && o.dist(i) <= 30) {
          t.originalEvent.preventDefault();

          var r = function () {
            e._tapped && e._zoom(t), e._map.off("touchcancel", a), e._resetTapped();
          },
              a = function () {
            e._map.off("touchend", r), e._resetTapped();
          };

          this._map.once("touchend", r), this._map.once("touchcancel", a);
        } else this._resetTapped();
      } else this._tappedPoint = t.points[0], this._tapped = setTimeout(function () {
        e._tapped = null, e._tappedPoint = null;
      }, 300);
    }, To.prototype._resetTapped = function () {
      clearTimeout(this._tapped), this._tapped = null, this._tappedPoint = null;
    }, To.prototype.onDblClick = function (t) {
      this.isEnabled() && (t.originalEvent.preventDefault(), this._zoom(t));
    }, To.prototype._zoom = function (t) {
      this._active = !0, this._map.on("zoomend", this._onZoomEnd), this._map.zoomTo(this._map.getZoom() + (t.originalEvent.shiftKey ? -1 : 1), {
        around: t.lngLat
      }, t);
    }, To.prototype._onZoomEnd = function () {
      this._active = !1, this._map.off("zoomend", this._onZoomEnd);
    };

    var Io = t.bezier(0, 0, .15, 1),
        Co = function (e) {
      this._map = e, this._el = e.getCanvasContainer(), t.bindAll(["_onMove", "_onEnd", "_onTouchFrame"], this);
    };

    Co.prototype.isEnabled = function () {
      return !!this._enabled;
    }, Co.prototype.enable = function (t) {
      this.isEnabled() || (this._el.classList.add("mapboxgl-touch-zoom-rotate"), this._enabled = !0, this._aroundCenter = !!t && "center" === t.around);
    }, Co.prototype.disable = function () {
      this.isEnabled() && (this._el.classList.remove("mapboxgl-touch-zoom-rotate"), this._enabled = !1);
    }, Co.prototype.disableRotation = function () {
      this._rotationDisabled = !0;
    }, Co.prototype.enableRotation = function () {
      this._rotationDisabled = !1;
    }, Co.prototype.onStart = function (e) {
      if (this.isEnabled() && 2 === e.touches.length) {
        var o = i.mousePos(this._el, e.touches[0]),
            r = i.mousePos(this._el, e.touches[1]),
            a = o.add(r).div(2);
        this._startVec = o.sub(r), this._startAround = this._map.transform.pointLocation(a), this._gestureIntent = void 0, this._inertia = [], i.addEventListener(t.window.document, "touchmove", this._onMove, {
          passive: !1
        }), i.addEventListener(t.window.document, "touchend", this._onEnd);
      }
    }, Co.prototype._getTouchEventData = function (t) {
      var e = i.mousePos(this._el, t.touches[0]),
          o = i.mousePos(this._el, t.touches[1]),
          r = e.sub(o);
      return {
        vec: r,
        center: e.add(o).div(2),
        scale: r.mag() / this._startVec.mag(),
        bearing: this._rotationDisabled ? 0 : 180 * r.angleWith(this._startVec) / Math.PI
      };
    }, Co.prototype._onMove = function (e) {
      if (2 === e.touches.length) {
        var i = this._getTouchEventData(e),
            o = i.vec,
            r = i.scale,
            a = i.bearing;

        if (!this._gestureIntent) {
          var n = this._rotationDisabled && 1 !== r || Math.abs(1 - r) > .15;
          Math.abs(a) > 10 ? this._gestureIntent = "rotate" : n && (this._gestureIntent = "zoom"), this._gestureIntent && (this._map.fire(new t.Event(this._gestureIntent + "start", {
            originalEvent: e
          })), this._map.fire(new t.Event("movestart", {
            originalEvent: e
          })), this._startVec = o);
        }

        this._lastTouchEvent = e, this._frameId || (this._frameId = this._map._requestRenderFrame(this._onTouchFrame)), e.preventDefault();
      }
    }, Co.prototype._onTouchFrame = function () {
      this._frameId = null;
      var e = this._gestureIntent;

      if (e) {
        var i = this._map.transform;
        this._startScale || (this._startScale = i.scale, this._startBearing = i.bearing);

        var o = this._getTouchEventData(this._lastTouchEvent),
            r = o.center,
            a = o.bearing,
            n = o.scale,
            s = i.pointLocation(r),
            l = i.locationPoint(s);

        "rotate" === e && (i.bearing = this._startBearing + a), i.zoom = i.scaleZoom(this._startScale * n), i.setLocationAtPoint(this._startAround, l), this._map.fire(new t.Event(e, {
          originalEvent: this._lastTouchEvent
        })), this._map.fire(new t.Event("move", {
          originalEvent: this._lastTouchEvent
        })), this._drainInertiaBuffer(), this._inertia.push([t.browser.now(), n, r]);
      }
    }, Co.prototype._onEnd = function (e) {
      i.removeEventListener(t.window.document, "touchmove", this._onMove, {
        passive: !1
      }), i.removeEventListener(t.window.document, "touchend", this._onEnd);
      var o = this._gestureIntent,
          r = this._startScale;

      if (this._frameId && (this._map._cancelRenderFrame(this._frameId), this._frameId = null), delete this._gestureIntent, delete this._startScale, delete this._startBearing, delete this._lastTouchEvent, o) {
        this._map.fire(new t.Event(o + "end", {
          originalEvent: e
        })), this._drainInertiaBuffer();
        var a = this._inertia,
            n = this._map;
        if (a.length < 2) n.snapToNorth({}, {
          originalEvent: e
        });else {
          var s = a[a.length - 1],
              l = a[0],
              c = n.transform.scaleZoom(r * s[1]),
              u = n.transform.scaleZoom(r * l[1]),
              h = c - u,
              p = (s[0] - l[0]) / 1e3,
              d = s[2];

          if (0 !== p && c !== u) {
            var _ = .15 * h / p;

            Math.abs(_) > 2.5 && (_ = _ > 0 ? 2.5 : -2.5);
            var f = 1e3 * Math.abs(_ / (12 * .15)),
                m = c + _ * f / 2e3;
            m < 0 && (m = 0), n.easeTo({
              zoom: m,
              duration: f,
              easing: Io,
              around: this._aroundCenter ? n.getCenter() : n.unproject(d),
              noMoveStart: !0
            }, {
              originalEvent: e
            });
          } else n.snapToNorth({}, {
            originalEvent: e
          });
        }
      }
    }, Co.prototype._drainInertiaBuffer = function () {
      for (var e = this._inertia, i = t.browser.now(); e.length > 2 && i - e[0][0] > 160;) {
        e.shift();
      }
    };
    var So = {
      scrollZoom: mo,
      boxZoom: go,
      dragRotate: yo,
      dragPan: bo,
      keyboard: wo,
      doubleClickZoom: To,
      touchZoomRotate: Co
    };

    var Po = function (e) {
      function i(i, o) {
        e.call(this), this._moving = !1, this._zooming = !1, this.transform = i, this._bearingSnap = o.bearingSnap, t.bindAll(["_renderFrameCallback"], this);
      }

      return e && (i.__proto__ = e), i.prototype = Object.create(e && e.prototype), i.prototype.constructor = i, i.prototype.getCenter = function () {
        return new t.LngLat(this.transform.center.lng, this.transform.center.lat);
      }, i.prototype.setCenter = function (t, e) {
        return this.jumpTo({
          center: t
        }, e);
      }, i.prototype.panBy = function (e, i, o) {
        return e = t.Point.convert(e).mult(-1), this.panTo(this.transform.center, t.extend({
          offset: e
        }, i), o);
      }, i.prototype.panTo = function (e, i, o) {
        return this.easeTo(t.extend({
          center: e
        }, i), o);
      }, i.prototype.getZoom = function () {
        return this.transform.zoom;
      }, i.prototype.setZoom = function (t, e) {
        return this.jumpTo({
          zoom: t
        }, e), this;
      }, i.prototype.zoomTo = function (e, i, o) {
        return this.easeTo(t.extend({
          zoom: e
        }, i), o);
      }, i.prototype.zoomIn = function (t, e) {
        return this.zoomTo(this.getZoom() + 1, t, e), this;
      }, i.prototype.zoomOut = function (t, e) {
        return this.zoomTo(this.getZoom() - 1, t, e), this;
      }, i.prototype.getBearing = function () {
        return this.transform.bearing;
      }, i.prototype.setBearing = function (t, e) {
        return this.jumpTo({
          bearing: t
        }, e), this;
      }, i.prototype.rotateTo = function (e, i, o) {
        return this.easeTo(t.extend({
          bearing: e
        }, i), o);
      }, i.prototype.resetNorth = function (e, i) {
        return this.rotateTo(0, t.extend({
          duration: 1e3
        }, e), i), this;
      }, i.prototype.resetNorthPitch = function (e, i) {
        return this.easeTo(t.extend({
          bearing: 0,
          pitch: 0,
          duration: 1e3
        }, e), i), this;
      }, i.prototype.snapToNorth = function (t, e) {
        return Math.abs(this.getBearing()) < this._bearingSnap ? this.resetNorth(t, e) : this;
      }, i.prototype.getPitch = function () {
        return this.transform.pitch;
      }, i.prototype.setPitch = function (t, e) {
        return this.jumpTo({
          pitch: t
        }, e), this;
      }, i.prototype.cameraForBounds = function (e, i) {
        return e = t.LngLatBounds.convert(e), this._cameraForBoxAndBearing(e.getNorthWest(), e.getSouthEast(), 0, i);
      }, i.prototype._cameraForBoxAndBearing = function (e, i, o, r) {
        if ("number" == typeof (r = t.extend({
          padding: {
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          },
          offset: [0, 0],
          maxZoom: this.transform.maxZoom
        }, r)).padding) {
          var a = r.padding;
          r.padding = {
            top: a,
            bottom: a,
            right: a,
            left: a
          };
        }

        if (t.deepEqual(Object.keys(r.padding).sort(function (t, e) {
          return t < e ? -1 : t > e ? 1 : 0;
        }), ["bottom", "left", "right", "top"])) {
          var n = this.transform,
              s = n.project(t.LngLat.convert(e)),
              l = n.project(t.LngLat.convert(i)),
              c = s.rotate(-o * Math.PI / 180),
              u = l.rotate(-o * Math.PI / 180),
              h = new t.Point(Math.max(c.x, u.x), Math.max(c.y, u.y)),
              p = new t.Point(Math.min(c.x, u.x), Math.min(c.y, u.y)),
              d = h.sub(p),
              _ = (n.width - r.padding.left - r.padding.right) / d.x,
              f = (n.height - r.padding.top - r.padding.bottom) / d.y;

          if (!(f < 0 || _ < 0)) {
            var m = Math.min(n.scaleZoom(n.scale * Math.min(_, f)), r.maxZoom),
                g = t.Point.convert(r.offset),
                v = (r.padding.left - r.padding.right) / 2,
                y = (r.padding.top - r.padding.bottom) / 2,
                x = new t.Point(g.x + v, g.y + y).mult(n.scale / n.zoomScale(m));
            return {
              center: n.unproject(s.add(l).div(2).sub(x)),
              zoom: m,
              bearing: o
            };
          }

          t.warnOnce("Map cannot fit within canvas with the given bounds, padding, and/or offset.");
        } else t.warnOnce("options.padding must be a positive number, or an Object with keys 'bottom', 'left', 'right', 'top'");
      }, i.prototype.fitBounds = function (t, e, i) {
        return this._fitInternal(this.cameraForBounds(t, e), e, i);
      }, i.prototype.fitScreenCoordinates = function (e, i, o, r, a) {
        return this._fitInternal(this._cameraForBoxAndBearing(this.transform.pointLocation(t.Point.convert(e)), this.transform.pointLocation(t.Point.convert(i)), o, r), r, a);
      }, i.prototype._fitInternal = function (e, i, o) {
        return e ? (i = t.extend(e, i)).linear ? this.easeTo(i, o) : this.flyTo(i, o) : this;
      }, i.prototype.jumpTo = function (e, i) {
        this.stop();
        var o = this.transform,
            r = !1,
            a = !1,
            n = !1;
        return "zoom" in e && o.zoom !== +e.zoom && (r = !0, o.zoom = +e.zoom), void 0 !== e.center && (o.center = t.LngLat.convert(e.center)), "bearing" in e && o.bearing !== +e.bearing && (a = !0, o.bearing = +e.bearing), "pitch" in e && o.pitch !== +e.pitch && (n = !0, o.pitch = +e.pitch), this.fire(new t.Event("movestart", i)).fire(new t.Event("move", i)), r && this.fire(new t.Event("zoomstart", i)).fire(new t.Event("zoom", i)).fire(new t.Event("zoomend", i)), a && this.fire(new t.Event("rotatestart", i)).fire(new t.Event("rotate", i)).fire(new t.Event("rotateend", i)), n && this.fire(new t.Event("pitchstart", i)).fire(new t.Event("pitch", i)).fire(new t.Event("pitchend", i)), this.fire(new t.Event("moveend", i));
      }, i.prototype.easeTo = function (e, i) {
        var o = this;
        this.stop(), (!1 === (e = t.extend({
          offset: [0, 0],
          duration: 500,
          easing: t.ease
        }, e)).animate || t.browser.prefersReducedMotion) && (e.duration = 0);
        var r = this.transform,
            a = this.getZoom(),
            n = this.getBearing(),
            s = this.getPitch(),
            l = "zoom" in e ? +e.zoom : a,
            c = "bearing" in e ? this._normalizeBearing(e.bearing, n) : n,
            u = "pitch" in e ? +e.pitch : s,
            h = r.centerPoint.add(t.Point.convert(e.offset)),
            p = r.pointLocation(h),
            d = t.LngLat.convert(e.center || p);

        this._normalizeCenter(d);

        var _,
            f,
            m = r.project(p),
            g = r.project(d).sub(m),
            v = r.zoomScale(l - a);

        return e.around && (_ = t.LngLat.convert(e.around), f = r.locationPoint(_)), this._zooming = l !== a, this._rotating = n !== c, this._pitching = u !== s, this._prepareEase(i, e.noMoveStart), clearTimeout(this._easeEndTimeoutID), this._ease(function (e) {
          if (o._zooming && (r.zoom = t.number(a, l, e)), o._rotating && (r.bearing = t.number(n, c, e)), o._pitching && (r.pitch = t.number(s, u, e)), _) r.setLocationAtPoint(_, f);else {
            var p = r.zoomScale(r.zoom - a),
                d = l > a ? Math.min(2, v) : Math.max(.5, v),
                y = Math.pow(d, 1 - e),
                x = r.unproject(m.add(g.mult(e * y)).mult(p));
            r.setLocationAtPoint(r.renderWorldCopies ? x.wrap() : x, h);
          }

          o._fireMoveEvents(i);
        }, function () {
          e.delayEndEvents ? o._easeEndTimeoutID = setTimeout(function () {
            return o._afterEase(i);
          }, e.delayEndEvents) : o._afterEase(i);
        }, e), this;
      }, i.prototype._prepareEase = function (e, i) {
        this._moving = !0, i || this.fire(new t.Event("movestart", e)), this._zooming && this.fire(new t.Event("zoomstart", e)), this._rotating && this.fire(new t.Event("rotatestart", e)), this._pitching && this.fire(new t.Event("pitchstart", e));
      }, i.prototype._fireMoveEvents = function (e) {
        this.fire(new t.Event("move", e)), this._zooming && this.fire(new t.Event("zoom", e)), this._rotating && this.fire(new t.Event("rotate", e)), this._pitching && this.fire(new t.Event("pitch", e));
      }, i.prototype._afterEase = function (e) {
        var i = this._zooming,
            o = this._rotating,
            r = this._pitching;
        this._moving = !1, this._zooming = !1, this._rotating = !1, this._pitching = !1, i && this.fire(new t.Event("zoomend", e)), o && this.fire(new t.Event("rotateend", e)), r && this.fire(new t.Event("pitchend", e)), this.fire(new t.Event("moveend", e));
      }, i.prototype.flyTo = function (e, i) {
        var o = this;

        if (t.browser.prefersReducedMotion) {
          var r = t.pick(e, ["center", "zoom", "bearing", "pitch", "around"]);
          return this.jumpTo(r, i);
        }

        this.stop(), e = t.extend({
          offset: [0, 0],
          speed: 1.2,
          curve: 1.42,
          easing: t.ease
        }, e);

        var a = this.transform,
            n = this.getZoom(),
            s = this.getBearing(),
            l = this.getPitch(),
            c = "zoom" in e ? t.clamp(+e.zoom, a.minZoom, a.maxZoom) : n,
            u = "bearing" in e ? this._normalizeBearing(e.bearing, s) : s,
            h = "pitch" in e ? +e.pitch : l,
            p = a.zoomScale(c - n),
            d = a.centerPoint.add(t.Point.convert(e.offset)),
            _ = a.pointLocation(d),
            f = t.LngLat.convert(e.center || _);

        this._normalizeCenter(f);

        var m = a.project(_),
            g = a.project(f).sub(m),
            v = e.curve,
            y = Math.max(a.width, a.height),
            x = y / p,
            b = g.mag();

        if ("minZoom" in e) {
          var w = t.clamp(Math.min(e.minZoom, n, c), a.minZoom, a.maxZoom),
              E = y / a.zoomScale(w - n);
          v = Math.sqrt(E / b * 2);
        }

        var T = v * v;

        function I(t) {
          var e = (x * x - y * y + (t ? -1 : 1) * T * T * b * b) / (2 * (t ? x : y) * T * b);
          return Math.log(Math.sqrt(e * e + 1) - e);
        }

        function C(t) {
          return (Math.exp(t) - Math.exp(-t)) / 2;
        }

        function S(t) {
          return (Math.exp(t) + Math.exp(-t)) / 2;
        }

        var P = I(0),
            z = function (t) {
          return S(P) / S(P + v * t);
        },
            L = function (t) {
          return y * ((S(P) * (C(e = P + v * t) / S(e)) - C(P)) / T) / b;
          var e;
        },
            D = (I(1) - P) / v;

        if (Math.abs(b) < 1e-6 || !isFinite(D)) {
          if (Math.abs(y - x) < 1e-6) return this.easeTo(e, i);
          var M = x < y ? -1 : 1;
          D = Math.abs(Math.log(x / y)) / v, L = function () {
            return 0;
          }, z = function (t) {
            return Math.exp(M * v * t);
          };
        }

        if ("duration" in e) e.duration = +e.duration;else {
          var R = "screenSpeed" in e ? +e.screenSpeed / v : +e.speed;
          e.duration = 1e3 * D / R;
        }
        return e.maxDuration && e.duration > e.maxDuration && (e.duration = 0), this._zooming = !0, this._rotating = s !== u, this._pitching = h !== l, this._prepareEase(i, !1), this._ease(function (e) {
          var r = e * D,
              p = 1 / z(r);
          a.zoom = 1 === e ? c : n + a.scaleZoom(p), o._rotating && (a.bearing = t.number(s, u, e)), o._pitching && (a.pitch = t.number(l, h, e));

          var _ = 1 === e ? f : a.unproject(m.add(g.mult(L(r))).mult(p));

          a.setLocationAtPoint(a.renderWorldCopies ? _.wrap() : _, d), o._fireMoveEvents(i);
        }, function () {
          return o._afterEase(i);
        }, e), this;
      }, i.prototype.isEasing = function () {
        return !!this._easeFrameId;
      }, i.prototype.stop = function () {
        if (this._easeFrameId && (this._cancelRenderFrame(this._easeFrameId), delete this._easeFrameId, delete this._onEaseFrame), this._onEaseEnd) {
          var t = this._onEaseEnd;
          delete this._onEaseEnd, t.call(this);
        }

        return this;
      }, i.prototype._ease = function (e, i, o) {
        !1 === o.animate || 0 === o.duration ? (e(1), i()) : (this._easeStart = t.browser.now(), this._easeOptions = o, this._onEaseFrame = e, this._onEaseEnd = i, this._easeFrameId = this._requestRenderFrame(this._renderFrameCallback));
      }, i.prototype._renderFrameCallback = function () {
        var e = Math.min((t.browser.now() - this._easeStart) / this._easeOptions.duration, 1);
        this._onEaseFrame(this._easeOptions.easing(e)), e < 1 ? this._easeFrameId = this._requestRenderFrame(this._renderFrameCallback) : this.stop();
      }, i.prototype._normalizeBearing = function (e, i) {
        e = t.wrap(e, -180, 180);
        var o = Math.abs(e - i);
        return Math.abs(e - 360 - i) < o && (e -= 360), Math.abs(e + 360 - i) < o && (e += 360), e;
      }, i.prototype._normalizeCenter = function (t) {
        var e = this.transform;

        if (e.renderWorldCopies && !e.lngRange) {
          var i = t.lng - e.center.lng;
          t.lng += i > 180 ? -360 : i < -180 ? 360 : 0;
        }
      }, i;
    }(t.Evented),
        zo = function (e) {
      void 0 === e && (e = {}), this.options = e, t.bindAll(["_updateEditLink", "_updateData", "_updateCompact"], this);
    };

    zo.prototype.getDefaultPosition = function () {
      return "bottom-right";
    }, zo.prototype.onAdd = function (t) {
      var e = this.options && this.options.compact;
      return this._map = t, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-attrib"), this._innerContainer = i.create("div", "mapboxgl-ctrl-attrib-inner", this._container), e && this._container.classList.add("mapboxgl-compact"), this._updateAttributions(), this._updateEditLink(), this._map.on("styledata", this._updateData), this._map.on("sourcedata", this._updateData), this._map.on("moveend", this._updateEditLink), void 0 === e && (this._map.on("resize", this._updateCompact), this._updateCompact()), this._container;
    }, zo.prototype.onRemove = function () {
      i.remove(this._container), this._map.off("styledata", this._updateData), this._map.off("sourcedata", this._updateData), this._map.off("moveend", this._updateEditLink), this._map.off("resize", this._updateCompact), this._map = void 0;
    }, zo.prototype._updateEditLink = function () {
      var e = this._editLink;
      e || (e = this._editLink = this._container.querySelector(".mapbox-improve-map"));
      var i = [{
        key: "owner",
        value: this.styleOwner
      }, {
        key: "id",
        value: this.styleId
      }, {
        key: "access_token",
        value: this._map._requestManager._customAccessToken || t.config.ACCESS_TOKEN
      }];

      if (e) {
        var o = i.reduce(function (t, e, o) {
          return e.value && (t += e.key + "=" + e.value + (o < i.length - 1 ? "&" : "")), t;
        }, "?");
        e.href = t.config.FEEDBACK_URL + "/" + o + (this._map._hash ? this._map._hash.getHashString(!0) : ""), e.rel = "noopener nofollow";
      }
    }, zo.prototype._updateData = function (t) {
      !t || "metadata" !== t.sourceDataType && "style" !== t.dataType || (this._updateAttributions(), this._updateEditLink());
    }, zo.prototype._updateAttributions = function () {
      if (this._map.style) {
        var t = [];

        if (this.options.customAttribution && (Array.isArray(this.options.customAttribution) ? t = t.concat(this.options.customAttribution.map(function (t) {
          return "string" != typeof t ? "" : t;
        })) : "string" == typeof this.options.customAttribution && t.push(this.options.customAttribution)), this._map.style.stylesheet) {
          var e = this._map.style.stylesheet;
          this.styleOwner = e.owner, this.styleId = e.id;
        }

        var i = this._map.style.sourceCaches;

        for (var o in i) {
          var r = i[o];

          if (r.used) {
            var a = r.getSource();
            a.attribution && t.indexOf(a.attribution) < 0 && t.push(a.attribution);
          }
        }

        t.sort(function (t, e) {
          return t.length - e.length;
        });
        var n = (t = t.filter(function (e, i) {
          for (var o = i + 1; o < t.length; o++) {
            if (t[o].indexOf(e) >= 0) return !1;
          }

          return !0;
        })).join(" | ");
        n !== this._attribHTML && (this._attribHTML = n, t.length ? (this._innerContainer.innerHTML = n, this._container.classList.remove("mapboxgl-attrib-empty")) : this._container.classList.add("mapboxgl-attrib-empty"), this._editLink = null);
      }
    }, zo.prototype._updateCompact = function () {
      this._map.getCanvasContainer().offsetWidth <= 640 ? this._container.classList.add("mapboxgl-compact") : this._container.classList.remove("mapboxgl-compact");
    };

    var Lo = function () {
      t.bindAll(["_updateLogo"], this), t.bindAll(["_updateCompact"], this);
    };

    Lo.prototype.onAdd = function (t) {
      this._map = t, this._container = i.create("div", "mapboxgl-ctrl");
      var e = i.create("a", "mapboxgl-ctrl-logo");
      return e.target = "_blank", e.rel = "noopener nofollow", e.href = "https://www.mapbox.com/", e.setAttribute("aria-label", "Mapbox logo"), e.setAttribute("rel", "noopener nofollow"), this._container.appendChild(e), this._container.style.display = "none", this._map.on("sourcedata", this._updateLogo), this._updateLogo(), this._map.on("resize", this._updateCompact), this._updateCompact(), this._container;
    }, Lo.prototype.onRemove = function () {
      i.remove(this._container), this._map.off("sourcedata", this._updateLogo), this._map.off("resize", this._updateCompact);
    }, Lo.prototype.getDefaultPosition = function () {
      return "bottom-left";
    }, Lo.prototype._updateLogo = function (t) {
      t && "metadata" !== t.sourceDataType || (this._container.style.display = this._logoRequired() ? "block" : "none");
    }, Lo.prototype._logoRequired = function () {
      if (this._map.style) {
        var t = this._map.style.sourceCaches;

        for (var e in t) {
          if (t[e].getSource().mapbox_logo) return !0;
        }

        return !1;
      }
    }, Lo.prototype._updateCompact = function () {
      var t = this._container.children;

      if (t.length) {
        var e = t[0];
        this._map.getCanvasContainer().offsetWidth < 250 ? e.classList.add("mapboxgl-compact") : e.classList.remove("mapboxgl-compact");
      }
    };

    var Do = function () {
      this._queue = [], this._id = 0, this._cleared = !1, this._currentlyRunning = !1;
    };

    Do.prototype.add = function (t) {
      var e = ++this._id;
      return this._queue.push({
        callback: t,
        id: e,
        cancelled: !1
      }), e;
    }, Do.prototype.remove = function (t) {
      for (var e = this._currentlyRunning, i = 0, o = e ? this._queue.concat(e) : this._queue; i < o.length; i += 1) {
        var r = o[i];
        if (r.id === t) return void (r.cancelled = !0);
      }
    }, Do.prototype.run = function () {
      var t = this._currentlyRunning = this._queue;
      this._queue = [];

      for (var e = 0, i = t; e < i.length; e += 1) {
        var o = i[e];
        if (!o.cancelled && (o.callback(), this._cleared)) break;
      }

      this._cleared = !1, this._currentlyRunning = !1;
    }, Do.prototype.clear = function () {
      this._currentlyRunning && (this._cleared = !0), this._queue = [];
    };

    var Mo = t.window.HTMLImageElement,
        Ro = t.window.HTMLElement,
        Ao = {
      center: [0, 0],
      zoom: 0,
      bearing: 0,
      pitch: 0,
      minZoom: 0,
      maxZoom: 22,
      interactive: !0,
      scrollZoom: !0,
      boxZoom: !0,
      dragRotate: !0,
      dragPan: !0,
      keyboard: !0,
      doubleClickZoom: !0,
      touchZoomRotate: !0,
      bearingSnap: 7,
      clickTolerance: 3,
      hash: !1,
      attributionControl: !0,
      failIfMajorPerformanceCaveat: !1,
      preserveDrawingBuffer: !1,
      trackResize: !0,
      renderWorldCopies: !0,
      refreshExpiredTiles: !0,
      maxTileCacheSize: null,
      localIdeographFontFamily: "sans-serif",
      transformRequest: null,
      accessToken: null,
      fadeDuration: 300,
      crossSourceCollisions: !0
    },
        ko = function (o) {
      function r(e) {
        var r = this;
        if (null != (e = t.extend({}, Ao, e)).minZoom && null != e.maxZoom && e.minZoom > e.maxZoom) throw new Error("maxZoom must be greater than minZoom");
        var a = new co(e.minZoom, e.maxZoom, e.renderWorldCopies);

        if (o.call(this, a, e), this._interactive = e.interactive, this._maxTileCacheSize = e.maxTileCacheSize, this._failIfMajorPerformanceCaveat = e.failIfMajorPerformanceCaveat, this._preserveDrawingBuffer = e.preserveDrawingBuffer, this._antialias = e.antialias, this._trackResize = e.trackResize, this._bearingSnap = e.bearingSnap, this._refreshExpiredTiles = e.refreshExpiredTiles, this._fadeDuration = e.fadeDuration, this._crossSourceCollisions = e.crossSourceCollisions, this._crossFadingFactor = 1, this._collectResourceTiming = e.collectResourceTiming, this._renderTaskQueue = new Do(), this._controls = [], this._mapId = t.uniqueId(), this._requestManager = new t.RequestManager(e.transformRequest, e.accessToken), "string" == typeof e.container) {
          if (this._container = t.window.document.getElementById(e.container), !this._container) throw new Error("Container '" + e.container + "' not found.");
        } else {
          if (!(e.container instanceof Ro)) throw new Error("Invalid type: 'container' must be a String or HTMLElement.");
          this._container = e.container;
        }

        if (e.maxBounds && this.setMaxBounds(e.maxBounds), t.bindAll(["_onWindowOnline", "_onWindowResize", "_contextLost", "_contextRestored"], this), this._setupContainer(), this._setupPainter(), void 0 === this.painter) throw new Error("Failed to initialize WebGL.");
        this.on("move", function () {
          return r._update(!1);
        }), this.on("moveend", function () {
          return r._update(!1);
        }), this.on("zoom", function () {
          return r._update(!0);
        }), void 0 !== t.window && (t.window.addEventListener("online", this._onWindowOnline, !1), t.window.addEventListener("resize", this._onWindowResize, !1)), function (t, e) {
          var o = t.getCanvasContainer(),
              r = null,
              a = !1,
              n = null;

          for (var s in So) {
            t[s] = new So[s](t, e), e.interactive && e[s] && t[s].enable(e[s]);
          }

          i.addEventListener(o, "mouseout", function (e) {
            t.fire(new po("mouseout", t, e));
          }), i.addEventListener(o, "mousedown", function (r) {
            a = !0, n = i.mousePos(o, r);
            var s = new po("mousedown", t, r);
            t.fire(s), s.defaultPrevented || (e.interactive && !t.doubleClickZoom.isActive() && t.stop(), t.boxZoom.onMouseDown(r), t.boxZoom.isActive() || t.dragPan.isActive() || t.dragRotate.onMouseDown(r), t.boxZoom.isActive() || t.dragRotate.isActive() || t.dragPan.onMouseDown(r));
          }), i.addEventListener(o, "mouseup", function (e) {
            var i = t.dragRotate.isActive();
            r && !i && t.fire(new po("contextmenu", t, r)), r = null, a = !1, t.fire(new po("mouseup", t, e));
          }), i.addEventListener(o, "mousemove", function (e) {
            if (!t.dragPan.isActive() && !t.dragRotate.isActive()) {
              for (var i = e.target; i && i !== o;) {
                i = i.parentNode;
              }

              i === o && t.fire(new po("mousemove", t, e));
            }
          }), i.addEventListener(o, "mouseover", function (e) {
            for (var i = e.target; i && i !== o;) {
              i = i.parentNode;
            }

            i === o && t.fire(new po("mouseover", t, e));
          }), i.addEventListener(o, "touchstart", function (i) {
            var o = new _o("touchstart", t, i);
            t.fire(o), o.defaultPrevented || (e.interactive && t.stop(), t.boxZoom.isActive() || t.dragRotate.isActive() || t.dragPan.onTouchStart(i), t.touchZoomRotate.onStart(i), t.doubleClickZoom.onTouchStart(o));
          }, {
            passive: !1
          }), i.addEventListener(o, "touchmove", function (e) {
            t.fire(new _o("touchmove", t, e));
          }, {
            passive: !1
          }), i.addEventListener(o, "touchend", function (e) {
            t.fire(new _o("touchend", t, e));
          }), i.addEventListener(o, "touchcancel", function (e) {
            t.fire(new _o("touchcancel", t, e));
          }), i.addEventListener(o, "click", function (r) {
            var a = i.mousePos(o, r);
            (!n || a.equals(n) || a.dist(n) < e.clickTolerance) && t.fire(new po("click", t, r));
          }), i.addEventListener(o, "dblclick", function (e) {
            var i = new po("dblclick", t, e);
            t.fire(i), i.defaultPrevented || t.doubleClickZoom.onDblClick(i);
          }), i.addEventListener(o, "contextmenu", function (e) {
            var i = t.dragRotate.isActive();
            a || i ? a && (r = e) : t.fire(new po("contextmenu", t, e)), (t.dragRotate.isEnabled() || t.listens("contextmenu")) && e.preventDefault();
          }), i.addEventListener(o, "wheel", function (i) {
            e.interactive && t.stop();
            var o = new fo("wheel", t, i);
            t.fire(o), o.defaultPrevented || t.scrollZoom.onWheel(i);
          }, {
            passive: !1
          });
        }(this, e), this._hash = e.hash && new ho().addTo(this), this._hash && this._hash._onHashChange() || (this.jumpTo({
          center: e.center,
          zoom: e.zoom,
          bearing: e.bearing,
          pitch: e.pitch
        }), e.bounds && (this.resize(), this.fitBounds(e.bounds, t.extend({}, e.fitBoundsOptions, {
          duration: 0
        })))), this.resize(), this._localIdeographFontFamily = e.localIdeographFontFamily, e.style && this.setStyle(e.style, {
          localIdeographFontFamily: e.localIdeographFontFamily
        }), e.attributionControl && this.addControl(new zo({
          customAttribution: e.customAttribution
        })), this.addControl(new Lo(), e.logoPosition), this.on("style.load", function () {
          r.transform.unmodified && r.jumpTo(r.style.stylesheet);
        }), this.on("data", function (e) {
          r._update("style" === e.dataType), r.fire(new t.Event(e.dataType + "data", e));
        }), this.on("dataloading", function (e) {
          r.fire(new t.Event(e.dataType + "dataloading", e));
        });
      }

      o && (r.__proto__ = o), r.prototype = Object.create(o && o.prototype), r.prototype.constructor = r;
      var a = {
        showTileBoundaries: {
          configurable: !0
        },
        showCollisionBoxes: {
          configurable: !0
        },
        showOverdrawInspector: {
          configurable: !0
        },
        repaint: {
          configurable: !0
        },
        vertices: {
          configurable: !0
        }
      };
      return r.prototype._getMapId = function () {
        return this._mapId;
      }, r.prototype.addControl = function (e, i) {
        if (void 0 === i && e.getDefaultPosition && (i = e.getDefaultPosition()), void 0 === i && (i = "top-right"), !e || !e.onAdd) return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.addControl(). Argument must be a control with onAdd and onRemove methods.")));
        var o = e.onAdd(this);

        this._controls.push(e);

        var r = this._controlPositions[i];
        return -1 !== i.indexOf("bottom") ? r.insertBefore(o, r.firstChild) : r.appendChild(o), this;
      }, r.prototype.removeControl = function (e) {
        if (!e || !e.onRemove) return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.removeControl(). Argument must be a control with onAdd and onRemove methods.")));

        var i = this._controls.indexOf(e);

        return i > -1 && this._controls.splice(i, 1), e.onRemove(this), this;
      }, r.prototype.resize = function (e) {
        var i = this._containerDimensions(),
            o = i[0],
            r = i[1];

        return this._resizeCanvas(o, r), this.transform.resize(o, r), this.painter.resize(o, r), this.fire(new t.Event("movestart", e)).fire(new t.Event("move", e)).fire(new t.Event("resize", e)).fire(new t.Event("moveend", e)), this;
      }, r.prototype.getBounds = function () {
        return this.transform.getBounds();
      }, r.prototype.getMaxBounds = function () {
        return this.transform.getMaxBounds();
      }, r.prototype.setMaxBounds = function (e) {
        return this.transform.setMaxBounds(t.LngLatBounds.convert(e)), this._update();
      }, r.prototype.setMinZoom = function (t) {
        if ((t = null == t ? 0 : t) >= 0 && t <= this.transform.maxZoom) return this.transform.minZoom = t, this._update(), this.getZoom() < t && this.setZoom(t), this;
        throw new Error("minZoom must be between 0 and the current maxZoom, inclusive");
      }, r.prototype.getMinZoom = function () {
        return this.transform.minZoom;
      }, r.prototype.setMaxZoom = function (t) {
        if ((t = null == t ? 22 : t) >= this.transform.minZoom) return this.transform.maxZoom = t, this._update(), this.getZoom() > t && this.setZoom(t), this;
        throw new Error("maxZoom must be greater than the current minZoom");
      }, r.prototype.getRenderWorldCopies = function () {
        return this.transform.renderWorldCopies;
      }, r.prototype.setRenderWorldCopies = function (t) {
        return this.transform.renderWorldCopies = t, this._update();
      }, r.prototype.getMaxZoom = function () {
        return this.transform.maxZoom;
      }, r.prototype.project = function (e) {
        return this.transform.locationPoint(t.LngLat.convert(e));
      }, r.prototype.unproject = function (e) {
        return this.transform.pointLocation(t.Point.convert(e));
      }, r.prototype.isMoving = function () {
        return this._moving || this.dragPan.isActive() || this.dragRotate.isActive() || this.scrollZoom.isActive();
      }, r.prototype.isZooming = function () {
        return this._zooming || this.scrollZoom.isZooming();
      }, r.prototype.isRotating = function () {
        return this._rotating || this.dragRotate.isActive();
      }, r.prototype.on = function (t, e, i) {
        var r = this;
        if (void 0 === i) return o.prototype.on.call(this, t, e);

        var a = function () {
          var o;

          if ("mouseenter" === t || "mouseover" === t) {
            var a = !1;
            return {
              layer: e,
              listener: i,
              delegates: {
                mousemove: function (o) {
                  var n = r.getLayer(e) ? r.queryRenderedFeatures(o.point, {
                    layers: [e]
                  }) : [];
                  n.length ? a || (a = !0, i.call(r, new po(t, r, o.originalEvent, {
                    features: n
                  }))) : a = !1;
                },
                mouseout: function () {
                  a = !1;
                }
              }
            };
          }

          if ("mouseleave" === t || "mouseout" === t) {
            var n = !1;
            return {
              layer: e,
              listener: i,
              delegates: {
                mousemove: function (o) {
                  (r.getLayer(e) ? r.queryRenderedFeatures(o.point, {
                    layers: [e]
                  }) : []).length ? n = !0 : n && (n = !1, i.call(r, new po(t, r, o.originalEvent)));
                },
                mouseout: function (e) {
                  n && (n = !1, i.call(r, new po(t, r, e.originalEvent)));
                }
              }
            };
          }

          return {
            layer: e,
            listener: i,
            delegates: (o = {}, o[t] = function (t) {
              var o = r.getLayer(e) ? r.queryRenderedFeatures(t.point, {
                layers: [e]
              }) : [];
              o.length && (t.features = o, i.call(r, t), delete t.features);
            }, o)
          };
        }();

        for (var n in this._delegatedListeners = this._delegatedListeners || {}, this._delegatedListeners[t] = this._delegatedListeners[t] || [], this._delegatedListeners[t].push(a), a.delegates) {
          this.on(n, a.delegates[n]);
        }

        return this;
      }, r.prototype.off = function (t, e, i) {
        if (void 0 === i) return o.prototype.off.call(this, t, e);
        if (this._delegatedListeners && this._delegatedListeners[t]) for (var r = this._delegatedListeners[t], a = 0; a < r.length; a++) {
          var n = r[a];

          if (n.layer === e && n.listener === i) {
            for (var s in n.delegates) {
              this.off(s, n.delegates[s]);
            }

            return r.splice(a, 1), this;
          }
        }
        return this;
      }, r.prototype.queryRenderedFeatures = function (e, i) {
        if (!this.style) return [];
        var o;
        if (void 0 !== i || void 0 === e || e instanceof t.Point || Array.isArray(e) || (i = e, e = void 0), i = i || {}, (e = e || [[0, 0], [this.transform.width, this.transform.height]]) instanceof t.Point || "number" == typeof e[0]) o = [t.Point.convert(e)];else {
          var r = t.Point.convert(e[0]),
              a = t.Point.convert(e[1]);
          o = [r, new t.Point(a.x, r.y), a, new t.Point(r.x, a.y), r];
        }
        return this.style.queryRenderedFeatures(o, i, this.transform);
      }, r.prototype.querySourceFeatures = function (t, e) {
        return this.style.querySourceFeatures(t, e);
      }, r.prototype.setStyle = function (e, i) {
        return !1 !== (i = t.extend({}, {
          localIdeographFontFamily: Ao.localIdeographFontFamily
        }, i)).diff && i.localIdeographFontFamily === this._localIdeographFontFamily && this.style && e ? (this._diffStyle(e, i), this) : (this._localIdeographFontFamily = i.localIdeographFontFamily, this._updateStyle(e, i));
      }, r.prototype._updateStyle = function (t, e) {
        return this.style && (this.style.setEventedParent(null), this.style._remove()), t ? (this.style = new Be(this, e || {}), this.style.setEventedParent(this, {
          style: this.style
        }), "string" == typeof t ? this.style.loadURL(t) : this.style.loadJSON(t), this) : (delete this.style, this);
      }, r.prototype._diffStyle = function (e, i) {
        var o = this;

        if ("string" == typeof e) {
          var r = this._requestManager.normalizeStyleURL(e),
              a = this._requestManager.transformRequest(r, t.ResourceType.Style);

          t.getJSON(a, function (e, r) {
            e ? o.fire(new t.ErrorEvent(e)) : r && o._updateDiff(r, i);
          });
        } else "object" == _typeof(e) && this._updateDiff(e, i);
      }, r.prototype._updateDiff = function (e, i) {
        try {
          this.style.setState(e) && this._update(!0);
        } catch (o) {
          t.warnOnce("Unable to perform style diff: " + (o.message || o.error || o) + ".  Rebuilding the style from scratch."), this._updateStyle(e, i);
        }
      }, r.prototype.getStyle = function () {
        if (this.style) return this.style.serialize();
      }, r.prototype.isStyleLoaded = function () {
        return this.style ? this.style.loaded() : t.warnOnce("There is no style added to the map.");
      }, r.prototype.addSource = function (t, e) {
        return this.style.addSource(t, e), this._update(!0);
      }, r.prototype.isSourceLoaded = function (e) {
        var i = this.style && this.style.sourceCaches[e];
        if (void 0 !== i) return i.loaded();
        this.fire(new t.ErrorEvent(new Error("There is no source with ID '" + e + "'")));
      }, r.prototype.areTilesLoaded = function () {
        var t = this.style && this.style.sourceCaches;

        for (var e in t) {
          var i = t[e]._tiles;

          for (var o in i) {
            var r = i[o];
            if ("loaded" !== r.state && "errored" !== r.state) return !1;
          }
        }

        return !0;
      }, r.prototype.addSourceType = function (t, e, i) {
        return this.style.addSourceType(t, e, i);
      }, r.prototype.removeSource = function (t) {
        return this.style.removeSource(t), this._update(!0);
      }, r.prototype.getSource = function (t) {
        return this.style.getSource(t);
      }, r.prototype.addImage = function (e, i, o) {
        void 0 === o && (o = {});
        var r = o.pixelRatio;
        void 0 === r && (r = 1);
        var a = o.sdf;
        void 0 === a && (a = !1);

        if (i instanceof Mo) {
          var n = t.browser.getImageData(i),
              s = n.width,
              l = n.height,
              c = n.data;
          this.style.addImage(e, {
            data: new t.RGBAImage({
              width: s,
              height: l
            }, c),
            pixelRatio: r,
            sdf: a,
            version: 0
          });
        } else {
          if (void 0 === i.width || void 0 === i.height) return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.addImage(). The second argument must be an `HTMLImageElement`, `ImageData`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));
          var u = i.width,
              h = i.height,
              p = i.data,
              d = i;
          this.style.addImage(e, {
            data: new t.RGBAImage({
              width: u,
              height: h
            }, new Uint8Array(p)),
            pixelRatio: r,
            sdf: a,
            version: 0,
            userImage: d
          }), d.onAdd && d.onAdd(this, e);
        }
      }, r.prototype.updateImage = function (e, i) {
        var o = this.style.getImage(e);
        if (!o) return this.fire(new t.ErrorEvent(new Error("The map has no image with that id. If you are adding a new image use `map.addImage(...)` instead.")));
        var r = i instanceof Mo ? t.browser.getImageData(i) : i,
            a = r.width,
            n = r.height,
            s = r.data;
        if (void 0 === a || void 0 === n) return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.updateImage(). The second argument must be an `HTMLImageElement`, `ImageData`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));
        if (a !== o.data.width || n !== o.data.height) return this.fire(new t.ErrorEvent(new Error("The width and height of the updated image must be that same as the previous version of the image")));
        var l = !(i instanceof Mo);
        o.data.replace(s, l), this.style.updateImage(e, o);
      }, r.prototype.hasImage = function (e) {
        return e ? !!this.style.getImage(e) : (this.fire(new t.ErrorEvent(new Error("Missing required image id"))), !1);
      }, r.prototype.removeImage = function (t) {
        this.style.removeImage(t);
      }, r.prototype.loadImage = function (e, i) {
        t.getImage(this._requestManager.transformRequest(e, t.ResourceType.Image), i);
      }, r.prototype.listImages = function () {
        return this.style.listImages();
      }, r.prototype.addLayer = function (t, e) {
        return this.style.addLayer(t, e), this._update(!0);
      }, r.prototype.moveLayer = function (t, e) {
        return this.style.moveLayer(t, e), this._update(!0);
      }, r.prototype.removeLayer = function (t) {
        return this.style.removeLayer(t), this._update(!0);
      }, r.prototype.getLayer = function (t) {
        return this.style.getLayer(t);
      }, r.prototype.setFilter = function (t, e, i) {
        return void 0 === i && (i = {}), this.style.setFilter(t, e, i), this._update(!0);
      }, r.prototype.setLayerZoomRange = function (t, e, i) {
        return this.style.setLayerZoomRange(t, e, i), this._update(!0);
      }, r.prototype.getFilter = function (t) {
        return this.style.getFilter(t);
      }, r.prototype.setPaintProperty = function (t, e, i, o) {
        return void 0 === o && (o = {}), this.style.setPaintProperty(t, e, i, o), this._update(!0);
      }, r.prototype.getPaintProperty = function (t, e) {
        return this.style.getPaintProperty(t, e);
      }, r.prototype.setLayoutProperty = function (t, e, i, o) {
        return void 0 === o && (o = {}), this.style.setLayoutProperty(t, e, i, o), this._update(!0);
      }, r.prototype.getLayoutProperty = function (t, e) {
        return this.style.getLayoutProperty(t, e);
      }, r.prototype.setLight = function (t, e) {
        return void 0 === e && (e = {}), this.style.setLight(t, e), this._update(!0);
      }, r.prototype.getLight = function () {
        return this.style.getLight();
      }, r.prototype.setFeatureState = function (t, e) {
        return this.style.setFeatureState(t, e), this._update();
      }, r.prototype.removeFeatureState = function (t, e) {
        return this.style.removeFeatureState(t, e), this._update();
      }, r.prototype.getFeatureState = function (t) {
        return this.style.getFeatureState(t);
      }, r.prototype.getContainer = function () {
        return this._container;
      }, r.prototype.getCanvasContainer = function () {
        return this._canvasContainer;
      }, r.prototype.getCanvas = function () {
        return this._canvas;
      }, r.prototype._containerDimensions = function () {
        var t = 0,
            e = 0;
        return this._container && (t = this._container.clientWidth || 400, e = this._container.clientHeight || 300), [t, e];
      }, r.prototype._detectMissingCSS = function () {
        "rgb(250, 128, 114)" !== t.window.getComputedStyle(this._missingCSSCanary).getPropertyValue("background-color") && t.warnOnce("This page appears to be missing CSS declarations for Mapbox GL JS, which may cause the map to display incorrectly. Please ensure your page includes mapbox-gl.css, as described in https://www.mapbox.com/mapbox-gl-js/api/.");
      }, r.prototype._setupContainer = function () {
        var t = this._container;
        t.classList.add("mapboxgl-map"), (this._missingCSSCanary = i.create("div", "mapboxgl-canary", t)).style.visibility = "hidden", this._detectMissingCSS();
        var e = this._canvasContainer = i.create("div", "mapboxgl-canvas-container", t);
        this._interactive && e.classList.add("mapboxgl-interactive"), this._canvas = i.create("canvas", "mapboxgl-canvas", e), this._canvas.style.position = "absolute", this._canvas.addEventListener("webglcontextlost", this._contextLost, !1), this._canvas.addEventListener("webglcontextrestored", this._contextRestored, !1), this._canvas.setAttribute("tabindex", "0"), this._canvas.setAttribute("aria-label", "Map");

        var o = this._containerDimensions();

        this._resizeCanvas(o[0], o[1]);

        var r = this._controlContainer = i.create("div", "mapboxgl-control-container", t),
            a = this._controlPositions = {};
        ["top-left", "top-right", "bottom-left", "bottom-right"].forEach(function (t) {
          a[t] = i.create("div", "mapboxgl-ctrl-" + t, r);
        });
      }, r.prototype._resizeCanvas = function (e, i) {
        var o = t.window.devicePixelRatio || 1;
        this._canvas.width = o * e, this._canvas.height = o * i, this._canvas.style.width = e + "px", this._canvas.style.height = i + "px";
      }, r.prototype._setupPainter = function () {
        var i = t.extend({}, e.webGLContextAttributes, {
          failIfMajorPerformanceCaveat: this._failIfMajorPerformanceCaveat,
          preserveDrawingBuffer: this._preserveDrawingBuffer,
          antialias: this._antialias || !1
        }),
            o = this._canvas.getContext("webgl", i) || this._canvas.getContext("experimental-webgl", i);

        o ? (this.painter = new ao(o, this.transform), t.webpSupported.testSupport(o)) : this.fire(new t.ErrorEvent(new Error("Failed to initialize WebGL")));
      }, r.prototype._contextLost = function (e) {
        e.preventDefault(), this._frame && (this._frame.cancel(), this._frame = null), this.fire(new t.Event("webglcontextlost", {
          originalEvent: e
        }));
      }, r.prototype._contextRestored = function (e) {
        this._setupPainter(), this.resize(), this._update(), this.fire(new t.Event("webglcontextrestored", {
          originalEvent: e
        }));
      }, r.prototype.loaded = function () {
        return !this._styleDirty && !this._sourcesDirty && !!this.style && this.style.loaded();
      }, r.prototype._update = function (t) {
        return this.style ? (this._styleDirty = this._styleDirty || t, this._sourcesDirty = !0, this.triggerRepaint(), this) : this;
      }, r.prototype._requestRenderFrame = function (t) {
        return this._update(), this._renderTaskQueue.add(t);
      }, r.prototype._cancelRenderFrame = function (t) {
        this._renderTaskQueue.remove(t);
      }, r.prototype._render = function () {
        this.painter.context.setDirty(), this.painter.setBaseState(), this._renderTaskQueue.run();
        var e = !1;

        if (this.style && this._styleDirty) {
          this._styleDirty = !1;
          var i = this.transform.zoom,
              o = t.browser.now();
          this.style.zoomHistory.update(i, o);
          var r = new t.EvaluationParameters(i, {
            now: o,
            fadeDuration: this._fadeDuration,
            zoomHistory: this.style.zoomHistory,
            transition: this.style.getTransition()
          }),
              a = r.crossFadingFactor();
          1 === a && a === this._crossFadingFactor || (e = !0, this._crossFadingFactor = a), this.style.update(r);
        }

        return this.style && this._sourcesDirty && (this._sourcesDirty = !1, this.style._updateSources(this.transform)), this._placementDirty = this.style && this.style._updatePlacement(this.painter.transform, this.showCollisionBoxes, this._fadeDuration, this._crossSourceCollisions), this.painter.render(this.style, {
          showTileBoundaries: this.showTileBoundaries,
          showOverdrawInspector: this._showOverdrawInspector,
          rotating: this.isRotating(),
          zooming: this.isZooming(),
          moving: this.isMoving(),
          fadeDuration: this._fadeDuration
        }), this.fire(new t.Event("render")), this.loaded() && !this._loaded && (this._loaded = !0, this.fire(new t.Event("load"))), this.style && (this.style.hasTransitions() || e) && (this._styleDirty = !0), this.style && !this._placementDirty && this.style._releaseSymbolFadeTiles(), this._sourcesDirty || this._repaint || this._styleDirty || this._placementDirty ? this.triggerRepaint() : !this.isMoving() && this.loaded() && this.fire(new t.Event("idle")), this;
      }, r.prototype.remove = function () {
        this._hash && this._hash.remove();

        for (var e = 0, i = this._controls; e < i.length; e += 1) {
          i[e].onRemove(this);
        }

        this._controls = [], this._frame && (this._frame.cancel(), this._frame = null), this._renderTaskQueue.clear(), this.setStyle(null), void 0 !== t.window && (t.window.removeEventListener("resize", this._onWindowResize, !1), t.window.removeEventListener("online", this._onWindowOnline, !1));
        var o = this.painter.context.gl.getExtension("WEBGL_lose_context");
        o && o.loseContext(), Bo(this._canvasContainer), Bo(this._controlContainer), Bo(this._missingCSSCanary), this._container.classList.remove("mapboxgl-map"), this.fire(new t.Event("remove"));
      }, r.prototype.triggerRepaint = function () {
        var e = this;
        this.style && !this._frame && (this._frame = t.browser.frame(function () {
          e._frame = null, e._render();
        }));
      }, r.prototype._onWindowOnline = function () {
        this._update();
      }, r.prototype._onWindowResize = function () {
        this._trackResize && this.resize()._update();
      }, a.showTileBoundaries.get = function () {
        return !!this._showTileBoundaries;
      }, a.showTileBoundaries.set = function (t) {
        this._showTileBoundaries !== t && (this._showTileBoundaries = t, this._update());
      }, a.showCollisionBoxes.get = function () {
        return !!this._showCollisionBoxes;
      }, a.showCollisionBoxes.set = function (t) {
        this._showCollisionBoxes !== t && (this._showCollisionBoxes = t, t ? this.style._generateCollisionBoxes() : this._update());
      }, a.showOverdrawInspector.get = function () {
        return !!this._showOverdrawInspector;
      }, a.showOverdrawInspector.set = function (t) {
        this._showOverdrawInspector !== t && (this._showOverdrawInspector = t, this._update());
      }, a.repaint.get = function () {
        return !!this._repaint;
      }, a.repaint.set = function (t) {
        this._repaint !== t && (this._repaint = t, this.triggerRepaint());
      }, a.vertices.get = function () {
        return !!this._vertices;
      }, a.vertices.set = function (t) {
        this._vertices = t, this._update();
      }, r.prototype._setCacheLimits = function (e, i) {
        t.setCacheLimits(e, i);
      }, Object.defineProperties(r.prototype, a), r;
    }(Po);

    function Bo(t) {
      t.parentNode && t.parentNode.removeChild(t);
    }

    var Oo = {
      showCompass: !0,
      showZoom: !0,
      visualizePitch: !1
    },
        Fo = function (e) {
      var o = this;
      this.options = t.extend({}, Oo, e), this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-group"), this._container.addEventListener("contextmenu", function (t) {
        return t.preventDefault();
      }), this.options.showZoom && (t.bindAll(["_updateZoomButtons"], this), this._zoomInButton = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in", "Zoom in", function () {
        return o._map.zoomIn();
      }), this._zoomOutButton = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out", "Zoom out", function () {
        return o._map.zoomOut();
      })), this.options.showCompass && (t.bindAll(["_rotateCompassArrow"], this), this._compass = this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-compass", "Reset bearing to north", function () {
        o.options.visualizePitch ? o._map.resetNorthPitch() : o._map.resetNorth();
      }), this._compassArrow = i.create("span", "mapboxgl-ctrl-compass-arrow", this._compass));
    };

    function Uo(e, i, o) {
      if (e = new t.LngLat(e.lng, e.lat), i) {
        var r = new t.LngLat(e.lng - 360, e.lat),
            a = new t.LngLat(e.lng + 360, e.lat),
            n = o.locationPoint(e).distSqr(i);
        o.locationPoint(r).distSqr(i) < n ? e = r : o.locationPoint(a).distSqr(i) < n && (e = a);
      }

      for (; Math.abs(e.lng - o.center.lng) > 180;) {
        var s = o.locationPoint(e);
        if (s.x >= 0 && s.y >= 0 && s.x <= o.width && s.y <= o.height) break;
        e.lng > o.center.lng ? e.lng -= 360 : e.lng += 360;
      }

      return e;
    }

    Fo.prototype._updateZoomButtons = function () {
      var t = this._map.getZoom();

      t === this._map.getMaxZoom() ? this._zoomInButton.classList.add("mapboxgl-ctrl-icon-disabled") : this._zoomInButton.classList.remove("mapboxgl-ctrl-icon-disabled"), t === this._map.getMinZoom() ? this._zoomOutButton.classList.add("mapboxgl-ctrl-icon-disabled") : this._zoomOutButton.classList.remove("mapboxgl-ctrl-icon-disabled");
    }, Fo.prototype._rotateCompassArrow = function () {
      var t = this.options.visualizePitch ? "scale(" + 1 / Math.pow(Math.cos(this._map.transform.pitch * (Math.PI / 180)), .5) + ") rotateX(" + this._map.transform.pitch + "deg) rotateZ(" + this._map.transform.angle * (180 / Math.PI) + "deg)" : "rotate(" + this._map.transform.angle * (180 / Math.PI) + "deg)";
      this._compassArrow.style.transform = t;
    }, Fo.prototype.onAdd = function (t) {
      return this._map = t, this.options.showZoom && (this._map.on("zoom", this._updateZoomButtons), this._updateZoomButtons()), this.options.showCompass && (this.options.visualizePitch && this._map.on("pitch", this._rotateCompassArrow), this._map.on("rotate", this._rotateCompassArrow), this._rotateCompassArrow(), this._handler = new yo(t, {
        button: "left",
        element: this._compass
      }), i.addEventListener(this._compass, "mousedown", this._handler.onMouseDown), i.addEventListener(this._compass, "touchstart", this._handler.onMouseDown, {
        passive: !1
      }), this._handler.enable()), this._container;
    }, Fo.prototype.onRemove = function () {
      i.remove(this._container), this.options.showZoom && this._map.off("zoom", this._updateZoomButtons), this.options.showCompass && (this.options.visualizePitch && this._map.off("pitch", this._rotateCompassArrow), this._map.off("rotate", this._rotateCompassArrow), i.removeEventListener(this._compass, "mousedown", this._handler.onMouseDown), i.removeEventListener(this._compass, "touchstart", this._handler.onMouseDown, {
        passive: !1
      }), this._handler.disable(), delete this._handler), delete this._map;
    }, Fo.prototype._createButton = function (t, e, o) {
      var r = i.create("button", t, this._container);
      return r.type = "button", r.title = e, r.setAttribute("aria-label", e), r.addEventListener("click", o), r;
    };
    var No = {
      center: "translate(-50%,-50%)",
      top: "translate(-50%,0)",
      "top-left": "translate(0,0)",
      "top-right": "translate(-100%,0)",
      bottom: "translate(-50%,-100%)",
      "bottom-left": "translate(0,-100%)",
      "bottom-right": "translate(-100%,-100%)",
      left: "translate(0,-50%)",
      right: "translate(-100%,-50%)"
    };

    function Zo(t, e, i) {
      var o = t.classList;

      for (var r in No) {
        o.remove("mapboxgl-" + i + "-anchor-" + r);
      }

      o.add("mapboxgl-" + i + "-anchor-" + e);
    }

    var jo,
        qo = function (e) {
      function o(o, r) {
        if (e.call(this), (o instanceof t.window.HTMLElement || r) && (o = t.extend({
          element: o
        }, r)), t.bindAll(["_update", "_onMove", "_onUp", "_addDragHandler", "_onMapClick"], this), this._anchor = o && o.anchor || "center", this._color = o && o.color || "#3FB1CE", this._draggable = o && o.draggable || !1, this._state = "inactive", o && o.element) this._element = o.element, this._offset = t.Point.convert(o && o.offset || [0, 0]);else {
          this._defaultMarker = !0, this._element = i.create("div");
          var a = i.createNS("http://www.w3.org/2000/svg", "svg");
          a.setAttributeNS(null, "display", "block"), a.setAttributeNS(null, "height", "41px"), a.setAttributeNS(null, "width", "27px"), a.setAttributeNS(null, "viewBox", "0 0 27 41");
          var n = i.createNS("http://www.w3.org/2000/svg", "g");
          n.setAttributeNS(null, "stroke", "none"), n.setAttributeNS(null, "stroke-width", "1"), n.setAttributeNS(null, "fill", "none"), n.setAttributeNS(null, "fill-rule", "evenodd");
          var s = i.createNS("http://www.w3.org/2000/svg", "g");
          s.setAttributeNS(null, "fill-rule", "nonzero");
          var l = i.createNS("http://www.w3.org/2000/svg", "g");
          l.setAttributeNS(null, "transform", "translate(3.0, 29.0)"), l.setAttributeNS(null, "fill", "#000000");

          for (var c = 0, u = [{
            rx: "10.5",
            ry: "5.25002273"
          }, {
            rx: "10.5",
            ry: "5.25002273"
          }, {
            rx: "9.5",
            ry: "4.77275007"
          }, {
            rx: "8.5",
            ry: "4.29549936"
          }, {
            rx: "7.5",
            ry: "3.81822308"
          }, {
            rx: "6.5",
            ry: "3.34094679"
          }, {
            rx: "5.5",
            ry: "2.86367051"
          }, {
            rx: "4.5",
            ry: "2.38636864"
          }]; c < u.length; c += 1) {
            var h = u[c],
                p = i.createNS("http://www.w3.org/2000/svg", "ellipse");
            p.setAttributeNS(null, "opacity", "0.04"), p.setAttributeNS(null, "cx", "10.5"), p.setAttributeNS(null, "cy", "5.80029008"), p.setAttributeNS(null, "rx", h.rx), p.setAttributeNS(null, "ry", h.ry), l.appendChild(p);
          }

          var d = i.createNS("http://www.w3.org/2000/svg", "g");
          d.setAttributeNS(null, "fill", this._color);

          var _ = i.createNS("http://www.w3.org/2000/svg", "path");

          _.setAttributeNS(null, "d", "M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"), d.appendChild(_);
          var f = i.createNS("http://www.w3.org/2000/svg", "g");
          f.setAttributeNS(null, "opacity", "0.25"), f.setAttributeNS(null, "fill", "#000000");
          var m = i.createNS("http://www.w3.org/2000/svg", "path");
          m.setAttributeNS(null, "d", "M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"), f.appendChild(m);
          var g = i.createNS("http://www.w3.org/2000/svg", "g");
          g.setAttributeNS(null, "transform", "translate(6.0, 7.0)"), g.setAttributeNS(null, "fill", "#FFFFFF");
          var v = i.createNS("http://www.w3.org/2000/svg", "g");
          v.setAttributeNS(null, "transform", "translate(8.0, 8.0)");
          var y = i.createNS("http://www.w3.org/2000/svg", "circle");
          y.setAttributeNS(null, "fill", "#000000"), y.setAttributeNS(null, "opacity", "0.25"), y.setAttributeNS(null, "cx", "5.5"), y.setAttributeNS(null, "cy", "5.5"), y.setAttributeNS(null, "r", "5.4999962");
          var x = i.createNS("http://www.w3.org/2000/svg", "circle");
          x.setAttributeNS(null, "fill", "#FFFFFF"), x.setAttributeNS(null, "cx", "5.5"), x.setAttributeNS(null, "cy", "5.5"), x.setAttributeNS(null, "r", "5.4999962"), v.appendChild(y), v.appendChild(x), s.appendChild(l), s.appendChild(d), s.appendChild(f), s.appendChild(g), s.appendChild(v), a.appendChild(s), this._element.appendChild(a), this._offset = t.Point.convert(o && o.offset || [0, -14]);
        }
        this._element.classList.add("mapboxgl-marker"), this._element.addEventListener("dragstart", function (t) {
          t.preventDefault();
        }), Zo(this._element, this._anchor, "marker"), this._popup = null;
      }

      return e && (o.__proto__ = e), o.prototype = Object.create(e && e.prototype), o.prototype.constructor = o, o.prototype.addTo = function (t) {
        return this.remove(), this._map = t, t.getCanvasContainer().appendChild(this._element), t.on("move", this._update), t.on("moveend", this._update), this.setDraggable(this._draggable), this._update(), this._map.on("click", this._onMapClick), this;
      }, o.prototype.remove = function () {
        return this._map && (this._map.off("click", this._onMapClick), this._map.off("move", this._update), this._map.off("moveend", this._update), this._map.off("mousedown", this._addDragHandler), this._map.off("touchstart", this._addDragHandler), this._map.off("mouseup", this._onUp), this._map.off("touchend", this._onUp), this._map.off("mousemove", this._onMove), this._map.off("touchmove", this._onMove), delete this._map), i.remove(this._element), this._popup && this._popup.remove(), this;
      }, o.prototype.getLngLat = function () {
        return this._lngLat;
      }, o.prototype.setLngLat = function (e) {
        return this._lngLat = t.LngLat.convert(e), this._pos = null, this._popup && this._popup.setLngLat(this._lngLat), this._update(), this;
      }, o.prototype.getElement = function () {
        return this._element;
      }, o.prototype.setPopup = function (t) {
        if (this._popup && (this._popup.remove(), this._popup = null), t) {
          if (!("offset" in t.options)) {
            var e = Math.sqrt(Math.pow(13.5, 2) / 2);
            t.options.offset = this._defaultMarker ? {
              top: [0, 0],
              "top-left": [0, 0],
              "top-right": [0, 0],
              bottom: [0, -38.1],
              "bottom-left": [e, -1 * (24.6 + e)],
              "bottom-right": [-e, -1 * (24.6 + e)],
              left: [13.5, -24.6],
              right: [-13.5, -24.6]
            } : this._offset;
          }

          this._popup = t, this._lngLat && this._popup.setLngLat(this._lngLat);
        }

        return this;
      }, o.prototype._onMapClick = function (t) {
        var e = t.originalEvent.target,
            i = this._element;
        this._popup && (e === i || i.contains(e)) && this.togglePopup();
      }, o.prototype.getPopup = function () {
        return this._popup;
      }, o.prototype.togglePopup = function () {
        var t = this._popup;
        return t ? (t.isOpen() ? t.remove() : t.addTo(this._map), this) : this;
      }, o.prototype._update = function (t) {
        this._map && (this._map.transform.renderWorldCopies && (this._lngLat = Uo(this._lngLat, this._pos, this._map.transform)), this._pos = this._map.project(this._lngLat)._add(this._offset), t && "moveend" !== t.type || (this._pos = this._pos.round()), i.setTransform(this._element, No[this._anchor] + " translate(" + this._pos.x + "px, " + this._pos.y + "px)"));
      }, o.prototype.getOffset = function () {
        return this._offset;
      }, o.prototype.setOffset = function (e) {
        return this._offset = t.Point.convert(e), this._update(), this;
      }, o.prototype._onMove = function (e) {
        this._pos = e.point.sub(this._positionDelta), this._lngLat = this._map.unproject(this._pos), this.setLngLat(this._lngLat), this._element.style.pointerEvents = "none", "pending" === this._state && (this._state = "active", this.fire(new t.Event("dragstart"))), this.fire(new t.Event("drag"));
      }, o.prototype._onUp = function () {
        this._element.style.pointerEvents = "auto", this._positionDelta = null, this._map.off("mousemove", this._onMove), this._map.off("touchmove", this._onMove), "active" === this._state && this.fire(new t.Event("dragend")), this._state = "inactive";
      }, o.prototype._addDragHandler = function (t) {
        this._element.contains(t.originalEvent.target) && (t.preventDefault(), this._positionDelta = t.point.sub(this._pos).add(this._offset), this._state = "pending", this._map.on("mousemove", this._onMove), this._map.on("touchmove", this._onMove), this._map.once("mouseup", this._onUp), this._map.once("touchend", this._onUp));
      }, o.prototype.setDraggable = function (t) {
        return this._draggable = !!t, this._map && (t ? (this._map.on("mousedown", this._addDragHandler), this._map.on("touchstart", this._addDragHandler)) : (this._map.off("mousedown", this._addDragHandler), this._map.off("touchstart", this._addDragHandler))), this;
      }, o.prototype.isDraggable = function () {
        return this._draggable;
      }, o;
    }(t.Evented),
        Vo = {
      positionOptions: {
        enableHighAccuracy: !1,
        maximumAge: 0,
        timeout: 6e3
      },
      fitBoundsOptions: {
        maxZoom: 15
      },
      trackUserLocation: !1,
      showUserLocation: !0
    };

    var Go = function (e) {
      function o(i) {
        e.call(this), this.options = t.extend({}, Vo, i), t.bindAll(["_onSuccess", "_onError", "_finish", "_setupUI", "_updateCamera", "_updateMarker"], this);
      }

      return e && (o.__proto__ = e), o.prototype = Object.create(e && e.prototype), o.prototype.constructor = o, o.prototype.onAdd = function (e) {
        var o;
        return this._map = e, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-group"), o = this._setupUI, void 0 !== jo ? o(jo) : void 0 !== t.window.navigator.permissions ? t.window.navigator.permissions.query({
          name: "geolocation"
        }).then(function (t) {
          jo = "denied" !== t.state, o(jo);
        }) : (jo = !!t.window.navigator.geolocation, o(jo)), this._container;
      }, o.prototype.onRemove = function () {
        void 0 !== this._geolocationWatchID && (t.window.navigator.geolocation.clearWatch(this._geolocationWatchID), this._geolocationWatchID = void 0), this.options.showUserLocation && this._userLocationDotMarker && this._userLocationDotMarker.remove(), i.remove(this._container), this._map = void 0;
      }, o.prototype._onSuccess = function (e) {
        if (this.options.trackUserLocation) switch (this._lastKnownPosition = e, this._watchState) {
          case "WAITING_ACTIVE":
          case "ACTIVE_LOCK":
          case "ACTIVE_ERROR":
            this._watchState = "ACTIVE_LOCK", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");
            break;

          case "BACKGROUND":
          case "BACKGROUND_ERROR":
            this._watchState = "BACKGROUND", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");
        }
        this.options.showUserLocation && "OFF" !== this._watchState && this._updateMarker(e), this.options.trackUserLocation && "ACTIVE_LOCK" !== this._watchState || this._updateCamera(e), this.options.showUserLocation && this._dotElement.classList.remove("mapboxgl-user-location-dot-stale"), this.fire(new t.Event("geolocate", e)), this._finish();
      }, o.prototype._updateCamera = function (e) {
        var i = new t.LngLat(e.coords.longitude, e.coords.latitude),
            o = e.coords.accuracy,
            r = this._map.getBearing(),
            a = t.extend({
          bearing: r
        }, this.options.fitBoundsOptions);

        this._map.fitBounds(i.toBounds(o), a, {
          geolocateSource: !0
        });
      }, o.prototype._updateMarker = function (t) {
        t ? this._userLocationDotMarker.setLngLat([t.coords.longitude, t.coords.latitude]).addTo(this._map) : this._userLocationDotMarker.remove();
      }, o.prototype._onError = function (e) {
        if (this.options.trackUserLocation) if (1 === e.code) this._watchState = "OFF", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), void 0 !== this._geolocationWatchID && this._clearWatch();else switch (this._watchState) {
          case "WAITING_ACTIVE":
            this._watchState = "ACTIVE_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");
            break;

          case "ACTIVE_LOCK":
            this._watchState = "ACTIVE_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");
            break;

          case "BACKGROUND":
            this._watchState = "BACKGROUND_ERROR", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");
        }
        "OFF" !== this._watchState && this.options.showUserLocation && this._dotElement.classList.add("mapboxgl-user-location-dot-stale"), this.fire(new t.Event("error", e)), this._finish();
      }, o.prototype._finish = function () {
        this._timeoutId && clearTimeout(this._timeoutId), this._timeoutId = void 0;
      }, o.prototype._setupUI = function (e) {
        var o = this;
        !1 !== e ? (this._container.addEventListener("contextmenu", function (t) {
          return t.preventDefault();
        }), this._geolocateButton = i.create("button", "mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate", this._container), this._geolocateButton.type = "button", this._geolocateButton.setAttribute("aria-label", "Geolocate"), this.options.trackUserLocation && (this._geolocateButton.setAttribute("aria-pressed", "false"), this._watchState = "OFF"), this.options.showUserLocation && (this._dotElement = i.create("div", "mapboxgl-user-location-dot"), this._userLocationDotMarker = new qo(this._dotElement), this.options.trackUserLocation && (this._watchState = "OFF")), this._geolocateButton.addEventListener("click", this.trigger.bind(this)), this._setup = !0, this.options.trackUserLocation && this._map.on("movestart", function (e) {
          e.geolocateSource || "ACTIVE_LOCK" !== o._watchState || (o._watchState = "BACKGROUND", o._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background"), o._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), o.fire(new t.Event("trackuserlocationend")));
        })) : t.warnOnce("Geolocation support is not available, the GeolocateControl will not be visible.");
      }, o.prototype.trigger = function () {
        if (!this._setup) return t.warnOnce("Geolocate control triggered before added to a map"), !1;

        if (this.options.trackUserLocation) {
          switch (this._watchState) {
            case "OFF":
              this._watchState = "WAITING_ACTIVE", this.fire(new t.Event("trackuserlocationstart"));
              break;

            case "WAITING_ACTIVE":
            case "ACTIVE_LOCK":
            case "ACTIVE_ERROR":
            case "BACKGROUND_ERROR":
              this._watchState = "OFF", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"), this.fire(new t.Event("trackuserlocationend"));
              break;

            case "BACKGROUND":
              this._watchState = "ACTIVE_LOCK", this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"), this._lastKnownPosition && this._updateCamera(this._lastKnownPosition), this.fire(new t.Event("trackuserlocationstart"));
          }

          switch (this._watchState) {
            case "WAITING_ACTIVE":
              this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");
              break;

            case "ACTIVE_LOCK":
              this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");

              break;

            case "ACTIVE_ERROR":
              this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");
              break;

            case "BACKGROUND":
              this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");

              break;

            case "BACKGROUND_ERROR":
              this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error");
          }

          "OFF" === this._watchState && void 0 !== this._geolocationWatchID ? this._clearWatch() : void 0 === this._geolocationWatchID && (this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.setAttribute("aria-pressed", "true"), this._geolocationWatchID = t.window.navigator.geolocation.watchPosition(this._onSuccess, this._onError, this.options.positionOptions));
        } else t.window.navigator.geolocation.getCurrentPosition(this._onSuccess, this._onError, this.options.positionOptions), this._timeoutId = setTimeout(this._finish, 1e4);

        return !0;
      }, o.prototype._clearWatch = function () {
        t.window.navigator.geolocation.clearWatch(this._geolocationWatchID), this._geolocationWatchID = void 0, this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"), this._geolocateButton.setAttribute("aria-pressed", "false"), this.options.showUserLocation && this._updateMarker(null);
      }, o;
    }(t.Evented),
        Wo = {
      maxWidth: 100,
      unit: "metric"
    },
        Xo = function (e) {
      this.options = t.extend({}, Wo, e), t.bindAll(["_onMove", "setUnit"], this);
    };

    function Ho(t, e, i) {
      var o,
          r,
          a,
          n,
          s,
          l,
          c = i && i.maxWidth || 100,
          u = t._container.clientHeight / 2,
          h = (o = t.unproject([0, u]), r = t.unproject([c, u]), a = Math.PI / 180, n = o.lat * a, s = r.lat * a, l = Math.sin(n) * Math.sin(s) + Math.cos(n) * Math.cos(s) * Math.cos((r.lng - o.lng) * a), 6371e3 * Math.acos(Math.min(l, 1)));

      if (i && "imperial" === i.unit) {
        var p = 3.2808 * h;
        if (p > 5280) Ko(e, c, p / 5280, "mi");else Ko(e, c, p, "ft");
      } else if (i && "nautical" === i.unit) {
        Ko(e, c, h / 1852, "nm");
      } else Ko(e, c, h, "m");
    }

    function Ko(t, e, i, o) {
      var r,
          a,
          n,
          s = (r = i, a = Math.pow(10, ("" + Math.floor(r)).length - 1), n = (n = r / a) >= 10 ? 10 : n >= 5 ? 5 : n >= 3 ? 3 : n >= 2 ? 2 : n >= 1 ? 1 : function (t) {
        var e = Math.pow(10, Math.ceil(-Math.log(t) / Math.LN10));
        return Math.round(t * e) / e;
      }(n), a * n),
          l = s / i;
      "m" === o && s >= 1e3 && (s /= 1e3, o = "km"), t.style.width = e * l + "px", t.innerHTML = s + o;
    }

    Xo.prototype.getDefaultPosition = function () {
      return "bottom-left";
    }, Xo.prototype._onMove = function () {
      Ho(this._map, this._container, this.options);
    }, Xo.prototype.onAdd = function (t) {
      return this._map = t, this._container = i.create("div", "mapboxgl-ctrl mapboxgl-ctrl-scale", t.getContainer()), this._map.on("move", this._onMove), this._onMove(), this._container;
    }, Xo.prototype.onRemove = function () {
      i.remove(this._container), this._map.off("move", this._onMove), this._map = void 0;
    }, Xo.prototype.setUnit = function (t) {
      this.options.unit = t, Ho(this._map, this._container, this.options);
    };

    var Yo = function (e) {
      this._fullscreen = !1, e && e.container && (e.container instanceof t.window.HTMLElement ? this._container = e.container : t.warnOnce("Full screen control 'container' must be a DOM element.")), t.bindAll(["_onClickFullscreen", "_changeIcon"], this), "onfullscreenchange" in t.window.document ? this._fullscreenchange = "fullscreenchange" : "onmozfullscreenchange" in t.window.document ? this._fullscreenchange = "mozfullscreenchange" : "onwebkitfullscreenchange" in t.window.document ? this._fullscreenchange = "webkitfullscreenchange" : "onmsfullscreenchange" in t.window.document && (this._fullscreenchange = "MSFullscreenChange"), this._className = "mapboxgl-ctrl";
    };

    Yo.prototype.onAdd = function (e) {
      return this._map = e, this._container || (this._container = this._map.getContainer()), this._controlContainer = i.create("div", this._className + " mapboxgl-ctrl-group"), this._checkFullscreenSupport() ? this._setupUI() : (this._controlContainer.style.display = "none", t.warnOnce("This device does not support fullscreen mode.")), this._controlContainer;
    }, Yo.prototype.onRemove = function () {
      i.remove(this._controlContainer), this._map = null, t.window.document.removeEventListener(this._fullscreenchange, this._changeIcon);
    }, Yo.prototype._checkFullscreenSupport = function () {
      return !!(t.window.document.fullscreenEnabled || t.window.document.mozFullScreenEnabled || t.window.document.msFullscreenEnabled || t.window.document.webkitFullscreenEnabled);
    }, Yo.prototype._setupUI = function () {
      (this._fullscreenButton = i.create("button", this._className + "-icon " + this._className + "-fullscreen", this._controlContainer)).type = "button", this._updateTitle(), this._fullscreenButton.addEventListener("click", this._onClickFullscreen), t.window.document.addEventListener(this._fullscreenchange, this._changeIcon);
    }, Yo.prototype._updateTitle = function () {
      var t = this._isFullscreen() ? "Exit fullscreen" : "Enter fullscreen";
      this._fullscreenButton.setAttribute("aria-label", t), this._fullscreenButton.title = t;
    }, Yo.prototype._isFullscreen = function () {
      return this._fullscreen;
    }, Yo.prototype._changeIcon = function () {
      (t.window.document.fullscreenElement || t.window.document.mozFullScreenElement || t.window.document.webkitFullscreenElement || t.window.document.msFullscreenElement) === this._container !== this._fullscreen && (this._fullscreen = !this._fullscreen, this._fullscreenButton.classList.toggle(this._className + "-shrink"), this._fullscreenButton.classList.toggle(this._className + "-fullscreen"), this._updateTitle());
    }, Yo.prototype._onClickFullscreen = function () {
      this._isFullscreen() ? t.window.document.exitFullscreen ? t.window.document.exitFullscreen() : t.window.document.mozCancelFullScreen ? t.window.document.mozCancelFullScreen() : t.window.document.msExitFullscreen ? t.window.document.msExitFullscreen() : t.window.document.webkitCancelFullScreen && t.window.document.webkitCancelFullScreen() : this._container.requestFullscreen ? this._container.requestFullscreen() : this._container.mozRequestFullScreen ? this._container.mozRequestFullScreen() : this._container.msRequestFullscreen ? this._container.msRequestFullscreen() : this._container.webkitRequestFullscreen && this._container.webkitRequestFullscreen();
    };

    var Jo = {
      closeButton: !0,
      closeOnClick: !0,
      className: "",
      maxWidth: "240px"
    },
        Qo = function (e) {
      function o(i) {
        e.call(this), this.options = t.extend(Object.create(Jo), i), t.bindAll(["_update", "_onClickClose", "remove"], this);
      }

      return e && (o.__proto__ = e), o.prototype = Object.create(e && e.prototype), o.prototype.constructor = o, o.prototype.addTo = function (e) {
        var i = this;
        return this._map = e, this.options.closeOnClick && this._map.on("click", this._onClickClose), this._map.on("remove", this.remove), this._update(), this._trackPointer ? (this._map.on("mousemove", function (t) {
          i._update(t.point);
        }), this._map.on("mouseup", function (t) {
          i._update(t.point);
        }), this._container.classList.add("mapboxgl-popup-track-pointer"), this._map._canvasContainer.classList.add("mapboxgl-track-pointer")) : this._map.on("move", this._update), this.fire(new t.Event("open")), this;
      }, o.prototype.isOpen = function () {
        return !!this._map;
      }, o.prototype.remove = function () {
        return this._content && i.remove(this._content), this._container && (i.remove(this._container), delete this._container), this._map && (this._map.off("move", this._update), this._map.off("click", this._onClickClose), this._map.off("remove", this.remove), this._map.off("mousemove"), delete this._map), this.fire(new t.Event("close")), this;
      }, o.prototype.getLngLat = function () {
        return this._lngLat;
      }, o.prototype.setLngLat = function (e) {
        return this._lngLat = t.LngLat.convert(e), this._pos = null, this._map && (this._map.on("move", this._update), this._map.off("mousemove"), this._container.classList.remove("mapboxgl-popup-track-pointer"), this._map._canvasContainer.classList.remove("mapboxgl-track-pointer")), this._trackPointer = !1, this._update(), this;
      }, o.prototype.trackPointer = function () {
        var t = this;
        return this._trackPointer = !0, this._pos = null, this._map && (this._map.off("move", this._update), this._map.on("mousemove", function (e) {
          t._update(e.point);
        }), this._map.on("drag", function (e) {
          t._update(e.point);
        }), this._container.classList.add("mapboxgl-popup-track-pointer"), this._map._canvasContainer.classList.add("mapboxgl-track-pointer")), this;
      }, o.prototype.getElement = function () {
        return this._container;
      }, o.prototype.setText = function (e) {
        return this.setDOMContent(t.window.document.createTextNode(e));
      }, o.prototype.setHTML = function (e) {
        var i,
            o = t.window.document.createDocumentFragment(),
            r = t.window.document.createElement("body");

        for (r.innerHTML = e; i = r.firstChild;) {
          o.appendChild(i);
        }

        return this.setDOMContent(o);
      }, o.prototype.getMaxWidth = function () {
        return this._container.style.maxWidth;
      }, o.prototype.setMaxWidth = function (t) {
        return this.options.maxWidth = t, this._update(), this;
      }, o.prototype.setDOMContent = function (t) {
        return this._createContent(), this._content.appendChild(t), this._update(), this;
      }, o.prototype._createContent = function () {
        this._content && i.remove(this._content), this._content = i.create("div", "mapboxgl-popup-content", this._container), this.options.closeButton && (this._closeButton = i.create("button", "mapboxgl-popup-close-button", this._content), this._closeButton.type = "button", this._closeButton.setAttribute("aria-label", "Close popup"), this._closeButton.innerHTML = "&#215;", this._closeButton.addEventListener("click", this._onClickClose));
      }, o.prototype._update = function (e) {
        var o = this,
            r = this._lngLat || this._trackPointer;

        if (this._map && r && this._content && (this._container || (this._container = i.create("div", "mapboxgl-popup", this._map.getContainer()), this._tip = i.create("div", "mapboxgl-popup-tip", this._container), this._container.appendChild(this._content), this.options.className && this.options.className.split(" ").forEach(function (t) {
          return o._container.classList.add(t);
        })), this.options.maxWidth && this._container.style.maxWidth !== this.options.maxWidth && (this._container.style.maxWidth = this.options.maxWidth), this._map.transform.renderWorldCopies && !this._trackPointer && (this._lngLat = Uo(this._lngLat, this._pos, this._map.transform)), !this._trackPointer || e)) {
          var a = this._pos = this._trackPointer && e ? e : this._map.project(this._lngLat),
              n = this.options.anchor,
              s = function e(i) {
            if (i) {
              if ("number" == typeof i) {
                var o = Math.round(Math.sqrt(.5 * Math.pow(i, 2)));
                return {
                  center: new t.Point(0, 0),
                  top: new t.Point(0, i),
                  "top-left": new t.Point(o, o),
                  "top-right": new t.Point(-o, o),
                  bottom: new t.Point(0, -i),
                  "bottom-left": new t.Point(o, -o),
                  "bottom-right": new t.Point(-o, -o),
                  left: new t.Point(i, 0),
                  right: new t.Point(-i, 0)
                };
              }

              if (i instanceof t.Point || Array.isArray(i)) {
                var r = t.Point.convert(i);
                return {
                  center: r,
                  top: r,
                  "top-left": r,
                  "top-right": r,
                  bottom: r,
                  "bottom-left": r,
                  "bottom-right": r,
                  left: r,
                  right: r
                };
              }

              return {
                center: t.Point.convert(i.center || [0, 0]),
                top: t.Point.convert(i.top || [0, 0]),
                "top-left": t.Point.convert(i["top-left"] || [0, 0]),
                "top-right": t.Point.convert(i["top-right"] || [0, 0]),
                bottom: t.Point.convert(i.bottom || [0, 0]),
                "bottom-left": t.Point.convert(i["bottom-left"] || [0, 0]),
                "bottom-right": t.Point.convert(i["bottom-right"] || [0, 0]),
                left: t.Point.convert(i.left || [0, 0]),
                right: t.Point.convert(i.right || [0, 0])
              };
            }

            return e(new t.Point(0, 0));
          }(this.options.offset);

          if (!n) {
            var l,
                c = this._container.offsetWidth,
                u = this._container.offsetHeight;
            l = a.y + s.bottom.y < u ? ["top"] : a.y > this._map.transform.height - u ? ["bottom"] : [], a.x < c / 2 ? l.push("left") : a.x > this._map.transform.width - c / 2 && l.push("right"), n = 0 === l.length ? "bottom" : l.join("-");
          }

          var h = a.add(s[n]).round();
          i.setTransform(this._container, No[n] + " translate(" + h.x + "px," + h.y + "px)"), Zo(this._container, n, "popup");
        }
      }, o.prototype._onClickClose = function () {
        this.remove();
      }, o;
    }(t.Evented);

    var $o = {
      version: t.version,
      supported: e,
      setRTLTextPlugin: t.setRTLTextPlugin,
      Map: ko,
      NavigationControl: Fo,
      GeolocateControl: Go,
      AttributionControl: zo,
      ScaleControl: Xo,
      FullscreenControl: Yo,
      Popup: Qo,
      Marker: qo,
      Style: Be,
      LngLat: t.LngLat,
      LngLatBounds: t.LngLatBounds,
      Point: t.Point,
      MercatorCoordinate: t.MercatorCoordinate,
      Evented: t.Evented,
      config: t.config,

      get accessToken() {
        return t.config.ACCESS_TOKEN;
      },

      set accessToken(e) {
        t.config.ACCESS_TOKEN = e;
      },

      get baseApiUrl() {
        return t.config.API_URL;
      },

      set baseApiUrl(e) {
        t.config.API_URL = e;
      },

      get workerCount() {
        return Rt.workerCount;
      },

      set workerCount(t) {
        Rt.workerCount = t;
      },

      get maxParallelImageRequests() {
        return t.config.MAX_PARALLEL_IMAGE_REQUESTS;
      },

      set maxParallelImageRequests(e) {
        t.config.MAX_PARALLEL_IMAGE_REQUESTS = e;
      },

      clearStorage: function (e) {
        t.clearTileCache(e);
      },
      workerUrl: ""
    };
    return $o;
  }); //

  return mapboxgl;
});
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _mapboxGl = _interopRequireDefault(require("mapbox-gl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  });
});
},{"mapbox-gl":"node_modules/mapbox-gl/dist/mapbox-gl.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41001" + '/');

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
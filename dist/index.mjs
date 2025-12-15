(function(){"use strict";try{if(typeof document<"u"){var a=document.createElement("style");a.appendChild(document.createTextNode(".mapdiv[data-v-39882e26]{width:100%;height:100%}.advanced-marker-wrapper{display:none}.mapdiv .advanced-marker-wrapper{display:inline-block}.custom-control-wrapper[data-v-3557b0e5]{display:none}.mapdiv .custom-control-wrapper[data-v-3557b0e5]{display:inline-block}.info-window-wrapper[data-v-16a2c673]{display:none}.mapdiv .info-window-wrapper[data-v-16a2c673]{display:inline-block}.custom-marker-wrapper[data-v-7c5f52d6]{display:none}.mapdiv .custom-marker-wrapper[data-v-7c5f52d6]{display:inline-block}")),document.head.appendChild(a)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
var ft = Object.defineProperty;
var pt = (t, e, r) => e in t ? ft(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var oe = (t, e, r) => (pt(t, typeof e != "symbol" ? e + "" : e, r), r);
import { defineComponent as S, ref as b, provide as G, watch as A, onMounted as et, onBeforeUnmount as B, markRaw as P, toRef as R, openBlock as F, createElementBlock as V, createElementVNode as de, renderSlot as z, normalizeProps as ht, guardReactiveProps as mt, computed as W, Comment as Ee, inject as O, Fragment as gt, mergeProps as Ce, createCommentVNode as Me } from "vue";
const D = Symbol("map"), U = Symbol("api"), Oe = Symbol("marker"), Te = Symbol("markerCluster"), fe = Symbol("CustomMarker"), tt = Symbol("mapTilesLoaded"), H = [
  "click",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "rightclick"
];
function vt(t, e) {
  t.src = e;
}
const yt = (t) => {
  var e, r, n, o = "The Google Maps JavaScript API", s = "google", i = "importLibrary", l = "__ib__", a = document, u = window, d = u[s] || (u[s] = {}), c = d.maps || (d.maps = {}), p = /* @__PURE__ */ new Set(), h = new URLSearchParams(), v = () => e || (e = new Promise(async (m, f) => {
    var g;
    await (r = a.createElement("script")), h.set("libraries", [...p] + "");
    for (n in t)
      h.set(n.replace(/[A-Z]/g, (y) => "_" + y[0].toLowerCase()), t[n]);
    h.set("callback", s + ".maps." + l), vt(r, "https://maps.googleapis.com/maps/api/js?" + h), c[l] = m, r.onerror = () => e = f(Error(o + " could not load.")), r.nonce = ((g = a.querySelector("script[nonce]")) == null ? void 0 : g.nonce) || "", a.head.append(r);
  }));
  c[i] ? console.warn(o + " only loads once. Ignoring:", t) : c[i] = (m, ...f) => p.add(m) && v().then(() => c[i](m, ...f));
}, _t = (t) => `The setOptions() function should only be called once. The options passed to the additional call (${JSON.stringify(t)}) will be ignored.`, wt = (t) => `The google.maps.importLibrary() function is already defined, and @googlemaps/js-api-loader will use the existing function instead of overwriting it. The options passed to setOptions (${JSON.stringify(t)}) will be ignored.`, bt = "No options were set before calling importLibrary. Make sure to configure the loader using setOptions().", kt = "There already is a script loading the Google Maps JavaScript API, and no google.maps.importLibrary function is defined. @googlemaps/js-api-loader will proceed to bootstrap the API with the specified options, but the existing script might cause problems using the API. Make sure to remove the script loading the API.", rt = process.env.NODE_ENV !== "production", Ae = rt ? (t) => {
  console.warn(`[@googlemaps/js-api-loader] ${t}`);
} : () => {
}, Et = rt ? (t) => {
  console.info(`[@googlemaps/js-api-loader] ${t}`);
} : () => {
}, Ct = process.env.NODE_ENV !== "production";
let we = !1;
function Mt(t) {
  if (we) {
    Ae(_t(t));
    return;
  }
  Tt(t), we = !0;
}
async function Ot(t) {
  var e, r;
  if (we || Ae(bt), !((r = (e = window == null ? void 0 : window.google) == null ? void 0 : e.maps) != null && r.importLibrary))
    throw new Error("google.maps.importLibrary is not installed.");
  return await google.maps.importLibrary(t);
}
function Tt(t) {
  var r, n;
  const e = !!((n = (r = window.google) == null ? void 0 : r.maps) != null && n.importLibrary);
  e ? Et(wt(t)) : Ct && document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]') && Ae(kt), e || yt(t);
}
function At(t) {
  return class extends t.OverlayView {
    constructor(n) {
      super();
      oe(this, "element");
      oe(this, "opts");
      const { element: o, ...s } = n;
      this.element = o, this.opts = s, this.opts.map && this.setMap(this.opts.map);
    }
    getPosition() {
      return this.opts.position ? this.opts.position instanceof t.LatLng ? this.opts.position : new t.LatLng(this.opts.position) : null;
    }
    getVisible() {
      if (!this.element)
        return !1;
      const n = this.element;
      return n.style.display !== "none" && n.style.visibility !== "hidden" && (n.style.opacity === "" || Number(n.style.opacity) > 0.01);
    }
    onAdd() {
      if (!this.element)
        return;
      const n = this.getPanes();
      n && n.overlayMouseTarget.appendChild(this.element);
    }
    draw() {
      if (!this.element)
        return;
      const n = this.getProjection(), o = n == null ? void 0 : n.fromLatLngToDivPixel(this.getPosition());
      if (o) {
        this.element.style.position = "absolute";
        let s, i;
        switch (this.opts.anchorPoint) {
          case "TOP_CENTER":
            s = "-50%", i = "-100%";
            break;
          case "BOTTOM_CENTER":
            s = "-50%", i = "0";
            break;
          case "LEFT_CENTER":
            s = "-100%", i = "-50%";
            break;
          case "RIGHT_CENTER":
            s = "0", i = "-50%";
            break;
          case "TOP_LEFT":
            s = "-100%", i = "-100%";
            break;
          case "TOP_RIGHT":
            s = "0", i = "-100%";
            break;
          case "BOTTOM_LEFT":
            s = "-100%", i = "0";
            break;
          case "BOTTOM_RIGHT":
            s = "0", i = "0";
            break;
          default:
            s = "-50%", i = "-50%";
        }
        const l = o.x + (this.opts.offsetX || 0) + "px", a = o.y + (this.opts.offsetY || 0) + "px";
        this.element.style.transform = `translateX(${s}) translateX(${l}) translateY(${i}) translateY(${a})`, this.opts.zIndex && (this.element.style.zIndex = this.opts.zIndex.toString());
      }
    }
    onRemove() {
      this.element && this.element.remove();
    }
    setOptions(n) {
      const { element: o, ...s } = n;
      this.element = o, this.opts = s, this.draw();
    }
  };
}
let xe = !1;
const Ie = [
  "bounds_changed",
  "center_changed",
  "click",
  "contextmenu",
  "dblclick",
  "drag",
  "dragend",
  "dragstart",
  "heading_changed",
  "idle",
  "isfractionalzoomenabled_changed",
  "mapcapabilities_changed",
  "maptypeid_changed",
  "mousemove",
  "mouseout",
  "mouseover",
  "projection_changed",
  "renderingtype_changed",
  "rightclick",
  "tilesloaded",
  "tilt_changed",
  "zoom_changed"
], St = S({
  props: {
    apiPromise: {
      type: Promise
    },
    apiKey: {
      type: String,
      default: ""
    },
    version: {
      type: String,
      default: "weekly"
    },
    libraries: {
      type: Array,
      default: () => ["places", "marker"]
    },
    region: {
      type: String,
      required: !1
    },
    language: {
      type: String,
      required: !1
    },
    backgroundColor: {
      type: String,
      required: !1
    },
    center: {
      type: Object,
      default: () => ({ lat: 0, lng: 0 })
    },
    clickableIcons: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    colorScheme: {
      type: String,
      required: !1
    },
    controlSize: {
      type: Number,
      required: !1
    },
    disableDefaultUi: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    disableDoubleClickZoom: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    draggable: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    draggableCursor: {
      type: String,
      required: !1
    },
    draggingCursor: {
      type: String,
      required: !1
    },
    fullscreenControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    fullscreenControlPosition: {
      type: String,
      required: !1
    },
    gestureHandling: {
      type: String,
      required: !1
    },
    heading: {
      type: Number,
      required: !1
    },
    isFractionalZoomEnabled: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    keyboardShortcuts: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    mapTypeControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    mapTypeControlOptions: {
      type: Object,
      required: !1
    },
    mapTypeId: {
      type: [Number, String],
      required: !1
    },
    mapId: {
      type: String,
      required: !1
    },
    maxZoom: {
      type: Number,
      required: !1
    },
    minZoom: {
      type: Number,
      required: !1
    },
    noClear: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    panControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    panControlPosition: {
      type: String,
      required: !1
    },
    restriction: {
      type: Object,
      required: !1
    },
    rotateControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    rotateControlPosition: {
      type: String,
      required: !1
    },
    scaleControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    scaleControlStyle: {
      type: Number,
      required: !1
    },
    scrollwheel: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    streetView: {
      type: Object,
      required: !1
    },
    streetViewControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    streetViewControlPosition: {
      type: String,
      required: !1
    },
    styles: {
      type: Array,
      required: !1
    },
    tilt: {
      type: Number,
      required: !1
    },
    zoom: {
      type: Number,
      required: !1
    },
    zoomControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    zoomControlPosition: {
      type: String,
      required: !1
    },
    cameraControl: {
      type: Boolean,
      required: !1,
      default: void 0
    },
    cameraControlPosition: {
      type: String,
      required: !1
    }
  },
  emits: Ie,
  setup(t, { emit: e }) {
    const r = b(), n = b(!1), o = b(), s = b(), i = b(!1);
    G(D, o), G(U, s), G(tt, i);
    const l = () => {
      const c = { ...t };
      Object.keys(c).forEach((m) => {
        c[m] === void 0 && delete c[m];
      });
      const h = (m) => {
        var f;
        return m ? { position: (f = s.value) == null ? void 0 : f.ControlPosition[m] } : {};
      }, v = {
        scaleControlOptions: t.scaleControlStyle ? { style: t.scaleControlStyle } : {},
        panControlOptions: h(t.panControlPosition),
        zoomControlOptions: h(t.zoomControlPosition),
        rotateControlOptions: h(t.rotateControlPosition),
        streetViewControlOptions: h(t.streetViewControlPosition),
        fullscreenControlOptions: h(t.fullscreenControlPosition),
        cameraControlOptions: h(t.cameraControlPosition),
        disableDefaultUI: t.disableDefaultUi
      };
      return { ...c, ...v };
    }, a = A(
      [s, o],
      ([c, p]) => {
        const h = c, v = p;
        h && v && (h.event.addListenerOnce(v, "tilesloaded", () => {
          i.value = !0;
        }), setTimeout(a, 0));
      },
      { immediate: !0 }
    ), u = () => {
      const { apiKey: c, region: p, version: h, language: v, libraries: m } = t;
      Mt({ key: c, region: p, v: h, language: v, libraries: m });
    }, d = (c) => {
      const p = c ? c.maps : google.maps;
      s.value = P(p), o.value = P(new p.Map(r.value, l()));
      const h = At(s.value);
      s.value[fe] = h, Ie.forEach((m) => {
        var f;
        (f = o.value) == null || f.addListener(m, (g) => e(m, g));
      }), n.value = !0;
      const v = Object.keys(t).filter(
        (m) => !["apiPromise", "apiKey", "version", "libraries", "region", "language", "center", "zoom"].includes(m)
      ).map((m) => R(t, m));
      A(
        [() => t.center, () => t.zoom, ...v],
        ([m, f], [g, y]) => {
          var k, T, x;
          const { center: E, zoom: C, ...w } = l();
          (k = o.value) == null || k.setOptions(w), f !== void 0 && f !== y && ((T = o.value) == null || T.setZoom(f));
          const _ = !g || m.lng !== g.lng || m.lat !== g.lat;
          m && _ && ((x = o.value) == null || x.panTo(m));
        }
      );
    };
    return et(() => {
      if (t.apiPromise && t.apiPromise instanceof Promise)
        t.apiPromise.then(d);
      else {
        xe || (u(), xe = !0);
        const c = t.libraries && t.libraries.length > 0 ? t.libraries : ["maps", "marker"];
        Promise.all(c.map((p) => Ot(p))).then(() => d());
      }
    }), B(() => {
      var c;
      i.value = !1, o.value && ((c = s.value) == null || c.event.clearInstanceListeners(o.value));
    }), { mapRef: r, ready: n, map: o, api: s, mapTilesLoaded: i };
  }
});
const re = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, o] of e)
    r[n] = o;
  return r;
}, Pt = {
  ref: "mapRef",
  class: "mapdiv"
};
function Lt(t, e, r, n, o, s) {
  return F(), V("div", null, [
    de("div", Pt, null, 512),
    z(t.$slots, "default", ht(mt({ ready: t.ready, map: t.map, api: t.api, mapTilesLoaded: t.mapTilesLoaded })), void 0, !0)
  ]);
}
const An = /* @__PURE__ */ re(St, [["render", Lt], ["__scopeId", "data-v-39882e26"]]);
function xt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var It = function t(e, r) {
  if (e === r)
    return !0;
  if (e && r && typeof e == "object" && typeof r == "object") {
    if (e.constructor !== r.constructor)
      return !1;
    var n, o, s;
    if (Array.isArray(e)) {
      if (n = e.length, n != r.length)
        return !1;
      for (o = n; o-- !== 0; )
        if (!t(e[o], r[o]))
          return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === r.source && e.flags === r.flags;
    if (e.valueOf !== Object.prototype.valueOf)
      return e.valueOf() === r.valueOf();
    if (e.toString !== Object.prototype.toString)
      return e.toString() === r.toString();
    if (s = Object.keys(e), n = s.length, n !== Object.keys(r).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, s[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      var i = s[o];
      if (!t(e[i], r[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
};
const ee = /* @__PURE__ */ xt(It), je = ["click", "drag", "dragend", "dragstart", "gmp-click"], jt = S({
  name: "AdvancedMarker",
  props: {
    options: {
      type: Object,
      required: !0
    },
    pinOptions: {
      type: Object,
      required: !1
    }
  },
  emits: je,
  setup(t, { emit: e, expose: r, slots: n }) {
    const o = b(), s = W(() => {
      var h;
      return (h = n.content) == null ? void 0 : h.call(n).some((v) => v.type !== Ee);
    }), i = R(t, "options"), l = R(t, "pinOptions"), a = b(), u = O(D, b()), d = O(U, b()), c = O(Te, b()), p = W(
      () => !!(c.value && d.value && a.value instanceof google.maps.marker.AdvancedMarkerElement)
    );
    return A(
      [u, i, l, o],
      async (h, [v, m, f, g]) => {
        var k, T, x;
        const y = !ee(i.value, m) || !ee(l.value, f), E = o.value !== g, C = y || E || u.value !== v;
        if (!u.value || !d.value || !C || s.value && !o.value)
          return;
        const { AdvancedMarkerElement: w, PinElement: _ } = d.value.marker;
        if (a.value) {
          const { map: pe, content: ne, ...he } = i.value;
          Object.assign(a.value, {
            content: s.value ? o.value : l.value ? new _(l.value).element : ne,
            ...he
          }), p.value && ((k = c.value) == null || k.removeMarker(a.value), (T = c.value) == null || T.addMarker(a.value));
        } else
          s.value ? i.value.content = o.value : l.value && (i.value.content = new _(l.value).element), a.value = P(new w(i.value)), p.value ? (x = c.value) == null || x.addMarker(a.value) : a.value.map = u.value, je.forEach((pe) => {
            var ne;
            (ne = a.value) == null || ne.addListener(pe, (he) => e(pe, he));
          });
      },
      {
        immediate: !0,
        flush: "post"
        // Ensure DOM updates happen before this watcher runs
      }
    ), B(() => {
      var h, v;
      a.value && ((h = d.value) == null || h.event.clearInstanceListeners(a.value), p.value ? (v = c.value) == null || v.removeMarker(a.value) : a.value.map = null);
    }), G(Oe, a), r({ marker: a }), { hasCustomSlotContent: s, markerRef: o };
  }
});
const qt = {
  key: 0,
  class: "advanced-marker-wrapper"
};
function Rt(t, e, r, n, o, s) {
  return F(), V(gt, null, [
    t.hasCustomSlotContent ? (F(), V("div", qt, [
      de("div", Ce({ ref: "markerRef" }, t.$attrs), [
        z(t.$slots, "content")
      ], 16)
    ])) : Me("", !0),
    z(t.$slots, "default")
  ], 64);
}
const Sn = /* @__PURE__ */ re(jt, [["render", Rt]]), qe = (t) => t === "Marker", Re = (t) => t === fe, Y = (t, e, r, n) => {
  const o = b(), s = O(D, b()), i = O(U, b()), l = O(Te, b()), a = W(
    () => !!(l.value && i.value && (o.value instanceof i.value.Marker || o.value instanceof i.value[fe]))
  );
  return A(
    [s, r],
    (u, [d, c]) => {
      var h, v, m;
      const p = !ee(r.value, c) || s.value !== d;
      if (!(!s.value || !i.value || !p))
        if (o.value)
          o.value.setOptions(r.value), a.value && ((h = l.value) == null || h.removeMarker(o.value), (v = l.value) == null || v.addMarker(o.value));
        else {
          if (qe(t))
            o.value = P(
              new i.value[t](r.value)
            );
          else if (Re(t)) {
            const f = r.value;
            f.element && (o.value = P(new i.value[t](f)));
          } else
            o.value = P(
              new i.value[t]({
                ...r.value,
                map: s.value
              })
            );
          o.value && (a.value ? (m = l.value) == null || m.addMarker(o.value) : (qe(t) || Re(t)) && o.value.setMap(s.value)), e.forEach((f) => {
            var g;
            (g = o.value) == null || g.addListener(f, (y) => n(f, y));
          });
        }
    },
    {
      immediate: !0,
      flush: "post"
    }
  ), B(() => {
    var u, d;
    o.value && ((u = i.value) == null || u.event.clearInstanceListeners(o.value), a.value ? (d = l.value) == null || d.removeMarker(o.value) : o.value.setMap(null));
  }), o;
}, $e = [
  "animation_changed",
  "click",
  "dblclick",
  "rightclick",
  "dragstart",
  "dragend",
  "drag",
  "mouseover",
  "mousedown",
  "mouseout",
  "mouseup",
  "draggable_changed",
  "clickable_changed",
  "contextmenu",
  "cursor_changed",
  "flat_changed",
  "zindex_changed",
  "icon_changed",
  "position_changed",
  "shape_changed",
  "title_changed",
  "visible_changed"
], Pn = S({
  name: "Marker",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: $e,
  setup(t, { emit: e, expose: r, slots: n }) {
    const o = R(t, "options"), s = Y("Marker", $e, o, e);
    return G(Oe, s), r({ marker: s }), () => {
      var i;
      return (i = n.default) == null ? void 0 : i.call(n);
    };
  }
}), Ln = S({
  name: "Polyline",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: H,
  setup(t, { emit: e }) {
    const r = R(t, "options");
    return { polyline: Y("Polyline", H, r, e) };
  },
  render: () => null
}), xn = S({
  name: "Polygon",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: H,
  setup(t, { emit: e }) {
    const r = R(t, "options");
    return { polygon: Y("Polygon", H, r, e) };
  },
  render: () => null
}), Ne = H.concat(["bounds_changed"]), In = S({
  name: "Rectangle",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: Ne,
  setup(t, { emit: e }) {
    const r = R(t, "options");
    return { rectangle: Y("Rectangle", Ne, r, e) };
  },
  render: () => null
}), Be = H.concat(["center_changed", "radius_changed"]), jn = S({
  name: "Circle",
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  emits: Be,
  setup(t, { emit: e }) {
    const r = R(t, "options");
    return { circle: Y("Circle", Be, r, e) };
  },
  render: () => null
}), $t = S({
  props: {
    position: {
      type: String,
      required: !0
    },
    index: {
      type: Number,
      default: 1
    }
  },
  emits: ["content:loaded"],
  setup(t, { emit: e }) {
    const r = b(null), n = O(D, b()), o = O(U, b()), s = O(tt, b(!1)), i = A(
      [s, o, r],
      ([u, d, c]) => {
        d && u && c && (l(t.position), e("content:loaded"), setTimeout(i, 0));
      },
      { immediate: !0 }
    ), l = (u) => {
      if (n.value && o.value && r.value) {
        const d = o.value.ControlPosition[u];
        r.value.index = t.index, n.value.controls[d].push(r.value);
      }
    }, a = (u) => {
      if (n.value && o.value) {
        let d = null;
        const c = o.value.ControlPosition[u];
        n.value.controls[c].forEach((p, h) => {
          p === r.value && (d = h);
        }), d !== null && n.value.controls[c].removeAt(d);
      }
    };
    return B(() => a(t.position)), A(
      () => t.position,
      (u, d) => {
        a(d), l(u);
      }
    ), A(
      () => t.index,
      (u) => {
        r.value && (r.value.index = u);
      }
    ), { controlRef: r };
  }
});
const Nt = {
  ref: "controlRef",
  class: "custom-control-wrapper"
};
function Bt(t, e, r, n, o, s) {
  return F(), V("div", Nt, [
    z(t.$slots, "default", {}, void 0, !0)
  ], 512);
}
const qn = /* @__PURE__ */ re($t, [["render", Bt], ["__scopeId", "data-v-3557b0e5"]]), De = [
  "closeclick",
  "content_changed",
  "domready",
  "position_changed",
  "visible",
  "zindex_changed"
], Dt = S({
  inheritAttrs: !1,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Boolean
    }
  },
  emits: [...De, "update:modelValue"],
  setup(t, { slots: e, emit: r, expose: n }) {
    const o = b(), s = b(), i = O(D, b()), l = O(U, b()), a = O(Oe, b());
    let u, d = t.modelValue;
    const c = W(() => {
      var m;
      return (m = e.default) == null ? void 0 : m.call(e).some((f) => f.type !== Ee);
    }), p = (m) => {
      d = m, r("update:modelValue", m);
    }, h = (m) => {
      o.value && (o.value.open({ map: i.value, anchor: a.value, ...m }), p(!0));
    }, v = () => {
      o.value && (o.value.close(), p(!1));
    };
    return et(() => {
      A(
        [i, () => t.options],
        ([m, f], [g, y]) => {
          var C;
          const E = !ee(f, y) || i.value !== g;
          i.value && l.value && E && (o.value ? (o.value.setOptions({
            ...f,
            content: c.value ? s.value : f.content
          }), a.value || h()) : (o.value = P(
            new l.value.InfoWindow({
              ...f,
              content: c.value ? s.value : f.content
            })
          ), a.value && (u = a.value.addListener("click", () => h())), (!a.value || d) && h(), De.forEach((w) => {
            var _;
            (_ = o.value) == null || _.addListener(w, (k) => r(w, k));
          }), (C = o.value) == null || C.addListener("closeclick", () => p(!1))));
        },
        {
          immediate: !0,
          flush: "post"
        }
      ), A(
        a,
        (m, f) => {
          !o.value || m === f || (u && (u.remove(), u = void 0), m && (u = m.addListener("click", () => h())));
        },
        {
          flush: "post"
        }
      ), A(
        () => t.modelValue,
        (m) => {
          m !== d && (m ? h() : v());
        }
      );
    }), B(() => {
      var m;
      u && u.remove(), o.value && ((m = l.value) == null || m.event.clearInstanceListeners(o.value), v());
    }), n({ infoWindow: o, open: h, close: v }), { infoWindow: o, infoWindowRef: s, hasSlotContent: c, open: h, close: v };
  }
});
const Ut = {
  key: 0,
  class: "info-window-wrapper"
};
function Zt(t, e, r, n, o, s) {
  return t.hasSlotContent ? (F(), V("div", Ut, [
    de("div", Ce({ ref: "infoWindowRef" }, t.$attrs), [
      z(t.$slots, "default", {}, void 0, !0)
    ], 16)
  ])) : Me("", !0);
}
const Rn = /* @__PURE__ */ re(Dt, [["render", Zt], ["__scopeId", "data-v-16a2c673"]]), { getOwnPropertyNames: Gt, getOwnPropertySymbols: Ft } = Object, { hasOwnProperty: Vt } = Object.prototype;
function me(t, e) {
  return function(n, o, s) {
    return t(n, o, s) && e(n, o, s);
  };
}
function se(t) {
  return function(r, n, o) {
    if (!r || !n || typeof r != "object" || typeof n != "object")
      return t(r, n, o);
    const { cache: s } = o, i = s.get(r), l = s.get(n);
    if (i && l)
      return i === n && l === r;
    s.set(r, n), s.set(n, r);
    const a = t(r, n, o);
    return s.delete(r), s.delete(n), a;
  };
}
function zt(t) {
  return t != null ? t[Symbol.toStringTag] : void 0;
}
function Ue(t) {
  return Gt(t).concat(Ft(t));
}
const Wt = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  Object.hasOwn || ((t, e) => Vt.call(t, e))
);
function Z(t, e) {
  return t === e || !t && !e && t !== t && e !== e;
}
const Ht = "__v", Yt = "__o", Kt = "_owner", { getOwnPropertyDescriptor: Ze, keys: Ge } = Object;
function Xt(t, e) {
  return t.byteLength === e.byteLength && le(new Uint8Array(t), new Uint8Array(e));
}
function Jt(t, e, r) {
  let n = t.length;
  if (e.length !== n)
    return !1;
  for (; n-- > 0; )
    if (!r.equals(t[n], e[n], n, n, t, e, r))
      return !1;
  return !0;
}
function Qt(t, e) {
  return t.byteLength === e.byteLength && le(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), new Uint8Array(e.buffer, e.byteOffset, e.byteLength));
}
function er(t, e) {
  return Z(t.getTime(), e.getTime());
}
function tr(t, e) {
  return t.name === e.name && t.message === e.message && t.cause === e.cause && t.stack === e.stack;
}
function rr(t, e) {
  return t === e;
}
function Fe(t, e, r) {
  const n = t.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  const o = new Array(n), s = t.entries();
  let i, l, a = 0;
  for (; (i = s.next()) && !i.done; ) {
    const u = e.entries();
    let d = !1, c = 0;
    for (; (l = u.next()) && !l.done; ) {
      if (o[c]) {
        c++;
        continue;
      }
      const p = i.value, h = l.value;
      if (r.equals(p[0], h[0], a, c, t, e, r) && r.equals(p[1], h[1], p[0], h[0], t, e, r)) {
        d = o[c] = !0;
        break;
      }
      c++;
    }
    if (!d)
      return !1;
    a++;
  }
  return !0;
}
const nr = Z;
function or(t, e, r) {
  const n = Ge(t);
  let o = n.length;
  if (Ge(e).length !== o)
    return !1;
  for (; o-- > 0; )
    if (!nt(t, e, r, n[o]))
      return !1;
  return !0;
}
function K(t, e, r) {
  const n = Ue(t);
  let o = n.length;
  if (Ue(e).length !== o)
    return !1;
  let s, i, l;
  for (; o-- > 0; )
    if (s = n[o], !nt(t, e, r, s) || (i = Ze(t, s), l = Ze(e, s), (i || l) && (!i || !l || i.configurable !== l.configurable || i.enumerable !== l.enumerable || i.writable !== l.writable)))
      return !1;
  return !0;
}
function sr(t, e) {
  return Z(t.valueOf(), e.valueOf());
}
function ir(t, e) {
  return t.source === e.source && t.flags === e.flags;
}
function Ve(t, e, r) {
  const n = t.size;
  if (n !== e.size)
    return !1;
  if (!n)
    return !0;
  const o = new Array(n), s = t.values();
  let i, l;
  for (; (i = s.next()) && !i.done; ) {
    const a = e.values();
    let u = !1, d = 0;
    for (; (l = a.next()) && !l.done; ) {
      if (!o[d] && r.equals(i.value, l.value, i.value, l.value, t, e, r)) {
        u = o[d] = !0;
        break;
      }
      d++;
    }
    if (!u)
      return !1;
  }
  return !0;
}
function le(t, e) {
  let r = t.byteLength;
  if (e.byteLength !== r || t.byteOffset !== e.byteOffset)
    return !1;
  for (; r-- > 0; )
    if (t[r] !== e[r])
      return !1;
  return !0;
}
function ar(t, e) {
  return t.hostname === e.hostname && t.pathname === e.pathname && t.protocol === e.protocol && t.port === e.port && t.hash === e.hash && t.username === e.username && t.password === e.password;
}
function nt(t, e, r, n) {
  return (n === Kt || n === Yt || n === Ht) && (t.$$typeof || e.$$typeof) ? !0 : Wt(e, n) && r.equals(t[n], e[n], n, n, t, e, r);
}
const lr = "[object ArrayBuffer]", cr = "[object Arguments]", ur = "[object Boolean]", dr = "[object DataView]", fr = "[object Date]", pr = "[object Error]", hr = "[object Map]", mr = "[object Number]", gr = "[object Object]", vr = "[object RegExp]", yr = "[object Set]", _r = "[object String]", wr = {
  "[object Int8Array]": !0,
  "[object Uint8Array]": !0,
  "[object Uint8ClampedArray]": !0,
  "[object Int16Array]": !0,
  "[object Uint16Array]": !0,
  "[object Int32Array]": !0,
  "[object Uint32Array]": !0,
  "[object Float16Array]": !0,
  "[object Float32Array]": !0,
  "[object Float64Array]": !0,
  "[object BigInt64Array]": !0,
  "[object BigUint64Array]": !0
}, br = "[object URL]", kr = Object.prototype.toString;
function Er({ areArrayBuffersEqual: t, areArraysEqual: e, areDataViewsEqual: r, areDatesEqual: n, areErrorsEqual: o, areFunctionsEqual: s, areMapsEqual: i, areNumbersEqual: l, areObjectsEqual: a, arePrimitiveWrappersEqual: u, areRegExpsEqual: d, areSetsEqual: c, areTypedArraysEqual: p, areUrlsEqual: h, unknownTagComparators: v }) {
  return function(f, g, y) {
    if (f === g)
      return !0;
    if (f == null || g == null)
      return !1;
    const E = typeof f;
    if (E !== typeof g)
      return !1;
    if (E !== "object")
      return E === "number" ? l(f, g, y) : E === "function" ? s(f, g, y) : !1;
    const C = f.constructor;
    if (C !== g.constructor)
      return !1;
    if (C === Object)
      return a(f, g, y);
    if (Array.isArray(f))
      return e(f, g, y);
    if (C === Date)
      return n(f, g, y);
    if (C === RegExp)
      return d(f, g, y);
    if (C === Map)
      return i(f, g, y);
    if (C === Set)
      return c(f, g, y);
    const w = kr.call(f);
    if (w === fr)
      return n(f, g, y);
    if (w === vr)
      return d(f, g, y);
    if (w === hr)
      return i(f, g, y);
    if (w === yr)
      return c(f, g, y);
    if (w === gr)
      return typeof f.then != "function" && typeof g.then != "function" && a(f, g, y);
    if (w === br)
      return h(f, g, y);
    if (w === pr)
      return o(f, g, y);
    if (w === cr)
      return a(f, g, y);
    if (wr[w])
      return p(f, g, y);
    if (w === lr)
      return t(f, g, y);
    if (w === dr)
      return r(f, g, y);
    if (w === ur || w === mr || w === _r)
      return u(f, g, y);
    if (v) {
      let _ = v[w];
      if (!_) {
        const k = zt(f);
        k && (_ = v[k]);
      }
      if (_)
        return _(f, g, y);
    }
    return !1;
  };
}
function Cr({ circular: t, createCustomConfig: e, strict: r }) {
  let n = {
    areArrayBuffersEqual: Xt,
    areArraysEqual: r ? K : Jt,
    areDataViewsEqual: Qt,
    areDatesEqual: er,
    areErrorsEqual: tr,
    areFunctionsEqual: rr,
    areMapsEqual: r ? me(Fe, K) : Fe,
    areNumbersEqual: nr,
    areObjectsEqual: r ? K : or,
    arePrimitiveWrappersEqual: sr,
    areRegExpsEqual: ir,
    areSetsEqual: r ? me(Ve, K) : Ve,
    areTypedArraysEqual: r ? me(le, K) : le,
    areUrlsEqual: ar,
    unknownTagComparators: void 0
  };
  if (e && (n = Object.assign({}, n, e(n))), t) {
    const o = se(n.areArraysEqual), s = se(n.areMapsEqual), i = se(n.areObjectsEqual), l = se(n.areSetsEqual);
    n = Object.assign({}, n, {
      areArraysEqual: o,
      areMapsEqual: s,
      areObjectsEqual: i,
      areSetsEqual: l
    });
  }
  return n;
}
function Mr(t) {
  return function(e, r, n, o, s, i, l) {
    return t(e, r, l);
  };
}
function Or({ circular: t, comparator: e, createState: r, equals: n, strict: o }) {
  if (r)
    return function(l, a) {
      const { cache: u = t ? /* @__PURE__ */ new WeakMap() : void 0, meta: d } = r();
      return e(l, a, {
        cache: u,
        equals: n,
        meta: d,
        strict: o
      });
    };
  if (t)
    return function(l, a) {
      return e(l, a, {
        cache: /* @__PURE__ */ new WeakMap(),
        equals: n,
        meta: void 0,
        strict: o
      });
    };
  const s = {
    cache: void 0,
    equals: n,
    meta: void 0,
    strict: o
  };
  return function(l, a) {
    return e(l, a, s);
  };
}
const ce = $();
$({ strict: !0 });
$({ circular: !0 });
$({
  circular: !0,
  strict: !0
});
$({
  createInternalComparator: () => Z
});
$({
  strict: !0,
  createInternalComparator: () => Z
});
$({
  circular: !0,
  createInternalComparator: () => Z
});
$({
  circular: !0,
  createInternalComparator: () => Z,
  strict: !0
});
function $(t = {}) {
  const { circular: e = !1, createInternalComparator: r, createState: n, strict: o = !1 } = t, s = Cr(t), i = Er(s), l = r ? r(i) : Mr(i);
  return Or({ circular: e, comparator: i, createState: n, equals: l, strict: o });
}
const ze = [
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
], ge = 1, X = 8;
class Se {
  /**
   * Creates an index from raw `ArrayBuffer` data.
   * @param {ArrayBuffer} data
   */
  static from(e) {
    if (!(e instanceof ArrayBuffer))
      throw new Error("Data must be an instance of ArrayBuffer.");
    const [r, n] = new Uint8Array(e, 0, 2);
    if (r !== 219)
      throw new Error("Data does not appear to be in a KDBush format.");
    const o = n >> 4;
    if (o !== ge)
      throw new Error(`Got v${o} data when expected v${ge}.`);
    const s = ze[n & 15];
    if (!s)
      throw new Error("Unrecognized array type.");
    const [i] = new Uint16Array(e, 2, 1), [l] = new Uint32Array(e, 4, 1);
    return new Se(l, i, s, e);
  }
  /**
   * Creates an index that will hold a given number of items.
   * @param {number} numItems
   * @param {number} [nodeSize=64] Size of the KD-tree node (64 by default).
   * @param {TypedArrayConstructor} [ArrayType=Float64Array] The array type used for coordinates storage (`Float64Array` by default).
   * @param {ArrayBuffer} [data] (For internal use only)
   */
  constructor(e, r = 64, n = Float64Array, o) {
    if (isNaN(e) || e < 0)
      throw new Error(`Unpexpected numItems value: ${e}.`);
    this.numItems = +e, this.nodeSize = Math.min(Math.max(+r, 2), 65535), this.ArrayType = n, this.IndexArrayType = e < 65536 ? Uint16Array : Uint32Array;
    const s = ze.indexOf(this.ArrayType), i = e * 2 * this.ArrayType.BYTES_PER_ELEMENT, l = e * this.IndexArrayType.BYTES_PER_ELEMENT, a = (8 - l % 8) % 8;
    if (s < 0)
      throw new Error(`Unexpected typed array class: ${n}.`);
    o && o instanceof ArrayBuffer ? (this.data = o, this.ids = new this.IndexArrayType(this.data, X, e), this.coords = new this.ArrayType(this.data, X + l + a, e * 2), this._pos = e * 2, this._finished = !0) : (this.data = new ArrayBuffer(X + i + l + a), this.ids = new this.IndexArrayType(this.data, X, e), this.coords = new this.ArrayType(this.data, X + l + a, e * 2), this._pos = 0, this._finished = !1, new Uint8Array(this.data, 0, 2).set([219, (ge << 4) + s]), new Uint16Array(this.data, 2, 1)[0] = r, new Uint32Array(this.data, 4, 1)[0] = e);
  }
  /**
   * Add a point to the index.
   * @param {number} x
   * @param {number} y
   * @returns {number} An incremental index associated with the added item (starting from `0`).
   */
  add(e, r) {
    const n = this._pos >> 1;
    return this.ids[n] = n, this.coords[this._pos++] = e, this.coords[this._pos++] = r, n;
  }
  /**
   * Perform indexing of the added points.
   */
  finish() {
    const e = this._pos >> 1;
    if (e !== this.numItems)
      throw new Error(`Added ${e} items when expected ${this.numItems}.`);
    return be(this.ids, this.coords, this.nodeSize, 0, this.numItems - 1, 0), this._finished = !0, this;
  }
  /**
   * Search the index for items within a given bounding box.
   * @param {number} minX
   * @param {number} minY
   * @param {number} maxX
   * @param {number} maxY
   * @returns {number[]} An array of indices correponding to the found items.
   */
  range(e, r, n, o) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: s, coords: i, nodeSize: l } = this, a = [0, s.length - 1, 0], u = [];
    for (; a.length; ) {
      const d = a.pop() || 0, c = a.pop() || 0, p = a.pop() || 0;
      if (c - p <= l) {
        for (let f = p; f <= c; f++) {
          const g = i[2 * f], y = i[2 * f + 1];
          g >= e && g <= n && y >= r && y <= o && u.push(s[f]);
        }
        continue;
      }
      const h = p + c >> 1, v = i[2 * h], m = i[2 * h + 1];
      v >= e && v <= n && m >= r && m <= o && u.push(s[h]), (d === 0 ? e <= v : r <= m) && (a.push(p), a.push(h - 1), a.push(1 - d)), (d === 0 ? n >= v : o >= m) && (a.push(h + 1), a.push(c), a.push(1 - d));
    }
    return u;
  }
  /**
   * Search the index for items within a given radius.
   * @param {number} qx
   * @param {number} qy
   * @param {number} r Query radius.
   * @returns {number[]} An array of indices correponding to the found items.
   */
  within(e, r, n) {
    if (!this._finished)
      throw new Error("Data not yet indexed - call index.finish().");
    const { ids: o, coords: s, nodeSize: i } = this, l = [0, o.length - 1, 0], a = [], u = n * n;
    for (; l.length; ) {
      const d = l.pop() || 0, c = l.pop() || 0, p = l.pop() || 0;
      if (c - p <= i) {
        for (let f = p; f <= c; f++)
          We(s[2 * f], s[2 * f + 1], e, r) <= u && a.push(o[f]);
        continue;
      }
      const h = p + c >> 1, v = s[2 * h], m = s[2 * h + 1];
      We(v, m, e, r) <= u && a.push(o[h]), (d === 0 ? e - n <= v : r - n <= m) && (l.push(p), l.push(h - 1), l.push(1 - d)), (d === 0 ? e + n >= v : r + n >= m) && (l.push(h + 1), l.push(c), l.push(1 - d));
    }
    return a;
  }
}
function be(t, e, r, n, o, s) {
  if (o - n <= r)
    return;
  const i = n + o >> 1;
  ot(t, e, i, n, o, s), be(t, e, r, n, i - 1, 1 - s), be(t, e, r, i + 1, o, 1 - s);
}
function ot(t, e, r, n, o, s) {
  for (; o > n; ) {
    if (o - n > 600) {
      const u = o - n + 1, d = r - n + 1, c = Math.log(u), p = 0.5 * Math.exp(2 * c / 3), h = 0.5 * Math.sqrt(c * p * (u - p) / u) * (d - u / 2 < 0 ? -1 : 1), v = Math.max(n, Math.floor(r - d * p / u + h)), m = Math.min(o, Math.floor(r + (u - d) * p / u + h));
      ot(t, e, r, v, m, s);
    }
    const i = e[2 * r + s];
    let l = n, a = o;
    for (J(t, e, n, r), e[2 * o + s] > i && J(t, e, n, o); l < a; ) {
      for (J(t, e, l, a), l++, a--; e[2 * l + s] < i; )
        l++;
      for (; e[2 * a + s] > i; )
        a--;
    }
    e[2 * n + s] === i ? J(t, e, n, a) : (a++, J(t, e, a, o)), a <= r && (n = a + 1), r <= a && (o = a - 1);
  }
}
function J(t, e, r, n) {
  ve(t, r, n), ve(e, 2 * r, 2 * n), ve(e, 2 * r + 1, 2 * n + 1);
}
function ve(t, e, r) {
  const n = t[e];
  t[e] = t[r], t[r] = n;
}
function We(t, e, r, n) {
  const o = t - r, s = e - n;
  return o * o + s * s;
}
const Tr = {
  minZoom: 0,
  // min zoom to generate clusters on
  maxZoom: 16,
  // max zoom level to cluster the points on
  minPoints: 2,
  // minimum points to form a cluster
  radius: 40,
  // cluster radius in pixels
  extent: 512,
  // tile extent (radius is calculated relative to it)
  nodeSize: 64,
  // size of the KD-tree leaf node, affects performance
  log: !1,
  // whether to log timing info
  // whether to generate numeric ids for input features (in vector tiles)
  generateId: !1,
  // a reduce function for calculating custom cluster properties
  reduce: null,
  // (accumulated, props) => { accumulated.sum += props.sum; }
  // properties to use for individual points when running the reducer
  map: (t) => t
  // props => ({sum: props.my_value})
}, He = Math.fround || ((t) => (e) => (t[0] = +e, t[0]))(new Float32Array(1)), N = 2, j = 3, ye = 4, I = 5, st = 6;
class it {
  constructor(e) {
    this.options = Object.assign(Object.create(Tr), e), this.trees = new Array(this.options.maxZoom + 1), this.stride = this.options.reduce ? 7 : 6, this.clusterProps = [];
  }
  load(e) {
    const { log: r, minZoom: n, maxZoom: o } = this.options;
    r && console.time("total time");
    const s = `prepare ${e.length} points`;
    r && console.time(s), this.points = e;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const u = e[a];
      if (!u.geometry)
        continue;
      const [d, c] = u.geometry.coordinates, p = He(ie(d)), h = He(ae(c));
      i.push(
        p,
        h,
        // projected point coordinates
        1 / 0,
        // the last zoom the point was processed at
        a,
        // index of the source feature in the original input array
        -1,
        // parent cluster id
        1
        // number of points in a cluster
      ), this.options.reduce && i.push(0);
    }
    let l = this.trees[o + 1] = this._createTree(i);
    r && console.timeEnd(s);
    for (let a = o; a >= n; a--) {
      const u = +Date.now();
      l = this.trees[a] = this._createTree(this._cluster(l, a)), r && console.log("z%d: %d clusters in %dms", a, l.numItems, +Date.now() - u);
    }
    return r && console.timeEnd("total time"), this;
  }
  getClusters(e, r) {
    let n = ((e[0] + 180) % 360 + 360) % 360 - 180;
    const o = Math.max(-90, Math.min(90, e[1]));
    let s = e[2] === 180 ? 180 : ((e[2] + 180) % 360 + 360) % 360 - 180;
    const i = Math.max(-90, Math.min(90, e[3]));
    if (e[2] - e[0] >= 360)
      n = -180, s = 180;
    else if (n > s) {
      const c = this.getClusters([n, o, 180, i], r), p = this.getClusters([-180, o, s, i], r);
      return c.concat(p);
    }
    const l = this.trees[this._limitZoom(r)], a = l.range(ie(n), ae(i), ie(s), ae(o)), u = l.data, d = [];
    for (const c of a) {
      const p = this.stride * c;
      d.push(u[p + I] > 1 ? Ye(u, p, this.clusterProps) : this.points[u[p + j]]);
    }
    return d;
  }
  getChildren(e) {
    const r = this._getOriginId(e), n = this._getOriginZoom(e), o = "No cluster with the specified id.", s = this.trees[n];
    if (!s)
      throw new Error(o);
    const i = s.data;
    if (r * this.stride >= i.length)
      throw new Error(o);
    const l = this.options.radius / (this.options.extent * Math.pow(2, n - 1)), a = i[r * this.stride], u = i[r * this.stride + 1], d = s.within(a, u, l), c = [];
    for (const p of d) {
      const h = p * this.stride;
      i[h + ye] === e && c.push(i[h + I] > 1 ? Ye(i, h, this.clusterProps) : this.points[i[h + j]]);
    }
    if (c.length === 0)
      throw new Error(o);
    return c;
  }
  getLeaves(e, r, n) {
    r = r || 10, n = n || 0;
    const o = [];
    return this._appendLeaves(o, e, r, n, 0), o;
  }
  getTile(e, r, n) {
    const o = this.trees[this._limitZoom(e)], s = Math.pow(2, e), { extent: i, radius: l } = this.options, a = l / i, u = (n - a) / s, d = (n + 1 + a) / s, c = {
      features: []
    };
    return this._addTileFeatures(
      o.range((r - a) / s, u, (r + 1 + a) / s, d),
      o.data,
      r,
      n,
      s,
      c
    ), r === 0 && this._addTileFeatures(
      o.range(1 - a / s, u, 1, d),
      o.data,
      s,
      n,
      s,
      c
    ), r === s - 1 && this._addTileFeatures(
      o.range(0, u, a / s, d),
      o.data,
      -1,
      n,
      s,
      c
    ), c.features.length ? c : null;
  }
  getClusterExpansionZoom(e) {
    let r = this._getOriginZoom(e) - 1;
    for (; r <= this.options.maxZoom; ) {
      const n = this.getChildren(e);
      if (r++, n.length !== 1)
        break;
      e = n[0].properties.cluster_id;
    }
    return r;
  }
  _appendLeaves(e, r, n, o, s) {
    const i = this.getChildren(r);
    for (const l of i) {
      const a = l.properties;
      if (a && a.cluster ? s + a.point_count <= o ? s += a.point_count : s = this._appendLeaves(e, a.cluster_id, n, o, s) : s < o ? s++ : e.push(l), e.length === n)
        break;
    }
    return s;
  }
  _createTree(e) {
    const r = new Se(e.length / this.stride | 0, this.options.nodeSize, Float32Array);
    for (let n = 0; n < e.length; n += this.stride)
      r.add(e[n], e[n + 1]);
    return r.finish(), r.data = e, r;
  }
  _addTileFeatures(e, r, n, o, s, i) {
    for (const l of e) {
      const a = l * this.stride, u = r[a + I] > 1;
      let d, c, p;
      if (u)
        d = at(r, a, this.clusterProps), c = r[a], p = r[a + 1];
      else {
        const m = this.points[r[a + j]];
        d = m.properties;
        const [f, g] = m.geometry.coordinates;
        c = ie(f), p = ae(g);
      }
      const h = {
        type: 1,
        geometry: [[
          Math.round(this.options.extent * (c * s - n)),
          Math.round(this.options.extent * (p * s - o))
        ]],
        tags: d
      };
      let v;
      u || this.options.generateId ? v = r[a + j] : v = this.points[r[a + j]].id, v !== void 0 && (h.id = v), i.features.push(h);
    }
  }
  _limitZoom(e) {
    return Math.max(this.options.minZoom, Math.min(Math.floor(+e), this.options.maxZoom + 1));
  }
  _cluster(e, r) {
    const { radius: n, extent: o, reduce: s, minPoints: i } = this.options, l = n / (o * Math.pow(2, r)), a = e.data, u = [], d = this.stride;
    for (let c = 0; c < a.length; c += d) {
      if (a[c + N] <= r)
        continue;
      a[c + N] = r;
      const p = a[c], h = a[c + 1], v = e.within(a[c], a[c + 1], l), m = a[c + I];
      let f = m;
      for (const g of v) {
        const y = g * d;
        a[y + N] > r && (f += a[y + I]);
      }
      if (f > m && f >= i) {
        let g = p * m, y = h * m, E, C = -1;
        const w = ((c / d | 0) << 5) + (r + 1) + this.points.length;
        for (const _ of v) {
          const k = _ * d;
          if (a[k + N] <= r)
            continue;
          a[k + N] = r;
          const T = a[k + I];
          g += a[k] * T, y += a[k + 1] * T, a[k + ye] = w, s && (E || (E = this._map(a, c, !0), C = this.clusterProps.length, this.clusterProps.push(E)), s(E, this._map(a, k)));
        }
        a[c + ye] = w, u.push(g / f, y / f, 1 / 0, w, -1, f), s && u.push(C);
      } else {
        for (let g = 0; g < d; g++)
          u.push(a[c + g]);
        if (f > 1)
          for (const g of v) {
            const y = g * d;
            if (!(a[y + N] <= r)) {
              a[y + N] = r;
              for (let E = 0; E < d; E++)
                u.push(a[y + E]);
            }
          }
      }
    }
    return u;
  }
  // get index of the point from which the cluster originated
  _getOriginId(e) {
    return e - this.points.length >> 5;
  }
  // get zoom of the point from which the cluster originated
  _getOriginZoom(e) {
    return (e - this.points.length) % 32;
  }
  _map(e, r, n) {
    if (e[r + I] > 1) {
      const i = this.clusterProps[e[r + st]];
      return n ? Object.assign({}, i) : i;
    }
    const o = this.points[e[r + j]].properties, s = this.options.map(o);
    return n && s === o ? Object.assign({}, s) : s;
  }
}
function Ye(t, e, r) {
  return {
    type: "Feature",
    id: t[e + j],
    properties: at(t, e, r),
    geometry: {
      type: "Point",
      coordinates: [Ar(t[e]), Sr(t[e + 1])]
    }
  };
}
function at(t, e, r) {
  const n = t[e + I], o = n >= 1e4 ? `${Math.round(n / 1e3)}k` : n >= 1e3 ? `${Math.round(n / 100) / 10}k` : n, s = t[e + st], i = s === -1 ? {} : Object.assign({}, r[s]);
  return Object.assign(i, {
    cluster: !0,
    cluster_id: t[e + j],
    point_count: n,
    point_count_abbreviated: o
  });
}
function ie(t) {
  return t / 360 + 0.5;
}
function ae(t) {
  const e = Math.sin(t * Math.PI / 180), r = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return r < 0 ? 0 : r > 1 ? 1 : r;
}
function Ar(t) {
  return (t - 0.5) * 360;
}
function Sr(t) {
  const e = (180 - t * 360) * Math.PI / 180;
  return 360 * Math.atan(Math.exp(e)) / Math.PI - 90;
}
function Pe(t, e) {
  var r = {};
  for (var n in t)
    Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (r[n] = t[n]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(t); o < n.length; o++)
      e.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[o]) && (r[n[o]] = t[n[o]]);
  return r;
}
class M {
  static isAdvancedMarkerAvailable(e) {
    return google.maps.marker && e.getMapCapabilities().isAdvancedMarkersAvailable === !0;
  }
  static isAdvancedMarker(e) {
    return google.maps.marker && e instanceof google.maps.marker.AdvancedMarkerElement;
  }
  static setMap(e, r) {
    this.isAdvancedMarker(e) ? e.map = r : e.setMap(r);
  }
  static getPosition(e) {
    if (this.isAdvancedMarker(e)) {
      if (e.position) {
        if (e.position instanceof google.maps.LatLng)
          return e.position;
        if (Number.isFinite(e.position.lat) && Number.isFinite(e.position.lng))
          return new google.maps.LatLng(e.position.lat, e.position.lng);
      }
      return new google.maps.LatLng(null);
    }
    return e.getPosition();
  }
  static getVisible(e) {
    return this.isAdvancedMarker(e) ? !0 : e.getVisible();
  }
}
class te {
  constructor({ markers: e, position: r }) {
    this.markers = [], e && (this.markers = e), r && (r instanceof google.maps.LatLng ? this._position = r : this._position = new google.maps.LatLng(r));
  }
  get bounds() {
    if (this.markers.length === 0 && !this._position)
      return;
    const e = new google.maps.LatLngBounds(this._position, this._position);
    for (const r of this.markers)
      e.extend(M.getPosition(r));
    return e;
  }
  get position() {
    return this._position || this.bounds.getCenter();
  }
  /**
   * Get the count of **visible** markers.
   */
  get count() {
    return this.markers.filter((e) => M.getVisible(e)).length;
  }
  /**
   * Add a marker to the cluster.
   */
  push(e) {
    this.markers.push(e);
  }
  /**
   * Cleanup references and remove marker from map.
   */
  delete() {
    this.marker && (M.setMap(this.marker, null), this.marker = void 0), this.markers.length = 0;
  }
}
function L(t, e = "assertion failed") {
  if (t == null)
    throw Error(e);
}
const Pr = (t, e, r, n) => {
  const o = t.getBounds();
  L(o);
  const s = lt(o, e, n);
  return r.filter((i) => s.contains(M.getPosition(i)));
}, lt = (t, e, r) => {
  const { northEast: n, southWest: o } = xr(t, e), s = Ir({ northEast: n, southWest: o }, r);
  return jr(s, e);
}, Lr = (t, e, r) => {
  const n = lt(t, e, r), o = n.getNorthEast(), s = n.getSouthWest();
  return [s.lng(), s.lat(), o.lng(), o.lat()];
}, xr = (t, e) => {
  const r = e.fromLatLngToDivPixel(t.getNorthEast()), n = e.fromLatLngToDivPixel(t.getSouthWest());
  return L(r), L(n), { northEast: r, southWest: n };
}, Ir = ({ northEast: t, southWest: e }, r) => (t.x += r, t.y -= r, e.x -= r, e.y += r, { northEast: t, southWest: e }), jr = ({ northEast: t, southWest: e }, r) => {
  const n = r.fromDivPixelToLatLng(e), o = r.fromDivPixelToLatLng(t);
  return new google.maps.LatLngBounds(n, o);
};
class ct {
  constructor({ maxZoom: e = 16 }) {
    this.maxZoom = e;
  }
  /**
   * Helper function to bypass clustering based upon some map state such as
   * zoom, number of markers, etc.
   *
   * ```typescript
   *  cluster({markers, map}: AlgorithmInput): Cluster[] {
   *    if (shouldBypassClustering(map)) {
   *      return this.noop({markers})
   *    }
   * }
   * ```
   */
  noop({ markers: e }) {
    return Rr(e);
  }
}
class qr extends ct {
  constructor(e) {
    var { viewportPadding: r = 60 } = e, n = Pe(e, ["viewportPadding"]);
    super(n), this.viewportPadding = 60, this.viewportPadding = r;
  }
  calculate({ markers: e, map: r, mapCanvasProjection: n }) {
    const o = r.getZoom();
    return L(o), o >= this.maxZoom ? {
      clusters: this.noop({
        markers: e
      }),
      changed: !1
    } : {
      clusters: this.cluster({
        markers: Pr(r, n, e, this.viewportPadding),
        map: r,
        mapCanvasProjection: n
      })
    };
  }
}
const Rr = (t) => t.map((r) => new te({
  position: M.getPosition(r),
  markers: [r]
}));
class $r extends ct {
  constructor(e) {
    var { maxZoom: r, radius: n = 60 } = e, o = Pe(e, ["maxZoom", "radius"]);
    super({ maxZoom: r }), this.markers = [], this.clusters = [], this.state = { zoom: -1 }, this.superCluster = new it(Object.assign({ maxZoom: this.maxZoom, radius: n }, o));
  }
  calculate(e) {
    let r = !1, n = e.map.getZoom();
    L(n), n = Math.round(n);
    const o = { zoom: n };
    if (!ce(e.markers, this.markers)) {
      r = !0, this.markers = [...e.markers];
      const s = this.markers.map((i) => {
        const l = M.getPosition(i);
        return {
          type: "Feature",
          geometry: { type: "Point", coordinates: [l.lng(), l.lat()] },
          properties: { marker: i }
        };
      });
      this.superCluster.load(s);
    }
    return r || (this.state.zoom <= this.maxZoom || o.zoom <= this.maxZoom) && (r = !ce(this.state, o)), this.state = o, e.markers.length === 0 ? (this.clusters = [], { clusters: this.clusters, changed: r }) : (r && (this.clusters = this.cluster(e)), { clusters: this.clusters, changed: r });
  }
  cluster({ map: e }) {
    const r = e.getZoom();
    return L(r), this.superCluster.getClusters([-180, -90, 180, 90], Math.round(r)).map((n) => this.transformCluster(n));
  }
  transformCluster({ geometry: { coordinates: [e, r] }, properties: n }) {
    if (n.cluster)
      return new te({
        markers: this.superCluster.getLeaves(n.cluster_id, 1 / 0).map((s) => s.properties.marker),
        position: { lat: r, lng: e }
      });
    const o = n.marker;
    return new te({
      markers: [o],
      position: M.getPosition(o)
    });
  }
}
class Nr extends qr {
  constructor(e) {
    var { maxZoom: r, radius: n = 60, viewportPadding: o = 60 } = e, s = Pe(e, ["maxZoom", "radius", "viewportPadding"]);
    super({ maxZoom: r, viewportPadding: o }), this.markers = [], this.clusters = [], this.superCluster = new it(Object.assign({ maxZoom: this.maxZoom, radius: n }, s)), this.state = { zoom: -1, view: [0, 0, 0, 0] };
  }
  calculate(e) {
    const r = this.getViewportState(e);
    let n = !ce(this.state, r);
    if (!ce(e.markers, this.markers)) {
      n = !0, this.markers = [...e.markers];
      const o = this.markers.map((s) => {
        const i = M.getPosition(s);
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [i.lng(), i.lat()]
          },
          properties: { marker: s }
        };
      });
      this.superCluster.load(o);
    }
    return n && (this.clusters = this.cluster(e), this.state = r), { clusters: this.clusters, changed: n };
  }
  cluster(e) {
    const r = this.getViewportState(e);
    return this.superCluster.getClusters(r.view, r.zoom).map((n) => this.transformCluster(n));
  }
  transformCluster({ geometry: { coordinates: [e, r] }, properties: n }) {
    if (n.cluster)
      return new te({
        markers: this.superCluster.getLeaves(n.cluster_id, 1 / 0).map((s) => s.properties.marker),
        position: { lat: r, lng: e }
      });
    const o = n.marker;
    return new te({
      markers: [o],
      position: M.getPosition(o)
    });
  }
  getViewportState(e) {
    const r = e.map.getZoom(), n = e.map.getBounds();
    return L(r), L(n), {
      zoom: Math.round(r),
      view: Lr(n, e.mapCanvasProjection, this.viewportPadding)
    };
  }
}
class Br {
  constructor(e, r) {
    this.markers = { sum: e.length };
    const n = r.map((s) => s.count), o = n.reduce((s, i) => s + i, 0);
    this.clusters = {
      count: r.length,
      markers: {
        mean: o / r.length,
        sum: o,
        min: Math.min(...n),
        max: Math.max(...n)
      }
    };
  }
}
class Dr {
  /**
   * The default render function for the library used by {@link MarkerClusterer}.
   *
   * Currently set to use the following:
   *
   * ```typescript
   * // change color if this cluster has more markers than the mean cluster
   * const color =
   *   count > Math.max(10, stats.clusters.markers.mean)
   *     ? "#ff0000"
   *     : "#0000ff";
   *
   * // create svg url with fill color
   * const svg = window.btoa(`
   * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
   *   <circle cx="120" cy="120" opacity=".6" r="70" />
   *   <circle cx="120" cy="120" opacity=".3" r="90" />
   *   <circle cx="120" cy="120" opacity=".2" r="110" />
   *   <circle cx="120" cy="120" opacity=".1" r="130" />
   * </svg>`);
   *
   * // create marker using svg icon
   * return new google.maps.Marker({
   *   position,
   *   icon: {
   *     url: `data:image/svg+xml;base64,${svg}`,
   *     scaledSize: new google.maps.Size(45, 45),
   *   },
   *   label: {
   *     text: String(count),
   *     color: "rgba(255,255,255,0.9)",
   *     fontSize: "12px",
   *   },
   *   // adjust zIndex to be above other markers
   *   zIndex: 1000 + count,
   * });
   * ```
   */
  render({ count: e, position: r }, n, o) {
    const i = `<svg fill="${e > Math.max(10, n.clusters.markers.mean) ? "#ff0000" : "#0000ff"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="50" height="50">
<circle cx="120" cy="120" opacity=".6" r="70" />
<circle cx="120" cy="120" opacity=".3" r="90" />
<circle cx="120" cy="120" opacity=".2" r="110" />
<text x="50%" y="50%" style="fill:#fff" text-anchor="middle" font-size="50" dominant-baseline="middle" font-family="roboto,arial,sans-serif">${e}</text>
</svg>`, l = `Cluster of ${e} markers`, a = Number(google.maps.Marker.MAX_ZINDEX) + e;
    if (M.isAdvancedMarkerAvailable(o)) {
      const c = new DOMParser().parseFromString(i, "image/svg+xml").documentElement;
      c.setAttribute("transform", "translate(0 25)");
      const p = {
        map: o,
        position: r,
        zIndex: a,
        title: l,
        content: c
      };
      return new google.maps.marker.AdvancedMarkerElement(p);
    }
    const u = {
      position: r,
      zIndex: a,
      title: l,
      icon: {
        url: `data:image/svg+xml;base64,${btoa(i)}`,
        anchor: new google.maps.Point(25, 25)
      }
    };
    return new google.maps.Marker(u);
  }
}
function Ur(t, e) {
  for (let r in e.prototype)
    t.prototype[r] = e.prototype[r];
}
class Le {
  constructor() {
    Ur(Le, google.maps.OverlayView);
  }
}
var q;
(function(t) {
  t.CLUSTERING_BEGIN = "clusteringbegin", t.CLUSTERING_END = "clusteringend", t.CLUSTER_CLICK = "click", t.GMP_CLICK = "gmp-click";
})(q || (q = {}));
const Zr = (t, e, r) => {
  e.bounds && r.fitBounds(e.bounds);
};
class Gr extends Le {
  constructor({ map: e, markers: r = [], algorithmOptions: n = {}, algorithm: o = new $r(n), renderer: s = new Dr(), onClusterClick: i = Zr }) {
    super(), this.map = null, this.idleListener = null, this.markers = [...r], this.clusters = [], this.algorithm = o, this.renderer = s, this.onClusterClick = i, e && this.setMap(e);
  }
  addMarker(e, r) {
    this.markers.includes(e) || (this.markers.push(e), r || this.render());
  }
  addMarkers(e, r) {
    e.forEach((n) => {
      this.addMarker(n, !0);
    }), r || this.render();
  }
  removeMarker(e, r) {
    const n = this.markers.indexOf(e);
    return n === -1 ? !1 : (M.setMap(e, null), this.markers.splice(n, 1), r || this.render(), !0);
  }
  removeMarkers(e, r) {
    let n = !1;
    return e.forEach((o) => {
      n = this.removeMarker(o, !0) || n;
    }), n && !r && this.render(), n;
  }
  clearMarkers(e) {
    this.markers.length = 0, e || this.render();
  }
  /**
   * Recalculates and draws all the marker clusters.
   */
  render() {
    const e = this.getMap();
    if (e instanceof google.maps.Map && e.getProjection()) {
      google.maps.event.trigger(this, q.CLUSTERING_BEGIN, this);
      const { clusters: r, changed: n } = this.algorithm.calculate({
        markers: this.markers,
        map: e,
        mapCanvasProjection: this.getProjection()
      });
      if (n || n == null) {
        const o = /* @__PURE__ */ new Set();
        for (const i of r)
          i.markers.length == 1 && o.add(i.markers[0]);
        const s = [];
        for (const i of this.clusters)
          i.marker != null && (i.markers.length == 1 ? o.has(i.marker) || M.setMap(i.marker, null) : s.push(i.marker));
        this.clusters = r, this.renderClusters(), requestAnimationFrame(() => s.forEach((i) => M.setMap(i, null)));
      }
      google.maps.event.trigger(this, q.CLUSTERING_END, this);
    }
  }
  onAdd() {
    const e = this.getMap();
    L(e), this.idleListener = e.addListener("idle", this.render.bind(this)), this.render();
  }
  onRemove() {
    this.idleListener && google.maps.event.removeListener(this.idleListener), this.reset();
  }
  reset() {
    this.markers.forEach((e) => M.setMap(e, null)), this.clusters.forEach((e) => e.delete()), this.clusters = [];
  }
  renderClusters() {
    const e = new Br(this.markers, this.clusters), r = this.getMap();
    this.clusters.forEach((n) => {
      if (n.markers.length === 1)
        n.marker = n.markers[0];
      else if (n.marker = this.renderer.render(n, e, r), n.markers.forEach((o) => M.setMap(o, null)), this.onClusterClick) {
        const o = M.isAdvancedMarker(n.marker) ? q.GMP_CLICK : q.CLUSTER_CLICK;
        n.marker.addListener(
          o,
          /* istanbul ignore next */
          (s) => {
            google.maps.event.trigger(this, q.CLUSTER_CLICK, n), this.onClusterClick(s, n, r);
          }
        );
      }
      M.setMap(n.marker, r);
    });
  }
}
function ke(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Fr = typeof global == "object" && global && global.Object === Object && global;
const Vr = Fr;
var zr = typeof self == "object" && self && self.Object === Object && self, Wr = Vr || zr || Function("return this")();
const ut = Wr;
var Hr = function() {
  return ut.Date.now();
};
const _e = Hr;
var Yr = /\s/;
function Kr(t) {
  for (var e = t.length; e-- && Yr.test(t.charAt(e)); )
    ;
  return e;
}
var Xr = /^\s+/;
function Jr(t) {
  return t && t.slice(0, Kr(t) + 1).replace(Xr, "");
}
var Qr = ut.Symbol;
const ue = Qr;
var dt = Object.prototype, en = dt.hasOwnProperty, tn = dt.toString, Q = ue ? ue.toStringTag : void 0;
function rn(t) {
  var e = en.call(t, Q), r = t[Q];
  try {
    t[Q] = void 0;
    var n = !0;
  } catch {
  }
  var o = tn.call(t);
  return n && (e ? t[Q] = r : delete t[Q]), o;
}
var nn = Object.prototype, on = nn.toString;
function sn(t) {
  return on.call(t);
}
var an = "[object Null]", ln = "[object Undefined]", Ke = ue ? ue.toStringTag : void 0;
function cn(t) {
  return t == null ? t === void 0 ? ln : an : Ke && Ke in Object(t) ? rn(t) : sn(t);
}
function un(t) {
  return t != null && typeof t == "object";
}
var dn = "[object Symbol]";
function fn(t) {
  return typeof t == "symbol" || un(t) && cn(t) == dn;
}
var Xe = 0 / 0, pn = /^[-+]0x[0-9a-f]+$/i, hn = /^0b[01]+$/i, mn = /^0o[0-7]+$/i, gn = parseInt;
function Je(t) {
  if (typeof t == "number")
    return t;
  if (fn(t))
    return Xe;
  if (ke(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = ke(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = Jr(t);
  var r = hn.test(t);
  return r || mn.test(t) ? gn(t.slice(2), r ? 2 : 8) : pn.test(t) ? Xe : +t;
}
var vn = "Expected a function", yn = Math.max, _n = Math.min;
function wn(t, e, r) {
  var n, o, s, i, l, a, u = 0, d = !1, c = !1, p = !0;
  if (typeof t != "function")
    throw new TypeError(vn);
  e = Je(e) || 0, ke(r) && (d = !!r.leading, c = "maxWait" in r, s = c ? yn(Je(r.maxWait) || 0, e) : s, p = "trailing" in r ? !!r.trailing : p);
  function h(_) {
    var k = n, T = o;
    return n = o = void 0, u = _, i = t.apply(T, k), i;
  }
  function v(_) {
    return u = _, l = setTimeout(g, e), d ? h(_) : i;
  }
  function m(_) {
    var k = _ - a, T = _ - u, x = e - k;
    return c ? _n(x, s - T) : x;
  }
  function f(_) {
    var k = _ - a, T = _ - u;
    return a === void 0 || k >= e || k < 0 || c && T >= s;
  }
  function g() {
    var _ = _e();
    if (f(_))
      return y(_);
    l = setTimeout(g, m(_));
  }
  function y(_) {
    return l = void 0, p && n ? h(_) : (n = o = void 0, i);
  }
  function E() {
    l !== void 0 && clearTimeout(l), u = 0, n = a = o = l = void 0;
  }
  function C() {
    return l === void 0 ? i : y(_e());
  }
  function w() {
    var _ = _e(), k = f(_);
    if (n = arguments, o = this, a = _, k) {
      if (l === void 0)
        return v(a);
      if (c)
        return clearTimeout(l), l = setTimeout(g, e), h(a);
    }
    return l === void 0 && (l = setTimeout(g, e)), i;
  }
  return w.cancel = E, w.flush = C, w;
}
class bn extends Gr {
  constructor(r, n = 10) {
    super(r);
    oe(this, "debouncedRender");
    this.debouncedRender = wn(
      () => {
        super.render();
      },
      n,
      { leading: !0, trailing: !0 }
    );
  }
  addMarker(r, n) {
    super.addMarker(r, !0), n || this.debouncedRender();
  }
  removeMarker(r, n) {
    const o = super.removeMarker(r, !0);
    return n || this.debouncedRender(), o;
  }
  addMarkers(r, n) {
    super.addMarkers(r, !0), n || this.debouncedRender();
  }
  removeMarkers(r, n) {
    const o = super.removeMarkers(r, !0);
    return n || this.debouncedRender(), o;
  }
  clearMarkers(r) {
    super.clearMarkers(!0), r || this.debouncedRender();
  }
  /** Renders immediately, canceling any pending debounced render. */
  render() {
    this.debouncedRender.cancel(), super.render();
  }
  destroy() {
    this.debouncedRender.cancel();
  }
}
const Qe = Object.values(q), $n = S({
  name: "MarkerCluster",
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    renderDebounceDelay: {
      type: Number,
      default: 10
    }
  },
  emits: Qe,
  setup(t, { emit: e, expose: r, slots: n }) {
    const o = b(), s = O(D, b()), i = O(U, b());
    return G(Te, o), A(
      s,
      () => {
        s.value && (o.value = P(
          new bn(
            {
              map: s.value,
              // Better perf than the default `SuperClusterAlgorithm`. See:
              // https://github.com/googlemaps/js-markerclusterer/pull/640
              algorithm: new Nr(t.options.algorithmOptions ?? {}),
              ...t.options
            },
            t.renderDebounceDelay
          )
        ), Qe.forEach((l) => {
          var a;
          (a = o.value) == null || a.addListener(l, (u) => e(l, u));
        }));
      },
      {
        immediate: !0
      }
    ), B(() => {
      var l;
      o.value && ((l = i.value) == null || l.event.clearInstanceListeners(o.value), o.value.clearMarkers(!0), o.value.setMap(null), o.value.destroy());
    }), r({ markerCluster: o }), () => {
      var l;
      return (l = n.default) == null ? void 0 : l.call(n);
    };
  }
}), kn = S({
  inheritAttrs: !1,
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  setup(t, { slots: e, emit: r, expose: n }) {
    const o = b(), s = W(() => {
      var a;
      return (a = e.default) == null ? void 0 : a.call(e).some((u) => u.type !== Ee);
    }), i = W(() => ({
      ...t.options,
      element: o.value
    })), l = Y(fe, [], i, r);
    return n({
      customMarker: l
    }), { customMarkerRef: o, customMarker: l, hasSlotContent: s };
  }
});
const En = {
  key: 0,
  class: "custom-marker-wrapper"
};
function Cn(t, e, r, n, o, s) {
  return t.hasSlotContent ? (F(), V("div", En, [
    de("div", Ce({
      ref: "customMarkerRef",
      style: { cursor: t.$attrs.onClick ? "pointer" : void 0 }
    }, t.$attrs), [
      z(t.$slots, "default", {}, void 0, !0)
    ], 16)
  ])) : Me("", !0);
}
const Nn = /* @__PURE__ */ re(kn, [["render", Cn], ["__scopeId", "data-v-7c5f52d6"]]), Bn = S({
  name: "HeatmapLayer",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup(t) {
    const e = b(), r = O(D, b()), n = O(U, b());
    return A(
      [r, () => t.options],
      ([o, s], [i, l]) => {
        const a = !ee(s, l) || r.value !== i;
        if (r.value && n.value && a) {
          let u;
          if (s.data && !(s.data instanceof n.value.MVCArray)) {
            const d = n.value.LatLng, c = s.data.map((p) => p instanceof d || "location" in p && (p.location instanceof d || p.location === null) ? p : "location" in p ? { ...p, location: new d(p.location) } : new d(p));
            u = {
              ...s,
              data: c
            };
          } else
            u = s;
          e.value ? e.value.setOptions(u) : e.value = P(
            new n.value.visualization.HeatmapLayer({
              ...u,
              map: r.value
            })
          );
        }
      },
      { immediate: !0 }
    ), B(() => {
      e.value && e.value.setMap(null);
    }), { heatmapLayer: e };
  },
  render: () => null
});
export {
  Sn as AdvancedMarker,
  jn as Circle,
  qn as CustomControl,
  Nn as CustomMarker,
  An as GoogleMap,
  Bn as HeatmapLayer,
  Rn as InfoWindow,
  Pn as Marker,
  $n as MarkerCluster,
  xn as Polygon,
  Ln as Polyline,
  In as Rectangle,
  U as apiSymbol,
  D as mapSymbol,
  tt as mapTilesLoadedSymbol
};

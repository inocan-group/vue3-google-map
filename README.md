# vue3-google-map

> Composable components for easy use of Google Maps with Vue 3

`vue3-google-map` offers a set of composable components for easy use of Google Maps in your Vue 3 projects.

Note: Please refer to the [documentation site](https://vue3-google-map.netlify.app/) for rendered examples.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Your First Map](#your-first-map)
- [Components](#components)
  - [Marker](#marker)
  - [Polyline](#polyline)
  - [Polygon](#polygon)
  - [Rectangle](#rectangle)
  - [Circle](#circle)
  - [Info Window](#info-window)
  - [Custom Marker](#custom-marker)
  - [Custom Control](#custom-control)
  - [Marker Cluster](#marker-cluster)
- [Advanced Usage](#advanced-usage)
- [Contribution](#contribution)
- [License](#license)

## Getting Started

### Installation

#### NPM

```bash
npm install vue3-google-map
# OR
yarn add vue3-google-map
```

#### CDN

Include the following script tag in your `index.html` (make sure to include it after Vue 3).

```html
<script src="https://unpkg.com/vue3-google-map"></script>
```

### Your First Map

To construct a map using `vue3-google-map` you'll need to use the base `GoogleMap` component which receives your [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key), styles (e.g. setting width and height), and any [MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions) to configure your map ([see this](https://github.com/inocan-group/vue3-google-map/blob/develop/src/components/GoogleMap.vue#L30-L209) for all the supported `MapOptions`).
Other map features can be added to your map by passing map subcomponents ([Marker](#marker), [Polyline](#polyline), [Polygon](#polygon), [Rectangle](#rectangle), [Circle](#circle), [InfoWindow](#info-window), [CustomMarker](#custom-marker), [CustomControl](#custom-control), or [MarkerCluster](#marker-cluster)) to the default slot of the `GoogleMap` component.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };

    return { center };
  },
});
</script>
```

## Components

This library is intended to be used in a _composable_ fashion and therefore you will find yourself using nested components to build your map rather than just a complicated _inline_ format.

The main mapping component is `GoogleMap`, however the following components are available at your disposal:

- [Marker](#marker)
- [Polyline](#polyline)
- [Polygon](#polygon)
- [Rectangle](#rectangle)
- [Circle](#circle)
- [InfoWindow](#info-window)
- [CustomMarker](#custom-marker)
- [CustomControl](#custom-control)
- [MarkerCluster](#marker-cluster)

### Marker

Use the `Marker` component to draw markers, drop pins or any custom icons on a map.

#### Options

You can pass a [MarkerOptions](https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerOptions) object to the `options` prop to configure your marker.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };
    const markerOptions = { position: center, label: "L", title: "LADY LIBERTY" };

    return { center, markerOptions };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker-Events) on the `Marker` component.

### Polyline

Use the `Polyline` component to draw paths and arbitrary shapes on a map.

#### Options

You can pass a [PolylineOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolylineOptions) object to the `options` prop to configure your polyline.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="3">
    <Polyline :options="flightPath" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Polyline } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Polyline },
  setup() {
    const center = { lat: 0, lng: -180 };
    const flightPlanCoordinates = [
      { lat: 37.772, lng: -122.214 },
      { lat: 21.291, lng: -157.821 },
      { lat: -18.142, lng: 178.431 },
      { lat: -27.467, lng: 153.027 },
    ];
    const flightPath = {
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    };

    return { center, flightPath };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline-Events) on the `Polyline` component.

### Polygon

Use the `Polygon` component to draw polgons (arbitrary number of sides) on a map.

#### Options

You can pass a [PolylgonOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#PolygonOptions) object to the `options` prop to configure your polyline.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="5">
    <Polygon :options="bermudaTriangle" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Polygon } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Polygon },
  setup() {
    const center = { lat: 24.886, lng: -70.268 };
    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];
    const bermudaTriangle = {
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    };

    return { center, bermudaTriangle };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon-Events) on the `Polygon` component.

### Rectangle

Use the `Rectangle` component to draw simple rectangles on a map.

#### Options

You can pass a [RectangleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#RectangleOptions) object to the `options` prop to configure your rectangle.

```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    mapTypeId="terrain"
    :center="center"
    :zoom="11"
  >
    <Rectangle :options="rectangle" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 33.678, lng: -116.243 };
    const rectangle = {
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      bounds: {
        north: 33.685,
        south: 33.671,
        east: -116.234,
        west: -116.251,
      },
    };

    return { center, rectangle };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle-Events) on the `Rectangle` component.

### Circle

Use the `Circle` component to draw circles on a map.

#### Options

You can pass a [CircleOptions](https://developers.google.com/maps/documentation/javascript/reference/polygon#CircleOptions) object to the `options` prop to configure your circle.

```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    mapTypeId="terrain"
    :center="center"
    :zoom="4"
  >
    <Circle v-for="circle in circles" :options="circle" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Circle } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Circle },
  setup() {
    const center = { lat: 37.09, lng: -95.712 };
    const cities = {
      chicago: {
        center: { lat: 41.878, lng: -87.629 },
        population: 2714856,
      },
      newyork: {
        center: { lat: 40.714, lng: -74.005 },
        population: 8405837,
      },
      losangeles: {
        center: { lat: 34.052, lng: -118.243 },
        population: 3857799,
      },
      vancouver: {
        center: { lat: 49.25, lng: -123.1 },
        population: 603502,
      },
    };

    const circles = {};

    for (const key in cities) {
      circles[key] = {
        center: cities[key].center,
        radius: Math.sqrt(cities[key].population) * 100,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      };
    }

    return { center, circles };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle-Events) on the `Circle` component.

### Info Window

Use the `InfoWindow` component to display content in a popup window above the map, at a given location.

#### Options

You can pass an [InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions) object to the `options` prop to configure your info window. Note that you can optionally pass your content to the default slot of the `InfoWindow` component.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="10">
    <InfoWindow :options="{ position: center, content: 'Hello World!' }" />
    <InfoWindow :options="{ position: { lat: center.lat, lng: 150.8 } }"> Content passed through slot </InfoWindow>
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, InfoWindow } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, InfoWindow },
  setup() {
    const center = { lat: -33.9, lng: 151.1 };

    return { center };
  },
});
</script>
```

#### Use with Marker

You can nest the `InfoWindow` component inside the `Marker` component to display an info window when the marker is clicked.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="4">
    <Marker :options="{ position: center }">
      <InfoWindow>
        <div id="contet">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
          <div id="bodyContent">
            <p>
              <b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large sandstone rock formation in the southern
              part of the Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) south west of the
              nearest large town, Alice Springs; 450&#160;km (280&#160;mi) by road. Kata Tjuta and Uluru are the two
              major features of the Uluru - Kata Tjuta National Park. Uluru is sacred to the Pitjantjatjara and
              Yankunytjatjara, the Aboriginal people of the area. It has many springs, waterholes, rock caves and
              ancient paintings. Uluru is listed as a World Heritage Site.
            </p>
            <p>
              Attribution: Uluru,
              <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
                https://en.wikipedia.org/w/index.php?title=Uluru</a
              >
              (last visited June 22, 2009).
            </p>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker, InfoWindow } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Marker, InfoWindow },
  setup() {
    const center = { lat: -25.363, lng: 131.044 };

    return { center };
  },
});
</script>
```

#### Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events) on the `InfoWindow` component.

### Custom Marker

Regular markers can be customized a great deal but if you need to you can use the `CustomMarker` component and provide your own custom markup through it's `default` slot.

#### Options

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `position` | `{ lat: number, lng: number}` | Sets the marker position. |
| `anchorPoint` | `'CENTER' \| 'TOP_CENTER' \|'BOTTOM_CENTER' \| 'LEFT_CENTER' \| 'RIGHT_CENTER' \| 'TOP_LEFT' \| 'TOP_RIGHT' \| 'BOTTOM_LEFT' \| 'BOTTOM_RIGHT'` | Sets how the marker is anchored relative to it's `position` point. Default is `CENTER`. |
| `offsetX` | `number` | Horizontal offset from the `position` point. |
| `offsetY` | `number` | Vertical offset from the `position` point. |
| `zIndex` | `number` | `z-index` value of the marker. |


```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <CustomMarker :options="{ position: center, anchorPoint: 'BOTTOM_CENTER' }">
      <div style="text-align: center">
        <div style="font-size: 1.125rem">Vuejs Amsterdam</div>
        <img src="https://vuejs.org/images/logo.png" width="50" height="50" style="margin-top: 8px" />
      </div>
    </CustomMarker>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, CustomMarker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, CustomMarker },
  setup() {
    const center = { lat: 52.36834, lng: 4.88635 }

    return { center }
  },
})
</script>
```

### Custom Control

Use the `CustomControl` component to add custom buttons/controls to your map.

#### Usage

You can define the markup of your custom control in the `default` slot of the `CustomControl` component. The component itself takes two props:

- `position`: Defines the position of your custom control on the map. Its value must be one of the [ControlPosition](https://developers.google.com/maps/documentation/javascript/reference/control#ControlPosition) constants.
- `index` (optional): Controls the order of placement for custom controls that occupy the same position.

Refer to the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/controls#CustomControls) on custom controls positioning.

```vue
<template>
  <GoogleMap api-key="YOUR_GOOGLE_MAPS_API_KEY" style="width: 100%; height: 500px" :center="center" :zoom="13">
    <CustomControl position="BOTTOM_CENTER">
      <button class="custom-btn" @click="sayHi">👋</button>
    </CustomControl>
  </GoogleMap>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, CustomControl } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, CustomControl },
  setup() {
    const center = { lat: 35, lng: -95 };
    const sayHi = () => alert("Hi!");

    return { center, sayHi };
  },
});
</script>

<style scoped>
.custom-btn {
  box-sizing: border-box;
  background: white;
  height: 40px;
  width: 40px;
  border-radius: 2px;
  border: 0px;
  margin: 10px;
  padding: 0px;
  font-size: 1.25rem;
  text-transform: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
}
</style>
```

### Marker Cluster

Use the `MarkerCluster` component to display a large number of markers on a map. It will combine markers of close proximity into clusters, and simplify the display of markers on the map. Can be used with the `Marker` or `CustomMarker` components.

#### Usage

Simply pass your `Marker`/`CustomMarker`(s) in the `default` slot of the `MarkerCluster` component.

```vue
<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="3"
  >
    <MarkerCluster>
      <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
    </MarkerCluster>
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, Marker, MarkerCluster },
  setup() {
    const center = { lat: -28.024, lng: 140.887 }

    const locations = [
      { lat: -31.56391, lng: 147.154312 },
      { lat: -33.718234, lng: 150.363181 },
      { lat: -33.727111, lng: 150.371124 },
      { lat: -33.848588, lng: 151.209834 },
      { lat: -33.851702, lng: 151.216968 },
      { lat: -34.671264, lng: 150.863657 },
      { lat: -35.304724, lng: 148.662905 },
      { lat: -36.817685, lng: 175.699196 },
      { lat: -36.828611, lng: 175.790222 },
      { lat: -37.75, lng: 145.116667 },
      { lat: -37.759859, lng: 145.128708 },
      { lat: -37.765015, lng: 145.133858 },
      { lat: -37.770104, lng: 145.143299 },
      { lat: -37.7737, lng: 145.145187 },
      { lat: -37.774785, lng: 145.137978 },
      { lat: -37.819616, lng: 144.968119 },
      { lat: -38.330766, lng: 144.695692 },
      { lat: -39.927193, lng: 175.053218 },
      { lat: -41.330162, lng: 174.865694 },
      { lat: -42.734358, lng: 147.439506 },
      { lat: -42.734358, lng: 147.501315 },
      { lat: -42.735258, lng: 147.438 },
      { lat: -43.999792, lng: 170.463352 },
    ]

    return { center, locations }
  },
})
</script>
```

#### Options

`MarkerCluster` accepts an `options` prop (an object) where you can configure `algorithm`, `onClusterClick`, and `renderer` from the [MarkerClustererOptions](https://googlemaps.github.io/js-markerclusterer/interfaces/MarkerClustererOptions.html) interface. Note that all these options are completely optional but non-reactive.

#### Events

You can listen for [the following events](https://googlemaps.github.io/js-markerclusterer/enums/MarkerClustererEvents.html) on the `MarkerCluster` component.


## Advanced Usage

The basic components that `vue3-google-map` provides are fully reactive and will get you pretty far. Should you need to access the Google Maps API, however, the `GoogleMaps` component exposes the following:

- `ready`: A boolean indicating when the Google Maps script has been loaded. By this point the map instance has been created, the API is ready for use and event listeners have been set up on the map.
- `map`: The [Map](https://developers.google.com/maps/documentation/javascript/reference/map#Map) class instance.
- `api`: The [Google Maps API](https://developers.google.com/maps/documentation/javascript/reference).
- `mapTilesLoaded`: A boolean indicating when the map tiles have been fully loaded.

Some usage patterns:

```vue
<template>
  <GoogleMap ref="mapRef">
    <template #default="{ ready, api, map, mapTilesLoaded }">
      <!-- First pattern: Here you have access to the API and map instance.
      "ready" is a boolean that indicates when the Google Maps script
      has been loaded and the api and map instance are ready to be used -->
    </template>
  </GoogleMap>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import { GoogleMap } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const mapRef = ref(null)

    // Second pattern: compute some value using the API or map instance when "ready"
    const markerIcon = computed(() => mapRef.value?.ready
      ? {
        url: /* icon image url */,
        scaledSize: new mapRef.value.api.Size(20, 20)
      }
      : null)

    // Third pattern: watch for "ready" then do something with the API or map instance
    watch(() => mapRef.value?.ready, (ready) => {
      if (!ready) return

      // do something with the api using `mapRef.value.api`
      // or with the map instance using `mapRef.value.map`
    })

    return { mapRef }
  },
})
</script>
```

Example:

```vue
<template>
  <GoogleMap ref="mapRef" api-key="YOUR_GOOGLE_MAPS_API_KEY" class="map" :center="center" :zoom="2" />
  <label for="lng">Longitude</label>
  <input v-model.number="lng" id="lng" type="number" min="-180" max="180" step="10" />
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { GoogleMap } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap },
  setup() {
    const mapRef = ref(null);
    const center = { lat: 0, lng: 0 };

    const _lng = ref(0);
    const lng = computed({
      get: () => _lng.value,
      set: (v) => {
        if (!Number.isFinite(v)) {
          _lng.value = 0;
        } else if (v > 180) {
          _lng.value = 180;
        } else if (v < -180) {
          _lng.value = -180;
        } else {
          _lng.value = v;
        }
      },
    });

    watch(lng, () => {
      if (mapRef.value?.ready) {
        mapRef.value.map.panTo({ lat: 0, lng: lng.value });
      }
    });

    return { mapRef, center, lng };
  },
});
</script>

<style scoped>
.map {
  position: relative;
  width: 100%;
  height: 500px;
}

.map::after {
  position: absolute;
  content: "";
  width: 1px;
  height: 100%;
  top: 0;
  left: 50%;
  background: red;
}

input[type="number"] {
  width: 200px;
  margin-top: 20px;
  margin-left: 10px;
}
</style>
```

In addition, most of the subcomponents expose their instance should you need it:

- `Marker` exposes `marker` (a [Marker](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker) class instance).
- `Polyline` exposes `polyline` (a [Polyline](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polyline) class instance).
- `Polygon` exposes `polygon` (a [Polygon](https://developers.google.com/maps/documentation/javascript/reference/polygon#Polygon) class instance).
- `Rectangle` exposes `rectangle` (a [Rectangle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Rectangle) class instance).
- `Circle` exposes `circle` (a [Circle](https://developers.google.com/maps/documentation/javascript/reference/polygon#Circle) class instance).
- `InfoWindow` exposes `infoWindow` (an [InfoWindow](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow) class instance).
- `MarkerCluster` exposes `markerCluster` (a [MarkerClusterer](https://googlemaps.github.io/js-markerclusterer/classes/MarkerClusterer.html) class instance).

## Contribution

All contributions are welcome. Before submitting a PR though it would be nice if you created an issue explaining what you want to acheive and why.

## License

[MIT](http://opensource.org/licenses/MIT)

<script setup>
import { GoogleMap, Marker, InfoWindow } from '@lib'
import { apiPromise } from '@docs/shared'
</script>

# Info Window

Use the `InfoWindow` component to display content in a popup window above the map, at a given location.

## Options

You can pass an [InfoWindowOptions](https://developers.google.com/maps/documentation/javascript/reference#InfoWindowOptions) object to the `options` prop to configure your info window. Note that you can optionally pass your content to the default slot of the `InfoWindow` component.

```vue
<script setup>
import { GoogleMap, InfoWindow } from 'vue3-google-map'

const center = { lat: -33.9, lng: 151.1 }
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="10"
  >
    <InfoWindow :options="{ position: center, content: 'Hello World!' }" />
    <InfoWindow :options="{ position: { lat: center.lat, lng: 150.8 } }">
      Content passed through slot
    </InfoWindow>
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="{ lat: -33.9, lng: 151.1 }"
    :zoom="10"
  >
    <InfoWindow :options="{ position: { lat: -33.9, lng: 151.1 }, content: 'Hello World!' }" />
    <InfoWindow :options="{ position: { lat: -33.9, lng: 150.8 } }">
    Content passed through slot
    </InfoWindow>
  </GoogleMap>
</ClientOnly>

## Use with Marker

You can nest the `InfoWindow` component inside the `Marker` component to display an info window when the marker is clicked.

```vue
<script setup>
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const center = { lat: -25.363, lng: 131.044 }
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="4"
  >
    <Marker :options="{ position: center }">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
          <div id="bodyContent">
            <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
            sandstone rock formation in the southern part of the
            Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
            south west of the nearest large town, Alice Springs; 450&#160;km
            (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
            features of the Uluru - Kata Tjuta National Park. Uluru is
            sacred to the Pitjantjatjara and Yankunytjatjara, the
            Aboriginal people of the area. It has many springs, waterholes,
            rock caves and ancient paintings. Uluru is listed as a World
            Heritage Site.</p>
            <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
            https://en.wikipedia.org/w/index.php?title=Uluru</a>
            (last visited June 22, 2009).</p>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

<ClientOnly>
  <GoogleMap
    :api-promise="apiPromise"
    style="width: 100%; height: 500px"
    :center="{ lat: -25.363, lng: 131.044 }"
    :zoom="4"
  >
    <Marker :options="{ position: { lat: -25.363, lng: 131.044 } }">
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="firstHeading">Uluru</h1>
          <div id="bodyContent">
            <p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large
            sandstone rock formation in the southern part of the
            Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi)
            south west of the nearest large town, Alice Springs; 450&#160;km
            (280&#160;mi) by road. Kata Tjuta and Uluru are the two major
            features of the Uluru - Kata Tjuta National Park. Uluru is
            sacred to the Pitjantjatjara and Yankunytjatjara, the
            Aboriginal people of the area. It has many springs, waterholes,
            rock caves and ancient paintings. Uluru is listed as a World
            Heritage Site.</p>
            <p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">
            https://en.wikipedia.org/w/index.php?title=Uluru</a>
            (last visited June 22, 2009).</p>
          </div>
        </div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</ClientOnly>

## Open and close the Info Window

You can use `v-model` to manage the state of the info window programmatically or to know whether it's open or closed

```vue
<script setup>
import { ref, watch } from 'vue';
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';

const center = { lat: -25.363, lng: 131.044 };
const infowindow = ref(true); // Will be open when mounted

watch(infowindow, (v) => {
  alert('infowindow has been ' + (v ? 'opened' : 'closed'));
});
</script>

<template>
  <GoogleMap
    api-key="YOUR_GOOGLE_MAPS_API_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="4"
  >
    <Marker :options="{ position: center }">
      <InfoWindow v-model="infowindow">
        <div id="content">This is the infowindow content</div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
</template>
```

## Events

You can listen for [the following events](https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindow-Events) on the `InfoWindow` component.

<style scoped>
:deep(.mapdiv) {
  color: #3c3c43;
}
</style>

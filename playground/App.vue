<script setup>
import { GoogleMap, AdvancedMarker, InfoWindow } from "../src";

const center = { lat: -25.363, lng: 131.044 };

const centerSydney = { lat: -33.87322, lng: 151.206176 };
const makerOptionsSydney = { position: centerSydney, title: "SYDNEY" };

const centerPerth = { lat: -31.954877, lng: 115.860462 };
const markerOptionsPerth = { position: centerPerth, title: "PERTH" };
</script>

<template>
  <GoogleMap mapId="DEMO_MAP_ID" style="width: 100%; height: 500px" :center="center" :zoom="4">
    <AdvancedMarker :options="makerOptionsSydney">
      <template>
        <InfoWindow>
          <h1>Sydney</h1>
          <div>Default AdvancedMarker With Custom InfoWindow</div>
        </InfoWindow>
      </template>
    </AdvancedMarker>

    <AdvancedMarker :options="markerOptionsPerth">
      <template #content>
        <div style="background: white; color: black; padding: 5px; border-radius: 5px">Perth</div>
      </template>
      <InfoWindow>
        <h1>Perth</h1>
        <div>Custom Content AdvancedMarker With Custom InfoWindow</div>
      </InfoWindow>
    </AdvancedMarker>
  </GoogleMap>
</template>

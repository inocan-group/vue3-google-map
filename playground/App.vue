<script setup>
import { GoogleMap, AdvancedMarker } from "../src";

const center = { lat: 40.689247, lng: -74.044502 };
const markerOptions = { position: center, title: "LADY LIBERTY" };
</script>

<template>
  <GoogleMap mapId="DEMO_MAP_ID" style="width: 100%; height: 500px" :center="center" :zoom="15">
    <AdvancedMarker :options="markerOptions">
      <div style="border: 1px solid red">advanced marker slot</div>
    </AdvancedMarker>
  </GoogleMap>
</template>

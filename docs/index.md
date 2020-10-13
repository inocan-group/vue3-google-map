# Introduction

<GoogleMap api-key="" style="width: 100%; height: 80vh" :center="{ lat: 35, lng: -95 }" :zoom="13">
  <Marker :options="{ position: { lat: 35, lng: -95 } }" />
  <CustomControl position="BOTTOM_CENTER">
    <button style="width: 60px; height: 20px; background: orange; color: white">Greet</button>
  </CustomControl>
</GoogleMap>

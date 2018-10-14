<template>
  <GmapMap
    :center="{lat: 35.735101, lng: 51.378934}"
    :zoom="15"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
    >
    <GmapMarker
      :position="marker.position"
      :clickable="true"
      :draggable="true"
      @dragend="updateMarker($event)"
      @click="mark"
      />
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :opacity="0.5"
      :clickable="false"
      :draggable="false"
      />
  </GmapMap>
</template>

<script>
export default {
  data: () => ({
    marker: {
      position: {lat: 35.735101, lng: 51.378934}
    },
    markers: [{
    }]
  }),

  methods: {
    updateMarker (event) {
      this.$set(this.marker, 'position', {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    },
    mark () {
      this.markers.push({
        position: {
          lat: this.marker.position.lat,
          lng: this.marker.position.lng
        }
      })
    }
  }
}
</script>

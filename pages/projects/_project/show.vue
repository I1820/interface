<template>
  <v-layout column justify-center align-center>
    <v-flex class="xs12 sm8 md6 pt-4">
      <div>
        <h2 class="white--text display-2">Things @ {{projectID}}</h2>
      </div>
      <i-thing v-for="(thing, i) in things" :key="i" :thing="thing" :project="projectID"></i-thing>
    </v-flex>
  </v-layout>
</template>


<script>
import IThing from '~/components/i-thing.vue'
export default {
  components: {
    'i-thing': IThing
  },

  async asyncData ({app, params}) {
    let projectID = params.project
    let things = []
    try {
      things = await app.$axios.$get(`http://192.168.73.5:1375/api/projects/${projectID}/things`)
      console.log(things)
    } catch (e) {
      console.log(e)
    }
    return {things, projectID} // returns object contains required data
  }
}
</script>

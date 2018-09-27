<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/i1820.png" alt="I1820" class="mb-5" style="width: 50%" />
      </div>
      <v-card>
        <v-card-text>
          <p>Welcome to the I1820 IoT Platform</p>
          <p>
            This platform is written by many people that many of them do not live with us right now.
            I want to thank all of them and hope you enjoy this platform.
          </p>
          <div class="orange--text">
            <strong>Good Days Good Things</strong>
          </div>
          <div class="text-xs-right">
            <em><small>&mdash; Parham Alvani</small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex class="xs12 sm8 md6 pt-4">
      <div>
        <h2 class="white--text display-2">Projects</h2>
      </div>
      <i-project v-for="(project, i) in projects" :key="i" :project="project"></i-project>
    </v-flex>
  </v-layout>
</template>

<script>
import IProject from '~/components/i-project.vue'
export default {
  components: {
    'i-project': IProject
  },

  async asyncData ({app}) {
    let projects = []
    try {
      projects = await app.$axios.$get('http://192.168.73.5:1375/api/projects')
      console.log(projects)
    } catch (e) {
      console.log(e)
    }
    return {projects}
  }
}
</script>

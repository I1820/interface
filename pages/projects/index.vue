<template>
  <v-layout column justify-space-around align-center>
    <v-flex class="xs12 sm8 md6 pt-4">
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

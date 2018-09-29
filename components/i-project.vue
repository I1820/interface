<template>
  <v-card class="ma-5">
   <v-card-title primary-title>
     <v-layout column justify-center fill-height>
        <v-layout row align-center justify-space-around>
          <v-avatar color="red">
            <span class="white--text headline">{{project.name.slice(0,2).toUpperCase()}}</span>
          </v-avatar>
          <h3 class="headline"><i>{{project.name}}</i></h3>
        </v-layout>
        <v-layout row align-center justify-center class="mt-4">
          <div class="grey--text">ID: <i>{{project.id}}</i></div>
        </v-layout>
     </v-layout>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange" :to="show(project.id)">Things</v-btn>
      <v-btn flat color="red" @click="remove">Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    show (id) {
      return `/projects/${id}/show`
    },
    async remove () {
      try {
        await this.$axios.$delete(`/pm/api/projects/${this.project.id}`)
      } catch (e) {
        console.log(e)
      }
      // TODO refresh parent after component remvoe
    }
  },

  props: {
    project: { // project itself
      type: Object,
      required: true
    }
  }
}
</script>

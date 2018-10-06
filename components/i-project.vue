<template>
  <v-list-tile avatar>
    <v-list-tile-avatar color="red">
      <span class="white--text headline">{{project.name.slice(0,2).toUpperCase()}}</span>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title><i>{{project.name}}</i></v-list-tile-title>
      <v-list-tile-sub-title>ID: <i>{{project.id}}</i></v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-layout>
        <v-btn icon ripple @click="show"><v-icon color="grey">info</v-icon></v-btn>
        <v-btn icon ripple @click="remove"><v-icon color="grey">delete</v-icon></v-btn>
        <v-btn icon ripple @click="scenario"><v-icon color="grey">note</v-icon></v-btn>
      </v-layout>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  methods: {
    scenario () {
      this.$router.replace(`/projects/${this.project.id}/scenario`)
    },
    show () {
      this.$router.replace(`/projects/${this.project.id}`)
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

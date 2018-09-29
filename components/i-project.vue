<template>
  <v-list-tile avatar @click="show">
    <v-list-tile-avatar color="red">
      <span class="white--text headline">{{project.name.slice(0,2).toUpperCase()}}</span>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title><i>{{project.name}}</i></v-list-tile-title>
      <v-list-tile-sub-title>ID: <i>{{project.id}}</i></v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-btn flat color="red" icon @click="remove"><v-icon>delete</v-icon></v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  methods: {
    show () {
      this.$router.replace(`/projects/${this.project.id}/show`)
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

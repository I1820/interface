<template>
  <v-card>
    <v-layout row align-center justify-center>
      <v-flex>
        <v-avatar color="red">
          <span class="white--text headline">{{project.name.slice(0,2).toUpperCase()}}</span>
        </v-avatar>
      </v-flex>
      <v-flex>
        <v-card-title primary-title>
          <div>
            <span class="headline">Name: <i>{{project.name}}</i></span><br>
            <span class="headline grey--text">ID: <i>{{project.id}}</i></span>
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <v-divider light></v-divider>
    <v-card-actions>
      <v-btn class="flat orange" :to="show(project.id)">Things</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    show (id) {
      return `/projects/${id}/show`
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

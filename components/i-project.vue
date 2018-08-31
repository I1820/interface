<template>
  <v-card>
    <v-card-text>
      <h5 class="yellow--text headline">{{project.name}}</h5>
      <ul>
        <li v-for="(thing, i) in project.things" :key="i">
          <strong>{{thing.id}}</strong> with <em>{{thing.model}}</em> model
        </li>
      </ul>
    </v-card-text>
    <v-card-actions>
      <v-btn class="flat orange">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    show (name) {
      return `/projects/{id}`
    }
  },

  props: {
    project: Object
  }
}
</script>

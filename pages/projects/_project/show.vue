<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h2 class="white--text display-2">Things @ {{projectID}}</h2>
    </v-flex>
    <v-flex class="xs12 sm8 md6 pt-4">
      <i-thing v-for="(thing, i) in things" :key="i" :thing="thing" :project="projectID"></i-thing>
    </v-flex>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" color="primary" dark>Create Thing</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Thing</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="name" label="Name" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="create">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>


<script>
import IThing from '~/components/i-thing.vue'
export default {
  components: {
    'i-thing': IThing
  },

  methods: {
    async refresh () {
      try {
        this.things = await this.$axios.$get(`/pm/api/projects/${this.projectID}/things`)
        console.log(this.things)
      } catch (e) {
        console.log(e)
      }
    },
    async create () {
      try {
        await this.$axios.$post(`/pm/api/projects/${this.projectID}/things`, {
          'name': this.name,
          'model': 'default'
        })
      } catch (e) {
        console.log(e)
      }
      await this.refresh()
      this.dialog = false
    }
  },

  data: () => ({
    dialog: false, // create thing dialog visibility

    name: '' // name field in create thing
  }),

  async asyncData ({app, params}) {
    let projectID = params.project
    let things = []
    try {
      things = await app.$axios.$get(`/pm/api/projects/${projectID}/things`)
      console.log(things)
    } catch (e) {
      console.log(e)
    }
    return {things, projectID} // returns object contains required data
  }
}
</script>

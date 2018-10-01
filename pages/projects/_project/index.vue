<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h2 class="orange--text display-2">Things @ {{projectID}}</h2>
    </v-flex>
    <v-flex class="xs12 sm8 md6 pt-4">
      <i-thing v-for="(thing, i) in things" :key="i" :thing="thing" :project="projectID"></i-thing>
    </v-flex>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" flat icon light><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Thing</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="name" label="*Name" required></v-text-field>
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
    <v-flex>
      <v-btn color="blue darken-1" :disabled="isConnected" flat @click.native="connect">Connect</v-btn>
      <v-btn color="blue darken-1" :disabled="!isConnected" flat @click.native="disconnect">Disconnect</v-btn>
      <v-list>
        <v-list-tile v-for="(state, i) in states" :key="i">
          {{state}}
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>


<script>
import IThing from '~/components/i-thing.vue'
import io from 'socket.io-client'

export default {
  components: {
    'i-thing': IThing
  },

  methods: {
    disconnect () {
      if (this.socket != null) {
        this.socket.disconnect()
        this.isConnected = false
      }
    },

    connect () {
      this.isConnected = true
      const socket = io(':8085/I1820')
      socket.on('connect', () => {
        this.$toast.global.iSuccess({message: 'We are coming with data to you'})
        this.socket = socket
      })
      socket.on('connect_error', (error) => {
        this.$toast.global.iError({message: `connection failure: ${error}`})
        this.isConnected = false
      })
      socket.on(`projects/${this.projectID}`, (message) => {
        this.states.push(message)
      })
    },

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
        this.$toast.global.iSuccess({message: 'Successfully builded'})
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
      await this.refresh()
      this.dialog = false
    }
  },

  beforeDestroy () {
    this.disconnect()
  },

  data: () => ({
    isConnected: false,
    states: [],
    socket: null,

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

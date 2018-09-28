<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h2 class="white--text display-2">Data of {{thingID}} @ {{projectID}}</h2>
    </v-flex>
    <v-flex>
      <template v-for="(info, name) in assets">
        <v-subheader inset>{{name}} a.k.a {{info.title}}</v-subheader>
        <v-btn :key="`${name}-btn`" @click="recently(name)">Fetch {{info.title}}</v-btn>
        <v-data-table
          :key="`${name}-data-table`"
          :headers="headers"
          :items="states[name]"
          item-key="at"
          hide-actions
          class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.raw }}</td>
            <td>{{ props.item.at | moment("DD-MM-YYYY hh:mm:ss") }}</td>
          </template>
        </v-data-table>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  methods: {
    async recently (assetName) {
      try {
        this.$set(this.states, assetName, await this.$axios.$get(`http://192.168.73.5:1373/api/projects/${this.projectID}/things/${this.thingID}/assets/${assetName}/queries/recently?limit=10`))
      } catch (e) {
        console.log(e)
      }
      console.log(this.states[assetName])
    }
  },

  computed: {
    rows: {
      get () {
        return this.states
      }
    }
  },

  async asyncData ({app, params}) {
    var projectID = params.project
    var thingID = params.thing
    var assets = []
    var states = {}
    try {
      assets = await app.$axios.$get(`http://192.168.73.5:1375/api/things/${thingID}/assets`)
      console.log(assets)
    } catch (e) {
      console.log(e)
    }
    var headers = [
      {
        text: 'Value',
        value: 'raw',
        sortable: false
      },
      {
        text: 'Receive Time',
        value: 'at',
        sortable: true
      }
    ]
    return {projectID, thingID, assets, states, headers}
  }
}
</script>

<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h2 class="orange--text display-2">Data of {{thingID}} @ {{projectID}}</h2>
    </v-flex>
    <v-flex>
      <template v-for="(info, name) in assets">
        <v-layout column justify-center align-center>
          <v-flex>
            <v-subheader>{{name}} a.k.a {{info.title}}</v-subheader>
          </v-flex>
          <v-flex>
            <v-btn color="orange" :key="`${name}-btn`" @click="recently(name)">Fetch {{info.title}}</v-btn>
          </v-flex>
          <v-flex>
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
          </v-flex>
       </v-layout>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  methods: {
    async recently (assetName) {
      try {
        this.$set(this.states, assetName, await this.$axios.$get(`dm/api/projects/${this.projectID}/things/${this.thingID}/assets/${assetName}/queries/recently?limit=10`))
        this.$toast.global.iSuccess({message: 'Successfully fetched'})
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
    }
  },

  data: () => ({
    states: {},
    headers: [
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
  }),

  async asyncData ({app, params}) {
    var projectID = params.project
    var thingID = params.thing
    var assets = {}
    try {
      assets = await app.$axios.$get(`pm/api/things/${thingID}/assets`)
      console.log(assets)
    } catch (e) {
      console.log(e)
    }
    return {projectID, thingID, assets}
  }
}
</script>

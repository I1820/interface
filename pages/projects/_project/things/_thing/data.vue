<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <h2 class="white--text display-2">Data of {{thingID}} @ {{projectID}}</h2>
    </v-flex>
    <v-flex>
      <template v-for="(info, name) in assets">
        <v-subheader inset>{{name}}</v-subheader>
				<v-data-table
					:key="name"
					:headers="headers"
          :items="states[name]"
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
    for (var asset in assets) {
      try {
        states[asset] = await app.$axios.$get(`http://192.168.73.5:1373/api/projects/${projectID}/things/${thingID}/assets/${asset}/queries/recently?limit=10`)
      } catch (e) {
        console.log(e)
        states[asset] = []
      }
      console.log(states[asset])
    }
    return {projectID, thingID, assets, states, headers}
  }
}
</script>

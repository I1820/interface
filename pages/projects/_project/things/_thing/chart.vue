<template>
  <v-layout column>
    <v-card>
      <v-card-title>
        <span class="headline">Data of {{thingID}} @ {{projectID}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout column>
            <v-flex xs12 sm6>
              <v-select
                :items="assets"
                v-model="selectedAssets"
                label="Assets"
                multiple
                required
                ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-around>
            <v-flex xs12 sm6>
              <v-menu
                ref="fromDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="fromDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                  slot="activator"
                  v-model="fromDate"
                  label="From"
                  prepend-icon="event"
                  readonly
                  ></v-text-field>
                  <v-date-picker v-model="fromDate" @input="$refs.fromDateMenu.save(fromDate)"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-time-picker v-model="fromTime" header-color="primary" landscape format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row justify-space-around>
            <v-flex xs12 sm6>
              <v-menu
                ref="toDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="toDate"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
                >
                <v-text-field
                  slot="activator"
                  v-model="toDate"
                  label="To"
                  prepend-icon="event"
                  readonly
                  ></v-text-field>
                  <v-date-picker v-model="toDate" @input="$refs.toDateMenu.save(toDate)"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6>
              <v-time-picker v-model="toTime" header-color="primary" landscape format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" flat @click.native="fetch">Fetch</v-btn>
      </v-card-actions>
    </v-card>
    <highcharts :options="chart"></highcharts>
  </v-layout>
</template>

<script>

export default {
  methods: {
    async fetch () {
      if (this.selectedAssets.length === 0) {
        this.$toast.global.iError({message: 'Please select at least one asset'})
        return
      }
      if (this.fromDate === '') {
        this.$toast.global.iError({message: 'Please specify "FROM"'})
        return
      }
      if (this.toDate === '') {
        this.$toast.global.iError({message: 'Please specify "TO"'})
        return
      }

      const series = []
      for (const asset of this.selectedAssets) {
        try {
          const data = []
          for (const state of await this.$axios.$get(`dm/api/projects/${this.projectID}/things/${this.thingID}/assets/${asset}/queries/recently?limit=10`)) {
            data.push({
              x: Date.parse(state.at),
              y: state.value.number
            })
          }
          series.push({
            name: asset,
            data: data,
            color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
          })
        } catch (e) {
          this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
        }
      }

      this.$set(this.chart, 'series', series)
    }
  },

  data: () => ({
    selectedAssets: [],
    fromDate: '',
    fromTime: '00:00',
    toDate: '',
    toTime: '00:00',

    chart: {
      title: {
        text: `I1820`
      },
      chart: {
        type: 'area'
      },
      xAxis: {
        type: 'datetime'
      }
    }
  }),

  async asyncData ({app, params}) {
    var projectID = params.project
    var thingID = params.thing
    var assets = []
    try {
      const resp = await app.$axios.$get(`pm/api/things/${thingID}/assets`)
      for (const name in resp) {
        const info = resp[name]
        if (info.type === 'number' && info.kind === 'sensor') {
          assets.push({
            text: info.title,
            value: name
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
    return {projectID, thingID, assets}
  }
}
</script>

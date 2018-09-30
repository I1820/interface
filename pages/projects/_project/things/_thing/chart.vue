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
              <v-checkbox label="Partial Fetch" v-model="isPfetch"></v-checkbox>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="Window Size"
                v-model="windowSize"
                :disabled="!isPfetch"
                ></v-text-field>
            </v-flex>
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
        <v-btn color="blue darken-1" flat @click.native="isPfetch ? pfetch() : fetch">Fetch</v-btn>
      </v-card-actions>
    </v-card>
    <highcharts :options="chart"></highcharts>
  </v-layout>
</template>

<script>

export default {
  methods: {
    async pfetch () {
      if (this.selectedAssets.length === 0) {
        this.$toast.global.iError({message: 'Please select at least one asset'})
        return
      }
      if (this.windowSize === 0) {
        this.$toast.global.iError({message: 'Please specify window size'})
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
          for (const bulk of await this.$axios.$post(
            `dm/api/projects/${this.projectID}/things/${this.thingID}/queries/pfetch`,
            {
              target: asset,
              window: {
                size: parseInt(this.windowSize)
              },
              range: {
                from: this.$moment(`${this.fromDate}T${this.fromTime}:00`).format(),
                to: this.$moment(`${this.toDate}T${this.toTime}:00`).format()
              }
            })
          ) {
            data.push({
              name: `${this.$moment(bulk.since).format('dddd, MMMM Do YYYY, h:mm:ss a')} - ${this.$moment(bulk.until).format('dddd, MMMM Do YYYY, h:mm:ss a')} - count: ${bulk.count}`,
              x: (Date.parse(bulk.since) + Date.parse(bulk.until)) / 2,
              y: bulk.data
            })
          }
          series.push({
            name: asset,
            description: '', // TODO use asset title
            data: data,
            color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
          })
        } catch (e) {
          this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
        }
      }

      this.$set(this.chart, 'series', series)
    },

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
          for (const state of await this.$axios.$post(
            `dm/api/projects/${this.projectID}/things/${this.thingID}/queries/fetch`,
            {
              type: 'number',
              target: asset,
              range: {
                from: new Date(`${this.fromDate}T${this.fromTime}:00`).toISOString(),
                to: new Date(`${this.toDate}T${this.toTime}:00`).toISOString()
              }
            })
          ) {
            data.push({
              x: Date.parse(state.at),
              y: state.value.number
            })
          }
          series.push({
            name: asset,
            description: '', // TODO use asset title
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
    fromDate: '', // YY-mm-dd
    fromTime: '00:00', // hh-mm
    toDate: '', // hh-mm
    toTime: '00:00', // YY-mm-dd
    windowSize: 0,
    isPfetch: false,

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

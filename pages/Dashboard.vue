<template>
  <v-layout column justify-space-around align-center>
    <v-flex xs12 sm8 md6>
      <!-- TOOD fanco logo -->
      <div class="text-xs-center">
        <img src="/fanco.png" alt="Fanco" class="mb-5" style="width: 25%" />
      </div>
      <v-card>
        <v-card-text>
          <p>Welcome to the Fanavary Avid Net IoT Platform (I1820 IoT Platform)</p>
          <p>
            This IoT Platform tries to provide an easy way for you to manage you things and data.
            We hope you enjoy this platform.
          </p>
          <div class="orange--text">
            <strong>Good Days Good Things</strong>
          </div>
          <div class="text-xs-right">
            <em><small>&mdash; Fanco Development Team</small></em>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex>
      <v-btn @click="checkPM" :color="isPMOnline ? 'green' : 'red'">check pm component</v-btn>
      <v-btn @click="checkDM" :color="isDMOnline ? 'green' : 'red'">check dm component</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  methods: {
    async checkPM () {
      try {
        var about = await this.$axios.$get('/pm/about')
        if (about === '18.20 is leaving us') {
          this.isPMOnline = true
        }
      } catch (e) {
        console.log(e)
      }
    },
    async checkDM () {
      try {
        var about = await this.$axios.$get('/dm/about')
        if (about === '18.20 is leaving us') {
          this.isDMOnline = true
        }
      } catch (e) {
        console.log(e)
      }
    }

  },
  data: () => ({
    isPMOnline: false,
    isDMOnline: false
  })
}
</script>

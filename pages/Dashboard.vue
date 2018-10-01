<template>
  <v-layout column justify-space-around align-center>
    <v-flex align-center justify-center column>
      <v-img src="/fanco.png" alt="Fanco" class="mb-5" max-height="250px" contain></v-img>
      <div>
          <p class="title">Welcome to the Avid Net Tech. IoT Platform </p>
          <p class="body-2">
            This IoT Platform aims to provide an easy way to manage your things and data.
            We hope you enjoy it.
          </p>
      </div>
    </v-flex>
    <v-flex row justify-space-around row>
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

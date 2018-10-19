<template>
  <v-app light>
    <v-toolbar app fixed clipped-left dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    <v-footer app height="auto" dark>
      <v-layout
        justify-center
        row
        wrap
        >
        <v-btn
          v-for="link in links"
          :key="link.name"
          color="white"
          flat
          round
          depressed
          :href=link.ref
          >
          {{ link.name }}
        </v-btn>
          <v-flex
            py-3
            text-xs-center
            white--text
            xs12
            >
            &copy; 2018 all rights reserved <strong>FAN Co</strong>.
          </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        name: 'Github',
        ref: 'https://github.com/I1820'
      }, {
        name: 'About us',
        ref: 'https://I1820.github.io'
      }, {
        name: 'Platform 101',
        ref: 'https://I1820.github.io/Platform101'
      }
    ],
    title: 'FAN Co. IoT Platform'
  })
}
</script>

<template>
  <v-app light>
    <v-navigation-drawer
      v-model="drawer"
      dark
      clipped
      fixed
      app
      >
      <v-list>
        <v-list-tile
          active-class="orange--text"
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          :href="item.href"
          >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="item.title"></v-list-tile-title>
      </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar color="grey lighten-4">
        <img :src="this.$auth.user.picture" alt="avatar">
      </v-avatar>
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
  computed: {
    paths () {
      if (this.$route.name === null) {
        return []
      }
      var paths = []
      for (var route of this.$route.name.split('-')) {
        if (route in this.$route.params) {
          paths.push({
            text: this.$route.params[route],
            disabled: true
          })
        } else {
          paths.push({
            text: route,
            link: route,
            disabled: false
          })
        }
      }
      return paths
    }
  },
  data: () => ({
    drawer: false,
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
    items: [
      {
        icon: 'apps',
        title: 'Dashboard',
        link: '/dashboard'
      },
      {
        icon: 'mood',
        title: 'Projects',
        link: '/projects'
      },
      {
        icon: 'device_hub',
        title: 'Vernemq',
        href: '/status'
      },
      {
        icon: 'exit_to_app',
        title: 'Signout',
        link: '/logout'
      }
    ],
    title: 'FAN Co. IoT Platform'
  })
}
</script>

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
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
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid fill-height>
          <nuxt />
        </v-container>
      </v-content>
    </main>
    <v-footer app height="auto">
      <v-card class="flex" flat tile>
        <v-card-title>
          <v-breadcrumbs divider="/">
            <v-breadcrumbs-item
              v-for="path in paths"
              :key="path.text"
              :disabled="path.disabled"
              :nuxt="true"
              :to="path.link"
              >
              {{ path.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
          <v-spacer></v-spacer>
          <v-btn
            v-for="link in links"
            :key="link.name"
            :href="link.ref"
            class="mx-3"
            flat
            dark
            >
            {{link.name}}
          </v-btn>
        </v-card-title>
        <v-card-actions class="grey darken-3 justify-center">
          &copy;since 2016 — <strong>I1820</strong>
        </v-card-actions>
      </v-card>
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
      }

    ],
    title: 'I1820 IoT Platform'
  })
}
</script>

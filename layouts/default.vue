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
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="white--text">{{title}}</span>
      </v-toolbar-title>
    </v-toolbar>
    <main>
			<v-content>
      	<v-container fluid fill-height>
        	<nuxt />
      	</v-container>
			</v-content>
    </main>
    <v-footer app fixed>
      <span>&copy; I1820 since 2016</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          {
            icon: 'apps',
            title: 'Dashboard',
            link: '/dashboard'
          }
        ],
        title: 'I1820 IoT Platform'
      }
    }
  }
</script>

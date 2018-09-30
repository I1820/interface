<template>
  <v-layout column justify-space-around align-space-around>
    <v-flex class="xs12 sm8 md6 pt-4">
      <v-list>
        <i-project v-for="(project, i) in projects" :key="i" :project="project" class="ma-3"></i-project>
      </v-list>
    </v-flex>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-btn slot="activator" flat icon><v-icon>add</v-icon></v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Project</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="name" label="*Name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="owner" label="*Owner" hint="project owner email address (e.g. parham.alvani@gmail.com)" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="create">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import IProject from '~/components/i-project.vue'
export default {
  components: {
    'i-project': IProject
  },

  methods: {
    async refresh () {
      try {
        this.projects = await this.$axios.$get('/pm/api/projects')
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
    },
    async create () {
      try {
        await this.$axios.$post('/pm/api/projects', {
          'name': this.name,
          'owner': this.owner
        })
        this.$toast.global.iSuccess({message: 'Successfully builded'})
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
      await this.refresh()
      this.dialog = false
    }
  },

  data: () => ({
    dialog: false, // create project dialog visibility

    name: '', // name field in create project
    owner: '' // owner field in create project
  }),

  async asyncData ({app}) {
    let projects = []
    try {
      projects = await app.$axios.$get('/pm/api/projects')
      console.log(projects)
    } catch (e) {
      console.log(e)
    }
    return {projects}
  }
}
</script>

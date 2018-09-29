<template>
  <v-card class="ma-5">
    <v-card-title>
      <div>
        <h3 class="headline"><i>{{thing.name}}</i></h3>
        <div class="grey--text">ID: <i>{{thing.id}}</i></div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <v-subheader>Connectivities</v-subheader>
      <v-list>
        <v-list-tile :key="name" v-for="(detail, name) in thing.connectivities">
          <v-list-tile-action>
            <v-icon large>signal_cellular_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{name}}</v-list-tile-title>
            <v-list-tile-sub-title v-for="(value, key) in detail" :key="key">{{key}}:{{value}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Assets</v-subheader>
      <v-list>
        <v-list-tile :key="name" v-for="(detail, name) in thing.assets">
          <v-list-tile-action>
            <v-icon large>cast</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{name}} a.k.a {{detail.title}} is {{detail.kind}}</v-list-tile-title>
            <v-list-tile-sub-title>Type: {{detail.type}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn flat icon @click="assetRemove(name)"><v-icon>delete</v-icon></v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-subheader>Tokens</v-subheader>
      <v-list>
        <v-list-tile :key="index" v-for="(token, index) in thing.tokens">
          <v-list-tile-action>
            <v-icon large>lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{index + 1}}. {{token}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <v-btn flat color="orange" :to="data()">Data</v-btn>
      <v-dialog v-model="assetDialog" persistent max-width="500px">
        <v-btn slot="activator" color="green" flat dark>Create Asset</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Asset</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="assetName" label="Name" hint="name of asset in uplink/downlink data" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="assetTitle" label="Title" hint="human readable name of asset" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['sensor', 'actuator']"
                    label="Kind"
                    v-model="assetKind"
                    hint="kind of asset"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="['number', 'string', 'object', 'array', 'boolean']"
                    label="Type"
                    v-model="assetType"
                    hint="asset data type"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="assetDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="assetCreate">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    data () {
      return `/projects/${this.project}/things/${this.thing.id}/data`
    },

    async refresh () {
      try {
        this.thing = await this.$axios.$get(`/pm/api/projects/${this.project}/things/${this.thing.id}`)
        console.log(this.thing)
      } catch (e) {
        console.log(e)
      }
    },

    async assetRemove (assetName) {
      try {
        await this.$axios.$delete(`/pm/api/things/${this.thing.id}/assets/${assetName}`)
        this.$toast.global.iSuccess({message: 'Successfully removed'})
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
      await this.refresh()
    },

    async assetCreate () {
      try {
        await this.$axios.$post(`/pm/api/things/${this.thing.id}/assets`, {
          'name': this.assetName,
          'title': this.assetTitle,
          'kind': this.assetKind,
          'type': this.assetType
        })
        this.$toast.global.iSuccess({message: 'Successfully builded'})
      } catch (e) {
        this.$toast.global.iError({message: `${e.response.data.code}: ${e.response.data.error.split('\n')[0]}`})
      }
      await this.refresh()
      this.assetDialog = false
    }
  },
  data: () => ({
    assetDialog: false,
    assetName: '',
    assetTitle: '',
    assetKind: '',
    assetType: ''
  }),

  props: {
    thing: { // thing itself
      type: Object,
      required: true
    },
    project: { // parent project id
      type: String,
      required: true
    }
  }
}
</script>

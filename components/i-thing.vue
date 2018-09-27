<template>
  <v-card>
    <v-card-title>
      <div>
        <span class="headline">Name: <i>{{thing.name}}</i></span><br>
        <span class="headline grey--text">ID: <i>{{thing.id}}</i></span>
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
      <v-btn class="flat orange" :to="data(thing.id, project)">Data</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    data (thingID, projectID) {
      return `/projects/${projectID}/things/${thingID}/data`
    }
  },
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

<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon :to="'/'">
          <img src="./assets/iftm-logo.svg">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        VIII &mdash; Semana da Zootecnia
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat color="error">
          <v-icon>lock</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
          <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

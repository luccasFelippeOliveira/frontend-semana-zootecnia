<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon>
        <img src="./assets/iftm-logo.svg">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        VII &mdash; Semana da Zootecnia
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat color="error">
          <v-icon>lock</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

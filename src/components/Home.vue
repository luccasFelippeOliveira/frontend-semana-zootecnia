<template>
  <v-layout align-center justify-center>
  <v-flex xs12 sm12 md10 lg8>
    <v-card>
      <v-card-media>
        <img src="/static/chamada-semana.jpg">
      </v-card-media>
      <v-card-title primary-title>
        <h3 class="headline mb-0">Faça já sua inscrição!</h3>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :to="'/inscricao'">Fazer Inscrição</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    imageHeight () {
      return '240px'
    }
  }
}
</script>

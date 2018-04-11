<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Fazer Inscrição</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-form>
          <v-layout column>
            <v-flex>
              <v-text-field name="nome" label="Nome Completo" id="nome" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field name="ra" label="R.A." id="password" type="number" required></v-text-field>
            </v-flex>
            <v-flex>
              <v-select :items="items" label="Curso"></v-select>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Inscricao',
  data () {
    return {
      items: [
        { text: 'Zootecnia' },
        { text: 'Outros Cursos' }
      ]
    }
  }
}
</script>

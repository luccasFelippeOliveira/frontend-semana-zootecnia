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
              <v-radio-group v-model="radioGroup">
                <v-radio label="IFTM" value="iftm" ></v-radio>
                <v-radio label="Comunidade Externa" value="comunidadeExterna"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex v-if="isIftm">
              <v-flex >
                <v-select :items="items" label="Curso"></v-select>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" id="nome" v-model="name" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="R.A." id="password" type="number" required></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex v-else>
              <v-flex>
                <v-text-field label="CPF" id="cpf" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" id="nome" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Instituição" id="instituicao" required></v-text-field>
              </v-flex>
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
      ],
      radioGroup: 'iftm',
      isIftm: true
    }
  },
  watch: {
    radioGroup: function (val) {
      if (val === 'iftm') {
        this.isIftm = true
      } else {
        this.isIftm = false
      }
    }
  }
}
</script>

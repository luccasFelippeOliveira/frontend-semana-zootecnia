<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Fazer Inscrição</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="fazerInscricao">
          <v-layout column>
            <v-flex>
              <v-alert :type="alertType" dismissible v-model="alert">
                {{ alertMsg }}
              </v-alert>
            </v-flex>
            <v-flex>
              <v-radio-group v-model="radioGroup">
                <v-radio label="IFTM" value="iftm" ></v-radio>
                <v-radio label="Comunidade Externa" value="comunidadeExterna"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex v-if="isIftm">
              <v-flex >
                <v-select :items="items" label="Curso" v-model="curso" :error-messages="errorMessage" required></v-select>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="R.A." v-model="ra" required></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex v-else>
              <v-flex>
                <v-text-field label="CPF" id="cpf" v-model="cpf" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Instituição" v-model="instituicao" required></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Fazer Inscrição</v-btn>
            </v-flex>
          </v-layout>
        </form>
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
      isIftm: true,
      errorMessage: undefined,
      alertType: 'error',
      alert: false,
      alertMsg: '',
      curso: '',
      nome: '',
      ra: '',
      cpf: '',
      instituicao: ''
    }
  },
  watch: {
    radioGroup: function (val) {
      if (val === 'iftm') {
        this.isIftm = true
      } else {
        this.isIftm = false
      }
      this.limpaCampos()
    }
  },
  methods: {
    fazerInscricao () {
      if (this.isIftm) {
        this.validaIscricaoIFTM()
      } else {
        console.log('Do nothing')
      }

      // Metodo para fazer a inscricao.
      this.alertType = 'success'
      this.alert = true
      this.alertMsg = 'Inscrição feita com sucesso.'
    },
    validaIscricaoIFTM () {
      if (this.curso === null || this.curso === undefined) {
        this.errorState = true
        this.errorMessage = 'Por favor preencha seu curso.'
        return false
      }
      return true
    },
    limpaCampos () {
      return true
    }
  }
}
</script>

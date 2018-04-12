<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Fazer Inscrição</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-flex>
          <v-radio-group v-model="radioGroup">
            <v-radio label="IFTM" value="iftm" ></v-radio>
            <v-radio label="Comunidade Externa" value="comunidadeExterna"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-form @submit.prevent="fazerInscricao" ref="form" v-model="formValid">
          <v-layout column>
            <v-flex>
              <v-alert :type="alertType" dismissible v-model="alert">
                {{ alertMsg }}
              </v-alert>
            </v-flex>
            <v-flex v-if="isIftm">
              <v-flex >
                <v-select :items="items" label="Curso" v-model="curso" :rules="cursoRules" required></v-select>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="R.A." v-model="ra" id="txtRAId" :rules="raRules"  required></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex v-else>
              <v-flex>
                <v-text-field label="CPF" id="cpf" mask="###.###.###-##" v-model="cpf" :rules="cpfRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Instituição" v-model="instituicao" :rules="instituicaoRules" required></v-text-field>
              </v-flex>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn :disabled="!formValid" color="primary" type="submit">Fazer Inscrição</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CPF from 'gerador-validador-cpf'

export default {
  name: 'Inscricao',
  data () {
    return {
      items: [
        { text: 'Zootecnia' },
        { text: 'Outros Cursos' }
      ],
      formValid: false,
      radioGroup: 'iftm',
      isIftm: true,
      alert: false,
      alertType: 'success',
      alertMsg: '',
      curso: '',
      nome: '',
      ra: '',
      cpf: '',
      instituicao: '',
      nameRules: [
        (v) => !!v || 'Nome não pode ser vazio.',
        (v) => /^[a-zA-Z\s]+$/.test(v) || 'Nome não pode conter números'
      ],
      raRules: [
        (v) => !!v || 'RA não pode ser vazio.',
        (v) => /^[\d]+$/.test(v) || 'RA não pode conter letras.'
      ],
      cursoRules: [
        (v) => !!v || 'Pelo menos um curso deverá ser selecionado.'
      ],
      cpfRules: [
        (v) => !!v || 'CPF não pode ser vazio.',
        (v) => CPF.validate(v) || 'Informe um CPF válido.'
      ],
      instituicaoRules: [
        (v) => !!v || 'O nome da instituição não pode ser vazio.'
      ]
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
        console.log('do nothing')
      } else {
        console.log('Do nothing')
      }

      // Metodo para fazer a inscricao.
      this.alertType = 'success'
      this.alert = true
      this.alertMsg = 'Inscrição feita com sucesso.'
    },
    limpaCampos () {
      this.$refs.form.reset()
    }
  }
}
</script>

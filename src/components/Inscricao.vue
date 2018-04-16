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
                <v-select :items="items" item-text="Nome" label="Curso" v-model="curso" :rules="cursoRules" required></v-select>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="R.A." v-model="cpf_ra" id="txtRAId" :rules="raRules"  required></v-text-field>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaManha" item-text="Nome" label="Minicurso 16/05 (manhã)" v-model="miniCursoQuarta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaTarde" item-text="Nome" label="Minicurso 16/05 (tarde)" v-model="miniCursoQuarta2"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaManha" item-text="Nome" label="Minicurso 17/05 (manhã)" v-model="miniCursoQuinta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaTarde" item-text="Nome" label="Minicurso 17/05 (tarde)" v-model="miniCursoQuinta2"></v-select>
              </v-flex>
            </v-flex>
            <v-flex v-else>
              <v-flex>
                <v-text-field label="CPF" id="cpf" mask="###.###.###-##" v-model="cpf_ra" :rules="cpfRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="Instituição" v-model="instituicao" :rules="instituicaoRules" required></v-text-field>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaManha" item-text="Nome" label="Minicurso 16/05 (manhã)" v-model="miniCursoQuarta1" ></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaTarde" item-text="Nome" label="Minicurso 16/05 (tarde)" v-model="miniCursoQuarta2"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaManha" item-text="Nome" label="Minicurso 17/05 (manhã)" v-model="miniCursoQuinta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaTarde" item-text="Nome" label="Minicurso 17/05 (tarde)" v-model="miniCursoQuinta2"></v-select>
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
import axios from 'axios'

export default {
  name: 'Inscricao',
  data () {
    return {
      items: [],
      minicursoQuartaManha: [],
      minicursoQuartaTarde: [],
      minicursoQuintaManha: [],
      minicursoQuintaTarde: [],
      formValid: false,
      radioGroup: 'iftm',
      isIftm: true,
      alert: false,
      alertType: 'success',
      alertMsg: '',
      curso: '',
      nome: '',
      cpf_ra: '',
      instituicao: '',
      miniCursoQuarta1: '',
      miniCursoQuarta2: '',
      miniCursoQuinta1: '',
      miniCursoQuinta2: '',
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
      let inscricao = {}

      inscricao['cpf_ra'] = this.cpf_ra
      inscricao['nome'] = this.nome
      inscricao['minicurso_1'] = this.miniCursoQuarta1
      inscricao['minicurso_2'] = this.miniCursoQuarta2
      inscricao['minicurso_3'] = this.miniCursoQuinta1
      inscricao['minicurso_4'] = this.miniCursoQuinta2

      if (this.isIftm) {
        inscricao['curso'] = this.curso
        inscricao['intituicao'] = 'IFTM'
      } else {
        inscricao['curso'] = null
        inscricao['instituicao'] = this.instituicao
      }

      console.log(inscricao)

      // Metodo para fazer a inscricao.
      this.alertType = 'success'
      this.alert = true
      this.alertMsg = 'Inscrição feita com sucesso.'
    },
    limpaCampos () {
      this.$refs.form.reset()
    }
  },
  mounted () {
    axios({ method: 'GET', 'url': 'http://localhost:1323/cursos' }).then(result => {
      result.data.forEach(element => {
        this.items.push(element)
      })
    }, error => {
      console.error(error)
    })

    axios.post('http://localhost:1323/minicursos', {
      DataInicio: new Date(2018, 4, 16, 7, 0).getTime() / 1000,
      DataFim: new Date(2018, 4, 16, 12, 0).getTime() / 1000
    }).then(response => {
      this.minicursoQuartaManha = response.data
    })

    axios.post('http://localhost:1323/minicursos', {
      DataInicio: new Date(2018, 4, 16, 12, 0).getTime() / 1000,
      DataFim: new Date(2018, 4, 16, 18, 0).getTime() / 1000
    }).then(response => {
      this.minicursoQuartaTarde = response.data
    })

    axios.post('http://localhost:1323/minicursos', {
      DataInicio: new Date(2018, 4, 17, 7, 0).getTime() / 1000,
      DataFim: new Date(2018, 4, 17, 12, 0).getTime() / 1000
    }).then(response => {
      this.minicursoQuintaManha = response.data
    })

    axios.post('http://localhost:1323/minicursos', {
      DataInicio: new Date(2018, 4, 17, 12, 0).getTime() / 1000,
      DataFim: new Date(2018, 4, 17, 18, 0).getTime() / 1000
    }).then(response => {
      this.minicursoQuintaTarde = response.data
    })
  }
}
</script>

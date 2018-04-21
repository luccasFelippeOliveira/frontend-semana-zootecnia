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
                <v-select :items="items" item-text="nome" label="Curso" v-model="curso" :rules="cursoRules" required></v-select>
              </v-flex>
              <v-flex>
                <v-text-field label="Nome Completo" v-model="nome" :rules="nameRules" required></v-text-field>
              </v-flex>
              <v-flex>
                <v-text-field label="R.A." v-model="cpf_ra" id="txtRAId" :rules="raRules"  required></v-text-field>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaManha" item-text="nome" label="Minicurso 16/05 (manhã)" v-model="miniCursoQuarta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaTarde" item-text="nome" label="Minicurso 16/05 (tarde)" v-model="miniCursoQuarta2" :disabled="desabilitarMiniCursoTardeQuarta()"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaManha" item-text="nome" label="Minicurso 17/05 (manhã)" v-model="miniCursoQuinta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaTarde" item-text="nome" label="Minicurso 17/05 (tarde)" v-model="miniCursoQuinta2" :disabled="desabilitarMiniCursoTardeQuinta()"></v-select>
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
                <v-select :items="minicursoQuartaManha" item-text="nome" label="Minicurso 16/05 (manhã)" v-model="miniCursoQuarta1" ></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuartaTarde" item-text="nome" label="Minicurso 16/05 (tarde)" v-model="miniCursoQuarta2" :disabled="desabilitarMiniCursoTardeQuarta()"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaManha" item-text="nome" label="Minicurso 17/05 (manhã)" v-model="miniCursoQuinta1"></v-select>
              </v-flex>
              <v-flex >
                <v-select :items="minicursoQuintaTarde" item-text="nome" label="Minicurso 17/05 (tarde)" v-model="miniCursoQuinta2" :disabled="desabilitarMiniCursoTardeQuinta()"></v-select>
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
      miniCursoQuarta1: null,
      miniCursoQuarta2: null,
      miniCursoQuinta1: null,
      miniCursoQuinta2: null,
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
        (v) => CPF.validate(v === null ? '' : v) || 'Informe um CPF válido.'
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
    desabilitarMiniCursoTardeQuarta () {
      if (this.miniCursoQuarta1 === null) return false
      if (this.miniCursoQuarta1.quantidadeHoras === 8) {
        this.miniCursoQuarta2 = null
        return true
      }
      return false
    },
    desabilitarMiniCursoTardeQuinta () {
      if (this.miniCursoQuinta1 === null) return false
      if (this.miniCursoQuinta1.quantidadeHoras === 8) {
        this.miniCursoQuinta2 = null
        return true
      }
      return false
    },
    fazerInscricao () {
      let inscricao = {}

      inscricao['cpf_ra'] = this.cpf_ra
      inscricao['nome'] = this.nome
      inscricao['minicursos'] = []

      if (this.miniCursoQuarta1 !== null) {
        inscricao['minicursos'].push(this.miniCursoQuarta1)
      }

      if (this.miniCursoQuarta2 !== null) {
        inscricao['minicursos'].push(this.miniCursoQuarta2)
      }

      if (this.miniCursoQuinta1 !== null) {
        inscricao['minicursos'].push(this.miniCursoQuinta1)
      }

      if (this.miniCursoQuinta2 !== null) {
        inscricao['minicursos'].push(this.miniCursoQuinta2)
      }

      if (this.isIftm) {
        inscricao['curso'] = this.curso
        inscricao['intituicao'] = 'IFTM'
      } else {
        inscricao['curso'] = null
        inscricao['instituicao'] = this.instituicao
      }
      axios.post(process.env.API_URL + '/inscricao', inscricao)
        .then(response => {
          if (response.status === 200) {
            this.alertType = 'success'
            this.alert = true
            this.alertMsg = 'Inscrição feita com sucesso.'
            window.pageYOffset = 0
          }
        })
        .catch(err => {
          if (err.response) {
            this.alertType = 'error'
            this.alert = true
            if (err.response.status === 403) {
              this.alertMsg = 'Iscrição já existe.'
            } else {
              this.alertMsg = 'Erro ao processar a inscrição por favor confira os dados.'
            }
            window.pageYOffset = 0
          }
        })
    },
    limpaCampos () {
      this.$refs.form.reset()
    }
  },
  mounted () {
    axios({ method: 'GET', 'url': process.env.API_URL + '/cursos' }).then(result => {
      result.data.forEach(element => {
        this.items.push(element)
      })
    }, error => {
      console.error(error)
    })

    axios.get(process.env.API_URL + '/minicursos')
      .then(result => {
        let minicursos = result.data
        let quartaManhaLimite = new Date(2018, 4, 16, 12 - 3, 0).getTime()
        this.minicursoQuartaManha = minicursos.filter(minicurso => {
          let d = new Date(minicurso.horarioComeco)
          return d.getTime() <= quartaManhaLimite
        })

        let quartaTardeLimite = new Date(2018, 4, 16, 17 - 3, 0).getTime()
        this.minicursoQuartaTarde = minicursos.filter(minicurso => {
          let d = new Date(minicurso.horarioComeco)
          return d.getTime() >= quartaManhaLimite && d.getTime() <= quartaTardeLimite && minicurso.quantidadeHoras < 8
        })

        let quintaManhaLimite = new Date(2018, 4, 17, 12 - 3, 0).getTime()
        this.minicursoQuintaManha = minicursos.filter(minicurso => {
          let d = new Date(minicurso.horarioComeco)
          return d.getTime() >= quartaTardeLimite && d.getTime() <= quintaManhaLimite
        })

        this.minicursoQuintaTarde = minicursos.filter(minicurso => {
          let d = new Date(minicurso.horarioComeco)
          return d.getTime() >= quintaManhaLimite && minicurso.quantidadeHoras < 8
        })
      })
  }
}
</script>

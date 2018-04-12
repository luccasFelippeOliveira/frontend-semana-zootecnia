<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="green">
            <v-toolbar-title>Área Administrativa</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field prepend-icon="person" label="Usuário" type="text" v-model="username" :rules="usernameRules"></v-text-field>
              <v-text-field prepend-icon="lock" label="Senha" id="password" type="password" v-model="password" :rules="passwordRules"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" :disabled="!valid" @click="login">Entrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'

export default {
  name: 'Login',
  data () {
    return {
      valid: false,
      username: '',
      usernameRules: [
        (v) => !!v || 'Usuário não pode ser vazio.'
      ],
      password: '',
      passwordRules: [
        (v) => !!v || 'Senha não pode ser vazia'
      ]
    }
  },
  methods: {
    login () {
      console.log('ok loggin')
      router.push('/admin')
      return true
    }
  }
}
</script>

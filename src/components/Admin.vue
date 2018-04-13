<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm12 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="red">
            <v-toolbar-title>Área Administrativa</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <v-btn icon large slot="activator" @click="logOut">
                <v-icon large>clear</v-icon>
              </v-btn>
              <span>Sair</span>
            </v-tooltip>
          </v-toolbar>
          <v-tabs slider-color="red">
            <v-tab>
              Pagamento
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>Pagamento body</v-card-text>
                <item-table-pagamento></item-table-pagamento>
              </v-card>
            </v-tab-item>
            <v-tab>
              Eventos
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <v-card-text>Evento body</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import ItemTablePagamento from './ItemTablePagamento.vue'

export default {
  name: 'Admin',
  methods: {
    logOut () {
      router.push('/')
    }
  },
  components: {
    ItemTablePagamento
  }
}
</script>

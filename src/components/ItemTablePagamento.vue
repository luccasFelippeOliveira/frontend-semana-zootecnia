<template>
  <v-data-table :items="myItems" :headers="headers" :rows-per-page-items="itemsPaginacao" :rows-per-page-text="labelPaginacao" :no-data-text="labelSemDados">
    <template slot="items" slot-scope="props">
      <td>{{ props.item.nome }}</td>
      <td>{{ mask(props.item.cpf) }}</td>
      <td>
        <v-checkbox v-model="props.item.pago" @change="changePago(props.item)"></v-checkbox>
      </td>
    </template>
    <template slot="pageText" slot-scope="props">
      Linhas {{ props.pageStart }} - {{ props.pageStop }} de {{ props.itemsLength }}
    </template>
  </v-data-table>
</template>

<script>
import CPF from 'gerador-validador-cpf'

export default {
  name: 'ItemTablePagamentos',
  data () {
    return {
      myItems: [],
      headers: [
        {text: 'Nome', value: 'nome'},
        {text: 'CPF/RA', value: 'cpf'},
        {text: 'Pago', align: 'center', sortable: false, value: 'nome'}
      ],
      labelPaginacao: 'Quantidade por página',
      itemsPaginacao: [
        10, 50, 100, {text: 'Todos', value: -1}
      ],
      labelSemDados: 'Sem Dados.'
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.myItems = [
        {nome: 'Luccas Felippe Oliveira', cpf: '10628012616', pago: true}
      ]
    },
    mask (val) {
      return CPF.format(val)
    },
    changePago (item) {
      if (item.pago) {
        console.log('pago.')
      } else {
        console.log('Não pago.')
      }
    }
  }
}
</script>

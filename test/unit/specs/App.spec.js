import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  it('should have a navbar', () => {
    const Constructor = Vue.extend(App)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.toolbar').to.exist)
  })
})

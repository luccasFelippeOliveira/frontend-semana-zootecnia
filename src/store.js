var store = {
  state: {
    isAuthenticated: false
  },
  setAuthenticated (newValue) {
    console.log('new value:', newValue)
    this.state = newValue
  }
}

export default store

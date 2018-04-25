const API_LOGIN = 'localhost:8080/login'
const API_CHECK_USER = ''
const API_LOGOUT = ''

export default {
  user: {
    authenticated: !!window.localStorage.getItem('id_token')
  },

  // Usado quando for logar.
  login (context, creds, redirect) {
    context.$http.post(API_LOGIN, creds)
      .then(resp => {
        window.localStorage.setItem('id_token', resp.body.jwt)
        this.user.authenticated = true

        if (redirect) {
          context.$router.push({path: redirect})
        }
      }, resp => {
        context.error = resp.body.message
      })
  },

  // Usado para verificar o usuario (quando entrar em areas protegidas)
  currentUser (context) {
    context.$http.get(API_CHECK_USER, {headers: this.getAuthHeader()})
      .then(resp => {
        context.user = resp.body.user
      }, _ => {
        window.localStorage.removeItem('id_token')
        this.user.authenticated = false
        context.$router.push('/login')
      })
  },

  // Usado para dar logout
  logout (context) {
    context.$http.delete(API_LOGOUT, {headers: this.getAuthHeader()})
      .then(resp => {
        window.localStorage.removeItem('id_token')
        this.user.authenticated = false
        context.$router.push('/')
      }, error => {
        console.log(error.message)
      })
  },

  getAuthHeader (context) {
    return {
      'Authorization': window.localStorage.getItem('id_token')
    }
  }
}

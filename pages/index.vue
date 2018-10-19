<template>
  <v-layout column justify-space-around align-center>
    <h2>Welcome to Avidnet platform management panel.</h2>
    <p>
      In order to use this panel you must to login with
      <a href="https://auth0.com">Auth0</a>.<br>
      If your internet connection is ok go to
      <nuxt-link to="/login">login page</nuxt-link>
      and login.
    </p>
  </v-layout>
</template>

<script>
export default {
  auth: false,
  layout: 'none',
  mounted () {
    if (this.$auth.loggedIn) {
      this.$router.push('dashboard')
    }
  }
}
</script>

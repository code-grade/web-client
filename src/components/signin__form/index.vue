<template>
  <div>
    <v-card-text >
      <h1
          class="text-center display-2 secondary--text text--accent-3"
      >Welcome Back!</h1>

      <h4 class="text-center mt-4">Sign in to CodeGrade</h4>
      <v-form @submit.prevent="signIn" id="login-form">
        <v-text-field
            v-model="username"
            color="secondary darken-2"
            label="Username"
            prepend-icon="mdi-email"
            required
        ></v-text-field>

        <v-text-field
            color="secondary darken-2"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"

        ></v-text-field>


      </v-form>
      <h3 class="text-center mt-4">Forgot your password ?</h3>
    </v-card-text>
    <div class="text-center ">
      <v-btn rounded color="secondary accent-3"  type="submit" form="login-form" dark>SIGN IN</v-btn>
    </div>
  </div>
</template>

<script>
import router from "../../router";


export default {

  data: () => ({
    username: "",
    password: "",

  }),
  methods:{
    async signIn() {
      const {status, message} = await this.$store.dispatch(
          "login",
          {username: this.username, password: this.password}
      )
      if (status === 200) {
        this.$vToastify.info(message, "Info")
        await router.push('/app')
      } else {
        this.$vToastify.error(message, "Done")
      }
    },

  }
}
</script>

<style scoped>

</style>
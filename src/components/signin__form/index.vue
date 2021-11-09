<template>
  <div class="login__form">
    <v-card-text >
      <h1
          class="text-center display-2 secondary--text text--accent-3 mb-6"
      >
        Welcome Back!
      </h1>

      <h4 class="text-center mt-4 mb-6">Sign in to CodeGrade</h4>
      <v-form ref="form" v-model="valid" @submit.prevent="signIn" id="login-form" lazy-validation>
        <v-text-field
            v-model="username"
            color="secondary darken-2"
            label="Username"
            prepend-icon="mdi-email"
            :rules="userNameRules"

        ></v-text-field>

        <v-text-field
            color="secondary darken-2"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            v-model="password"
            :rules="passwordRules"
        ></v-text-field>
      </v-form>
      <h3 class="text-center mt-7">Forgot your password ?</h3>
    </v-card-text>

    <div class="text-center mt-6">
      <v-btn :disabled="!valid" :loading="loading" color="primary"
             type="submit" form="login-form">SIGN IN</v-btn>
      <v-btn
          :disabled="loading"
          color="primary"
          outlined
          class="ml-4"
          @click="$emit('sign-up')"
      >
        SIGN UP
      </v-btn>
    </div>
  </div>
</template>

<script>
import router from "../../router";
import Validators from "@/utils/validators"

export default {

  data: () => ({
    valid: true,
    username: "",
    password: "",
    userNameRules :[Validators.required()],
    passwordRules:[Validators.required()],
    loading: false

  }),

  methods:{
    async signIn() {
      await this.$refs.form.validate()
      if (!this.valid) return

      this.loading = true
      const {status, message} = await this.$store.dispatch(
          "login",
          {username: this.username, password: this.password}
      )
      this.loading = false
      if (status === 200) {
        await router.push('/app')
      } else {
        this.$pop.error({title: "Error", text: message})
      }
    },

  }
}
</script>

<style scoped>
.login__form {
  padding: 30px 10px;
  min-width: 450px;

  display: flex;
  flex-direction: column;

  flex-wrap: nowrap;
  justify-content: space-between;

}
</style>

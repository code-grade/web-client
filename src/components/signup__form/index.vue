<template>
  <div class="signup__form">
    <v-card-text>
      <h1 class="text-center display-2 secondary--text text--accent-3 mb-3">Create New Account</h1>
      <v-form ref="form" v-model="valid" @submit.prevent="signUp" id="signup-form" lazy-validation>

        <h3 class="mb-2 mt-5">Register as,</h3>
        <v-btn-toggle
            v-model="user_role"
            :rules="roleRules"
            class="pa-0 mt-0 mb-5"
            mandatory
            dense
        >
              <v-btn value="STUDENT" color="primary" outlined block>
                <span class="hidden-sm-and-down">Student</span>
                <v-icon right>
                  mdi-account-multiple
                </v-icon>
              </v-btn>
              <v-btn value="INSTRUCTOR" color="primary" outlined block>
                <span class="hidden-sm-and-down">Instructor</span>
                <v-icon right>
                  mdi-account-tie
                </v-icon>
              </v-btn>

        </v-btn-toggle>

        <v-text-field
            color="secondary darken-2"
            dense
            class="mb-3"
            label="User Name"
            v-model="newUserName"
            :rules="nameRules"
            prepend-icon="mdi-account"
        ></v-text-field>
        <v-row class="mb-3" dense>
          <v-col
              cols="12"
              md="6"
          >
            <v-text-field
                color="secondary darken-2"
                dense
                v-model="firstName"
                label="First Name"
                prepend-icon="mdi-account"
                :rules="nameRules"
            ></v-text-field>

          </v-col>
          <v-col
              cols="12"
              md="6"
          >
            <v-text-field
                color="secondary darken-2"
                dense
                v-model="lastName"
                label="Last Name"
                :rules="nameRules"
                prepend-icon="mdi-account"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-text-field
            color="secondary darken-2"
            dense
            label="Email"
            class="mb-3"
            v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-email"
        ></v-text-field>
        <v-text-field
            color="secondary darken-2"
            dense
            class="mb-4"
            label="Password"
            v-model="newPassword"
            prepend-icon="mdi-lock"
            :rules="passwordRules"
            type="password"
        ></v-text-field>
        <v-text-field
            color="secondary darken-2"
            dense
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"
            :rules="[(newPassword === confirmPassword) || 'The password confirmation does not match.']"
            prepend-icon="mdi-lock"
            class="mb-3"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div class="text-center mt-5">
      <v-btn
          :disabled="!valid"
          :loading="loading"
          color="primary" type="submit" form="signup-form"
      >
        SIGN UP
      </v-btn>
      <v-btn
          :disabled="loading"
          color="primary"
          outlined
          class="ml-4"
          @click="$emit('sign-in')"
      >
        SIGN IN
      </v-btn>
    </div>
  </div>
</template>

<script>

import api from "@/api"
import Validators from "@/utils/validators";
import router from "@/router"

export default {
  name: "index.vue",
  data: () => ({
    valid: true,
    newUserName: "",
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    user_role: "STUDENT",
    nameRules: [Validators.required(), Validators.min(5), Validators.max(15)],
    passwordRules: [Validators.required(), Validators.strong_password()],
    roleRules: [Validators.required()],
    emailRules: [Validators.email()],
    loading: false
  }),
  methods: {
    async signUp() {
      await this.$refs.form.validate()
      if (!this.valid) return;

      this.loading = true
      const [status] = await api.user.register({
        username: this.newUserName,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.newPassword,
        role: this.user_role
      })
      this.loading = false

      if (status.status === 200) {
        this.$pop.info({
          title: "Success",
          text: "You have successfully registered to Code Grade! Please check your inbox to verify email"
        })
        await router.push("/verify-email")
      } else {
        this.$pop.error({title: "Error", text: status.message})
      }
    },
  }
}
</script>

<style scoped>
.signup__form {

  display: flex;
  flex-direction: column;

  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>

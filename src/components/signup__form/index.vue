<template>
  <div class="signup__form">
    <v-card-text >
      <h1 class="text-center display-2 secondary--text text--accent-3 mb-3">Create Account</h1>


      <v-form ref="form" v-model="valid" @submit.prevent="signUp" id="signup-form">
        <p class="mb-0">Register as,</p>

        <v-btn-toggle
            v-model="user_role"
            borderless
            class="pa-0 ma-0 mb-3 "
            dense

            :rules="roleRules"
        >
          <v-row>
            <v-col cols="6">
              <v-btn value="STUDENT" block >
                <span class="hidden-sm-and-down">Student</span>
                <v-icon right>
                  mdi-account-multiple
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn value="INSTRUCTOR" block >
                <span class="hidden-sm-and-down">Instructor</span>
                <v-icon right>
                  mdi-account-tie
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>



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
      <v-btn :loading="loading" rounded color="secondary accent-3" type="submit" form="signup-form" dark>SIGN UP</v-btn>
    </div>
  </div>
</template>

<script>
import api from "@/api"
import Validators from "@/utils/validators";
export default {
  name: "index.vue",
  data: () => ({
    newUserName:"",
    firstName:"",
    lastName:"",
    email:"",
    newPassword:"",
    confirmPassword:"",
    user_role:"STUDENT",
    valid: true,
    nameRules :[Validators.required(),Validators.min(5),Validators.max(15)],
    passwordRules:[Validators.required(),Validators.strong_password()],
    roleRules:[Validators.required()],
    emailRules:[Validators.email()],
    loading: false





  }),
  methods:{
    async signUp() {
      this.loading = true

      const [status, res_data] = await api.user.register({username: this.newUserName, firstName:this.firstName,lastName:this.lastName,email:this.email, password: this.newPassword,role:this.user_role})
      this.loading = false
      if (status.status === 200) {
        this.$vToastify.info(res_data, "Info")
        this.moveToSignIn()
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

    moveToSignIn() {
      this.$emit('decrementStep','')
    }
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
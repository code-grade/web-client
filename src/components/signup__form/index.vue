<template>
  <div>
    <v-card-text >
      <h1 class="text-center display-2 secondary--text text--accent-3 mb-3">Create Account</h1>


      <v-form @submit.prevent="signUp" id="signup-form">
        <p class="mb-0">User Role</p>

        <v-btn-toggle
            v-model="user_role"
            borderless
            class="pa-0 ma-0 mb-3"
            dense
        >
          <v-btn value="STUDENT" >
            <span class="hidden-sm-and-down">Student</span>
            <v-icon right>
              mdi-account-multiple
            </v-icon>
          </v-btn>

          <v-btn value="INSTRUCTOR" >
            <span class="hidden-sm-and-down">Instructor</span>
            <v-icon right>
              mdi-account-tie
            </v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-text-field
            color="secondary darken-2"
            dense
            label="User Name"
            v-model="newUserName"
            prepend-icon="mdi-account"
        ></v-text-field>
        <v-row>
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
                prepend-icon="mdi-account"
            ></v-text-field>

          </v-col>
        </v-row>
        <v-text-field
            color="secondary darken-2"
            dense
            label="Email"
            v-model="email"
            prepend-icon="mdi-email"
        ></v-text-field>
        <v-text-field
            color="secondary darken-2"
            dense
            label="Password"
            v-model="newPassword"
            prepend-icon="mdi-lock"
            type="password"
        ></v-text-field>
        <v-text-field
            color="secondary darken-2"
            dense
            label="Confirm Password"
            type="password"
            v-model="confirmPassword"

            prepend-icon="mdi-lock"
        ></v-text-field>


      </v-form>
    </v-card-text>
    <div class="text-center mt-5">
      <v-btn rounded color="secondary accent-3" type="submit" form="signup-form" dark>SIGN UP</v-btn>
    </div>
  </div>
</template>

<script>
import api from "@/api"
export default {
  name: "index.vue",
  data: () => ({
    newUserName:"",
    firstName:"",
    lastName:"",
    email:"",
    newPassword:"",
    confirmPassword:"",
    user_role:"STUDENT"

  }),
  methods:{
    async signUp() {

      const [status, res_data] = await api.user.register({username: this.newUserName, firstName:this.firstName,lastName:this.lastName,email:this.email, password: this.newPassword,role:this.user_role})

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

</style>
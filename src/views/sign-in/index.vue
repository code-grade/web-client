<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12 auth__container rounded pa-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height ">
                    <v-col class="login__col " cols="12" md="6">
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
                    </v-col>
                    <v-col class="login__col" cols="12" md="6">
                      <v-card-text class="secondary--text ">
                        <h1 class="text-center display-1">New User?</h1>
                        <h5
                            class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <v-img
                          :src="require('../../assets/auth.png')"
                          class="my-3"
                          contain
                          height="220"
                      />
                      <div class="text-center">
                        <v-btn rounded outlined secondary @click="step++">SIGN UP</v-btn>
                      </div>

                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height pa-3">
                    <v-col class="login__col" cols="12" md="6">
                      <v-card-text class="secondary--text">
                        <h1 class="text-center display-1">Already memeber?</h1>
                        <h5
                            class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <v-img
                          :src="require('../../assets/auth.png')"
                          class="my-3"
                          contain
                          height="220"
                      />
                      <div class="text-center">
                        <v-btn rounded outlined secondary @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col class="login__col" cols="12" md="6">
                      <v-card-text >
                        <h1 class="text-center display-2 secondary--text text--accent-3 mb-3">Create Account</h1>


                        <v-form @submit.prevent="signUp" id="signup-form">


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
                          ></v-text-field>
                          <v-text-field
                              color="secondary darken-2"
                              dense
                              label="Confirm Password"
                              v-model="confirmPassword"

                              prepend-icon="mdi-lock"
                          ></v-text-field>

                          <p>User Role</p>

                          <v-btn-toggle
                              v-model="user_role"
                              borderless
                              class="pa-0 ma-0"
                              dense
                          >
                            <v-btn value="STUDENT" >
                              <span class="hidden-sm-and-down">Student</span>
                              <v-icon right>
                                mdi-format-align-left
                              </v-icon>
                            </v-btn>

                            <v-btn value="INSTRUCTOR" >
                              <span class="hidden-sm-and-down">Instructor</span>
                              <v-icon right>
                                mdi-format-align-center
                              </v-icon>
                            </v-btn>
                          </v-btn-toggle>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-5">
                        <v-btn rounded color="secondary accent-3" type="submit" form="signup-form" dark>SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "../../router"
export default {
  data: () => ({
    step: 1,
    username: "",
    password: "",
    newUserName:"",
    firstName:"",
    lastName:"",
    email:"",
    newPassword:"",
    confirmPassword:"",
    user_role:""

  }),
  props: {
    source: String
  },
  methods:{
    async signIn() {
        const {status, message} = await this.$store.dispatch(
            "login",
            {username: this.username, password: this.password}
        )
        if (status === 200) {
          this.$vToastify.info(message, "Info")
          router.push('app')
        } else {
          this.$vToastify.error(message, "Done")
        }
    },
    async signUp() {
      const {status, message} = await this.$store.dispatch(
          "signup",
          {username: this.newUserName, firstName:this.firstName,lastName:this.lastName,email:this.email, password: this.newPassword,role:this.user_role}
      )
      if (status === 200) {
        this.$vToastify.info(message, "Info")
        router.push('app')
      } else {
        this.$vToastify.error(message, "Done")
      }
    }
  }
};
</script>

<style scoped>
.login__col {
  display: flex;
  flex-direction: column;

  flex-wrap: nowrap;
  justify-content: space-between;


}
.auth__container{
  min-height: 90vh;
}
</style>
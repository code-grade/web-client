<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8" >
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height pa-3">
                    <v-col class="login__col" cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 secondary--text text--accent-3"
                        >Welcome Back!</h1>
                       
                        <h4 class="text-center mt-4">Sign in to CodeGrade</h4>
                        <v-form>
                          <v-text-field
                            color="secondary darken-2"
                            label="Email"
                            prepend-icon="mdi-email"
                          
                          ></v-text-field>
                          <v-text-field
                           color="secondary darken-2"
                            label="Password"
                            prepend-icon="mdi-lock"
                          
                          ></v-text-field>
                         

                         
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center ">
                        <v-btn rounded color="secondary accent-3" dark>SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col class="login__col" cols="12" md="6" >
                      <v-card-text class="secondary--text mt-12">
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
                    <v-col class="login__col" cols="12" md="6" >
                      <v-card-text class="secondary--text mt-12">
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
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 secondary--text text--accent-3 mb-3">Create Account</h1>
                        
                        
                        <v-form>
                          
                        
                         <v-text-field
                            color="secondary darken-2"
                            label="User Name"
                            prepend-icon="mdi-account"
                            dense
                          ></v-text-field>
                          <v-row>
                          <v-col
                            cols="12"
                            md="6"
                          >
                          <v-text-field
                            color="secondary darken-2"
                            label="First Name"
                            prepend-icon="mdi-account"
                            dense
                          ></v-text-field>
                          
                          </v-col>
                          <v-col
                            cols="12"
                            md="6"
                          >
                          <v-text-field
                            color="secondary darken-2"
                            label="Last Name"
                            prepend-icon="mdi-account"
                            dense
                          ></v-text-field>
                          
                          </v-col>
                        </v-row>
                         <v-text-field
                            color="secondary darken-2"
                            label="Email"
                            prepend-icon="mdi-email"
                            dense
                          ></v-text-field>
                          <v-text-field
                           color="secondary darken-2"
                            label="Password"
                            prepend-icon="mdi-lock"
                            dense
                          ></v-text-field>
                          <v-text-field
                           color="secondary darken-2"
                            label="Confirm Password"
                            prepend-icon="mdi-lock"
                            dense
                          ></v-text-field>
                         
                          <p>User Role</p>

                          <v-btn-toggle
                            v-model="icon"
                            borderless
                            dense
                            class="pa-0 ma-0"
                          >
                            <v-btn value="left">
                              <span class="hidden-sm-and-down">Student</span>
                              <v-icon right>
                                mdi-format-align-left
                              </v-icon>
                            </v-btn>

                            <v-btn value="center">
                              <span class="hidden-sm-and-down">Instructor</span>
                              <v-icon right>
                                mdi-format-align-center
                              </v-icon>
                            </v-btn>                               
                          </v-btn-toggle>                             
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-5">
                        <v-btn rounded color="secondary accent-3" dark>SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }
};
</script>

<style scoped>
  .login__col{
     display: flex;
  flex-direction: column;

  flex-wrap: nowrap;
  justify-content: space-between;
  
  
    
  }
</style>
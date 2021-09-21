<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" sm="8">
            <v-card class="elevation-12 auth__container rounded pa-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row class="fill-height">
                    <v-col class="login__col " cols="12" md="6">
                      <SignInForm/>
                    </v-col>
                    <v-col class="login__col" cols="12" md="6">
                      <SignInSideImgCom @incrementStep="incrementStep($event)"/>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height pa-3">
                    <v-col class="login__col" cols="12" md="6">
                        <SignUpSideImgCom @decrementStep="decrementStep($event)"/>
                    </v-col>

                    <v-col class="login__col" cols="12" md="6">
                        <SignUpForm @decrementStep="decrementStep($event)"/>
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

import SignInForm from "@/components/signin__form"
import SignInSideImgCom from "@/components/signin__form/signInSideImgCom";
import SignUpForm from "@/components/signup__form"
import SignUpSideImgCom from "@/components/signup__form/signUpSideImgCom";

export default {
  components: {SignUpSideImgCom, SignInSideImgCom, SignInForm,SignUpForm, },
  data: () => ({
    step: 1,
  }),

  methods:{
    incrementStep() {
      this.step++;
    },
    decrementStep() {
      this.step--;
    },


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
  min-height: 650px;
}
</style>
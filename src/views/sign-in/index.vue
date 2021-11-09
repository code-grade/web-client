<template>

  <v-container class="fill-height center">
    <v-card>
      <v-card-text class="pa-6 pl-8 pr-8">
        <SignInForm v-if="step === 'sign-in'" @sign-up="step = 'sign-up'" />
        <SignUpForm v-if="step === 'sign-up'" @sign-in="step = 'sign-in'"/>
      </v-card-text>
    </v-card>

    <!--        <SignInSideImgCom @incrementStep="incrementStep($event)"/>-->
    <!--        <SignUpSideImgCom @decrementStep="decrementStep($event)"/>-->
    <!--        <SignUpForm @decrementStep="decrementStep($event)"/>-->
  </v-container>

</template>

<script>

import SignInForm from "@/components/signin__form"
import SignInSideImgCom from "@/components/signin__form/signInSideImgCom";
import SignUpForm from "@/components/signup__form"
import SignUpSideImgCom from "@/components/signup__form/signUpSideImgCom";

export default {
  components: {SignUpSideImgCom, SignInSideImgCom, SignInForm, SignUpForm,},
  data: () => ({
    step: 'sign-in',
  }),
};
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

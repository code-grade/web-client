<template>
  <div>
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
      <v-btn rounded outlined secondary @click="moveToSignUp">SIGN UP</v-btn>
    </div>
  </div>

</template>

<script>
export default {
  name: "signInSideImgCom",
  methods:{
    moveToSignUp()
    {
      this.$emit('incrementStep','')
    }
  }
}
</script>

<style scoped>

</style>
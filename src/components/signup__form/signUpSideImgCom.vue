<template>
  <div>

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
      <v-btn rounded outlined secondary @click="moveToSignIn">Sign in</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "signUpSideImgCom",
  methods:{
    moveToSignIn()
    {
      this.$emit('decrementStep','')
    }
  }
}
</script>

<style scoped>

</style>
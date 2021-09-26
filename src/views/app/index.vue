<template>
  <div>
    <NavDrawer/>

    <v-alert
        color="yellow"
        elevation="5"
        dismissible
        type="success"
        v-if="!isVerified"
        dense
    >
      Your account has not been verified yet.
      <v-btn
          class="ml-3 mr-1"
          color="secondary"
          :to="{name: 'VerifyEmail'}"
          outlined
      >Verify Now
      </v-btn>
    </v-alert>
    <router-view/>
  </div>
</template>

<script>
import NavDrawer from "../../components/layout/NavDrawer";

export default {
  name: "App",
  components: {NavDrawer},
  computed: {

    isVerified(){
      return this.$store.getters.isVerified
    },
    app_bar_color() {
      // return Boolean(this.$route.path.match(/^\/app($|\/)/))? '#fcfcfc' : '#f5f5f5'
      return '#f5f5f5'
    }
  },
}
</script>

<style scoped>

</style>
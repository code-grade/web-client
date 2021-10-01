<template>
  <div>
    <NavDrawer/>
    <v-alert
        v-if="!isVerified"
        dismissible
        elevation="0"
        color="warning"
        type="success"
        icon="mdi-alert"

        dense
        tile
    >
      Your account has not been verified yet.
      <v-btn
          small
          outlined
          class="ml-3"
          @click="$router.push({name: 'VerifyEmail'})"
      >
        verify now
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
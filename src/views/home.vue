<template>
  <div style="height: 100vh; flex-direction: column" class="justify-center align-center d-flex">
    <h2 style="display: block">Home Page</h2>
    <v-btn v-if="isLogged" class="mt-3" to="/app" color="primary">Dashboard</v-btn>
    <v-btn v-else class="mt-3" to="/login" color="primary">Login</v-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import router from "../router";

export default {
  name: 'Home',

  computed: {
    ...mapGetters(["isLogged"])
  },

}
</script>

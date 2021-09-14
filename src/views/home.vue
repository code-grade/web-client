<template>
  <div style="height: 100vh; flex-direction: column" class="justify-center align-center d-flex">
    <h2 style="display: block">Home Page</h2>
    <v-btn v-if="isLogged" class="mt-3" to="/app" color="primary">Dashboard</v-btn>
    <v-btn v-else class="mt-3" to="/login" color="primary">Login</v-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: 'Home',
  computed: {
    ...mapGetters(["isLogged"])
  },
  mounted() {
    if (!this.isLogged) {
      this.$vToastify.info("System will login as an admin automatically in 5 sec.", "Info")
      setTimeout(async () => {
        const {status, message} = await this.$store.dispatch(
            "login",
            {username: "admin", password: "admin"}
        )
        if (status === 200) {
          this.$vToastify.info(message, "Info")
        } else {
          this.$vToastify.error(message, "Done")
        }
      }, 5000)
    }
  }
}
</script>

<template>
  <v-app-bar dense app>
    <div style="width: 100%" class="text-sm-right">
      <v-btn small color="primary" @click="logout">Logout</v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      await this.$store.dispatch("logout")
      this.$vToastify.success("Successfully logged out!", "Done")
      await this.$router.push({name: "Home"})
    }
  }
}
</script>

<style scoped>

</style>
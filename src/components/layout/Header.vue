<template>
  <v-app-bar
      app clipped-left
      elevate-on-scroll
      :color="app_bar_color"
      elevation="1"
  >
    <!--  Logo  -->
    <router-link class="d-inline text-decoration-none" to="/">
      <v-img
          :src="require('../../assets/code-logo.svg')"
          aspect-ratio="1"
          max-width="32px"
          class="mr-4 d-inline-block"
      />
      <v-toolbar-title
          class="d-inline-block text--primary text-h5 font-weight-bold"
      >
        Code Grade
      </v-toolbar-title>
    </router-link>

    <v-spacer/>


    <v-btn
        text
        small
        color="primary"
        class="ml-1 mr-1"
        active-class="no-active"
        :to="{name: 'Home'}"
    >
      Home
    </v-btn>

    <v-btn
        text
        small
        color="primary"
        class="ml-1 mr-1"
        active-class="no-active"
        :to="{name: 'AboutUs'}"
    >
      About Us
    </v-btn>

    <div class="header--vertical-line"/>

    <!--  User Account   -->
    <div v-if="isLogged" style="display: inline-block">



      <v-avatar color="primary" size="32" @click="viewUserProfile" style="cursor:pointer;">
        <v-icon dark>
          mdi-account-circle
        </v-icon>

      </v-avatar>

      <h5 @click="viewUserProfile" class="ml-2 d-inline-block" style="cursor: pointer">{{ firstName }}</h5>

      <v-btn
          small color="primary"
          @click="logout"
          outlined
          class="ma-2 ml-4 inline"
      >
        Logout
      </v-btn>

    </div>

    <div v-else>
      <v-btn
          small color="primary"
          to="/login"
          class="ma-2"
          outlined
      >
        Login
      </v-btn>

      <v-btn
          small color="primary"
          to="/login"
          class="ma-2"
      >
        SignUp
      </v-btn>
    </div>


  </v-app-bar>
</template>

<script>
import router from "../../router/index"

export default {
  name: "Header",
  data: () => ({}),
  computed: {
    isLogged() {
      return this.$store.getters.isLogged
    },

    firstName() {
      return this.$store.getters.user.firstName
    },

    app_bar_color() {
      // return Boolean(this.$route.path.match(/^\/app($|\/)/))? '#fcfcfc' : '#f5f5f5'
      return '#f5f5f5'
    }
  },
  methods: {
    async logout() {
      const {button} = await this.$pop.info({title: "Confirm!", text: "Do you want to logout?", ok: 'Yes', cancel: 'No'})
      if (button === 1) {
        await this.$store.dispatch("logout")
        await this.$router.push({name: "Home"})
      }
    },
    async viewUserProfile() {
      await router.push("/app/users/view")
    }

  }
}
</script>

<style lang="scss">

</style>

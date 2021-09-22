<template>
  <v-navigation-drawer
      dark app
      fixed clipped
      width="220px"
      mini-variant-width="75"
      class="pl-3"
  >

    <!----------- User Card ------------>
<!--    <v-list-item class="mb-5 pt-2 pb-2 rounded user-card">-->
<!--      <v-list-item-avatar>-->
<!--        <v-avatar color="secondary" size="43" class="lighten-3">-->
<!--          TL-->
<!--        </v-avatar>-->
<!--      </v-list-item-avatar>-->
<!--      <v-list-item-content>-->
<!--        <v-list-item-title>-->
<!--          {{user.firstName}} {{user.lastName}}-->
<!--        </v-list-item-title>-->
<!--        <v-list-item-subtitle>-->
<!--          {{user.role}}-->
<!--        </v-list-item-subtitle>-->
<!--      </v-list-item-content>-->
<!--    </v-list-item>-->
    <!---------- User Card Ends ----------->

    <div style="height: 50px"/>

    <!--  Navigation Links  -->
    <v-list dense nav class="pa-0 v-list-item-border-left-rounded" >
      <v-list-item
          v-for="item in config"
          link :key="item.name"
          :to="item.to"
          active-class="active-item"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
    <!--  End Navigation Links  -->

  </v-navigation-drawer>
</template>

<script>
import config from "./navbar.config"
import {mapGetters} from "vuex";

export default {
  name: "NavDrawer",
  data: () => ({
    config
  }),
  computed: {
    user: mapGetters(["user"]).user
  }
}
</script>

<style lang="scss" scoped>

.active-item {
  background-color: white;
  color: black !important;
}

</style>
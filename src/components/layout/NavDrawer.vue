<template>
  <v-navigation-drawer
      dark app
      fixed clipped
      width="250px"
      mini-variant-width="75"
      class="pl-3"
      style="border-top-right-radius: 5px"
  >
    <div style="height: 40px"/>
    <!--  Navigation Links  -->
    <v-list dense nav class="pa-0 v-list-item-border-left-rounded">
      <div v-for="item in nav_config" :key="item.name" >
        <v-divider
            v-if="item.type === 'divider'"
            class="mt-2"
        />
        <v-list-item
            v-else-if="item.type === 'link'"
            active-class="active-item"
            class="mt-2"
            link
            :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
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
  }),
  computed: {
    user: mapGetters(["user"]).user,
    user_role: mapGetters(["user_role"]).user_role,
    nav_config_raw: () => config,
    nav_config() {
      const filtered = this.nav_config_raw.filter((item) => !Boolean(item.roles) || item.roles.includes(this.user_role))
      return filtered.map((item) =>  ({
          name: item.name || "Default",
          to: item.to || '/app',
          type: item.type || 'link',
          icon: item.icon || '',
        })
      )
    },
  }
}
</script>

<style lang="scss" scoped>

.active-item {
  background-color: #f5f5f5;
  color: black !important;
}

</style>
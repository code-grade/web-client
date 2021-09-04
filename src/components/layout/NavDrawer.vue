<template>
  <v-navigation-drawer
      dark app
      color="secondary"
      class="pa-3"
  >
    <v-list-item class="mb-5 pt-2 pb-2 rounded user-card">
      <v-list-item-avatar>
        <v-avatar color="secondary" size="43" class="lighten-3">
          TL
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          Thilina
        </v-list-item-title>
        <v-list-item-subtitle>
          Administrator
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-spacer/>

    <v-list dense nav>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sample</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavDrawer"
}
</script>

<style lang="scss" scoped>

.user-card {
  background-color: var(--v-secondary-lighten1)
}
</style>
<template>
  <div>
    <NavDrawer/>
    <router-view/>
  </div>
</template>

<script>
import NavDrawer from "../../components/layout/NavDrawer";

export default {
  name: "App",
  components: {NavDrawer}
}
</script>

<style scoped>

</style>
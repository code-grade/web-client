<template>
  <div>
    <NavDrawer/>
    <slot/>
    <Footer/>
  </div>
</template>

<script>
import NavDrawer from "./NavDrawer";
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "Layout",
  components: {Footer, Header, NavDrawer}
}
</script>

<style scoped>

</style>
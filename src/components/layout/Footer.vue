<template>
  <div>
    <FooterLight
      v-if="show_light"
    />
    <FooterLarge
      v-else-if="show_detailed"
    />
  </div>
</template>

<script>
import FooterLight from "./FooterLight";
import FooterLarge from "./FooterLarge";
export default {
  name: "Footer",
  components: {FooterLarge, FooterLight},
  data: () => ({

  }),
  computed: {
    show_light() {
      return Boolean(this.$route.path.match(/^\/app($|\/)/))
    },
    show_detailed() {
      return true
    }
  },
}
</script>

<style scoped>

</style>
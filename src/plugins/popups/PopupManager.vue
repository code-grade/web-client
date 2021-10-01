<template>
  <div>
    <VThemeProvider :dark="false" :light="true">
      <OkPopup ref="info"/>
    </VThemeProvider>
    <VThemeProvider :dark="false" :light="true">
      <AddCity ref="add_city"/>
    </VThemeProvider>
  </div>
</template>

<script>
import store from "../../store"
import OkPopup from "./modules/OkPopup";
import AddCity from "./modules/AddCity";

export default {
  name: "PopupManager",
  components: {
    AddCity,
    OkPopup,
  },
  data: () => ({}),
  computed: {
    _ok() {
      if (this.$refs["info"]) return this.$refs["info"].open
      return () => null
    },
    _addCity() {
      if (this.$refs["add_city"]) return this.$refs.add_city.open
      return () => null
    }
  },
  methods: {
    /**
     * Show info popup
     * @param title
     * @param text
     * @param ok
     * @param cancel
     * @return {Promise<*>}
     */
    info({title, text, ok, cancel}) {
      return this._ok({title, text, ok, cancel, color: this.$vuetify.theme.currentTheme.info})
    },

    /**
     * Show error popup
     * @param title {string}
     * @param text {string}
     * @param ok {string}
     * @param cancel
     * @return {Promise<*>}
     */
    error({title, text, ok, cancel}) {
      return this._ok({title, text, ok, cancel, color: this.$vuetify.theme.currentTheme.error})
    },

    /**
     * Show warn popup
     * @param title {string}
     * @param text {string}
     * @param ok {string}
     * @param cancel
     * @return {Promise<*>}
     */
    warn({title, text, ok, cancel}) {
      return this._ok({title, text, ok, cancel, color: this.$vuetify.theme.currentTheme.warning})
    },

    /**
     *
     * @param title
     * @param district
     * @param city
     * @return {Promise | Promise<unknown>}
     */
    addCity({district, city}) {
      return this._addCity({district, city})
    },
  }
}
</script>

<style scoped>

</style>
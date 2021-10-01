<template>
  <v-dialog
      v-model="show"
      width="300"
  >
    <v-card class="ma-0 pa-0">
      <v-card-title :style="{color: 'white', 'background-color': data.color}" class="title text--white pt-3 pb-1" >
        {{ data.title }}
      </v-card-title>
      <v-card-text class="mt-2 mb-2 subtitle-2" >
        {{ data.text }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pb-3">
        <v-row class="ma-0 pa-0">
          <v-col class="ma-0 pa-0 text-center">
            <v-btn
                :color="data.color"
                class="font-weight-bold"
                dark
                @click="close(1)"
            >
              {{ data.ok }}
            </v-btn>
          </v-col>
          <v-col v-if="data.cancel" class="ma-0 pa-0 text-center">
            <v-btn
                :color="$vuetify.theme.currentTheme.warning"
                class="darken-4 font-weight-bold"
                dark
                @click="close(2)"
            >
              {{ data.cancel }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OkPopup",
  data: () => ({
    show: false,
    data: {
      text: "",
      title: "",
      ok: "",
      cancel: "",
      color: "black"
    },
    done: null
  }),
  methods: {
    _setData({text, title, ok, color, cancel}) {
      this.data.text = text || ""
      this.data.title = title || "Info"
      this.data.ok = ok || "Ok"
      this.data.cancel = cancel || ""
      this.data.color = color || this.$vuetify.theme.currentTheme.primary
    },
    _done(response) {
      if (this.done) {
        this.done(response)
        this.done = null
      }
    },
    open(data) {
      this._setData(data || {})
      this.show = true
      return new Promise(resolve => {
        this.done = resolve
      })
    },
    close(button) {
      this.show = false
      this._done({ button })
    }
  },
  watch: {
    show(_, prev) {
      if (prev === true) {
        this.close(0)
      }
    }
  },
  created() {
    const opener = (done, data) => this.open(done, data)
    const closer = () => this.close()
  }
}
</script>

<style scoped>

</style>
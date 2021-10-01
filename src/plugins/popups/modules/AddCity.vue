<template>
  <v-dialog
      transition="dialog-top-transition"
      v-model="show"
      persistent
      width="400px"
  >
    <v-card class="pa-0">
      <v-card-title
          :style="{
            'background-color': $vuetify.theme.currentTheme.primary,
            'color': 'white'
          }"
          class="mb-3"
      >
        Add City
      </v-card-title>
      <v-form @submit="submit" lazy-validation v-model="form">
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                  v-model="district"
                  :items="districts"
                  dense
                  outlined
                  label="District name"
                  :rules="[
                      (s) => s.length > 0 || 'required'
                  ]"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                  v-model="city"
                  outlined
                  dense
                  label="City name"
                  :rules="[
                      (s) => s.length > 0 || 'required',
                      (s) => s.length > 5 || 'minimum length is 5 characters',
                      (s) => s.length < 45 || 'maximum length is 45 characters'
                  ]"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3" />
          <v-row>
            <v-col class="pl-0 pr-0">
              <v-btn
                  color="primary"
                  class="ma-3"
                  type="submit"
                  :disabled="!form"
                  :loading="loading"
                  width="100"
              >
                Add
              </v-btn>
              <v-btn
                  color="secondary"
                  class="ma-3"
                  @click="close"
                  width="100"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "../../../store"
import api from "../../../api";

export default {
  name: "AddCity",
  data: () => ({
    show: false,
    district: "",
    city: "",
    form: true,
    loading: false,
    done: null,
  }),
  computed: {
    districts() {
      return store.getters["meta/all_districts"]
    }
  },
  methods: {
    open({district, city}) {
      this.show = true
      this.district = district || ""
      this.city = city || ""
      return new Promise(resolve => {
        this.done = (status) => {
          resolve(status)
          this.done = null
        }
      })
    },
    close() {
      this.show = false
    },
    async submit() {
      this.loading = true
      const [{status, message}] = await api.meta.addCity(this.district, this.city)
      this.loading = false
      if (status === 200) {
        if (this.done) this.done("Success")
        this.close()
      } else {
        if (this.done) this.done(message)
        this.close()
      }
      this.district = ""
      this.city = ""
    }
  },
  watch: {
    show(val, old) {
      if (!val && old) {
        if (this.done) this.done("Closed")
      }
    }
  }
}
</script>

<style>
.login-dialog--tab-active {
  background-color: white;
  color: black !important;
}
</style>
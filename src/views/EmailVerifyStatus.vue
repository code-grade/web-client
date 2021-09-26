<template>
  <div>
    <div class="verify">
      <v-container>
        <v-row>
          <v-col cols="12" row wrap align="center"
                 justify="center">

            <v-img
                alt="background"
                :src="require('../assets/success.png')"
                max-width="300px"
                max-height="300px"
                v-if="success"
            />
            <v-img
                alt="background"
                :src="require('../assets/fail.png')"
                max-width="300px"
                max-height="300px"
                v-if="failed"
            />
            <v-img
                alt="background"
                :src="require('../assets/processing.png')"
                max-width="300px"
                max-height="300px"
                v-if="loading"
            />
          </v-col>
          <v-col cols="12" row wrap align="center"
                 justify="center" >
            <h3 v-if="success" style="font-size: 25px">Account verified successfully !</h3>
            <h3 v-if="failed" style="font-size: 25px">Account verification failed !</h3>
            <h3 v-if="loading" style="font-size: 25px">Verifying !</h3>


            <div class="mt-5">

              <v-btn
                  class="ml-1 mr-1"
                  color="primary"
                  outlined
                  :to="{name: 'Home'}"
              >Go back to Home
              </v-btn>
              <v-btn
                  class="ml-1 mr-1"
                  color="gray"
                  outlined
              >need help
              </v-btn>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>
<script>
import api from "@/api"
import router from "@/router"
export default {
  name: "index.vue",
  data: () => ({
    token:"",
    loading: false,
    success: false,
    failed: false
  }),
  created () {
    this.initialize()
  },
  methods:{
    async initialize () {
      this.loading = true;
      this.token = this.$route.params.id;
      const [status, res_data] = await api.user.verifyUser({token:this.token})
      this.loading = false;

      if(status.status === 200) {
        if(this.$store.getters.isLogged) {
          await this.$store.dispatch("update_user_details")
        } else {
          await router.push("/login")
        }
        this.success = true
        this.failed = false

      } else {
        this.fail = true
        this.success = false
      }

    },

  }
}
</script>
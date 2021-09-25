<template>
  <div>
    <div class="section-1">
      <v-container class="container">
        <v-row>
          <v-col class="image-area" cols="6">
            <v-img
                alt="background"
                :src="require('../assets/undraw_Developer_activity_re_39tg.svg')"
                max-width="80%"
            />
          </v-col>
          <v-col class="title-area" cols="6">
            <h3 style="font-size: 25px">Welcome !</h3>
            <h1
                style="font-size: 48px"
                class="font-weight-thin mt-2 mb-2"
            >
              Code Grade #
            </h1>
            <h5
                style="font-size: 16px"
            >Automated Programming Assignment Evaluator</h5>
            <div class="mt-5">
              <v-btn
                  class="ml-1 mr-1" color="primary"
                  :to="{name: 'App'}"
              >
                Test Skills!
              </v-btn>
              <v-btn
                  class="ml-1 mr-1"
                  color="primary"
                  outlined
                  :to="{name: 'App'}"
              >Create Assignment
              </v-btn>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: 'Home',
  computed: {
    ...mapGetters(["isLogged"])
  },

}
</script>

<style scoped lang="scss">
.section-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 90vh;

  .container {
    display: flex;
    flex-direction: row;

    .image-area {
      display: flex;
      justify-content: right;
      padding-right: 40px;
    }

    .title-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

}
</style>

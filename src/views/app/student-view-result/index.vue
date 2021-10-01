<template>
  <div>
    <v-row class="ma-10">
      <div>
        <v-flex
            style="float:left">
          <h2>
            Title:
            <!--            {{title}}-->
          </h2>
          <h5>
            Description:
            <!--            {{description}}-->
          </h5>
        </v-flex>
      </div>
      <v-flex
          style="float:right">
        <div style="float:right">
          <v-btn color="secondary" v-on:click="navigate()">
            <v-icon>mdi-arrow-left-thick</v-icon>
            Go Back
          </v-btn>
        </div>
      </v-flex>
    </v-row>
    <v-row class="ma-10">
      <v-col cols="12" md="6">
        <v-list two-line>
            <v-list-item
                v-for="(item, index) in questionResult" :key="index"
                class="elevation-4 mb-2"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.question.title"></v-list-item-title>
                <v-list-item-subtitle
                    class="text--primary"
                    v-html="item.question.description"
                ></v-list-item-subtitle>

                <v-divider class="mb-2 mt-2"/>
                <h4>SCORE: {{ item.result.totalPoints }}</h4>
              </v-list-item-content>

            </v-list-item>

            <v-divider
                v-if="index < questionResult.length - 1"
                :key="index"
            ></v-divider>
        </v-list>
      </v-col>

      <v-col
      >
        <v-card class="pa-5">

          <v-row>
            <v-col>
              <h5>Final Grade</h5>
              <h4>{{ finalGrade }}</h4>

            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5 class="mb-3">Feedback</h5>
              <p v-html="feedback"></p>

            </v-col>
          </v-row>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import api from "@/api";
import router from "@/router";

export default {
  data: () => ({
    selected: [2],
    finalGrade: "",
    feedback: "",
    questionResult: [],
    loading: false,
  }),
  created() {
    this.fetchResult()

  },
  methods: {
    async fetchResult() {
      this.loading = true;
      this.assignmentId = this.$route.params.assignmentId;
      const [status, res_data] = await api.assignment.final(this.assignmentId)
      console.log(res_data)

      this.loading = false;
      if (status.status === 200) {
        this.finalGrade = res_data.finalGrade.finalGrade
        this.feedback = res_data.finalGrade.feedback
        this.questionResult = [...res_data.questionResult]
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    navigate() {
      router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
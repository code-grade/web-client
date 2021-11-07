<template>
  <v-container class="pl-6 pr-6">
    <v-row>
      <v-col>
        <v-flex
            style="float:left">
          <h2>{{ question.title }}</h2>
          <h5>{{ assignment.title }}</h5>
        </v-flex>
      </v-col>
    </v-row>
    <v-card class="mt-5 pa-6">
      <v-card-text>
        <v-row>
          <v-col>
            <h4>Opened At : {{ openTime }}</h4>
          </v-col>
          <v-col>
            <h4>Close At : {{ closeTime }}</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>Total Points : {{ question.totalPoints }}</h4>
          </v-col>
          <v-col>
            <h4>Difficulty : {{ question.difficulty }}</h4>
          </v-col>
        </v-row>
        <v-divider class="mt-3"/>
        <v-row>
          <v-col>
            <v-tabs
                v-model="active_tab"
                slider-size="5"
                slider-color="primary"
                color="basil"
                grow
            >
              <v-tab>Editor</v-tab>
              <v-tab>Submissions</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
        <v-divider class="mb-3"/>
        <v-row>
          <v-col>
            <v-tabs-items v-model="active_tab">
              <v-tab-item style="min-height: 100vh">
                <v-row>
                  <v-col>
                    <p style="font-size: 16px" v-html="question.description"></p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>

                  </v-col>
                  <v-col cols="3">
                    <v-select
                        outlined
                        dense
                        label="Language"
                        :items="['Python']"
                        value="Python"
                        hide-details
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <MonacoEditor
                        v-model="code"
                        class="editor elevation-5"
                        language="python"
                        theme="vs-dark"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn
                        color="success"
                        outlined
                        class="mr-4"
                        width="130"
                        @click="runCode"
                        :loading="loading"
                    >
                      Run Code
                    </v-btn>
                    <v-btn
                        color="success"
                        width="130"
                        @click="submitCode"
                        :loading="loading"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <RunTestCaseResult :results="testResult"/>
                  </v-col>
                </v-row>
              </v-tab-item>


              <!-- Submissions -->
              <v-tab-item style="min-height: 100vh">
                <v-card
                    color="basil"
                    flat
                >
                  <v-card-text>
                    <SubmissionsList
                        :assignment-id="assignmentId"
                        :question-id="questionId"
                        ref="submissionList"
                    />
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import api from "@/api";
import RunTestCaseResult from "@/views/app/view-question/RunTestCaseResult";
import SubmissionsList from "@/views/app/view-question/SubmissionsList";

export default {
  name: 'index',
  components: {
    SubmissionsList,
    RunTestCaseResult,
    MonacoEditor
  },
  data: () => ({
    loading: false,
    active_tab: 0,
    code: "#Write your answer here.",
    language: "python",
    assignment: {
      schedule: {}
    },
    question: {},
    testResult: [],
  }),
  computed: {
    questionId() {
      return this.$route.params.questionId
    },
    assignmentId() {
      return this.$route.params.assignmentId
    },
    openTime() {
      const date = new Date(this.assignment.schedule.openTime)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    },
    closeTime() {
      const date = new Date(this.assignment.schedule.closeTime)
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    }
  },
  methods: {
    async submitCode() {
      this.loading = true
      this.active_tab = 1
      window.scrollTo({top: 0, behavior: "smooth"})
      const [status, res] = await api.submission.make(
          this.assignmentId,
          this.questionId,
          {source: this.code, language: this.language.toUpperCase()}
      )
      this.loading = false
      console.log(status, res)
      if (status.status === 200) {
        this.$refs.submissionList.add(res)
      } else {
        this.$vToastify.error(status.message)
        this.active_tab = 0
      }
    },
    async runCode() {
      this.loading = true
      const [status, res] = await api.submission.test(
          this.questionId,
          {source: this.code, language: this.language.toUpperCase()}
      )
      this.loading = false
      console.log(status, res)
      if (status.status === 200) {
        this.testResult = res
      } else {
        this.$vToastify.error(status.message)
      }

    },
    async fetchQuestion() {
      const [status, res_data] = await api.question.single(false, this.questionId)
      if (status.status === 200) {
        this.question = res_data
      } else {
        this.$vToastify.error("Couldn't load question details")
      }
    },
    async fetchAssignment() {
      const [status, res_data] = await api.assignment.get(this.assignmentId)
      if (status.status === 200) {
        this.assignment = res_data
      } else {
        this.$vToastify.error("Couldn't load question details")
      }
    },
  },
  created() {
    this.fetchQuestion()
    this.fetchAssignment()
  }
}
</script>

<style scoped>

.editor {
  width: 99%;
  height: 500px;
  padding: 2px;
  font-family: "JetBrains Mono", monospace;
  font-size: 16px;
}

.tab-active {
  background-color: white;
  color: black;
}
</style>
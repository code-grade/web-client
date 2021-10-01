<template>
  <v-container>
    <v-row class="ml-7 mr-7 mt-6 mb-6">
      <v-flex style="float:left">
        <h2>Create New Question</h2>
        <h5>Question will be added to question bank.</h5>
      </v-flex>
    </v-row>

    <v-card class="pa-7 pl-10 pr-10 ml-7 mr-7">
      <v-form ref="questionForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <h5 class="mb-2">Question title</h5>
            <v-text-field
                dense
                outlined
                v-model="title"
                :rules="titleRules"
                placeholder="Enter the title of question"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <h5 class="mb-2">Question Difficulty</h5>
            <v-select
                dense
                :items="difficulties"
                v-model="difficulty"
                :rules="difficultyRules"
                outlined
                placeholder="Select Difficulty"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h5 class="mb-2">Description</h5>
            <v-flex class="mb-2">
              <vue-editor v-model="description" :rules="descriptionRules"/>
            </v-flex>
          </v-col>
        </v-row>

        <!--test cases adding part start-->
        <v-row>
          <v-col>
            <h5>Add Test Cases</h5>
            <h6 class="mb-2">(Total points of the question will be the sum of all points of test cases)</h6>
            <v-data-table
                :headers="headers"
                :items="testCases"
                class="elevation-0 mb-4"
                disable-sort
                hide-default-footer
                ref="testcaseTable"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-row>
                    <h5 class="mb-0">Total Points: {{totalPoints}}</h5>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" dark class="mb-2" @click="addTestCase">
                      Add New
                    </v-btn>
                  </v-row>
                </v-toolbar>
              </template>
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                    x-small
                    color="warning"
                    class="text-color-black ml-1"
                    @click="editTestCase(item)"
                >
                  edit
                </v-btn>
                <v-btn
                    x-small
                    color="error"
                    class="text-color-black ml-1"
                    @click="deleteTestCase(item)"
                >
                  delete
                </v-btn>
              </template>
              <template v-slot:no-data>
                <h5>No test cases have been added</h5>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-right">
            <v-btn class="mr-4 ml-4" outlined @click="reset">
              clear
            </v-btn>
            <v-btn color="success" :loading="loading" @click="submitQuestion">
              submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <TestCaseDialog ref="testCaseDialog"/>
  </v-container>
</template>


<script>
import {VueEditor} from "vue2-editor";
import Validators from "@/utils/validators"
import api from "@/api";
import TestCaseDialog from "@/views/app/create-question/TestCaseDialog";

export default {
  name: "index",
  components: {TestCaseDialog, VueEditor},
  data: () => ({
    valid: true,
    loading: false,
    title: '',
    description: '',
    difficulty: '',
    points: 0,
    timeLimit: 5,
    titleRules: [Validators.required()],
    nameRules: [Validators.required()],
    selectRules: [Validators.required()],
    difficultyRules: [Validators.required()],
    descriptionRules: [Validators.required()],
    selectLanguage: null,
    difficulties: ['Hard', 'Medium', 'Easy'],
    checkbox: false,
    headers: [
      {text: 'ID', align: 'start', sortable: true, value: 'id', width: 60},
      {text: 'Input', align: 'start', sortable: false, value: 'input'},
      {text: 'Output', value: 'output'},
      {text: 'Sample Case', value: 'sample', width: 150},
      {text: 'Points', value: 'points', width: 80},
      {text: 'Actions', value: 'actions', width: 150},
    ],
    testCases: []
  }),
  computed: {
    totalPoints() {
      return this.testCases.map(t => Number(t.points)).reduce((a, b) => a + b, 0)
    }
  },
  methods: {
    async addTestCase() {
      const newId = this.testCases.length ? (1 + Math.max(...this.testCases.map(t => t.id))) : 0
      const data = await this.$refs.testCaseDialog.open(newId)
      if (data) {
        this.testCases.push(data)
      }
    },
    async editTestCase(item) {
      const data = await this.$refs.testCaseDialog.edit(item)
      if (data) {
        console.log(data)
        this.testCases = this.testCases.map(t => (t.id === item.id) ? data : t)
      }
    },
    async deleteTestCase(item) {
      const {button} = await this.$pop.warn({title: 'Confirm', text: "Are you sure?", ok: 'Yes', cancel: 'No'})
      if (button === 1) {
        this.testCases = this.testCases.filter(t => t.id !== item.id)
      }
    },
    reset() {
      this.$refs.questionForm.reset()
      this.description = ''
      this.testCases = []
    },
    async submitQuestion() {
      await this.$refs.questionForm.validate()
      if (!this.valid ||
          this.description.replaceAll(' ', '') === '' ||
          this.testCases.length === 0) {
        this.$pop.error({title: 'Incomplete', text: 'Please fill-out all necessary fields.'})
        return;
      }

      const {button} = await this.$pop.info({
        title: 'Confirm', text: 'You want to submit the form?',
        ok: 'Yes', cancel: 'No'
      })
      if (button !== 1) {
        return;
      }

      let questionData = {
        title: this.title,
        description: this.description,
        difficulty: this.difficulty,
        totalPoints: this.totalPoints,
        testCases: this.testCases,
      }
      console.log(questionData)
      this.loading = true
      const [status, res_data] = await api.question.create(questionData)
      this.loading = false
      console.log(status)
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Added!")
        this.$refs.questionForm.reset()
        this.description = ''
        this.testCases = []
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <v-container class="">
    <v-row class="ml-10 mr-10 mb-5 mt-5">
      <v-flex
          style="float:left">
        <h2>Create New Assignment
        </h2>
        <h5>Fill the following details to create an assignment.</h5>
      </v-flex>

    </v-row>

    <v-stepper
        v-model="step"
        class="ma-5"
        vertical
    >

      <v-stepper-step
          :complete="step > 1"
          style="cursor: pointer"
          complete-icon="mdi-check-bold"
          @click="step = 1"
          step="1"
      >
        Basic Details
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form
            class="mb-5 pa-5"
            ref="assignmentForm"
            id="qn-info-form"
            v-model="valid"
            @submit.prevent="step = 2"
            lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="6" md="8">
              <h5 class="mb-2">Title</h5>
              <v-text-field
                  dense
                  outlined
                  v-model="title"
                  :rules="titleRules"
                  placeholder="Title of the assignment"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <h5 class="mb-2">Set question privacy</h5>
              <v-select
                  dense
                  :items="types"
                  v-model="type"
                  :rules="difficultyRules"
                  outlined
                  placeholder="Select Type"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5 class="mb-2">Description</h5>
              <v-flex>
                <vue-editor v-model="description" :rules="descriptionRules"/>
              </v-flex>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox
                  v-model="scheduled"
                  label="Scheduled Assignment"
                  hide-details
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-datetime-picker
                  :disabled="!scheduled"
                  v-model="openTime"
                  label="Select opening time"
                  class="secondary"
              />
            </v-col>
            <v-col>
              <v-datetime-picker
                  :disabled="!scheduled"
                  v-model="closeTime"
                  label="Select closing time"
                  class="secondary"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-5 mb-5"/>
          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn
                  :disabled="!valid"
                  type="submit"
                  form="qn-info-form"
                  color="primary"
                  min-width="100"
                  class="ml-2 mr-2"
              >
                Next
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step
          step="2"
          :complete="step > 2"
          style="cursor: pointer"
          complete-icon="mdi-check-bold"
          @click="step = 2"
      >
        Add Questions
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-row>
          <v-col>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="questions"
                :single-select="false"
                item-key="questionId"
                show-select
                class="mb-5"
            />
          </v-col>
        </v-row>
        <v-divider class="mt-5 mb-5"/>
        <v-row>
          <v-col class="text-right">
            <v-btn
                outlined
                min-width="100"
                class="ml-2 mr-2"
                @click="step = 1"
            >
              Back
            </v-btn>
            <v-btn
                color="primary"
                min-width="100"
                class="ml-2 mr-2"
                :loading="loading"
                @click="submit"
                dark
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>


<script>
import {VueEditor} from "vue2-editor";
import Validators from "@/utils/validators"
import api from "@/api";
import AssignmentInfo from "@/views/app/create-assignment/AssignmentInfo";
import QuestionCollection from "@/views/app/create-assignment/QuestionCollection";
import router from "@/router"

export default {
  name: "index",
  components: {QuestionCollection, AssignmentInfo, VueEditor},
  data: () => ({
    valid: true,
    loading: false,
    step: 1,
    title: '',
    description: '',
    type: 'PUBLIC',
    openTime: '',
    closeTime: '',
    scheduled: true,
    titleRules: [Validators.required()],
    nameRules: [Validators.required()],
    selectRules: [Validators.required()],
    difficultyRules: [Validators.required()],
    descriptionRules: [Validators.required()],
    selectLanguage: null,
    types: ['PUBLIC', 'PRIVATE'],
    checkbox: false,
    selected: [],
    headers: [
      {
        text: 'Title',
        align: 'start',
        filterable: true,
        value: 'title',
      },
      {text: 'Max Points', value: 'totalPoints'},
      {text: 'Difficulty', value: 'difficulty'},
    ],
    questions: [],
  }),
  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.loading = true;
      const [status, res_data] = await api.question.instructor()
      this.loading = false;
      if (status.status === 200) {
        this.questions = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async submit() {
      await this.$refs.assignmentForm.validate()
      if (!this.valid || this.description === "") {
        await this.$pop.info({
          title: 'Info',
          text: 'Incomplete form data please fill all necessary fields.',
        })
        return;
      }

      const {button} = await this.$pop.info({
        title: 'Confirm',
        text: 'Are you want to submit?',
        ok: 'YES', cancel: 'NO'
      })
      if (button !== 1) return

      const selectedQuestions = this.selected.map(q => q.questionId)
      const assignmentData = {
        title: this.title,
        description: this.description,
        type: this.type,
        openTime: this.openTime,
        closeTime: this.closeTime,
        questions: selectedQuestions,
        scheduled: this.scheduled
      }
      console.log(assignmentData)
      this.loading = true
      const [status, res_data] = await api.assignment.create(assignmentData)
      this.loading = false
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Added!")
        this.$refs.assignmentForm.reset()
        await router.push("/app/assignments/DRAFT")
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    }
  },

};
</script>

<style scoped>

</style>
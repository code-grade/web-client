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
        v-model="e1"
        class="ma-5"
        vertical
    >

      <v-stepper-step
          :complete="e1 > 1"
          style="cursor: pointer"
          complete-icon="mdi-check-bold"
          @click="e1 = 1"
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
            @submit.prevent="e1 = 2"
            lazy-validation
        >
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="8"
            >
              <v-row>
                <v-col>
                  <h5>Title</h5>
                  <v-text-field
                      dense
                      outlined
                      v-model="title"
                      :rules="titleRules"
                      placeholder="Title of the assignment"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h5>Description</h5>
                  <v-flex class="mb-2">
                    <vue-editor v-model="description" :rules="descriptionRules"/>
                  </v-flex>
                </v-col>
              </v-row>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="3"
            >
              <h5>Set question privacy</h5>
              <v-select
                  dense
                  :items="types"
                  v-model="type"
                  :rules="difficultyRules"
                  outlined
                  placeholder="Select Type"
              ></v-select>
              <v-checkbox
                  v-model="scheduled"
                  label="Scheduled Assignment"
              ></v-checkbox>
              <div v-if="scheduled">
                <v-datetime-picker
                    v-model="openTime"
                    label="Select opening time"
                    class="secondary"
                />
                <v-datetime-picker
                    v-model="closeTime"
                    label="Select closing time"
                    class="secondary"
                />
              </div>
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
          :complete="e1 > 2"
          style="cursor: pointer"
          complete-icon="mdi-check-bold"
          @click="e1 = 2"
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
                @click="e1 = 1"
            >
              Back
            </v-btn>
            <v-btn
                color="primary"
                min-width="100"
                class="ml-2 mr-2"
                @click="submitAssignment"
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
    e1: 1,
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
    dialog: false,
    dialogDelete: false,
    selected: [],
    headers: [
      {
        text: 'TITLE',
        align: 'start',
        filterable: true,
        value: 'title',
      },
      {text: 'MAX POINTS', value: 'points'},
      {text: 'DIFFICULTY', value: 'difficulty'},
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
    async submitAssignment() {
      const {button} = await this.$pop.info({
        title: 'Confirm',
        text: 'Are you want to submit?',
        ok: 'YES', cancel: 'NO'
      })
      if (button !== 1) return

      const selectedQuestions = this.selected.map(q => q.questionId)
      if (this.title !== '' && this.description !== "") {
        const assignmentData = {
          title: this.title,
          description: this.description,
          type: this.type,
          openTime: this.openTime,
          closeTime: this.closeTime,
          questions: selectedQuestions,
          scheduled: this.scheduled
        }
        const [status, res_data] = await api.assignment.create(assignmentData)
        if (status.status === 200) {
          this.$vToastify.success(status.message, "Successfully Added!")
          this.$refs.assignmentForm.reset()
          await router.push("/app/assignments")
        } else {
          this.$vToastify.error(res_data, "Done")
        }
      } else {
        this.$vToastify.error("Please fill all the fields", "Incomplete Data")
      }
    }
  },

};
</script>

<style scoped>

</style>
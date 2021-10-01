<template>
  <div>
    <v-row
        class="ma-10"
    >
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
    >
      <v-stepper-header>
        <v-stepper-step
            :complete="e1 > 1"
            step="1"
        >
          Assignment Details
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
            :complete="e1 > 2"
            step="2"
        >
          Add Questions
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          Confirm
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <!--            <AssignmentInfo/>-->
          <v-form class="rounded-lg elevation-3 mb-5 pa-5"
                  ref="assignmentForm"
                  id="qn-info-form"
                  v-model="valid"
                  @submit.prevent="sendToAddQuestions"
                  lazy-validation>
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
                    :label="`Scheduled Assignment`"
                ></v-checkbox>
                <div v-if="scheduled">
                  <v-datetime-picker label="Select start Datetime" class="secondary"
                                     v-model="openTime"></v-datetime-picker>
                  <v-datetime-picker label="Select end Datetime" class="secondary"
                                     v-model="closeTime"></v-datetime-picker>
                </div>
              </v-col>
            </v-row>


          </v-form>
          <div class="text-right ">
            <v-btn
                :disabled="!valid" type="submit" form="qn-info-form" class="primary "
            >
              Next
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <!--            <QuestionCollection/>-->
          <v-data-table
              v-model="selected"
              :headers="headers"
              :items="questions"
              :single-select="false"
              item-key="questionId"
              show-select
              class="elevation-1 mb-5"

          ></v-data-table>
          <div class="text-right ">
            <v-btn text @click="e1 = 1">
              Back
            </v-btn>
            <v-btn
                color="primary"
                @click="e1 = 3"
                dark
            >
              Next
            </v-btn>

          </div>


        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
              class="mb-12"

              height="200px"

          >
            <v-card-title primary-title class="justify-center">
              <div>
                <h1 class="text--center text-center ">Confirm</h1>
                <h4>Are you sure, you want to create this assignment?</h4>
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn
                  color="success"
                  @click="createAssignment"
              >
                Submit
              </v-btn>
            </v-card-actions>

          </v-card>
          <div class="text-right ">
            <v-btn text @click="e1 = 2">
              Back
            </v-btn>

          </div>


        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
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
    scheduled: false,
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
    sendToAddQuestions() {
      this.e1 = '2'
    },
    async createAssignment() {
      const selectedQuestions = []
      this.selected.forEach(q => {
        selectedQuestions.push(q.questionId)
      })
      if (this.title !== '' && this.description !== "") {


        let assignmentData =
            {
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
<template>
  <div>
    <v-row class="ma-10">
      <div>
        <v-flex
            style="float:left">
          <h2>{{title}}
          </h2>
          <h5 v-html="description"></h5>
        </v-flex>
      </div>
      <v-flex
          style="float:right">
        <div style="float:right">
          <v-btn color="secondary"  v-on:click="navigate()"><v-icon>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
        </div>
      </v-flex>
    </v-row>
    <v-row>
      <v-col
          cols="12"
          md="6">
        <v-row  v-for="i in questionSummary.length" :key="i">
          <v-col>
            <v-card
                class="pa-1   ml-5 "
                outlined
                tile
                elevation="5"
            >
              <v-card-title>
                {{questionSummary[i-1].question.title}}
              </v-card-title>
              <v-card-subtitle class="pt-0 pb-0">
                Score: {{questionSummary[i-1].result.totalPoints || "Not available"}}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn class="float-right mr-10"
                       v-if="(!questionSummary[i-1].result.evaluated)"
                       outlined
                       color="gray">
                  Not Completed
                </v-btn>
                <v-btn class="float-right mr-10"
                       v-else
                       tile

                       color="green">
                  Completed
                </v-btn>
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                    >
                      Submission
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Language : {{questionSummary[i-1].sourceCode.language}}
                    </v-card-title>

                    <v-card-text>
                      {{questionSummary[i-1].sourceCode.source}}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="primary"
                          text
                          @click="dialog = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col
          >
        <v-card class="pa-5">
          <v-form class="rounded-lg elevation-3 ma-10 pa-5"
                  ref="finalMarksForm"
                  id="marks-form"
                  @submit.prevent="submitFeedback"
                  v-model="valid"
                  lazy-validation>
            <v-row>
              <v-col>
                <h5>finalGrade</h5>
                <v-text-field
                    dense
                    outlined

                    v-model="finalGrade"
                    type="number"
                    :rules="finalMarksValidator"
                    placeholder="Final Score"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5>Feedback</h5>
                <v-flex class="mb-2">
                  <vue-editor v-model="feedback" :rules="feedbackRules"/>
                </v-flex>
              </v-col>
            </v-row>
            <div class="text-center ">
              <v-btn :disabled="!valid" :loading="submitting" rounded color="secondary accent-3"  type="submit" form="marks-form" dark>Submit</v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from '../../../router'
import api from "@/api";
import Validators from "@/utils/validators";
import {VueEditor} from "vue2-editor";
export default {
  name:'index',
  components: { VueEditor },
  data: () => ({
    dialog: false,
    submitting:false,
    loading:'true',
    assignmentId:'',
    studentId:"",
    valid:"true",
    title:"",
    description:"",
    finalGrade:"",
    feedback:"",
    finalMarksValidator: [Validators.required(),Validators.greater(0),Validators.lesser(101)],
    feedbackRules:[Validators.required()],
    headers: [
      { text: 'NAME', value: 'username' },
      { text: 'EMAIL', value: 'email.email' },
      { text: 'SUBMISSIONS', value: 'submissions' },
    ],
    questionSummary:[],
  }),
  created () {
    this.fetchAssignment()
    this.fetchAssignmentSummary()
  },

  methods: {
    async fetchAssignment() {
      this.loading = true;
      this.assignmentId = this.$route.params.id;
      const [status, res_data] = await api.assignment.instructorGetAssignmentById(this.assignmentId)

      this.loading = false;
      if (status.status === 200) {

        this.title = res_data.title
        this.questions = res_data.questions
        this.description = res_data.description
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    async fetchAssignmentSummary() {
      this.loading = true;
      this.studentId = this.$route.params.stId;
      const [status, res_data] = await api.assignment.instructorGetParticipantsSummary(this.assignmentId,this.studentId)
      console.log(res_data)
      this.loading = false;
      if (status.status === 200) {
        this.questionSummary = [...res_data]
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    async viewSubmissions(stId) {
      await router.push(`/app/assignments/${this.assignmentId}/${stId}`)
    },
    async submitFeedback(){
      this.submitting = true
      const [status,res_data] = await api.assignment.grade(this.assignmentId,this.studentId,{finalGrade:this.finalGrade,feedback:this.feedback})
      console.log(res_data)
      this.submitting = false
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Added Feedback!")
        this.$refs.finalMarksForm.reset()
        this.navigate()

      } else {
        this.$vToastify.error(res_data, "Done")
      }

    },
    navigate() {
      router.go(-1);
    }
  }
}
</script>
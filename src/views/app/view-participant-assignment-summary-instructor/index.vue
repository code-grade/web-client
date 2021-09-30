<template>
  <div>
    <v-row class="ma-10">
      <div>
        <v-flex
            style="float:left">
          <h2>{{title}}
          </h2>
          <h5>{{description}}</h5>
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
          sm="6"
          md="8">
        <v-row  v-for="i in questionSummary.length" :key="i">
          <v-col

          >
            <v-card
                class="pa-1   ml-5 mr-5"
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
      <v-col>
      </v-col>
      <v-col>
        <v-card>
<!--          <v-card-subtitle class="pb-0">-->
<!--            Start Time:{{assignment.openTime}}-->
<!--          </v-card-subtitle>-->
<!--          <v-card-subtitle class="pt-0">-->
<!--            Due Time:{{assignment.endTime}}-->
<!--          </v-card-subtitle>-->
<!--          <h5 class="pa-4">-->
<!--            Note: The assignment will automaticaly close after the time is due!-->
<!--          </h5>-->
          <v-card-subtitle class="pb-0">
            Start Time:
          </v-card-subtitle>
          <v-card-subtitle class="pt-0">
            Due Time:
          </v-card-subtitle>
          <h5 class="pa-4">
            Note: The assignment will automaticaly close after the time is due!
          </h5>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import router from '../../../router'
import api from "@/api";
export default {
  name:'index',

  data: () => ({

    dialog: false,
    loading:'true',
    assignmentId:'',
    studentId:"",
    title:"",
    description:"",
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
    navigate() {
      router.go(-1);
    }
  }
}
</script>
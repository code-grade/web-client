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
                <v-row>
                  <v-col>
                    <p style="font-size: 16px" v-html="question.description"></p>
                  </v-col>
                </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
        <v-data-table
        :headers="headers"
        :items="records"
        item-key="name"
        :items-per-page="10"
        class="elevation-3 mt-10 pa-5"
        disable-sort
        :loading="loading"
        ref="plagarismPreport"
    >
    <template v-slot:top>
    <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Source Codes</v-card-title>
            <v-divider></v-divider>
            <v-card-subtitle><b>{{viewItem.first.user.username}}</b></v-card-subtitle>
            <v-card-text>{{viewItem.first.sourceCode.language}}</v-card-text>
            <v-card-text>{{viewItem.first.sourceCode.source}}</v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle><b>{{viewItem.second.user.username}}</b></v-card-subtitle>
            <v-card-text>{{viewItem.second.sourceCode.language}}</v-card-text>
            <v-card-text>{{viewItem.second.sourceCode.source}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()" >Close</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:[`item.view`]="{item}">
      <v-btn 
      outlined
      color="primary"
      small
      @click="viewCodes(item)">
        View
      </v-btn>
    </template>
    
        </v-data-table>
  </v-container>
</template>

<script>
import api from "@/api";

export default {
  name: 'index',
 
  data: () => ({
    dialog: false,
    loading:'true',
    headers: [
      {
        text: 'No',
        align: 'start',
        filterable: true,
        value: 'no',
      },
      { text: 'student 1', value: 'first.user.username' },
      { text: 'Submitted Time', value: 'first.submittedTime' },
      { text: 'Student 2', value: 'second.user.username' },
      { text: 'Submitted Time', value: 'second.submittedTime' },
      { text: 'Percentage (%)', value: 'percentage' },
      { text: 'No. of Lines', value: 'lines' },
      { text: 'View', value: 'view' },
    ],
    assignment: {},
    question: {},
    records:[],
    viewItem:{
      first:{
        user:{
          username:''
        },
        sourceCode:{
          language:'',
          source:''
        }
      },
      second:{
        user:{
          username:''
        },
        sourceCode:{
          language:'',
          source:''
        }
      }
    },
    viewIndex:0
  }),
  computed: {
    questionId() {
      return this.$route.params.questionId
    },
    assignmentId() {
      return this.$route.params.assignmentId
    },
  },
  methods: {
    async initialize(){
        this.loading = true;
        const [status, res_data] = await api.plagiarism.report(this.$route.params.assignmentId,this.$route.params.questionId)
        console.log(status,res_data)
        this.loading = false;
        if (status.status === 200) {
        this.records = [...res_data]
        console.log(this.records)
      } else {
        this.$vToastify.error(res_data, "Done")
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

    viewCodes (item) {
      this.viewIndex = this.records.indexOf(item)
        this.viewItem = Object.assign({}, item)
        console.log(this.viewItem)
        this.dialog = true
      },
    close(){
      this.dialog=false
    }
  },
  created() {
    this.fetchQuestion()
    this.fetchAssignment()
    this.initialize()
  }
}
</script>

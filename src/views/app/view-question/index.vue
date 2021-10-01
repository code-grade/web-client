<template>
  <v-card class="ma-10" elevation="2">
    <v-card-title>{{this.question.title}}</v-card-title>

    <v-tabs
        v-model="active_tab"
    >
      <v-tab
          v-for="tab of tabs" :key="tab.id"
      >
        {{tab.name}}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="active_tab">
      <v-tab-item>
        <v-card flat class="ma-5">
          <v-row>
            <v-col cols="8" xs="6">
              <div v-html='this.question.description'></div>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="ma-5">
              <v-row class="pb-2"><v-icon>mdi-account</v-icon>Difficulty : {{this.question.difficulty}}</v-row>
              <v-row class="pb-2"><v-icon>mdi-account</v-icon>Max-Score :   {{this.question.totalPoints}}</v-row>
            </v-col>
          </v-row>
        </v-card>
        <CodeEditor @incrementStep="incrementStep($event)"/>
      </v-tab-item>
      <v-tab-item>
        <Submission />
      </v-tab-item>

    </v-tabs-items>
  </v-card>
</template>

<script>
import TaskView from "@/components/TaskView";
import Submission from "@/components/Submission";
import CodeEditor from "@/components/CodeEditor";
import api from "@/api";

export default {
  name:'index',
  components: {TaskView,Submission,CodeEditor},
  data: ()=> ({
    active_tab: 0,
    tabs: [
      { id: 1, name: 'task' },
      { id: 2, name: 'submission' },

    ],
    question:[],
  }),
  created(){
    this.initialize()
  },

  methods:{
    async initialize(){
      const[status,res_data]=await api.question.single(false,this.$route.params.questionId)
      if(status.status==200){
        this.question=res_data
      }
    },
    incrementStep() {
      this.active_tab = 1;
    },
  }
}
</script>

<style scoped>
.v-slide-group__content{
  background-color: rgb(73, 72, 71);
}
.v-tabs-bar__content{
  background-color:accent;
}
</style>
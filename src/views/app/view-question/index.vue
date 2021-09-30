<template>
  <v-card class="ma-10" elevation="2">
      <v-card-title>{{this.question.title}}</v-card-title>
    
        <v-tabs
          v-model="tabs"
        >
          <v-tab
            v-for="n in 2"
            :key="n"
          >
            <p v-if="(n==1)">
              TASK
            </p>
            <p v-if="(n==2)">
              SUBMISSIONS
            </p>
          </v-tab>
        </v-tabs>

    <v-tabs-items v-model="tabs">
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
        <CodeEditor />
    
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
        tabs: null,   
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
      }
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
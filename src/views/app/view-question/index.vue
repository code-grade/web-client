<template>
  <v-card class="ma-10" elevation="2">
      <v-card-title>Question Name</v-card-title>
    
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
        
        <TaskView :questionId='this.questionId'></TaskView>
        <CodeEditor/>
    
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

  export default {
      name:'index',
      components: {TaskView,Submission,CodeEditor},
      
    data () {
      return {
        tabs: null,
        questionId:1,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }

    },
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
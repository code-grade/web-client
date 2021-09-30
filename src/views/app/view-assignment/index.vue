<template>
<div>
    <v-row class="ma-10">
        <div>
        <v-flex 
        style="float:left">
          <h2>{{assignment.title}}
          </h2>
          <div v-html='assignment.description'></div>
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
    <v-row  v-for="i in assignment.questions.length" :key="i">
     <v-col
     >
        <v-card
          class="pa-1 ml-10"
          outlined
          tile
          elevation="5"
        >
          <v-card-title>
              {{assignment.questions[i-1].title}}
          </v-card-title>
          <v-btn class="float-right mr-10"
          outlined
        color="primary"
        :to="{name:'View Question', params:{questionId:assignment.questions[i-1].questionId,assignmentId:assignment.assignmentId}}">
              Go To Question
        </v-btn>
          <v-card-subtitle class="pt-0 pb-0">
              Max Score: {{assignment.questions[i-1].totalPoints}}
              </v-card-subtitle>
          <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Easy')" class="green--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
        <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Medium')" class="orange--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
            <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Hard')" class="red--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
        </v-card>
     </v-col>
    </v-row>
        </v-col>
<v-col>
    <v-card>
        <v-card-subtitle class="pb-0">
            Start Time:{{assignment.openTime}}
        </v-card-subtitle>
        <v-card-subtitle class="pt-0">
            Due Time:{{assignment.closeTime}}
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
import router from "@/router";
import api from '@/api'
export default {
    name:'index',

    data: ()=> ({
                assignment:[],
        }),
        created() {
            this.initialize()
        },
        methods: {
            navigate() {
                router.go(-1);
            },

            async initialize(){
                const[status,res_data] = await api.assignment.get(this.$route.params.assignmentId)
                console.log(res_data)
                if(status.status==200){
                    this.assignment=res_data
                }
            },

        }
}
</script>
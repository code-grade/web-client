<template>
<div>
    <v-row class="ma-10">
        <div>
        <v-flex 
        style="float:left">
          <h2>{{assignment.name}}
          </h2>
          <h5>{{assignment.description}}</h5>
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
          v-if="(assignment.student_question[i-1].marks==0)"
          outlined
        color="green">
              Solve Task
        </v-btn>
         <v-btn class="float-right mr-10"
         v-if="(assignment.student_question[i-1].marks!==0 && assignment.student_question[i-1].marks<assignment.questions[i-1].points )"
          outlined
        color="gray">
              Try Again
        </v-btn>
         <v-btn class="float-right mr-10"
         v-if="(assignment.student_question[i-1].marks==assignment.questions[i-1].points)"
          tile
          
        color="green">
              Completed
        </v-btn>
          <v-card-subtitle class="pt-0 pb-0">
              Max Score: {{assignment.questions[i-1].points}}
              </v-card-subtitle>
              <v-card-subtitle class="pt-0 pb-0">
              Your Score: {{assignment.questions[i-1].points}}
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
            Due Time:{{assignment.endTime}}
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
export default {
    name:'index',

    data () {
            return {
                id: 0,
                assignment:{
                    id:1,
                    name:'Assignment 1',
                    description:'description of assignment 1',
                    openTime:'8:00am 2021/09/28',
                    endTime:'11:59pm 2021/09/28',
                    questions:[
                        {
                            id:1,
                            title:'question 1',
                            points:10,
                            difficulty:'Easy'
                        },
                        {
                            id:2,
                            title:'question 2',
                            points:10,
                            difficulty:'Medium'
                        },
                        {
                            id:3,
                            title:'question 3',
                            points:10,
                            difficulty:'Hard'
                        },
                        {
                            id:4,
                            title:'question 2',
                            points:10,
                            difficulty:'Medium'
                        },
                        {
                            id:5,
                            title:'question 3',
                            points:10,
                            difficulty:'Hard'
                        },
                        
                    ],
                    student_question:[
                        {
                            id:1,
                            marks:10
                        },
                        {
                            id:2,
                            marks:5
                        },
                        {
                            id:3,
                            marks:8
                        },
                        {
                            id:4,
                            marks:8
                        },
                        {
                            id:5,
                            marks:0
                        }
                    ]
                }
            }
        },
        created() {
            this.id = this.$route.params.id;
        },
        methods: {
            navigate() {
                router.go(-1);
            }
        }
}
</script>
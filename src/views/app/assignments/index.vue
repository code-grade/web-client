<template>
   <div>
    <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Assignments
          </h2>
          <h5> You can manage all Assignments here</h5>
        </v-flex>
        <v-flex
        style="float:right">
        <div style="float:right">
          <v-btn to="/app/assignments/create" class="mt-3" color="secondary"><v-icon>mdi-plus</v-icon>Create Assignment</v-btn>
          </div>
        </v-flex>
    </v-row>

    <!--data table start-->

    <v-data-table
      :headers="headers"
      :items="assignments"
      item-key="assignmentId"
      :items-per-page="5"
      class="elevation-3 ma-10 pa-5"
      :search="search"
      disable-sort
      :loading="loading"
      ref="questionTable"
    >
    <!--Edit question area start-->


<!--Data table header end-->
<!--actions for question section start-->
    <template v-slot:[`item.submissions`]="{ item }">
        <v-icon
            small
            color="primary"
            class="mr-2"
            @click="viewSubmissions(item.assignmentId)"
        >
          mdi-pencil-outline
        </v-icon>
        View
    </template>

    <!--actions for question section end--> 
        <template v-slot:[`item.type`]="{ item }">
           <v-btn 
            x-small
            id="easy-btn"
            class="green--text"
            v-if="(item.difficulty==='Easy')" color="green lighten-4"
              >Easy
          </v-btn>
          <v-btn
            x-small
            id="medium-btn"
            class="orange--text"
            v-else-if="(item.type==='PUBLIC')" color="orange lighten-4"
              >PUBLIC
          </v-btn>
          <v-btn 
            x-small
            id="hard-btn"
            class="red--text"
            v-else color="red lighten-4"
              >PRIVATE
          </v-btn>
        
        </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
            small
            color="primary"
            class="mr-2"
            @click="editQuestion(item)"
        >
          mdi-pencil-outline
        </v-icon>
        <v-icon
            small
            color="red"
            @click="deleteQuestion(item)"
        >
          mdi-delete-outline
        </v-icon>
      </template>

    </v-data-table>

    <!--data table end-->

   </div>
   
</template>

<script>

import router from "@/router"
import api from "@/api";

export default {
  name: "index",

  data: () => ({


      search:'',
      loading:'true',

      headers: [
          {
            text: 'TITLE',
            align: 'start',
            filterable: true,
            value: 'title',
          },
          { text: 'NO OF Question', value: 'questions.length' },
          { text: 'TYPE', value: 'type' },
          { text: 'ACTIONS', value: 'actions' },
          { text: 'SUBMISSIONS', value: 'submissions' },
        ],

      assignments: [],

      editedQuestion: {
            title: '',
            points: 0,
            difficulty: '',
            description:"",
            testCases:[{}]
          },
      select: null,


        }),
    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.loading = true;
        const [status, res_data] = await api.assignment.instructor()
        this.loading = false;
        if (status.status === 200) {

        this.assignments = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async viewSubmissions(id) {
      await router.push(`assignments/${id}`)
    },

    editQuestion (item) {
        this.editedIndex = this.questions.indexOf(item)
        this.editedQuestion = Object.assign({}, item)
        this.qdialog = true
      },

    async updateQuestion(questionId,data){
      
       const[status,res_data]= await api.question.update(questionId,data)
       if(status.status===200){
        this.$vToastify.success(status.message, "Successfully Updated!")
        this.close()
        this.initialize()
       }else{
         this.$vToastify.error(res_data, "Error")
       }
    },

      deleteQuestion (item) {
        this.editedIndex = this.questions.indexOf(item)
        this.editedQuestion = Object.assign({}, item)
        this.dialogDeleteQuestion = true
      },

      async deleteConfirm (questionId) {
        const[status]= await api.question.delete(questionId)
        if(status.status===200){
          this.$vToastify.success("Successfully Deleted")
        }else{
          this.$vToastify.error("Something went wrong")
        }
        this.closeDelete()
        this.initialize()
      },

      close () {
        this.qdialog = false
        this.$nextTick(() => {
          this.editedQuestion = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDeleteQuestion = false
        this.$nextTick(() => {
          this.editedQuestion = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.questions[this.editedIndex], this.editedQuestion)
        } else {
          this.questions.push(this.editedQuestion)
        }
        this.close()
      },

    }
  }

</script>


<style scoped>
  #easy-btn, #medium-btn, #hard-btn{
    pointer-events: none;
  }
</style>
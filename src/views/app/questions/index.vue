<template>
   <div>
    <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Questions
          </h2>
          <h5> You can manage all questions in your qustion bank</h5>
        </v-flex>
        <v-flex
        style="float:right">
        <div style="float:right">
          <v-btn to="/app/question/create" class="mt-3" color="secondary"><v-icon>mdi-plus</v-icon>Create Question</v-btn>
          </div>
        </v-flex>
    </v-row>

    <!--data table start-->

    <v-data-table
      :headers="headers"
      :items="questions"
      item-key="name"
      :items-per-page="5"
      class="elevation-3 ma-10 pa-5"
      :search="search"
      disable-sort
      :loading="loading"
      ref="questionTable"
    >
    <!--Edit question area start-->

      <template v-slot:top>
        <v-dialog
          v-model="qdialog"
          max-width="1000px"
        >
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Question</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                  <h5>Question Title</h5>
                    <v-text-field
                    dense
                      v-model="editedQuestion.title"
                      placeholder="Question Title"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                  <h5>Question Description</h5>
                     <vue-editor
                     v-model="editedQuestion.description" 
                     />
                  </v-col>
                </v-row>
                  <v-row>
                  <v-col>
                    <h5>Points</h5>
                    <v-text-field
                    dense
                      v-model="editedQuestion.points"
                      placeholder="Max Points"
                      type="number" min="0" step="1" 
                      outlined
                    ></v-text-field>
                  </v-col>
                  </v-row>
                  <v-row>
                  <v-col>
                    <h5>Difficulty
                    </h5>
                   <v-select
                   dense
                    :items="dificulties"
                    v-model="editedQuestion.difficulty"
                    outlined
                  ></v-select>
                  </v-col>
                  </v-row>
                   <v-row>
                    <v-col>
                    <h5>Test Cases</h5>
                    <v-data-table
                  :headers="testCaseheaders"
                  :items="editedQuestion.testCases"
                  class="elevation-2 mb-4"
                  disable-sort
                  hide-default-footer>
                 
                   <template v-slot:[`item.actions`]="{ item }">
                    <v-icon
                      small
                      color="primary"
                      class="mr-2"
                      @click="editTestCase(item)"
                    >
                      mdi-pencil-outline
                    </v-icon>
                    <v-icon
                      small
                      color="red"
                      @click="deleteTestCase(item)"
                    >
                      mdi-delete-outline
                    </v-icon>   
                  </template>
                </v-data-table>
                    </v-col>
                  </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="updateQuestion(editedQuestion.questionId,editedQuestion)"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!--Edit question area end-->

<!--Delete question area start-->
        <v-dialog v-model="dialogDeleteQuestion" max-width="500px">
          <v-card>
            <v-card-title class="justify-center" ><v-icon x-large color="red">mdi-alert-circle-outline</v-icon></v-card-title>
            <v-spacer></v-spacer>
            <v-card-text class="text-h5">Are you sure you want to delete this item?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="primary" text @click="deleteConfirm(editedQuestion.questionId)">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!--Delete question area end-->

<!--Data table header start-->

        <v-row>
        <v-col
          cols="12"
          sm="6"
          md="8"
        >
        <v-row class="ml-1">
        <v-checkbox class="my-5"></v-checkbox>
         <v-btn color="primary lighten-5" class="ml-5 my-5" fab x-small><v-icon color="primary">mdi-archive-arrow-down-outline</v-icon></v-btn>
          <v-btn color="primary lighten-5" class="ml-2 my-5" fab x-small><v-icon color="primary">mdi-delete-outline</v-icon></v-btn>
        </v-row>
       </v-col>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
       
        <v-text-field
        dense
          v-model="search"
          label="Search..."
          outlined
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>  
        </v-col>
        </v-row>
        </template>
<!--Data table header end-->
<!--actions for question section start-->
        <template v-slot:start>
            <v-checkbox></v-checkbox>        
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
    <!--actions for question section end--> 
        <template v-slot:[`item.difficulty`]="{ item }">
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
            v-else-if="(item.difficulty==='Medium')" color="orange lighten-4"
              >Medium
          </v-btn>
          <v-btn 
            x-small
            id="hard-btn"
            class="red--text"
            v-else color="red lighten-4"
              >Hard
          </v-btn>
        
        </template>

    </v-data-table>

    <!--data table end-->

   </div>
   
</template>

<script>
import { VueEditor } from "vue2-editor";
import api from "@/api";

export default {
  name: "index",
  components: { VueEditor },
  data: () => ({
      qdialog: false,
      tdialog:false,
      dialogDeleteQuestion: false,
      search:'',
      loading:'true',
      evaluationCase:['Yes','No'],
      headers: [
          {
            text: 'TITLE',
            align: 'start',
            filterable: true,
            value: 'title',
          },
          { text: 'MAX POINTS', value: 'points' },
          { text: 'DIFFICULTY', value: 'difficulty' },
          { text: 'ACTIONS', value: 'actions' },
        ],
      testCaseheaders:[{
          text: 'INPUT',
            align: 'start',
            filterable: true,
            value: 'input',
          },
          { text: 'OUTPUT', value: 'output' },
          { text: 'IsEvaluate', value: 'evaluation' },
      ],
      questions: [],      

      editedQuestion: {
            title: '',
            points: 0,
            difficulty: '',
            description:"",
            testCases:[{}]
          },
    select: null,
    dificulties: ['Hard', 'Medium', 'Easy'],

        }),

     computed: {
      formTitle () {
        return this.teditedIndex === -1 ? 'New Test Case' : 'Edit Test Case'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDeleteQuestion (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.loading = true;
        const [status, res_data] = await api.question.instructor()
        this.loading = false;
        if (status.status === 200) {

        this.questions = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
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
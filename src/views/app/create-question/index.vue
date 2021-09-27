<template>
<div>
 <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Create New Question
          </h2>
          <h5> You are going to add a new item to your question bank!</h5>
        </v-flex>

    </v-row>

  <v-form class="rounded-lg elevation-3 ma-10 pa-5" 
    ref="questionForm"
    v-model="valid"
    lazy-validation>
    <v-row>
    <v-col
          cols="12"
          sm="6"
          md="8"
        >
      <v-row>
        <v-col>
    <h5>Title</h5>

    
    <v-text-field
    dense
    outlined
      v-model="title"
      :rules="titleRules"
      placeholder="Title of the question"
    ></v-text-field>
    </v-col>
    </v-row>
     <v-row>
        <v-col>
    <h5>Description</h5>
    <v-flex class="mb-2">
        <vue-editor v-model="description" :rules="descriptionRules"/>
    </v-flex>
    </v-col>
    </v-row>
    </v-col>

    <v-col
          cols="12"
          sm="6"
          md="3"
        >
    <!--subtitle-1>Languages (select one by one)</subtitle-1>
      <v-select
      dense
            v-model="selectLanguage"
            :items="languages"
            chips
            item-color='primary'
            multiple
            outlined
            placeholder="Select Languages"
            :rules="selectRules"
          >
          </v-select-->

    <h5>Set question dificulty</h5>
      <v-select
      dense
          :items="dificulties"
          v-model="difficulty"
          :rules="dificultyRules"
          outlined
          placeholder="Select Dificulty"
        ></v-select>
        
    </v-col>
    </v-row>

    <!--test cases adding part start-->
    <v-row>
      <v-col
         
        >
      <h5>Test Cases</h5>
      <h6>(Total points of the question will be the sum of all points of test cases)</h6>
      <v-data-table
    :headers="headers"
    :items="testCases"
    class="elevation-2 mb-4"
    disable-sort
    hide-default-footer
    ref="testcaseTable"

  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
       
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1000px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Add New
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                 <v-form class="elevation-3 ma-10 pa-5" 
                  ref="testcaseForm"
                  v-model="valid"
                  lazy-validation>
                <v-row>
                  <v-col>
                  <h5>Sample Input</h5>
                    <vue-editor 
                      v-model="editedTestCase.input"
                    />
                  </v-col>
                </v-row>
               <v-row>
                 <v-col>
                  <h5>Sample output</h5>
                    <vue-editor 
                      v-model="editedTestCase.output"
                    />
                 </v-col>
                </v-row>
                <v-row>
                 <v-col>
                  <h5>Points</h5>
                    <v-text-field
                        dense
                        v-model="editedTestCase.points"
                        placeholder="Points"
                        outlined
                        type="number" min="1" step="1"
                    ></v-text-field>
                 </v-col>
                </v-row>
                <v-row>
                 <v-col>
                  <h5>Evluation Case?</h5>
                    <v-select
                       dense
                      
                        :items="evaluationCase"
                        v-model="editedTestCase.sample"
                        outlined>
                    </v-select>
                 </v-col>
                </v-row>
                 </v-form>
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
                @click="saveTestcase"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-text class="text-h5">Are you sure you want to delete this test case?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        color="primary"
        @click="editItem(item)"
      >
        mdi-pencil-outline
      </v-icon>
      <v-icon
        small
        color="red"
        @click="deleteItem(item)"
      >
        mdi-delete-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <h5>No test cases available</h5>
    </template>
  </v-data-table>
      </v-col>
    </v-row>
    <v-btn
    color="success"
      class="mr-4"
      @click="submitQuestion"
    >
      submit
    </v-btn>
    <v-btn @click="reset">
      clear
    </v-btn>
  </v-form>
</div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import Validators from "@/utils/validators"
import api from "@/api";

export default {
  name: "index",
  components: { VueEditor },

  data: () => ({
    
      valid: true,
      title: '',
      description:'',
      difficulty:'',
      points:0,
      totalPoints:0,
      titleRules: [Validators.required()],
      nameRules: [Validators.required()],
      selectRules:[Validators.required()],
      dificultyRules:[Validators.required()],
      descriptionRules:[Validators.required()],
      selectLanguage:null,
      dificulties: ['Hard', 'Medium', 'Easy'],
      evaluationCase:[true,false],
      checkbox: false,
  
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Input',
          align: 'start',
          sortable: false,
          value: 'input',
        },
        { text: 'Output', value: 'output' },
        { text: 'Points', value: 'points' },
        { text: 'IsEvaluate', value: 'sample' },
        { text: 'Actions', value: 'actions' },
      ],
      testCases: [],
      editedIndex: -1,
      editedTestCase: {
        id:0,
        input: '',
        output: '',
        points:null,
        sample:false,
      },
      defaultTestCase: {
        id: 0,
        input: '',
        output: '',
        points:null,
        sample:false
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Test Case' : 'Edit Test Case'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    methods: {
      
      editItem (item) {
        this.editedIndex = this.testCases.indexOf(item)
        this.editedTestCase = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.testCases.indexOf(item)
        this.editedTestCase = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.testCases.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedTestCase = Object.assign({}, this.defaultTestCase)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedTestCase = Object.assign({}, this.defaultTestCase)
          this.editedIndex = -1
        })
      },

      saveTestcase () {
  
        if(this.$refs.testcaseForm.validate()){
        if (this.editedIndex > -1) {
          Object.assign(this.testCases[this.editedIndex], this.editedTestCase)
        } else {
          this.testCases.push(this.editedTestCase)
        }
        this.close()
        }
      },


     submitQuestion () {
        validquestion=this.$refs.questionForm.validate()
      },
      reset () {
        this.$refs.questionForm.reset()
        this.description='',
        this.testCases=[]
      },

      async  submitQuestion(){
        if(this.title!=='' && this.description!=='' && this.difficulty!=='' && this.testCases.length!==0){
          for(let i=0; i<this.testCases.length;i++){
            this.testCases[i].id=i+1
            this.totalPoints=+this.testCases[i].points+ +this.totalPoints
          }
            let questionData=
            {
            title:this.title,
            description:this.description,
            difficulty:this.difficulty,
            totalPoints:this.totalPoints,
            testCases:this.testCases,
            }
            console.log(questionData.totalPoints
            )
    const [status,res_data] = await api.question.create(questionData)
    console.log(status)
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Added!")
        this.$refs.questionForm.reset()
        this.description=''
        this.testCases=[]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
      }else{
        this.$vToastify.error("Please fill all the fields", "Incomplete Data")
      }
      }
    },
  
};
</script>

<style scoped>

</style>
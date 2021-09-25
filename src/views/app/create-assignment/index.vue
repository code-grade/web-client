<template>
<div>
 <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Create New Assignment
          </h2>
          <h5> You are going to add a new assignment!</h5>
        </v-flex>

    </v-row>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step
              :complete="e1 > 1"
              step="1"
          >
            Assignment Details
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="e1 > 2"
              step="2"
          >
            Add Questions
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">
            Confirm
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <AssignmentInfo/>

            <v-btn
                color="primary"
                @click="e1 = 2"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <QuestionCollection/>

            <v-btn
                color="primary"
                @click="e1 = 3"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
            ></v-card>

            <v-btn
                color="primary"
                @click="e1 = 1"
            >
              Continue
            </v-btn>

            <v-btn text>
              Cancel
            </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>



</div>
</template>


<script>
import { VueEditor } from "vue2-editor";
import Validators from "@/utils/validators"
import api from "@/api";
import AssignmentInfo from "@/views/app/create-assignment/AssignmentInfo";
import QuestionCollection from "@/views/app/create-assignment/QuestionCollection";

export default {
  name: "index",
  components: {QuestionCollection, AssignmentInfo, VueEditor },

  data: () => ({
    
      valid: true,
      e1: 1,
      title: '',
      description:'',
      difficulty:'',
      points:0,
      titleRules: [Validators.required()],
      nameRules: [Validators.required()],
      selectRules:[Validators.required()],
      dificultyRules:[Validators.required()],
      descriptionRules:[Validators.required()],
      selectLanguage:null,
      dificulties: ['Hard', 'Medium', 'Easy'],
      evaluationCase:['Yes','No'],
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
        { text: 'IsEvaluate', value: 'evaluation' },
        { text: 'Actions', value: 'actions' },
      ],
      testCases: [],
      evaluationCases:[],
      editedIndex: -1,
      editedTestCase: {
        id:0,
        input: '',
        output: '',
        evaluation:'',
      },
      defaultTestCase: {
        id: 0,
        input: '',
        output: '',
        evaluation:''
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



      async  submitQuestion(){
        if(this.title!=='' && this.description!=='' && this.difficulty!=='' && this.testCases.length!==0 && this.points!==0){
          for(let i=0; i<this.testCases.length;i++){
            this.testCases[i].id=i+1
            if(this.testCases[i].evaluation==='Yes'){
              this.evaluationCases.push(this.testCases[i])
        }
          }
            let questionData=
            {
            title:this.title,
            description:this.description,
            difficulty:this.difficulty,
            points:this.points,
            testCases:this.testCases,
            evaluationCases:this.evaluationCases
            }
    const [status,res_data] = await api.question.create(questionData)
          
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
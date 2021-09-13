<template>
<div>
 <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Create New Question
          </h2>
          <subtitle-1> You are going to add a new item to your question bank!</subtitle-1>
        </v-flex>

    </v-row>

  <v-form class="elevation-3 ma-10 pa-5" 
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
    <subtitle-1>Title</subtitle-1>

    
    <v-text-field
    outlined
      v-model="title"
      :rules="titleRules"
      placeholder="Title of the question"
      required
    ></v-text-field>
    </v-col>
    </v-row>
     <v-row>
        <v-col>
    <subtitle-1>Description</subtitle-1>
    <v-flex class="mb-2">
        <vue-editor v-model="content" />
    </v-flex>
    </v-col>
    </v-row>
    </v-col>

    <v-col
          cols="12"
          sm="6"
          md="3"
        >
    <subtitle-1>Languages (select one by one)</subtitle-1>
      <v-select
            v-model="selectLanguage"
            :items="languages"
            chips
            item-color='primary'
            multiple
            outlined
            placeholder="Select Languages"
            :rules="selectRules"
          >
          </v-select>

    <subtitle-1>Set question dificulty</subtitle-1>
      <v-select
          :items="dificulties"
          v-model="selectDificulty"
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
      <subtitle-1>Test Cases</subtitle-1>
      <v-data-table
    :headers="headers"
    :items="testcases"
    class="elevation-2 mb-4"
    disable-sort
    hide-default-footer

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
                  <subtitle-1>Test Case</subtitle-1>
                    <v-text-field
                      v-model="editedItem.name"
                      placeholder="Enter Test Case name"
                      :rules="nameRules"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                  <subtitle-1>Sample Input</subtitle-1>
                    <vue-editor 
                      v-model="editedItem.input"
                    />
                  </v-col>
                </v-row>
               <v-row>
                 <v-col>
                  <subtitle-1>Sample output</subtitle-1>
                    <vue-editor 
                      v-model="editedItem.output"
                    />
                 </v-col>
                </v-row>
                <v-row>
                  <v-col>
                  <subtitle-1>Points</subtitle-1>
                    <v-text-field
                      v-model="editedItem.points"
                      placeholder="Points"
                      outlined
                      type="number" min="0" step="1" 
                    ></v-text-field>
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
      <subtitle-1>No test cases available</subtitle-1>
    </template>
  </v-data-table>
      </v-col>
    </v-row>
    <v-btn
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

export default {
  name: "index",
  components: { VueEditor },

  data: () => ({
      valid: true,
      title: '',
      titleRules: [v => !!v || 'Title is required'],
      nameRules: [v => !!v || 'Name is required'],
      selectRules:[v => !!v || 'At least one language is required'],
      dificultyRules:[v => !!v || 'Deficulty is required'],
      selectLanguage:null,
      languages:['Python 2','Python 3','Java','Visual Basic'],
      content: "<p>Type your question description here...</p>",
      selectDificulty: null,
      dificulties: ['Hard', 'Medium', 'Easy'],
      checkbox: false,
  
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Test Case',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Input', value: 'input' },
        { text: 'Output', value: 'output' },
        { text: 'Points', value: 'points' },
        { text: 'Actions', value: 'actions' },
      ],
      testcases: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        input: 0,
        output: 0,
        points: 0,
      },
      defaultItem: {
        name: '',
        input: 0,
        output: 0,
        points: 0,
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
        this.editedIndex = this.testcases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.testcases.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.testcases.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      saveTestcase () {
  
        if(this.$refs.testcaseForm.validate()){
        if (this.editedIndex > -1) {
          Object.assign(this.testcases[this.editedIndex], this.editedItem)
        } else {
          this.testcases.push(this.editedItem)
        }
        this.close()
        }
      },


     submitQuestion () {
        validquestion=this.$refs.questionForm.validate()
      },
      reset () {
        this.$refs.questionForm.reset()
      },
    },
  
};
</script>

<style scoped>

</style>
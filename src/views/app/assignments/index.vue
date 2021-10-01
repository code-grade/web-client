<template>
  <div>
    <v-row
        class="ma-10"
    >
      <v-flex
          style="float:left">
        <h2>Assignments : {{$route.params.state}}
        </h2>
        <h5> You can manage all ({{$route.params.state}}) Assignments here</h5>
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
        item-key="name"
        :items-per-page="15"
        class="elevation-3 ma-10 pa-5"
        :search="search"
        disable-sort
        :loading="loading"
        ref="questionTable"
    >
      <!--Edit question area start-->

      <template v-slot:top>
        <!--v-dialog
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
        </v-dialog-->
        <!--Edit question area end-->

        <!--Delete question area start>
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
        <Delete question area end-->

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

      <!--actions for question section end-->
      <template v-slot:[`item.type`]="{ item }">
        <v-btn
            x-small
            id="medium-btn"
            class="orange--text"
            v-if="(item.type==='PUBLIC')" color="orange lighten-4"
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

      <template v-slot:[`item.action`]="{ item }">
        <v-btn
            small
            class="primary mr-10"
            v-if="($route.params.state==='DRAFT')"
            @click="publishAssignment(item)"
        >PUBLISH
        </v-btn>
        <v-btn
            small
            class="primary"
            v-if="($route.params.state==='CLOSED')"
            @click="manageAssignment(item)"
        >MANAGE
        </v-btn>
        <v-btn
            small
            class="primary mr-5"
            v-if="($route.params.state==='PUBLISHED')"
            @click="openAssignment(item)"
        >OPEN
        </v-btn>
        <v-btn
            small
            class="primary"
            v-if="($route.params.state==='PUBLISHED')"
            @click="manageAssignment(item)"
        >VIEW
        </v-btn>
        <v-btn
            small
            class="primary mr-5"
            v-if="($route.params.state==='OPEN')"
            @click="closeAssignment(item)"
        >CLOSE
        </v-btn>
        <v-btn
            small
            class="primary"
            v-if="($route.params.state==='CLOSED')"
            @click="finalizeAssignment(item)"
        >FINALIZE
        </v-btn>

      </template>

    </v-data-table>

    <!--data table end-->

  </div>

</template>

<script>
import { VueEditor } from "vue2-editor";
import api from "@/api";
import router from "@/router";

export default {
  name: "index",
  components: { VueEditor },
  data: () => ({
    dialogDeleteQuestion: false,
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
      { text: 'START DATE', value: 'schedule.openTime' },
      { text: 'DUE DATE', value: 'schedule.closeTime' },
      { text: 'ACTION', value: 'action' },
    ],
    assignments: [],

  }),

  created () {
    this.initialize()
  },

  watch: {
    // will fire on route changes
    //'$route.params.id': function(val, oldVal){ // Same
    '$route.path': function(){
      this.initialize();
    }
  },

    methods: {
      async initialize () {
        console.log(this.$route.params.state)
        this.loading = true;
        const [status, res_data] = await api.assignment.instructor(this.$route.params.state)
        console.log(res_data)
        this.loading = false;
        if (status.status === 200) {
        this.assignments = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

    async manageAssignment(item){
      //console.log(item.assignmentId)
      //var assignmentId=item.assignmentId;
      await router.push({
            name:'Manage Assignments',
            params:{
              id:item.assignmentId
            }
          }
      )
    },

    async publishAssignment(item){
      const[status1,res_data1]= await api.assignment.change(item.assignmentId,'PUBLISHED')
      if(status1.status==200){
        this.$vToastify.success("Assignment Published Successfully! Students can view the assignment")
        this.initialize()
      }else{
        this.$vToastify.error("Somthing went wrong with the publish")
      }
    },

    async draftAssignment(item){
      const[status2,res_data2]= await api.assignment.change(item.assignmentId,'DRAFT')
      if(status2.status==200){
        this.$vToastify.success("Assignment Send to the Drafts!")
        this.initialize()
      }else{
        this.$vToastify.error("Somthing went wrong with the send to draft")
      }
    },
    async finalizeAssignment(item){
      const[status2,res_data2]= await api.assignment.change(item.assignmentId,'FINALIZED')
      if(status2.status==200){
        this.$vToastify.success("Assignment Send to the Drafts!")
        this.initialize()
      }else{
        this.$vToastify.error("Somthing went wrong with the send to draft")
      }
    },

    async openAssignment(item){
      const[status3,res_data3]= await api.assignment.change(item.assignmentId,'OPEN')
      if(status3.status==200){
        this.$vToastify.success("Assignment is open now!")
        this.initialize()
      }else{
        this.$vToastify.error("Somthing went wrong with opening the assignment")
      }
    },

    async closeAssignment(item){
      const[status4,res_data3]= await api.assignment.change(item.assignmentId,'CLOSED')
      if(status4.status==200){
        this.$vToastify.success("Assignment closed successfully!")
        this.initialize()
      }else{
        this.$vToastify.error("Somthing went wrong with closing assignment")
      }
    },

    editQuestion (item) {
      this.editedIndex = this.questions.indexOf(item)
      this.editedQuestion = Object.assign({}, item)
      this.qdialog = true
    },


  }
}

</script>


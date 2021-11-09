<template>
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
                placeholder="Title of the assignment"
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


        <h5>Set question privacy</h5>
        <v-select
            dense
            :items="types"
            v-model="type"
            :rules="dificultyRules"
            outlined
            placeholder="Select Type"
        ></v-select>


        <v-checkbox
            v-model="autoOpenClose"
            :label="`Auto Open/Close`"
        ></v-checkbox>
        <div v-if="autoOpenClose">
          <v-datetime-picker label="Select start Datetime" class="secondary" v-model="datetime"> </v-datetime-picker>
          <v-datetime-picker label="Select end Datetime" class="secondary" v-model="datetime"> </v-datetime-picker>
        </div>

      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import {VueEditor} from "vue2-editor";
import Validators from "@/utils/validators";

export default {
  name: "AssignmentInfo",
  components: { VueEditor },
  data: () => ({
    valid: true,
    title: '',
    description:'',
    type:'PUBLIC',
    points:0,
    autoOpenClose:false,
    titleRules: [Validators.required()],
    nameRules: [Validators.required()],
    selectRules:[Validators.required()],
    dificultyRules:[Validators.required()],
    descriptionRules:[Validators.required()],
    selectLanguage:null,
    types: ['PUBLIC', 'PRIVATE'],
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


}
</script>

<style scoped>

</style>

<template>
<v-container >
  <v-data-table
    :headers="headers"
    :items="submissions"
    class="elevation-1"
    disable-sort
    hide-default-footer
  >
    <template v-slot:[`item.view`]="{ item }">
    <v-dialog
        v-model="dialog"
        width="500"
        :retain-focus="false"
    >
      <template  v-slot:activator="{ on, attrs }">
        <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
        >
          View Submissions
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ item.sourceCode.language }}
        </v-card-title>

        <v-card-text>
          <MonacoEditor class="editor"  :value="item.sourceCode.source" language="python" />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
       
        </v-card-actions>
      </v-card>
    </v-dialog>
    </template>
  </v-data-table>

  <v-container>
    <v-card v-if="this.view==false">
      <v-card-title>
    Click on a submission to view
      </v-card-title>
    </v-card>

    <v-card v-if="this.view==true">
      <v-card-title>
    Your Submission
      </v-card-title>
    </v-card>

  </v-container>
</v-container>
</template>

<script>
  import api from "@/api";
  import MonacoEditor from "vue-monaco";
  export default {
    data: () => ({
      view:false,
      dialog: false,
      headers: [
        {
          text: 'SUBMISSION',
          align: 'center',
          value: 'submissionId',
        },
        { text: 'STATUS', value: 'result.evaluated',align: 'center', },
        { text: 'SCORE', value: 'result.totalPoints',align: 'center', },
        { text: 'VIEW', value: 'view',align: 'center',},
      ],
      submissions: [],
    }),
    components:{MonacoEditor },
   mounted() {
      this.initialize()
    },

    methods: {
      async initialize () {
        this.loading = true;
        const [status, res_data] = await api.submission.questionSubmissions(this.$route.params.assignmentId,this.$route.params.questionId)
        console.log(res_data)
        this.loading = false;
        if (status.status === 200) {

          this.submissions = [...res_data]
        } else {
          this.$vToastify.error(res_data, "Done")
        }
      },

      viewSubmission(item){
        this.view=true;
      }
    }
  }
</script>
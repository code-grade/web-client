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
      <v-btn
        small
        color="primary"
        class="mr-2"
        @click="viewSubmission(item)"
      >
        view submission
      </v-btn>
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
  export default {
    data: () => ({
      view:false,
      headers: [
        {
          text: 'SUBMISSION',
          align: 'center',
          value: 'submissionId',
        },
        { text: 'STATUS', value: 'status',align: 'center', },
        { text: 'SCORE', value: 'score',align: 'center', },
        { text: 'VIEW', value: 'view',align: 'center',},
      ],
      submissions: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.submissions = [
          {
            submissionId: 1,
            status: 'wrong',
            score: 6,
           },
                    {
            submissionId: 1,
            status: 'wrong',
            score: 8,
           },
                    {
            submissionId: 1,
            status: 'accepted',
            score: 10,
           },
        ]
      },

      viewSubmission(item){
        this.view=true;
      }
    }
  }
</script>
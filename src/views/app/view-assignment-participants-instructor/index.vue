<template>
  <div>
    <v-row
        class="ma-10"
    >
      <v-flex
          style="float:left">
        <h2>Submissions
        </h2>
        <h5> {{ title }}</h5>
      </v-flex>

    </v-row>

    <!--data table start-->

    <v-data-table
        :headers="headers"
        :items="participants"
        item-key="userId"
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
            @click="viewSubmissions(item.userId)"
        >
          mdi-pencil-outline
        </v-icon>
        View Submissions
      </template>






    </v-data-table>

    <!--data table end-->

  </div>

</template>

<script>

import api from "@/api";
import router from "@/router";

export default {
  name: "index",

  data: () => ({
    search:'',
    loading:'true',
    assignmentId:'',
    title:"",
    headers: [
      { text: 'NAME', value: 'username' },
      { text: 'EMAIL', value: 'email.email' },
      { text: 'SUBMISSIONS', value: 'submissions' },
    ],
    participants:[],
  }),
  created () {
    this.fetchAssignment()
    this.fetchParticipants()
  },

  methods: {
    async fetchAssignment () {
      this.loading = true;
      this.assignmentId = this.$route.params.id;
      const [status, res_data] = await api.assignment.instructorGetAssignmentById(this.assignmentId)
      this.title =res_data.title
      this.loading = false;
      if (status.status === 200) {
        this.assignments = [...res_data]
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    async fetchParticipants () {
      this.loading = true;
      const [status, res_data] = await api.assignment.instructorGetParticipants(this.assignmentId)
      this.loading = false;
      if (status.status === 200) {
        this.participants = [...res_data]
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    async viewSubmissions(stId) {
      await router.push(`/app/assignments/${this.assignmentId}/${stId}`)
    },
  }
}

</script>


<style scoped>
#easy-btn, #medium-btn, #hard-btn{
  pointer-events: none;
}
</style>
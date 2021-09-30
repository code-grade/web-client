<template>
    <div>
        <v-row class="ma-10">
            <v-flex
            style="float:left">
            <h2>Public Assignments
            </h2>
            <h5> Explore more knowledge by solving more problems!</h5>
            </v-flex>
        </v-row>
         <v-data-table
            :headers="headers"
            :items="publicAssignments"
            class="elevation-3 ma-10 pa-5"
            :items-per-page="15"
            disable-sort
        >
   <template v-slot:[`item.description`]="{ item }">
      <div v-html='item.description'></div>
    </template>
    <template v-slot:[`item.join`]="{ item }">
      <v-btn
        small
        class="mr-2 primary"
        @click="addMe(item)"
      > Join
      </v-btn>
    </template>
  </v-data-table>
    </div>
</template>

<script>
import api from "@/api";
export default {
    name:'index',
    data: () => ({
      headers: [
        {
          text: 'ASSIGNMENT',
          align: 'start',
          value: 'title',
        },
        { text: 'DESCRIPTION', value: 'description' },
        { text: 'JOIN', value: 'join'},
      ],
      publicAssignments: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const[status,res_data] = await api.assignment.getPublished('PUBLISHED')
        if(status.status==200){
        this.publicAssignments= res_data
        }
      },

      async addMe(item){
        const[status1] = await api.assignment.participate.student(item.assignmentId)
        if(status1.status==200){
          this.$vToastify.success("Successfully Enrolled to the Assignment!")
        }

      }
    },
}
</script>
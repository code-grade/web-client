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
            items-per-page="5"
            disable-sort
        >
   
    <template v-slot:[`item.enroll`]="{ item }">
      <v-switch
        small
        class="mr-2"
        @change:prepend="enrollMe(item)"
      >
      </v-switch>
    </template>
  </v-data-table>
    </div>
</template>

<script>
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
        { text: 'ENROLL', value: 'enroll'},
      ],
      publicAssignments: [],
    }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.publicAssignments = [
          {
            assignmentId:1,
            title: 'Public Assignment 1',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:2,
            title: 'Public Assignment 2',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:3, 
            title: 'Public Assignment 3',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:4,
            title: 'Public Assignment 4',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
         {
            assignmentId:5,
            title: 'Public Assignment 5',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:6,
            title: 'Public Assignment 6',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:7,
            title: 'Public Assignment 7',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
          {
            assignmentId:8,
            title: 'Public Assignment 8',
            description: 'This assignment for the students who are want to improve their knowledge in oop',
          },
        ]
      },

      enrollMe(item){
          this.$vToastify.success("Successfully Enrolled to the Assignment!")
      }
    },
}
</script>
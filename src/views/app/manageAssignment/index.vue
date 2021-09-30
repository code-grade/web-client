<template>
    <div>
        <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>{{assignment.title}}
          </h2>
          <div v-html='assignment.description'></div>
            <p>Start Time:{{assignment.openTime}}</p>
              <p>Due Time:{{assignment.closeTime}}</p>
        <h5>
            Note: The assignment will automaticaly close after the time is due!
        </h5>
        </v-flex>
    </v-row>
     <v-row class="mb-10">
        <v-col
        cols="8"
        sm="6"
        md="6">
    <v-row  v-for="i in assignment.questions.length" :key="i">
     <v-col
     >
        <v-card
          class="pa-1 ml-10"
          outlined
          tile
          elevation="5"
        >
          <v-card-title>
              {{assignment.questions[i-1].title}}
          </v-card-title>
          <v-card-subtitle class="pt-0 pb-0">
              Max Score: {{assignment.questions[i-1].totalPoints}}
              </v-card-subtitle>
          <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Easy')" class="green--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
        <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Medium')" class="orange--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
            <v-card-subtitle  v-if="(assignment.questions[i-1].difficulty=='Hard')" class="red--text pt-0">
            {{assignment.questions[i-1].difficulty}}
            </v-card-subtitle>
    </v-card>
     </v-col>
    </v-row>
</v-col>
<v-col>
  <p class="ml-5">Participants List</p>
  <v-simple-table dense class="mr-10 ml-5">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            USER NAME
          </th>
          <th class="text-left">
            FIRST NAME
          </th>
          <th class="text-left">
            LAST NAME
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in participants"
          :key="item.username"
        >
          <td>{{ item.username }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-col>
    </v-row>
    </div>
</template>

<script>
import api from "@/api";

export default {
    name:'index',
    props:['assignmentId'],

    data:()=>({
        assignment:[],
        participants:[],
    }),

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        const [status, res_data] = await api.assignment.get(this.$route.params.assignmentId)
        if (status.status === 200) {
            this.assignment=res_data;

      } else {
        this.$vToastify.error(res_data, "Done")
      }

      const [status1, res_data1] = await api.assignment.participants(this.$route.params.assignmentId)
        if (status1.status === 200) {
            this.participants=res_data1;

      } else {
        this.$vToastify.error(res_data1, "Done")
      }
    },

    }

}
</script>
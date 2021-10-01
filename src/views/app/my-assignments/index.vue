<template>
  <div>
    <v-row
        class="ma-10"
    >
      <v-flex
          style="float:left">
        <h2>Assignments : {{$route.params.state}}
        </h2>
        <h5> You can see all ({{$route.params.state}}) Assignments here</h5>
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
    >

      <template v-slot:top>
        
        <!--Data table header start-->

        <v-row>
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

    </v-data-table>

    <!--data table end-->

  </div>

</template>

<script>
import api from "@/api";

export default {
  name: "index",
  data: () => ({
    search:'',
    loading:'true',

    headers: [
      {
        text: 'TITLE',
        align: 'start',
        filterable: true,
        value: 'title',
      },
      { text: 'DESCRIPTION', value: 'description' },
      { text: 'Final Grade', value: 'final' },
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
        this.loading = true;
        const [status, res_data] = await api.assignment.participate.all()
        console.log(res_data)
        this.loading = false;
        if (status.status === 200) {
        const assignmentsList = [...res_data].filter(a=>a.enrolled=true)
        this.assignments =assignmentsList.filter(a=>a.state=this.$route.params.state)
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

   
  }
}

</script>


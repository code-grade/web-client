<template>
  <div>
    <v-row
        class="ma-10"
    >
      <v-flex
          style="float:left">
        <h2>Assignments : {{ $route.params.state }}
        </h2>
        <h5> You can see all ({{ $route.params.state }}) Assignments here</h5>
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
      <template v-slot:[`item.description`]={item}>
        <div v-html='item.description'></div>
      </template>

      <template v-slot:[`item.action`]={item}>
        <v-btn x-small v-if="(item.state=='OPEN')" class="primary"
               :to="{name:'View Assignment', params:{assignmentId:item.assignmentId}}">
          Atempt Assignment
        </v-btn>
        <v-btn x-small v-if="(item.state=='PUBLISHED')" class="primary"
               @click="unenrollMe(item)">
          UnEnroll
        </v-btn>
        <v-btn x-small v-if="(item.state=='FINALIZED')" class="primary"
               :to="{name: 'View Assignment Result', params: {assignmentId: item.assignmentId}}"
        >
          View Grade
        </v-btn>
      </template>

    </v-data-table>

    <!--data table end-->

  </div>

</template>

<script>
import api from "@/api";

export default {
  name: "index",
  data: () => ({
    search: '',
    loading: 'true',

    headers: [
      {text: 'Title', align: 'start', filterable: true, value: 'title'},
      {text: 'Description', value: 'description'},
      {text: 'Actions', value: 'action'}
    ],
    assignments: [],

  }),

  created() {
    this.initialize()
  },

  watch: {
    // will fire on route changes
    //'$route.params.id': function(val, oldVal){ // Same
    '$route.path': function () {
      this.initialize();
    }
  },

  methods: {
    async initialize() {
      this.loading = true;
      const [status, res_data] = await api.assignment.participate.all()
      //console.log('HERE', res_data)
      this.loading = false;
      if (status.status === 200) {
        // const assignmentsList = [...res_data].filter(a=>a.enrolled=true)
        this.assignments = res_data.filter(a => (a.state === this.$route.params.state))
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

    async unenrollMe(item) {
      const [status1] = await api.assignment.participate.unenroll(item.assignmentId)
      if (status1.status == 200) {
        this.$vToastify.success("Successfully leave from the Assignment!")
        this.initialize()
      }
    }


  }
}

</script>


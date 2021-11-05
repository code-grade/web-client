<template>
<v-container fluid>
    <v-card
    elevation="2"
    tile
    class="mb-10"
    >
    
    <v-card-title>
        Upcoming Events
    </v-card-title>
    <v-list five-line>
      <p class="ml-5" id="p">Assignments to open</p>
      <template v-for="(event, index) in published">

        <v-divider
          :key="index"
          :inset="event.inset"
          class="ma-2"
        ></v-divider>

        <v-list-item
          :key="event.title"
        >
          <v-list-item-avatar>
            <v-icon color="red">mdi-note-text</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="event.title"></v-list-item-title>
            <v-list-item-subtitle v-html="event.description"></v-list-item-subtitle>
            <p id="p" class="mb-1">Opens @ {{event.schedule.openTime}}</p>
            <p id="p">Closes @ {{event.schedule.closeTime}}</p>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <v-list five-line >
      <p class="ml-5" id="p">Opened Assignments</p>
      <template v-for="(event, index) in opened">

        <v-divider
          :key="index"
          :inset="event.inset"
        ></v-divider>
        
        <v-list-item
          :key="event.title"
        >
          <v-list-item-avatar>
            <v-icon color="red">mdi-note-text</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="event.title"></v-list-item-title>
            <v-list-item-subtitle v-html="event.description"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="event.schedule.openTime"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="event.schedule.closeTime"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    </v-card>

    <v-row
        :align="align"
        no-gutters
        class="mb-10"
      >
        <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>Draft Assignments  <h1 class="ml-3 primary--text">{{draft.length}}</h1></v-card-title>
          </v-card>
        </v-col>
        <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>Published Assignments  <h1 class="ml-3 primary--text">{{published.length}}</h1></v-card-title>
          </v-card>
        </v-col>
        <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>Opened Assignments  <h1 class="ml-3 primary--text">{{opened.length}}</h1></v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <v-row
        :align="align"
        no-gutters
        class="mb-10"
      >
        <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>closed Assignments  <h1 class="ml-3 primary--text">{{closed.length}}</h1></v-card-title>
          </v-card>
        </v-col>
        <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>Finalized Assignments  <h1 class="ml-3 primary--text">{{finalized.length}}</h1></v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <v-row
      :align="align"
        no-gutters
        class="mb-10">
         <v-col
        sm="5"
        md="4"
        >
          <v-card
            class="pa-2 mr-5"
            outlined
            elevation="2"
            tile
          >
            <v-card-title>Questions in Bank  <h1 class="ml-3 primary--text">{{questions.length}}</h1></v-card-title>
          </v-card>
        </v-col>
      </v-row>
</v-container>
</template>

<script>
import api from "@/api";

export default {
    name:"Instructor",
    data: () => ({
      published:[],
      opened:[],
      draft:[],
      closed:[],
      finalized:[],
      questions:[],
    }),
    created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.loading = true;
      const [status1, res_data1] = await api.assignment.instructor('PUBLISHED')
      const [status2, res_data2] = await api.assignment.instructor('OPEN')
      const [status3, res_data3] = await api.assignment.instructor('DRAFT')
      const [status4, res_data4] = await api.assignment.instructor('CLOSED')
      const [status5, res_data5] = await api.assignment.instructor('FINALIZED')
      const [status6, res_data6] = await api.question.instructor()
      //console.log(res_data)
      this.loading = false;
      if (status1.status === 200  && status2.status === 200 && status3.status === 200 && status4.status === 200 && status5.status === 200 && status6.status === 200) {

        this.published = [...res_data1]
        this.opened = [...res_data2]
        this.draft = [...res_data3]
        this.closed = [...res_data4]
        this.finalized = [...res_data5]
        this.questions = [...res_data6]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
  },
}
</script>

<style scoped>
  #p{
    color: grey;
  }
</style>
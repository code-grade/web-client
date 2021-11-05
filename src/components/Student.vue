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
      <p class="ml-5" id="p">Enrolled Assignments</p>
      <template v-for="(event, index) in enrolled">

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
      <p class="ml-5" id="p">Ongoing Assignments</p>
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
</v-container>
</template>

<script>
import api from "@/api";

export default {
    name:"Student",
    data: () => ({
      enrolled:[],
      opened:[],
      state1:'PUBLISHED',
      state2:'OPEN'
    }),
    created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.loading = true;
      const [status, res_data] = await api.assignment.participate.all()
      //console.log('HERE', res_data)
      this.loading = false;
      if (status.status === 200) {
        // const assignmentsList = [...res_data].filter(a=>a.enrolled=true)
        this.enrolled = res_data.filter(a => (a.state === this.state1))
        this.opened = res_data.filter(a => (a.state === this.state2))
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
<template>
    <div>
        <v-row class="ma-10">
            <v-flex name="v-flex"
            style="float:left">
            <h2>My Assignments
            </h2>
            <h5> Here shows all the assigments of you</h5>
            </v-flex>
        </v-row>

        <v-container>
      <v-row align="center">
    <v-item-group
      v-model="window"
      class="shrink mr-6"
      mandatory
      tag="v-flex"
    >
      <v-item
        v-for="n in length"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <div>
          <v-btn v-if="(n==1)"
            :input-value="active"
            @click="toggle"
            plain
          >
          ONGOING
          </v-btn>
          <v-btn v-if="(n==2)"
            :input-value="active"
            @click="toggle"
            plain
          >
          CLOSED
          </v-btn>
          <v-btn v-if="(n==3)"
            :input-value="active"
            @click="toggle"
            plain
          >
          FINALIZED
          </v-btn>
        </div>
      </v-item>
    </v-item-group>

    <v-col>
      <v-window 
        v-model="window"
        class="elevation-1"
        vertical
      >
        <v-window-item
          v-for="n in length"
          :key="n"
        >
          <v-card flat v-if="(n==1)">
             <v-row no-gutters>
      <v-col
        v-for="i in ongoing.length"
        :key="i"
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2 ma-10"
          outlined
          tile
          elevation="5"
          hover
        >
          <v-img
          :src="require('../../../assets/card-background.jpg')">
          <v-card-title>{{ongoing[i-1].title}}</v-card-title>
          <v-card-subtitle>Open Date : {{ongoing[i-1].openTime}}</v-card-subtitle>
          <v-card-subtitle>Due Date : {{ongoing[i-1].closeTime}}</v-card-subtitle>
          <v-btn :to="{name:'View Assignment', params:{assignmentId:ongoing[i-1].assignmentId}}" outlined color="primary" class="ma-5">VIEW</v-btn>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
          </v-card>

          <v-card flat v-if="(n==2)">
             <v-row no-gutters>
      <v-col
        v-for="i in past.length"
        :key="i"
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2 ma-10"
          outlined
          tile
          elevation="5"
          hover
        >
        <v-img
          :src="require('../../../assets/card-background.jpg')">
          <v-card-title>{{past[i-1].title}}</v-card-title>
          <v-btn :to="{name:'View Assignment', params:{assignmentId:past[i-1].assignmentId}}" outlined color="primary" class="ma-5">VIEW</v-btn>
          <v-card-subtitle>Assignment is Due.You cannot edit this submission...</v-card-subtitle>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
          </v-card>

          <v-card flat v-if="(n==3)">
             <v-row no-gutters>
      <v-col
        v-for="i in finalized.length"
        :key="i"
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2 ma-10"
          outlined
          tile
          elevation="5"
          hover
        >
        <v-img
          :src="require('../../../assets/card-background.jpg')">
          <v-card-title>{{finalized[i-1].title}}</v-card-title>
          <v-card-subtitle>Final Grade : {{finalized[i-1].finalGrade}}</v-card-subtitle>
          <v-btn :to="{name:'View Assignment Result', params:{assignmentId:finalized[i-1].assignmentId}}" outlined color="primary" class="ma-5">VIEW RESULT</v-btn>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
        </v-container>
  
    </div>
    
</template>

<script>
import api from '@/api'
export default {
    name:"index",
    data: () => ({
    length: 3,
    window: 0,
 
    finalized:[],
    ongoing:[],
    past:[],
    }),

    created(){
      this.initialize()
    },

    methods:{
      async initialize(){
        const[status_ongoing,res_data_ongoing]=await api.assignment.getPublished('OPEN')
        console.log(res_data_ongoing)
        if(status_ongoing.status==200){
          this.ongoing=res_data_ongoing
        }
        const[status_past,res_data_past]= await api.assignment.getPublished('CLOSED')
        if(status_past.status==200){
          this.past=res_data_past
        }
        const[status_finalized,res_data_finalized]= await api.assignment.getPublished('FINALIZED')
        console.log(res_data_finalized)
        if(status_finalized.status==200){
          this.finalized=res_data_finalized
        }
      },
    }
    
  }
</script>
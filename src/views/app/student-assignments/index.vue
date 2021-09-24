<template v-slot:`assignments`>
    <div>
        <v-row class="ma-10">
            <v-flex
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
          <!--v-btn v-if="(n==1)"
            :input-value="active"
            @click="toggle"
            plain
          >
          UPCOMING
          </v-btn-->
          <v-btn v-if="(n==2)"
            :input-value="active"
            @click="toggle"
            plain
          >
          ONGOING
          </v-btn>
          <v-btn v-if="(n==3)"
            :input-value="active"
            @click="toggle"
            plain
          >
          PAST
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
        :items="assignments" 
          v-for="n in length"
          :key="n"
        >
          <!--v-card flat v-if="(n==1)">
             <v-row no-gutters>
      <v-col
        v-for="i in upcoming.length"
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
          <v-card-title>{{upcoming[i-1].name}}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
          </v-card-->

          <v-card flat v-if="(n==2)">
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
          <v-card-title>{{ongoing[i-1].name}}</v-card-title>
          <v-btn :to="{name:'View Assignment', params:{id:ongoing[i-1].id}}" outlined color="primary" class="ma-5">VIEW</v-btn>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
          </v-card>

          <v-card flat v-if="(n==3)">
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
          <v-card-title>{{past[i-1].name}}</v-card-title>
          <v-btn :to="{name:'View Assignment', params:{id:past[i-1].id}}" outlined color="primary" class="ma-5">VIEW</v-btn>
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
export default {
    name:"index",
    data: () => ({
    length: 3,
    window: 1,
 
    upcoming:[
        {id:1,name:"assignment 1"},
        {id:2,name:"assignment 2"},
        {id:3,name:"assignment 3"},
        {id:4,name:"assignment 4"},
        {id:5,name:"assignment 5"},
            ],
    ongoing:[
        {id:1,name:"assignment 1"},
        {id:2,name:"assignment 2"},
        {id:3,name:"assignment 3"},
        {id:4,name:"assignment 4"},
    ],
    past:[
        {id:1,name:"assignment 1"},
        {id:2,name:"assignment 2"},
        {id:3,name:"assignment 3"},
        {id:4,name:"assignment 4"},
        {id:5,name:"assignment 5"},
        {id:6,name:"assignment 6"},
        {id:7,name:"assignment 7"},
        {id:8,name:"assignment 8"},
    ],
    }),
    
  }
</script>
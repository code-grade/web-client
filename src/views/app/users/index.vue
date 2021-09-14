<template>
   <div>
    <v-row
    class="ma-10"
    >
        <v-flex 
        style="float:left">
          <h2>Users
          </h2>
          <subtitle-1> You can manage all users in institute</subtitle-1>
        </v-flex>
    </v-row>

    <!--data table start-->

    <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      :items-per-page="5"
      class="elevation-3 ma-10 pa-5"
      :search="search"
      disable-sort
    >

<!--Data table header start-->
    <template v-slot:top>
        <v-row>
        <v-col
          cols="12"
          sm="6"
          md="8"
        >
        <v-row class="ml-1">
        <v-checkbox class="my-5"></v-checkbox>
         <v-btn color="primary lighten-5" class="ml-5 my-5" fab x-small><v-icon color="primary">mdi-archive-arrow-down-outline</v-icon></v-btn>
          <v-btn color="primary lighten-5" class="ml-2 my-5" fab x-small><v-icon color="primary">mdi-delete-outline</v-icon></v-btn>
        </v-row>
       </v-col>
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
        ></v-text-field>  </v-col>
        </v-row>
    </template>
<!--Data table header end-->
<!--actions for question section start-->
        <template v-slot:start>
            <v-checkbox></v-checkbox>        
    </template>
        <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        color="primary"
        class="mr-2"
        @click="editQuestion(item)"
      >
        mdi-pencil-outline
      </v-icon>
      <v-icon
        small
        color="red"
        @click="deleteQuestion(item)"
      >
        mdi-delete-outline
      </v-icon>
        </template>
 <!--actions for question section end-->    
 <template v-slot:[`item.isverified`]="{ item }">
           <v-btn 
            x-small
            id="yes-btn"
            class="green--text"
            v-if="(item.isverified==true)" color="green lighten-4"
              >YES
          </v-btn>
          <v-btn 
            x-small
            id="no-btn"
            class="red--text"
            v-if="(item.isverified==false)" color="red lighten-4"
              >NO
          </v-btn>
 </template>
 <template v-slot:[`item.isenabled`]="{ item }">
     <v-switch
                v-model="item.isenabled"
                label="enable"
                color="success"
              ></v-switch>
 </template>
    </v-data-table>

    <!--data table end-->

   </div>
   
</template>

<script>

export default {
  name: "index",
  data: () => ({
      search:'',
      headers: [
          {
            text: 'USER NAME',
            align: 'start',
            filterable: true,
            value: 'username',
          },
          { text: 'FIRST NAME', value: 'f_name' },
          { text: 'LAST NAME', value: 'l_name' },
          { text: 'EMAIL', value: 'email' },
          { text: 'IS VERIFIED', value: 'isverified' },
        { text: 'ACTIONS', value: 'isenabled' },
        ],
      users: [],      
        }),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'XY',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:false,
              isenabled:false
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:false
          },
         {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:false
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:true
          },
          {
              username:'00001A',
              f_name:'ABC',
              l_name:'Perera',
              email:'abc@gmail.com',
              isverified:true,
              isenabled:false
          },
        ]
      },
    },
  }

</script>


<style scoped>
  #yes-btn, #no-btn{
    pointer-events: none;
  }
</style>
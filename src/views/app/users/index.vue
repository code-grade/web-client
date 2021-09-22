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

    <UserTable />

    <!--data table end-->

   </div>
   
</template>

<script>

import api from "@/api";
import UserTable from "@/components/UserTable";

export default {
  name: "index",
  components: {UserTable},





  }

</script>


<style scoped>
  #yes-btn, #no-btn{
    pointer-events: none;
  }
</style>
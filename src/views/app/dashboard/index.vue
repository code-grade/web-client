<template>
  <v-container class="pa-10">
    <v-row class="ml-1">
      <v-avatar color="indigo" class="mr-5">
      <v-icon dark>
        mdi-account-circle
      </v-icon>
    </v-avatar>
    <h1>Hello, {{userName}}</h1>
    </v-row>
    <v-row class="mt-10">
    <Student v-if="(user_role==='STUDENT')"/>
    <Instructor v-if="(user_role==='INSTRUCTOR')"/>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/api";
import Student from "@/components/Student";
import Instructor from "@/components/Instructor";

export default {
  name:"index",
  components: {Student,Instructor},
  data: () => ({
    userName:"",
    user_role:"",
    loading: false,
    fetchingDataLoader:true,

  }),
  created () {
    this.initialize()
  },
  methods:{
    async initialize () {
      this.fetchingDataLoader = true;
      const [status, res_data] = await api.user.getDetails()
      //console.log(res_data)

      this.fetchingDataLoader = false;
      if (status.status === 200) {
        const {username,role} = res_data
        this.userName=username;
        this.user_role = role
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
  }}

</script>

<style scoped>

</style>
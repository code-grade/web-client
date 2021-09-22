<template>

  <v-data-table
      :headers="headers"
      :items="users"
      item-key="name"
      :items-per-page="5"
      class="elevation-3 ma-10 pa-5"
      :search="search"
      disable-sort
      :loading="loading"

      loading-text="Fetching Users"
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
    <template v-slot:[`item.isVerified`]="{ item }">
      <v-btn
          x-small
          id="yes-btn"
          class="green--text"
          v-if="(item.isVerified==true)" color="green lighten-4"
      >YES
      </v-btn>
      <v-btn
          x-small
          id="no-btn"
          class="red--text"
          v-if="(item.isVerified==false)" color="red lighten-4"
      >NO
      </v-btn>
    </template>
    <template v-slot:[`item.isEnabled`]="{ item }">
      <v-switch
          v-model="item.isEnabled"
          label="enable"
          color="success"
          @change="toggleEnableUser(item.userId,item.isEnabled)"
      ></v-switch>
    </template>
  </v-data-table>
</template>

<script>
import api from "@/api";

export default {
  name: "UserTable",
  data: () => ({
    search:'',
    loading:'true',
    headers: [
      {
        text: 'USER NAME',
        align: 'start',
        filterable: true,
        value: 'username',
      },
      { text: 'FIRST NAME', value: 'firstName' },
      { text: 'LAST NAME', value: 'lastName' },
      { text: 'EMAIL', value: 'email.email' },
      { text: 'IS VERIFIED', value: 'email.verified' },
      { text: 'ACTIONS', value: 'isEnabled' },
    ],
    users: [],
  }),

  created () {
    this.initialize()
  },

  methods: {
    async initialize () {
      this.loading = true;
      const [status, res_data] = await api.user.all()
      console.log(res_data)
      this.loading = false;
      if (status.status === 200) {

        this.users = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async toggleEnableUser(userId, isEnabled) {
      // this.loading = true;

      const [status, res_data] = await api.user.update.enable(userId, isEnabled)
      // // this.loading = false;
      if (status.status === 200) {

        this.$vToastify.success(status.message, "Info")
        // this.users = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    }

  },
}
</script>

<style scoped>

</style>
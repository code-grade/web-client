<template>
  <v-container
      id="user-profile"
      fluid
  >
    <div
    >
      <h2> Edit Profile
      </h2>
      <subtitle-1> Complete your profile</subtitle-1>
    </div>
    <v-row justify="center">
      <v-col
          cols="12"
          md="8"
      >
        <v-card class="pa-5">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">
                    User Name

                  </div>

                </v-col>
                <v-col
                    cols="8"


                >
                  <v-text-field
                      label="User name (disabled)"
                      disabled
                  />
                </v-col>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">
                    First Name

                  </div>

                </v-col>

                <v-col
                    cols="8"

                >
                  <v-text-field
                      label="First Name"
                      color="secondary darken-2"
                  />
                </v-col>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">
                    User Name

                  </div>

                </v-col>

                <v-col
                    cols="8"

                >
                  <v-text-field
                      label="Last Name"
                      color="secondary darken-2"
                  />
                </v-col>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">
                    Email

                  </div>

                </v-col>

                <v-col cols="8"
                       >
                  <v-text-field
                      label="Email"
                      color="secondary darken-2"
                  />
                </v-col>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">


                  </div>

                </v-col>

                <v-col
                    cols="8"
                    class="text-left"
                >
                  <v-btn
                      color="primary"
                      class="mt-0"
                  >
                    Save Changes
                  </v-btn>
                </v-col>
                <v-col
                    cols="4"


                >
                  <div class="font-weight-medium pt-5">


                  </div>

                </v-col>
                <v-col
                    cols="8"
                    class="text-left"
                >
                  <v-btn
                      color="secondary"
                      class="mr-0 mb-0"


                  >
                    Reset Password
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          md="4"
      >
        <v-card
            class="v-card-profile"
            avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <v-list-item>
              <v-list-item-avatar size="100">
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="John"
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title text-left" style="margin-top:20px;">Musab Mahmoodh</v-list-item-title>
                <v-list-item-subtitle class="text-left">musab@</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Validators from "@/utils/validators";
import api from "@/api";

export default {
  data: () => ({
    userName:"",
    firstName:"",
    lastName:"",
    email:"",
    user_role:"STUDENT",
    valid: true,
    nameRules :[Validators.required(),Validators.min(5),Validators.max(15)],
    emailRules:[Validators.email()],
    loading: false,
    fetchingDataLoader:true
  }),
  created () {
    this.initialize()
  },
  methods:{
    async initialize () {
      this.fetchingDataLoader = true;
      const [status, res_data] = await api.user.getDetails()
      console.log(res_data)

      this.fetchingDataLoader = false;
      if (status.status === 200) {

        this.users = [...res_data]
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async updateUser() {
      this.loading = true

      const [status, res_data] = await api.user.register({username: this.newUserName, firstName:this.firstName,lastName:this.lastName,email:this.email, password: this.newPassword,role:this.user_role})
      this.loading = false
      if (status.status === 200) {
        this.$vToastify.info(res_data, "Info")
        this.moveToSignIn()
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

  }}
</script>

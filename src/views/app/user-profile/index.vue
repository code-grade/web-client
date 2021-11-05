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
              <v-form ref="form" v-model="valid" @submit.prevent="updateUser" id="user-update-form" lazy-validation>
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

                          disabled
                          v-model="userName"
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
                          v-model="firstName"
                          :rules="nameRules"
                          color="secondary darken-2"
                      />
                    </v-col>
                    <v-col
                        cols="4"


                    >
                      <div class="font-weight-medium pt-5">
                        Last Name

                      </div>

                    </v-col>

                    <v-col
                        cols="8"

                    >
                      <v-text-field
                          label="Last Name"
                          v-model="lastName"
                          :rules="nameRules"
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
                          v-model="email"
                          :rules="emailRules"

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
                          :loading="loading" rounded color="primary accent-3" type="submit" form="user-update-form" dark
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
        <v-row>
          <v-col cols="12">
            <v-card
                class="v-card-profile"
                avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
            >
              <v-card-text class="text-center">
                <v-row>
                  <v-col cols="12" class="text-center mb-0">
                    <v-avatar
                        color="primary"
                        size="112"

                    >
                      <img
                          src="https://www.w3schools.com/howto/img_avatar.png"
                          alt="John"
                      >

                    </v-avatar>

                  </v-col>
                  <v-col cols="12" class="mt-0">

                    <v-list-item-title class="title text-center" >{{userName}}</v-list-item-title>
                    <v-list-item-subtitle class="text-center">{{user_role}}</v-list-item-subtitle>

                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card>
              <div class="text-center">




                <v-chip
                    class="ma-2 pa-4"
                    color="green"
                    text-color="white"
                    v-if="isEnabled"
                    
                >
                  <v-icon left>
                    mdi-archive-lock-open-outline
                  </v-icon>
                  Enabled
                </v-chip>
                <v-chip
                    class="ma-2 pa-4"
                    color="red"
                    text-color="white"
                    v-else
                >
                  <v-icon left>
                    mdi-archive-lock-outline
                  </v-icon>
                  Not Enabled
                </v-chip>

                <v-chip
                    class="ma-2 pa-4"
                    color="red"
                    text-color="white"
                    v-if="verified"
                >
                  <v-icon left>
                    mdi-account-multiple-check-outline
                  </v-icon>

                  Verified
                </v-chip>

                <v-chip
                    class="ma-2 pa-4"
                    color="red"
                    text-color="white"
                    v-else
                >
                  <v-icon left>
                    mdi-account-multiple-remove-outline
                  </v-icon>
                  Un Verified
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>

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
    user_role:"",
    isEnabled:false,
    verified:false,
    valid: true,

    nameRules :[Validators.required(),Validators.min(5),Validators.max(15)],
    emailRules:[Validators.email()],
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
      console.log(res_data)

      this.fetchingDataLoader = false;
      if (status.status === 200) {
        const {username,email:{email,verified},firstName,isEnabled,lastName,role} = res_data
        this.userName=username;
        this.email=email
        this.firstName=firstName
        this.lastName=lastName
        this.user_role = role
        this.isEnabled= isEnabled
        this.verified = verified
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async updateUser() {
      this.loading = true

      const [status, res_data] = await api.user.updateUserProfile({firstName:this.firstName,lastName:this.lastName,email:this.email})
      this.loading = false
      if (status.status === 200) {
        this.$vToastify.info("User updated successfully", "Info")
        // this.moveToSignIn()
      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },

  }}
</script>

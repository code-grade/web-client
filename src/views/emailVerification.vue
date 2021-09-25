<template>
  <div>
     <div class="verify">
      <v-container>
        <v-row>
          <v-col cols="12" row wrap align="center"
                justify="center">
            <v-img
                alt="background"
                :src="require('../assets/verifyemail.png')"
                max-width="300px"
                max-height="300px"
            />
          </v-col>
          <v-col cols="12" row wrap align="center"
                justify="center" >
            <h3 style="font-size: 25px">Verify Your Email Address !</h3>
        
            <h5
                style="font-size: 16px"
            >Please check your email and click the link to activate your account</h5>
            <v-row align="center" class="ma-10">
        <v-divider ></v-divider>Didn't recieve?<v-divider></v-divider>
      </v-row>
            <div class="mt-5">
              <v-btn
                  class="ml-1 mr-1" color="primary"
              >
                Re-send
              </v-btn>
              <v-btn
                  class="ml-1 mr-1"
                  color="primary"
                  outlined
                  :to="{name: 'Home'}"
              >Go back to Home
              </v-btn>
              <v-btn
                  class="ml-1 mr-1"
                  color="gray"
                  outlined
              >need help
              </v-btn>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>

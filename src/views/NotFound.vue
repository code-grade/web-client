<template>
  <div>
     <div class="verify">
      <v-container>
        <v-row>
          <v-col cols="12" row wrap align="center"
                justify="center">
            <v-img
                alt="background"
                :src="require('../assets/404.png')"
                max-width="300px"
                max-height="300px"
            />
          </v-col>
          <v-col cols="12" row wrap align="center"
                justify="center" >
            <h3 style="font-size: 25px">PAGE NOT FOUND</h3>
        
            <h5
                style="font-size: 16px"
            >The Page you are trying is not available at the moment!</h5>
            <p>
            Try going back to home page and repeating your action. Or,
              contact helpdesk for support.</p>
            <v-row align="center" class="ma-10">
        <v-divider ></v-divider>Need Help?<v-divider></v-divider>
      </v-row>
            <div class="mt-5">
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
              > help
              </v-btn>
            </div>
          </v-col>
        </v-row>

      </v-container>
    </div>
  </div>
</template>
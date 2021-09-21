
<template>
  <div class="NotFound">
    <v-container fill-height fluid>
      <v-layout row wrap align="center"
                justify="center">
        <v-flex xs12>
          <v-card height="400"  flat class="text-center">
            <div class="display-3 mt-5 secondary--text" >Page not found.</div>
            <div class="grey--text lighten-5">
             The Page you are trying is not available.
            </div>
            <div class="paragraph-text mt-2">
              <br />
              <br />Try going back to home page and repeating your action. Or,
              contact helpdesk for support.
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>

.paragraph-text {
  font-size: 18px;
}
</style>

<template>
  <div>
    <v-row class="ma-10">
      <div>
        <v-flex
            style="float:left">
          <h2>
            Title:
<!--            {{title}}-->
          </h2>
          <h5>
            Description:
<!--            {{description}}-->
          </h5>
        </v-flex>
      </div>
      <v-flex
          style="float:right">
        <div style="float:right">
          <v-btn color="secondary"  v-on:click="navigate()"><v-icon>mdi-arrow-left-thick</v-icon>Go Back</v-btn>
        </div>
      </v-flex>
    </v-row>
    <v-row class="ma-10">
      <v-col
          cols="12"
          md="6">
        <v-list two-line>
          <v-list-item-group
              v-model="selected"
              active-class="pink--text"
              multiple
          >
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>

                    <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                    <v-icon
                        v-if="!active"
                        color="grey lighten-1"
                    >
                      mdi-star-outline
                    </v-icon>

                    <v-icon
                        v-else
                        color="yellow darken-3"
                    >
                      mdi-star
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                  v-if="index < items.length - 1"
                  :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col
      >
        <v-card class="pa-5">

            <v-row>
              <v-col>
                <h5>finalGrade</h5>
                <h4>{{finalGrade}}</h4>

              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h5 class="mb-3">Feedback</h5>
                <p v-html="feedback"></p>

              </v-col>
            </v-row>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import api from "@/api";
import router from "@/router";

export default {
  data: () => ({
    selected: [2],
    finalGrade:"",
    feedback:"",

    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: 'Ali Connors',
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: 'me, Scrott, Jennifer',
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: 'Sandra Adams',
      },
      {
        action: '12 hr',
        headline: 'Birthday gift',
        subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        title: 'Trevor Hansen',
      },
      {
        action: '18hr',
        headline: 'Recipe to try',
        subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britta Holt',
      },
    ],
    loading: false,
  }),
  created () {
    this.fetchResult()

  },
  methods: {
    async fetchResult () {
      this.loading = true;
      this.assignmentId = this.$route.params.assignmentId;
      const [status, res_data] = await api.assignment.final(this.assignmentId)
      console.log(res_data)

      this.loading = false;
      if (status.status === 200) {
        this.finalGrade = res_data.finalGrade
        this.feedback = res_data.feedback
      } else {
        this.$vToastify.error(status.message, "Done")
      }
    },
    navigate() {
      router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>
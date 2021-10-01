<template>
    <div>
          <v-card elevation="1" class="ma-10">
          <v-card-title ><h3> Run Results</h3></v-card-title>
       <v-row align="center">
    <v-item-group
      v-model="window"
      class="shrink ma-10"
      mandatory
      tag="v-flex"
    >
      <v-item
        v-for="n in testCases.length"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <div>
          <v-btn v-if="testCases[n-1].state=='CORRECT_OUTPUT'"
            :input-value="active"
            @click="toggle"
            plain
            class="green--text"
          ><v-icon>mdi-check-circle-outline</v-icon>
            Sample Test {{n}}
          </v-btn>
          <v-btn v-if="testCases[n-1].state=='INCORRECT_OUTPUT'"
            :input-value="active"
            @click="toggle"
            plain
            class="red--text"
          ><v-icon>mdi-alert-circle-outline</v-icon>
            Sample Test {{n}}
          </v-btn>
          <v-btn v-if="testCases[n-1].state=='RUNTIME_ERROR'"
            :input-value="active"
            @click="toggle"
            plain
            class="warning--text"
          ><v-icon>mdi-alert-circle-outline</v-icon>
            Sample Test {{n}}
          </v-btn>
        </div>
      </v-item>
    </v-item-group>

    <v-col cols="6">
      <v-window
        v-model="window"
        class="elevation-3"
        vertical
      >
        <v-window-item
          v-for="n in testCases.length"
          :key="n"
        >
          <v-card flat class="pa-10">
              <v-row
                class="mb-4"
                align="center"
              >
              <v-card-text>
                Compiler Message:<br>
              </v-card-text>
               <v-text-field denses
               v-model="testCases[n-1].state"
            solo
            readonly
          ></v-text-field>
              <v-card-text>
                Input: <br>
              </v-card-text>
              <v-text-field dense
               v-model="testCases[n-1].input"
            solo
            readonly
          ></v-text-field>
              <v-card-text>
                Your Output:
              </v-card-text>
              <v-text-field dense
               v-model="testCases[n-1].output"
            solo
            readonly
          ></v-text-field>
              <v-card-text>
                Expected Output:
                </v-card-text>
              <v-text-field dense
               v-model="testCases[n-1].expectedOutput"
            solo
            readonly
          ></v-text-field>
              </v-row>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
          </v-card>
    </div>
</template>

<script>
export default {
    name:'RunView',
    props:['testCases'],

     data: () => ({
      length: 3,
      window: 0,
    }),
}
</script>
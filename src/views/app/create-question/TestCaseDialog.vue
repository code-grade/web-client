<template>
  <v-dialog
      v-model="show"
      max-width="600"
      persistent
  >
    <v-card>
      <v-form ref="testcaseForm" v-model="valid" lazy-validation>
        <v-card-title
            :style="{'background-color': $vuetify.theme.currentTheme.primary,'color': 'white'}"
            class="mb-3"
        >
          {{ title }}
        </v-card-title>
        <v-card-text class="pl-3 pr-3">
          <v-row>
            <v-col>
              <v-switch
                  v-model="formData.sample"
                  label="Sample test case. Student can see the input and expected output"
                  dense
                  hide-details
              ></v-switch>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5>Input</h5>
              <v-textarea outlined height="100" dense v-model="formData.input"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5>Expected output</h5>
              <v-textarea outlined height="100" dense v-model="formData.output"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <h5>Points</h5>
              <v-text-field
                  dense
                  v-model="formData.points"
                  placeholder="Points"
                  outlined
                  type="number" min="1" step="1"
              ></v-text-field>
            </v-col>
            <v-col>
              <h5>Time Limit (sec)</h5>
              <v-text-field
                  dense
                  v-model="formData.timeLimit"
                  placeholder="time limit"
                  outlined
                  type="number" min="1" step="1"
              ></v-text-field>
            </v-col>
          </v-row>

        </v-card-text>
        <v-divider/>
        <v-card-actions class="pl-5 pr-5 pb-5 pt-1">
          <v-spacer></v-spacer>
          <v-btn
              min-width="100"
              outlined
              @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
              min-width="100"
              color="success"
              @click="submit"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TestCaseDialog",
  data: () => ({
    show: false,
    title: 'New Test Case',
    valid: true,
    formData: {
      id: 0,
      input: '',
      output: '',
      sample: true,
      points: 0,
      timeLimit: 5
    },
    promise: null
  }),
  methods: {
    clear() {
      this.formData = {
        id: 0,
        input: '',
        output: '',
        sample: true,
        points: 0,
        timeLimit: 5
      }
    },
    open(id = 0) {
      this.title = "Add Test Case"
      this.formData.id = id;
      this.show = true
      return new Promise((resolve) => {
        this.promise = (data) => {
          resolve(data)
        }
      })
    },
    edit(data) {
      this.title = "Edit Test Case"
      Object.assign(this.formData, data)
      this.show = true
      return new Promise((resolve) => {
        this.promise = (data) => {
          resolve(data)
        }
      })
    },
    submit() {
      const clone = JSON.parse(JSON.stringify(this.formData))
      this.promise(clone)
      this.clear();
      this.show = false
    },
    cancel() {
      this.promise(null)
      this.clear();
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>
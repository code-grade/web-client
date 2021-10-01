<template>
  <div v-show="results.length">
    <v-tabs
        v-model="tab"
    >
      <v-tab
          v-for="tCase in results" :key="tCase.id"
      >
        Case {{ tCase.id }}
      </v-tab>
      <v-tab-item v-for="tCase in results" :key="tCase.id">
        <div class="mt-2">
          <h4>Status</h4>
          <p style="background-color: #d5d5d5; padding: 3px">{{ tCase.state.replace('_', ' ') }}</p>
        </div>
        <div class="mt-2">
          <h4>Input</h4>
          <p style="background-color: #d5d5d5; padding: 3px">{{ tCase.input }}</p>
        </div>
        <div class="mt-2">
          <h4>Output</h4>
          <p style="background-color: #d5d5d5; padding: 3px">{{ tCase.output || ">>empty<<" }}</p>
        </div>
        <div class="mt-2">
          <h4>Expected Output</h4>
          <p style="background-color: #d5d5d5; padding: 3px">{{ tCase.expectedOutput }}</p>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: "RunTestCaseResult",
  props: {
    results: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    tab: 1
  }),
}
</script>

<style scoped>

</style>
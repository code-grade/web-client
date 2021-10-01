<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="submissions"
        :items-per-page="10"
        class="elevation-0"
    ></v-data-table>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "SubmissionsList",
  data: () => ({
    submissions: [],
    headers: [
      {text: 'Time', align: 'start', sortable: true, value: 'time'},
      {text: 'State', align: 'start', sortable: false, value: 'evaluated'},
      {text: 'Cases', align: 'start', sortable: false, value: 'testCaseCount'},
      {text: 'Points', align: 'start', sortable: true, value: 'totalPoints'},
    ]
  }),
  methods: {
    extractData(sub) {
      let totalTestCases = "?"
      let passedTestCases = "?"
      let totalPoints = "?"
      if (sub.result.evaluated) {
        totalTestCases = sub.result.testCases.length
        passedTestCases = sub.result.testCases.filter(t => t.state === "CORRECT_OUTPUT").length
        totalPoints = sub.result.totalPoints
      }
      const time = new Date(sub.submittedTime)
      return ({
        id: sub.submissionId,
        source: sub.sourceCode,
        evaluated: (sub.result.evaluated) ? "Evaluated" : "Waiting",
        result: sub.result,
        testCaseCount: `${passedTestCases}/${totalTestCases}`,
        totalPoints,
        time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
      });
    },
    add(submission) {
      this.submissions.push(this.extractData(submission))
      this.checking(submission.submissionId)
    },
    async checking(id) {
      while (true) {
        await this.sleep(1000)
        const [status, res] = await api.submission.get(id)
        if (status.status === 200) {
          if (res.result.evaluated) {
            console.log(res)
            this.submissions = this.submissions.map(s => (s.id === id) ? this.extractData(res) : s)
            break;
          }
        } else {
          this.$vToastify.error(status.message)
          break;
        }
      }
    },
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(), time)
      })
    }
  }
}
</script>

<style scoped>

</style>
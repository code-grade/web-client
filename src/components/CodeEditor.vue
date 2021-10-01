<template>
<div>
		<h4 class="ma-10">Write your code here : </h4>
      <MonacoEditor class="editor" v-model="code" language="python" style="max-height:500px" ></MonacoEditor>
<!--		<v-btn color="primary" class="ma-5" @click="runningCode()">Run Code</v-btn>-->
      <v-btn class="ml-10" :loading="submitting" @click="submitCode"  color="secondary accent-3"   dark>Submit Code</v-btn>
      <v-btn class="ml-10" :loading="testing" @click="testCode"  color="primary accent-3"   dark>Test Code</v-btn>
		<RunView :testCases='this.testCases' />

</div>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import RunView from '@/components/RunView'
import api from "@/api";

export default {
  name: 'CodeEditor',
  components:{RunView,MonacoEditor  },
  data:()=>({
	  runCode:false,
    submitting:false,
    testing:false,
    code: '#write your code here',
    testCases:[],
    options: {
      selectOnLineNumbers: false
    }
  }),
  methods: {
    async submitCode() {
      this.submitting = true
      this.moveToSubmissions()
      const [status,res_data] = await api.submission.make(this.$route.params.assignmentId,this.$route.params.questionId,{
        source:this.code,
        language:"PYTHON"
      })
      this.submitting = false
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Submitted the Code!")

      } else {
        this.$vToastify.error(res_data, "Done")
      }
    },
    async testCode() {
      this.testing = true
      const [status,res_data] = await api.submission.test(this.$route.params.questionId,{
        source:this.code,
        language:"PYTHON"
      })
      this.testing = false
      console.log(res_data)
      if (status.status === 200) {
        this.testCases = [...res_data]
      } else {
        this.$vToastify.error(res_data, "ERROR")
      }
    },
    moveToSubmissions() {
      this.$emit('incrementStep','')
    }
  }

};
</script>
<style>
.editor {
  width: 600px;
  height: 800px;
}
</style>
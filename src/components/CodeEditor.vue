<template>
    <v-container>
		<h4>Write your code here : </h4>
      <MonacoEditor class="editor" v-model="code" language="python" theme="vs-dark"/>
<!--		<v-btn color="primary" class="ma-5" @click="runningCode()">Run Code</v-btn>-->
      <v-btn  :loading="submitting" @click="submitCode" rounded color="secondary accent-3"   dark>Submit</v-btn>
      <v-btn  :loading="testing" @click="testCode" rounded color="primary accent-3"   dark>Test</v-btn>
      {{testCases}}
		<RunView :runCode='this.runCode' />
    </v-container>

	
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
      const [status,res_data] = await api.submission.make(this.$route.params.assignmentId,this.$route.params.questionId,{
        source:this.code,
        language:"PYTHON"
      })
      this.submitting = false
      if (status.status === 200) {
        this.$vToastify.success(status.message, "Successfully Added Feedback!")
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
        this.$vToastify.success(status.message, "Successfully Added Feedback!")
      } else {
        this.$vToastify.error(res_data, "Done")
      }
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
<template>
    <v-container>
		<h4>Write your code here : </h4>
        <div id="edi" style="min-height: 500px;">
        <div ref="editor" style="min-height: 500px;"></div>
        </div>
		<v-btn color="primary" class="ma-5" @click="runningCode()">Run Code</v-btn>
		<v-btn color="accent">Submit Code</v-btn>
		<RunView :runCode='this.runCode' />
    </v-container>
	
</template>

<script>
import * as monaco from 'monaco-editor';
import RunView from '@/components/RunView'

export default {
  name: 'CodeEditor',
  components:{RunView},
  data:()=>({
	  runCode:false,
  }),
  
  async mounted() {
    const el = this.$refs.editor;
    this.editor = monaco.editor.create(el, {
        value: "print('Hello, World!')",
        language: 'python',
        theme:'vs-dark',
        lineNumbers: "on",
	    roundedSelection: false,
	    scrollBeyondLastLine: false,
	    readOnly: false,
        wordWrap: 'wordWrapColumn',
	    wordWrapColumn: 40,

	// Set this to false to not auto word wrap minified files
	    wordWrapMinified: true,

	// try "same", "indent" or "none"
	    wrappingIndent: "indent",
        scrollbar: {
		// Subtle shadows to the left & top. Defaults to true.
		useShadows: false,

		// Render vertical arrows. Defaults to false.
		verticalHasArrows: true,
		// Render horizontal arrows. Defaults to false.
		horizontalHasArrows: true,

		// Render vertical scrollbar.
		// Accepted values: 'auto', 'visible', 'hidden'.
		// Defaults to 'auto'
		vertical: 'visible',
		// Render horizontal scrollbar.
		// Accepted values: 'auto', 'visible', 'hidden'.
		// Defaults to 'auto'
		horizontal: 'visible',

		verticalScrollbarSize: 17,
		horizontalScrollbarSize: 17,
		arrowSize: 30
	}
    });
    monaco.editor.colorizeElement(document.getElementById('edi'));

  },

  methods:{
	  runningCode(){
		  this.runCode=true;
	  }
  }

};
</script>
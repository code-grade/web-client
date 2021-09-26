<template>
    <v-card flat class="ma-5">
      <v-row>
            <v-col cols="8" xs="6">
         <div v-html='question.description'></div>
          </v-col>
        <v-divider vertical></v-divider>
                <v-col class="ma-5">
                    <v-row class="pb-2"><v-icon>mdi-account</v-icon>Instructor : {{question.instructor}}</v-row>
                    <v-row class="pb-2"><v-icon>mdi-account</v-icon>Difficulty : {{question.difficulty}}</v-row>
                    <v-row class="pb-2"><v-icon>mdi-account</v-icon>Max-Score :   {{question.points}}</v-row>
                </v-col>
            </v-row>
    </v-card>
</template>

<script>

export default {
    name:'TaskView',
    props:['questionId'],

    data:()=>({
      question:{
        id:1,
        title:'question 1',
        instructor:'john',
        difficulty:'Easy',
        points:10,
        description:'<p>Here is a sample line of code that can be executed in Python:</p><pre class="ql-syntax" spellcheck="false">print("Hello, World!") </pre><p>You can just as easily store a string as a variable and then print it to stdout:</p><p><br></p><p>my_string="Hello,World!"</p><p>print(my_string)</p><p><br></p><p>The above code will print&nbsp;<code style="background-color: rgb(248, 248, 248); color: var(--color-text-medium-dark);">Hello, World!</code>&nbsp;on your screen. Try it yourself in the editor below!</p><p><strong style="color: var(--color-text-dark);">Input Format</strong></p><p>You do not need to read any input in this challenge.</p><p><strong style="color: var(--color-text-dark);">Output Format</strong></p><p>Print&nbsp;<code style="background-color: rgb(248, 248, 248); color: var(--color-text-medium-dark);">Hello, World!</code>&nbsp;to stdout.</p><p><strong style="color: var(--color-text-dark);">Sample Output 0</strong></p><pre class="ql-syntax" spellcheck="false">Hello, World! </pre><p><br></p>',
      }
    }),

    methods:{
      convertDescription (str) {
	      var div = document.createElement('div');
        div.innerHTML = str;
        console.log(div)
        return div;
      }
    }
}
</script>

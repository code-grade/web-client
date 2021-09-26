<template>
    <div>
        <v-card>
            <v-card-title>Run Results</v-card-title>
            <v-card-text v-if="(this.runCode==false)">After Run your code you can see the results here!</v-card-text>
            <v-card v-if="(this.runCode==true)">
                
            </v-card>
        </v-card>
    </div>
</template>

<script>
export default {
    name:'RunView',
    props:['runCode'],
    
}
</script>
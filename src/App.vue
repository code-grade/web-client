<template>
  <v-app>
    <Header/>
    <v-main>
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";

export default {
  name: 'App',
  components: {Header},
  data: () => ({
    //
  }),
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,'+
'400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Sora:wght@300;400;500;600;700&display=swap');

* {
  font-family: "Sora", sans-serif;
}

</style>
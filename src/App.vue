<template>
  <v-app>
    <Header/>
    <v-main style="background-color: #f5f5f5">
      <v-fade-transition>
        <router-view/>
      </v-fade-transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default {
  name: 'App',
  components: {Footer, Header},
  data: () => ({
    //
  }),
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,'+
'400&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Sora:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ruda:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;400;500;600;700&display=swap');

* {
  font-family: "Ruda", sans-serif;
}

</style>

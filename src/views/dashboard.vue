<template>
 <div class="main">
  <p>dfghjk</p>

  <v-app id="inspire">
     <Header @handrawer="actualiza()"/>
     <Sidebar  :drawer="drawer"/>


    <v-main>
      <v-container
        class="py-2 "
        fluid
      >
        <v-row>
          <v-col
            cols="12"
          >
           <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

 </div>

 
</template>

<script>
import Header from '../components/core/Header.vue'
import Sidebar from '../components/core/Sidebar.vue'
  export default {
  components: { Header, Sidebar },
    data: () => ({
      cards: ['Today', 'Yesterday'],
      drawer: true,
      
    }),
   methods: {
    actualiza(){
      console.log("actualizado");
      this.drawer = !this.drawer;
    }
   },
  }
</script>

<style>



</style>
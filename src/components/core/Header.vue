<template>
    <v-app-bar 
      app
      elevate-on-scroll
      elevation="8"
      relative
      style="background: #640707;  
background: -webkit-linear-gradient(to right,#8F0101 , #0059A6);  
background: linear-gradient(to right, #8F0101, #0059A6);  
"
      height="120px"
     >

      <v-app-bar-nav-icon class="btn" dark @click="procesa()"></v-app-bar-nav-icon>

      <v-toolbar-title class="letra" ><center><H1>BIBLIOTECA PRESTACIONAL DEL SENA</h1></center></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" style="cursor:point" class="mx-5 mr-10"> 
                
         </span>
      </template>
      <v-list dense>
       <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    </v-menu>

    
      
    </v-app-bar>
</template>

<script>
   export default {
    data() {
      return {
        items: [
        { text: 'Perfil', icon: 'mdi-clock' },
        { text: 'Salir', icon: 'mdi-account' },
      ],
      }
    },
    methods: {
      procesa(){
        console.log("generado");
        this.$emit('handrawer');
      }
    },
   }
</script>
<style lang="scss" scoped>

   .letra{
     color:white;
     font-family:monospace;
     margin-top:6px;
     
    

   }
   template{
    background-color:blue;
   }
</style>

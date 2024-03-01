<template>
  <v-app-bar app elevate-on-scroll elevation="8" relative style="background: #640707;  
background: -webkit-linear-gradient(to right,#8F0101 , #0059A6);  
background: linear-gradient(to right, #8F0101, #0059A6);  
" height="120px">

    <v-app-bar-nav-icon class="btn" dark @click="procesa()"></v-app-bar-nav-icon>

    <v-toolbar-title class="letra">
      <center>
        <H1>BIBLIOTECA PRESTACIONAL DEL SENA</h1>
      </center>
    </v-toolbar-title>

    <!-- Boton del cerrar sesion y del perfil -->
    <v-row justify="center">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <img src="../../assets/PerfilUsuario.png" alt="">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <img src="../../assets/PerfilUsuario.png" alt="">
              </v-avatar>
              <h3>{{ DatosUsuario.nombre }}</h3>
              <!--<p class="text-caption mt-1">
                {{ user.email }}
              </p> -->
              <v-divider class="my-3"></v-divider>
              <v-btn @click="PerfilUsuario" depressed rounded text>
                Mi Perfil
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="CerrarSesion" depressed rounded text>
                Cerrar Sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>





    <v-spacer></v-spacer>





  </v-app-bar>
</template>

<script>

import store from '../../store';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {
    return {
      DatosUsuario: {
        iniciales: 'JD',
        nombre: 'Bienvenido',
      },
    }
  },
  mounted() {
    const token = store.getters.usuario.access_token;
    const TokenDecodified = jwtDecode(token);
    this.DatosUsuario.nombre = TokenDecodified.nombre;
  },
  methods: {

    procesa() {
      console.log("generado");
      this.$emit('handrawer');
    },
    CerrarSesion() {
      this.$store.commit('limpiarStore');
      this.$router.push('/')
    },
    PerfilUsuario() {

    }
  },
}
</script>
<style lang="scss" scoped>
.letra {
  color: white;
  font-family: monospace;
  margin-top: 6px;



}

template {
  background-color: blue;
}
</style>

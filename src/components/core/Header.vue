<template>
  <v-app-bar app elevate-on-scroll elevation="8" class="barra" height="160px">

    <v-app-bar-nav-icon style="margin-left: 20px;" class="btn btn-dark" dark @click="procesa()"></v-app-bar-nav-icon>

    <v-toolbar-title class="letra">
      <center>
        <H1>Bienvenido {{ DatosUsuario.nombre }}</h1>
      </center>
    </v-toolbar-title>

    <!-- Boton del cerrar sesion y del perfil -->
    <div style="position:absolute; margin-left:75%;">
      <v-menu rounded>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar style="margin-left: 100%;" color="brown" size="70">
              <img src="../../assets/PerfilUsuario.png" alt="">
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <img src="../../assets/PerfilUsuario.png" alt="">
              </v-avatar>
              <h3>{{ DatosUsuario.nombre }}</h3>

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
    </div>





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
        nombre: '',
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
      this.$router.push('/');
      window.location.reload();
    },
    PerfilUsuario() {
      if (this.$route.path !== '/dashboard/miperfil') {
        this.$router.push('/dashboard/miperfil');
      }
      
    }
  },
}
</script>
<style lang="scss" scoped>
.letra {
  color: rgb(0, 0, 0);
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin-top: 6px;
}

.barra {
  background-image: url("../../assets/fondoheader.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
}

template {
  background-color: blue;
}
</style>

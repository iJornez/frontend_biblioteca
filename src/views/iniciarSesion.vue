<template>

  <div class="fondoGeneral">
    <div class="fondo">
      <v-row>

        <vs-navbar class="cap1" shadow square center-collapsed v-model="active">
          <img class="logo" src="../assets/LogoSENA.png">
          <img class="letras" src="../assets/B.png">

          <template #right>
            <vs-button class="iniciopre " style="background-color:#fff;color:#003C24; font-size:16px;font-weight: bold;"
              @click="dialog = true">Iniciar Sesión</vs-button>

          </template>

        </vs-navbar>


        <v-dialog v-model="dialog" max-width="350" height="400">
          <div class="container h-60 " style="background-color: #737373;">
            <div class="d-flex justify-content-center h-50">
              <div class="user_card">
                <div class="d-flex justify-content-center">
                  <div class="brand_logo_container">
                    <img src="../assets/LogoSENA.png" class="brand_logo" alt="Logo">
                  </div>
                </div>
                <div class="d-flex justify-content-center form_container">
                  <form v-on:submit.prevent>
                    <div class="input-group mb-3">
                      <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-user" color="black"> </i></span>
                      </div>
                      <input v-model="paqueteLogin.cedula" type="text" name="" class="form-control input_user"
                        placeholder="Cédula">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>

                      <input v-model="paqueteLogin.password" class="form-control input_pass" placeholder="Contraseña"
                        :type="showPassword ? 'text' : 'password'">

                      <div class="input-group-append">
                        <span class="input-group-text eye-icon" @click="toggleShowPassword">
                          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </span>
                      </div>
                    </div>




                    <div class="d-flex justify-content-center mt-3 login_container" v-if="prueba == 0">
                      <vs-button dark class="btn login_btn" @click="login()">Iniciar Sesión</vs-button>
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container" v-if="prueba == 1">
                      <vs-button class="btn login_btn" loading dark>
                        Iniciar Sesión
                      </vs-button>
                    </div>
                    <v-snackbar v-model="isBusy" :timeout="2000" absolute bottom color="red">
                      {{ msg }}
                    </v-snackbar>
                  </form>
                </div>



              </div>
            </div>
          </div>
          <!--  <vs-button flat color="#7d33ff" icon
                @click="openNotification('top-center', '#7d33ff')">
                <i class='bx bx-border-top' ></i>
              </vs-button>-->
        </v-dialog>
      </v-row>
    </div>

    <v-app>
      <div class="carusel">
        <v-carousel width="100%" cycle interval="3000" :show-arrows="false" class="carrusel">
          <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src"></v-carousel-item>
        </v-carousel>
      </div>

      <br>
      <center>
        <H1 class="recomended">RECOMENDADOS</H1>
      </center>
      <center>
        <p><b>Una seleccion especial para que no dejes de leer, escuchar, ver y jugar.</b></p>
      </center>

      <vs-card-group class="custom-card-margin">
        <vs-card v-for="(image, index) in images" :key="index" @click="handleClick(image)">

          <template #img>
            <img :src="image" alt="Image">
          </template>
        </vs-card>
      </vs-card-group>



      <!-- 

 <v-sheet class="mx-auto" elevation="8" max-width="1026">
        <v-slide-group v-model="model" class="pa-4" active-class="success" show-arrows>
          <v-slide-item v-for="n in items2" :key="n">
            <v-card class="ma-4" height="300" width="190">
              <v-row class="fill-height" align="center" justify="center">

                <v-img height="320" :src="n"></v-img>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      -->

      <v-container fluid class="custom-card-margin mb-4">
        <v-row justify="center">
          <v-col cols="12" sm="6" md="4" v-for="(card, index) in cards" :key="index">
            <v-card class="mx-auto" max-width="500">
              <v-img class="white--text align-end" height="400px" width="500px" :src="card.imageUrl">
                <v-card-title>{{ card.title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">
                <b>{{ card.subtitle }}</b>
              </v-card-subtitle>

              <v-card-text class="text--primary">
                <div :class="card.textClasses">
                  {{ card.text }}
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>




      <!-- Footer -->
      <footer class="text-center text-lg-start text-muted fondo-final">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        </section>

        <!-- Section: Links  -->
        <section class="">
          <div class="container text-center text-md-start mt-5">
            <!-- Grid row -->
            <div class="row mt-3">
              <!-- Grid column -->
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <!-- Content -->
                <h6 class="text-uppercase fw-bold mb-4" style="color:rgb(173, 255, 047);">
                  <i class=" color fas fa-gem me-3"></i> biblioteca prestacional SENA
                </h6>
                <p class=" color">
                  Una biblioteca prestacional se encarga de proporcionar acceso a una amplia variedad de recursos y
                  materiales para el préstamo a sus usuarios. Su objetivo principal es ofrecer servicios que promuevan
                  el
                  acceso equitativo a la información, el conocimiento y la cultura.
                </p>
              </div>


              <!-- Grid column -->
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="color text-uppercase fw-bold mb-4" style="color:rgb(173, 255, 047);">
                  Dispositivos
                </h6>
                <p class="color ">
                  <b href="#!" class=" text-reset">Portatil</b>
                </p>
                <p class="color ">
                  <b href="#!" class="color text-reset">Mouse</b>
                </p>
                <p class="color ">
                  <b href="#!" class="color text-reset">Teclado</b>
                </p>
                <p class="color ">
                  <b href="#!" class=" text-reset">cargador</b>
                </p>
              </div>


              <!-- Grid column -->
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4" style="color:rgb(173, 255, 047)">Contactanos</h6>
                <p class="color "><i class="fas fa-home me-3"></i> Montería - Córdoba</p>
                <p class="color ">
                  <i class="fas fa-envelope me-3"></i>
                  BibliotecaCCIT@gmail.com
                </p>
                <p class="color "><i class="fas fa-phone me-3"></i> 3043742255</p>
                <p class="color "><i class="fas fa-print me-3"></i> 3206199534</p>
              </div>
            </div>
          </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="color text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
          © 2024 SENA
          <a class="text-reset fw-bold color"
            href="https://oferta.senasofiaplus.edu.co/sofia-oferta/">Biblioteca.com</a>
        </div>
        <!-- Copyright -->
      </footer>
      <!-- Footer -->

    </v-app>


  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'App',
  data: () => ({
    items: [
      {
        src: 'https://images.pexels.com/photos/8199766/pexels-photo-8199766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        src: 'https://images.pexels.com/photos/9572370/pexels-photo-9572370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        src: 'https://images.pexels.com/photos/6344238/pexels-photo-6344238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        src: 'https://images.ctfassets.net/p0qf7j048i0q/28DE1F50872A4C44989EFB1462A62680/5d50f64c7c063ebd58d633c8afe1281a/G824750478.jpg?w=3840&q=75&h=3840&fm=webp',
      },

    ],

    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a-gs4-KmgMoaGPeVegwjECwXHepBkFDuyA&usqp=CAU", "https://www.planetalector.com.mx/usuaris/thumbnails/libros/fotos/201/360/portada_cien-anos-de-soledad-2015_gabriel-garcia-marquez_201506221819.jpg",
      "https://nidodelibros.com/wp-content/uploads/2021/07/9780525657606.jpeg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXmFLfr7vNZj9aXIImICTOVS3Swk6ASKBcQ&usqp=CAU", "https://m.media-amazon.com/images/I/61UTRIzO6vL._AC_UF1000,1000_QL80_.jpg",
      'https://www.penguinlibros.com/co/2386270/juego-de-tronos-cancion-de-hielo-y-fuego-1.jpg', 'https://m.media-amazon.com/images/I/81MKQjxDI0L._AC_UF1000,1000_QL80_.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnl3BTfMtFnWuVLjpGAHcGLhAKti7In4YCAQ&usqp=CAU',
      'https://www.penguinlibros.com/co/1692450/el-mesias-de-dune-las-cronicas-de-dune-2.jpg',
      'https://www.penguinlibros.com/co/1638921/memorias-de-una-geisha.jpg',
      'https://m.media-amazon.com/images/I/51RN1twQZDL.jpg',
      'https://www.adobe.com/es/express/create/cover/media_124eac7e2355d1342f03644c8392c494f40e9ee65.jpeg?width=400&format=jpeg&optimize=medium',

    ],

    cards: [
      {
        title: "Prestamo de libros",
        subtitle: "¿Cómo se pide prestado un libro en la biblioteca?",
        text: "La primera es de forma presencial en tu biblioteca más cercana, donde tendrás que presentar tu DNI y se te dará el carné de forma inmediata. Otra vía consiste en rellenar el formulario online correspondiente a tu red de bibliotecas.",
        textClasses: "truncate-textt full-textt",
        imageUrl: "https://www.bibliotecas.ugto.mx/pages/images/pdomicilio.png"
      },
      {
        title: "Prestamo de computadores",
        subtitle: "¿Cómo se utilizan las computadoras en la biblioteca?",
        text: "Las computadoras públicas de la biblioteca permiten a los usuarios buscar una gran variedad de recursos electrónicos. Las computadoras con recursos de la biblioteca son exclusivamente para buscar las existencias de la biblioteca y las bases de datos electrónicas seleccionadas.",
        textClasses: "truncate-text1 full-text1",
        imageUrl: "https://www.uaa.mx/portal/wp-content/uploads/2021/01/BOLETIN-10--1024x683.jpg"
      },
      {
        title: "Horario de prestamos",
        subtitle: "¿Cuál es el horario para reclamar tus prestamos?",
        text: "Los préstamos de computadoras están disponibles en la biblioteca en los siguientes horarios: Lunes a viernes: 6:00 am - 12:30 pm y 2:00 pm - 9:00 pm.- Sábados 6:00 am - 2:00 pm.",
        textClasses: "truncate-text full-text",
        imageUrl: "https://img.freepik.com/fotos-premium/reloj-pie-haciendo-tictac-rincon-olvidado-antigua-biblioteca_979495-3549.jpg"
      },
    ],

    /*
    items2: [
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a-gs4-KmgMoaGPeVegwjECwXHepBkFDuyA&usqp=CAU',
      },
      {
        src: 'https://www.planetalector.com.mx/usuaris/thumbnails/libros/fotos/201/360/portada_cien-anos-de-soledad-2015_gabriel-garcia-marquez_201506221819.jpg',
      },
      {
        src: 'https://nidodelibros.com/wp-content/uploads/2021/07/9780525657606.jpeg',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXmFLfr7vNZj9aXIImICTOVS3Swk6ASKBcQ&usqp=CAU',
      },
      {
        src: 'https://m.media-amazon.com/images/I/61UTRIzO6vL._AC_UF1000,1000_QL80_.jpg',
      },
      {
        src: 'https://www.penguinlibros.com/co/2386270/juego-de-tronos-cancion-de-hielo-y-fuego-1.jpg',
      },
      {
        src: 'https://m.media-amazon.com/images/I/81MKQjxDI0L._AC_UF1000,1000_QL80_.jpg',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnl3BTfMtFnWuVLjpGAHcGLhAKti7In4YCAQ&usqp=CAU',
      },
      {
        src: 'https://www.penguinlibros.com/co/1692450/el-mesias-de-dune-las-cronicas-de-dune-2.jpg',
      },
      {
        src: 'https://www.penguinlibros.com/co/1638921/memorias-de-una-geisha.jpg',
      },
      {
        src: 'https://m.media-amazon.com/images/I/51RN1twQZDL.jpg',
      },
      {
        src: 'https://www.adobe.com/es/express/create/cover/media_124eac7e2355d1342f03644c8392c494f40e9ee65.jpeg?width=400&format=jpeg&optimize=medium',
      },



    ],*/

    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],

    active: 'home',
    dialog: false,
    usuario: "",
    noti: null,
    contrasena: "",
    error: false,
    msg: "",
    isBusy: false,
    prueba: 0,
    array: [],
    rolMenu: [],
    usuarios: [],
    paqueteLogin: {
      cedula: null,
      password: null
    },
    showPassword: false,
    showFullText: [false, false, false, false],

  }),



  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },

    toggleFullText() {
      // Método para cambiar el estado de showFullText
      this.showFullText = !this.showFullText;
    },
    toggleFullText1() {
      // Método para cambiar el estado de showFullText
      this.showFullTexta = !this.showFullTexta;
    },
    toggleFullTextt() {
      // Método para cambiar el estado de showFullText
      this.showFullTextt = !this.showFullTextt;
    },
    toggleFullTextc() {
      // Método para cambiar el estado de showFullText
      this.showFullTextc = !this.showFullTextc;
    },
    login() {
      var vm = this;
      if (!vm.paqueteLogin.cedula || !vm.paqueteLogin.password || vm.paqueteLogin.cedula.trim() === '' || vm.paqueteLogin.password.trim() === '') {
        Swal.fire('Por favor ingresa credenciales validas', '', 'warning');
      } else {
        console.log('Paquete a enviar', this.paqueteLogin);
        axios.post('http://localhost:62000/auth/login', vm.paqueteLogin).then(response => {
          // this.$toast.success('Bienvenido');
          vm.$store.commit('setusuario', response.data);
          vm.$router.push('dashboard/welcome');
          console.log(vm.$store.state.permiso);
        }).catch(error => {
          if (error.response.status === 401) {
            Swal.fire('Credenciales incorrectas', '', 'error');
            // this.$toast.error('error');
          } else {
            console.log('Error en la solicitud:', error);
            Swal.fire('Error', 'Hubo un problema al procesar la solicitud', 'error');
          }
        })

      }




    },
    crearUsuario() {
      console.log('sd');
      this.$router.push('crear_usuario');
    },

  },
  async mounted() {

  },


}
</script>


<style scoped>
* {
  box-sizing: border-box;


}

.eye-icon {
  cursor: pointer;
}



.iniciopre {
  top: 30px;
}


.logo {
  position: absolute;
  top: 7px;
  left: 35px;
  width: 145px;
  height: 105px;
}

.letras {
  position: absolute;
  top: -15px;
  left: 175px;
  width: 215px;
  height: 225px;
  color: black;
}

.cap1 {

  height: 120px;
  background-image: url("../assets/fondoheader.jpg");
}

.carusel {
  margin-top: 120px;


}

@import url("https://fonts.g  oogleapis.com/css?family=Mystery+Quest");

.user_card {
  height: 500px;
  width: 350px;
  margin-top: auto;
  margin-bottom: auto;
  background-image: url("../assets/fondoheader.jpg");
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

.brand_logo_container {
  position: absolute;
  height: 170px;
  width: 170px;
  top: 1px;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  margin-top: 70px;
}

.brand_logo {

  position: absolute;
  top: 7px;
  left: 15px;
  width: 145px;
  height: 105px;



}

.form_container {
  margin-top: 100px;
}

.login_btn {
  width: 100%;
  background: #eef0f0 !important;
  color: #003C24 !important;
  font-weight: 700;
  top: 50px;
}

.login_btn:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.login_container {
  padding: 0 2rem;
}

.input-group-text {
  background: #000 !important;
  color: #FFFFFF !important;
  border: 0 !important;
  border-radius: 0.25rem 0 0 0.25rem !important;
}

.input_user,
.input_pass:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.carta {
  margin-bottom: 20px;
  /* Espacio entre tarjetas */


}

.v-card__img {
  object-fit: cover;
  height: 300px;
}

footer {
  background-color: black;

  position: relative;
  top: 999px;
}

.color {

  color: #ffff;
}

.v-card {
  height: 600px;
  /* Ajusta según sea necesario */
  overflow: auto;
}

.truncate-textt,
.truncate-text1,
.truncate-text,
.truncate-text3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.full-textt,
.full-text1,
.full-text,
.full-text3 {
  white-space: normal;
  overflow: visible;
  text-overflow: clip;
}


.custom-card-margin {
  margin-bottom: 100px;

}

.fondo-final {
  margin-top: -900px;
}

@media only screen and (max-width: 600px) {
  .logo {
    position: absolute;

    top: 15px;
    left: -10px;
    width: 135px;
    height: 90px;
  }

  .letras {
    position: absolute;
    top: 1px;
    left: 105px;
    width: 200px;
    height: 180px;
    color: black;
  }
}
</style>import { $toast } from 'vue/types/umd';
import { $toast } from 'vue/types/umd';
import { $toast } from 'vue/types/umd';
import { error } from 'console';
import { $toast } from 'vue/types/umd';


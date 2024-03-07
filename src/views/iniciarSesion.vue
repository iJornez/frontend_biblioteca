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
                        placeholder="Username">
                    </div>
                    <div class="input-group mb-2">
                      <div class="input-group-append">
                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                      </div>
                      <input v-model="paqueteLogin.password" type="password" name="" class="form-control input_pass"
                        placeholder="Password">
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


                <div class="mt-4">
                  <div class="d-flex justify-content-center links">
                    <a href="#" style="color: black">¿olvidaste tu contraseña?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--  <vs-button flat color="#7d33ff" icon
                @click="openNotification('top-center', '#7d33ff')">
                <i class='bx bx-border-top' ></i>
              </vs-button>-->
        </v-dialog>

        <v-col cols="6" xs="12">

          <div>

          </div>

          <div>
            <v-row>
              <v-col cols="2" xs="0">
              </v-col>
              <v-col cols="8" xs="12">

              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="0">
        </v-col>
        <v-col cols="4" xs="0" class="mb-2 mr-sm-2 mb-sm-0" align-self="center">
          <!-- <img  src="../assets/ini.png" style="max-width: 500px;
        max-height:500;">-->

        </v-col>
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
        <p><b>una seleccion especial para que no dejes de leer, escuchar, ver y jugar.</b></p>
      </center>

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
      <v-row>
        <v-card class="mx-auto carta" max-width="500">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.bibliotecas.ugto.mx/pages/images/pdomicilio.png">
            <v-card-title>Prestamo de libros</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se pide prestado un libro en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">


            <div>
              La primera es de forma presencial en tu biblioteca más cercana, donde tendrás que presentar tu DNI y se te
              dará el carné de forma inmediata. Otra vía consiste en rellenar el formulario online correspondiente a tu
              red de bibliotecas.</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>


        <v-card class="mx-auto carta1" max-width="500">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://www.uaa.mx/portal/wp-content/uploads/2021/01/BOLETIN-10--1024x683.jpg">
            <v-card-title>Prestamo de computadores</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se utilizan las computadoras en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">


            <div>
              Las computadoras públicas de la biblioteca permiten a los usuarios buscar una gran variedad de recursos
              electrónicos. Las computadoras con recursos de la biblioteca son exclusivamente para buscar las
              existencias
              de la biblioteca y las bases de datos electrónicas seleccionadas. </div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto carta2" max-width="500">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://images.pexels.com/photos/6803551/pexels-photo-6803551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2">
            <v-card-title>Prestamo de computadores</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            ¿Cómo se utilizan las computadoras en la biblioteca?
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div :class="{ 'truncate-text': !showFullText, 'full-text': showFullText }">
              Las computadoras públicas de la biblioteca permiten a los usuarios buscar una gran variedad de recursos
              electrónicos. Las computadoras con recursos de la biblioteca son exclusivamente para buscar las
              existencias
              de la biblioteca y las bases de datos electrónicas seleccionadas.
              Las computadoras públicas de la biblioteca permiten a los usuarios buscar una gran variedad de recursos
              electrónicos. Las computadoras con recursos de la biblioteca son exclusivamente para buscar las
              existencias
              de la biblioteca y las bases de datos electrónicas seleccionadas.
            </div>
            <span v-if="!showFullText" class="leer-mas" @click="toggleFullText">Leer más</span>
          </v-card-text>

          <v-card-text class="text--primary">



          </v-card-text>

        </v-card>

        <v-card class="mx-auto carta3" max-width="600">
          <v-img class="white--text align-end" height="400px" width="500px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-card-title>Top 10 Australian beaches</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">
            Number 10
          </v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="orange" text>
              Share
            </v-btn>

            <v-btn color="orange" text>
              Explore
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>


      <!-- Footer -->
      <footer class="text-center text-lg-start text-muted  fondo">
        <!-- Section: Social media -->
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <!-- Left -->
          <div class="me-5 d-none d-lg-block">
            <a href="https://oferta.senasofiaplus.edu.co/sofia-oferta/">Biblioteca Sena</a>
          </div>
          <!-- Left -->

          <!-- Right -->
          <div>

          </div>
          <!-- Right -->
        </section>
        <!-- Section: Social media -->

        <!-- Section: Links  -->
        <section class="">
          <div class="container text-center text-md-start mt-5">
            <!-- Grid row -->
            <div class="row mt-3">
              <!-- Grid column -->
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <!-- Content -->
                <h6 class="text-uppercase fw-bold mb-4" style="color:rgb(101, 99, 99);">
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

              <!-- Grid column -->
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="color text-uppercase fw-bold mb-4" style="color:rgb(90, 88, 88);">
                  Dispositivos
                </h6>
                <p class="color ">
                  <a href="#!" class=" text-reset">Portatil</a>
                </p>
                <p class="color ">
                  <a href="#!" class="color text-reset">Mouse</a>
                </p>
                <p class="color ">
                  <a href="#!" class="color text-reset">Teclado</a>
                </p>
                <p class="color ">
                  <a href="#!" class=" text-reset">cargador</a>
                </p>
              </div>
              <!-- Grid column -->

              <!-- Grid column -->
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <!-- Links -->
                <h6 class="color  text-uppercase fw-bold mb-4" style="color:rgb(89, 87, 87)">
                  Useful links
                </h6>
                <p class="color ">
                  <a href="#!" class=" text-reset">Pricing</a>
                </p>
                <p class="color ">
                  <a href="#!" class="text-reset">Settings</a>
                </p>
                <p class="color ">
                  <a href="#!" class="text-reset">Orders</a>
                </p>
                <p class="color ">
                  <a href="#!" class="text-reset">Help</a>
                </p>
              </div>
              <!-- Grid column -->

              <!-- Grid column -->
              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <!-- Links -->
                <h6 class="text-uppercase fw-bold mb-4" style="color:rgb(95, 92, 92)">Contact</h6>
                <p class="color "><i class="fas fa-home me-3"></i> Monteria</p>
                <p class="color ">
                  <i class="fas fa-envelope me-3"></i>
                  biblioteca@gmail.com
                </p>
                <p class="color "><i class="fas fa-phone me-3"></i> 3043742255</p>
                <p class="color "><i class="fas fa-print me-3"></i> 3298463567</p>
              </div>
              <!-- Grid column -->
            </div>
            <!-- Grid row -->
          </div>
        </section>
        <!-- Section: Links  -->

        <!-- Copyright -->
        <div class="color text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
          2024 SENA:
          <a class="text-reset fw-bold color" href="https://mdbootstrap.com/">biblioteca.com</a>
        </div>
        <!-- Copyright -->
      </footer>
      <!-- Footer -->

    </v-app>


  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: 'App',
  data: () => ({
    items: [
      {
        src: 'https://i0.wp.com/cms.babbel.news/wp-content/uploads/2022/02/Most_Beautiful_Libraries-1.png?resize=640%2C360',
      },
      {
        src: 'https://www.paho.org/sites/default/files/styles/max_1500x1500/public/2020-10/library-stock-image-1400x700.jpg?itok=HWcoUkYe',
      },
      {
        src: 'https://i0.wp.com/bibliotecasmedellin.gov.co/wp-content/uploads/2021/05/P1460649-1200x700.jpg',
      },
      {
        src: 'https://images.ctfassets.net/p0qf7j048i0q/28DE1F50872A4C44989EFB1462A62680/5d50f64c7c063ebd58d633c8afe1281a/G824750478.jpg?w=3840&q=75&h=3840&fm=webp',
      },

    ],
    items2: [
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a-gs4-KmgMoaGPeVegwjECwXHepBkFDuyA&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc6yU2trrLbzY2JzeQv2o5N-aDruqyy0dubg&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS94JipTW9DDr2lJzTVFqeMlSlzA169Lry1pA&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXmFLfr7vNZj9aXIImICTOVS3Swk6ASKBcQ&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYN48CM8uC2eWUoCOyyqu-TlwMVLigPAD3Ug&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVqNZ0xxKYIizUkGDwEegbaibggcoknAovIg&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgXMi8gmglolRBQE9tiUnagKhyYCF_1zphAQ&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnl3BTfMtFnWuVLjpGAHcGLhAKti7In4YCAQ&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQdyI0J2pU_5wR2jl81BHxfcre8xS0sOMs7w&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_YkNcvSleK8-6bramWL53ltAjnT9hUiO-Q&usqp=CAU',
      },
      {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvXBqEZE6TdCgIF1rFAXuomq6-oHi-jeDe8w&usqp=CAU',
      },
      {
        src: 'https://www.adobe.com/es/express/create/cover/media_124eac7e2355d1342f03644c8392c494f40e9ee65.jpeg?width=400&format=jpeg&optimize=medium',
      },



    ],
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
    showFullText: false,

  }),



  methods: {

    toggleFullText() {
      // Método para cambiar el estado de showFullText
      this.showFullText = !this.showFullText;
    },
    login() {
      var vm = this;
      console.log('Paquete a enviar', this.paqueteLogin);
      axios.post('http://localhost:62000/auth/login', vm.paqueteLogin).then(response => {
        if (response.data == "") {
          console.log('Esta vacio!');
          this.errorMessages();
        } else {
          vm.$store.commit('setusuario', response.data);
          vm.$router.push('dashboard/welcome');
          console.log(vm.$store.state.permiso);
        }


      }).catch(error => {
        console.log(error);
      })



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
  position: absolute;
  left: 100px;
  top: 1250px;


}

.carta1 {

  position: absolute;
  left: 770px;
  top: 1250px;

}

.carta2 {

  position: absolute;
  left: 1370px;
  top: 1250px;


}

.carta3 {

  position: absolute;
  left: 1970px;
  top: 1250px;

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
  overflow: hidden;
}

.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  /* Ajusta según sea necesario */
  -webkit-box-orient: vertical;
}

.full-text {
  overflow: visible;
  display: block;
}

.leer-mas {
  cursor: pointer;
  color: blue;
}
</style>
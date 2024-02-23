<template>
  <v-card class="mx-auto" max-width="890" elevation="15">
    <v-img
      src="https://img.freepik.com/vector-premium/conexion-humana-red-social-fondo-concepto-tecnologia-comunicacion-digital_618588-965.jpg"
      height="350px"></v-img>

    <v-card-title class="crear"> Crear Usuario </v-card-title>
    <br>
    <hr>


    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <div class="nombre">
          <center>
            <v-text-field class="c" v-model="paquete.nombre" :rules="nameRules" label="Nombre" required>
            </v-text-field>
          </center>
        </div>
        <br>
        <div class="apellido">
          <center>
            <v-text-field class="c" v-model="paquete.apellido" :rules="nameRules" label="Apellido" required>
            </v-text-field>
          </center>
        </div>
        <br>
        <div class="cedula">
          <center><v-text-field class="c" v-model="paquete.cedula" :counter="10" :rules="nameRules" label="Cedula"
              required>
            </v-text-field>
          </center>

        </div>
        <div class="telefono">
          <center>
            <v-text-field class="c" v-model="paquete.telefono" :rules="nameRules" label="Telefono" required>
            </v-text-field>
          </center>
        </div>
        <br>
        <div class="email">
          <center>
            <v-text-field class="c" v-model="paquete.email" :rules="nameRules" label="Email" required>
            </v-text-field>
          </center>
        </div>

        <div class="ron">
          <center>
            <v-select class="c" v-model="paquete.roles" :items="items" item-text="descripcion" item-value="id"
              :rules="[(v) => !!v || 'Campo requerido']" label="Rol" required>
            </v-select>
          </center>
        </div>



        <center>
          <v-btn color="primary" class="mr-4" @click="enviar()"> Guardar </v-btn>

          <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
        </center>


      </v-form>
      <br>
      <br>
    </v-card-text>
  </v-card>
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data: () => ({
    paquete: {
      cedula: null,
      nombre: null,
      apellido: null,
      telefono: null,
      email: null,
      estadoDelUsuario: 1,
      roles: null
    },
    valid: true,
    nameRules: [(v) => !!v || "Campo requerido"],
    items: ["Instructor", "Administrador"],
    checkbox: false,

  }),

  methods: {
  
    enviar() {
      if (this.$refs.form.validate()) {
        axios.post('http://localhost:62000/usuarios/crear', this.paquete)
          .then((response) => {

            console.log(response);
            Swal.fire(
              'Usuario creado exitosamente!','','success'
            );
           

            console.log(response)
            Swal.fire(
              'Usuario creado exitosamente!',
              '',
              'success'
            ),
            this.limpiarDatos();
            this.$refs.form.resetValidation();

          })
          
          .catch((error) => {
            console.log(error);
          })
          .finally(function () {
          });
      }
    },
    async limpiarDatos(){
      this.paquete.cedula= null,
      this.paquete.nombre= null,
      this.paquete.apellido= null,
      this.paquete.telefono= null,
      this.paquete.email= null,
      this.paquete.estadoDelUsuario= null,
      this.paquete.roles=null;
    },

  },
  
  async mounted() {

    axios.get('http://localhost:62000/roles/obtener').then(response => {
      console.log(response.data);
      if (response.data.length > 0) {
        console.log(response.data)
        this.items = response.data;
        console.log('aqui', this.items)
      }
    });

  },



};
</script>


<style scoped>
.mx-auto {
  margin-top: 10%;
}

.crear {
  font-family: Righteous;
  font-size: 40px;

  margin-left: 300px;

}

.cedula {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  margin-left: 5%;
  margin-bottom: 30px;

}

.nombre {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  margin-left: 5%;


}

.apellido {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  position: absolute;
  left: 470px;
  bottom: 393px;

}

.telefono {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  position: absolute;
  left: 470px;
  bottom: 277px;
}

.email {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  margin-left: 5%;
  margin-bottom: 50px;
}

.ron {
  width: 40%;
  border: 3px solid rgb(172, 172, 172);
  border-radius: 4pc;
  position: absolute;
  left: 470px;
  bottom: 147px;
}

.c {
  width: 50%;

}
</style>
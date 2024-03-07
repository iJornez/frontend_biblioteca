<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="4">
        <v-card class="elevation-10">
          <v-card-title class="text-h5 grey--text text--darken-1">Crear Usuario</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="paquete.nombre" label="Nombre" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field v-model="paquete.apellido" label="Apellido" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="paquete.cedula" label="Cédula" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="paquete.telefono" label="Teléfono" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="paquete.email" label="Email" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="paquete.password" label="Contraseña" type="password" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select v-model="paquete.roles" :items="items" item-text="descripcion" item-value="id" label="Rol" outlined required></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-row  justify="center">
                <v-btn color="green" @click="enviar()">Guardar</v-btn>
                <span style="margin-left: 10px;"></span>
                <v-btn color="gray" @click="resetValidation">Cancelar</v-btn>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      estadoDelUsuario:1,
      password: null,
      roles: null
    },
    valid: true,
    items: []
  }),

  methods: {
    async enviar() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:62000/usuarios/register', this.paquete);
          console.log(response);
          Swal.fire('Usuario creado exitosamente!', '', 'success');
          this.limpiarDatos();
          this.$refs.form.resetValidation();
        } catch (error) {
          console.error(error);
        }
      }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    limpiarDatos() {
      this.paquete = {
        cedula: null,
        nombre: null,
        apellido: null,
        telefono: null,
        email: null,
        password: null,
        roles: null
      };
    },
    async obtenerRoles() {
      try {
        const response = await axios.get('http://localhost:62000/roles/obtener');
        console.log(response.data);
        this.items = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },

  mounted() {
    this.obtenerRoles();
  }
};
</script>

<style scoped>
.mx-auto {
  margin-top: 50px; /* Centra el formulario verticalmente */
}

.card-title {
  font-family: 'Arial', sans-serif;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px; /* Espacio entre el título y el resto del contenido */
}

.card {
  max-width: 600px; /* Ancho máximo del formulario */
  margin: 0 auto; /* Centra el formulario horizontalmente */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

.form-field {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.input-field:focus {
  outline: none;
  border-color: #6c63ff; /* Cambia el color del borde al enfocar */
}

.btn-container {
  display: flex;
  justify-content: center;
}

</style>


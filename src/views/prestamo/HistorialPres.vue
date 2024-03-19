<template>
  <v-card style="margin-top: 200px;" class="mx-auto" max-width="900px" elevation="15">
    <div width="100px" class="color">

      <center><v-img src="../../assets/images/config_usuario.png" width="15rem" height="15rem"></v-img></center>


      <br>

      <center>
        <h1 class="crear"> PRESTAMOS </h1>
      </center>



      <hr>

    </div>



    <v-data-table :headers="headers" :items="prestamos" class="elevation-15" :hide-default-footer="true">

      <template v-slot:item.fecha_prestamo="{ item }">
        {{ formatearFechas(item.fecha_prestamo) }}
      </template>

      <template v-slot:item.fecha_devolucion="{ item }">
        {{ formatearFechas(item.fecha_devolucion) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <center>
          <v-icon small class="mr-2" @click="AbrirDetalles(item)">
            info
          </v-icon>
        </center>
      </template>



    </v-data-table>


    <v-dialog v-model="dialog" max-width="500px">

      <v-card>
        <v-card-text>

          <v-container>

            <v-row>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="paqueteDelDetalle.telefonica" label="Serial de telefonia" disabled dense
                  outlined></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="paqueteDelDetalle.marca" label="Marca" dense outlined disabled></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="paqueteDelDetalle.serial" label="Serial" dense outlined disabled></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="paqueteDelDetalle.tipo" label="Tipo" dense outlined disabled></v-text-field>
              </v-col>


            </v-row>

          </v-container>

        </v-card-text>

        <v-card-actions>

          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>


  </v-card>
</template>

<script>

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
  data() {

    return {

      dialog: false,
      headers: [
        { text: 'Cedula', value: 'usuario.cedula' },
        { text: 'Nombre', value: 'usuario.nombre' },
        { text: 'Apellido', value: 'usuario.apellido' },
        { text: 'Fecha de Inicio', value: 'fecha_prestamo' },
        { text: 'Fecha de Fin', value: 'fecha_devolucion' },
        { text: 'Estado', value: 'estado_prestamo.Estado' },
        { text: 'Detalle del prestamo', value: 'actions', sortable: false },
      ],
      items: [],
      datos: [],
      prestamos: [],
      detallesPrestamo: [],
      datosUsuario: {
        cedula: '',
        nombre: ''
      },
      paqueteDelDetalle: {
        telefonica: null,
        marca: null,
        serial: null,
        estado: null,
        tipo: null,
      }
    }
  },


  methods: {
    async prestamosDelUsuario() {
      const cedula = this.datosUsuario.cedula;
      await axios.get(`http://localhost:62000/prestamos/obtener_prestamo/${cedula}`).then(response => {
        this.prestamos = response.data;

        this.prestamos.forEach(prestamo => {
          prestamo.prestamo_detalle.forEach(detalle => {
            const detallePrestamo = {
              serial: detalle.equipo.serial,
              marca: detalle.equipo.marca,
              telefonica: detalle.equipo.telefonica,
              fechaInicio: detalle.fecha_prestamo,
              fechaFin: detalle.fecha_devolucion,
              tipoEquipo: detalle.equipo.tipo.tipo,
              estadoPrestamo: prestamo.estado_prestamo.Estado,
              idEstadoPrestamo: prestamo.estado_prestamo.id,
              idPrestamo: prestamo.id
            };
            this.detallesPrestamo.push(detallePrestamo);
          });
        });
        console.log('Detalles del prestamo', this.detallesPrestamo);
        console.log('Cantidad de equipos prestados', this.detallesPrestamo.length);
        console.log('Prestamo en general', this.prestamos);
      })
    },

    AbrirDetalles(item) {
      const detalle = this.detallesPrestamo.find(detalle => detalle.idPrestamo === item.id);
      if (detalle) {
        this.paqueteDelDetalle.telefonica = detalle.telefonica;
        this.paqueteDelDetalle.marca = detalle.marca;
        this.paqueteDelDetalle.serial = detalle.serial;
        this.paqueteDelDetalle.estado = detalle.idEstadoPrestamo;
        this.paqueteDelDetalle.tipo = detalle.tipoEquipo;
        this.dialog = true;
      } else {
        console.log('No se encontró el detalle del prestamo correspondiente');
      }
    },

    formatearFechas(date) {
      const Fechasformateadas = new Date(date).toLocaleString();
      return Fechasformateadas;
    },
  },

  mounted() {
    const token = this.$store.getters.usuario.access_token;
    const tokenDecodified = jwtDecode(token);
    this.datosUsuario = {
      cedula: tokenDecodified.cedula,
      nombre: tokenDecodified.nombre
    };
    this.prestamosDelUsuario();
  },


}






</script>


<style scoped>
.crear {
  font-family: Righteous;
  font-size: 40px;
  color: white;

}

.color {
  /* Permalink - use to edit and share this gradient. Enlace permanente - úsalo para editar y compartir este gradiente: https://colorzilla.com/gradient-editor/#1e5799+0,207cca+44,2989d8+50 */
  background: linear-gradient(135deg, rgba(30, 87, 153, 1) 0%, rgba(32, 124, 202, 1) 44%, rgba(41, 137, 216, 1) 50%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

}
</style>

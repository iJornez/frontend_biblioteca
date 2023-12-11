<template>
  <div style="margin-bottom: 150px;">
    <v-card elevation="15" class="mx-auto" max-width="900" style="margin-top: 70px;">

      <v-card-title> Registrar Prestamo</v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-select v-model="paquete.usuario" :rules="[v => !!v || 'campo requerido']" :items="usuarios"
                item-value="cedula" item-text="nombre" label="Usuario" required></v-select>
            </v-col>

            <v-col cols="6">
              <v-select v-model="paquete.tipo" :rules="[v => !!v || 'campo requerido']" :items="tipoEquipo"
                item-value="id" item-text="tipo" label="Tipo" required></v-select>
            </v-col>



            <v-col cols="6">
              <v-select v-model="paquete.cantidad" :items="cantidadOptions" label="Cantidad"
                :rules="[v => !!v || 'campo requerido']"></v-select>
            </v-col>


            <v-col cols="6">
              <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="paquete.fechainicio" label="fecha inicio" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="paquete.fechainicio" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    Ok
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-col>

            <v-col cols="6">
              <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="date"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="paquete.fechafinal" label="fecha final" prepend-icon="mdi-calendar" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="paquete.fechafinal" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu1.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

            </v-col>

          </v-row>

          <v-row>

            <v-col cols="6">
              <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="paquete.horaInicio" label="Hora Inicio" prepend-icon="mdi-clock" readonly
                    v-bind="attrs" v-on="on" format="HH:mm"></v-text-field>
                </template>
                <v-time-picker v-model="paquete.horaInicio" no-title></v-time-picker>
              </v-menu>
            </v-col>


            <v-col cols="6">
              <v-menu ref="menu4" v-model="menu4" :close-on-content-click="false" transition="scale-transition" offset-y
                min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="paquete.horaFinal" label="Hora Final" prepend-icon="mdi-clock" readonly
                    v-bind="attrs" v-on="on" format="HH:mm"></v-text-field>
                </template>
                <v-time-picker v-model="paquete.horaFinal" no-title></v-time-picker>
              </v-menu>
            </v-col>

          </v-row>

          <br>
          <center>
            <v-btn class="mx-2" fab dark color="primary" @click="almacenar">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>


          </center>
        </v-form>
      </v-card-text>

    </v-card>
    <br>
    <br>
    <center>
      <v-card v-if="MostrarTabla" class="" elevation="15" max-width="900">
        <v-data-table :headers="headers" :items="datosPreGuardados" :items-per-page="5" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="abrirEliminar(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            Sin prestamos almacenados
          </template>
        </v-data-table>
      </v-card>
    </center>
    <v-dialog v-model="dialogEliminar" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Confirmación de eliminación</span>
        </v-card-title>
        <v-card-text>
          ¿Estás seguro de que quieres eliminar este elemento?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="closeDelete()">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="deleteItem()">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" :scrim="false" persistent width="auto">
      <v-card color="primary">
        <v-card-text style="color: aliceblue;">
          ¡Espere un momento, por favor!
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <br>
    <br>
    <center>
      <div class="botones ">
        <v-btn class="registrar" v-if="MostrarTabla" :disabled="dialog" :loading="dialog" color="primary" @click="enviar">
          Registrar
        </v-btn>

        <v-btn class="cancelar" v-if="MostrarTabla" color="error" @click="resetValidation"> Cancelar </v-btn>
      </div>
    </center>





  </div>
</template>
  
  
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data: () => ({
    datosPreGuardados: [],
    dialogEliminar: false,
    MostrarTabla: false,
    dialog: false,
    headers: [
      { text: 'Tipo', value: 'tipo' },
      { text: 'Cantidad', value: 'cantidad' },
      { text: 'Usuario', value: 'usuario' },
      { text: 'Fecha inicio', value: 'fechainicio' },
      { text: 'Fecha final', value: 'fechafinal' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    paquete: {
      tipo: null,
      cantidad: null,
      usuario: null,
      fechainicio: null,
      fechafinal: null,
      horaInicio: null,
      horaFinal: null,
    },


    valid: true,

    nameRules: [
      v => !!v || 'Campo requerido',
    ],

    estadosEquipo: [],
    tipoEquipo: [],
    usuarios: [],
    cantidadOptions: Array.from({ length: 20 }, (_, index) => index + 1),
    horaInicioMenu: false,
    horaFinalMenu: false,
    checkbox: false,
  }),

  methods: {
    async enviar() {
      if (this.datosPreGuardados.length === 0) {
        Swal.fire('No ha almacenado un prestamo', '', 'error');
        return;
      }
      this.dialog = true;
      const fechaInicioCompleta = new Date(`${this.datosPreGuardados[0].fechainicio} ${this.datosPreGuardados[0].horaInicio}`);
      const fechaFinalCompleta = new Date(`${this.datosPreGuardados[0].fechafinal} ${this.datosPreGuardados[0].horaFinal}`);
      const cedulaUsuario = this.datosPreGuardados[0].usuario;
      const paquetePrestamo = {
        fecha_prestamo: fechaInicioCompleta,
        fecha_devolucion: fechaFinalCompleta,
        usuario: cedulaUsuario,
        estado_prestamo: 1,
        detalle: [
          {
            tipo: this.datosPreGuardados[0].tipo,
            cantidad: this.datosPreGuardados[0].cantidad,
          }
        ]
      };

      await axios.post('http://localhost:62000/prestamos/crear', paquetePrestamo)
        .then(response => {
          console.log(response);
          setTimeout(() => {
            this.dialog = false;
            Swal.fire('', '¡Préstamo registrado con éxito!', 'success');
          }, 2500);
          this.VaciarStorage();
        })
        .catch(error => {
          setTimeout(() => {
            this.dialog = false;
            if (error.response && error.response.data === 'vacio') {
              Swal.fire('No hay equipos disponibles en las fechas seleccionadas', '', 'error');
            } else {
              Swal.fire('', 'No se pudo guardar el préstamo. ' + error, 'error');
            }
          }, 2500)
        });
    },

    async limpiarDatos() {
      this.paquete.tipo = null;
      this.paquete.cantidad = null;
      this.paquete.usuario = null;
      this.paquete.fechainicio = null;
      this.paquete.fechafinal = null;
      this.paquete.horaInicio = null;
      this.paquete.horaFinal = null;
    },



    async almacenar() {
      if (this.$refs.form.validate()) {
        this.MostrarTabla = true;
        const nuevoDato = {
          tipo: this.paquete.tipo,
          cantidad: this.paquete.cantidad,
          usuario: this.paquete.usuario,
          fechainicio: this.paquete.fechainicio,
          fechafinal: this.paquete.fechafinal,
          horaInicio: this.paquete.horaInicio,
          horaFinal: this.paquete.horaFinal,
        };

        this.datosPreGuardados.push(nuevoDato);

        localStorage.setItem('datosPreGuardados', JSON.stringify(this.datosPreGuardados));
        localStorage.setItem('mostrarTabla', JSON.stringify(this.MostrarTabla));
        this.limpiarDatos();
        this.$refs.form.resetValidation();

        this.menu1 = false;
        this.menu2 = false;
        this.menu3 = false;
        this.menu4 = false;
      }
    },

    cargarDatosGuardados() {
      const datosGuardados = localStorage.getItem('datosPreGuardados');
      if (datosGuardados) {
        this.datosPreGuardados = JSON.parse(datosGuardados);
      }
    },

    async abrirEliminar() {
      this.dialogEliminar = true;
    },

    async VaciarStorage() {
      localStorage.clear();
    },

    async deleteItem() {
      this.VaciarStorage();
      this.closeDelete();
    },

    closeDelete() {
      this.dialogEliminar = false;
    },

    async listarEstados() {
      await axios.get('http://localhost:62000/estadoequipo/obtener').then(resp => {
        this.estadosEquipo = resp.data;
      });
    },

    async listarTipo() {
      await axios.get('http://localhost:62000/tipos_equipos/obtener').then(resp => {
        this.tipoEquipo = resp.data;
      });
    },

    async listarUsuarios() {
      await axios.get('http://localhost:62000/usuarios/obtener').then(resp => {
        this.usuarios = resp.data;
      });
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
      if (!val) return

      setTimeout(() => (this.dialog = false), 2500)
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    this.listarEstados();
    this.listarTipo();
    this.cargarDatosGuardados();
    this.listarUsuarios();
    const mostrarTablaGuardado = localStorage.getItem('mostrarTabla');
    if (mostrarTablaGuardado) {
      this.MostrarTabla = JSON.parse(mostrarTablaGuardado);
    }
  },

  cancelDateSelection() {
    this.menu = false;
  },


  saveDateSelection() {
    this.$refs.menu.save(this.date);
    this.menu = false;

  },
}

</script>
  
<style scoped>
.botones {

  width: 25%;
}

.registrar {
  float: left;
}

.cancelar {
  float: right;
}</style>
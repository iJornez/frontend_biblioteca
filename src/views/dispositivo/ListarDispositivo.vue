<template>
  <div style="width:1700px; margin-left:20%; margin-top:200px;">
    <v-toolbar dark prominent elevation="15" style="background: linear-gradient(135deg,#20901A, #46B838, #81E746);">


      <v-toolbar-title style="color: black;">LISTADO DE DISPOSITIVOS</v-toolbar-title>




    </v-toolbar>
    <v-file-input v-model="paquete.excel" counter show-size truncate-length="18"></v-file-input>
    <v-btn color="primary" @click="subirmasivo">
      Enviar
    </v-btn>
    <br>
    <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="abrirEliminar(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editElement.codigo" label="Codigo" disabled dense outlined></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editElement.descripcion" label="Referencia" dense outlined></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editElement.serial" label="Serial" dense outlined></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="editElement.telefonica" label="Serial-telefonica" dense outlined></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editElement.estado" :items="estadosEquipo" item-text="estado" item-value="id"
                  label="Estado" required dense outlined></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select v-model="editElement.tipo" :items="tipoEquipo" item-text="tipo" item-value="id" label="Tipo"
                  required dense outlined></v-select>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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



  </div>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  data: () => ({
    originalElement: {},
    dialog: false,
    dialogEliminar: false,
    search: '',
    codigoDelete: null,
    editElement: {
      codigo: null,
      descripcion: null,
      serial: null,
      telefonica: null,
      estado: null,
      tipo: null
    },
    headers: [
      {
        align: 'start',
        filterable: false,
        sortable: false,
        value: 'id',
      },
      { text: 'Codigo', value: 'codigo' },
      { text: 'Referencia', value: 'descripcion' },
      { text: 'Serial', value: 'serial' },
      { text: 'Serial-telefonica', value: 'telefonica' },
      { text: 'Estado', value: 'estado.estado' },
      { text: 'Tipo', value: 'tipo.tipo' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    datos: [],
    tipoEquipo: [],
    estadosEquipo: [],
    checkbox: false,
    paquete:{
      excel: null
    }

  }),


  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async mounted() {
    await this.listarEquipo();
  },

  methods: {
    async listarEquipo() {
      var vm = this
      await axios.get('http://localhost:62000/equipos/obtener')
        .then(function (response) {
          vm.datos = response.data
          console.log(vm.datos)
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      this.listarTiposEquipos();
      this.listarEstados();
    },

    async deleteItem() {
      await axios.delete('http://localhost:62000/equipos/' + this.codigoDelete).then(async (resp) => {
        console.log(resp.data);
        await this.listarEquipo();
        this.dialogEliminar = false;
        Swal.fire(
          'Equipo eliminado con exito!',
          '',
          'success'
        );
      });
    },

    async subirmasivo(){
      await axios.postForm('http://localhost:62000/equipos/subirMasivo', this.paquete).then(resp => {
        console.log(resp.data);
      })
    },

    async listarEstados() {
      await axios.get('http://localhost:62000/estadoequipo/obtener').then(resp => {
        this.estadosEquipo = resp.data;
      });
    },

    async listarTiposEquipos() {
      await axios.get('http://localhost:62000/tipos_equipos/obtener').then(resp => {
        this.tipoEquipo = resp.data;
      });
    },

    async save() {
      try {
        await axios.put('http://localhost:62000/equipos/actualizar/', this.editElement).then(() => {
          this.dialog = false;
        });
        await this.listarEquipo();

      }
      catch (error) {
        this.dialog = false;
        alert(error);
      }


    },
    abrirEliminar(item) {
      this.dialogEliminar = true;
      this.codigoDelete = item.codigo;
    },
    editItem(item) {
      console.log(item)
      this.dialog = true
      this.editElement = item;
      this.editElement = { ...item };
      this.originalElement = item;
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.editElement = { ...this.originalElement };
      })
    },

    closeDelete() {
      this.dialogEliminar = false;
    },

  },


}






</script>

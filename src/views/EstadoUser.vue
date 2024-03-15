<template>
    <v-card style="margin-top: 200px;" class="mx-auto" max-width="900px" elevation="15">
        
        <div width="100px" class="color">

            <v-img src="../assets/images/config_usuario.png" height="auto"></v-img>


            <br>

            <center>
                <h1 class="crear"> Estado del usuario</h1>
            </center>



            <hr>

        </div>



        <v-data-table :headers="headers" :items="datos" :items-per-page="5" class="elevation-1">
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
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
                                <v-text-field v-model="editElement.cedula" label="Cedula"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editElement.nombre" label="Nombre"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editElement.apellido" label="Apellido"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editElement.telefono" label="Telefono"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editElement.email" label="Email"></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="editElement.estadoDelUsuario" :items="estadosEquipo"
                                    item-text="estado" item-value="id" label="Estado" required dense></v-select>
                            </v-col>

                            <v-col cols="12" sm="6" md="4">
                                <v-select v-model="editElement.roles" :items="Roles" item-text="descripcion"
                                    item-value="id" label="Roles" required></v-select>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-card>
</template>

<script>

import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {

        return {
            originalElement: {},
            dialog: false,
            dialogEliminar: false,
            search: '',
            codigoDelete: null,
            editElement: {
                cedula: null,
                nombre: null,
                apellido: null,
                telefono: null,
                email: null,
                estadoDelUsuario: null,
                roles: null
            },
            headers: [
                {
                    align: 'start',
                    filterable: false,
                    sortable: false,
                    value: 'id',
                },
                { text: 'Cedula', value: 'cedula' },
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellido', value: 'apellido' },
                { text: 'Telefono', value: 'telefono' },
                { text: 'Email', value: 'email' },
                { text: 'Estado', value: 'estadoDelUsuario.estado' },
                { text: 'Rol', value: 'roles.descripcion' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            items: [],
            datos: [],
            estadosUsuario: [],
        }
    },
    Roles: [],
    estadosEquipo: [],
    checkbox: false,

    watch: {
        dialog(val) {
            val || this.close()
        },
    },


    async mounted() {
        await this.listarUsuarios();
        await this.traerEstadosUsuario();
        await this.traerRoles();
    },



    methods: {
        async listarUsuarios() {
            var vm = this
            await axios.get('http://localhost:62000/usuarios/obtener')
                .then(function (response) {
                    vm.datos = response.data
                    console.log(vm.datos)
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                });

        },

        editItem(item) {
            console.log(item)
            this.dialog = true
            this.editElement = {
                cedula: item.cedula,
                nombre: item.nombre,
                apellido: item.apellido,
                telefono: item.telefono,
                email: item.email,
                estadoDelUsuario: item.estadoDelUsuario.id,
                roles: item.roles.id
            };
            // this.editElement = { ...item };
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


        async traerEstadosUsuario() {
            await axios.get('http://localhost:62000/estado-usuario/obtener/',).then(resp => {
                this.estadosEquipo = resp.data;
            });
        },

        async traerRoles() {
            await axios.get('http://localhost:62000/roles/obtener/',).then(resp => {
                this.Roles = resp.data;
            });
        },

        async save() {
            const cedula = this.editElement.cedula;
            try {
                await axios.put(`http://localhost:62000/usuarios/actualizar/${cedula}`, this.editElement).then(() => {
            
                    Swal.fire(
                        '',
                        '',
                        'success'
                    )

                    this.dialog = false;

                }).catch(error => {
                    console.log(error);
                    Swal.fire(
                        '',
                        '' + error,
                        'error'
                    )
                })
                await this.listarUsuarios();

            }
            catch (error) {
                Swal.fire(
                    '' + error,
                    '',
                    'error'
                )
                this.dialog = false;
            }


        }

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
    background: linear-gradient(135deg,#20901A, #46B838, #81E746);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

}
</style>
 
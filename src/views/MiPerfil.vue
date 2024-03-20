<template>
    <v-card style="margin-top: 200px;" class="mx-auto" max-width="700px" elevation="15">

        <div width="100px" class="color">




            <br>

            <center>
                <h1 class="crear"> Mi perfil</h1>
            </center>



            <hr>
            <div style="width: 70%; margin-left: 15%">
                <v-row>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="usuario.nombre" label="Nombre" outlined></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="usuario.apellido" label="Apellido" outlined></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="usuario.telefono" label="Telefono" outlined></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="usuario.email" label="Email" outlined></v-text-field>
                    </v-col>


                </v-row>
            </div>


        </div>






        <v-dialog v-model="dialog" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>

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
import { jwtDecode } from 'jwt-decode';
export default {
    data() {

        return {
            originalElement: {},
            dialog: false,
            dialogEliminar: false,
            search: '',
            codigoDelete: null,
            cedula: null,
            usuario:{
                nombre:null,
                apellido:null,
                telefono:null,
                email:null
            }
        }
    },
    checkbox: false,
    watch: {
        dialog(val) {
            val || this.close()
        },
    },


    async mounted() {
        const token = this.$store.getters.usuario.access_token;
        const tokenDecodified = jwtDecode(token);
        this.cedula = tokenDecodified.cedula;
        console.log(this.cedula);
        console.log(tokenDecodified);
        await this.traerusuario();

    },



    methods: {
        traerusuario() {
            const cedula = this.cedula;
            axios.get(`http://localhost:62000/usuarios/obtener_usuario/${cedula}`).then(res => {
                const datosUsuario = res.data;
                this.usuario=datosUsuario; 
                console.log(this.usuario);
            })
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                this.editElement = { ...this.originalElement };
            })
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
    background: linear-gradient(135deg, #20901A, #46B838, #81E746);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

}
</style>
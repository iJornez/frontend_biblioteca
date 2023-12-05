<template>
    <div>
        <v-card class="mx-auto" max-width="890" elevation="15" style="margin-top: 50px;">
            <v-card-title class="crear" style="margin-left: 37%;">
                <h3> Devolucion de Equipos </h3>
            </v-card-title>

            <hr>
            <br>
            <v-card-text>
                <v-row>
                    <v-col cols="10">
                        <v-autocomplete v-model="cedulaSeleccionada" dense filled rounded solo class="buscar"
                            :no-data-text="'No hay resultados'" :items="cedulauser" item-text="cedula" item-value="cedula"
                            label="CEDULA">
                        </v-autocomplete>
                    </v-col>

                    <v-col cols="2">
                        <v-btn class="mx-6" width="50px" style="margin-top: -8px;" height="50px" fab dark large
                            color="primary" @click="buscar">
                            <v-icon dark>
                                search
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>



        </v-card>
        <br>
        <br>

        <v-card class="mx-auto" max-width="890" v-if="tablaPrestamo" elevation="15">
            <hr>
            <center>
                <h5>Prestamos</h5>
            </center>
            <v-container>
                <v-data-table :headers="headers" :items="DetallesPrestamos" class="tbl">
                    <template v-slot:item.codigo="{ item }">
                        {{ item.codigo }}
                    </template>
                    <template v-slot:item.fechaInicio="{ item }">
                        {{ formatearFechas(item.fechaInicio) }}
                    </template>
                    <template v-slot:item.fechaFin="{ item }">
                        {{ formatearFechas(item.fechaFin) }}
                    </template>
                    <template v-slot:item.tipoEquipo="{ item }">
                        {{ item.tipoEquipo }}
                    </template>

                    <template v-slot:item.serial="{ item }">
                        {{ item.serial }}
                    </template>

                    <template v-slot:item.estadoEquipo="{ item }">
                        {{ item.estadoEquipo }}
                    </template>

                    



                    <template>
                        <v-select class="select"></v-select>
                    </template>



                    <template v-slot:item.accion="" v-slot:activator="{ on, attrs }">
                        <v-icon small class="mr-2" v-on="on" v-bind="attrs"
                            @click="dialog = true">mdi-text-box-search</v-icon>
                    </template>

                </v-data-table>

            </v-container>
            <br>

        </v-card>
        <br>
        <br>
        <div class="text-center" v-if="tablaPrestamo">
            <v-dialog v-model="dialog" width="500">


                <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                        Privacy Policy
                    </v-card-title>

                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="dialog = false">
                            I accept
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>

                            <v-col cols="12">
                                <v-select v-model="estadosDelPrestamo.estadoEquipo" :items="estadosDelPrestamo"
                                    item-text="Estado" item-value="id" label="Estado" required dense outlined></v-select>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="confirmarEdit">
                        Confirmar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
      
<script>
import axios from 'axios';
import Swal from "sweetalert2";
export default {
    data: () => ({




        headers: [
            { text: 'Código', value: 'codigo' },
            { text: 'Fecha Inicio', value: 'fechaInicio' },
            { text: 'Fecha Fin', value: 'fechaFin' },
            { text: 'Tipo', value: 'tipoEquipo' },
            { text: 'Serial', value: 'serial' },
            { text: 'Estado', value: 'estadoEquipo' },
            { text: 'Bueno', value: 'bueno' },
            { text: 'Malo', value: 'malo' },
            { text: 'Descripcion', value: 'accion' },
        ],
        data: [],
        tablaPrestamo: false,
        tablaDetalle: false,
        dialog: false,
        cedulaSeleccionada: null,
        cedulauser: [],
        DetallesPrestamos: [],
        estadosDelPrestamo: [],
        prestamos: [],

    }),
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    methods: {


        async buscar() {
            if (this.cedulaSeleccionada) {
                try {
                    const response = await axios.get('http://localhost:62000/prestamos/obtener_prestamo/' + this.cedulaSeleccionada);
                    this.prestamos = response.data;
                    if (this.prestamos.length === 0) {
                        this.tablaDetalle = false;
                        this.cedulaSeleccionada = null;
                        Swal.fire('La cedula seleccionada no tiene prestamos asignados!', '', 'error');
                    } else {
                        this.tablaPrestamo = true;
                        this.prestamos.forEach(prestamo => {
                            prestamo.prestamo_detalle.forEach(detalle => {
                                const detallePrestamo = {
                                    codigo: detalle.equipo.codigo,
                                    serial: detalle.equipo.serial,
                                    fechaInicio: detalle.fecha_prestamo,
                                    fechaFin: detalle.fecha_devolucion,
                                    tipoEquipo: detalle.equipo.tipo.tipo,
                                    estadoEquipo: prestamo.estado_prestamo.Estado
                                };
                                this.DetallesPrestamos.push(detallePrestamo);
                            });
                        });
                        console.log(this.DetallesPrestamos);
                    }
                } catch (error) {
                    console.error('Error al obtener detalles de préstamo:' + error);
                    Swal.fire('Error al obtener detalles de préstamo', '' + error, 'error');
                }

               
            } else {
                Swal.fire('No ha seleccionado una cedula', '', 'error');
            }


        },

        async prestamocedula() {
            await axios.get('http://localhost:62000/usuarios/obtener').then(resp => {
                this.cedulauser = resp.data;
                if (this.cedulauser.length > 0) {
                    this.cedulaSeleccionada = this.cedulauser.cedula;
                }
            });
        },
        async estadosprestamos() {
            await axios.get('http://localhost:62000/estadoprestamo/obtener').then(resp => {
                this.estadosDelPrestamo = resp.data;
                console.log(this.estadosDelPrestamo);
            });
        },

        

        MostrarDetalles() {
            this.tablaDetalle = true;
        },

        EditarEstado() {
            this.dialog = true;
        },
        cancel() {
            this.dialog = false;
        },
        async confirmarEdit() {
        },
        formatearFechas(date) {
            const Fechasformateadas = new Date(date).toLocaleString();
            return Fechasformateadas;
        },

    },
    mounted() {
        this.prestamocedula();
        this.estadosprestamos();
    },
};
</script>
      
<style scoped>
.mx-auto {
    font-family: 'Arial Narrow', Arial, sans-serif
}

.buscar {
    margin-left: 20px;

}

.mi-input {

    border: 2px solid #a3a3a3;
    border-radius: 5px;
    padding-right: 20px;
}

.mi-boton-nuevo {
    margin-bottom: 20px;
    margin-right: 400px;
    background-color: #276fae;
    color: #ffffff;
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 60px;

}

.mi-boton-nuevo2 {
    background-color: rgb(10, 129, 66);
    color: #ffffff;
    padding: 5px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-left: 80%;
    font-size: 20px;
}

h5 {
    padding: 0px 20px;

}

.tbl {
    background-color: #f2f2f2;
}
</style>  
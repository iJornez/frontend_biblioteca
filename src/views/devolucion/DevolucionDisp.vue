<template>
    <div style="margin-top: 200px;">

        <v-card class="mx-auto" max-width="890" elevation="15"
            style="margin-top: 50px;  border: 5px solid green ; border-radius:20px;">
            <v-card-title class="crear" style="margin-left: 37%; ">
                <h3> Devolucion de Equipos </h3>
            </v-card-title>
            <hr>
            <br>

            <v-card-text>
                <v-row>
                    <v-col cols="10">

                        <v-autocomplete v-model="cedulaSeleccionada" dense filled rounded solo class="buscar"
                            :no-data-text="'No hay resultados'" :items="cedulauser" item-text="cedula"
                            item-value="cedula" label="CEDULA">
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


        <v-card style=" border: 5px solid green ; border-radius:20px;" class="mx-auto" max-width="890"
        v-if="tablaPrestamo" elevation="15">
        <br>
        <center>
            <h5>Prestamos</h5>
        </center>
        <hr>
        <v-container>

            <v-data-table :headers="headers" :no-data-text="'No hay equipos para devolver'"
                :items="prestamos" :hide-default-footer="true" class="tbl">

                <template v-slot:item.id="{ item }">
                    {{ item.id }}
                </template>

                <template v-slot:item.fechaInicio="{ item }">
                    {{ formatearFechas(item.fecha_prestamo) }}
                </template>

                <template v-slot:item.fechaFin="{ item }">
                    {{ formatearFechas(item.fecha_devolucion) }}
                </template>

                <template v-slot:item.accion="{ item }">
                    <v-icon small class="mr-2" v-on="on" v-bind="attrs"
                        @click="MostrarDetalles(item)">reviews</v-icon>
                </template>

            </v-data-table>

        </v-container>

        <br>
    </v-card>
    <br>
    <br>


    <v-card class="mx-auto" max-width="890" v-if="tablaDetalle" elevation="15"
    style="border: 5px solid green ; border-radius:20px;">
    <hr>
    <center>
        <h5>Detalle de devolucion</h5>
    </center>
    <v-container>

        <v-data-table :headers="headersDetalle" :items="detalleSeleccionado" class="tbl"
            :hide-default-footer="true">

            <template v-slot:item.codigo="{ item }">
                {{ item.codigo }}
            </template>

            <template v-slot:item.tipoEquipo="{ item }">
                {{ item.tipoEquipo }}
            </template>

            <template v-slot:item.serial="{ item }">
                {{ item.serial }}
            </template>

            <template v-slot:item.accion="{ item }">
                <v-icon small class="mr-2" v-on="on" v-bind="attrs"
                    @click="MostrarDialogoObservacion(item)">reviews</v-icon>
            </template>



        </v-data-table>

        <v-dialog v-model="dialogActualizar" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Confirmación de cambio</span>
                </v-card-title>
                <v-card-text>
                    ¿Estás seguro de que quieres cambiar el estado de este prestamo?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="closeAceptar()">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" :disabled="dialogProgreso" :loading="dialogProgreso" text
                        @click="ActualizarItem()">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

    <br>
    <center>

    </center>
    <br>
    <br>
</v-card>




        <v-dialog v-model="dialog" max-width="500px">
            <v-card>

                <v-card-title>
                    <span class="text-h5">Devolucion de Equipo</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select v-model="estadoSeleccionado" @change="mostrarObservacion" :items="items"
                                    item-text="estado" item-value="id" :rules="[(v) => !!v || 'Campo requerido']"
                                    label="Estado" required>
                                </v-select>
                            </v-col>
                        </v-row>

                        <v-row v-if="mostrarCampoDeObservacion">
                            <v-col cols="12">
                                <v-textarea :rules="nameRules" clearable style="width: 400px;" variant="solo"
                                    v-model="observacion" label="Descripcion de la observacion"></v-textarea>
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

        <br>
        <br>

        

    </div>
</template>



<script>

import axios from 'axios';
import Swal from "sweetalert2";

export default {

    data: () => ({
        headers: [

            { text: 'IdPrestamo', value: 'id' },
            { text: 'Fecha Inicio', value: 'fechaInicio' },
            { text: 'Fecha Fin', value: 'fechaFin' },
            { text: 'accion', value: 'accion' },

        ],
        headersDetalle:[
            { text: 'Codigo', value: 'equipo.codigo' },
            { text: 'Tipo', value: 'equipo.tipo.tipo' },
            { text: 'Serial', value: 'equipo.serial' },
            { text: 'Accion', value: 'accion' }
        ],

        data: [],
        tablaPrestamo: false,
        mostrarCampoDeObservacion: false,
        observacionPrestamo: false,
        observacion: "",
        tablaDetalle: false,
        dialog: false,
        checkbox2: false,
        cedulaSeleccionada: null,
        cedulauser: [],
        DetallesPrestamos: [],
        estadosDelPrestamo: [],
        estadoSeleccionado: null,
        prestamos: [],
        items: [],
        detalleSeleccionado: [],
        nameRules: [(v) => !!v || "Indique una observacion"],
    }),


    methods: {

        async buscar() {
            if (this.cedulaSeleccionada) {
                try {
                    const response = await axios.get('http://localhost:62000/prestamos/obtener_prestamo/' + this.cedulaSeleccionada);
                    this.prestamos = response.data;
                    console.log(this.prestamos);
                    if (this.prestamos.length === 0) {
                        this.tablaDetalle = false;
                        this.cedulaSeleccionada = null;
                        Swal.fire('La cedula seleccionada no tiene prestamos asignados!', '', 'error');
                    } else {
                        this.tablaPrestamo = true;
                        this.prestamos.forEach(prestamo => {
                            prestamo.prestamo_detalle.forEach(detalle => {
                                const ID_RESERVADO = 1;
                                if (detalle.equipo.estado.id === ID_RESERVADO) {
                                    const detallePrestamo = {
                                        codigo: detalle.equipo.codigo,
                                        serial: detalle.equipo.serial,
                                        fechaInicio: detalle.fecha_prestamo,
                                        fechaFin: detalle.fecha_devolucion,
                                        tipoEquipo: detalle.equipo.tipo.tipo,
                                        estadoEquipo: detalle.equipo.estado.estado,
                                        IdEstadoEquipo: detalle.equipo.estado.id,
                                        estadoPrestamo: prestamo.estado_prestamo.Estado,
                                        idPrestamo: prestamo.id
                                    };
                                    this.DetallesPrestamos.push(detallePrestamo);
                                }
                            });
                        });
                        console.log(this.DetallesPrestamos);
                    }
                } catch (error) {
                    console.error('Error al obtener detalles de préstamo:', error);
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
        async estadosDelEquipo() {
            axios.get('http://localhost:62000/estadoequipo/obtener').then(response => {
                console.log(response.data);
                if (response.data.length > 0) {
                    console.log(response.data)
                    this.items = response.data;
                    console.log('aqui', this.items)
                }
            });
        },
        MostrarDialogoObservacion() {
    
            this.dialog = true;
            console.log('Detalle del prestamo seleccionado', this.detalleSeleccionado);
        },

        MostrarDetalles(item) {
            this.tablaDetalle = true;
            this.detalleSeleccionado = this.prestamos.find(prestamo => prestamo.id === item.id).prestamo_detalle;
            console.log('xxxaa',this.detalleSeleccionado);
        },

        mostrarObservacion(itemSeleccionado) {
            if (itemSeleccionado !== this.items[0].id && itemSeleccionado !== this.items[2].id) {
                this.mostrarCampoDeObservacion = true;
            } else {
                this.mostrarCampoDeObservacion = false;
                if (this.$refs.estadoSeleccionado) {
                    this.$refs.estadoSeleccionado.resetValidation();
                }
                this.observacion = "";
            }
        },
        limpiarObservacion() {
            this.observacion = "";
        },
        EditarEstado() {
            this.dialog = true;
        },

        cancel() {
            this.dialog = false;
        },

        async confirmarEdit() {
            const estadoEquipo = this.items.find(estadoEquipo => estadoEquipo.id == this.estadoSeleccionado);
            console.log(estadoEquipo);
            if (this.observacion.trim() === "" && estadoEquipo.estado.toLowerCase() != "bueno") {
                Swal.fire("Error", "La observación es obligatoria", "error");
                return;
            } else {
                try {
                    let idDelEstado = this.estadoSeleccionado;
                    let idDelEquipo = this.detalleSeleccionado[0].codigo;
                    console.log('codigo a enviar', idDelEquipo);
                    console.log('idEstado a enviar', idDelEstado);
                    const paquete = {
                        idPrestamo: parseInt(this.detalleSeleccionado[0].idPrestamo),
                        equipos: [{ idEquipo: parseInt(idDelEquipo), idEstado: parseInt(idDelEstado), descripcion: this.observacion }]
                    }
                    await axios.put('http://localhost:62000/prestamos/devolucion', paquete).then(resp => {
                        console.log(resp.data);
                        Swal.fire('El equipo ha sido devuelto!', '', 'success');
                    }).catch(error => {
                        console.log('Error de peticion' + error);
                        Swal.fire('Error al devolver el equipo', '' + error, 'error')
                    })
                    this.dialog = false;
                } catch (error) {
                    console.error('aqui', error);
                }
            }
        },

        formatearFechas(date) {
            const Fechasformateadas = new Date(date).toLocaleString();
            return Fechasformateadas;
        },

    },

    mounted() {
        this.prestamocedula();
        this.estadosprestamos();
        this.estadosDelEquipo();
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
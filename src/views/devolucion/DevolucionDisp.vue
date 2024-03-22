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

                <v-data-table :headers="headers" :no-data-text="'No hay equipos para devolver'" :items="prestamos"
                    :hide-default-footer="true" class="tbl">

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
                            @click="MostrarDetalles(item)">mdi-text-box-search</v-icon>
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

                <v-data-table :headers="headersDetalle" :items="detalleSeleccionado" :hide-default-footer="true">

                    <template v-slot:item.serial="{ item }">
                        {{ item.serial }}
                    </template>


                    <template v-slot:item.marca="{ item }">
                        {{ item.marca }}
                    </template>

                    <template v-slot:item.tipoEquipo="{ item }">
                        {{ item.tipoEquipo }}
                    </template>

                    <template v-slot:item.estadodelequipo="{ item }">
                        <v-select v-model="item.estadoSeleccionado" :items="items" item-text="estado" item-value="id"
                            :rules="[(v) => !!v || 'Campo requerido']" label="Estado" required>
                        </v-select>
                    </template>

                    <template v-slot:item.observacion="{ item }">
                        <v-textarea :rules="nameRules" auto-grow rows="1" row-height="15" style="width: 400px;"
                            variant="solo" v-model="item.observacion"
                            label="Descripcion de la observacion"></v-textarea>
                    </template>

                </v-data-table>
                <v-btn
                    style="width: 40px; height: 40px; background-color: green; font-size: 10px; color: black; float: right; margin-top: 20px;"
                    text @click="mostrarConfirmar">
                    Procesar
                </v-btn>



            </v-container>

            <br>
            <center>

            </center>
            <br>
            <br>
        </v-card>


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
                    <v-btn color="red darken-1" text @click="dialogActualizar = false">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" :disabled="dialogProgreso" :loading="dialogProgreso" text
                        @click="confirmarEdit()">
                        Aceptar
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
        headersDetalle: [
            { text: 'Tipo', value: 'equipo.tipo.tipo' },
            { text: 'Marca', value: 'equipo.marca' },
            { text: 'Serial', value: 'equipo.serial' },
            { text: 'Estado del equipo', value: 'estadodelequipo' },
            { text: 'Observacion', value: 'observacion' },
        ],

        data: [],
        tablaPrestamo: false,
        observacionPrestamo: false,
        observacion: "",
        tablaDetalle: false,
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
        idCurrentPrestamo: null,
        dialogActualizar: false,
        dialogProgreso: false
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
                        this.tablaPrestamo = false;
                    } else {
                        this.prestamos = this.prestamos.filter(prestamo => prestamo.estado_prestamo.id === 2);
                        this.tablaPrestamo = true;
                        this.prestamos.forEach(prestamo => {
                            prestamo.prestamo_detalle.forEach(detalle => {
                                const ID_RESERVADO = 1;
                                if (detalle.equipo.estado.id === ID_RESERVADO) {
                                    const detallePrestamo = {
                                        telefonica: detalle.equipo.telefonica,
                                        marca: detalle.equipo.marca,
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

        async confirmarEdit(idDelEstado, observacion) {
            if (this.idCurrentPrestamo != null) {
                this.dialogProgreso = true;
                try {
                    console.log('idEstado a enviar', idDelEstado);

                    const equipos = this.detalleSeleccionado.map(detalle => {
                        return {
                            idEquipo: detalle.equipo.serial,
                            idEstado: parseInt(idDelEstado),
                            descripcion: observacion
                        }
                    });

                    const paquete = {
                        idPrestamo: parseInt(this.idCurrentPrestamo),
                        equipos: equipos
                    }

                    await axios.put('http://localhost:62000/prestamos/devolucion', paquete).then(resp => {
                        console.log(resp.data);
                        setTimeout(() => {
                            Swal.fire('Devolucion exitosa!', '', 'success');
                            this.idCurrentPrestamo = null;
                            this.dialogActualizar = false;
                            this.dialogProgreso = false;
                            this.buscar();
                        }, 1000)
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000)

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

        MostrarDetalles(item) {
            this.idCurrentPrestamo = item.id;
            this.tablaDetalle = true;
            this.detalleSeleccionado = this.prestamos.find(prestamo => prestamo.id === item.id).prestamo_detalle;
            console.log('xxxaa', this.detalleSeleccionado);
        },

        async mostrarConfirmar() {
            this.dialogActualizar = true;
            if (!this.detalleSeleccionado || this.detalleSeleccionado.length === 0) {
                Swal.fire("Error", "No se han seleccionado detalles para procesar", "error");
                return;
            }

            for (const item of this.detalleSeleccionado) {
                const estadoId = item.estadoSeleccionado;
                const estadoEquipo = this.items.find(estadoEquipo => estadoEquipo.id === estadoId);
                console.log('Estado del equipo:', item.estadoSeleccionado);
                console.log('Observacion:', item.observacion);
                if (!estadoEquipo) {
                    Swal.fire("Error", "No se ha seleccionado un estado válido para el equipo", "error");
                    return;
                }
                console.log('nuevo estado del equipo', estadoEquipo);
                await this.confirmarEdit(item.estadoSeleccionado, item.observacion)
            }


        },


        limpiarObservacion() {
            this.observacion = "";
        },

        cancel() {
            this.dialog = false;
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
<template>
    <div style="margin-top: 200px;">
        <v-card class="mx-auto" max-width="890" elevation="15" style="margin-top: 50px;">
            <v-card-title class="crear" style="margin-left: 37%;">
                <h3> Entrega Equipos </h3>
            </v-card-title>

            <hr>
            <br>
            <v-card-text>
                <v-row>
                    <v-col cols="10">
                        <v-autocomplete v-model="cedulaSeleccionada" dense filled rounded solo class="buscar"
                            :no-data-text="'No hay cedulas registradas'" :items="cedulauser" item-text="cedula"
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

                    <template v-slot:item.accion="{ item }">
                        <v-icon ref="detalleIcon" small class="mr-2"
                            @click="MostrarDetalles(item)">mdi-text-box-search</v-icon>
                    </template>

                </v-data-table>

            </v-container>
            <br>

        </v-card>
        <br>
        <br>
        <v-card class="mx-auto" max-width="890" v-if="tablaDetalle" elevation="15">
            <hr>
            <center>
                <h5>Detalle Prestamos</h5>
            </center>
            <v-container>

                <v-data-table :headers="headersDetalle" :items="DetalleSeleccionado" class="tbl">

                    <template v-slot:item.tipoEquipo="{ item }">
                        {{ item.tipoEquipo }}
                    </template>

                    <template v-slot:item.serial="{ item }">
                        {{ item.serial }}
                    </template>

                    <template v-slot:item.estadoPrestamo="{ item }">
                        {{ item.estadoPrestamo }}
                    </template>


                    <template v-slot:item.accion="{ item }">
                        <v-btn v-if="item.idEstadoPrestamo !== 2" style="width: 30px; height: 30px; font-size: 10px;"
                            color="success" @click="AbrirActualizar">
                            Procesar
                        </v-btn>
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
                            <v-btn color="blue darken-1" text @click="ActualizarItem()">
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
            { text: 'Acción', value: 'accion' },
        ],
        headersDetalle: [
            { text: 'Tipo', value: 'tipoEquipo' },
            { text: 'Serial', value: 'serial' },
            { text: 'Estado', value: 'estadoPrestamo' },
            { text: 'Acción', value: 'accion' },
        ],
        data: [],
        tablaPrestamo: false,
        tablaDetalle: false,
        dialogActualizar: false,
        DetalleSeleccionado: [],
        cedulaSeleccionada: null,
        cedulauser: [],
        DetallesPrestamos: [],
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
            this.DetallesPrestamos = [];
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
                                    estadoPrestamo: prestamo.estado_prestamo.Estado,
                                    idEstadoPrestamo: prestamo.estado_prestamo.id,
                                    idPrestamo: prestamo.id
                                };
                                this.DetallesPrestamos.push(detallePrestamo);
                            });
                        });
                        console.log(this.DetallesPrestamos);
                    }
                } catch (error) {
                    console.error('Error al obtener detalles de préstamo:' + error);
                    Swal.fire('Error al obtener detalles de préstamo' + error, 'error');

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
        async ActualizarItem() {
            try {
                let idActualizar = 2;
                let idPrestamoActualizar = this.DetalleSeleccionado[0].idPrestamo;
                console.log('idEstado', idActualizar);
                console.log('idPrestamo', idPrestamoActualizar);
                await axios.put(`http://localhost:62000/prestamos/actualizar_estado/${idPrestamoActualizar}/${idActualizar}`)
                    .then(() => {
                        Swal.fire('', '', 'success');
                        this.dialogActualizar = false;
                        this.DetallesPrestamos = [];
                        this.buscar();

                    });

            } catch (error) {
                Swal.fire('No se pudo cambiar el estado' + error + 'error');
                console.error('Error:', error);
                this.closeAceptar();
            }


        },

        AbrirActualizar() {
            this.dialogActualizar = true;
        },
        closeAceptar() {
            this.dialogActualizar = false;
        },

        MostrarDetalles(item) {
            this.DetalleSeleccionado = [item];
            this.tablaDetalle = true;
            console.log('Aqui', item);
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
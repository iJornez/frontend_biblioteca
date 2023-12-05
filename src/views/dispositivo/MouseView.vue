<template>
  <v-card class="mx-auto" max-width="900" elevation="15">
    <v-img
      src="https://png.pngtree.com/thumb_back/fh260/background/20220211/pngtree-computer-mouse-input-pc-device-photo-image_2687715.jpg"
      height="350px"
    ></v-img>

    <v-card-title class="crear"> Crear Mouse </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="paquete.codigo"
          :counter="10"
          :rules="nameRules"
          label="Codigo"
          required
        ></v-text-field>

        <v-text-field
          v-model="paquete.descripcion"
          :rules="nameRuless"
          label="Referencia"
          required
        ></v-text-field>

        <v-text-field
          v-model="paquete.serial"
          :rules="nameRules"
          label="Serial"
          required
        ></v-text-field>

       <v-select
      v-model="paquete.estado"
      :items="items"
      item-text="estado" 
      item-value="id"
      :rules="[v => !!v || 'campo requerido']"
      label="Estado"
      required
    ></v-select>


        

        

        <v-btn color="primary" class="mr-4" @click="enviar()"> Guardar </v-btn>

        <v-btn color="error" @click="resetValidation"> Cancelar </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>


<script>
import axios  from "axios";
import Swal from "sweetalert2";
  export default {
    data: () => ({
      paquete:{
         codigo : null,
         serial : null,
         descripcion : null,
         estado : null,
         tipo: 'Mouse'
      },

      
      valid: true,
      
    nameRules: [(v) => !!v || "Campo requerido"],
    items: ["Bueno", "Malo", "Prestado", "En reparacion", "Extraviado"],
    checkbox: false,
    }),

     methods: {
      async peticiones(){
        let nombre = "Mouse";
        await axios.get('http://localhost:62000/tipos_equipos/obtenerTipoPorNombre/' + nombre).then(response => {
          this.paquete.tipo = response.data[0].id;
        })

        await axios.get('http://localhost:62000/equipos/obtener').then(response => {
          console.log(response.data);
        })

        axios.get('http://localhost:62000/estadoequipo/obtener').then(response => {
          console.log(response.data);
          if (response.data.length > 0) {
            console.log(response.data)
            this.items = response.data;
            console.log('aqui',this.items)
          }
        })
      },
      
      enviar() {
       if (  this.$refs.form.validate()){
          axios.post('http://localhost:62000/equipos/crear',this.paquete)
            .then((response) => {
              console.log(response)
              Swal.fire(
                'Registro guardado!',
                '',
                'success'
              ),
              this.limpiarDatos();
              this.$refs.form.resetValidation();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(function () {
              // always executed
            });
        }
      },
      async limpiarDatos(){
        this.paquete.codigo = null;
        this.paquete.descripcion = null;
        this.paquete.serial = null;
        this.paquete.estado = null;
      }
      
    },

  async mounted() {
    this.peticiones();
  }


   
  }
</script>


<style scoped>

.mx-auto{
    margin-top:10%;
}

.crear {
  font-family: Righteous;
  font-size: 40px;

  margin-left: 300px;

}
</style>
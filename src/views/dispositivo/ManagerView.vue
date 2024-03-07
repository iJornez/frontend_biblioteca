<template>
  <v-main>
    
    <v-container style="margin-top: 200px; margin-left:35%; border-radius:20px; border:4px solid green ; width:1000px; background-color:white">
      <v-select
        v-model="select"
        :items="items"
        :rules="[(v) => !!v || 'Escoga un dispositivo']"
        label="Dispositivo"
        required
      ></v-select>
      <router-view />
      <br>
      <br>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    items: ["Video Beam", "Portatil","Teclado","Mouse","Cargador","Cable Hdmi"],
    select: null,
    checkbox: false,
  }),
  watch: {
    select() {
      switch (this.select) {
        case "Video Beam":
          this.$router.push("/dashboard/manager/videobeam");
          break;
        case "Portatil":
          this.$router.push("/dashboard/manager/portatil");
          break;
        case "Teclado":
          this.$router.push("/dashboard/Manager/teclado");
          break; 
        case "Mouse":
          this.$router.push("/dashboard/Manager/mouse");
          break; 
        case "Cargador":
          this.$router.push("/dashboard/Manager/cargador");
          break; 
        case "Cable Hdmi":
          this.$router.push("/dashboard/Manager/cable");
          break; 
      }
    },
  },
};
</script>

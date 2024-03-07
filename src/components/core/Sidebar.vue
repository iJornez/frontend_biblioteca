<template>
  <v-navigation-drawer v-model="drawer" app class="fon" width="320px">
    <vuescroll :ops="ops">
      <v-img contain height="120px" style="top: 15px;" src="../../assets/LogoSENA.png"> </v-img>
      <div style="text-align: center">
        <label class="letra" for="">Biblioteca Sena</label>
      </div>
      <v-divider> </v-divider>

      <div class="app-sidebar-content">
        <sidebar-menu class="custom-sidebar" showOneChild :menu="menu" />
      </div>
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import vuescroll from "vuescroll";
const menut = require('../../json/menus');

export default {
  components: {
    SidebarMenu,
    vuescroll,
  },

  props: ["drawer"],
  data: () => ({

    model: 1,
    ops: {
      scrollPanel: {
        initialScrollY: false,
        initialScrollX: false,
        scrollingX: false,
        scrollingY: true,
        speed: 300,
        easing: undefined,
        verticalNativeBarPos: "right",
      },
      rail: {
        background: "rgba(0, 0, 0, 0.158)",
        opacity: 1,
        size: "10px",
        specifyBorderRadius: false,
        gutterOfEnds: null,
        gutterOfSide: "2px",
        keepShow: false,
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: "#0378a677",
        opacity: 1,
        hoverStyle: false,
        specifyBorderRadius: false,
        minSize: 0,
        size: "9px",
        disable: false,
      },
    },
    links: [
      ["mdi-inbox-arrow-down", "Inbox"],
      ["mdi-send", "Send"],
      ["mdi-delete", "Trash"],
      ["mdi-alert-octagon", "Spam"],
    ],
    menu: []


  }),
  mounted() {
    let rol = this.$store.getters.usuario.rol;
    if (rol == null) {
      this.$router.push('/');
    }
    switch (rol) {
      case 'Administrador':
        this.menu = menut.menu[0].admin
        break;

      case 'Instructor':
        this.menu = menut.menu[0].usuario;
        break;

      default:
        break;
    }
  },
};
</script>
<style>
.letra {
  color: black;
  font-size: 20px;
  font-family: "Mystery Quest";
  font-weight: 400;
  margin-top: 20px;
}

.fon {
  /* background-image:url("../../assets/images/sidebar/abstract4.jpg");*/
  background-image: url("../../assets/fondo.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  width: 100%;
}

.v-sidebar-menu .vsm-title {
  color:#000 !important;
  font-weight: bold;
}
.v-sidebar-menu .vsm-dropdown::before {
  background: #000;
}
.v-sidebar-menu .vsm-icon {
    color:#1b4202;
}

</style>

import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

//rutas de elementos del sidebar
const routes = [{
    path: '/',
    name: 'Login',
    component: () =>
        import('../views/iniciarSesion.vue')
},
{
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
        import('../views/dashboard'),
    children: [
        {
            name: 'DashboardWelcome',
            path: '/dashboard/welcome',
            component: () =>
                import('../views/welcome.vue'),
        },
        {
            name: 'DashboardUsuario',
            path: '/dashboard/usuario',
            component: () =>
                import('../views/UserView.vue'),


        },
        {
            name: 'DashboardEstadoUsuario',
            path: '/dashboard/estadousuario',
            component: () =>
                import('../views/EstadoUser.vue'),


        },
        {
            name: 'ManagerDispositivo',
            path: '/dashboard/Manager',
            component: () =>
                import('../views/dispositivo/ManagerView.vue'),
            children: [
                {
                    name: 'dashboardVideoBeam',
                    path: '/dashboard/Manager/videobeam',
                    component: () =>
                        import('../views/dispositivo/VideoBeam.vue'),
                },
                {
                    name: 'dashboardportatil',
                    path: '/dashboard/Manager/portatil',
                    component: () =>
                        import('../views/dispositivo/PcPortatil.vue'),
                },
                {
                    name: 'dashboardteclado',
                    path: '/dashboard/Manager/teclado',
                    component: () =>
                        import('../views/dispositivo/TecladoView.vue'),
                },
                {
                    name: 'dashboardmouse',
                    path: '/dashboard/Manager/mouse',
                    component: () =>
                        import('../views/dispositivo/MouseView.vue'),
                },
                {
                    name: 'dashboardcargador',
                    path: '/dashboard/Manager/cargador',
                    component: () =>
                        import('../views/dispositivo/CargadorPc.vue'),
                },
                {
                    name: 'dashboardcable',
                    path: '/dashboard/Manager/cable',
                    component: () =>
                        import('../views/dispositivo/CableHdmi.vue'),
                },
            ]
        },
        {
            name: 'DashboardWelcome',
            path: '/dashboard/listado',
            component: () =>
                import('../views/dispositivo/ListarDispositivo.vue'),
        },
        {
            path: '/registrar',
            name: 'Registrar',
            component: () =>
                import('../views/prestamo/RegistrarPres.vue'),
        },
        {
            path: '/devolucion',
            name: 'devolucion',
            component: () =>
                import('../views/devolucion/DevolucionDisp.vue'),
        },
        {
            path: '/entrega',
            name: 'Entrega',
            component: () =>
                import('../views/entrega/EntregaDisp.vue'),
        },


    ],


},


]

const router = new VueRouter({
    // mode: 'history', 
    base: process.env.BASE_URL,
    routes
})

export default router
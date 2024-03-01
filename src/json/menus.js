

export let menu = [
    {
        admin: [
            {
                title: "Usuario",
                icon: "fa fa-user",
                child: [
                    {

                        href: "/dashboard/usuario",
                        title: "Crear Usuario",
                    },
                    {
                        href: "/dashboard/estadousuario",
                        title: "Usuarios",
                    },

                ],
            },
            {

                title: "Registrar dispositivo",
                icon: "fa fa-archive",
                child: [
                    {
                        href: "/dashboard/Manager",
                        title: "crear",
                    },
                    {
                        href: "/dashboard/listado",
                        title: "listar",
                    },

                ],
            },
            {

                title: "Libros",
                icon: "fa fa-book",
            },

            {

                title: "seguridad",
                icon: "fa fa-lock",
                child: [
                    {
                        href: "/charts/sublink",
                        title: "cambiar contraseña",
                    },
                    {
                        href: "/charts/sublink",
                        title: "actualizar datos",
                    },
                ],
            },
            {
                title: "Opciones de prestamo",
                icon: "	fa fa-cogs",
                child: [
                    {
                        href: "/registrar",
                        title: "Prestar dispositivo",


                    },
                    {
                        href: "/charts/sublink",
                        title: "Cancelar prestamo",
                    },
                    {
                        href: "/entrega",
                        title: "Entrega de dispositivo",
                    },
                    {
                        href: "/devolucion",
                        title: "Devolucion de dispositivos",
                    },


                ],
            },
           
            










        ],
        usuario: [
            {
                title: "Opciones de prestamo",
                icon: "	fa fa-cogs",
                child: [
                    {
                        href: "/registrar",
                        title: "Prestar dispositivo",
                    },
                    {
                        href:"/historial",
                        title:"Historial de Prestamos"
                    },
                    {
                        href:"/cancelar",
                        title:"Cancelar Prestamo"
                    }
                ],
                
                
            },
           
              
           
        ]
    }

]

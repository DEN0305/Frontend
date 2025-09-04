/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Proveedor from "views/pages/proveedor/Index";
import Cliente from "views/pages/cliente/Index";
import Articulo from "views/pages/articulo/Index";
import Categoria from "views/pages/categoria/Index";
import Caracteristica from "views/pages/caracteristica/Index";
import ArticuloCaracteristica from "views/pages/articulo-caracteristica/Index";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/proveedor",
    name: "Proveedor",
    icon: "ni ni-watch-time text-primary",
    component: <Proveedor />,
    layout: "/admin",
  },
  {
    path: "/cliente",
    name: "Cliente",
    icon: "ni ni-single-02 text-success",
    component: <Cliente />,
    layout: "/admin",
  },
  {
    path: "/categoria",
    name: "Categoría",
    icon: "ni ni-tag text-info",
    component: <Categoria />,
    layout: "/admin",
  },
  {
    path: "/articulo",
    name: "Artículo",
    icon: "ni ni-box-2 text-warning",
    component: <Articulo />,
    layout: "/admin",
  },
  {
    path: "/caracteristica",
    name: "Características",
    icon: "ni ni-list-ul text-secondary",
    component: <Caracteristica />,
    layout: "/admin",
  },
  {
    path: "/articulo-caracteristica",
    name: "Artículo-Características",
    icon: "ni ni-list-check text-dark",
    component: <ArticuloCaracteristica />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  }
];
export default routes;

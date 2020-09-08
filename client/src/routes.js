import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import Inicio from "./views/Inicio";
import RegistrarUsuario from "./views/RegistrarUsuario";
import Clases from "./views/Clases";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'cliente'],
    component: () => <Redirect to="/inicio" />
  },
  {
    path: "/inicio",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'cliente'],
    component: Inicio
  },
  {
    path: "/mi-perfil",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'cliente'],
    component: UserProfileLite
  },
  {
    path: "/agregar-usuario",
    layout: DefaultLayout,
    hasAccess: ['admin'],
    component: RegistrarUsuario
  },
  {
    path: "/clases",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'cliente'],
    component: Clases
  }
];

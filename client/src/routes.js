import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import Inicio from "./views/Inicio";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'client'],
    component: () => <Redirect to="/inicio" />
  },
  {
    path: "/inicio",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'client'],
    component: Inicio
  },
  {
    path: "/mi-perfil",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof', 'client'],
    component: UserProfileLite
  }
];

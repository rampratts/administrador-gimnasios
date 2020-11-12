import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import UserProfileLite from "./views/UserProfileLite";
import Inicio from "./views/Inicio";
import RegistrarUsuario from "./views/RegistrarUsuario";
import Clases from "./views/Clases";
import AgregarClase from "./views/AgregarClase";
import Pagos from "./views/Pagos";
import Pago from "./views/Pago";
import MisPagos from "./views/MisPagos";
import Rutinas from "./views/Rutinas";
import AgregarRutina from "./views/AgregarRutina";
import Rutina from "./views/Rutina";
import PlanesDeAlimentacion from "./views/PlanesDeAlimentacion";
import AsignarPlanAlimentacion from "./views/PlanAlimentacion";
import AgregarPlanAlimentacion from "./views/AgregarPlanAlimentacion";
import MisRutinas from "./views/MisRutinas";
import MisPlanesAlimentacion from "./views/MisPlanesAlimentacion";
import Progresos from "./views/Progresos";
import EnviarSugerencias from "./views/EnviarSugerencias";
import Sugerencias from "./views/Sugerencias";
import Sugerencia from "./views/Sugerencia";
import Profesionales from "./views/Profesionales";

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
  },
  {
    path: "/agregar-clase",
    layout: DefaultLayout,
    hasAccess: ['admin', 'prof'],
    component: AgregarClase
  },
  {
    path: "/pagos",
    layout: DefaultLayout,
    hasAccess: ['admin'],
    component: Pagos
  },
  {
    path: "/pago",
    layout: DefaultLayout,
    hasAccess: ['admin'],
    component: Pago
  },
  {
    path: "/mis-pagos",
    layout: DefaultLayout,
    hasAccess: ['cliente'],
    component: MisPagos
  },
  {
    path: "/rutinas",
    layout: DefaultLayout,
    hasAccess: ['prof'],
    component: Rutinas
  },
  {
    path: "/mis-rutinas",
    layout: DefaultLayout,
    hasAccess: ['cliente'],
    component: MisRutinas
  },
  {
    path: "/rutina",
    layout: DefaultLayout,
    hasAccess: ['prof', 'cliente'],
    component: Rutina
  },
  {
    path: "/agregar-rutina",
    layout: DefaultLayout,
    hasAccess: ['prof'],
    component: AgregarRutina
  },
  {
    path: "/planes-alimentacion",
    layout: DefaultLayout,
    hasAccess: ['prof'],
    component: PlanesDeAlimentacion
  },
  {
    path: "/mis-planes-alimentacion",
    layout: DefaultLayout,
    hasAccess: ['cliente'],
    component: MisPlanesAlimentacion
  },
  {
    path: "/plan-alimentacion",
    layout: DefaultLayout,
    hasAccess: ['prof', 'cliente'],
    component: AsignarPlanAlimentacion
  },
  {
    path: "/agregar-plan-alimentacion",
    layout: DefaultLayout,
    hasAccess: ['prof'],
    component: AgregarPlanAlimentacion
  },
  {
    path: "/progresos",
    layout: DefaultLayout,
    hasAccess: ['prof', 'cliente'],
    component: Progresos
  },
  {
    path: "/enviar-sugerencias",
    layout: DefaultLayout,
    hasAccess: ['prof', 'cliente'],
    component: EnviarSugerencias
  },
  {
    path: "/sugerencias",
    layout: DefaultLayout,
    hasAccess: ['admin'],
    component: Sugerencias
  },
  {
    path: "/sugerencia",
    layout: DefaultLayout,
    hasAccess: ['admin'],
    component: Sugerencia
  },
  {
    path: "/profesionales",
    layout: DefaultLayout,
    hasAccess: ['admin','prof','cliente'],
    component: Profesionales
  }
];

export function getSidebarNavItems() {
  return [
    {
      title: "Inicio",
      htmlBefore: '<i class="material-icons">home</i>',
      to: "/inicio",
      hasAccess: ['admin', 'prof', 'cliente']
    },
    {
      title: "Clases",
      htmlBefore: '<i class="material-icons">school</i>',
      to: "/clases",
      hasAccess: ['admin', 'prof', 'cliente']
    },
    {
      title: "Pagos",
      htmlBefore: '<i class="material-icons">payment</i>',
      to: "/pagos",
      hasAccess: ['admin']
    },
    {
      title: "Mis Pagos",
      htmlBefore: '<i class="material-icons">payment</i>',
      to: "/mis-pagos",
      hasAccess: ['cliente']
    },
    {
      title: "Rutinas",
      htmlBefore: '<i class="material-icons">fitness_center</i>',
      to: "/rutinas",
      hasAccess: ['prof']
    },
    {
      title: "Mis Rutinas",
      htmlBefore: '<i class="material-icons">fitness_center</i>',
      to: "/mis-rutinas",
      hasAccess: ['cliente']
    },
    {
      title: "Planes de Alimentación",
      htmlBefore: '<i class="material-icons">restaurant</i>',
      to: "/planes-alimentacion",
      hasAccess: ['prof']
    },
    {
      title: "Mis Planes de Alimentación",
      htmlBefore: '<i class="material-icons">restaurant</i>',
      to: "/mis-planes-alimentacion",
      hasAccess: ['cliente']
    },
    {
      title: "Agregar Usuario",
      htmlBefore: '<i class="material-icons">person_add_alt_1</i>',
      to: "/agregar-usuario",
      hasAccess: ['admin']
    },
    {
      title: "Mi Perfil",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/mi-perfil",
      hasAccess: ['admin', 'prof', 'cliente']
    }
  ];
}

export function getAdminSidebarNavItems() {
  return getSidebarNavItems().filter(item => item.hasAccess.includes('admin'));
}

export function getProfSidebarNavItems() {
  return getSidebarNavItems().filter(item => item.hasAccess.includes('prof'));
}

export function getClientSidebarNavItems() {
  return getSidebarNavItems().filter(item => item.hasAccess.includes('cliente'));
}


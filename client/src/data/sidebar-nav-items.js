export function getSidebarNavItems() {
  return [
    {
      title: "Inicio",
      htmlBefore: '<i class="material-icons">home</i>',
      to: "/inicio",
      hasAccess: ['admin', 'prof', 'client']
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
      hasAccess: ['admin', 'prof', 'client']
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
  return getSidebarNavItems().filter(item => item.hasAccess.includes('client'));
}


export default function() {
  return [
    {
      title: "Inicio",
      htmlBefore: '<i class="material-icons">person_add_alt_1</i>',
      to: "/inicio",
    },
    {
      title: "Agregar Usuario",
      htmlBefore: '<i class="material-icons">person_add_alt_1</i>',
      to: "/#",
    },
    {
      title: "Eliminar Usuario",
      htmlBefore: '<i class="material-icons">person_remove</i>',
      to: "/#",
    },
    {
      title: "Mi Perfil",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile-lite",
    }
  ];
}

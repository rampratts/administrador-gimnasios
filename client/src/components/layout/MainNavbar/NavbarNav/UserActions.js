import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { UserContext } from "../../../../context/UserContext";

export default class UserActions extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  cerrarSesion() {
    const userInfo = this.context;
    localStorage.removeItem('auth_token');
    userInfo[1] = false;
  }

  render() {
    const userInfo = this.context;
    return (
      <div style={{cursor: 'pointer'}}>
        <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
          <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
            <img
              className="user-avatar rounded-circle mr-2"
              src={require("./../../../../images/avatars/0.jpg")}
              alt="User Avatar"
            />{" "}
            <span className="d-none d-md-inline-block">{userInfo[0].nombre_usuario}</span>
          </DropdownToggle>
          <Collapse tag={DropdownMenu} right small open={this.state.visible}>
            <DropdownItem tag={Link} to="/mi-perfil">
              <i className="material-icons">&#xE7FD;</i> Mi Perfil
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem tag={Link} to="/" onClick={this.cerrarSesion} className="text-danger">
              <i className="material-icons text-danger">&#xE879;</i> Cerrar Sesión
            </DropdownItem>
          </Collapse>
        </NavItem>
      </div>
    );
  }
}

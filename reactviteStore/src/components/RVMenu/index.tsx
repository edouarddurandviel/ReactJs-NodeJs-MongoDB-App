import { NavLink } from "react-router";
import { Menu } from "../RVLayout/styles";

import { connect } from "react-redux";
import {useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Index = () => {
  const CurrentUser = useContext(UserContext);
  return (
    <Menu>
      <NavLink className="links" to="/">
        Home
      </NavLink>
      {CurrentUser && (<>
        <NavLink className="links" to="/user/add">
          Create user
        </NavLink>
        <NavLink className="links" to="/user/profil">
          User profil
        </NavLink>
      </>)}
    </Menu>
  );
};


export default connect()(Index);

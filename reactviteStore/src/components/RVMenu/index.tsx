import { NavLink } from "react-router";
import { Menu } from "../RVLayout/styles";

import { connect } from "react-redux";
import {useContext, useMemo } from "react";
import { userContext } from "../../contexts/UserContext";

const Index = () => {
  const currentUser = useContext(userContext);
  const contextValue = useMemo(() => ({
    currentUser,
  }), [currentUser]);

  return (
    <Menu>
      <NavLink className="links" to="/">
        Home
      </NavLink>
      {contextValue && (<>
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

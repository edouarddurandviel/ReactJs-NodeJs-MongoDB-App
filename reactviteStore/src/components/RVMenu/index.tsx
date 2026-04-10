import { NavLink } from "react-router";
import { Menu } from "../RVLayout/styles";
import { useContext, useMemo } from "react";
import { UserContext } from "../../contexts/UserContext";

const Index = () => {
  const currentUser = useContext(UserContext);
  const contextValue = useMemo(
    () => ({
      currentUser,
    }),
    [currentUser],
  );

  return (
    <Menu>
      <NavLink className="links" to="/">
        Home
      </NavLink>
      {contextValue && (
        <>
          <NavLink className="links" to="/user/add">
            Create user
          </NavLink>
          <NavLink className="links" to="/user/profil">
            User profil
          </NavLink>
          <NavLink className="links" to="/design-patterns">
            Design patterns
          </NavLink>
        </>
      )}
    </Menu>
  );
};

export default Index;

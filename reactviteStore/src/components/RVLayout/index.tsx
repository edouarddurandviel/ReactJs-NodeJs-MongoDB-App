import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main, Menu, PLaceHolder } from "./styles";

const Index = () => {
  return (
    <PLaceHolder>
      <Header>
        <Menu>
          <NavLink className="links" to="/">
            Home
          </NavLink>
          <NavLink className="links" to="/legacy">
            Legacy
          </NavLink>
        </Menu>
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>Footer</Footer>
    </PLaceHolder>
  );
};

export default Index;

import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main, Menu, PLaceHolder } from "./styles";
import type { User } from "../../stores/user/interfaces";
import { useEffect } from "react";

const Index = ({ data }: LayoutProps) => {

  useEffect(() => {
  console.log("ici" + data)
  }, [data])

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
        {data && data.user && data.user.email}
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>Footer</Footer>
    </PLaceHolder>
  );
};

interface LayoutProps {
 data: { 
  user: User | null;
  userLoading: boolean;
} | null;
}

export default Index;

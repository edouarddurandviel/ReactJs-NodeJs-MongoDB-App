import { NavLink, Outlet, useNavigate } from "react-router";
import { Footer, Header, Main, Menu, PLaceHolder } from "./styles";
import type { UserConnected } from "../../stores/user/interfaces";
import type { RootState } from "../../stores";
import * as selectors from "../../stores/rootSelectors";
import { connect } from "react-redux";
import { useEffect } from "react";

const Index = ({ user }: LayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

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
        {user && user.email}
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>Footer</Footer>
    </PLaceHolder>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectors.user.userSelector(state),
    userLoading: selectors.user.userLoadingSelector(state),
  };
};

interface LayoutProps {
  user: UserConnected | null;
  userLoading: boolean;
}

export default connect(mapStateToProps)(Index);

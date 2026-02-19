import { NavLink, Outlet } from "react-router";
import { Footer, Header, Main, Menu, PLaceHolder } from "./styles";
import type { AppDispatch } from "../../stores";
import * as actions from "../../stores/rootActions";
import { connect } from "react-redux";
import { useCallback } from "react";
import RVLoadingButton from "../RVLoadingButton";
import type { UserConnected } from "../../stores/auth/interfaces";

const Index = ({ dispatch, user }: LayoutProps) => {

  const handleLogout = useCallback(() => {
    if (user) {
      dispatch(
        actions.auth.userLogout({
          params: {
            userId: user.userPermissions.id,
          },
        }),
      );
      return () => {
        dispatch(actions.auth.reset(["user"]));
      };
    }
  }, [user]);


  return (
    <PLaceHolder>
      <Header>
        <Menu>
          <NavLink className="links" to="/">
            Home
          </NavLink>
          {user && (
            <NavLink className="links" to="/user/add">
              Create user
            </NavLink>
          )}
        </Menu>
        {user && (
          <>
            <RVLoadingButton
              content="Logout"
              onClick={() => {
                handleLogout();
              }}
            />
            <div>{user.userPermissions.email}</div>
          </>
        )}
      </Header>
      <Main>
        <Outlet />
      </Main>
      <Footer>Footer</Footer>
    </PLaceHolder>
  );
};

interface LayoutProps {
  dispatch: AppDispatch;
  user: UserConnected | null;
}

export default connect()(Index);

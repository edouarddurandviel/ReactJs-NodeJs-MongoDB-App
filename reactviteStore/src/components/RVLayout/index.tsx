import { Outlet } from "react-router";
import { Footer, Header, Main, PLaceHolder } from "./styles";
import type { AppDispatch } from "../../stores";
import * as actions from "../../stores/rootActions";
import { connect } from "react-redux";
import { useCallback } from "react";
import RVLoadingButton from "../RVLoadingButton";
import type { UserConnected } from "../../stores/auth/interfaces";
import { UserContext } from "../../contexts/UserContext";
import RVMenu from "../RVMenu";

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
    <UserContext value={user}>
      <PLaceHolder>
        <Header>

          {user && (
            <>
             <RVMenu />
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
    </UserContext>
  );
};

interface LayoutProps {
  dispatch: AppDispatch;
  user: UserConnected | null;
}

export default connect()(Index);

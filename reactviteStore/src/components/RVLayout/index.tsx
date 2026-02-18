import { NavLink, Outlet, useNavigate } from "react-router";
import { Footer, Header, Main, Menu, PLaceHolder } from "./styles";
import type { UserConnected } from "../../stores/user/interfaces";
import type { AppDispatch, RootState } from "../../stores";
import * as selectors from "../../stores/rootSelectors";
import * as actions from "../../stores/rootActions";
import { connect } from "react-redux";
import { useCallback, useEffect } from "react";
import RVLoadingButton from "../RVLoadingButton";

const Index = ({ dispatch, user, userLoading }: LayoutProps) => {
  const navigate = useNavigate();

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
        dispatch(actions.user.reset(["user"]));
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, userLoading]);

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

const mapStateToProps = (state: RootState) => {
  return {
    user: selectors.auth.userSelector(state),
    userLoading: selectors.auth.userLoadingSelector(state),
  };
};

interface LayoutProps {
  dispatch: AppDispatch;
  user: UserConnected | null;
  userLoading: boolean;
}

export default connect(mapStateToProps)(Index);

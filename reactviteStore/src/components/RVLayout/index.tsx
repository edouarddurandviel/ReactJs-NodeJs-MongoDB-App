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
    if(user && user as UserConnected){
      dispatch(actions.user.userLogout({
        params: {
          userId: user.userPermissions.id
        }
      }))
      return () => {
        dispatch(actions.user.reset(['user']))
      }
    }
  }, [user])

  useEffect(() => {
    if (
      user && 
      user.userPermissions
    ) {
      navigate("/");
    }else{
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
           {user && user.userPermissions && (
          <NavLink className="links" to="/user/add">
            Create user
          </NavLink>)}
        </Menu>
        {user && user.userPermissions && (<>
          <RVLoadingButton 
            content="Logout" 
            onClick={() => {
              handleLogout()
            }} />
          <div>{user.userPermissions.email}</div>
        </>)}
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
  dispatch: AppDispatch;
  user: UserConnected | null;
  userLoading: boolean;
}

export default connect(mapStateToProps)(Index);

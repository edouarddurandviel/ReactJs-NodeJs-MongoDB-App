import { Route, Routes } from "react-router";
import RouteSettings from "../../routes/index";
import Layout from "../../components/RVLayout";
import PrivateRoutes from "./PrivateRoutes";
import { connect } from "react-redux";
import * as selectors from "../../stores/rootSelectors";
import type { User } from "../../stores/user/interfaces";
import type { RootState } from "../../stores";

const Index = ({ user, userLoading }: RootProps) => {
  return (
    <Routes>
      <Route
        key="default"
        path="/"
        element={
          <PrivateRoutes user={user}>
            <Layout data={{ user, userLoading }} />
          </PrivateRoutes>
        }
      >
        {RouteSettings.length &&
          RouteSettings.map((route) => {
            if (Array.isArray(route)) {
              RouteSettings.map((children) => {
                return <Route key={children.name} path={children.path} index={children.index} Component={children.component} />;
              });
            } else {
              return <Route key={route.name} path={route.path} index={route.index} Component={route.component} />;
            }
          })}
      </Route>
    </Routes>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: selectors.user.userSelector(state),
    userLoading: selectors.user.userLoadingSelector(state),
  };
};

interface RootProps {
  user: User | null;
  userLoading: boolean;
}

// export default App
export default connect(mapStateToProps)(Index);

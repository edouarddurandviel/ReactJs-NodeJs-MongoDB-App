import { Route, Routes } from "react-router";
import RouteSettings from "../../routes/index";
import Layout from "../../components/RVLayout";

const Index = () => {
  return (
    <Routes>
      <Route key="default" path="/" element={<Layout />}>
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

export default Index;

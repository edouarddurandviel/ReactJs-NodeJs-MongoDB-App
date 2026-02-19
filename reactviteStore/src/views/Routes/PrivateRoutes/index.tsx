import { Navigate, useLocation } from "react-router";
import type { UserConnected } from "../../../stores/auth/interfaces";

const Index = ({ user, children }: PrivateRouteProps) => {
  const location = useLocation();

  if ((!user && location.pathname !== "/login")) {
    return <Navigate to="/login" replace />;
  } else if(user && location.pathname === "/login") {
    return <Navigate to="/" replace />;
  } else{
    return children
  }
};

interface PrivateRouteProps extends React.PropsWithChildren {
  user: UserConnected | null;
}

export default Index;

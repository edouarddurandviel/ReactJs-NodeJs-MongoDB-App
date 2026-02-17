import { Navigate, useLocation } from "react-router";
import type { User } from "../../../stores/user/interfaces";

const Index = ({ user, children }: PrivateRouteProps) => {
  const location = useLocation()

  if(!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />
  }else{
    return children
  }

};

interface PrivateRouteProps extends React.PropsWithChildren {
  user: User | null;
}



export default Index;

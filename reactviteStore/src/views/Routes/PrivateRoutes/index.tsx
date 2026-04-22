import { useNavigate } from "react-router";
import type { UserConnected } from "../../../stores/auth/interfaces";
import { useEffect } from "react";

const Index = ({ user, children }: PrivateRouteProps) => {
  const navigate = useNavigate()

  useEffect(() => {
     if (!user && location.pathname !== "/login") {
    navigate("/login", { replace: true });
  } else if (user && location.pathname === "/login") {
    navigate("/", { replace: true });
  }
    
  }, [user])

  return children;
  
};

interface PrivateRouteProps extends React.PropsWithChildren {
  user: UserConnected | null;
}

export default Index;

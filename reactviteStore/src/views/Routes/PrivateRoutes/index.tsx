import { useNavigate } from "react-router";
import type { UserConnected } from "../../../stores/auth/interfaces";
import { useEffect } from "react";

const Index = ({ user, children }: PrivateRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }else{
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return children;
};

interface PrivateRouteProps extends React.PropsWithChildren {
  user: UserConnected | null;
}

export default Index;

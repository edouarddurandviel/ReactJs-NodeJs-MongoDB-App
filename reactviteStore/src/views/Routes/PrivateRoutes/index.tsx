import { useNavigate } from "react-router";
import type { UserConnected } from "../../../stores/auth/interfaces";

const Index = ({ user, children }: PrivateRouteProps) => {
  const navigate = useNavigate()

  if (!user && location.pathname !== "/login") {
    navigate("/login");
  } else if (user && location.pathname === "/login") {
    navigate("/");
  } else {
    return children;
  }
};

interface PrivateRouteProps extends React.PropsWithChildren {
  user: UserConnected | null;
}

export default Index;

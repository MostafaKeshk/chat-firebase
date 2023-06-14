import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import paths from "./paths";

type IProps = {
  Component: any;
};

export const RedirectToHome: React.FC<IProps> = ({ Component }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={paths.home} />;
  }

  return <Component />;
};

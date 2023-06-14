import { useEffect } from "react";
import Loading from "../components/general/Loading";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import paths from "./paths";

const withAuth = (WrappedComponent: any) => {
  const HOCComponent = (props: any) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        navigate(paths.login);
      }
    }, [user, navigate]);

    if (!user) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default withAuth;

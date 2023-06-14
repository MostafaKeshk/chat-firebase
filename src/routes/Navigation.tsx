import { Route, Routes as RouterRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Home from "../pages/Home";

import paths from "./paths";
import { RedirectToHome } from "./utils";
import User from "../pages/User";

const Navigation = () => {
  return (
    <RouterRoutes>
      <Route
        path={paths.login}
        element={<RedirectToHome Component={Login} />}
      />

      <Route path={paths.home} element={<Home />} />
      <Route path={paths.user} element={<User />} />
    </RouterRoutes>
  );
};
export default Navigation;

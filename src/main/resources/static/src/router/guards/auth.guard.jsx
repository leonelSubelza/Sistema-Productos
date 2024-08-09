import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {PublicRoutes} from "../routes.js";

export const AuthGuard = () => {
  const pageDetails = useSelector(store => store.pageDetails);
  const location = useLocation();

  if (!pageDetails || !pageDetails.sessionStarted) {
    return <Navigate to={PublicRoutes.LOGIN} state={{ from: location }} replace />;
  }
  // si el usuario ya esta logueado se le permite acceder a /administrador/* si no se redirige a /login
  return <Outlet />;
}
export default AuthGuard;
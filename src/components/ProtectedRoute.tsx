import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Preloader from './Preloader';
import { useSelector } from "react-redux";

import { getIsAuth, getIsAuthChecking } from "../store/auth/selectors";

type ProtectedRouteProps = {
  path: string;
  children: React.ReactNode;
  exact: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({path, children, exact}) => {
  const isLoggedIn = useSelector(getIsAuth);
  const isChecking = useSelector(getIsAuthChecking);

  return (
    <Route path={path} exact={exact}>
      { isChecking ? (
        <main className='content'>
          <Preloader />
        </main>
      ) : (
        isLoggedIn ? children : <Redirect to="/signin" />
      )}
    </Route>
)}

export default ProtectedRoute;
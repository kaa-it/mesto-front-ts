import React, {useState} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip, {MessageData} from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { getIsAuth } from "../store/auth/selectors";

function App() {
  const [tooltipStatus, setTooltipStatus] = useState<MessageData>();
  const closeInfoTooltip = () => setTooltipStatus(undefined);
  const isLoggedIn = useSelector(getIsAuth);

  return (
    <div className='page__content'>
      <Header />
      <Switch>
        <ProtectedRoute path='/' exact={true}>
          <Main />
        </ProtectedRoute>
        <Route path='/signup'>
          {isLoggedIn && <Redirect to='/' />}
          <Register setTooltip={setTooltipStatus} />
        </Route>
        <Route path='/signin'>
          {isLoggedIn && <Redirect to='/' />}
          <Login setTooltip={setTooltipStatus} />
        </Route> 
        <Route path='*'>
          {isLoggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
        </Route>
      </Switch>
      <Footer />
      <Route path='/(signup|signin)'>
        <InfoTooltip
          isOpen={!!tooltipStatus}
          onClose={closeInfoTooltip}
          status={tooltipStatus}
        />
      </Route>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Registration from './registration/Registration';
import Autorization from './autorization/Autorization';
import { authActionCreator } from '../actions/user';
import Profile from './navbar/Profile';
import './app.css';
import Disc from './disk/Disk';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActionCreator());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="wrap">
          {!isAuth
            ? (
              <Switch>
                <Route path="/registration" component={Registration} />
                <Route path="/autorization" component={Autorization} />
                <Redirect to="/registration" />
              </Switch>
            )
            : (
              <Switch>
                <Route exact path="/" component={Disc} />
                <Route exact path="/profile" component={Profile} />
                <Redirect to="/" />
              </Switch>
            )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

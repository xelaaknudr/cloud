import { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Registration from './registration/Registration';
import Autorization from './autorization/Autorization';
import { authActionCreator } from '../actions/user';
import './app.css';
import { useSelector, useDispatch } from 'react-redux';
import Disc from './disk/Disk';

function App(props) {
  const { files } = props;
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActionCreator());
  }, []);

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
                <Route path="/" component={() => <Disc loader={files.loaderWatcher} />} />
                <Redirect to="/" />
              </Switch>
            )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

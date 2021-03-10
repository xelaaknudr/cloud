import { useState } from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutActionCreator } from '../../actions/user';
import { getFilesActionCreator, searchFile, loaderWatcher } from '../../actions/file';
import avatarLogo from '../../assets/img/avatar.svg'

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchName, setSearchName] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  const avatar = currentUser.avatar ? `http://localhost:5000/${currentUser.avatar}` : avatarLogo;


  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="container">
        <img src="" alt="" className="navbar__logo" />
        <div className="navbar__header"><NavLink to="/">MERN CLOUD</NavLink></div>
        {isAuth
        && (
        <input
          className="navbar__search"
          type="text"
          placeholder="Имя файла"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            if (searchTimeout !== false) {
              clearTimeout(searchTimeout);
            }
            dispatch(loaderWatcher(true));
            if (e.target.value !== '') {
              setSearchTimeout(setTimeout((value) => {
                dispatch(searchFile(e.target.value));
              }, 500, e.target.value));
            } else {
              dispatch(getFilesActionCreator({ currentDir }));
            }
          }}
        />
        )}
        {!isAuth && <div className="navbar__login"><NavLink to="/autorization">Войти</NavLink></div>}
        {!isAuth && <div className="navbar__registration"><NavLink to="/registration">Регистрация</NavLink></div>}
        {isAuth && <div className="navbar__login" onClick={() => dispatch(logoutActionCreator())}>Выход</div>}
        {isAuth &&
        <NavLink to="/profile">
          <img className="navbar__avatar" src={avatar} alt=""/>
        </NavLink>}
      </div>
    </div>
  );
};

export default Navbar;

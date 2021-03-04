import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './autorization.css'
import { logInActionCreator } from '../../actions/user'
import Input from "../../utils/input/Input";

const Autorization = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();

  return (
    <div className='authorization'>
      <div className="authorization__header">Авторизация</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
      <button className="authorization__btn" onClick={() => {
        dispatch(logInActionCreator({ email: email, password: password }));
        setEmail('');
        setPassword('');
      }}>Войти</button>
    </div>
  );
};

export default Autorization;

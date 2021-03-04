import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import './registration.css'
import { signInActionCreator } from '../../actions/user'
import Input from "../../utils/input/Input";

const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();

  return (
    <div className='registration'>
      <div className="registration__header">Регистрация</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
      <button className="registration__btn" onClick={() => {
        dispatch(signInActionCreator({ email: email, password: password }));
        setEmail('');
        setPassword('');
      }}>Войти</button>
    </div>
  );
};

export default Registration;

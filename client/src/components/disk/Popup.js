import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {createFileActionCreator, setPopupDisplay} from "../../actions/file";
import './disk.css';

const Popup = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector(state => state.files.popupDisplay)
  const currentDir = useSelector(state => state.files.currentDir)
  const dispatch = useDispatch()

  const createHandler = () => {
    dispatch(createFileActionCreator({ name: dirName, type: 'dir', parent: currentDir}));
    dispatch( setPopupDisplay('none'));
    setDirName('')
  }

  return (
    <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
        </div>
        <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
        <button className="popup__create" onClick={() => createHandler()}>Создать</button>
      </div>
    </div>
  );
};

export default Popup;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../utils/input/Input';
import { createFileActionCreator, setPopupDisplay } from '../../actions/file';
import './disk.css';

const PopupAlert = () => {
  const [dirName, setDirName] = useState('');
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  const createHandler = () => {
    dispatch(createFileActionCreator({ name: dirName, type: 'dir', parent: currentDir }));
    dispatch(setPopupDisplay('none'));
    setDirName('');
  };

  return (
    <div
      aria-hidden="true"
      className="popup"
      onClick={() => dispatch(setPopupDisplay('none'))}
      style={{ display: popupDisplay }}
    >
      <div
        aria-hidden="true"
        className="popup__content"
        onClick={((event) => event.stopPropagation())}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button
            type="button"
            className="popup__close"
            onClick={() => dispatch(setPopupDisplay('none'))}
          >
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button
          type="button"
          className="popup__create"
          onClick={() => createHandler()}
        >
          Создать
        </button>
      </div>
    </div>
  );
};

export default PopupAlert;

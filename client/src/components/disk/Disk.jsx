import { React, useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  getFilesActionCreator,
  setCurrentDirActionCreator,
  setPopupDisplay,
  uploadFiles,
} from "../../actions/file";
import FileList from './FileList';
import Popup from './Popup'
import './disk.css';


const Disc = (props) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir)
  //const loaderWatcher = useSelector(state => state.files.loaderWatcher)
  const dirStack = useSelector(state => state.files.dirStack)

  const [ dragEnter, setDragEnter ] = useState(false);
  const [ sort, setSort ] = useState('type');
  const popupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }
  const backHandler = () => {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDirActionCreator(backDirId));
  }

  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach(file  => {
        dispatch(uploadFiles({ file: file, dirId: currentDir }))
    })
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }

  function dropHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file  => {
      dispatch(uploadFiles({ file: file, dirId: currentDir }))
    })
    setDragEnter(false)
  }

  useEffect(() => {
    dispatch(getFilesActionCreator({currentDir, sort}))
  }, currentDir, sort)

  if(props.loaderWatcher){
    return (
      <div className="loader">
        <div className="lds-hourglass"></div>
      </div>
    )
  }
  return (
    !dragEnter ?
      <div>
        <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
          <div className="disk__btns">
            <button className="disk__back" onClick={() => backHandler()}>Назад</button>
            <button className="disk__create" onClick={() => popupHandler()}>Создать папку</button>
            <div className="disk__upload">
              <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
              <input multiple={true} onChange={(event)=> {
                fileUploadHandler(event)
              }} type="file" id="disk__upload-input" className="disk__upload-input"/>
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk-select'>
              <option value="name">name</option>
              <option value="date">date</option>
              <option value="type">type</option>
            </select>
          </div>
          <FileList/>
        </div>
        <Popup/>
        {/*<Uploader/>*/}
      </div> :
      <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        Перетащите файлы сюда
      </div>
  );
};

export default Disc;

import { useEffect } from 'react';
import './disk.css'
import dirLogo from '../../assets/img/dir.svg'
import fileLogo from '../../assets/img/file.svg'
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentDirActionCreator, pushToStack, downloadFile, deleteReq } from '../../actions/file'
import sizeFormat from '../../utils/sizeFormat'

const File = ({file}) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir)

  function openDirHandler(file) {
    if(file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDirActionCreator(file._id))
    }
  }


  function downloadClickHandler(e) {
    e.stopPropagation()
    dispatch(downloadFile(file))
  }

  return (
    <div className='file' onClick={(e) => openDirHandler(file)}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0,10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== 'dir' && <button onClick={(e) => {
        downloadClickHandler(e);
      }} className="file__btn file__download">download</button>}
      <button className="file__btn file__delete" onClick={(e) => {
        e.stopPropagation();
        dispatch(deleteReq(file));
      }}>delete</button>
    </div>
  );
};

export default File;
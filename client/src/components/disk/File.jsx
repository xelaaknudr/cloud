import React from 'react';
import './disk.css';
import { useDispatch, useSelector } from 'react-redux';
import dirLogo from '../../assets/img/dir.svg';
import fileLogo from '../../assets/img/file.svg';
import {
  setCurrentDirActionCreator, pushToStack, downloadFile, deleteReq,
} from '../../actions/file';
import sizeFormat from '../../utils/sizeFormat';

function File({ file }) {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const fileView = useSelector((state) => state.files.fileView);

  const openDirHandler = (val) => {
    if (val.type === 'dir') {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDirActionCreator(val._id));
    }
  };

  function downloadClickHandler(e) {
    e.stopPropagation();
    dispatch(downloadFile(file));
  }

  if (fileView === 'list') {
    return (
      <div
        aria-hidden="true"
        className="file"
        onClick={() => openDirHandler(file)}
      >
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== 'dir' && (
          <button
            type="button"
            onClick={(e) => {
              downloadClickHandler(e);
            }}
            className="file__btn file__download"
          >
            download
          </button>
        )}
        <button
          type="button"
          className="file__btn file__delete"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteReq(file));
          }}
        >
          delete
        </button>
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div
        aria-hidden="true"
        className="file-plate"
        onClick={() => openDirHandler(file)}
      >
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__size">{sizeFormat(file.size)}</div>
        <div className="file-plate__btns">
          {file.type !== 'dir' && (
            <button
              type="button"
              onClick={(e) => {
                downloadClickHandler(e);
              }}
              className="file-plate__btn file__download"
            >
              download
            </button>
          )}
          <button
            type="button"
            className="file-plate__btn file__delete"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteReq(file));
            }}
          >
            delete
          </button>
        </div>
      </div>
    );
  }
}

export default File;

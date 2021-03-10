import React from 'react';
import './disk.css';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import File from './File';

function FileList() {
  const fileView = useSelector((state) => state.files.fileView);
  const files = useSelector((state) => state.files.files).map((file) => (
    <TransitionGroup key={file._id}>
      <CSSTransition
        key={file._id}
        timeout={500}
        classNames="file"
        exit={false}
      >
        <File key={file._id} file={file} />
      </CSSTransition>

    </TransitionGroup>
  ));

  if (!files.length) {
    return (
      <div className="loader">Файлов в этой папке нету</div>
    );
  }

  if (fileView === 'list') {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Название</div>
          <div className="filelist__date">Дата</div>
          <div className="filelist__size">Размер</div>
        </div>
        {files}
      </div>
    );
  }

  if (fileView === 'plate') {
    return (
      <div className="fileplate">
        {files}
      </div>
    );
  }
}

export default FileList;

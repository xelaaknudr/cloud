import { call, takeEvery, put } from 'redux-saga/effects';
import {
  actions,
  setFilesActionCreator,
  addFileActionCreator,
  deleteFile,
  showUploader,
  addUploadFile,
  loaderWatcher,
} from '../actions/file'

import {toastr} from 'react-redux-toastr'
import { getFiles, createFile, uploadFile, donwloadFile, deleteFileReq, searchFile  } from '../api/disk';



export function* getFilesSaga({ payload }) {
  try {
    console.log(payload, 'dlfg;dfkl;dfjgdkflgjdglkdj');
    //yield put(loaderWatcher(true))
    let url = `http://localhost:5000/api/files`
    if (payload.currentDir) {
      url = `http://localhost:5000/api/files?parent=${payload.currentDir}`
    }
    if (payload.sort) {
      url = `http://localhost:5000/api/files?sort=${payload.sort}`
    }
    if (payload.currentDir && payload.sort) {
      url = `http://localhost:5000/api/files?parent=${payload.currentDir}&sort=${payload.sort}`
    }
    const { data } = yield call(getFiles, { url: url });
    yield put(setFilesActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  } finally {
    //yield put(loaderWatcher(false))
  }
}

export function* createFileSaga({ payload }) {
  try {
    console.log(payload);
    const { data } = yield call(createFile, payload);
    yield put(addFileActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* searchFileSaga({ payload }) {
  try {
    console.log(payload);
    const { data } = yield call(searchFile, payload);
    yield put(setFilesActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  } finally {
    //yield put(loaderWatcher(false))
  }
}

/*function uploadEmitter(file) {
  return eventChannel(emit => {
    axios.post(
      'http://localhost:5000/api/files/upload',
      file,
      {headers: {
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength) {
            let progress = JSON.stringify(Math.round((progressEvent.loaded * 100) / totalLength));
            console.log(progress);
            emit(progress);
          }
        }
      },
    ).then(res => res)
      .catch(e => console.log(e))
  });
}*/

export function* uploadFileSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append('file', payload.file);
    if (payload.dirId) {
      formData.append('dirId', payload.dirId);
    }

    const uploaderFile = { name: payload.file.name, process: 0 }
    yield put(showUploader())
    yield put(addUploadFile(uploaderFile))
    const req = yield call(uploadFile, formData);
    console.log(req);
    yield put(addFileActionCreator(req.data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

/*export function uploadFileTest(payload) {
  return async dispatch => {
    try {
      console.log(payload);
      const formData = new FormData()
      formData.append('file', payload.file)
      if (payload.dirId) {
        formData.append('dirId', payload.dirId)
      }
      const uploadFile = {name: payload.file.name, progress: 0, id: Date.now()}
      dispatch(showUploader())
      dispatch(addUploadFile(uploadFile))
      const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
          if (totalLength) {
            uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
            dispatch(changeUploadFile(uploadFile))
          }
        }
      });
      dispatch(addFileActionCreator(response.data))
    } catch (e) {
      toastr.error(e.response.data.message);
    }
  }
}*/

export function* donwloadFileSaga({ payload }) {
  try {
    const response = yield call(donwloadFile, payload);
    if(response.status === 200){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', payload.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* deleteFileSaga({ payload }) {
  try {
    const res = yield call(deleteFileReq, payload);
    yield put(deleteFile(payload._id))
    //alert(res.data.message);
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}


export default [
  takeEvery(actions.SEARCH_FILE, searchFileSaga),
  takeEvery(actions.DELETE_REQ, deleteFileSaga),
  takeEvery(actions.DOWNLOAD_FILE, donwloadFileSaga),
  takeEvery(actions.UPLOAD_FILES, uploadFileSaga),
  takeEvery(actions.GET_FILES, getFilesSaga),
  takeEvery(actions.CREATE_FILE, createFileSaga),
];

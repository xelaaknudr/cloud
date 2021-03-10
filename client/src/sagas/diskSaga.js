import { call, takeEvery, put } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import {
  actions,
  setFilesActionCreator,
  addFileActionCreator,
  deleteFile,
  showUploader,
  addUploadFile,
} from '../actions/file';
import {
  getFiles,
  createFile,
  uploadFile,
  donwloadFile,
  deleteFileReq,
  searchFile,
  uploadAvatar,
  deleteAvatar,
} from '../api/disk';
import { appendUserActionCreator } from '../actions/user';

export function* getFilesSaga({ payload }) {
  try {
    let url = 'http://localhost:5000/api/files';
    if (payload.currentDir) {
      url = `http://localhost:5000/api/files?parent=${payload.currentDir}`;
    }
    if (payload.sort) {
      url = `http://localhost:5000/api/files?sort=${payload.sort}`;
    }
    if (payload.currentDir && payload.sort) {
      url = `http://localhost:5000/api/files?parent=${payload.currentDir}&sort=${payload.sort}`;
    }
    const { data } = yield call(getFiles, { url });
    yield put(setFilesActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* createFileSaga({ payload }) {
  try {
    const { data } = yield call(createFile, payload);
    yield put(addFileActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* searchFileSaga({ payload }) {
  try {
    const { data } = yield call(searchFile, payload);
    yield put(setFilesActionCreator(data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* uploadFileSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append('file', payload.file);
    if (payload.dirId) {
      formData.append('dirId', payload.dirId);
    }

    const uploaderFile = { name: payload.file.name, process: 0 };
    yield put(showUploader());
    yield put(addUploadFile(uploaderFile));
    const req = yield call(uploadFile, formData);
    yield put(addFileActionCreator(req.data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* donwloadFileSaga({ payload }) {
  try {
    const response = yield call(donwloadFile, payload);
    if (response.status === 200) {
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
    yield call(deleteFileReq, payload);
    yield put(deleteFile(payload._id));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* uploadAvatarSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append('file', payload);
    const req = yield call(uploadAvatar, formData);
    yield put(appendUserActionCreator(req.data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export function* deleteAvatarSaga() {
  try {
    const req = yield call(deleteAvatar);
    yield put(appendUserActionCreator(req.data));
  } catch (e) {
    toastr.error(e.response.data.message);
  }
}

export default [
  takeEvery(actions.UPLOAD_AVATAR, uploadAvatarSaga),
  takeEvery(actions.DELETE_AVATAR, deleteAvatarSaga),
  takeEvery(actions.SEARCH_FILE, searchFileSaga),
  takeEvery(actions.DELETE_REQ, deleteFileSaga),
  takeEvery(actions.DOWNLOAD_FILE, donwloadFileSaga),
  takeEvery(actions.UPLOAD_FILES, uploadFileSaga),
  takeEvery(actions.GET_FILES, getFilesSaga),
  takeEvery(actions.CREATE_FILE, createFileSaga),
];

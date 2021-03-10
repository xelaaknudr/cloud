import { call } from 'redux-saga/effects';
import axios from 'axios';

export function* getFiles(payload) {
  return yield call(axios.get, payload.url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function* searchFile(payload) {
  return yield call(axios.get, `http://localhost:5000/api/files/search?search=${payload}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export function* createFile(payload) {
  return yield call(axios.post, 'http://localhost:5000/api/files',
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* uploadFile(formData) {
  return yield call(axios.post, 'http://localhost:5000/api/files/upload',
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onUploadProgress: (progressEvent) => {
        const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
        if (totalLength) {
          const progress = JSON.stringify(Math.round((progressEvent.loaded * 100) / totalLength));
          console.log(progress);
        }
      },
    });
}

export function* uploadAvatar(formData) {
  return yield call(axios.post, 'http://localhost:5000/api/files/avatar',
    formData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* deleteAvatar() {
  return yield call(axios.delete, 'http://localhost:5000/api/files/avatar',
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

export function* donwloadFile(payload) {
  return yield call(axios.get, `http://localhost:5000/api/files/download?id=${payload._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
}

export function* deleteFileReq(payload) {
  return yield call(axios.delete, `http://localhost:5000/api/files?id=${payload._id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
}

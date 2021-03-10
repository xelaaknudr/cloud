export const actions = {
  SET_FILES: 'SET_FILES',
  SET_CURRENT_DIR: 'SET_CURRENT_DIR',
  GET_FILES: 'GET_FILES',
  CREATE_FILE: 'CREATE_FILE',
  ADD_FILE: 'ADD_FILE',
  SET_POP_UP_DISPLAY: 'POP_UP_DISPLAY',
  PUSH_TO_STACK: 'PUSH_TO_STACK',
  POP_FROM_STACK: 'POP_TO_STACK',
  UPLOAD_FILES: 'UPLOAD_FILES',
  DOWNLOAD_FILE: 'DOWNLOAD_FILE',
  DELETE_FILE: 'DELETE_FILE',
  DELETE_REQ: 'DELETE_REQ',
  SHOW_UPLOADER: 'SHOW_UPLOADER',
  HIDE_UPLOADER: 'HIDE_UPLOADER',
  ADD_UPLOADER_FILE: 'ADD_UPLOADER_FILE',
  REMOVE_UPLOADER_FILE: 'REMOVE_UPLOADER_FILE',
  CHANGE_UPLOADER_FILE: 'CHANGE_UPLOADER_FILE',
  LOADER_WATCHER: 'LOADER_WATCHER',
  SEARCH_FILE: 'SEARCH_FILE',
  SET_FILE_VIEW: 'SET_FILE_VIEW',
  UPLOAD_AVATAR: 'UPLOAD_AVATAR',
  DELETE_AVATAR: 'DELETE_AVATAR',
};

export const setPopupDisplay = (popup) => ({ type: actions.SET_POP_UP_DISPLAY, payload: popup });
export const getFilesActionCreator = (dirId) => ({ type: actions.GET_FILES, payload: dirId });
export const setFilesActionCreator = (files) => ({ type: actions.SET_FILES, payload: files });
export const createFileActionCreator = (file) => ({ type: actions.CREATE_FILE, payload: file });
export const addFileActionCreator = (file) => ({ type: actions.ADD_FILE, payload: file });
export const setCurrentDirActionCreator = (dir) => ({
  type: actions.SET_CURRENT_DIR,
  payload: dir,
});
export const pushToStack = (stack) => ({ type: actions.PUSH_TO_STACK, payload: stack });
export const popFromStack = (stack) => ({ type: actions.POP_FROM_STACK, payload: stack });
export const uploadFiles = (files) => ({ type: actions.UPLOAD_FILES, payload: files });
export const downloadFile = (file) => ({ type: actions.DOWNLOAD_FILE, payload: file });
export const deleteFile = (file) => ({ type: actions.DELETE_FILE, payload: file });
export const deleteReq = (file) => ({ type: actions.DELETE_REQ, payload: file });
export const showUploader = () => ({ type: actions.SHOW_UPLOADER });
export const hideUploader = () => ({ type: actions.HIDE_UPLOADER });
export const addUploadFile = (file) => ({ type: actions.ADD_UPLOADER_FILE, payload: file });
export const removeUploadFile = (file) => ({ type: actions.REMOVE_UPLOADER_FILE, payload: file });
export const changeUploadFile = (file) => ({ type: actions.CHANGE_UPLOADER_FILE, payload: file });
export const loaderWatcher = (loader) => ({ type: actions.LOADER_WATCHER, payload: loader });
export const searchFile = (query) => ({ type: actions.SEARCH_FILE, payload: query });
export const setFileView = (type) => ({ type: actions.SET_FILE_VIEW, payload: type });
export const uploadAvatarActionCreator = (avatar) => ({
  type: actions.UPLOAD_AVATAR,
  payload: avatar,
});
export const deleteAvatarActionCreator = () => ({ type: actions.DELETE_AVATAR });

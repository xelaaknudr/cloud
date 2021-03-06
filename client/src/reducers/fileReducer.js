import { actions } from '../actions/file';

const fileState = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  isVisible: true,
  filesUploader: [],
  loaderWatcher: false,
  fileView: 'list',
};

export default function fileReducer(state = fileState, action) {
  switch (action.type) {
    case actions.CHANGE_UPLOADER_FILE:
      return {
        ...state,
        filesUploader: [state.filesUploader.map((file) => (file.id === action.payload.id
          ? { ...file, progress: action.payload }
          : { ...file }))],
      };
    case actions.SHOW_UPLOADER:
      return {
        ...state,
        isVisible: true,
      };
    case actions.HIDE_UPLOADER:
      return {
        ...state,
        isVisible: false,
      };
    case actions.ADD_UPLOADER_FILE:
      return {
        ...state,
        filesUploader: [...state.filesUploader,
          { ...action.payload, id: state.filesUploader.length }],
      };
    case actions.REMOVE_UPLOADER_FILE:
      return {
        ...state,
        filesUploader: [...state.filesUploader.filter((file) => file.id !== action.payload)],
      };
    case actions.SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case actions.SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case actions.ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case actions.SET_POP_UP_DISPLAY:
      return {
        ...state,
        popupDisplay: action.payload,
      };
    case actions.PUSH_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      };
    case actions.POP_FROM_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      };
    case actions.DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== action.payload)],
      };
    case actions.LOADER_WATCHER:
      return {
        ...state,
        loaderWatcher: action.payload,
      };
    case actions.SET_FILE_VIEW:
      return {
        ...state,
        fileView: action.payload,
      };
    default:
      return state;
  }
}

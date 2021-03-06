import './disk.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../actions/file';
import UploadFile from './UploadFile';

const Uploader = () => {
  const files = useSelector((state) => state.files.filesUploader);
  const isVisible = useSelector((state) => state.files.isVisible);
  const dispatch = useDispatch();

  return (isVisible
    && (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Загрузки</div>
        <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>
      </div>
      {files.map((file) => <UploadFile key={file.id} file={file} />)}
    </div>
    )
  );
};

export default Uploader;

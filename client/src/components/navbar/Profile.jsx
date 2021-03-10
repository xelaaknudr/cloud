import React from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteAvatarActionCreator,
  uploadAvatarActionCreator,
} from '../../actions/file';

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button
        type="button"
        onClick={() => dispatch(deleteAvatarActionCreator())}
      >
        Удалить аватар
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          dispatch(uploadAvatarActionCreator(file));
        }}
      />
    </div>
  );
};

export default Profile;

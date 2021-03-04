import React from 'react';
import ReduxToastr from "react-redux-toastr";
import 'react-redux-toastr/src/styles/variables.scss';
import 'react-redux-toastr/src/styles/index.scss';
import 'react-redux-toastr/src/styles/confirm.scss';
import 'react-redux-toastr/src/styles/animation.scss';

const Alert = () => {
  return (
    <ReduxToastr
      timeOut={1500}
      newestOnTop={false}
      preventDuplicates
      position="top-center"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
    />
  );
};

export default Alert;

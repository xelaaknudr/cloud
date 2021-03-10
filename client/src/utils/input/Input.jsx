import React from 'react';
import './input.css';
import PropTypes from 'prop-types';

const Input = ({
  setValue,
  value,
  type,
  placeholder,
}) => (
  <input
    onChange={(event) => setValue(event.target.value)}
    value={value}
    type={type}
    placeholder={placeholder}
  />
);

Input.propTypes = {
  value: PropTypes.objectOf(PropTypes.String).isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setValue: PropTypes.string.isRequired,
};

export default Input;

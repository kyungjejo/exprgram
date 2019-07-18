import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import style from './ExitButton.module.scss';
import '../../global.css';

const ExitButton = ({ text, primary, handleHidePopup }) => (
  <a href="#" className={style.Button} data-primary={primary} onClick={handleHidePopup}>
    {text}
  </a>
);

ExitButton.propTypes = {
  /**
   * @property {boolean} primary determines is a primary button (emphasized)
   */
  primary: PropTypes.bool,

  /**
   * @property {string} text label to be displayed within the button
   */
  text: PropTypes.string
}

ExitButton.defaultProps = {
  text: 'Hero Button!',
  primary: true,
}

export default ExitButton;

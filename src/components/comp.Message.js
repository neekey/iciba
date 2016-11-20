import React from 'react';
import style from './comp.Message.scss';

export default function Message(props) {
  return props.show ? (<div className={style.container}>
    <div className={style.message}>{props.message}</div>
  </div>) : null;
}

Message.propTypes = {
  show: React.PropTypes.bool,
  message: React.PropTypes.string,
};

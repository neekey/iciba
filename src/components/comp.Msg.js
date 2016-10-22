import React from 'react';
import classNames from 'classnames';

export default function Msg(props) {
  return (<div className={classNames('iciba-extension-iciba-msg', props.className)}>
  <p className="J_Content iciba-extension-content">
    {props.msg}
  </p>
  <i className="J_Close fa fa-times-circle iciba-extension-close" onClick={this.props.onRequestClose} />
  </div>);
}

Msg.propTypes = {
  className: React.PropTypes.string,
  msg: React.PropTypes.any,
  onRequestClose: React.PropTypes.func,
};

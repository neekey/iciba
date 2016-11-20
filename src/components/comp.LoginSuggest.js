import React from 'react';

const LOGIN_URL = 'http://my.iciba.com/index.php?c=login';

export default function LoginSuggest(props) {
  return props.show ? (<div>
    <div onClick={props.onCloseRequest}>X</div>
    <div>请先<a href={LOGIN_URL} target="_blank">登录</a></div>
  </div>) : null;
}

LoginSuggest.propTypes = {
  show: React.PropTypes.bool,
  onCloseRequest: React.PropTypes.func,
};

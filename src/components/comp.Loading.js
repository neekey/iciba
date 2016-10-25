import React from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import style from './comp.Loading.scss';
import progressBarTheme from './theme.ProgressBar.scss';

export default function Loading(props) {
  return props.isLoading ? (<div className={style.container}>
    <ProgressBar type="circular" mode="indeterminate" theme={progressBarTheme} />
  </div>) : null;
}

Loading.propTypes = {
  isLoading: React.PropTypes.bool,
};

Loading.defaultProps = {
  isLoading: false,
};

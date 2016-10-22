import React from 'react';

export default function HTMLElement(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />;
}

HTMLElement.propTypes = {
  html: React.PropTypes.string,
};

HTMLElement.defaultProps = {
  html: '',
};

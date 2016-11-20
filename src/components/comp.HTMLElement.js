import React from 'react';

export default class HTMLElement extends React.Component {
  getElement() {
    return this.element;
  }

  render() {
    return <div
      ref={el => (this.element = el)}
      dangerouslySetInnerHTML={{ __html: props.html }} />;
  }
}

export default function HTMLElement(props) {
  return <div dangerouslySetInnerHTML={{ __html: props.html }} />;
}

HTMLElement.propTypes = {
  html: React.PropTypes.string,
};

HTMLElement.defaultProps = {
  html: '',
};

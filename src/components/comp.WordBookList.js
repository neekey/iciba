import React from 'react';

export default function WordBookList(props) {
  return props.show ? (<div>
    <div onClick={props.onCloseRequest}>X</div>
    <ul className={props.className}>
      {props.books.map(book => (
        <li onClick={() => props.onBookSelect(book)}>{book.name}</li>
      ))}
    </ul>
  </div>) : null;
}

WordBookList.propTypes = {
  className: React.PropTypes.string,
  books: React.PropTypes.array,
  onBookSelect: React.PropTypes.func,
  onCloseRequest: React.PropTypes.func,
  show: React.PropTypes.bool,
};

WordBookList.defaultProps = {
  books: [],
  onCloseRequest: () => {},
};

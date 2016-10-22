import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset() {
    this.setState({
      value: '',
    });
  }

  handleSubmit() {
    const value = this.state.value;
    if (value !== '') {
      this.props.onSearch(value);
      this.reset();
    }
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    return (<form onSubmit={this.handleSubmit} className="iciba-extension-search-wrap">
      <input
        type="text"
        className="iciba-extension-keyword J_IcibaKeyword"
        onChange={this.handleInputChange}
        placeholder="输入单词或者中文" />
      <span
        className="iciba-extension-search J_IcibaSearch"><i className="fa fa-search" />
      </span>
    </form>);
  }
}

SearchForm.propTypes = {
  onSearch: React.PropTypes.func,
};

import React from 'react';
import Input from 'react-toolbox/lib/input';
import inputTheme from './theme.Input.scss';

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

  handleSubmit(event) {
    const value = this.state.value;
    if (value !== '') {
      this.props.onSearch(value);
      this.reset();
    }

    event.preventDefault();
  }

  handleInputChange(value) {
    this.setState({
      value,
    });
  }

  render() {
    return (<form onSubmit={this.handleSubmit} className="iciba-extension-search-wrap">
      <Input
        theme={inputTheme}
        className="iciba-extension-keyword J_IcibaKeyword"
        onChange={this.handleInputChange}
        value={this.state.value}
        placeholder="输入单词或者中文" />
    </form>);
  }
}

SearchForm.propTypes = {
  onSearch: React.PropTypes.func,
};

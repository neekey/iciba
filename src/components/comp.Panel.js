import React from 'react';
import SearchForm from './comp.SearchForm';
import SearchResult from './comp.SearchResult';
import style from './comp.Panel.scss';
import Checkbox from './comp.Checkbox';
import Loading from './comp.Loading';
import Message from './comp.Message';
import WordBookList from './comp.WordBookList';
import LoginSuggest from './comp.LoginSuggest';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBookList: false,
      showLoginSuggest: false,
    };
    this.handleSettingChange = this.handleSettingChange.bind(this);
    this.handleAddToNoteBookClick = this.handleAddToNoteBookClick.bind(this);
    this.handleWordBookListClose = this.handleWordBookListClose.bind(this);
  }

  handleSettingChange(settingName, checked) {
    this.props.onSettingChange(settingName, checked);
  }

  handleWordBookListClose() {
    this.setState({
      showBookList: false,
    });
  }

  handleAddToNoteBookClick() {
    if (this.props.isLogin) {
      this.setState({
        showBookList: true,
      });
    } else {
      this.setState({
        showLoginSuggest: true,
      });
    }
  }

  handleLoginSuggestClose() {
    this.setState({
      showLoginSuggest: false,
    });
  }

  render() {
    return (<div className={style.container}>
      <SearchForm onSearch={this.props.onSearch} />
      <div
        className={this.props.isSearching ?
          style.resultContainerLoading : style.resultContainer}>
        <Loading isLoading={this.props.isSearching} />
        {this.props.searchResult ? <SearchResult
          onSearch={this.props.onSearch}
          onPronounce={this.props.onPronounce}
          onAddToNoteBook={this.handleAddToNoteBookClick}
          result={this.props.searchResult} /> : null}
      </div>
      <LoginSuggest
        show={this.state.showLoginSuggest}
        onCloseRequest={this.handleLoginSuggestClose} />
      <WordBookList
        show={this.state.showBookList}
        isLoading={this.props.isAddingWordToNoteBook}
        onCloseRequest={this.handleWordBookListClose}
        onBookSelect={this.props.onAddToNoteBook}
        books={this.props.wordBookList} />
      <div className={style.settingContainer}>
        <Checkbox
          className={style.settingItem}
          checked
          onChange={checked => this.handleSettingChange('huacifanyi', checked)}
          label="划词翻译" />
        <Checkbox
          className={style.settingItem}
          checked
          onChange={checked => this.handleSettingChange('zidong_fasheng', checked)}
          label="自动发声" />
        <Checkbox
          className={style.settingItem}
          checked
          onChange={checked => this.handleSettingChange('add_to_notebook', checked)}
          label="自动添加生词本" />
      </div>
      <Message show={this.props.showMessage} message={this.props.message} />
    </div>);
  }
}

Panel.propTypes = {
  className: React.PropTypes.string,
  isLogin: React.PropTypes.bool,
  isLoading: React.PropTypes.bool,
  isSearching: React.PropTypes.bool,
  isAddingWordToNoteBook: React.PropTypes.bool,
  settings: React.PropTypes.object,
  searchResult: React.PropTypes.string,
  showMessage: React.PropTypes.bool,
  message: React.PropTypes.any,
  wordBookList: React.PropTypes.array,
  onPronounce: React.PropTypes.func,
  onAddToNoteBook: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onSettingChange: React.PropTypes.func,
};

Panel.defaultProps = {
  onPronounce: () => {},
  onAddToNoteBook: () => {},
  onSearch: () => {},
  onSettingChange: () => {},
  settings: {},
  searchResult: '',
};

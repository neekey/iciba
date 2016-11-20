import React from 'react';
import Panel from './components/comp.Panel';
import { Howl } from 'howler';
import { iciba } from './iciba';

export default class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: {},
      searchResult: '',
      isSearching: false,
      showMessage: false,
      message: null,
      isLogin: false,
      isAddingWordToNoteBook: false,
      noteBookList: [],
      isInitializing: true,
    };

    this.handleSettingChange = this.handleSettingChange.bind(this);
    this.handleAddToNoteBook = this.handleAddToNoteBook.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePronounce = this.handlePronounce.bind(this);
  }

  init() {
    this.setState({
      isInitializing: true,
    });

    iciba.ifLogin(login => {
      if (login) {
        return iciba.getSettings().then(settings =>
          iciba.getNotebookList().then(bookList =>
            this.setState({
              isInitializing: false,
              isLogin: true,
              settings,
              noteBookList: bookList,
            })
          )
        );
      }
      return this.setState({
        isInitializing: false,
        isLogin: false,
      });
    });
  }

  handlePronounce(audioURL) {
    const sound = new Howl({
      src: [audioURL],
    });

    sound.play();
  }

  handleSearch(search) {
    iciba.search(search).then(ret => {
      this.setState({
        searchResult: ret,
        isSearching: false,
      });
    });
    this.setState({
      isSearching: true,
    });
  }

  handleSettingChange(name, value) {
    console.log('setting change', name, value);
  }

  handleAddToNoteBook(word) {
    iciba.addToMyNote({ word }).then(ret => {
      console.log('add to note book searchResult', ret);
    });
  }

  render() {
    return (<Panel
      isLoading={this.state.isSearching}
      searchResult={this.state.searchResult}
      onSettingChange={this.handleSettingChange}
      onAddToNoteBook={this.handleAddToNoteBook}
      onSearch={this.handleSearch}
      onPronounce={this.handlePronounce} />);
  }
}

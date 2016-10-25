import React from 'react';
import Panel from './components/comp.Panel';
import { Howl } from 'howler';
import { iciba } from './iciba';

export default class PanelContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: {},
      result: '',
    };

    this.handleSettingChange = this.handleSettingChange.bind(this);
    this.handleAddToNoteBook = this.handleAddToNoteBook.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePronounce = this.handlePronounce.bind(this);
  }

  handlePronounce(audioURL) {
    const sound = new Howl({
      src: [audioURL],
    });

    sound.play();
  }

  handleSearch(search) {
    console.log('search', search);
    iciba.search(search).then(ret => {
      this.setState({
        result: ret,
      });
    });
  }

  handleSettingChange(name, value) {
    console.log('setting change', name, value);
  }

  handleAddToNoteBook(word) {
    console.log('add to note book', word);
    iciba.addToMyNote({ word }).then(ret => {
      console.log('add to note book result', ret);
    });
  }

  render() {
    return (<Panel
      result={this.state.result}
      onSettingChange={this.handleSettingChange}
      onAddToNoteBook={this.handleAddToNoteBook}
      onSearch={this.handleSearch}
      onPronounce={this.handlePronounce} />);
  }
}

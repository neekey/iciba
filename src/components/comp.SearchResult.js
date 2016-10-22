import React from 'react';
import HTMLElement from './HTMLElement';

export default class SearchResult extends React.Component {
  componentDidMount() {
    this.rebindPronounce();
    this.createAddToNotebookIcon();

    // 若自动发音...
    if (this.props.autoPronounce && this.pronounceURL) {
      this.props.onPronounce(this.pronounceURL);
    }
  }

  createAddToNotebookIcon() {
    // 去掉生词本的默认事件，添加icon
    this.addToNoteBookButton.className += 'fa fa-book iciba-extension-add-to-my-note';
    this.addToNoteBookButton.innerHTML = ' 加入生词本';
    this.addToNoteBookButton.removeAttribute('onclick');
  }

  // 重新设立读音 和 为生词本添加icon
  rebindPronounce() {
    let pronounceURL = null;

    // 从元素的onclick属性中解析出mp3文件地址
    this.container.querySelector('.icIBahyI-eg a').forEach((a, index) => {
      var mp3 = /(http\:.*\.mp3)/.exec(a.getAttribute('onclick'))[0];
      a.setAttribute('data-audio-url', mp3);
      a.removeAttribute('onclick');
      a.className += 'fa fa-volume-up iciba-extension-pronounce';
      pronounceURL = mp3;
    });
    this.pronounceURL = pronounceURL;
  }

  handleResultClick(event) {
    const target = event.target;

    if (this.wordList.contains(target) && target.tagName === 'a') {
      event.preventDefault();
      var keyword = target.textContent;
      this.props.onSearch(keyword);
    }

    if (this.pronounceContainer.contains(target) && target.tagName === 'a') {
      event.preventDefault();
      var mp3 = target.getAttribute('data-audio-url');

      // 调用Howl组件发音
      if (mp3) {
        this.props.onPronounce(mp3)
      }
    }

    if (target === this.addToNoteBookButton) {
      event.preventDefault();
      var word = target.getAttribute('wname');
      this.props.onAddToNoteBook(word);
    }
  }

  getRefs(container) {
    this.container = container;
    this.wordList = container.querySelector('.icIBahyI-label_list');
    this.pronounceContainer = container.querySelector('.icIBahyI-eg a');
    this.addToNoteBookButton = container.querySelector('#CIBA_JOINWORD');
  }

  render() {
    return (<HTMLElement ref={this.getRefs} onClick={this.handleResultClick} html={this.props.result}/>);
  }
}

SearchResult.propTypes = {
  className: React.PropTypes.string,
  result: React.PropTypes.string,
  autoPronounce: React.PropTypes.bool,
  onSearch: React.PropTypes.func,
  onPronounce: React.PropTypes.func,
  onAddToNoteBook: React.PropTypes.func,
};

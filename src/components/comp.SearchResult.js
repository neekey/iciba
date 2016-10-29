import React from 'react';
import style from './comp.SearchResult.scss';

export default class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.getRefs = this.getRefs.bind(this);
    this.handleResultClick = this.handleResultClick.bind(this);
  }

  componentDidMount() {
    this.buildDOMs();
  }

  componentDidUpdate() {
    this.buildDOMs();
  }

  getRefs(container) {
    if (container) {
      this.container = container;
    }
  }

  createAddToNotebookIcon() {
    // 去掉生词本的默认事件，添加icon
    this.addToNoteBookButton.className += 'fa fa-book iciba-extension-add-to-my-note';
    this.addToNoteBookButton.innerHTML = ' 加入生词本';
    this.addToNoteBookButton.removeAttribute('onclick');
  }

  queryDOMs() {
    const container = this.container;
    this.wordList = container.querySelector('.icIBahyI-label_list');
    this.pronounceContainer = container.querySelector('.icIBahyI-prons');
    this.pronounceList = container.querySelectorAll('.icIBahyI-eg');
    this.addToNoteBookContainer = container.querySelector('.icIBahyI-new_word');
    this.addToNoteBookButton = container.querySelector('#CIBA_JOINWORD');
    this.resultContentContainer = container.querySelector('.icIBahyI-simple');
    this.resultFooter = container.querySelector('.icIBahyI-footer');

    this.pronounceContainer.className += ` ${style.pronounceContainer}`;
    this.pronounceList.forEach(item => {
      const pronounceItem = item;
      pronounceItem.className += ` ${style.pronounceItem}`;
    });
    this.addToNoteBookContainer.className += ` ${style.addToNoteBookContainer}`;
    this.addToNoteBookButton.className += ` ${style.addToNoteBookButton}`;
    this.resultContentContainer.className += ` ${style.resultContentContainer}`;
    this.resultFooter.className += ` ${style.resultFooter}`;
  }

  buildDOMs() {
    if (this.container) {
      this.queryDOMs();
      this.rebindPronounce();
      this.createAddToNotebookIcon();

      // 若自动发音...
      if (this.props.autoPronounce && this.pronounceURL) {
        this.props.onPronounce(this.pronounceURL);
      }
    }
  }

  // 重新设立读音 和 为生词本添加icon
  rebindPronounce() {
    let pronounceURL = null;

    // 从元素的onclick属性中解析出mp3文件地址
    this.container.querySelectorAll('.icIBahyI-eg a').forEach((a) => {
      const mp3 = /(http:.*\.mp3)/.exec(a.getAttribute('onclick'))[0];
      pronounceURL = mp3;
      this.pronounceList.forEach(item => {
        if (item.contains(a)) {
          item.setAttribute('data-audio-url', mp3);
        }
      });
      a.remove();
    });
    this.pronounceURL = pronounceURL;
  }

  handleResultClick(event) {
    const target = event.target;

    if (target === this.addToNoteBookButton) {
      event.preventDefault();
      const word = target.getAttribute('wname');
      this.props.onAddToNoteBook(word);
    } else if (this.wordList.contains(target) && target.tagName === 'A') {
      event.preventDefault();
      const keyword = target.textContent;
      this.props.onSearch(keyword);
    } else {
      this.pronounceList.forEach(item => {
        if (item === target || item.contains(target)) {
          event.preventDefault();
          const mp3 = item.getAttribute('data-audio-url');

          // 调用Howl组件发音
          if (mp3) {
            this.props.onPronounce(mp3);
          }
        }
      });
    }
  }

  render() {
    return (<div>
      <div
        dangerouslySetInnerHTML={{ __html: this.props.result }}
        ref={this.getRefs}
        onClick={this.handleResultClick} />
    </div>);
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

SearchResult.defaultProps = {
};

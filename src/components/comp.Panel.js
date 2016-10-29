import React from 'react';
import SearchForm from './comp.SearchForm';
import SearchResult from './comp.SearchResult';
import style from './comp.Panel.scss';
import Checkbox from './comp.Checkbox';
import Loading from './comp.Loading';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleSettingChange(settingName, checked) {
    this.props.onSettingChange(settingName, checked);
  }

  render() {
    return (<div className={style.container}>
      <SearchForm onSearch={this.props.onSearch} />
      <div
        className={this.props.isLoading ?
          style.resultContainerLoading : style.resultContainer}>
        <Loading isLoading={this.props.isLoading} />
        {this.props.result ? <SearchResult
          onSearch={this.props.onSearch}
          onPronounce={this.props.onPronounce}
          onAddToNoteBook={this.props.onAddToNoteBook}
          result={this.props.result} /> : null}
      </div>
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
    </div>);
  }
}

Panel.propTypes = {
  isLoading: React.PropTypes.bool,
  className: React.PropTypes.string,
  onPronounce: React.PropTypes.func,
  onAddToNoteBook: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onSettingChange: React.PropTypes.func,
  settings: React.PropTypes.object,
  result: React.PropTypes.string,
};

Panel.defaultProps = {
  onPronounce: () => {},
  onAddToNoteBook: () => {},
  onSearch: () => {},
  onSettingChange: () => {},
  settings: {},
  result: '',
};

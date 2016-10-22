import React from 'react';
import SearchForm from './comp.SearchForm';
import SearchResult from './comp.SearchResult';

function getCheckBoxIcon(checked) {
  return <i checked={checked} />
}

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSettingChange = this.handleSettingChange.bind(this);
  }

  handleSettingChange(settingName) {
    this.props.onSettingChange(settingName, !this.props.settings[settingName]);
  }

  render() {
    return (<div className="iciba-extension J_Iciba">
      <div className="iciba-extension-header">
        <span className="iciba-extension-logo" />
        <span>爱词霸</span>
        <div className="iciba-extension-tools">
          <a href="mailto:ni184775761@gmail.com" target="_blank" title="联系作者" className="fa fa-envelope-o" />
          <a href="https://github.com/neekey/iciba/issues/new" target="_blank" title="意见反馈" className="fa fa-question-circle" />
        </div>
      </div>
      <SearchForm onSearch={this.props.onSearch}/>
      {this.props.result ? <SearchResult
        onSearch={this.props.onSearch}
        onPronounce={this.props.onPronounce}
        onAddToNoteBook={this.props.onAddToNoteBook} /> : null}
      <div className="iciba-extension-settings J_IcibaSettings">
        <div
          className="item J_Item"
          onClick={() => this.handleSettingChange('setting_huaci')}>
          {getCheckBoxIcon(this.props.settings['setting_huaci'])} 划词翻译</div>
        <div
          className="item J_Item"
          onClick={() => this.handleSettingChange('setting_auto_pronounce')}>
          {getCheckBoxIcon(this.props.settings['setting_auto_pronounce'])} 自动发声</div>
        <div
          className="item J_Item"
          onClick={() => this.handleSettingChange('setting_auto_add_to_my_note')}>
          {getCheckBoxIcon(this.props.settings['setting_auto_add_to_my_note'])} 自动添加生词本</div>
      </div>
    </div>);
  }
}

Panel.propTypes = {
  className: React.PropTypes.string,
  onPronounce: React.PropTypes.func,
  onAddToNoteBook: React.PropTypes.func,
  onSearch: React.PropTypes.func,
  onSettingChange: React.PropTypes.func,
  settings: React.PropTypes.object,
  result: React.PropTypes.string,
};

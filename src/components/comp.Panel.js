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
      <div className={style.resultContainer}>
        <Loading isLoading={false} />
        {this.props.result ? <SearchResult
          onSearch={this.props.onSearch}
          onPronounce={this.props.onPronounce}
          onAddToNoteBook={this.props.onAddToNoteBook}
          result={this.props.result} /> : null}
      </div>
      <div className="iciba-extension-settings J_IcibaSettings">
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
  result: `<div id=\"icIBahyI-title\" 
class=\"icIBahyI-title\" style=\"display:none\">hello</div>        
<div id=\"icIBahyI-dict_main\">            
<div class=\"icIBahyI-dictbar\">             
 
 <div class=\"icIBahyI-dict_title\">                
 
 
 <div class=\"icIBahyI-prons\">				
 <span class=\"icIBahyI-eg\">				
 <span class=\"icIBahyI-fl\">[英]					
 <strong>[</strong>
 <strong lang=\"EN-US\" xml:lang=\"EN-US\">heˈləu</strong><strong>]</strong>				
 </span>				
 <a title=\"机器发音\" 
 onclick=\"asplay_hanci(\'http://res-tts.iciba.com/5/d/4/5d41402abc4b2a76b9719d911017c592.mp3\');\"  
 class=\"icIBahyI-ico_sound\" href=\"javascript:;\"></a>				
 </span> 				
 <span class=\"icIBahyI-eg\">				
 <span class=\"icIBahyI-fl\">[美]				
 <strong>[</strong>
 <strong lang=\"EN-US\" xml:lang=\"EN-US\">hɛˈlo, hə-</strong><strong>]</strong>				
 </span>				
 <a title=\"真人发音\" 
 onclick=\"asplay_hanci(\'http://res.iciba.com/resource/amp3/1/0/5d/41/5d41402abc4b2a76b9719d911017c592.mp3\');\"  
 class=\"icIBahyI-ico_sound\" href=\"javascript:;\"></a>				
 </span>                  
 <span class=\"icIBahyI-new_word\">
 <a id=\"CIBA_JOINWORD\" 
 wname=\"hello\" 
 class=\"icIBahyI-join_word\" 
 href=\"###\" hidefocus=\"true\" onclick=\"iCIBA_JOINWORD();\">生词本</a></span> 
 </div>              
 
 </div>            
 
 
 </div>            
 <div class=\"icIBahyI-simple\">              
 <div class=\"icIBahyI-tab_list\"></div>              
 <div class=\"icIBahyI-dict_content\">                
 <div class=\"icIBahyI-group_prons\">	               		
 <div class=\"icIBahyI-group_pos\"><p>			               
 <span class=\"icIBahyI-fl\">int.</span>
 <span class=\"icIBahyI-label_list\">					              		 
 <label>哈喽，喂；</label> 					              		 
 <label>你好，您好；</label> 					              		 
 <label>表示问候；</label> 					              		 
 <label>打招呼；</label> </span></p><p>			               
 <span class=\"icIBahyI-fl\">n.</span>
 <span class=\"icIBahyI-label_list\">					              		 
 <label>“喂”的招呼声或问候声；</label> 
 </span></p><p>			               
 <span class=\"icIBahyI-fl\">vi.</span>
 <span class=\"icIBahyI-label_list\">					              		 
 <label>喊“喂”；</label> </span></p>              
 </div>              
 </div>         
  </div>      	
  </div>      	
  </div>        
  <div class=\"icIBahyI-footer\">
  <a target=\"_blank\" href=\"http://www.iciba.com/hello\" class=\"icIBahyI-xx\">详细释义</a>
  </div>`,
};

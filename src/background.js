/* global chrome */
import { ICIBACore } from './iciba';

const SEARCH_MENU_ID = '2';
const MESSAGE_TARGET = 'ICIBACore';

// 翻译选中文字菜单
chrome.contextMenus.create({
  title: '翻译选中文字',
  id: SEARCH_MENU_ID,
  contexts: [ 'selection' ],
  onclick(_, tab) {
    chrome.tabs.sendMessage(tab.id, { type: 'search' });
  },
});

chrome.runtime.onMessage.addListener((message, sender, callback) => {
  if (message.target === MESSAGE_TARGET) {
    if (typeof ICIBACore[message.type] === 'function') {
      message.data.push((result) => {
        callback({result: result});
      });
      ICIBACore[message.type].apply(ICIBACore, message.data);
      return true;
    }
  }
});

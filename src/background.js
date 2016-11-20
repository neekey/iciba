/* global chrome */
/* global chrome fetch */
import 'whatwg-fetch';
import { core as ICIBACore } from './iciba';

const SEARCH_MENU_ID = '2';
const MESSAGE_TARGET = 'ICIBA';

// 翻译选中文字菜单
chrome.contextMenus.create({
  title: '翻译选中文字',
  id: SEARCH_MENU_ID,
  contexts: ['selection'],
  onclick(_, tab) {
    chrome.tabs.sendMessage(tab.id, { type: 'search' });
  },
});

chrome.runtime.onMessage.addListener((message, sender, callback) => {
  if (message.target === MESSAGE_TARGET) {
    if (typeof ICIBACore[message.type] === 'function') {
      ICIBACore[message.type].apply(ICIBACore, message.data).then(callback);
      // return true to indicate it's an async action
      return true;
    }
  }

  return false;
});

fetch('http://www.chemistwarehouse.com.au/buy/63404/Nature-39-s-Own-Odourless-Fish-Oil-2000mg-200-Capsules', {
  method: 'GET',
})
  .then(response => response.text())
  .then(result => console.log(result));

/**
 * 添加滑词右键菜单，点击后推送消息到对应的tab页面
 * @type {string}
 */

var searchMenuId = '2';

// 翻译选中文字菜单
chrome.contextMenus.create({
    title: '翻译选中文字',
    id: searchMenuId,
    contexts: [ "selection" ],
    onclick: function( info, tab ){
        chrome.tabs.sendMessage( tab.id, { type: 'search' } );
    }
});
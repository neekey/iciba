/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * 添加滑词右键菜单，点击后推送消息到对应的tab页面
	 * @type {string}
	 */
	!function (host) {
	
	    var searchMenuId = '2';
	    var MESSAGE_TARGET = 'ICIBA';
	    var ICIBA = host.__$ICIBA_CORE;
	
	    // 翻译选中文字菜单
	    chrome.contextMenus.create({
	        title: '翻译选中文字',
	        id: searchMenuId,
	        contexts: ["selection"],
	        onclick: function onclick(info, tab) {
	            chrome.tabs.sendMessage(tab.id, { type: 'search' });
	        }
	    });
	
	    chrome.runtime.onMessage.addListener(function (message, sender, callback) {
	
	        if (message.target == MESSAGE_TARGET) {
	            if (typeof ICIBA[message.type] == 'function') {
	                message.data.push(function (result) {
	                    callback({ result: result });
	                });
	
	                ICIBA[message.type].apply(ICIBA, message.data);
	
	                return true;
	            }
	        }
	    });
	}(undefined);

/***/ }
/******/ ]);
//# sourceMappingURL=background.js.map
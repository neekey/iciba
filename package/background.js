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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _iciba = __webpack_require__(2);
	
	/* global chrome */
	/* global chrome fetch */
	var SEARCH_MENU_ID = '2';
	var MESSAGE_TARGET = 'ICIBA';
	
	// 翻译选中文字菜单
	chrome.contextMenus.create({
	  title: '翻译选中文字',
	  id: SEARCH_MENU_ID,
	  contexts: ['selection'],
	  onclick: function onclick(_, tab) {
	    chrome.tabs.sendMessage(tab.id, { type: 'search' });
	  }
	});
	
	chrome.runtime.onMessage.addListener(function (message, sender, callback) {
	  if (message.target === MESSAGE_TARGET) {
	    if (typeof _iciba.core[message.type] === 'function') {
	      _iciba.core[message.type].apply(_iciba.core, message.data).then(callback);
	      // return true to indicate it's an async action
	      return true;
	    }
	  }
	
	  return false;
	});
	
	fetch('http://www.chemistwarehouse.com.au/buy/63404/Nature-39-s-Own-Odourless-Fish-Oil-2000mg-200-Capsules', {
	  method: 'GET'
	}).then(function (response) {
	  return response.text();
	}).then(function (result) {
	  return console.log(result);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.iciba = exports.core = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global chrome fetch */
	
	
	__webpack_require__(1);
	
	var USER_INFO = void 0;
	var MESSAGE_TARGET = 'ICIBA';
	var PROTOCOL = document.location.protocol === 'https:' ? 'https:' : 'http:';
	
	var getEndPointForSearch = function getEndPointForSearch(word) {
	  return PROTOCOL + '//open.iciba.com/huaci/dict.php?word=' + encodeURIComponent(word);
	};
	var getEndPointForAddWordToNotebook = function getEndPointForAddWordToNotebook() {
	  return PROTOCOL + '//www.iciba.com/ajax/notebook/1';
	};
	var getEndPointForNotebookList = function getEndPointForNotebookList() {
	  return PROTOCOL + '//www.iciba.com/ajax/notebooklist/1';
	};
	
	function convertObjectToFormData(obj, formData, namespace) {
	  var fd = formData || new FormData();
	
	  Object.keys(obj).forEach(function (property) {
	    if (obj.hasOwnProperty(property)) {
	      var formKey = void 0;
	
	      if (namespace) {
	        formKey = namespace + '[' + property + ']';
	      } else {
	        formKey = property;
	      }
	
	      // if the property is an object, but not a File,
	      // use recursivity.
	      if (_typeof(obj[property]) === 'object' && !(obj[property] instanceof File)) {
	        convertObjectToFormData(obj[property], fd, property);
	      } else {
	        // if it's a string or a File object
	        fd.append(formKey, obj[property]);
	      }
	    }
	  });
	
	  return fd;
	}
	
	var core = exports.core = {
	  search: function search(word) {
	    return fetch(getEndPointForSearch(word), {
	      credentials: 'include'
	    }).then(function (data) {
	      return data.text();
	    }).then(function (data) {
	      var ret = /dict.innerHTML='(.*)'/.exec(data);
	      if (ret && ret[1]) {
	        return ret[1].replace(/\\"/g, '"');
	      }
	      throw new Error('\u672A\u627E\u5230 ' + word);
	    });
	  },
	  addToMyNote: function addToMyNote(_ref) {
	    var word = _ref.word,
	        notebookName = _ref.notebookName,
	        notebookId = _ref.notebookId;
	
	    return this.getCurrentUserInfo().then(function (user) {
	      if (user) {
	        return fetch(getEndPointForAddWordToNotebook(), {
	          credentials: 'include',
	          method: 'POST',
	          body: convertObjectToFormData({
	            u: user.id,
	            b: [],
	            w: JSON.stringify([{
	              ID: 1,
	              w: word,
	              p: notebookName,
	              i: notebookId
	            }])
	          })
	        }).then(function (ret) {
	          return ret.json();
	        }).then(function (ret) {
	          if (ret[0] && !ret[0].errno) {
	            return ret[0];
	          }
	          throw ret;
	        });
	      }
	      throw new Error('need to login first');
	    });
	  },
	  ifLogin: function ifLogin(next) {
	    return this.getCurrentUserInfo(function (user) {
	      return next(!!user);
	    });
	  },
	  getSettings: function getSettings() {
	    return new Promise(function (resolve) {
	      chrome.storage.local.get(['setting_huaci', 'setting_auto_pronounce', 'setting_auto_add_to_my_note'], resolve);
	    });
	  },
	  getNotebookList: function getNotebookList() {
	    return this.getCurrentUserInfo().then(function (user) {
	      if (user) {
	        if (user.books) {
	          return Promise.resolve(user.books);
	        }
	        return fetch(getEndPointForNotebookList(), {
	          credentials: 'include',
	          method: 'POST',
	          body: convertObjectToFormData({
	            u: user.id
	          })
	        }).then(function (res) {
	          return res.json();
	        }).then(function (res) {
	          USER_INFO.books = res.books;
	          return res.books;
	        });
	      }
	      return [];
	    });
	  },
	  getCurrentUserInfo: function getCurrentUserInfo() {
	    var _this = this;
	
	    if (typeof USER_INFO === 'undefined') {
	      var _ret = function () {
	        var user = null;
	        return {
	          v: _this.getAllCookies().then(function (cookies) {
	            cookies.forEach(function (cookie) {
	              if (cookie.name === '_ustat') {
	                var userInfo = {};
	                try {
	                  userInfo = JSON.parse(decodeURIComponent(cookie.value));
	                } catch (e) {
	                  userInfo = {};
	                }
	
	                // 是否存在用户名，是则任务登陆了
	                if (userInfo.e) {
	                  user = {
	                    id: userInfo.i,
	                    email: userInfo.e
	                  };
	                }
	              }
	            });
	
	            USER_INFO = user;
	            return user;
	          })
	        };
	      }();
	
	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	
	    return Promise.resolve(USER_INFO);
	  },
	  setSettings: function setSettings(obj) {
	    return new Promise(function (resolve) {
	      chrome.storage.local.set(obj, resolve);
	    });
	  },
	  getAllCookies: function getAllCookies() {
	    return new Promise(function (resolve) {
	      chrome.cookies.getAll({ domain: 'iciba.com' }, resolve);
	    });
	  }
	};
	
	var iciba = exports.iciba = {};
	
	Object.keys(core).forEach(function (key) {
	  iciba[key] = function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return new Promise(function (resolve) {
	      chrome.runtime.sendMessage({
	        target: MESSAGE_TARGET,
	        type: key,
	        data: [].concat(args)
	      }, function (ret) {
	        console.log('sendmessage ret', ret);
	        resolve(ret);
	      });
	    });
	  };
	});

/***/ }
/******/ ]);
//# sourceMappingURL=background.js.map
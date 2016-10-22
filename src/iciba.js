/* global chrome */
import $ from 'jquery';

let USER_INFO;
const MESSAGE_TARGET = 'ICIBA';
const PROTOCOL = document.location.protocol === 'https:' ? 'https:' : 'http:';

const getEndPointForSearch =
  (word) => `${PROTOCOL}//open.iciba.com/huaci/dict.php?word=${encodeURIComponent(word)}`;
const getEndPointForAddWordToNotebook = () => `${PROTOCOL}//www.iciba.com/ajax/notebook/1`;
const getEndPointForNotebookList = () => `${PROTOCOL}//www.iciba.com/ajax/notebooklist/1`;

export const ICIBACore = {
  search(word, next) {
    $.get(getEndPointForSearch(word), (data) => {
      const ret = /dict.innerHTML='(.*)'/.exec(data);

      if (ret && ret[1]) {
        next(ret[1].replace(/\\"/g, '"'));
      } else {
        next(`未找到 ${word}`);
      }
    });
  },

  addToMyNote({ word, notebookName, notebookId }, next) {
    let result = -1;
    this.getCurrentUserInfo((user) => {
      if (user) {
        $.post(getEndPointForAddWordToNotebook(), {
          u: user.id,
          b: [],
          w: JSON.stringify([{
            ID: 1,
            w: word,
            p: notebookName,
            i: notebookId,
          }]),
        }, (ret) => {
          if (!ret.errno) {
            result = 1;
          }
          next(result);
        }, 'json');
      } else {
        next(result);
      }
    });
  },

  ifLogin(next) {
    this.getCurrentUserInfo((user) => next(!!user));
  },

  getSettings(next) {
    chrome.storage.local.get(
      ['setting_huaci', 'setting_auto_pronounce', 'setting_auto_add_to_my_note'], next);
  },

  getNotebookList(next) {
    this.getCurrentUserInfo((user) => {
      if (user) {
        if (user.books) {
          next(user.books);
        } else {
          $.post(getEndPointForNotebookList(), { u: user.id }, (res) => {
            USER_INFO.books = res.books;
            next(res.books);
          }, 'json');
        }
      } else {
        next([]);
      }
    });
  },

  getCurrentUserInfo(next) {
    if (typeof USER_INFO === 'undefined') {
      let user = null;
      return this.getAllCookies((cookies) => {
        cookies.forEach(cookie => {
          if (cookie.name === '_ustat') {
            let userInfo = {};
            try {
              userInfo = JSON.parse(decodeURIComponent(cookie.value));
            } catch (e) {
              userInfo = {};
            }

            // 是否存在用户名，是则任务登陆了
            if (userInfo.e) {
              user = {
                id: userInfo.i,
                email: userInfo.e,
              };
            }
          }
        });

        USER_INFO = user;
        next(user);
      });
    }

    return next(USER_INFO);
  },

  setSettings(obj, next) {
    chrome.storage.local.set(obj, next);
  },

  getAllCookies(next) {
    chrome.cookies.getAll({ domain: 'iciba.com' }, next);
  },
};

export const ICIBA = {};

Object.keys(ICIBACore).forEach((key) => {
  ICIBA[key] = () => {
    const next = arguments[arguments.length - 1];
    const args = Array.prototype.slice.call(arguments, 0, -1);
    chrome.runtime.sendMessage({
      target: MESSAGE_TARGET,
      type: key,
      data: args,
    }, (response) => {
      if (typeof next === 'function') {
        next(response.result);
      }
    });
  };
});

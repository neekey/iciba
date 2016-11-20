/* global chrome fetch */
import 'whatwg-fetch';

let USER_INFO;
const MESSAGE_TARGET = 'ICIBA';
const PROTOCOL = document.location.protocol === 'https:' ? 'https:' : 'http:';

const getEndPointForSearch =
  (word) => `${PROTOCOL}//open.iciba.com/huaci/dict.php?word=${encodeURIComponent(word)}`;
const getEndPointForAddWordToNotebook = () => `${PROTOCOL}//www.iciba.com/ajax/notebook/1`;
const getEndPointForNotebookList = () => `${PROTOCOL}//www.iciba.com/ajax/notebooklist/1`;

function convertObjectToFormData(obj, formData, namespace) {
  const fd = formData || new FormData();

  Object.keys(obj).forEach(property => {
    if (obj.hasOwnProperty(property)) {
      let formKey;

      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        convertObjectToFormData(obj[property], fd, property);
      } else {
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  });

  return fd;
}

export const core = {
  search(word) {
    return fetch(getEndPointForSearch(word), {
      credentials: 'include',
    })
    .then(data => data.text())
    .then(data => {
      const ret = /dict.innerHTML='(.*)'/.exec(data);
      if (ret && ret[1]) {
        return ret[1].replace(/\\"/g, '"');
      }
      throw new Error(`未找到 ${word}`);
    });
  },

  addToMyNote({ word, notebookName, notebookId }) {
    return this.getCurrentUserInfo().then(user => {
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
              i: notebookId,
            }]),
          }),
        })
        .then(ret => ret.json())
        .then(ret => {
          if (ret[0] && !ret[0].errno) {
            return ret[0];
          }
          throw ret;
        });
      }
      throw new Error('need to login first');
    });
  },

  ifLogin(next) {
    return this.getCurrentUserInfo((user) => next(!!user));
  },

  getSettings() {
    return new Promise((resolve) => {
      chrome.storage.local.get([
        'setting_huaci',
        'setting_auto_pronounce',
        'setting_auto_add_to_my_note',
      ], resolve);
    });
  },

  getNotebookList() {
    return this.getCurrentUserInfo().then((user) => {
      if (user) {
        if (user.books) {
          return Promise.resolve(user.books);
        }
        return fetch(getEndPointForNotebookList(), {
          credentials: 'include',
          method: 'POST',
          body: convertObjectToFormData({
            u: user.id,
          }),
        }).then((res) => res.json()).then(res => {
          USER_INFO.books = res.books;
          return res.books;
        });
      }
      return [];
    });
  },

  getCurrentUserInfo() {
    if (typeof USER_INFO === 'undefined') {
      let user = null;
      return this.getAllCookies().then((cookies) => {
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
        return user;
      });
    }

    return Promise.resolve(USER_INFO);
  },

  setSettings(obj) {
    return new Promise((resolve) => {
      chrome.storage.local.set(obj, resolve);
    });
  },

  getAllCookies() {
    return new Promise((resolve) => {
      chrome.cookies.getAll({ domain: 'iciba.com' }, resolve);
    });
  },
};

export const iciba = {};

Object.keys(core).forEach((key) => {
  iciba[key] = (...args) => new Promise((resolve) => {
    chrome.runtime.sendMessage({
      target: MESSAGE_TARGET,
      type: key,
      data: [...args],
    }, (ret) => {
      console.log('sendmessage ret', ret);
      resolve(ret);
    });
  });
});

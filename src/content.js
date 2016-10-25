/* global chrome */
import $ from 'jquery';
import { ICIBA } from './iciba';
const DictWrap = $('<div class="iciba-extension-wrap"></div>');
const DICT = new ICIBA.DICT(DictWrap);

// 默认隐藏词典
DictWrap.hide();
$(document.body).append(DictWrap);

/**
 * 是否开启划词翻译
 */
let IF_TRANSLATE_SELECTION = false;

/**
 * 最后一次的鼠标按下 event 对象
 */
let LAST_MOUSE_DOWN = null;

/**
 * 用于选中操作的动作记录  mousedown: 1, mousemove: 2 之后的 mouseup 才认为是selection
 */
let SELECTION_STAT = null;

/**
 * 是否禁用鼠标的click空白处关闭词典
 * @type {boolean}
 */
let STOP_CLICK_HIDE = false;

/**
 * 不对URL等使用翻译
 * /^((https?:\/\/)?(\w+\.)+\w+)/  URL
 * /^\w+@(\w+\.)+\w+/  邮箱
 */
const textValidate = (text) => {
  if (text && !text.match(/^((https?:\/\/)?(\w+\.)+\w+)/) && !text.match(/^\w+@(\w+\.)+\w+/)) {
    return true;
  }
  return false;
};


/**
 * 根据鼠标事件，获取坐标
 * @param ev
 * @returns {{x: *, y: *}}
 */
const getMouseCoords = (ev) => {
  let mouseX;
  let mouseY;

  if (!document.all) {
    mouseX = ev.pageX;
    mouseY = ev.pageY;
  } else {
    mouseX = document.documentElement.scrollLeft + ev.clientX;
    mouseY = document.documentElement.scrollTop + ev.clientY;
  }
  return {
    x: mouseX,
    y: mouseY,
  };
};

const getPosition = (refer, tooltip, container) => {
  const GAP = 0;
  const DOC = $(container || document);
  const WIN = $(container || window);
  const scrollTop = DOC.scrollTop();
  const scrollLeft = DOC.scrollLeft();
  const winWidth = WIN.width();
  const winHeight = WIN.height();

  const referW = refer.width;
  const referH = refer.height;
  const referX = refer.x;
  const referY = refer.y;

  const tooltipW = tooltip.width;
  const tooltipH = tooltip.height;

  const result = {
    x: null,
    y: null,
  };

  // 现决定x的位置

  // 左边比较宽
  if (referX - scrollLeft > (scrollLeft + winWidth) - (referX + referW)) {
    result.x = referX - tooltipW - GAP;
  } else {
    result.x = referX + referW + GAP;
  }

  // 决定y的位置
  if (referY - scrollTop > (scrollTop + winHeight) - (referY + referH)) {
    result.y = referY - tooltipH - GAP;
  } else {
    result.y = referY + referH + GAP;
  }
  return result;
};

/**
 * 获取页面当前选中的单词
 * @returns {string}
 */
const getSelectedTxt = () => {
  let txt = '';
  if (document.selection) {
    txt = document.selection.createRange().text;
  } else {
    txt = document.getSelection();
  }
  return txt.toString().trim();
};

/**
 * 翻译选中的文字
 */
const searchSelection = () => {
  const text = getSelectedTxt();

  if (textValidate(text)) {
    const offset = getMouseCoords(LAST_MOUSE_DOWN);
    const pos = getPosition({
      x: offset.x,
      y: offset.y,
      width: 20,
      height: 20,
    }, {
      width: 290,
      height: 200,
    });

    DictWrap.css({
      top: pos.y,
      left: pos.x,
    });
    DictWrap.show();
    DICT.searchWord(text);
  }
};

/**
 * 获取默认配置项
 */
ICIBA.getSettings((settings) => {
  IF_TRANSLATE_SELECTION = settings.setting_huaci;

  // 监控划词设置项的变更
  chrome.storage.onChanged.addListener((changes) => {
    const settingHuaci = changes.setting_huaci;
    if (settingHuaci) {
      IF_TRANSLATE_SELECTION = settingHuaci.newValue;
    }
  });
});

/**
 * 用于记录最后一次鼠标抬起的鼠标事件，用户计算选中文字位置
 */
$(document).bind('mouseup', (e) => {
  LAST_MOUSE_DOWN = e;
});

/**
 * 点击空白处关闭词典
 */
$(document).bind('click', () => {
  if (STOP_CLICK_HIDE) {
    STOP_CLICK_HIDE = false;
  } else {
    DictWrap.hide();
  }
});

DictWrap.bind('click', (e) => {
  e.stopPropagation();
});

/**
 * 划词的三个阶段 mousedown, mousemove, mouseup
 */
$(document).bind('mousedown', (e) => {
  LAST_MOUSE_DOWN = e;

  // 划词的动作仅仅记录左键，表面右键的干扰
  if (e.button === 0) {
    SELECTION_STAT = 1;
  }
});
$(document).bind('mousemove', () => {
  if (SELECTION_STAT === 1 || SELECTION_STAT === 2) {
    SELECTION_STAT = 2;
  } else {
    SELECTION_STAT = null;
  }
});
$(document).bind('mouseup', () => {
  if (SELECTION_STAT === 2 && IF_TRANSLATE_SELECTION) {
    searchSelection();
    STOP_CLICK_HIDE = true;
  }
  SELECTION_STAT = null;
});

/**
 * 浏览器的双击时会默认选词，因此也认为划词
 */
$(document).bind('dblclick', () => {
  IF_TRANSLATE_SELECTION && searchSelection();
});

/**
 * 监听bg那边发送过来的菜单“翻译选中文字”的功能
 */
chrome.extension.onMessage.addListener((msg) => {
  if (msg) {
    if (msg.type === 'search') {
      searchSelection();
    }
  }
});

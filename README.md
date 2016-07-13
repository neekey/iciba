iciba - V2.1.1
=====

从 [爱词霸](http://www.iciba.com/)中剥离并改造的Chrome小插件

### 功能

- 中英文翻译（同爱词霸页面上的widget）
- 支持英式/美式发音（爱词霸这边用了Flash等复杂的东西，由于我们是Chrome组件，因此简化了下，解析出它的mp3文件，使用html5的audio组件[howler.js](https://github.com/goldfire/howler.js)完成读音）

### 使用

- 可以直接从 [应用商店安装](https://chrome.google.com/webstore/detail/iciba/gfjdknmhcnojklipadhmmjgljfhelkga?utm_source=chrome-ntp-icon)，或者手动安装：
- 下载插件[安装包](https://github.com/neekey/iciba/blob/master/build/iciba_2.1.1.crx?raw=true)
- 打开chrome的`工具（Tools）\拓展程序（Extensions）`页面，将安装文件拖入页面即可（若拖入页面无反应，请重启Chrome）：

![Screen Shot 2013-03-31 at 8 32 54 PM](https://f.cloud.github.com/assets/499870/321683/93b9434c-99ff-11e2-84ec-81533a6f3296.png)

### 截图

#### 一、通过插件按钮查找单词：

![2014-01-31 1 23 42](https://f.cloud.github.com/assets/499870/2042589/62e54756-89d3-11e3-8a59-bc621efd9933.png)

#### 二、页面划词取词

##### （一）选中文字右键选择`翻译选中文字`

![Screen Shot 2013-04-03 at 11 41 54 AM](https://f.cloud.github.com/assets/499870/332029/999c0656-9c10-11e2-984d-e8e528c18fa9.png)

##### （二）激活当前页面的划词翻译功能

当你在浏览英文页面时，可能需要频繁地进行单词翻译，此时开启划词翻译功能，方便双击单词进行单词翻译

####  （三）添加到生词本

可以将单词添加到生词本，前提是进入爱词霸官网进行一次登陆操作即可。

####  （四）其他

- 自动添加到生词本：所有查过的单词都将自动添加到单词本中
- 自动发声：自动播放音频

### 反馈

https://github.com/neekey/iciba/issues

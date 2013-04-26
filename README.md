iciba - V1.2.1
=====

从 [爱词霸](http://www.iciba.com/)中剥离并改造的Chrome小插件

### 功能

- 中英文翻译（同爱词霸页面上的widget）
- 支持英式/美式发音（爱词霸这边用了Flash等复杂的东西，由于我们是Chrome组件，因此简化了下，解析出它的mp3文件，使用html5的audio组件[howler.js](https://github.com/goldfire/howler.js)完成读音）

### 使用

- 下载插件[安装包](https://github.com/neekey/iciba/blob/master/build/iciba_1.2.0.crx?raw=true)
- 打开chrome的`工具（Tools）\拓展程序（Extensions）`页面，将安装文件拖入页面即可（若拖入页面无反应，请重启Chrome）：

![Screen Shot 2013-03-31 at 8 32 54 PM](https://f.cloud.github.com/assets/499870/321683/93b9434c-99ff-11e2-84ec-81533a6f3296.png)

### 截图

#### 一、通过插件按钮查找单词：

![Screen Shot 2013-03-29 at 1 58 40 AM](https://f.cloud.github.com/assets/499870/314684/89c0a78e-97d1-11e2-81fa-a76a55bebc11.png)

#### 二、页面划词取词

##### （一）选中文字右键选择`翻译选中文字`

![Screen Shot 2013-04-03 at 11 41 54 AM](https://f.cloud.github.com/assets/499870/332029/999c0656-9c10-11e2-984d-e8e528c18fa9.png)

##### （二）激活当前页面的划词翻译功能

当你在浏览英文页面时，可能需要频繁地进行单词翻译，此时开启划词翻译功能，方便双击单词进行单词翻译（注意，在空白处右键，否则将选中单词，`启用划词翻译`选项将不可见）：

![Screen Shot 2013-04-03 at 11 43 30 AM](https://f.cloud.github.com/assets/499870/332033/afd76afa-9c10-11e2-890d-d35ca18374da.png)

单词翻译结果截图：

![Screen Shot 2013-04-03 at 11 44 08 AM](https://f.cloud.github.com/assets/499870/332034/c60518d6-9c10-11e2-9423-41b54b33d65f.png)

### TODOS

- 添加返回上一个查词记录功能
- ~~添加页面划词查找功能~~

### 反馈

https://github.com/neekey/iciba/issues

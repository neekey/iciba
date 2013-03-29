iciba
=====

从 [爱词霸](http://www.iciba.com/)中剥离并改造的Chrome小插件

### 截图
![Screen Shot 2013-03-29 at 1 58 40 AM](https://f.cloud.github.com/assets/499870/314684/89c0a78e-97d1-11e2-81fa-a76a55bebc11.png)

### 功能

- 中英文翻译（同爱词霸页面上的widget）
- 支持英式/美式发音（爱词霸这边用了Flash等复杂的东西，由于我们是Chrome组件，因此简化了下，解析出它的mp3文件，使用html5的audio组件[howler.js](https://github.com/goldfire/howler.js)完成读音）

### 使用

build好的安装文件在`build`目录下，打开chrome的`工具\拓展程序`页面，将安装文件拖入页面即可。

### TODOS

- 添加页面划词查找功能
- 添加返回上一个查词记录功能

### 反馈

https://github.com/neekey/iciba/issues

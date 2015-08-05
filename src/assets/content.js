!(function( host ){

    /**
     * 初始化ICIBA节点和基本的词典功能
     */
    var ICIBA = host.__$ICIBA;
    var DictWrap = $('<div class="iciba-extension-wrap"></div>');
    var DICT = new ICIBA.DICT( DictWrap );

    // 默认隐藏词典
    DictWrap.hide();
    $( document.body ).append( DictWrap );

    /**
     * 是否开启划词翻译
     */
    var IF_TRANSLATE_SELECTION = false;

    /**
     * 最后一次的鼠标按下 event 对象
     */
    var LAST_MOUSE_DOWN = null;

    /**
     * 用于选中操作的动作记录  mousedown: 1, mousemove: 2 之后的 mouseup 才认为是selection
     */
    var SELECTION_STAT = null;

    /**
     * 是否禁用鼠标的click空白处关闭词典
     * @type {boolean}
     */
    var STOP_CLICK_HIDE = false;

    /**
     * 获取默认配置项
     */
    ICIBA.getSettings(function( settings ){
        IF_TRANSLATE_SELECTION = settings[ 'setting_huaci' ];

        // 监控划词设置项的变更
        chrome.storage.onChanged.addListener(function callback( changes ){
            var setting_huaci = changes.setting_huaci;
            if( setting_huaci ){
                IF_TRANSLATE_SELECTION = setting_huaci.newValue;
            }
        });
    });

    /**
     * 用于记录最后一次鼠标抬起的鼠标事件，用户计算选中文字位置
     */
    $( document).bind( 'mouseup', function( e ){
        LAST_MOUSE_DOWN = e;
    });

    /**
     * 点击空白处关闭词典
     */
    $( document).bind( 'click', function( e ){

        if( STOP_CLICK_HIDE ){
            STOP_CLICK_HIDE = false;
        }
        else {
            DictWrap.hide();
        }
    });

    DictWrap.bind( 'click', function( e ){
        e.stopPropagation();
    });

    /**
     * 划词的三个阶段 mousedown, mousemove, mouseup
     */
    $( document ).bind( 'mousedown', function( e ){
        LAST_MOUSE_DOWN = e;

        // 划词的动作仅仅记录左键，表面右键的干扰
        if(e.button == 0){
            SELECTION_STAT = 1;
        }
    });
    $( document ).bind( 'mousemove', function(){
        if( SELECTION_STAT == 1 || SELECTION_STAT == 2 ){
            SELECTION_STAT = 2
        }
        else {
            SELECTION_STAT = null;
        }
    });
    $( document ).bind( 'mouseup', function( e ){

        if( SELECTION_STAT == 2 && IF_TRANSLATE_SELECTION ){
            searchSelection();
            STOP_CLICK_HIDE = true;
        }

        SELECTION_STAT = null;
    });

    /**
     * 浏览器的双击时会默认选词，因此也认为划词
     */
    $( document ).bind( 'dblclick', function( e ){
        IF_TRANSLATE_SELECTION && searchSelection();
    });

    /**
     * 监听bg那边发送过来的菜单“翻译选中文字”的功能
     */
    chrome.extension.onMessage.addListener(function( msg ){
        if( msg ){
            if( msg.type == 'search' ){
                searchSelection();
            }
        }
    });

    /**
     * 不对URL等使用翻译
     * /^((https?:\/\/)?(\w+\.)+\w+)/  URL
     * /^\w+@(\w+\.)+\w+/  邮箱
     */
    var textValidate = function( text ){
        if( text && !text.match(/^((https?:\/\/)?(\w+\.)+\w+)/) && !text.match(/^\w+@(\w+\.)+\w+/) ){
            return true;
        }
        return false;
    };

    /**
     * 翻译选中的文字
     */
    var searchSelection = function(){

        var text = getSelectedTxt();

        if( textValidate(text) ){
            var offset = getMouseCoords( LAST_MOUSE_DOWN );
            var pos = getPosition( {
                x: offset.x,
                y: offset.y,
                width: 20,
                height: 20
            }, {
                width: 290,
                height: 200
            });

            DictWrap.css({
                top: pos.y,
                left: pos.x
            });
            DictWrap.show();
            DICT.searchWord( text );
        }
    };

    /**
     * 获取页面当前选中的单词
     * @returns {string}
     */
    var getSelectedTxt = function(){
        var txt = "";
        if(document.selection) {
            txt = document.selection.createRange().text;
        } else {
            txt = document.getSelection();
        }
        return txt.toString().trim();
    };

    /**
     * 根据鼠标事件，获取坐标
     * @param ev
     * @returns {{x: *, y: *}}
     */
    var getMouseCoords = function( ev ){

        var mouse_x;
        var mouse_y;

        if(!document.all){
            mouse_x=ev.pageX;
            mouse_y=ev.pageY;
        }else{
            mouse_x=document.documentElement.scrollLeft+ev.clientX;
            mouse_y=document.documentElement.scrollTop+ev.clientY;
        }
        return {
            x:mouse_x,
            y:mouse_y
        };
    };
    
    var getPosition = function( refer, tooltip, container ){

        var GAP = 0;
        var DOC = $( container || document );
        var WIN = $( container || window );
        var scrollTop = DOC.scrollTop();
        var scrollLeft = DOC.scrollLeft();
        var winWidth = WIN.width();
        var winHeight = WIN.height();

        var referW = refer.width;
        var referH = refer.height;
        var referX = refer.x;
        var referY = refer.y;

        var tooltipW = tooltip.width;
        var tooltipH = tooltip.height;

        var result = {
            x: null,
            y: null
        };

        // 现决定x的位置

        // 左边比较宽
        if( referX - scrollLeft > ( scrollLeft + winWidth ) - ( referX + referW ) ){
            result.x = referX - tooltipW - GAP;
        }
        else {
            result.x = referX + referW + GAP;
        }

        // 决定y的位置
        if( referY - scrollTop > ( scrollTop + winHeight ) - ( referY + referH ) ){
            result.y = referY - tooltipH - GAP;
        }
        else {
            result.y = referY + referH + GAP;
        }

        return result;
    };

})( this );

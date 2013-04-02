var HUACI = {
    // 是否为本页第一次划
    FIRST_SELECT: 0,
    // 是否固定搜索面板
    IF_FIXED: 0,
    // 是否允许划词
    IF_ALLOW: false,
    // 单词输入框
    wordInput: null,
    // 结果呈现区域
    searchResultCon: null,
    // Loading
    searchLoading: null,
    // 整个搜索面板
    box: null,
    // 划词内容太长提示
    tooLongTip: null,
    // 查词小图标
    searchIcon: null,
    // 关闭按钮
    closeIcon: null,
    // 固定按钮
    fixedIcon: null,
    // 最近一次mousedown事件的event对象
    // 用于用户点击翻译选中文字时的定位
    latestMouseDownEvent: null,

    init: function(){
        this.wordInput = $( '#ICIBA_HUAYI_input' );
        this.searchResultCon = $( '#icIBahyI-main_cont' );
        this.searchLoading = $( '#loading' );
        this.box = $( '#icIBahyI-main_box' );
        this.searchIcon = $( '#icIBahyI-yi' );
        this.tooLongTip = $( '#ICIBA_TOO_LONG' );
        this.closeIcon = $( '#icIBahyI-gb' );
        this.fixedIcon = $( '#icIBahyI-dq' );
        this.initSelectEvent();
    },

    /**
     * 切换是否启用划词
     */
    toggleAllowUnderline: function(){
        this.IF_ALLOW = !this.IF_ALLOW;
    },

    /**
     * 查询单词: ICIBA_HUAYI_searchword
     */
    searchWord: function( word, ifShow ){

        word = word || this.wordInput.val();
        if( word.length > 1000 ){
            this.wordInput.val( '' );
            this.tooLongTip.show();
            this.searchResultCon.hide();
            this.searchLoading.hide();
        }
        else {
            this.wordInput.val( word );
            this.searchResultCon.hide();
            this.searchLoading.show();
            this.tooLongTip.hide();

            icibaMessager.postMessage({
                type: 'search',
                word: word
            });
        }

        if( ifShow ){
            this.box.show();
        }
    },

    /**
     * 获取元素的offset：ICIBA_HUAYI_GetObjPos
     * @param target
     * @returns {{x: *, y: *}}
     */
    getObjectPosition: function( target ){
        var offset = $( target).offset();
        return {
            x: offset.left,
            y: offset.top
        }
    },

    /**
     * 获取页面当前选中的单词
     * @returns {string}
     */
    getSelectedTxt: function(){
        var txt = "";
        if(document.selection) {
            txt = document.selection.createRange().text;
        } else {
            txt = document.getSelection();
        }
        return txt.toString().trim();
    },

    getMouseCoords: function( ev ){

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
    },

    initSelectEvent: function(){

        var DOC = $( document );
        var HUA = 0;   //状态位  0:划词框消失 1：当鼠标按下时置1 2：如果此位为1的时候松开鼠标此位置2
        var self = this;

        // 点击关闭内容窗口
        this.closeIcon.bind( 'click', function(){
            self.IF_FIXED = 0;
            self.fixedIcon.attr( 'class', 'icIBahyI-dq2' );
            self.box.hide();
        });

        this.fixedIcon.bind( 'click', function( ev){

            var obj =  $('#icIBahyI-main_box');
            var mousePos = self.getMouseCoords(ev);
            var top = mousePos.y+10;
            if( self.IF_FIXED ){
                self.fixedIcon.attr( 'class', 'icIBahyI-dq2' );
                obj.css({
                    top: top,
                    position: 'absolute'
                });
                self.IF_FIXED = 0;
            }else{
                self.fixedIcon.attr( 'class', 'icIBahyI-dq' );
                self.IF_FIXED = 1;
            }
        });

        // 拖拽
        draggable( this.box[ 0 ] );

        DOC.bind( 'mousedown', function( ev ){
            HUA = 1;
            self.latestMouseDownEvent = ev;
        });

        DOC.bind( 'mousemove', function(){

            if( HUA == 1 ){
                HUA = 2;
            }
        });

        DOC.bind( 'mouseup', function(ev){

            var obj = self.box;
            var mousePos = self.getMouseCoords(ev);
            var obj_pos = self.getObjectPosition( obj );
            var obj_left_x = obj_pos.x;
            var obj_left_y = obj_pos.y;
            var obj_right_x = obj_left_x + obj[0].scrollWidth;
            var obj_right_y = obj_left_y + obj[0].scrollHeight;
            var left = mousePos.x + 20;
            var top = mousePos.y + 10;

            // 允许划词，且处于划词结束，鼠标放开的状态
            if( self.IF_ALLOW && HUA >= 1 ){

                if( obj.css( 'display' ) == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){

                    // 获取用户选取文字
                    var txt = self.getSelectedTxt();

                    if( txt ){

                        obj.css({
                            left: left,
                            top: top
                        });

                        if( HUA == 1 ){
                            self.searchWord( txt );
                            obj.show();
                        }

                        if( HUA == 2 ){
                            self.searchIcon.attr( 'data-selection', txt );
                            // 若没有固定，则此时搜索面板未显示
                            if(obj.css( 'display' ) == "none"){

                                self.searchIcon.css({
                                    left: left,
                                    top: top
                                });

                                self.searchIcon.show();
                            }
                            // 否则
                            else {
                                self.searchWord( txt );
                                obj.show();
                            }
                        }
                    }
                    else {

                        if( !self.IF_FIXED ){
                            obj.hide();
                            self.searchIcon.hide();
                        }
                    }
                }
            }
            else {

                // 即便是不可以启用划词的状态，若面板已经出现，点击到面板上还是不会消失
                if( !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y) ){
                    obj.hide();
                    self.searchIcon.hide();
                }
            }
            HUA = 0;
        });

        this.searchIcon.bind( 'click', function(){

            // 获取用户选取文字
            var txt = self.searchIcon.attr( 'data-selection' );

            if( txt ){
                self.searchWord( txt );
                self.box.show();
            }

            self.searchIcon.hide();
            self.searchIcon.attr( 'data-selection', '' );
        });
    },

    /**
     * 搜索页面上选中的文字
     */
    searchCurrentSelection: function(){

        var obj = this.box;
        var mousePos = this.getMouseCoords(this.latestMouseDownEvent);
        var left = mousePos.x + 20;
        var top = mousePos.y + 10;

        // 获取用户选取文字
        var txt = this.getSelectedTxt();

        if( txt ){

            obj.css({
                left: left,
                top: top
            });

            this.searchWord( txt );
            obj.show();
            this.searchIcon.hide();
        }
    }
};
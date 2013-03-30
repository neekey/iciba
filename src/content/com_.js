var HUACI = {
    // 是否为本页第一次划
    FIRST_SELECT: 0,
    // 是否固定搜索面板
    IF_FIXED: 0,
    // 是否允许划词
    IF_ALLOW: 1,
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

    init: function(){
        this.wordInput = $( '#ICIBA_HUAYI_input' );
        this.searchResultCon = $( '#icIBahyI-main_cont' );
        this.searchLoading = $( '#loading' );
        this.box = $( '#icIBahyI-main_box' );
        this.searchIcon = $( '#icIBahyI-yi' );
        this.tooLongTip = $( '#ICIBA_TOO_LONG' );
        this.initSelectEvent();
    },

    /**
     * 查询单词: ICIBA_HUAYI_searchword
     */
    searchWord: function( word ){

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

        DOC.bind( 'mousedown', function( ev){

            var box =  self.box;
            var box_title =  box.find('#icIBahyI-main_title')[0];
            var mousePos = self.getMouseCoords( ev );
            var box_pos = self.getObjectPosition( box );

            var box_left_x = box_pos.x;
            var box_left_y = box_pos.y;
            var box_right_x = box_left_x + box[0].scrollWidth;
            var box_right_y = box_left_y + box[0].scrollHeight;
            var box_title_right_x = box_left_x + box_title.scrollWidth;
            var box_title_right_y = box_left_y + box_title.scrollHeight;

            // 若box隐藏着，或者box显示且不在box上划词，则隐藏box
            if(box.css( 'display' ) == 'none' ||
                !( mousePos.x > box_left_x && mousePos.x<box_right_x && mousePos.y>box_left_y && mousePos.y<box_right_y )){
                HUA = 1;
                if( !self.IF_FIXED ){
                    box.hide();
                }
            }
        });

        // 拖拽
        draggable( this.box[ 0 ] );

        DOC.bind( 'mouseup', function(ev){

            var obj = self.box;
            var mousePos = self.getMouseCoords(ev);
            var obj_pos = self.getObjectPosition( obj );
            var obj_left_x = obj_pos.x;
            var obj_left_y = obj_pos.y;
            var obj_right_x = obj_left_x + obj[0].scrollWidth;
            var obj_right_y = obj_left_y + obj[0].scrollHeight;
            var left = mousePos.x+5;
            var top = mousePos.y-30;

            // 允许划词，且处于划词结束，鼠标放开的状态
            if( self.IF_ALLOW && HUA == 1){

                if( obj.css( 'display' ) == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){

                    // 获取用户选取文字
                    var txt = self.getSelectedTxt();

                    if( txt ){

                        obj.css({
                            left: left,
                            top: top
                        });

                        self.searchIcon.attr( 'data-selection', txt );

                        // 若没有固定，则此时搜索面板未显示
                        if(!self.IF_FIXED){

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
            }
//            var scbiframe =  document.getElementById("icIBahyI-scbiframe");
//            scbiframe.style.display = "none";
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

        DOC.bind( 'dblclick', function(ev){
            var obj = self.box;
            var obj_pos = self.getObjectPosition( obj );
            var mousePos = self.getMouseCoords(ev);
            var obj_left_x = obj_pos.x;
            var obj_left_y = obj_pos.y;
            var obj_right_x = obj_left_x + obj[0].scrollWidth;
            var obj_right_y = obj_left_y + obj[0].scrollHeight;
            var left = mousePos.x;
            var top = mousePos.y+10;
            if(self.IF_ALLOW){

                if( obj.css( 'display' ) == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){

                    // 获取用户选取文字
                    var txt = self.getSelectedTxt();

                    if( txt ){
                        obj.css({
                            left: left,
                            top: top
                        });

                        self.searchWord( txt );
                        obj.show();
                    }
                }
            }

//            var scbiframe =  document.getElementById("icIBahyI-scbiframe");
//            scbiframe.style.display = "none";
        });
    }
};
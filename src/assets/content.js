!(function( host ){

    /**
     * 初始化ICIBA节点和基本的词典功能
     */
    var ICIBA = host.__$ICIBA;
    var DictWrap = $('<div class="iciba-extension-wrap"></div>');
    var DICT = new ICIBA.DICT( DictWrap );
    var LAST_MOUSE_DOWN = null;

    DictWrap.hide();
    $( document.body ).append( DictWrap );

    $( document).bind( 'mousedown', function( e ){
        LAST_MOUSE_DOWN = e;
    });

    $( document).bind( 'click', function( e ){
        DictWrap.hide();
    });

    DictWrap.bind( 'click', function( e ){
        e.stopPropagation();
    });

    chrome.extension.onMessage.addListener(function( msg ){
        if( msg ){

            // 若是划词翻译
            if( msg.type == 'search' ){

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
                DICT.searchWord( getSelectedTxt() );
            }
        }
    });

    /**
     * 获取页面当前选中的单词
     * @returns {string}
     */
    var getSelectedTxt = function(){
        debugger;
        var txt = "";
        if(document.selection) {
            txt = document.selection.createRange().text;
        } else {
            txt = document.getSelection();
        }
        return txt.toString().trim();
    };

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

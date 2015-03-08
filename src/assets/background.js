/**
 * 添加滑词右键菜单，点击后推送消息到对应的tab页面
 * @type {string}
 */

var searchMenuId = '2';
var MESSAGE_TARGET = 'ICIBA';

// 翻译选中文字菜单
chrome.contextMenus.create({
    title: '翻译选中文字',
    id: searchMenuId,
    contexts: [ "selection" ],
    onclick: function( info, tab ){
        chrome.tabs.sendMessage( tab.id, { type: 'search' } );
    }
});

chrome.runtime.onMessage.addListener(function ( message, sender, callback ){

    if( message.target == MESSAGE_TARGET ){

        if( typeof ICIBA[ message.type ] == 'function' ){
            message.data.push(function( result ){
                callback({ result: result } );
            });

            ICIBA[ message.type].apply( ICIBA[ message.type ], message.data );

            return true;
        }
    }
});



/**
 * 定义了爱词霸相关基本工具方法
 */

var ICIBA = {

    /**
     * 词典查询，返回结果HTML字符串
     * @param word
     * @param next
     */
    search: function( word, next ){

        // 获取当前查询词
        var URL = 'http://open.iciba.com/huaci/dict.php?word=' + encodeURIComponent(word);

        // 将结果作为字符串返回
        $.get( URL, function( data ){

            // 将单词的解释分离出来：
            var ret = /dict.innerHTML='(.*)'/.exec( data );

            if( ret && ret[1] ){

                next( ret[1].replace( /\\"/g, '"' ) );
            }
            else {
                next( '未找到 ' + word );
            }
        });
    },

    /**
     * 添加到生词本
     * @param word
     * @param next
     * @return {Number} 1 添加成功 0 添加过 -1 添加失败
     */
    addToMyNote: function( word, next ){

        $.get( 'http://scb.iciba.com/aiframe.php?word=' + word + '&t=' + Date.now(), function( res ){

            var result = -1;

            if( res.indexOf( '添加成功' ) >= 0 ){
                result = 1;
            }
            else if( res.indexOf( '您已添加过' ) >= 0 ){
                result = 0;
            }

            next ( result );
        });
    }
};

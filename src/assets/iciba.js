/**
 * 定义了爱词霸相关基本工具方法
 */

!(function( host ){

    var MESSAGE_TARGET = 'ICIBA';

    host.__$ICIBA = {

        /**
         * 词典查询，返回结果HTML字符串
         * @param word
         * @param next
         */
        search: function( word, next ){

            chrome.runtime.sendMessage( {
                target: MESSAGE_TARGET,
                type: 'search',
                data: [ word ]
            }, function( response ){
                next( response.result );
            });
        },

        /**
         * 添加到生词本
         * @param word
         * @param next
         * @return {Number} 1 添加成功 0 添加过 -1 添加失败
         */
        addToMyNote: function( word, next ){

            chrome.runtime.sendMessage( {
                target: MESSAGE_TARGET,
                type: 'addToMyNote',
                data: [ word ]
            }, function( response ){
                next( response.result );
            });
        },

        /**
         * 检查用户是否已经登陆
         * @param next
         */
        ifLogin: function( next ){

            var login = false;
            this._getAllCookies(function( cookies ){
                var cookie;
                for( var i = 0; i < cookies.length; i++ ){
                    cookie = cookies[ i ];
                    if( cookie.name == '_ustat'){

                        var userInfo = {};
                        try {
                            userInfo = JSON.parse( decodeURIComponent( cookie.value ) )
                        }
                        catch( e ){}

                        // 是否存在用户名，是则任务登陆了
                        if( userInfo.e ){
                            login = true;
                        }
                    }
                }

                next( login );
            });
        },

        getSettings: function( next ){
            chrome.storage.local.get( [ 'setting_huaci', 'setting_auto_pronounce', 'setting_auto_add_to_my_note' ], function( items ){
                next( items );
            });
        },

        setSettings: function( obj, next ){
            chrome.storage.local.set( obj, next );
        },

        _getAllCookies: function( next ){
            chrome.cookies.getAll({ domain: 'iciba.com' }, function( cookies ){
                next && next( cookies );
            });
        }
    }

})( this );
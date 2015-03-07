/**
 * 定义了爱词霸相关基本工具方法
 */

!(function( host ){

    host.__$ICIBA = {

        /**
         * 词典查询，返回结果HTML字符串
         * @param word
         * @param protocol
         * @param next
         */
        search: function( word, protocol, next ){

            // 获取当前查询词
            var URL = protocol + '://open.iciba.com/huaci/dict.php?word=' + encodeURIComponent(word);

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
         * @param protocol
         * @param next
         * @return {Number} 1 添加成功 0 添加过 -1 添加失败
         */
        addToMyNote: function( word, protocol, next ){

            $.get( protocol + '://scb.iciba.com/aiframe.php?word=' + word + '&t=' + Date.now(), function( res ){

                var result = -1;

                if( res.indexOf( '添加成功' ) >= 0 ){
                    result = 1;
                }
                else if( res.indexOf( '您已添加过' ) >= 0 ){
                    result = 0;
                }

                next ( result );
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
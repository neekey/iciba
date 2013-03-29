;(function(){

    $(document).ready(function(){

        // 设置popup高度
        resizeBody();

        // 查询按钮点击
        $( '.icIBahyI-sear').bind( 'click', function( e ){
            e.preventDefault();
            searchWord();
        });

        // 输入框回车
        $( '#ICIBA_HUAYI_input').bind( 'keydown', function( e ){
            if(e.keyCode == 13 ){
                searchWord();
            }
        });

        // 查询
        function searchWord(){
            setLoading( true );
            // 获取当前查询词
            var word = $('#ICIBA_HUAYI_input').val();
            var URL = 'http://open.iciba.com/huaci/dict.php?word='+encodeURIComponent(word);
            // 将结果作为字符串返回
            $.get( URL, function( data ){
                // 执行结果
                eval( data );
                // 重新设置发音功能..
                rebindProun();
                // 为结果中的相关连接添加直接跳转翻译功能..
                redirectAnchor();
                // 取消loading
                setLoading( false );
                // 重新设置popup尺寸
                resizeBody();
            });
        }

        // 重新设立读音
        function rebindProun(){

            // 从元素的onclick属性中解析出mp3文件地址
            $('.icIBahyI-eg a').each(function( index, a ){
                a = $( a );
                var mp3 = /(http\:.*\.mp3)/.exec(a.attr( 'onclick' ))[0];
                a.attr( 'data-audio-url', mp3 );
                a.removeAttr( 'onclick' );
            }).bind( 'click', function( e ){

                e.preventDefault();
                var a = $( this );
                var mp3 = a.attr( 'data-audio-url' );

                // 调用Howl组件发音
                if( mp3 ){
                    new Howl({
                        urls: [mp3]
                    }).play();
                }
            });
        }

        function redirectAnchor(){
            $( '.icIBahyI-label_list a').bind( 'click', function( e ){
                e.preventDefault();
                var a = $( this );
                var keyWord = a.text();
                $('#ICIBA_HUAYI_input').val( keyWord );
                searchWord();
            });
        }

        function setLoading( ifLoading ){
            if( ifLoading ){
                $( '#loading').fadeIn();
            }
            else {
                $( '#loading').fadeOut();
            }
        }

        function resizeBody(){
            var box = $( '#icIBahyI-main_box' );
            var h = box.outerHeight();
            var w = box.outerWidth();
            $( document.body).css({
                height: h,
                width: w
            });
        }
    });

})();
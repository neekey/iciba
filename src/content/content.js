
    icibaMessager = chrome.extension.connect({ name: "search"});
    icibaMessager.onMessage.addListener(function( msg ){

        var type = msg.type;
        switch ( type ){
            case 'search': {
                eval( msg.result );
                rebindProun();
                redirectAnchor();
                break;
            }
            case 'getHTML': {
                $( document.body).append( msg.HTML.replace( /&lt;/g, '<' ).replace( /&gt;/g, '>' )  );

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

                // 初始化划词功能
                ICIBA_HUACI_INIT();

                break;
            }
        }
    });

    icibaMessager.postMessage({ type: 'getHTML'});

    // 加载样式
    var StylePath = chrome.runtime.getURL( 'content/mini.css' );
    $( document.body).append( '<link type="text/css" rel="stylesheet" href="' + StylePath + '">' );

    function searchWord(){
        var word = $( '#ICIBA_HUAYI_input').val();
        if( word ){
            icibaMessager.postMessage({ type: 'search', word: word });
        }
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

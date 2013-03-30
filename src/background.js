chrome.extension.onConnect.addListener(function(port) {
    if( port.name == "search"){
        port.onMessage.addListener(function(msg) {

            var type = msg.type;

            switch ( type ){

                case 'search':
                    searchWord( msg.word, function( result ){
                        port.postMessage( {
                            type: 'search',
                            result: result
                        });
                    });
                    break;
                case 'getHTML':
                    // 获取节点
                    var textarea = $( '.J_HuaciHTML' );
                    var HTML = textarea.html();
                    port.postMessage({
                        type: 'getHTML',
                        HTML: HTML
                    });
                    break;
                default:
                    port.postMessage('');
            }
        });
    }
});

// 查询
function searchWord( word, back ){
    // 获取当前查询词
    var URL = 'http://open.iciba.com/huaci/dict.php?word='+encodeURIComponent(word);
    // 将结果作为字符串返回
    $.get( URL, function( data ){
        back( data );
    });
}


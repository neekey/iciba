//chrome.extension.onMessage.addListener(function( msg, sender, next ) {
//
//    alert( $ );
//
//    searchWord( msg.word, next );
//
//    // 查询
//    function searchWord( word, back ){
//        // 获取当前查询词
//        var URL = 'http://open.iciba.com/huaci/dict.php?word='+encodeURIComponent(word);
//        alert( URL );
//        // 将结果作为字符串返回
//        $.get( URL, function( data ){
//            alert( data );
//            back( data );
//        });
//    }
//});

chrome.extension.onConnect.addListener(function(port) {
    if( port.name == "search"){
        port.onMessage.addListener(function(word) {

            searchWord( word, function( result ){
                port.postMessage( result );
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
        });
    }

});


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
                case 'answerUnderlineStat':
                    updateMenu( msg.stat );
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



// 两种状态对应的菜单文案
var activeUnderline = '启用划词翻译';
var unactiveUnderline = '禁用划词翻译';
// 菜单ID
var menuId = '1';
var searchMenuId = '2';
// 划词是否已经激活
var ifActive = false;

// 是否启用菜单
chrome.contextMenus.create({
    title: activeUnderline,
    id: menuId,
    contexts: [ "page", "frame", "link", "editable", "image", "video", "audio" ],
    onclick: function( info, tab ){
        chrome.tabs.sendMessage( tab.id, { type: 'toggleUnderline' } );
        updateMenu( !ifActive );
    }
});

// 翻译选中文字菜单
chrome.contextMenus.create({
    title: '翻译选中文字',
    id: searchMenuId,
    contexts: [ "selection" ],
    onclick: function( info, tab ){
        chrome.tabs.sendMessage( tab.id, { type: 'search' } );
    }
});

function updateMenu( ifAllow ){
    chrome.contextMenus.update( '1', {
        title: ifAllow ? unactiveUnderline : activeUnderline
    });

    ifActive = ifAllow;
}

// 当页面被激活活着创建时，更新menu状态
chrome.tabs.onActivated.addListener(function( activeInfo ){

    chrome.tabs.sendMessage( activeInfo.tabId, {
        type: 'getUnderlineStat'
    });
});

chrome.tabs.onCreated.addListener(function( activeInfo ){

    if( activeInfo.tabId ){
        chrome.tabs.sendMessage( activeInfo.tabId, {
            type: 'getUnderlineStat'
        });
    }
});


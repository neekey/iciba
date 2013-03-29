
    var port = chrome.extension.connect({ name: "search"});
    port.onMessage.addListener(function( msg ){
        alert( msg );
    });

    port.postMessage('keyword');
;(function( host ){

    var ICIBA = host.__$ICIBA;
    var IF_AUTO_PRONOUNCE = false;
    var IF_AUTO_ADD_TO_MY_NOTE = false;

    var DICT = function( container ){

        var self = this;
        this.domIciba = $( this._html );
        this.domKeyword = this.domIciba.find( '.J_IcibaKeyword' );
        this.domSearch = this.domIciba.find( '.J_IcibaSearch' );
        this.domResult = this.domIciba.find( '.J_IcibaResult' );
        this.domSettings = this.domIciba.find( '.J_IcibaSettings' );

        this.addToBook = null;

        // 默认隐藏结果容器
        this.domResult.hide();

        this.initSettings();

        // 默认聚焦搜搜狂
        setTimeout(function(){
            self.domKeyword.focus();
        }, 200);

        /**
         * 对结果中的相关词汇添加点击查词的代理
         */
        this.domResult.delegate( '.icIBahyI-label_list a', 'click', function( e ){

            e.preventDefault();
            var a = $( this );
            var keyWord = a.text();
            self.domKeyword.val( keyWord );
            self.searchWord();
        });

        /**
         * 对发音播放功能进行代理
         */
        this.domResult.delegate( '.icIBahyI-eg a', 'click', function( e ){
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

        /**
         * 对生词本功能添加的代理
         */
        this.domResult.delegate( '#CIBA_JOINWORD', 'click', function( e ){
            e.preventDefault();
            var target = $( this );
            var word = target.attr( 'wname' );
            self.addToMyNote( word );
        });

        // 查询按钮点击
        this.domSearch.bind( 'click', function( e ){
            self.searchWord();
        });

        // 输入框回车
        this.domKeyword.bind( 'keydown', function( e ){
            if(e.keyCode == 13 ){
                self.searchWord();
            }
        });

        // 放入容器
        $( container).append( this.domIciba );

        // 设置popup高度
        this.resizeBody();
    };

    DICT.prototype = {

        _html: '<div class="iciba-extension J_Iciba">\
            <div class="iciba-extension-header">\
                <span class="iciba-extension-logo"></span>\
                <span>爱词霸</span>\
                <div class="iciba-extension-tools">\
                    <a href="mailto:ni184775761@gmail.com" target="_blank" title="联系作者" class="fa fa-envelope-o"></a>\
                    <a href="https://github.com/neekey/iciba/issues/new" target="_blank" title="意见反馈" class="fa fa-question-circle"></a>\
                </div>\
            </div>\
            <div class="iciba-extension-search-wrap">\
                <input type="text" class="iciba-extension-keyword J_IcibaKeyword" placeholder="输入单词或者中文">\
                <span class="iciba-extension-search J_IcibaSearch">\
                    <i class="fa fa-search"></i>\
                </span>\
            </div>\
            <div class="iciba-extension-result J_IcibaResult">\
            </div>\
            <div class="iciba-extension-settings J_IcibaSettings">\
                <div class="item J_Item" data-name="setting_huaci"><i class="fa fa-square-o"></i> 划词翻译</div>\
                <div class="item J_Item" data-name="setting_auto_pronounce"><i class="fa fa-check-square-o"></i> 自动发声</div>\
                <div class="item J_Item" data-name="setting_auto_add_to_my_note"><i class="fa fa-square-o"></i> 自动添加生词本</div>\
            </div>\
        </div>\
        ',

        _msgHTML: '<div class="iciba-extension-iciba-msg">' +
            '<p class="J_Content iciba-extension-content"></p>' +
            '<i class="J_Close fa fa-times-circle iciba-extension-close"></i>' +
            '</div>',

        msg: function( msg ){

            var self = this;

            if( !this.domMsg ){
                this.domMsg = $( this._msgHTML );
                this.domMsg.find( '.J_Close').bind( 'click', function(){
                    self.domMsg.fadeOut();
                });

                this.domMsg.hide();
                this.domIciba.append( this.domMsg );
            }

            this.domMsg.find( '.J_Content' ).html( msg );
            this.domMsg.fadeIn();
        },

        show: function(){
            this.domIciba.show();
        },

        hide: function(){
            this.domIciba.hide();
        },

        addToMyNote: function( word ){

            var self = this;
            if( word ){
                ICIBA.addToMyNote( word, function( result ){

                    if( result == 1 ){
                        self.addToBook.text( ' 添加成功' );
                    }
                    else if( result == 0 ){
                        self.addToBook.text( ' 已添加过该词' );
                    }
                    else {

                        // 检查是否是因为未登录造成的...
                        self.msg( '添加失败' );
                        self.msg( '添加失败，您可能尚未' +
                            '<a href="http://uc.iciba.com/?module=user&act=login&returnurl=http%3A%2F%2Fwww.iciba.com%2F' + word + '" target="_blank">登录</a>' +
                            '或<a href="http://uc.iciba.com/?module=user&act=reg&returnurl=http%3A%2F%2Fwww.iciba.com%2F' + word + '"  target="_blank">注册</a>' )
                    }
                });
            }
        },

        initSettings: function(){

            var self = this;

            // 获取用户设置，并添加监控
            ICIBA.getSettings(function( settings ){

                IF_AUTO_ADD_TO_MY_NOTE = settings.setting_auto_add_to_my_note;
                IF_AUTO_PRONOUNCE = settings.setting_auto_pronounce;

                self.domSettings.find( '.J_Item' )
                    .each( function(){
                        var item = $( this );
                        var name = item.attr( 'data-name' );
                        item.data( 'value', !!settings[ name ] );
                        updateItem( item, !!settings[ name ] );

                    })
                    .bind( 'click', function(){
                        var item = $( this );
                        var name = item.attr( 'data-name' );

                        var newValue = !item.data( 'value' );

                        updateItem( item, newValue );

                        item.data( 'value', newValue );

                        var newSetting = {};
                        newSetting[ name ] = newValue;

                        // 保存设置
                        ICIBA.setSettings( newSetting );
                    });
            });

            // 监控划词设置项的变更
            chrome.storage.onChanged.addListener(function callback( changes ){
                changes.setting_auto_add_to_my_note && ( IF_AUTO_ADD_TO_MY_NOTE = changes.setting_auto_add_to_my_note.newValue );
                changes.setting_auto_pronounce && ( IF_AUTO_PRONOUNCE = changes.setting_auto_pronounce.newValue );
            });

            function updateItem( item, checked ){

                if( checked ){
                    item.find( 'i' ).removeClass( 'fa-square-o').addClass( 'fa-check-square-o' );
                }
                else {
                    item.find( 'i' ).removeClass( 'fa-check-square-o').addClass( 'fa-square-o' );
                }
            }
        },

        // 查询
        searchWord: function( w ){

            var self = this;

            this.setLoading( true );
            this.domResult.show();
            this.resizeBody();

            // 获取当前查询词
            var word = w || this.domKeyword.val();

            if( w ){
                this.domKeyword.val( w );
            }

            ICIBA.search( word, function( result ){
                // 渲染结果
                self.domResult.html( result );
                self.domResult.show();

                // 重新设置发音功能..
                self.rebindProun();
                // 取消loading
                self.setLoading( false );
                // 重新设置popup尺寸
                self.resizeBody();
            });
        },

        // 重新设立读音 和 为生词本添加icon
        rebindProun: function(){

            var audioURL = null;

            // 从元素的onclick属性中解析出mp3文件地址
            this.domResult.find('.icIBahyI-eg a').each(function( index, a ){
                a = $( a );
                var mp3 = /(http\:.*\.mp3)/.exec(a.attr( 'onclick' ))[0];
                a.attr( 'data-audio-url', mp3 );
                a.removeAttr( 'onclick' );
                a.addClass( 'fa fa-volume-up iciba-extension-pronounce' );

                audioURL = mp3;
            });

            // 去掉生词本的默认事件，添加icon
            var addToBook = this.addToBook = this.domResult.find( '#CIBA_JOINWORD');
            addToBook.addClass( 'fa fa-book iciba-extension-add-to-my-note' );
            addToBook.text( ' ' + '加入生词本' );
            addToBook.removeAttr( 'onclick' );

            // 若自动发音...
            if( IF_AUTO_PRONOUNCE && audioURL ){
                new Howl({
                    urls: [audioURL]
                }).play();
            }

            // 若自动添加到生词本
            if( IF_AUTO_ADD_TO_MY_NOTE ){
                var word = addToBook.attr( 'wname' );
                this.addToMyNote( word );
            }
        },

        setLoading: function( ifLoading ){
            if( ifLoading ){
                this.domResult.addClass( 'loading');
            }
            else {
                this.domResult.removeClass( 'loading');
            }
        },

        resizeBody: function(){

            // 当作为popup时才自适应调整高度
            if( /chrome-extension:\/\/.*\/popup.html/.test( location.href ) ){
                var h = this.domIciba.outerHeight();
                var w = this.domIciba.outerWidth();
                $( document.body).css({
                    height: h,
                    width: w
                });
            }
        }
    };

    ICIBA.DICT = DICT;

})( this );
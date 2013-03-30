//是否是本页面第一次划
var ICIBA_HUAYI_FLAG = 0;
//是否设置固定
var ICIBA_HUAYI_GB =0;
var ICIBA_HUAYI_ALLOW = 1;

String.prototype.Trim = function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// 查词
function ICIBA_HUAYI_searchword(){
    var ICIBA_HUAYI_input= document.getElementById("ICIBA_HUAYI_input");
    var word = ICIBA_HUAYI_input.value;

    loading.style.display = "block";
    var dict=document.getElementById('icIBahyI-main_cont');
    dict.style.display = "none";
    ICIBA_HUAYI_mm(word);
}

function ICIBA_HUAYI_CPos(x,y){
    this.x = x;
    this.y = y;
}

/**
 * 获得对象的相对浏览器的坐标
 */
function ICIBA_HUAYI_GetObjPos(ATarget)
{
    var target = ATarget;
    var pos = new ICIBA_HUAYI_CPos(target.offsetLeft,target.offsetTop);

    var target = target.offsetParent;

    while(target)

    {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent
    }
    return pos;
}

function ICIBA_HUAYI_funGetSelectTxt() {
    var txt = "";
    if(document.selection) {
        txt = document.selection.createRange().text;
    } else {
        txt = document.getSelection();
    }
    ICIBA_WORD = txt.toString().Trim();
    return txt.toString().Trim();
};
var eleContainer = eleContainer || document;
var ICIBA_HUACI_HUA = 0;   //状态位  0:划词框消失 1：当鼠标按下时置1 2：如果此位为1的时候松开鼠标此位置2
var ICIBA_HUACI_MOVE = 0;   //状态位
var ICIBA_HUACI_pX  = 0;
var ICIBA_HUACI_pY = 0;
eleContainer.onmousedown = function(ev){
    //	alert(1);
    ev= ev || window.event;
    var obj =  document.getElementById("icIBahyI-main_box");
    var obj_title =  document.getElementById("icIBahyI-main_title");
    var mousePos = ICIBA_HUAYI_mouseCoords(ev);

    var obj_left_x = ICIBA_HUAYI_GetObjPos(obj)["x"];
    var obj_left_y = ICIBA_HUAYI_GetObjPos(obj)["y"];
    var obj_right_x = obj_left_x + obj.scrollWidth;
    var obj_right_y = obj_left_y + obj.scrollHeight;
    var obj_title_right_x = obj_left_x + obj_title.scrollWidth;
    var obj_title_right_y = obj_left_y + obj_title.scrollHeight;

    if(obj.style.display == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y )){
        ICIBA_HUACI_HUA = 1;
        if(!ICIBA_HUAYI_GB){
            obj.style.display="none";
        }
    }
    if(obj.style.display == "block" && (mousePos.x > obj_left_x && mousePos.x<obj_title_right_x && mousePos.y>obj_left_y && mousePos.y<obj_title_right_y)){
        ICIBA_HUACI_MOVE = 1;
        ICIBA_HUACI_MDown(ev);
    }

}
eleContainer.onmousemove = function(ev){
    ev= ev || window.event;
    if(ICIBA_HUACI_MOVE > 0){
        //		ICIBA_HUACI_MOVE = 2;
        ICIBA_HUACI_MMove(ev);
    }else{
        if(ICIBA_HUACI_HUA == 1){
            ICIBA_HUACI_HUA = 2;
        }
    }
}
eleContainer.onmouseup = function(ev){
    //	alert(ICIBA_HUACI_MOVE);
    var yiObj = document.getElementById("icIBahyI-yi")
    var obj =  document.getElementById("icIBahyI-main_box");
    ev= ev || window.event;
    var mousePos = ICIBA_HUAYI_mouseCoords(ev);
    var obj_left_x = ICIBA_HUAYI_GetObjPos(obj)["x"];
    var obj_left_y = ICIBA_HUAYI_GetObjPos(obj)["y"];
    var obj_right_x = obj_left_x + obj.scrollWidth;
    var obj_right_y = obj_left_y + obj.scrollHeight;
    var left = mousePos.x+5;
    var top = mousePos.y-30;


    if(ICIBA_HUAYI_ALLOW && ICIBA_HUACI_HUA == 2){
        var dict=document.getElementById('icIBahyI-main_cont');
        var loading=document.getElementById('loading');
        var ICIBA_TOO_LONG=document.getElementById('ICIBA_TOO_LONG');
        if(obj.style.display == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){
            var txt=ICIBA_HUAYI_funGetSelectTxt();
            if (txt && txt.length<1000) {
                document.getElementById("ICIBA_HUAYI_input").value=txt;
                loading.style.display = "block";
                dict.style.display = "none";
                if(!ICIBA_HUAYI_GB){
                    obj.style.left = left + "px";
                    obj.style.top = top + "px";
                    if(ICIBA_HUAYI_FLAG){
                        ICIBA_HUAYI_mm(txt);
                        ICIBA_TOO_LONG.style.display = "none";
                        obj.style.display = "block";
                    }else{
                        yiObj.style.display = "block";
                        yiObj.style.left = left + "px";
                        yiObj.style.top = top + "px"
                    }
                }else{
                    ICIBA_HUAYI_mm(txt);
                    ICIBA_TOO_LONG.style.display = "none";
                    obj.style.display = "block";
                }
                yiObj.onclick=function(){
                    yiObj.style.display = "none";
                    dict.style.display = "block";
                    ICIBA_HUAYI_mm(txt);
                    ICIBA_TOO_LONG.style.display = "none";
                    obj.style.display = "block";
                    ICIBA_HUAYI_FLAG = 1;
                }
            }else if(txt && txt.length>=1000){
                yiObj.style.display = "block";
                yiObj.style.left = left + "px";
                yiObj.style.top = top + "px"
                if(!ICIBA_HUAYI_GB){
                    obj.style.left = left + "px";
                    obj.style.top = top + "px";
                }
                yiObj.onclick=function(){
                    loading.style.display = "none";
                    dict.innerHTML='<div id="ICIBA_TOO_LONG" style="height:150px;padding-top:10px;padding-left:10px;" class="footer">您划取的内容太长，建议您去<a href="http://fy.iciba.com" target="_blank">爱词霸翻译</a>页面。</div>';
                    obj.style.display = "block";
                    yiObj.style.display = "none";
                }

            }
            else {
                yiObj.style.display = "none";
                ICIBA_TOO_LONG.style.display = "none";
                if(!ICIBA_HUAYI_GB){
                    obj.style.display = "none";
                }

            }
        }
    }else if(!(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){
        yiObj.style.display = "none";
        if(!ICIBA_HUAYI_GB){
            obj.style.position = "absolute";
            obj.style.display = "none";
        }
        //		ICIBA_HUAYI_FLAG = 0;
    }
    if(ICIBA_HUACI_MOVE == 1){
        ICIBA_HUACI_MUp(ev);
    }
    var scbiframe =  document.getElementById("icIBahyI-scbiframe");
    scbiframe.style.display = "none";
    ICIBA_HUACI_MOVE = 0;
    ICIBA_HUACI_HUA = 0;
}
eleContainer.ondblclick = function(ev){
    var obj =  document.getElementById("icIBahyI-main_box");
    ev= ev || window.event;
    var mousePos = ICIBA_HUAYI_mouseCoords(ev);
    var obj_left_x = ICIBA_HUAYI_GetObjPos(obj)["x"];
    var obj_left_y = ICIBA_HUAYI_GetObjPos(obj)["y"];
    var obj_right_x = obj_left_x + obj.scrollWidth;
    var obj_right_y = obj_left_y + obj.scrollHeight;
    var left = mousePos.x;
    var top = mousePos.y+10;
    if(ICIBA_HUAYI_ALLOW){
        var dict=document.getElementById('icIBahyI-main_cont');
        var loading=document.getElementById('loading');
        var ICIBA_TOO_LONG=document.getElementById('ICIBA_TOO_LONG');
        if(obj.style.display == "none" || !(mousePos.x > obj_left_x && mousePos.x<obj_right_x && mousePos.y>obj_left_y && mousePos.y<obj_right_y)){
            var txt=ICIBA_HUAYI_funGetSelectTxt();
            if (txt && txt.length<1000) {
                document.getElementById("ICIBA_HUAYI_input").value=txt;
                if(!ICIBA_HUAYI_GB){
                    obj.style.left = left + "px";
                    obj.style.top = top + "px"
                }
                obj.style.display = "block";
                loading.style.display = "block";
                dict.style.display = "none";
                ICIBA_TOO_LONG.style.display = "none";
                ICIBA_HUAYI_mm(txt);
            }else if(txt && txt.length>=1000){
                if(!ICIBA_HUAYI_GB){
                    obj.style.left = left + "px";
                    obj.style.top = top + "px"
                }
                loading.style.display = "none";
                dict.innerHTML='<div id="ICIBA_TOO_LONG" style="height:150px;padding-top:10px;padding-left:10px;" class="footer">您划取的内容太长，建议您去<a href="http://fy.iciba.com"  target="_blank">爱词霸翻译</a>页面。</div>';
                obj.style.display = "block";
            }
            else {
                ICIBA_TOO_LONG.style.display = "none";
                if(!ICIBA_HUAYI_GB){
                    obj.style.display = "none";
                }
            }
        }
    }
    var scbiframe =  document.getElementById("icIBahyI-scbiframe");
    scbiframe.style.display = "none";
}
function ICIBA_HUAYI_mouseCoords(ev)
{
    if(!document.all){
        mouse_x=ev.pageX;
        mouse_y=ev.pageY;
    }else{
        mouse_x=document.documentElement.scrollLeft+ev.clientX;
        mouse_y=document.documentElement.scrollTop+ev.clientY;
    }

    return {
        x:mouse_x,
        y:mouse_y

    };
}
function ICIBA_HUAYI_mm(word )
{
    icibaMessager.postMessage({
        type: 'search',
        word: word
    });
}

/*鼠标移动效果*/
//var ICIBA_HUACI_Obj;
//document.getElementById("icIBahyI-main_title").onmouseup=MUp;// 事件会在鼠标按键被松开时发生
//document.onmousemove=MMove;//事件会在鼠标指针移动时发生。
function ICIBA_HUACI_MDown(event) {//事件会在鼠标按键被按下时发生

    var obj =  document.getElementById("icIBahyI-main_box");
    document.getElementById("icIBahyI-yi").style.display="none"
    ICIBA_HUACI_Obj = obj.parentNode;
    if (window.event) {
        event = window.event;
        if (ICIBA_HUACI_Obj.setCapture) {
            ICIBA_HUACI_Obj.setCapture();
        } else if(window.captureEvents){
            window.captureEvents(event.MOUSEMOVE | event.MOUSEUP);
        }
    }
    else {
        window.captureEvents(event.MOUSEMOVE|event.MOUSEUP);
    }

    var mousePos = ICIBA_HUAYI_mouseCoords(event);
    var obj_left_x = ICIBA_HUAYI_GetObjPos(obj)["x"];
    var obj_left_y = ICIBA_HUAYI_GetObjPos(obj)["y"];

    ICIBA_HUACI_pX = mousePos.x - obj_left_x;
    ICIBA_HUACI_pY = mousePos.y - obj_left_y;


}
function ICIBA_HUACI_MMove(event) {
    //	alert(1);
    event = event||window.event;
    document.getElementById("icIBahyI-main_title").style.cursor="move";
    var obj =  document.getElementById("icIBahyI-main_box");
    var mousePos = ICIBA_HUAYI_mouseCoords(event);

    obj.style.left=mousePos.x-ICIBA_HUACI_pX + "px";
    obj.style.top=mousePos.y-ICIBA_HUACI_pY + "px";
}
function ICIBA_HUACI_MUp(event) {
    var obj =  document.getElementById("icIBahyI-main_box");
    document.getElementById("icIBahyI-main_title").style.cursor="default";
    ICIBA_HUACI_Obj = obj.parentNode;
    if(ICIBA_HUACI_Obj){
        if (window.event && ICIBA_HUACI_Obj.releaseCapture) ICIBA_HUACI_Obj.releaseCapture();
        else window.captureEvents(event.MOUSEMOVE|event.MOUSEUP);
        ICIBA_HUACI_Obj=null;
    }

}

function ICIBA_HUACI_INIT(){

    // 点击关闭内容窗口
    $('#icIBahyI-gb').bind( 'click', function(){
        ICIBA_HUAYI_FLAG = 0;
        ICIBA_HUAYI_GB = 0;
        $('#icIBahyI-dq').attr( 'className', 'icIBahyI-dq2' );
        $('#icIBahyI-main_box').hide();
    });

    $('#icIBahyI-dq').bind( 'click', function( ev){

        var obj =  $('#icIBahyI-main_box');
        var mousePos = ICIBA_HUAYI_mouseCoords(ev);
        var top = mousePos.y+10;
        if(ICIBA_HUAYI_GB){
            $('#icIBahyI-dq').attr( 'class', 'icIBahyI-dq2' );
            obj.css({
                top: top,
                position: 'absolute'
            });
            ICIBA_HUAYI_GB = 0;
        }else{
            $('#icIBahyI-dq').attr( 'class', 'icIBahyI-dq' );
            ICIBA_HUAYI_GB = 1;
        }
    });
}
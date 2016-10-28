function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function startMove(obj,json,options){
	clearInterval(obj.timer);	
	options=options || {};
	options.type=options.type || 'ease-out';
	options.time=options.time || 800;
	
	var count=Math.floor(options.time/30);
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		
		dis[name]=json[name]-start[name];
	}
	var n=0;
	
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			
			switch(options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';	
			}else{
				obj.style[name]=cur+'px';
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.end && options.end.call(obj);	
		}
	},30);
}
//作品展九格
function getStyle(obj, name) {
    return (obj.currentStyle || getComputedStyle(obj, null))[name];
}

function move(obj, json, op) {
    op = op || {};
    op.time = op.time || 700;
    op.type = op.type || 'linear';

    clearInterval(obj.timer);
    var iCount = parseInt(op.time / 30);
    var start = {};
    var dis = {};
    var cou = 0;
    var s = 0;

    for (var name in json) {
        if(name == 'value'){
            start[name] = parseFloat(obj[name]);
            dis[name] = json[name] - start[name];
        }else {
            start[name] = parseFloat(getStyle(obj, name));
            dis[name] = json[name] - start[name];
        }
    }


    obj.timer = setInterval(function () {
        cou++;

        for (var name in json) {
            switch (op.type) {
                case 'linear':
                    s = dis[name] * cou / iCount;
                    break;
                case 'ease_in':
                    s = dis[name] * (cou / iCount) * (cou / iCount) * (cou / iCount);
                    break;
                case 'ease_out':
                    s = dis[name] * (1 - cou / iCount) * (1 - cou / iCount) * (1 - cou / iCount);
                    break;
            }
            if (name == 'opacity') {
                obj.style[name] = dis[name] / iCount * cou + start[name];
                obj.style.filter = 'alpha(opacity:' + dis[name] * 100 + ')'
            } else if(name == 'value') {
                obj[name] = parseFloat(s) + parseFloat(start[name]);
            }else{
                obj.style[name] = s + start[name] + 'px';
            }
        }

        if (cou == iCount) {
            clearInterval(obj.timer);
            op.fn && op.fn();
        }
    }, 30)
}
window.onload=function(){
	var str='我是前端设计师孟欢欢，我来自河北唐山，性格活泼好动但是慢热，希望在以后学习中，能够与大家打成一片，互帮互助，交流好作品！！！';
	var oNav=document.getElementById('nav');
	for(var i=0; i<str.length; i++){
		var oSpan=document.createElement('span');
		oSpan.innerHTML=str.charAt(i);
		oNav.appendChild(oSpan);
	}
	var aSpan=oNav.children;
	var i=0;
	var timer=setInterval(function(){
		startMove(aSpan[i],{opacity:1});
		i++;
		if(i==aSpan.length){
			clearInterval(aSpan[i].timer)
		}
	},100);
	var oStart=document.getElementById('start');
	var oBtn=document.getElementById('btn');
	var oBox=document.getElementById('box');
	oBtn.onclick=function(){
		oStart.style.display='none';
		oBox.style.display='block';
	}
	//导航条
	var oNavlist=document.getElementById('nav-list');
	var aLi=oNavlist.getElementsByTagName('li');
	var arr=['首页','作品展示','关于我','联系我','给我留言'];
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;
		aLi[i].onmouseover=function(){
			
		}
	}
	//导航条滑动
	;(function(window){
	    var left=0;
	    var iSpeed=0;   // 速度
	    var timer3;
	    window.tMove=function(obj, iTarget){
	        clearInterval(timer);
	        timer=setInterval(function(){
	            iSpeed+=(iTarget-obj.offsetLeft)/5;
	            iSpeed*=0.75;
	            left+=iSpeed;
	            obj.style.left=Math.floor(left)+'px';

	            if(Math.floor(left)==iTarget && Math.floor(iSpeed)==0){
	                // alert(1)
	                clearInterval(timer);
	            }
	        }, 30);
	    }
	})(window);
	var oUl=document.getElementById('nav-list');
	var aLi1=oUl.getElementsByTagName('li');
	var oFly=document.getElementById('fly');
	for(var i=0; i<aLi1.length; i++){
		aLi1[i].index=i;
		aLi1[i].onmouseover=function(){
			if(this.id=='fly'){
				return;
			}
			var _this=this;
			tMove(oFly,(_this.index)*aLi1[0].offsetWidth);
		}
	}
	//手风琴  
	//无缝运动首页
	var oYd=document.getElementById('yd');
    var oLef=oYd.children[0];
    var oRig=oYd.children[1];
    var oUlyd=oYd.getElementsByTagName('ul')[0];
    var l=0;
    var timer3=null;

    oUlyd.innerHTML+=oUlyd.innerHTML;
    var aLi=oUlyd.children;
    oUlyd.style.width=aLi.length*aLi[0].offsetWidth+'px';
    var oW=oUlyd.offsetWidth/2

    function toLef(){
        clearInterval(timer3);
        timer3=setInterval(function(){
            l-=5;
//                if(l>0)l=-oW;
            if(l<0){
                l%=oW;
            }else{
                l=(l%oW-oW)%oW;
            }

            oUlyd.style.left=l+'px'
        },30);
    }
    function toRig(){
        clearInterval(timer3);
        timer3=setInterval(function(){
            l+=5;
//                if(l>0)l=-oW;
            if(l<0){
                l%=oW;
            }else{
                l=(l%oW-oW)%oW;
            }
            oUlyd.style.left=l+'px'
        },30);
    }

    toLef();

    oLef.onmouseover=function(){
        toLef();
    };
    oRig.onmouseover=function(){
        toRig();
    };
    var oSay=document.getElementById('say');

	var timer=null;
	var str1='  逆 境 是 成 长 的 必 经 过 程，能 勇 于  接 受 逆 境 的 人，生 命 就 会 日 渐 的 茁 壮。我 的 财 富 并 不 是 因 为 我 拥 有 很 多，而 是 我 要 求 的 很 少。即 使 道 路 坎 坷 不 平，车 轮 也 要 前 进；即 使 江 河 波 涛 汹 涌，船 只 也 要 航 行。'

	for(var i=0;i<str1.length;i++){
		var oSpan=document.createElement('span');
		oSpan.innerHTML=str1.charAt(i);
		oSay.appendChild(oSpan);
	}

	var i=0;
	var aSpan=oSay.children;
	timer=setInterval(function(){
		move(aSpan[i],{opacity:1},{time:300,type:'ease-out'});
		i++;
		if(i==str1.length)clearInterval(aSpan[i].timer);
	},100);

//works  作品展
function findDir(oDiv,ev){
var oEvent=ev||event;
var scrollT=document.body.scrollTop || document.documentElement.scrollTop;
var scrollL=document.body.scrollLeft || document.documentElement.scrollLeft

var y=oDiv.offsetHeight/2+getPos(oDiv).top-(oEvent.clientY+scrollT);
var x=oDiv.offsetWidth/2+getPos(oDiv).left-(oEvent.clientX+scrollL);

return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
}
function getPos(obj){
    var l=0;
    var t=0;
    while(obj){
        l+=obj.offsetLeft;
        t+=obj.offsetTop;
        obj=obj.offsetParent;
    }
    return {left:l,top:t};
}

	window.onscroll=function(){
	    var oZpz=document.getElementById('zpz');
	    var aLi2=oZpz.getElementsByTagName('li');

	    for(var i=0;i<aLi2.length;i++){
	        aLi2[i].onmouseover=function(ev){
	            var oEvent=ev||event;
	            var oSon=this.children[0];
	            var oFrom=oEvent.fromElement || oEvent.relatedTarget;
	            if(this.contains(oFrom))return false;

	            switch(findDir(this,ev)){
	                case 0:
	//                        oDiv.innerHTML='右';
	                    oSon.style.left=200+'px';
	                    oSon.style.top=0;
	                    break;
	                case 1:
	//                        oDiv.innerHTML='下';
	                    oSon.style.left=0;
	                    oSon.style.top=200+'px';
	                    break;
	                case 2:
	//                        oDiv.innerHTML='左';
	                    oSon.style.left=-200+'px';
	                    oSon.style.top=0;
	                    break;
	                case 3:
	//                        oDiv.innerHTML='上';
	                    oSon.style.top=-200+'px';
	                    oSon.style.left=0;
	                    break;
	            }
	            move(oSon,{left:0,top:0});

	        };
	        aLi2[i].onmouseout=function(ev){
	            var oEvent=ev||event;
	            var oSon=this.children[0];
	            var to=oEvent.toElement || oEvent.relatedTarget;
	            if(this.contains(to))return false;

	            switch(findDir(this,ev)){
	                case 0:
	                    move(oSon,{left:200,top:0});
	//                        oDiv.innerHTML='右';
	                    break;
	                case 1:
	//                        oDiv.innerHTML='下';
	                    move(oSon,{left:0,top:200});
	                    break;
	                case 2:
	//                        oDiv.innerHTML='左';
	                    move(oSon,{left:-200,top:0});
	                    break;
	                case 3:
	//                        oDiv.innerHTML='上';
	                    move(oSon,{top:-200,left:0});
	                    break;
	            }
	        };
	    }
	    var oBtn=document.getElementById('btn1');
	    var timer=null;
	    var aPos=[];
	    for(var i=0;i<aLi2.length;i++){
	        aPos[i]={left:aLi2[i].offsetLeft,top:aLi2[i].offsetTop}
	    }
	    for(var i=0;i<aLi2.length;i++){
	        aLi2[i].style.left=aPos[i].left+'px';
	        aLi2[i].style.top=aPos[i].top+'px';
	        aLi2[i].style.position='absolute';
	        aLi2[i].style.margin=0;
	    }
	    oBtn.onclick=function(){
	        var i=0;
	        timer=setInterval(function(){
	            (function(index){
	               startMove(aLi2[i],{width:0,height:0,opacity:0,left:0,top:0},{end:function(){
	                    if(index==aLi2.length-1){
	                        for(var i=0;i<aLi2.length;i++){
	                            aLi2[i].style.background='rgb('+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+','+parseInt(Math.random()*256)+')'
	                        }
	                        i=aLi2.length-1;
	                        timer=setInterval(function(){
	                           startMove(aLi2[i],{width:200,height:200,opacity:1,left:aPos[i].left,top:aPos[i].top});
	                            i--;
	                            if(i==-1){
	                                clearInterval(aLi2[i].timer)}
	                            },100)
	                        }
	                    }
	                })
	            })(i);
	            i++;
	            if(i==aLi2.length){
	                clearInterval(aLi2[i].timer)
	            }
	        },100)
	    }
	}
}























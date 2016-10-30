function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function startMove(obj,json,options){
	clearInterval(obj.timer);	
	options=options || {};
	options.type=options.type || 'ease-out';
	options.time=options.time || 400;
	
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
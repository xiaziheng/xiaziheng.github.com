function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
function move(obj,json,options){
	/*
		options = {
			'duration':总时间,
			'type':运动方式,
			'complete':回调函数
		}
	*/

	/*
		json = {
			'left':200,
			'top':200,
			'width':300,
			'height':300
		}
	*/
	options = options || {};
	options.duration = options.duration || 800;
	options.type = options.type || 'ease-out';

	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var count = Math.floor(options.duration/30);
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.type){
				case 'linear':
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				case 'ease-out':
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-a*a*a);
					break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name]+dis[name]*(a*a*a);
					break;
			}

			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity='+cur*100+')';
			}else{
				obj.style[name] = cur+'px';
			}
		}

		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}

	},30)
}
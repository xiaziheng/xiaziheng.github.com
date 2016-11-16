function ready(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);
	}else{
		//IE678
		document.onreadystatechange=function(){
			//页面渲染完毕时				
			if(document.readyState=='complete'){
				fn();	
			}	
		}
	}
}		
	
function getByClass(oPar,sClass){
		if(oPar.getElementsByClassName){
			return oPar.getElementsByClassName(sClass);
		}else{
			var arr=[];
			var allEle=oPar.getElementsByTagName('*');
			var res=new RegExp('\\b'+sClass+'\\b');
			for(var i=0; i<allEle.length;i++){
				if(res.test(allEle[i].className)){
					arr.push(allEle[i]);
				}
			}
			return arr;	
		}
	}
	
	function getStyle(obj,name){
		return (obj.currentStyle||getComputedStyle(obj,false))[name];
	}
	
	function addEvent(obj,sEv,fn){
		if(obj.addEventListener){
			obj.addEventListener(sEv,fn,false);
		}else{
			obj.attachEvent('on'+sEv,fn);	
		}
	};
	function json2Str(json){
		json.t = Math.random();
		var arr = [];
		for(var name in json){
			arr.push(name+'='+json[name]);
		}
		var str = arr.join('&');
		return str;
	}
	
	
	function $(arg){
		return new Zquery(arg);	
	}
	

	function Zquery(arg){
		this.ele=[];//存对象
		this.str='';//存字符串
		//判断传递参数 
		switch(typeof arg){
			case 'function':
				ready(arg);
			break;
			case 'string':
				if(arg.indexOf('>')!=-1){
					this.str=arg;
				}else{
					this.ele=getEle(arg);
				}
			break;
			default:
				if(arg.length){
					//zq对象
					this.ele=arg;
				}else{
					//原生js元素获取之后调用zq方法
					this.ele.push(arg);
				}
			break;
		}		
	}
	
	$('div .list');

	
	function getEle(arg){
		//arg=$('.box p') 分割 ['.box','p']
		//var arr=['#box','.list'];
		var arr=arg.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ').split(' ');
		var aChild=[];//保存最终的元素
		var oPar=[document];//元素父级保存位置
		
		for(var i=0;i<arr.length;i++){
			aChild=getByStr(oPar,arr[i]);
			oPar=aChild;
		}
		
		return aChild;
	}
	
	
	function getByStr(oPar,arg){
		var arr=[];//临时保存对象
		for(var i=0; i<oPar.length;i++){
			switch(arg.charAt(0)){
				case '#':
					var obj=document.getElementById(arg.substring(1));
					arr.push(obj);
				break;
				case '.':
					var obj=getByClass(oPar[i],arg.substring(1));
					for(var i=0; i<obj.length;i++){
						arr[i]=obj[i];
					}
				break;
				default:
					//判断 div.box 格式
					if(/^\w+\.\w+$/.test(arg)){//div.box
					var str_arr=arg.split('.');
					//['div','box']
					
					var res=new RegExp('\\b'+str_arr[1]+'\\b');
					
					var aEle=oPar[i].getElementsByTagName(str_arr[0]);
					
					for(var i=0; i<aEle.length;i++){
						if(res.test(aEle[i].className)){
							arr.push(aEle[i]);
								
						}
					}
					}else if(/^\w+:\w+$/.test(arg)){
					//div:first
						var str_arr=arg.split(':');
						//['div','first']
						var obj=oPar[i].getElementsByTagName(str_arr[0]);
						
						switch(str_arr[1]){
							case 'first':
								arr.push(obj[0]);
							break;
							case 'odd':
								for(var i=1; i<obj.length;i+=2){
									
										arr.push(obj[i]);	
								}
								
							break;
							case 'even':
								for(var i=0; i<obj.length;i+=2){
									arr.push(obj[i]);	
								}
								
							break;	
						}
						
						
						
					}else if(/^\w+:\w+\(\d+\)$/.test(arg)){
						//div:eq(1)
						//div:lt(2) 下标小于2的div
						//div:gt(3) 下标大于3的div
						
						//['div','eq','1']
						var str_arr=arg.match(/\w+/g);
						var obj=oPar[i].getElementsByTagName(str_arr[0]);
						switch(str_arr[1]){
							case 'eq':
								arr.push(obj[str_arr[2]]);
							break;
							case 'lt':
								for(var i=0; i<str_arr[2];i++){
									arr.push(obj[i]);
											
								}
							break;
							case 'gt':
								for(var i=str_arr[2];i<obj.length;i++){
									arr.push(obj[i]);
										
								}
							
							break;
						}
					}else if(/^\w+\[\w+=\w+\]$/.test(arg)){
						//div[title=abc]
						var str_arr=arg.match(/\w+/g);
						//[div,title,abc]
						var obj=oPar[i].getElementsByTagName(str_arr[0]);
						for(var i=0; i<obj.length;i++){
							if(obj[i].getAttribute(str_arr[1])==str_arr[2]){
								arr.push(obj[i]);	
									
							}
							
						}
						
						
					}else{
						var obj=oPar[i].getElementsByTagName(arg);
						for(var i=0; i<obj.length;i++){
							arr[i]=obj[i];
						}	
					}
				break;
			}
		}
		
		return arr;
	}
	
	Zquery.prototype.html=function(str){
		
		if(str || str==''){
			for(var i=0; i<this.ele.length;i++){
				this.ele[i].innerHTML=str;
			}	
		}else{
			return this.ele[0].innerHTML;
		}
		
		
	};
	
	Zquery.prototype.css=function(){
		if(arguments.length==2){
			for(var i=0; i<this.ele.length;i++){
				this.ele[i].style[arguments[0]]=arguments[1];
			}
		}else{
			if(typeof arguments[0]=='string'){
				return getStyle(this.ele[0],arguments[0]);
			}else{
				
				for(var name in arguments[0]){
					for(var i=0; i<this.ele.length;i++){
						this.ele[i].style[name]=arguments[0][name];							
					}
				}
					
			}		
		}
	};
	
	Zquery.prototype.attr=function(){
		if(arguments.length==2){
			for(var i=0; i<this.ele.length;i++){
				this.ele[i].setAttribute(arguments[0],arguments[1]);
			}
		}else{
			if(typeof arguments[0]=='string'){
				return this.ele[0].getAttribute(arguments[0]);
			}else{
				for(var name in arguments[0]){
					for(var i=0; i<this.ele.length;i++){
						this.ele[i].setAttribute(name,arguments[0][name]);						
					}
				}	
			}	
		}
	}
	
	
	Zquery.prototype.val=function(str){
		if(str||str==''){
			for(var i=0; i<this.ele.length;i++){
				this.ele[i].value=str;
			}
		}else{
			return this.ele[0].value;	
		}
	};
	
	'click mousedown mousemover mouseup mouseover mouseout keydown keyup keypress resize scroll'.replace(/\w+/g,function(sEv){
		//加事件
		Zquery.prototype[sEv]=function(fn){
			for(var i=0; i<this.ele.length;i++){
				//this.ele[i]['on'+sEv]=fn;
				addEvent(this.ele[i],sEv,fn);
			}	
		};	
	});
	
	//hover
	Zquery.prototype.hover=function(){
		for(var i=0;i<this.ele.length;i++){
			addEvent(this.ele[i],'mouseover',arguments[0]);
			addEvent(this.ele[i],'mouseout',arguments[1]);
		}	
	}
	
	//toggle
	Zquery.prototype.toggle=function(){
		var arr=arguments;
		var _this=this;
		for(var i=0; i<this.ele.length;i++){
			(function(count){
				_this.ele[i].onclick=function(){
					arr[count%arr.length].apply(this,[]);
					
					count++;	
				}	
			})(0);
		}	
	};
	
	Zquery.prototype.show=function(){		
		$(this.ele).css('display','block');	
	};
	
	Zquery.prototype.hide=function(){		
		$(this.ele).css('display','none');	
	};
	
	Zquery.prototype.eq=function(n){s
		return $($(this.ele).ele[1]);
	};
	
	Zquery.prototype.index=function(){
		//$(this) = [input];
		//this.ele=[div1,div2,div3]; //div0
		var obj=this.ele[this.ele.length-1];
		var oPar=obj.parentNode;
		var aChild=oPar.children;
		
		for(var i=0; i<aChild.length;i++){
			if(obj==aChild[i]){
				return i;
			}
		}	
	};
	

Zquery.prototype.addClass=function(sName){	
	var res=new RegExp('\\b'+sName+'\\b');
	for(var i=0; i<this.ele.length;i++){
		if(this.ele[i].className){
			if(!res.test(this.ele[i].className)){
				this.ele[i].className+=' '+sName;	
			}
		}else{
			this.ele[i].className=sName;		
		}
	}
};

Zquery.prototype.removeClass=function(sName){
	
	var res=new RegExp('\\b'+sName+'\\b');
	
	for(var i=0; i<this.ele.length;i++){
		this.ele[i].className=this.ele[i].className.replace(res,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	};
	//class="box list"  replace(res,'');		
};

Zquery.prototype.animate=function(){
	
	for(var i=0; i<this.ele.length;i++){
		move(this.ele[i],arguments[0],arguments[1])
	}
	
		
};

function move(obj,json,options){
	var options=options||{};
	options.duration=options.duration||700;
	options.easing=options.easing||'ease-out';
	
	var start={};
	var dis={};
	
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	
	var count=Math.round(options.duration/30);
	var n=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		
		var a=n/count;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var cur=start[name]+dis[name]*a;
				break;
				case 'ease-in':
					var cur=start[name]+dis[name]*a*a*a;
				break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
				break;	
			};
			
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+(cur*100)+')';
			}else{
				obj.style[name]=cur+'px';	
			}
				
		}
		
		
		if(n==count){
			clearInterval(obj.timer);	
			
			options.complete&&options.complete.apply(obj);
		}
			
	},30);
}


Zquery.prototype.appendTo=function(obj){

	for(var i=0; i<obj.ele.length;i++){
		obj.ele[i].insertAdjacentHTML('beforeEnd',this.str);	
	}
	
};

Zquery.prototype.prependTo=function(obj){

	for(var i=0; i<obj.ele.length;i++){
		obj.ele[i].insertAdjacentHTML('afterBegin',this.str);	
	}
	
};

Zquery.prototype.insertBefore=function(obj){

	for(var i=0; i<obj.ele.length;i++){
		obj.ele[i].insertAdjacentHTML('beforeBegin',this.str);	
	}
	
};

Zquery.prototype.insertAfter=function(obj){

	for(var i=0; i<obj.ele.length;i++){
		obj.ele[i].insertAdjacentHTML('afterEnd',this.str);	
	}
	
};

Zquery.prototype.ajax=function(json){
	this.timer = null;
	if(!json.url){
		alert('用法错误,没有url');
	}
	json.data = json.data || {};
	json.type = json.type || 'GET';
	json.time = json.time || 1000;

	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toUpperCase()){
		case 'GET':
			oAjax.open('GET',json.url+'?'+json2Str(json.data),true);
			oAjax.send();
			break;
		case 'POST':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			oAjax.send(json2Str(json.data));
	}

	json.fnLoading && json.fnLoading();

	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){	
			json.complete && json.complete();
			clearTimeout(this.timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status == 304){
				json.success && json.success(oAjax.responseText);
			}else{
				json.error && json.error(oAjax.status);
			}
		}
	}

}
	
	
	
	
	
	
	
	
	
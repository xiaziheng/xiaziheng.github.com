function jsonToStr(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	var str=arr.join('&');
	return str;
}
function ajax(json){
	var timer=null;
	if(!json.url){
		alert('用法错误');
	}
	json.data=json.data || {};
	json.type=json.type || 'GET';
	json.time=json.time || 1000;
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP')
	}
	json.type=json.type.toUpperCase();
	switch(json.type){
		case 'GET':
			oAjax.open('GET',json.url+'?'+jsonToStr(json.data),true);
			oAjax.send();
			break;
		case 'POST':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('content-type','application/x-www-form-urlencoded');
			oAjax.send(jsonToStr(json.data));
	}
	// 读取
	json.loading && json.loading();
	oAjax.onreadystatechange=function(){
		clearInterval(timer);
		if(oAjax.readyState==4){
			// 完成之后的回调函数
			json.comlete && json.comlete();
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				json.success && json.success(oAjax.responseText);
			}else{
				json.faile && json.faile(oAjax.status);
			}
		}			
	}
	timer=setTimeout(function(){
		alert('网络超时');
		oAjax.onreadystatechange=null;
	},json.time)
}
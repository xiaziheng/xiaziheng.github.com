function json2Str(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	var str = arr.join('&');
	return str;
}
function ajax(json){
	var timer = null;
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
			clearTimeout(timer);
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status == 304){
				json.success && json.success(oAjax.responseText);
			}else{
				json.error && json.error(oAjax.status);
			}
		}
	}

	timer = setTimeout(function(){
		alert('网络超时');
		oAjax.onreadystatechange = null;
	},json.time)
}
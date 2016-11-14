function jsonToStr(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	var str = arr.join('&');
	return str;
}
function ajax(url,data,fnSuss,fnFail){
	// 1、准备个ajax对象
	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	// 2、建立连接
	oAjax.open('GET',url+jsonToStr(data),true);

	// 3、发送请求
	oAjax.send();

	// 4、接收数据
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
			if(oAjax.status >= 200 && oAjax.status<300 || oAjax.status == 304){
				fnSuss && fnSuss(oAjax.responseText);
			}else{
				fnFail && fnFail(oAjax.status)
			}
		}
	}
}
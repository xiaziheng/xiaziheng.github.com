//arr 资源列表 fnSucc 加载完毕执行 loading 读取过程
function loadImage(arr,fnSucc,loading){
	var n=0;
	for(var i=0; i<arr.length;i++){
		var oImg=new Image();
		(function(oImg,i){
			oImg.onload=function(){
				JSON[arr[i]]=oImg;
				n++;
				if(n==arr.length){
					fnSucc&&fnSucc();
				}
				loading&&loading(n,arr.length);
			};
		})(oImg,i);
		oImg.src='img/'+arr[i]+'.png';	
	}
}
		
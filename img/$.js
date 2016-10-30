function $(fn){
    if(document.addEventListener){
        // chrome firefox ie9++;
        document.addEventListener('DOMContentLoaded',function(){
            fn && fn();
        },false);
    }else{
        // ie7 8
        document.onreadystatechange=function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        }
    }
}
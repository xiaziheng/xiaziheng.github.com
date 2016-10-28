function addEvent(obj,sev,fn){
    if (obj.addEventListener) {
        obj.addEventListener(sev,fn,false);
    }else{
        obj.attchEvent('on'+sev,fn);
    }
}
 function domReady(fn){
   if(document.addEventListener){
   // alert(1);
       document.addEventListener('DOMContentLoaded',function(){
        fn && fn()
       },false);
   }else{
        addEvent(document,'readystatechange',function(){
            if(document.readyState=='complete'){
                fn && fn();
            }
        });
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
domReady(function(){
     //焦点图 
    (function(){
        var oM=document.getElementById('mo')
        var oX1=document.getElementById('x1');
        var oDian=document.getElementById('dian');
        var aLi=oX1.children;
        var aDian=oDian.children;
        oX1.innerHTML+=oX1.innerHTML;
        var timer1=null;
        var iNow=0;
        var left=0;
        function move2(obj,iTarget,w){
            var start=left;
            var dis=iTarget-left;
            var count=Math.floor(500/30);
            var n=0;
            clearInterval(timer1)
            timer1=setInterval(function(){
                n++;
                var a=n/count;
                left=dis*a+start;
                obj.style.left=(left%w-w)%w+'px';
                if(count==n){
                    clearInterval(timer1);
                }
            },30)
        }
        function tab(){
            oX1.style.width=aLi[0].offsetWidth*aLi.length+'px';
            var w=oX1.offsetWidth/2;
            for (var j = 0; j<aDian.length; j++) {
                    aDian[j].className='fl';
                }
                aDian[(iNow%aDian.length+aDian.length)%aDian.length].className='active fl';                   
            //     move(oX1,{
            //         'left':-(iNow)*aLi[0].offsetWidth
            //     },{
            //         duration:500
            // })
            move2(oX1,-iNow*aLi[0].offsetWidth,w)
        }
            for(var i=0;i<aDian.length;i++){
                aDian[i].index=i;
                addEvent(aDian[i],'mouseover',function(){
                     iNow=aDian.length*parseInt(iNow/aDian.length)+this.index;
                    tab()
                })
            }

        function next(){
            iNow++;
            tab()
        }
        var timer=null;
        clearInterval(timer);
        timer=setInterval(next,3000);
        addEvent(oM,'mouseover',function(){
            clearInterval(timer)
        })
        addEvent(oM,'mouseout',function(){
            timer=setInterval(next,3000);
        })
    })();
    // 选项卡构造函数
    // 选项卡z-list

    (function (){
        var oUl=document.getElementById('z_list');
        var aBian=getByClass(oUl,'nbian');
        var aLi=oUl.getElementsByTagName('li');
        var oZ=document.getElementById('zonghe');
        var aT=getByClass(oZ,'text');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            addEvent(aLi[i],'mouseover',function(){

                for(var j=0;j<aBian.length;j++){
                    aBian[j].style.display='none';
                    aT[j].style.display='none';
                }
                aBian[this.index].style.display='block';
                aT[this.index].style.display='block';
            })
        }
    })();



    (function(){

        var oC=document.getElementById('c_zuo')
        var oX3=document.getElementById('x3');
        var aShu=getByClass(oX3,'shu');
        var aShu2=getByClass(oX3,'shu2')
        var oX2=document.getElementById('x2');
        var aLi=oX2.children;
        oX2.innerHTML+=oX2.innerHTML;
        var iNow=0;
        var timer=null;
         var timer1=null;
        var left=0;
        function move2(obj,iTarget,w){
            var start=left;
            var dis=iTarget-left;
            var count=Math.floor(500/30);
            var n=0;
            clearInterval(timer1)
            timer1=setInterval(function(){
                n++;
                var a=n/count;
                left=dis*a+start;
                obj.style.left=(left%w-w)%w+'px';
                if(count==n){
                    clearInterval(timer1);
                }
            },30)
        }
        function tab(){
            oX2.style.width=aLi[0].offsetWidth*aLi.length+'px';
            var w=oX2.offsetWidth/2;
             for(var j=0;j<aShu.length;j++){
                    aShu2[j].style.display='none';
                }
                aShu2[(iNow%aShu2.length+aShu2.length)%aShu2.length].style.display='block';
                // move(oX2,{
                //     'left':-iNow*656
                // })
                move2(oX2,-iNow*aLi[0].offsetWidth,w)
        }
        for(var i=0;i<aShu.length;i++){
            aShu[i].index=i;
            addEvent(aShu[i],'mouseover',function(){
                iNow=aShu.length*parseInt(iNow/aShu.length)+this.index;
                tab();
            });
        }

        function next(){
            iNow++;
            tab();
        }
        clearInterval(timer);
        timer=setInterval(next,3000);
        addEvent(oC,'mouseover',function(){
            clearInterval(timer);
        })
        addEvent(oC,'mouseout',function(){
            timer=setInterval(next,3000);
        })
    })();
    // mid
    (function(){
        var oP1=getByClass(document,'pos')[0];
        // var oP2=getByClass(document,'pos')[1];
        var aX1=getByClass(oP1,'xiala');
        var aLi=getByClass(oP1,'ques');
        var aA=getByClass(oP1,'zi');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            addEvent(aLi[i],'mouseover',function(){
                for(var j=0;j<aLi.length;j++){
                    aA[j].style.display='none';
                    aX1[j].style.opacity=0;
                }

                aA[this.index].style.display='block';
                move(aX1[this.index],{
                    'opacity':1
                })
            });
        }
    })();
    (function(){
        var oP1=getByClass(document,'pos')[1];
        var aX1=getByClass(oP1,'xiala');
        var aLi=getByClass(oP1,'ques');
        var aA=getByClass(oP1,'zi');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            addEvent(aLi[i],'mouseover',function(){
                for(var j=0;j<aLi.length;j++){
                    aA[j].style.display='none';
                    aX1[j].style.opacity=0;
                }

                aA[this.index].style.display='block';
                move(aX1[this.index],{
                    'opacity':1
                })
            });
        }
    })();
     // 兔子
    (function(){
        var oR=document.getElementById('rabbit');
        var oImg=document.getElementById('img1');
        addEvent(oR,'mouseover',function(){
           move(oImg,{
                left:-201
           });
        })
        addEvent(oR,'mouseout',function(){
            move(oImg,{
                left:0
            })
        })
    })();
})
var WEB_SIZE=[
		null,
		{x:327,y:365,w:100,h:100},
		{x:11,y:407,w:120,h:120},
		{x:167,y:364,w:140,h:140},
		{x:241,y:187,w:170,h:170},
		{x:0,y:239,w:170,h:170},
		{x:230,y:0,w:200,h:190},
		{x:0,y:0,w:230,h:230}
	];
	
	function Web(type){
		this.type=type;
		this.w=WEB_SIZE[this.type].w;
		this.h=WEB_SIZE[this.type].h;
		this.px=WEB_SIZE[this.type].x;
		this.py=WEB_SIZE[this.type].y;
		this.x=0;
		this.y=0;
		this.scale=1;
		this.move();
	}
	Web.prototype.draw=function(gd){
		gd.save();
		gd.translate(this.x,this.y);
		gd.scale(this.scale,this.scale);
		gd.drawImage(JSON['web'],this.px,this.py,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
		gd.restore();
	};
	Web.prototype.move=function(){
		var _this=this;
		setInterval(function(){
			_this.scale+=0.1;
			if(_this.scale==1.5){
				_this.scale=1;
			}
		},100);	
	};
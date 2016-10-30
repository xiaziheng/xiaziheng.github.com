//鱼的尺寸
var FISH_SIZE=[
	null,
	{w: 55, h: 37, collR: 17},
	{w: 78, h: 64, collR: 24},
	{w: 72, h: 56, collR: 20},
	{w: 77, h: 59, collR: 22},
	{w: 107, h: 122, collR: 29}
];

//鱼
function Fish(type){
	this.type=type;
	this.w=FISH_SIZE[this.type].w;
	this.h=FISH_SIZE[this.type].h;
	this.x=100;
	this.y=100;
	this.rotate=0;
	this.iSpeed=1;
	this.cur=0;
	this.collr=FISH_SIZE[this.type].collR;
	this.move();
}
Fish.prototype.draw=function(gd){
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	if(this.rotate>45){
		gd.scale(1,-1);
	}
	gd.drawImage(JSON['fish'+this.type],0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
	gd.restore();	
}

Fish.prototype.move=function(){
	var _this=this;
	setInterval(function(){
		
		var speedX=Math.cos(d2a(_this.rotate))*_this.iSpeed;
		var speedY=Math.sin(d2a(_this.rotate))*_this.iSpeed;
		
		_this.x+=speedX;
		_this.y+=speedY;
	},30);
	
	setInterval(function(){
		_this.cur++;
		_this.cur%=4;
	},200);
};

Fish.prototype.isDie=function(x,y){
	var b=x-this.x;
	var a=y-this.y;
	
	var c=Math.sqrt(a*a+b*b);
	
	if(this.collr>c){
		return true;	
	}else{
		return false;	
	}
};
























	
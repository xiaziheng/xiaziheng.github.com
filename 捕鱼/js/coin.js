function Coin(type){
		this.type=type;
		this.x=0;
		this.y=0;
		this.cur=0;
		this.w=60;
		this.h=60;
		this.move();
	}
	Coin.prototype.draw=function(gd){
		gd.save();
		
		gd.translate(this.x,this.y);
		
		switch(this.type){
			case 1:
			case 2:
			case 3:
				gd.drawImage(JSON['coinAni1'],0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
			break;
			case 4:
			case 5:
				gd.drawImage(JSON['coinAni2'],0,this.cur*this.h,this.w,this.h,-this.w/2,-this.h/2,this.w,this.h);
			break;
		}
		
		
		gd.restore();	
	}
	
	Coin.prototype.move=function(){
		var _this=this;
		setInterval(function(){
			_this.cur++;
			_this.cur%=10;
		},100);
		
		setInterval(function(){
			_this.x-=(_this.x-50)/10;
			_this.y+=(600-_this.y)/10;
		},30);
		
	};
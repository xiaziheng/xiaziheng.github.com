window.onload=function(){
	
	$('.box .s1').click(function(){
		$(this).addClass('on')
	})
	$('.box .s3').click(function(){
		$(this).addClass('on')
	})
	$('.box .s4').click(function(){
		$(this).css('color','#000')
		$('.box .deng').css('display','block')
	})
	$('.box .s5').click(function(){
		$('.box .xiang').css('display','block')
	})
	$('.box li').mouseover(function(){
		$('.box .duo').css('display','block')
	})
	$('.box li').mouseout(function(){
		$('.box .duo').css('display','none')
	})
	$('.box .s10').mouseout(function(){
		$('.box .duo').css('display','block')
	})
	$('.heng div').hover(function(){
		$('.heng div').removeClass('on');
		$('.tu img').removeClass('on');
		$(this).addClass('on');
		$('.tu img').eq($(this).index()).addClass('on')
	})
	$(function(){
		$('.box a').hover(function(){
			$(this).css('color','red')
		},function(){
			$(this).css('color','#333')
		})
	})
	$(function(){
		$('.box5 .zhong .left .top .zuo .z2 .ti li').hover(function(){
			$('.box5 .zhong .left .top .zuo .z2 div').removeClass('on');
			$('.box5 .zhong .left .top .zuo .z2 div').eq($(this).index()).addClass('on')
		})
	})
	$(function(){
		$('.box5 .zhong .left .top .you .y1 .xinwen li').hover(function(){
			$('.box5 .zhong .left .top .you .y1 div').removeClass('on')
			$('.box5 .zhong .left .top .you .y1 div').eq($(this).index()).addClass('on')
		})
	})
	$('.box5 .zhong .left .top .you .y3 .nav1 li').hover(function(){
		$('.box5 .zhong .left .top .you .y3 p').removeClass('on');
		$('.box5 .zhong .left .top .you .y3 p').eq($(this).index()).addClass('on')
	},function(){

	})
	$('.box5 .zhong .left .top .you .y3 .nav li').hover(function(){
		$('.box5 .zhong .left .top .you .y3 div').removeClass('on');
		$('.box5 .zhong .left .top .you .y3 div').eq($(this).index()).addClass('on')
	})
	$('.box5 .zhong .right .r3 .chunyun li').hover(function(){
		$('.box5 .zhong .right .r3 div').removeClass('on');
		$('.box5 .zhong .right .r3 div').eq($(this).index()).addClass('on')
	})
	$('.box6 .zhong .left .tiyu .ti li').hover(function(){
		$('.box6 .zhong .left .tiyu div').removeClass('on');
		$('.box6 .zhong .left .tiyu div').eq($(this).index()).addClass('on')
	})
	$('.box6 .zhong .left .tiyu1 .ti li').hover(function(){
		$('.box6 .zhong .left .tiyu1 div').removeClass('on');
		$('.box6 .zhong .left .tiyu1 div').eq($(this).index()).addClass('on')
	})
	$('.box6 .zhong .right .r1 .nanshi li').hover(function(){
		$('.box6 .zhong .right .r1 div').removeClass('on');
		$('.box6 .zhong .right .r1 div').eq($(this).index()).addClass('on')
	})
	$('.box6 .zhong .right .r2 .mote li').hover(function(){
		$('.box6 .zhong .right .r2 div').removeClass('on');
		$('.box6 .zhong .right .r2 div').eq($(this).index()).addClass('on')
	})
	$('.box7 .zhong .left .tiyu .ti li').hover(function(){
		$('.box7 .zhong .left .tiyu div').removeClass('on');
		$('.box7 .zhong .left .tiyu div').eq($(this).index()).addClass('on')
	})
	$('.box7 .zhong .left .tiyu1 .ti li').hover(function(){
		$('.box7 .zhong .left .tiyu1 div').removeClass('on');
		$('.box7 .zhong .left .tiyu1 div').eq($(this).index()).addClass('on')
	})
	$('.box7 .zhong .right .r1 .nanshi li').hover(function(){
		$('.box7 .zhong .right .r1 div').removeClass('on');
		$('.box7 .zhong .right .r1 div').eq($(this).index()).addClass('on')
	})
	$('.box7 .zhong .right .r2 .mote li').hover(function(){
		$('.box7 .zhong .right .r2 div').removeClass('on');
		$('.box7 .zhong .right .r2 div').eq($(this).index()).addClass('on')
	})
	$('.box9 .zhong .left .tiyu .ti li').hover(function(){
		$('.box9 .zhong .left .tiyu div').removeClass('on');
		$('.box9 .zhong .left .tiyu div').eq($(this).index()).addClass('on')
	})
	$('.box9 .zhong .left .tiyu1 .ti li').hover(function(){
		$('.box9 .zhong .left .tiyu1 div').removeClass('on');
		$('.box9 .zhong .left .tiyu1 div').eq($(this).index()).addClass('on')
	})
	$('.box9 .zhong .right .r1 .nanshi li').hover(function(){
		$('.box9 .zhong .right .r1 div').removeClass('on');
		$('.box9 .zhong .right .r1 div').eq($(this).index()).addClass('on')
	})
	$('.box9 .zhong .right .r2 .mote li').hover(function(){
		$('.box9 .zhong .right .r2 div').removeClass('on');
		$('.box9 .zhong .right .r2 div').eq($(this).index()).addClass('on')
	})

	$('.box10 .zhong .left .tiyu .ti li').hover(function(){
		$('.box10 .zhong .left .tiyu div').removeClass('on');
		$('.box10 .zhong .left .tiyu div').eq($(this).index()).addClass('on')
	})
	$('.box10 .zhong .left .tiyu1 .ti li').hover(function(){
		$('.box10 .zhong .left .tiyu1 div').removeClass('on');
		$('.box10 .zhong .left .tiyu1 div').eq($(this).index()).addClass('on')
	})
	$('.box10 .zhong .right .r1 .nanshi li').hover(function(){
		$('.box10 .zhong .right .r1 div').removeClass('on');
		$('.box10 .zhong .right .r1 div').eq($(this).index()).addClass('on')
	})
	$('.box10 .zhong .right .r2 .mote li').hover(function(){
		$('.box10 .zhong .right .r2 div').removeClass('on');
		$('.box10 .zhong .right .r2 div').eq($(this).index()).addClass('on')
	})
}


















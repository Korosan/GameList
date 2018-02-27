window.onload=function(){
	var btn=document.getElementById("startbtn");
	btn.onclick=function(){
		Game.init();
		document.body.removeChild(btn);
	}
}

var Game={
	getpoint:0,
	//status;
	fgState:{
		width:20,
		height:20,
		speed:20,
		time:500	//毫秒
	},
	status:[
		/* 
			0
			

				****
		*/
		{
			state:0,
			num:0,
			fk:[
				{f1:[0,2]},
				{f1:[1,2]},
				{f1:[2,2]},
				{f1:[3,2]}
			],
		},
		/* 
			0
				 *
				 *
				 *
				 *
		*/
		{
			state:0,
			num:1,
			fk:[
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[1,2]},
				{f1:[1,3]}
			],
		},

		/*
			1
				**
				 **
		*/
		{
			state:1,
			num:0,
			fk:[
				{f1:[0,0]},
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[2,1]}
			],
		},
		/*
			1
				 *
				**
				*
		*/
		{
			state:1,
			num:1,
			fk:[
				{f1:[1,0]},
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[0,2]}
			],
		},

		/*
			2
				 **
				**
			
		*/
		{
			state:2,
			num:0,
			fk:[
				{f1:[1,0]},
				{f1:[2,0]},
				{f1:[0,1]},
				{f1:[1,1]}
			],
		},
		/*
			2
				 *
				 **
				  *
			
		*/
		{
			state:2,
			num:1,
			fk:[
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[2,1]},
				{f1:[2,2]}
			],
		},

		
		/*
			3
				
				***
				 *
				 
		*/
		{
			state:3,
			num:0,
			fk:[
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[2,1]},
				{f1:[1,2]}
			],
		},
		/*
			3
				 *
				**
				 *
		*/
		{
			state:3,
			num:1,
			fk:[
				{f1:[1,0]},
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[1,2]}
			],
		},

		/*
			3
				 *
				***
		*/
		{
			state:3,
			num:2,
			fk:[
				{f1:[0,1]},
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[2,1]}
			],
		},
		/*
			3
				 *
				 **
				 *
		*/
		{
			state:3,
			num:3,
			fk:[
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[2,1]},
				{f1:[1,2]}
			],
		},
		

		/*
			4
				**
				**
		*/
		{
			state:4,
			num:0,
			fk:[
				{f1:[0,0]},
				{f1:[0,1]},
				{f1:[1,0]},
				{f1:[1,1]}
			],
		},

		/*
			5
				
				***
				  *
		*/
		{
			state:5,
			num:0,
			fk:[
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[2,1]},
				{f1:[2,2]}
			],
		},
		/*
			5
				 *
				 *
				**
		*/
		{
			state:5,
			num:1,
			fk:[
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[0,2]},
				{f1:[1,2]}
			],
		},
		/*
			5
				*
				***
		*/
		{
			state:5,
			num:2,
			fk:[
				{f1:[0,0]},
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[2,1]}
			],
		},
		/*
			5
				 **
				 *
				 *
		*/
		{
			state:5,
			num:3,
			fk:[
				{f1:[1,0]},
				{f1:[2,0]},
				{f1:[1,1]},
				{f1:[1,2]}
			],
		},

		/*
			6
				***
				*
		*/
		{
			state:6,
			num:0,
			fk:[
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[2,1]},
				{f1:[0,2]}
			],

		},
		/*
			6
				**
				 *
				 *
			
		*/
		{
			state:6,
			num:1,
			fk:[
				{f1:[0,0]},
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[1,2]}
			],
		},
		/*
			6
				  *
				***
		*/
		{
			state:6,
			num:2,
			fk:[
				{f1:[2,0]},
				{f1:[0,1]},
				{f1:[1,1]},
				{f1:[2,1]}
			],
		},
		/*
			6
				 *
				 *
				 **
		*/	
		{
			state:6,
			num:3,
			fk:[
				{f1:[1,0]},
				{f1:[1,1]},
				{f1:[1,2]},
				{f1:[2,2]}
			],
		},

	],

	//方块状态
	init:function(){
		//alert(Game.status[0].fk.length);
		Game.createElement();
	},

	createElement:function(){
		var st=Math.floor(Math.random()*18);	//随机形状
		Game.st=st;
		var gameset=document.getElementById('gameset');
		var createS=document.createElement('div');
		createS.className='movediv';
		gameset.appendChild(createS);
		for(var i=0;i<Game.status[st].fk.length;i++){
			var createsq=document.createElement('span');
			createsq.className='sq';
			createS.appendChild(createsq);
		}
		Game.fkDivchange();		//moveDiv定位置 内部方块定位
		Game.keyborad();		//键盘监听事件
		Game.move();			//下降定时器
		Game.randomAppear();	//随机出现
		
	},
	randomAppear:function(){
		var left=Math.floor(Math.random()*19);
		var moveDiv=document.getElementsByClassName('movediv')[0];
		moveDiv.style.left=left*Game.fgState.width+'px';
		moveDiv.style.top=-moveDiv.offsetHeight+'px';
		if(moveDiv.offsetLeft+moveDiv.offsetWidth>=400){
			moveDiv.style.left=400-moveDiv.offsetWidth+'px';
		}else if(moveDiv.offsetLeft<=0){
			moveDiv.style.left=moveDiv.offsetLeft+'px';
		}
	},

	isGamefail:function(){
		var clearDiv=document.getElementsByClassName('clear');
		var allclearsq=Array();
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				allclearsq.push(clearsq[j]);
			}
		}
		for(var i=0;i<allclearsq.length;i++){
			if(allclearsq[i].offsetTop==0){
				alert("Your Lose");
				window.location.href="Game.html";
				return false;
			}
		}
	},

	//得分

	getPoint:function(){
		var len=0;
		var clearDiv=document.getElementsByClassName('clear');
		var getpoint = document.getElementById("getpoint");
		var lineInfo=Array();
		var lineNum=Array();
		var allclearsq=Array();
		var Mintop_clearsq=0;
		var point=0;
		for(var i=0;i<25;i++){
			lineNum[i]=0;
			lineInfo[i]=Array();
		}
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				allclearsq.push(clearsq[j]);
			}
		}
		Mintop_clearsq=allclearsq[0];
		for(var i=0;i<allclearsq.length;i++){
			if(Mintop_clearsq>=allclearsq[i].offsetTop){
				Mintop_clearsq=allclearsq[i].offsetTop;			//获取最高高度
			}
		}
		var minlineNum=0;
		for(var i=0;i<lineNum.length;i++){
			if(Mintop_clearsq==i*20){
				minlineNum=i;
			}
		}
		for(var i=minlineNum;i<lineNum.length;i++){
			for(var j=0;j<allclearsq.length;j++){
				if(allclearsq[j].offsetTop==i*20){
					lineNum[i]++;
					lineInfo[i].push(allclearsq[j]);
				}
			}
		}

		for(var i=minlineNum;i<lineNum.length;i++){
			if(lineNum[i]==20){
				point++;
				var linetop=lineInfo[i][0].offsetTop
				Game.clearline(lineInfo,i);
				lineInfo[i].splice(0, 20);
				Game.fallfloor(linetop);
				Game.clearDiv();
				Game.getpoint+=point;
			}
		}
		getpoint.innerHTML=Game.getpoint;



	},

	clearline:function(lineInfo,num){
		for(var i=0;i<lineInfo[num].length;i++){
			lineInfo[num][i].parentNode.removeChild(lineInfo[num][i]);
		}
	},

	clearDiv:function(){
		var Game=document.getElementById('gameset');
		var clearDiv=Game.getElementsByClassName('clear');
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			if(clearsq.length==0){
				Game.removeChild(clearDiv[i]);
			}
		}
	},

	fallfloor:function(lineTop){
		var clearDiv=document.getElementsByClassName('clear');
		var allclearsq=Array();
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				if(clearsq[j].offsetTop<=lineTop){
					allclearsq.push(clearsq[j]);
				}
			}
		}
		for(var i=0;i<allclearsq.length;i++){
			allclearsq[i].style.top=allclearsq[i].offsetTop+20+'px';
		}

	},



	move:function(){	//自动向下移动
		
		Game.setMove=setInterval(Game.movefunction, Game.fgState.time);

	},
	movefunction:function(){
		var moveDiv=document.getElementsByClassName('movediv')[0];
		if(Game.judge()){
			clearInterval(Game.setMove);
			Game.dw(Game.st);
			moveDiv.className='clear';
			moveDiv.style.left='';
			moveDiv.style.top='';
			moveDiv.style.width='';
			moveDiv.style.height='';
			Game.getPoint();
			Game.isGamefail();
			Game.createElement();
		}else{
			moveDiv.style.top=moveDiv.offsetTop+20+'px';
		}
	},

	Ljudge:function(){	//左极限判断
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var msqleft=Array();	//运动方块组的left值
		var msqtop=Array();		//运动方块组的top值
		var minLeft=0;			//运动方块组的最左值
		var moveDiv_sq = moveDiv.getElementsByTagName("span");
		var minLeftmoveDiv_sq =moveDiv_sq[0].offsetLeft;
		for(var i=0;i<moveDiv_sq.length;i++){
			if(minLeftmoveDiv_sq>=moveDiv_sq[i].offsetLeft){
				minLeftmoveDiv_sq=moveDiv_sq[i].offsetLeft;
			}
		}
		for(var i=0;i<Game.status[Game.st].fk.length;i++){
			msqleft[i]=moveDiv.offsetLeft+Game.status[Game.st].fk[i].f1[0]*Game.fgState.width;
			msqtop[i]=moveDiv.offsetTop+Game.status[Game.st].fk[i].f1[1]*Game.fgState.height;
		}
		minLeft=msqleft[0];
		for(var i=0;i<msqleft.length;i++){
			if(minLeft>=msqleft[i]){
				minLeft=msqleft[i];
			}
		}
		var clearDiv=document.getElementsByClassName('clear');
		var allclearsq=Array();
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				if(clearsq[j].offsetLeft+clearsq[j].offsetWidth<minLeft+moveDiv.offsetWidth){
					allclearsq.push(clearsq[j]);
				}
				
			}
		}
		if(clearDiv.length==0){
			if(moveDiv.offsetLeft<=0){
				moveDiv.style.left=-minLeftmoveDiv_sq+"px";
				return true;
			}
		}else{
			if(moveDiv.offsetLeft>0){
				for(var i=0;i<msqtop.length;i++){
					for(var j=0;j<allclearsq.length;j++){
						if(msqtop[i]==allclearsq[j].offsetTop){
							//Y轴相等
							var minL=0;
							//Y轴相同的方块数组
							var LeftArr=Array();	
							//下标 	
							var forK=0;
							for(var k=0;k<msqleft.length;k++){
								if(msqtop[k]==msqtop[i]){
									LeftArr[forK]=msqleft[k];
									forK++;
								}
							}
							minL=LeftArr[0];
							for(var k=0;k<LeftArr.length;k++){
								if(minL>=LeftArr[k]){
									minL=LeftArr[k];
								}
							}
							if(minL==allclearsq[j].offsetLeft+Game.fgState.width){
								moveDiv.style.left=moveDiv.offsetLeft+'px';
								return true;
							}
						}
					}			
				}
				
			}else{
				moveDiv.style.left=-minLeftmoveDiv_sq+"px";
				return true;
			}

			
		}


	},


	Rjudge:function(){	//右极限判断
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var msqleft=Array();	//运动方块组的left值
		var msqtop=Array();		//运动方块组的top值
		var maxRight=0;			//运动方块组的最右值
		for(var i=0;i<Game.status[Game.st].fk.length;i++){
			msqleft[i]=moveDiv.offsetLeft+Game.status[Game.st].fk[i].f1[0]*Game.fgState.width;
			msqtop[i]=moveDiv.offsetTop+Game.status[Game.st].fk[i].f1[1]*Game.fgState.height;
		}
		for(var i=0;i<msqleft.length;i++){
			if(maxRight<=msqleft[i]){
				maxRight=msqleft[i];
			}
		}
		maxRight=moveDiv.offsetLeft+moveDiv.offsetWidth;
		
		var clearDiv=document.getElementsByClassName('clear');
		var allclearsq=Array();
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				if(clearsq[j].offsetLeft>=moveDiv.offsetLeft){
					allclearsq.push(clearsq[j]);
				}
				
			}
		}

		if(clearDiv.length==0){
			if(maxRight>=400){
				moveDiv.style.left=400-moveDiv.offsetWidth+'px';
				return true;
			}
		}else{
			if(moveDiv.offsetLeft+moveDiv.offsetWidth>=400){
				moveDiv.style.left=400-moveDiv.offsetWidth+'px';
				return true;
			}else{
				for(var i=0;i<msqtop.length;i++){
					for(var j=0;j<allclearsq.length;j++){
						if(msqtop[i]==allclearsq[j].offsetTop){
							
							//Y轴相等
							var maxR=0;
							//Y轴相同的方块数组
							var LeftArr=Array();	
							//下标 	
							var forK=0;
							for(var k=0;k<msqtop.length;k++){
								if(msqtop[k]==msqtop[i]){
									LeftArr[forK]=msqleft[k];
									forK++;
								}
							}
							for(var k=0;k<LeftArr.length;k++){
								if(maxR<=LeftArr[k]){
									maxR=LeftArr[k];
								}
							}
							maxR=maxR+Game.fgState.width;
							if(maxR==allclearsq[j].offsetLeft){
								moveDiv.style.left=moveDiv.offsetLeft+'px';
								return true;
							}
						}
					}	
				}
			}
			
		}


	},


	judge:function(){	//降落的判断
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var clearDiv=document.getElementsByClassName('clear');		//完成降落的方块
		var msqleft=Array();
		var msqtop=Array();
		for(var i=0;i<Game.status[Game.st].fk.length;i++){
			msqleft[i]=moveDiv.offsetLeft+Game.status[Game.st].fk[i].f1[0]*Game.fgState.width;
			msqtop[i]=moveDiv.offsetTop+Game.status[Game.st].fk[i].f1[1]*Game.fgState.height;
		}
		var allclearsq=Array();
		for(var i=0;i<clearDiv.length;i++){
			var clearsq=clearDiv[i].getElementsByTagName('span');
			for(var j=0;j<clearsq.length;j++){
				allclearsq.push(clearsq[j]);
			}
		}


		if(clearDiv.length==0){
			if(moveDiv.offsetTop+moveDiv.offsetHeight>=500){
				//clearInterval(Game.setMove);
				moveDiv.style.top=moveDiv.offsetTop+'px';
				
				return true;

			}else{
				//moveDiv.style.top=moveDiv.offsetTop+Game.fgState.speed+'px';
			}
		}else{
			if(moveDiv.offsetTop+moveDiv.offsetHeight>=500){
				moveDiv.style.top=moveDiv.offsetTop+'px';
				return true;
			}else{
				for(var i=0;i<msqleft.length;i++){
					for(var j=0;j<allclearsq.length;j++){
						if(msqleft[i]==allclearsq[j].offsetLeft){
							//X轴相等
							var maxtop=0;
							//X轴相同的方块数组
							var TopArr=Array();	
							//下标 	
							var forK=0;
							for(var k=0;k<msqleft.length;k++){
								if(msqleft[k]==msqleft[i]){
									TopArr[forK]=msqtop[k];
									forK++;
								}
							}
							for(var k=0;k<TopArr.length;k++){
								if(maxtop<=TopArr[k]){
									maxtop=TopArr[k];
								}
							}
							if(msqtop[i]+20==allclearsq[j].offsetTop){
								//clearInterval(Game.setMove);
								moveDiv.style.top=moveDiv.offsetTop+'px';
								return true;
							}
						}
					}			
				}
			}
			
		}


	},
	
	
	fkDivchange:function(){	//方块改变方向
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var aSpan=moveDiv.getElementsByTagName('span');				//改变方块位置
		for(var j=0;j<aSpan.length;j++){
			aSpan[j].style.left=Game.fgState.width*Game.status[Game.st].fk[j].f1[0]+'px';
			aSpan[j].style.top=Game.fgState.height*Game.status[Game.st].fk[j].f1[1]+'px';
		}
		//改变方块Div形状
		var maxWidth=0;
		var maxHeight=0;
		var widthlen=0;
		var heightlen=0;
		var maxLeft=0;
		var maxTop=0;
		for(var j=0;j<Game.status[Game.st].fk.length;j++){
			if(widthlen<=Game.status[Game.st].fk[j].f1[0]){
				widthlen=Game.status[Game.st].fk[j].f1[0];
			}
			if(heightlen<=Game.status[Game.st].fk[j].f1[1]){
				heightlen=Game.status[Game.st].fk[j].f1[1];
			}
		}
		maxWidth=Game.fgState.width+Game.fgState.width*widthlen;
		maxHeight=Game.fgState.height+Game.fgState.height*heightlen;
		moveDiv.style.width=maxWidth+'px';
		moveDiv.style.height=maxHeight+'px';


		var minLeft = aSpan[0].offsetLeft;
		var maxRight = aSpan[0].offsetLeft;
		for(var j=1;j<aSpan.length;j++){
			if(minLeft>=aSpan[j].offsetLeft){
				minLeft=aSpan[j].offsetLeft;
			}
			if(maxRight<=aSpan[j].offsetLeft){
				maxRight=aSpan[j].offsetLeft;
			}
		}
		maxRight += aSpan[0].offsetWidth;
		if(moveDiv.offsetLeft+minLeft<=0){
			moveDiv.style.left = -minLeft+"px";
		}
		if(moveDiv.offsetLeft+moveDiv.offsetWidth>=400){
			moveDiv.style.left = 400-maxRight+"px";
		}
		if(moveDiv.offsetTop+moveDiv.offsetHeight>=500){
			moveDiv.style.top = 500-moveDiv.offsetHeight+"px";
		}



	},

	dw:function(){
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var aSq=moveDiv.getElementsByTagName('span');
		for(var i=0;i<aSq.length;i++){
			aSq[i].style.position='absolute';
			aSq[i].style.left=Game.status[Game.st].fk[i].f1[0]*Game.fgState.width+moveDiv.offsetLeft+'px';
			aSq[i].style.top=Game.status[Game.st].fk[i].f1[1]*Game.fgState.width+moveDiv.offsetTop+'px';
		}
	},

	fkIschange:function(){
		var moveDiv=document.getElementsByClassName('movediv')[0];
		var aSpan=moveDiv.getElementsByTagName('span');				//改变方块位置
		var aSpanchangeleft=[];
		var aSpanchangetop=[];
		for(var j=0;j<aSpan.length;j++){
			aSpanchangeleft.push(Game.fgState.width*Game.status[Game.st].fk[j].f1[0]);
			aSpanchangetop.push(Game.fgState.height*Game.status[Game.st].fk[j].f1[1]);
		}
		var clearDiv=document.getElementsByClassName('clear');		//完成降落的方块
		var allclearsq=Array();
		for(var j=0;j<clearDiv.length;j++){
			var clearsq=clearDiv[j].getElementsByTagName('span');
			for(var k=0;k<clearsq.length;k++){
				allclearsq.push(clearsq[k]);
			}
		}
		for(var j=0;j<aSpan.length;j++){
			for(var k=0;k<allclearsq.length;k++){
				if(aSpanchangetop[j]+moveDiv.offsetTop==allclearsq[k].offsetTop && aSpanchangeleft[j]+moveDiv.offsetLeft==allclearsq[k].offsetLeft){
					return false;
				}
			}
		}
		return true;
	},

	keyborad:function(){

		var moveDiv=document.getElementsByClassName('movediv')[0];
		var len=0;
		var arr=Array();
		var state=Game.status[Game.st].state;	//方块状态
		var mqstate=Game.status[Game.st].num;	//目前方块状态第几个
		for(var i=0;i<Game.status.length;i++){
			if(Game.status[i].state==Game.status[Game.st].state){
				arr[len]=i;
				len++;
			}
		}
		document.onkeydown=function(ev){
			var ev=window.event||ev;
			if(ev.keyCode==87){//上 w
				var orgmqstate = mqstate;
				var orgstate = state;
				var orgSt = Game.st;
				if(mqstate==arr.length-1){
					mqstate=0;
				}else{
					mqstate++;
				}
				for(var i=0;i<Game.status.length;i++){
					if(Game.status[i].state==state && Game.status[i].num==mqstate){
						Game.st=i;
					}
				}
				if(Game.fkIschange()){
					Game.fkDivchange();
				}else{
					mqstate = orgmqstate;
					state = orgstate;
					Game.st = orgSt;
				}
				
			}

			if(ev.keyCode==83){//下 S
				
				if(Game.judge()){
					clearInterval(Game.setMove);
					Game.dw(Game.st);
					moveDiv.className='clear';
					moveDiv.style.left='';
					moveDiv.style.top='';
					moveDiv.style.width='';
					moveDiv.style.height='';
					Game.getPoint();
					Game.isGamefail();
					Game.createElement();
				}else{
					clearInterval(Game.setMove);
					moveDiv.style.top=moveDiv.offsetTop+20+'px';
					Game.setMove=setInterval(Game.movefunction, Game.fgState.time);
				}
				
			}

			if(ev.keyCode==65){//左 A
				//随机出现是左右极限位置强制定位
				if(Game.Ljudge()){
					//true
				}else{
					moveDiv.style.left=moveDiv.offsetLeft-Game.fgState.speed+'px';

				}
				
			}
			if(ev.keyCode==68){//右 D
				if(Game.Rjudge()){
					//true
				}else{
					moveDiv.style.left=moveDiv.offsetLeft+Game.fgState.speed+'px';
				
				}
			}
		}
	},


}


function game(gameId,scoreId){
	this.init=function(){
		option();	//设置
		key();		//添加操作按钮
	}


	function option(){
		this.t2048=document.getElementById(gameId);
		this.scoreContent=document.getElementById(scoreId);
		this.block=alignBlock();	//方块水平获取数据
		this.block2=verticalblock(block);	//方块垂直获取数据
		setNum(this.block);
		setNum(this.block);
	}

	function key(){
		document.onkeydown=function(e){
			var e=e||window.event;
			var target=e.target||e.srcElement;
			switch (e.keyCode) {
				case 37:
					console.log("左");
					console.log(checkpass(block));
					if(checkpass(block))
						moveblock(block,"left");
					else
						alert("you lose");
						window.location.refresh();
					break;
				case 38:
					console.log("上");
					console.log(checkpass(block));
					if(checkpass(block))
						moveblock(block,"up");
					else
						alert("you lose");
					break;
				case 39:
					console.log("右");
					console.log(checkpass(block));
					if(checkpass(block))
						moveblock(block,"right");
					else
						alert("you lose");
					break;
				case 40:
					console.log("下");
					console.log(checkpass(block));
					if(checkpass(block))
						moveblock(block,"down");
					else
						alert("you lose");
					break;
				default:
					// statements_def
					break;
			}
		}
	}
	function alignBlock(){
		var aLi=this.t2048.getElementsByTagName("li");
		var block={};
		for(var i=0;i<aLi.length;i++){
			block[i]=[];
			var aSpan=aLi[i].getElementsByTagName("span");
			for(var j=0;j<aSpan.length;j++){
				block[i].push(aSpan[j]);
			}
		}
		return block;
	}
	function verticalblock(block){
		var block2={};
		for(var key in block){
			for(var i=0;i<block[key].length;i++){
				if(!block2[i]){
					block2[i]=[];
				}
				block2[i].push(block[key][i]);
			}
		}
		return block2;
	}
	function blankBlock(block){
		var blank=[];
		for(var key in block){
			for(var i=0;i<block[key].length;i++){
				if(!block[key][i].innerHTML){
					blank.push(block[key][i]);
				}
			}
		}
		return blank;
	}
	function recordStep(block){
		var record="";
		for(var key in block){
			for(var i=0;i<block[key].length;i++){
				var value;
				if(block[key][i].innerHTML){
					value=block[key][i].innerHTML;
				}else{
					value=0;
				}
				record+=key+":"+i+":"+value+";";
			}
		}
		record=record.substring(0,record.length-1);
		return record;
	}
	function calScore(score){
		var sum=Number(scoreContent.innerHTML);
		sum+=score;
		scoreContent.innerHTML=sum;
	}

	function setNum(block){
		var blank=blankBlock(block);
		if(blank.length==0){
			return false;
		}
		var num=Math.floor(Math.random()*blank.length);
		blank[num].innerHTML=2;
	}
	function moveblock(block,direct){
		if(!this.o){
			this.o=new Array();
			this.o.push(recordStep(block));
		}
		switch (direct) {
			case "left":
				moveblockFun(block,direct);
				break;
			case "up":
				var block2=verticalblock(block);	//水平方块数据垂直化
				moveblockFun(block2,direct);
				break;
			case "right":
				moveblockFun(block,direct);
				break;
			case "down":
				var block2=verticalblock(block);
				moveblockFun(block2,direct);
				break;
			default:
				return false;
				break;
		}
		var re=recordStep(block);
		if(this.o[this.o.length-1]!=re){
			setNum(block);
			re=recordStep(block);
			this.o.push(re);
		}
	}
	function moveblockFun(block,direct){
		for(var key in block){
			var arr=[];
			if(direct=="left" || direct=="up"){
				for(var i=0;i<block[key].length;i++){
					arr.push(block[key][i]);
				}
			}else if(direct=="right" || direct=="down"){
				for(var i=block[key].length-1;i>=0;i--){
					arr.push(block[key][i]);
				}
			}
			var list=[];		//获取存在值的方块
			for(var i=0;i<arr.length;i++){
				if(arr[i].innerHTML){
					list.push(i);
				}
			}
			if(list.length>1){	//同数字合并
				for(var i=0;i<list.length;i++){
					if(i+1<list.length){
						if(arr[list[i]].innerHTML==arr[list[i+1]].innerHTML){
							// console.log(key);
							var score=arr[list[i]].innerHTML*2;
							arr[list[i]].innerHTML=score;
							calScore(score);
							arr[list[i+1]].innerHTML="";
						}
					}
				}
			}
			var scorelist=[];	//位移
			for(var i=0;i<arr.length;i++){
				if(arr[i].innerHTML){
					scorelist.push(arr[i].innerHTML);
					// console.log(scorelist);
					arr[i].innerHTML="";
				}
			}
			for(var i=0;i<scorelist.length;i++){
				arr[i].innerHTML=scorelist[i];
			}
		}
	}
	function checkpass(block){
		var result=false;
		var blank=blankBlock(block);
		if(blank.length!=0){
			return true;
		}
		for(var i in block){
			for(var j=0;j<block[i].length-1;j++){	//水平
				if(block[i][j].innerHTML==block[i][j+1].innerHTML){
					return true;
				}
			}
		}
		for(var i=0;i<block[0].length;i++){
			for(var j in block){
				j=Number(j);
				if(block[j+1] && block[j][i].innerHTML==block[j+1][i].innerHTML){
					return true;
				}
			}
		}
		return false;
			

	}
	return this.init();
}
// JavaScript Document
var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

function draw(pepper, color) {
  if (canvas.getContext){
	ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(75+pepper,50+pepper);
    ctx.lineTo(100+pepper,75+pepper);
    ctx.lineTo(100+pepper,25+pepper);
    ctx.fill();
  }
}

var renderList = [];

function makeCloud(left,top,length,width,x_offset1,x_offset2){
  var cloud = {
	  //length:length,width:width,top:top,left:left,x_offset1:x_offset1,x_offset2:x_offset2,
	  x1: canvas.width*(left + x_offset1),
	  y1: canvas.height*(top),
	  x2: canvas.width*(left + length + x_offset2),
	  y2: canvas.height*(top),
	  x3: canvas.width*(left - x_offset1),
	  y3: canvas.height*(top + width),
	  x4: canvas.width*(left + length - x_offset2),
	  y4: canvas.height*(top + width)
  }
  return cloud;
}

function drawCloud(cloud, color){
  if (canvas.getContext){
	ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cloud.x1,cloud.y1);
    ctx.lineTo(cloud.x2,cloud.y2);
    ctx.lineTo(cloud.x4,cloud.y4);
	ctx.lineTo(cloud.x3,cloud.y3);
    ctx.fill();
  }
}

renderList[renderList.length] = makeCloud(.1,.02,.4,.1,-.09,-.01);
renderList[renderList.length] = makeCloud(.55,.02,.35,.1,-.01,-.05);
renderList[renderList.length] = makeCloud(.2,.2,.2,.025,.01,.01);
renderList[renderList.length] = makeCloud(.55,.2,.35,.025,.01,.01);
//drawCloud(tempcloud, "white");
for (var i = 0; i < renderList.length; i++) {
    pulseCloud(0,255,renderList[i]);
}
function jitter(){
	//draw(pepper, "#FFFFFF"); //erase
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	pepper = Math.floor((Math.random() * 5) - 2);
	draw(pepper, "#FFA500");
	animate = setTimeout(jitter,20);
}

function pulseCloud(color, dest, cloud){
	if (color==dest){
		return 1;
	}
	//ctx.clearRect(0,0,canvas.width,canvas.height);
	drawCloud(cloud,'rgb(' + [color/2,0,color].join(',') + ')');
	color++;
	animate = setTimeout(function() {pulseCloud(color,dest,cloud)},3);
}
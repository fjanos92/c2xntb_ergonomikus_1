var num = [];
//zero
num.push([[0, 270], [180, 270], [90, 270], [90, 270], [0, 90], [90, 180]]);
//onw
num.push([[225, 225], [180, 270], [225, 225], [90, 270], [225, 225], [90, 90]]);
//two
num.push([[0, 0], [180, 270], [0, 270], [180, 90], [0, 90], [180, 180]]);
//three
num.push([[0, 0], [180, 270], [0, 0], [90, 180], [0, 0], [90, 180]]);
//four
num.push([[270, 270], [270, 270], [0, 90], [180, 270], [225, 225], [90, 90]]);
//five
num.push([[0, 270], [180, 180], [0, 90], [180, 270], [0, 0], [90, 180]]);
//six
num.push([[0, 270], [180, 180], [0, 270], [180, 270], [0, 90], [90, 180]]);
//seven
num.push([[0, 0], [180, 270], [225, 225], [90, 270], [225, 225], [90, 90]]);
//eight
num.push([[0, 270], [180, 270], [0, 90], [180, 270], [0, 90], [90, 180]]);
//nine
num.push([[0, 270], [180, 270], [0, 90], [180, 270], [0, 0], [90, 180]]);



function Clock(ctx, x, y, r) {
	var context = ctx;
	//var posX = x;
	//var posY = y;
	var radius = r;
	var smallAng;
	var bigAng;
	var visible = true;
    var blink = false;

	this.setAngles = function (small, big) {
		if(small==225 && big==225) {
			blink = true;
			}
		else{
			blink = false;
		}
		smallAng = (small) * (Math.PI / 180);
		bigAng = (big) * (Math.PI / 180);
	}

	this.draw = function () {
		ctx.translate(x, y);
		
		if(blink){
			visible = !visible;
		}
		
		drawFace()
		if(visible){
			drawHand(bigAng, radius, radius * 0.1);
			drawHand(smallAng, radius * 0.7, radius * 0.1);
		}
		
		ctx.translate(-x, -y);
	}

	function drawFace() {
		ctx.beginPath();
		ctx.arc(0, 0 , radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = radius * 0.05;
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
		ctx.fillStyle = 'black';
		ctx.fill();
        ctx.stroke();   
	}

	function drawHand(pos, length, width) {
		ctx.beginPath();
		ctx.lineWidth = width;

		ctx.moveTo(0, 0);
		ctx.rotate(90 * (Math.PI / 180));
		ctx.rotate(-pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(pos);
		ctx.rotate(-90 * (Math.PI / 180));
	}
}

function createDigit(ctx, x, y, distX, distY, radius) {
	var sX = x + radius;
	var sY = y + radius;
	var clocks = [];
	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 2; j++) {
			clock = new Clock(ctx, sX + j * distX, sY + i * distY, radius);
			clocks.push(clock);
		}
	}
	return clocks;
}

function repaint(ctx, digits) {
	for (var i = 0; i < digits.length; i++) {
		for (var j = 0; j < digits[i].length; j++) {
			digits[i][j].draw();
		}
	}
}

function main(ctx) {
	var digits = [];

	for (var i = 0; i < 4; i++) {
		digit = createDigit(ctx, 5 + i * 200, 5, 100, 100, 48);
		digits.push(digit);
	}
	
	setInterval(function(){ setClock(ctx, digits)}, 1000);
	
}

function setClock(ctx, digits) {
	var date = new Date();
	var hourD1 = (date.getHours() - (date.getHours() % 10)) / 10;
	var hourD2 = date.getHours() % 10;
	var minuteD1 = (date.getMinutes() - (date.getMinutes() % 10)) / 10;
	var minuteD2 = date.getMinutes() % 10;

	var numbers = [];
	numbers.push(hourD1);
	numbers.push(hourD2);
	numbers.push(minuteD1);
	numbers.push(minuteD2);

	for (var i = 0; i < digits.length; i++) {
		setDigit(ctx, digits[i], numbers[i])
	}

	repaint(ctx, digits);
}

function setDigit(ctx, digit, n) {
	for (var i = 0; i < digit.length; i++) {
		digit[i].setAngles(num[n][i][0], num[n][i][1]);
	}
}

window.onload = function () {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	main(ctx);
}

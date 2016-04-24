var fieldWidth = 21;
var fieldHeight = 21;
var mazeWalls = [];
var gems = [];
var start = [];
var exit = [];
var player;
function Player(X, Y) {
	var gemCount = 0;
	var stepCount = 0;
	this.x = X;
	this.y = Y;
	
	
	this.draw = function () {
		$('[x="' + this.x + '"][y="' + this.y + '"]').addClass('player');
	}

	this.move = function (dx, dy) {
		var nx = this.x + parseInt(dx);
		var ny = this.y + parseInt(dy);

		//console.log(dx, dy, nx, ny);
		if (nx >= 0 && nx < fieldHeight && ny >= 0 && ny < fieldWidth && !$('[x="' + nx + '"][y="' + ny + '"]').hasClass('wall')) {
			this.x = nx;
			this.y = ny;
			stepCount++;
		}
		
		this.draw();
		checkforGem();
		checkEnd();

		$("#status").text("lépes: " + stepCount + " gyémántok: "+ gemCount);
	}

	function checkforGem() {
		for (var i = 0; i < gems.length; i++) {
			var gx = gems[i].x;
			var gy = gems[i].y;
			if (gx == this.x && gy == this.y && gems.length > 0) {
				gemCount++;
				$('td[x="' + this.x + '"][y="' + this.y + '"]').removeClass('gem');
				gems.splice(i, 1);
			}
		}

		console.log("number of gems: " + gemCount + "/" + gems.length);
	}
	
	function checkEnd(){
		if(this.x == end.x && this.y == end.y){
			alert("nyertél");
			window.location.reload();
		}
	}
}

function createTable(selector) {
	var i,
	j;
	var $table = $('<table>');

	for (i = 0; i < fieldHeight; i++) {
		var $tr = $('<tr>');
		for (j = 0; j < fieldWidth; j++) {
			$tr.append(
				$('<td>').attr('id', i + '' + j).attr('x', j).attr('y', i))
		}
		$table.append($tr);
	}

	$(selector).append($table);
}

document.onkeydown = checkKey;

function checkKey(e) {

	$('td').each(function () {
		$(this).removeClass('player');
	});

	e = e || window.event;

	if (e.keyCode == '38') {
		player.move(0, -1);
	} else if (e.keyCode == '40') {
		player.move(0, 1);
	} else if (e.keyCode == '37') {
		player.move(-1, 0);
	} else if (e.keyCode == '39') {
		player.move(1, 0);
	}

	fogForWar(player.x, player.y);
}

function fogForWar(px, py){
	$("td").each(function (){
		var x = parseInt($(this).attr("x")) - px;
		var y = parseInt($(this).attr("y")) - py;
		var dist = Math.sqrt(x*x + y*y);
		//console.log(dist);
		if(dist <=8){
			$(this).attr("opa", "1");
		}
		else if(dist <=9)
			$(this).attr("opa", "0.5");
		else if(dist <=10){
			$(this).attr("opa", "0.25");
		}
		else 
			$(this).attr("opa", "0");
		
	});
}

function gameWon(){
	alert("Nyertél");
}

function createWalls(maze) {
	for (var i = 0; i < fieldHeight; i++) {
		for (var j = 0; j < fieldWidth; j++) {
			if (maze[i][j] == 0) {
				console.log(maze[i][j]);
				$('td[x="' + i + '"][y="' + j + '"]').addClass('wall');
			}
		}
	}
}

function createGems(gs) {
	console.log(gs.length);
	for (var i = 0; i < gs.length; i++) {
		var x = gs[i].x;
		var y = gs[i].y;
		console.log('gem at+' + x + " " + y);
		$('td[x="' + x + '"][y="' + y + '"]').addClass('gem');
	}
}

function createExit(x, y) {
	$('td[x="' + x + '"][y="' + y + '"]').addClass('exit');
}

function createPlayer(x, y){
	player = new Player(x,y);
	player.draw();
}

function initGame() {
	createPlayer(start.x, start.y);
	fogForWar(player.x, player.y);

	createWalls(mazeWalls);
	createGems(gems);
	createExit(end.x, end.y);
}

function getInitData() {
	$.get("http://music.elvis.hu/maze/gen.php", function (data) {
		mazeWalls = data.maze;
		start = data.start;
		end = data.end;
		gems = data.gems;
	}).done(function () {
		initGame();
	});
}

window.onload = function () {
	var data = {};
	createTable('#maze');
	getInitData();

}

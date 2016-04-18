

function Player(X, Y) {
	this.x = X;
	this.y = Y;
	console.log("x=" + this.x + ",y=" + this.y);

}

Player.prototype.draw = function () {
	$('[x="' + this.x + '"][y="' + this.y + '"]').addClass('player');
}

Player.prototype.move = function (dx, dy) {
	var nx = parseInt(this.x) + parseInt(dx);
	var ny = parseInt(this.y) + parseInt(dy);

	console.log(dx, dy, nx, ny);
	if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8 && !$('[x="' + nx + '"][y="' + ny + '"]').hasClass('black')) {

		this.x = nx;
		this.y = ny;

	}
	this.draw();
}

var player = new Player(0, 0);
var currentColor = 'black';

function createTable(selector) {
	var i,
	j;
	var $table = $('<table>');

	for (i = 0; i < 8; i++) {
		var $tr = $('<tr>');
		for (j = 0; j < 8; j++) {
			$tr.append(
				$('<td>').click(
					function (event) {
					$(this).toggleClass(currentColor);
				}).attr('id', i + '' + j).attr('x', j).attr('y', i));
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

}



window.onload = function () {
	createTable('#tableholder');
	player.move(1,1);
}

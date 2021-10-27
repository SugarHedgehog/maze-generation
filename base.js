(function() {
	NAinfo.requireApiVersion(0, 2);
	function deadend(x, y, maze, n) {
		let a = 0;
		if (x != 1) {
			if (maze[y][x - 2] == pass)
				a += 1;
		} else a += 1;

		if (y != 1) {
			if (maze[y - 2][x] == pass)
				a += 1;
		} else a += 1;

		if (x != length - 2) {
			if (maze[y][x + 2] == pass)
				a += 1;
		} else a += 1;

		if (y != length - 2) {
			if (maze[y + 2][x] == pass)
				a += 1;
		} else a += 1;

		if (a == 4)
			return 1;
		else
			return 0;
	}
	function mazemake(maze, length) {
		let x, y, c, a, b;
		for (let i = 0; i < length; i++) // Массив заполняется землей-ноликами
			for (let j = 0; j < length; j++)
			maze[i][j] = wall;
		x = 3;y = 3;a = 0; // Точка приземления крота и счетчик
		while (a < 10000) { // Да, простите, костыль, иначе есть как, но лень
			maze[y][x] = pass;
			a++;
			while (1) { // Бесконечный цикл, который прерывается только тупиком
				c = sluchch(1, 100) % 4; // Напоминаю, что крот прорывает
				switch (c) { // по две клетки в одном направлении за прыжок
				case 0:
					if (y != 1)
						if (maze[y - 2][x] == wall) { // Вверх
							maze[y - 1][x] = pass;
							maze[y - 2][x] = pass;
							y -= 2;
						}
				case 1:
					if (y != length - 2)
						if (maze[y + 2][x] == wall) { // Вниз
							maze[y + 1][x] = pass;
							maze[y + 2][x] = pass;
							y += 2;
						}
				case 2:
					if (x != 1)
						if (maze[y][x - 2] == wall) { // Налево
							maze[y][x - 1] = pass;
							maze[y][x - 2] = pass;
							x -= 2;
						}
				case 3:
					if (x != length - 2)
						if (maze[y][x + 2] == wall) { // Направо
							maze[y][x + 1] = pass;
							maze[y][x + 2] = pass;
							x += 2;
						}
				}
				if (deadend(x, y, maze, length))
					break;
			}

			if (deadend(x, y, maze, length)) // Вытаскиваем крота из тупика
				do {
				x = 2 * (sluchch(1, 100) % ((length - 1) / 2)) + 1;
				y = 2 * (sluchch(1, 100) % ((length - 1) / 2)) + 1;
			} while (maze[y][x] != pass);
		}
	}
	function ExiteEntr(maze,length,exites){
		for (let i = 0; i < length; i++)
			for (let j = 0; j < length; j++)
			if(i==0||j==0||i==length-1||j==length-1)
			maze[i][j]=-1;
		maze[0][1]=0;
			for (let j = 3; j < length; j++)
			if(sl1()&&!maze[1][j]){
			maze[0][j]=0;
			exites.push(0,j);
			break;
			}
			for (let i = 3; i < length; i++)
			if(sl1()&&!maze[i][1]){
			maze[i][0]=0;
			exites.push(i,0);
			break;
			}
			for (let j = 1; j < length; j++)
			if(sl1()&&!maze[length-2][j]){
			maze[length-1][j]=0;
			exites.push(length-1,j);
			break;
			}
	}
	let length = 11;
	const wall = 1,	pass = 0;
	let exites=[];
	let maze = [];
	for (let i = 0; i < length; i++)
		maze[i] = [];
	mazemake(maze, length);
	ExiteEntr(maze,length,exites);
	let paint = function(ct) {
		var w = 360;
		var h = 360;
		var s = 20;
		ct.setka(20,s);
		ct.translate(60, 20);
		ct.fillStyle = '#87cefa';
		for (let i = 0; i < length; i++)
			for (let j = 0; j < length; j++)
				if (Math.abs(maze[i][j]))
					ct.fillRect(i * 20, j * 20, 20, 20);
	};
	NAtask.setTask({
		text: `${exites}`,
		answers: 0,
		analys: ''
	});
	chas2.task.modifiers.addCanvasIllustration({
		width: 360,
		height: 260,
		paint: paint,
	});
})();

function my2DArray(cols, rows){
	var arr = new Array(cols);
	for(var i = 0; i < arr.length; i++){
		arr[i] = new Array(rows);
	}
	return arr;
}

var grid;
var res = 20;
var rows = 10;
var cols = 10;

function setup(){
	createCanvas(400, 400);
	cols = width / res;
	rows = height / res;
	grid = my2DArray(cols, rows);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++){
			grid[i][j] = Math.floor(Math.random()*2);
		}
	}
}

function draw(){
	background(0);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++){
			var x = i * res;
			var y = j * res;
			if(grid[i][j] == 1){
				fill(255);
				stroke(0);
				rect(x, y, res-1, res-1);
			}
		}
	}

	var next = my2DArray(cols, rows);
	for(var i = 0; i < cols; i++) {
		for(var j = 0; j < rows; j++){
			var state = grid[i][j];

			var sum = 0;
			var neighbors = countNeighbors(grid, i, j);

			if(state == 0 && neighbors == 3){
				next[i][j] = 1;
			}else if(state == 1 && (neighbors < 2 || neighbors > 3)){
				next[i][j] = 0;
			}else{
				next[i][j] = state;
			}
			
		}
	}

	grid = next;
}

function countNeighbors(grid, x, y){
	var sum = 0;
	for(var i = -1; i < 2; i++){
		for(var j = -1; j < 2; j++){
			var col = (x + i + cols) % cols;
			var row = (y + j + rows) % rows;
			
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}
function make2DArray(cols, rows){
   var arr = new Array(cols);
   for(var i = 0; i < arr.length; i++){
     arr[i] = new Array(rows);
   }
   return arr;
}

var grid; 
var cols;
var rows;
var w = 20;
var totalBombs = 20;

function setup() {
  createCanvas(201, 201);
  bomb = loadImage('./assets/bomb.png');
  flag = loadImage('./assets/flag.png');
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for(var i = 0; i < cols; i++){
     for(var j = 0; j < cols; j++){
        grid[i][j] = new Cell(i, j, w);
    }
  }
  
  var options = [];
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      options.push([i, j]);
    }
  }
  
  for(var n = 0; n < totalBombs; n++){
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.slice(index, 1);
    grid[i][j].bomb = true;
  }
  
  for(var i = 0; i < cols; i++){
     for(var j = 0; j < cols; j++){
        grid[i][j].countBombs();
    }
  }
}
function gameOver(){
    for(var i = 0; i < cols; i++){
     for(var j = 0; j < cols; j++){
       if(grid[i][j].bomb == true){
         grid[i][j].revealed = true;        
       }
    }
  }
}
function mousePressed() {
  background(255);
   for(var i = 0; i < cols; i++){
     for(var j = 0; j < cols; j++){
       if(grid[i][j].contains(mouseX, mouseY)){
        if(mouseButton === LEFT){
         grid[i][j].reveal();
         
         if(grid[i][j].bomb){
           gameOver();
         }
        }else if(mouseButton === RIGHT){
          grid[i][j].flag();
        }
       }
    }
  }
}

function draw() {
  background(255);
   for(var i = 0; i < cols; i++){
     for(var j = 0; j < cols; j++){
        grid[i][j].show();
    }
  }
}

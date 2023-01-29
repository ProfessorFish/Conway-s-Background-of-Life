const CANVAS = document.getElementsByTagName('canvas')[0];
const CTX = CANVAS.getContext('2d');
console.log("hello")
var paused = false;

var deadColour = "#000000";
var liveColour = "#00FF00";

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

window.onresize = function() {
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;
}

window.addEventListener("keyup", (e) => {
  //console.log(e.keyCode)
  if (e.keyCode == 32) {
    openNav();
  }
})

var grid = Array.from(Array(100), () => new Array(100).fill(0));

for (var i in grid) {
  for (var p in grid[i]) {
    if (Math.random() >= 0.5) grid[i][p] = 1;
  }
}

function frame() {
  requestAnimationFrame(frame);

  CTX.fillStyle = deadColour;
  CTX.fillRect(0, 0, CANVAS.width, CANVAS.height);

  let boxWidth = CANVAS.width / grid.length;
  let boxHeight = CANVAS.height / grid[0].length;

  let overX = Math.floor(mouseX / boxWidth);
  let overY = Math.floor(mouseY / boxHeight);

  for (var x in grid) {
    for (var y in grid[x]) {
      
      //If cell is alive
      if (grid[x][y]) CTX.fillStyle = liveColour;
      else CTX.fillStyle = deadColour;
      let onX = boxWidth * x;
      let onY = boxHeight * y;
      CTX.fillRect(onX, onY, boxWidth, boxHeight);
      
      if (x == overX && y == overY){
        CTX.globalAlpha = 0.5;
        CTX.fillStyle = '#FFFFFF';
        CTX.fillRect(onX, onY, boxWidth, boxHeight);
        CTX.globalAlpha = 1;
      }
    }
  }
}

frame();
var inter;
function livelyPropertyListener(name, val)
{
    switch (name) {
	case "lIVE_COLOUR":
      liveColour = val;
      break;
    case "dEAD_COLOUR":
      deadColour = val;
      break;
    case "gEN_RATE":
	clearInterval(inter)
      inter = setInterval(() => {
        if (!paused) grid = CalculateNext(grid);
      }, 5000 / parseFloat(val))
      break;
    case "cLEAR":
	grid = Array.from(Array(100), () => new Array(100).fill(0));
	break;
    case "pAUSE":
	console.log(val)
	paused = val;
	break;
	}
}

function CalculateNext(grid) {
  //console.log(grid[0])
  let newGrid = Array.from(Array(grid.length), () => new Array(grid[0].length).fill(0))

  for (var x = 0; x < grid.length; x++) {
    for (var y = 0; y < grid[x].length; y++) {
      try {
        let topL = grid[x - 1][y - 1];
        let topM = grid[x][y - 1];
        let topR = grid[x + 1][y - 1];

        let midL = grid[x - 1][y];
        let midR = grid[x + 1][y];


        let botL = grid[x - 1][y + 1];
        let botM = grid[x][y + 1];
        let botR = grid[x + 1][y + 1];

        let liveNeighbours = topL + topM + topR + midL + midR + botL + botM + botR;

        //console.log(liveNeighbours)>=2 <=3, (2 or 3)

        //any with fewer than two neighbours dies
        if (liveNeighbours < 2) newGrid[x][y] = 0;
        else if (liveNeighbours > 3) newGrid[x][y] = 0;
        else if (liveNeighbours === 3) newGrid[x][y] = 1;
        else if (grid[x][y]) newGrid[x][y] = 1;
        if (liveNeighbours > 2) {
          if (liveNeighbours <= 3) {
            if (liveNeighbours === 3) newGrid[x][y] = 1;
            else if (liveNeighbours === 2 && grid[x][y]) newGrid[x][y] = 1;
          }
        }
      } catch (err) {
        //console.log(err, x, y)
      }
    }
  }
  return newGrid;
}
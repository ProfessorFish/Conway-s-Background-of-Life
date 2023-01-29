function changeSetting(ele) {
  switch (ele.id) {
    case "GEN_RATE":
      clearInterval(inter)
      inter = setInterval(() => {
        if (!paused) grid = CalculateNext(grid);
      }, 5000 / parseFloat(ele.value))
      break;
    case "PAUSE":
      paused = !paused
      break;
    case "STEP":
      paused = true;
      grid = CalculateNext(grid);
      break;
    case "LIVE_COLOUR":
      liveColour = ele.value;
      break;
    case "DEAD_COLOUR":
      deadColour = ele.value;
      break;
    case "CLEAR":
      grid = Array.from(Array(100), () => new Array(100).fill(0));
      break;
    case "RANDOMISE":
      grid = Array.from(Array(100), () => new Array(100).fill(0));
      for (var i in grid) {
        for (var p in grid[i]) {
          if (Math.random() >= 0.5) grid[i][p] = 1;
        }
      }
      break;
    default:
      if (ele.value === "on") {
        SETTINGS[ele.id] = ele.checked;
      } else {
        SETTINGS[ele.id] = parseFloat(ele.value);
      }
      break;
  }
}
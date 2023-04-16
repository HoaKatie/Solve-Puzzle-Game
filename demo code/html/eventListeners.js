
document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)
  //add listener to get puzzle button
  document.getElementById('get_puzzle_button').addEventListener('click', handleGetPuzzleButton)
  //add listener to solve puzzle button
  document.getElementById('solve_puzzle_button').addEventListener('click', handleSolvePuzzleButton)

  //add Enter key handler 
  document.addEventListener('keyup', handleKeyUp)

  drawCanvas()
})

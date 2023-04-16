/*
Javascript example using an html <canvas> as the main
app client area.
The application illustrates:
-handling mouse dragging and release
to drag a strings around on the html canvas
-Keyboard arrow keys are used to move a moving box around

Here we are doing all the work with javascript.
(none of the words are HTML, or DOM, elements.
The only DOM element is just the canvas on which
where are drawing and a text field and button where the
user can type data

Mouse event handlers are being added and removed.

Keyboard keyUP handler is used to trigger communication with the
server via POST message sending JSON data


*/

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 300;

//DATA MODELS
//Use javascript array of objects to represent words and their locations
let words = []

const canvas = document.getElementById('canvas1') //our drawing canvas

function getWordAtLocation(aCanvasX, aCanvasY) {
  //locate the word near aCanvasX,aCanvasY
  //Just use crude region for now.
  //should be improved to using length of word etc.

  var context = canvas.getContext('2d')
  context.font = '20pt Arial'
  const TOLERANCE = 20
  for(var i=0; i<words.length; i++){
     var wordWidth = context.measureText(words[i].word).width
   if((aCanvasX > words[i].x && aCanvasX < (words[i].x + wordWidth))  &&
      Math.abs(words[i].y - aCanvasY) < TOLERANCE) return words[i]
  }
  return null
}


function drawCanvas() {
  /*
  Call this function whenever the canvas needs to be redrawn.
  */

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height) //erase canvas

  context.font = '20pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'
  
  for (let i = 0; i < words.length; i++) {
    let data = words[i]
    //words.stringWidth = context.measureText(data.word).width 

    // 4 if condition to check if words exceeds 4 sides of the canvas
    if (data.x > CANVAS_WIDTH - context.measureText(data.word).width ) { // if word position exceeds canvas boundary
      data.x = CANVAS_WIDTH - context.measureText(data.word).width ;
    }
    if (data.x < 0) {
      data.x = 0
    }

    if (data.y > CANVAS_HEIGHT - 20 ) { 
      data.y = CANVAS_HEIGHT - 10 ; 
    }
    if (data.y < 20 ) { 
      data.y = 20 ;
    }
    context.fillText(data.word, data.x, data.y)
    context.strokeText(data.word, data.x, data.y)
  } 
}

let correctPuzzle = [] // ["roses", "are", "red", "violets", "are", "blue"]
                         // OR ["G", "O"]
function repopulateWordsArray(array) {
  correctPuzzle = [] // clear array

  if (array.length == 1 && array[0].split(" ").length == 1) { //for puzzle4.txt- one word puzzle
    let oneWord = array[0]
    for (let i = 0; i < oneWord.length; i++) {
      words.push({ word: oneWord[i], x: Math.floor(Math.random() * CANVAS_WIDTH), y: Math.floor(Math.random() * CANVAS_HEIGHT) }) // put at random location inside canvas
      correctPuzzle.push(oneWord[i]) // store the correct puzzle
    }
    
  }
  else {
    for (let i = 0; i < array.length; i++) {
      let lineWords = array[i].split(" ");
      for (let j = 0; j < lineWords.length; j++) {
        words.push({ word: lineWords[j], x: Math.floor(Math.random() * CANVAS_WIDTH), y: Math.floor(Math.random() * CANVAS_HEIGHT) }) // put at random location inside canvas
        correctPuzzle.push(lineWords[j]); // store the correct puzzle
  
      }
    }


  }
  

  
}
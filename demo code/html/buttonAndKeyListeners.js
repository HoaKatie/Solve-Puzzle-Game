const ENTER = 13
let puzzle = {} //object representing the puzzle being displayed


function handleKeyUp(e) { // when enter key is pressed, get puzzle button is submitted

  if (e.which == ENTER) {
    handleGetPuzzleButton() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''

  }

  e.stopPropagation()
  e.preventDefault()

}
function handleGetPuzzleButton() { // print each word/letter in the puzzle out on ramdon location on the canva


  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = ""
    textDiv.innerHTML = textDiv.innerHTML + `<p id = "puzzle_name"> ${userText}</p>`

    let userRequestObj = { text: userText }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("data: " + this.responseText)
        console.log("typeof: " + typeof this.responseText)
        //expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)

        words = [] //clear drag-able words array;
        if (responseObj.puzzleLines) {
          puzzle.puzzleLines = responseObj.puzzleLines
          repopulateWordsArray(puzzle.puzzleLines)
        }

        drawCanvas()
        
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}


function handleSolvePuzzleButton() { //check if the puzzle has been solved correctly

  words.sort((a, b) => parseFloat(a.y) - parseFloat(b.y)); // sort each word/letter by y value

  //console.log(correctPuzzle);

  let currLineY = words[0].y
  let innerArr = []
  innerArr.push(words[0])
  let wordsArray2d = []

  for (let i=1; i< words.length; i++) {
    if (Math.abs(currLineY - words[i].y) < 20) { //20 is tolerance for words not in straight line to be considered in a line
      innerArr.push(words[i])

      if (i == (words.length - 1)) {
        innerArr.sort((a, b) => parseFloat(a.x) - parseFloat(b.x)); // when know which word is in the same line, sort by x value
        wordsArray2d.push(innerArr)
        break
      }
    }
    else {
      currLineY = words[i].y;
      innerArr.sort((a, b) => parseFloat(a.x) - parseFloat(b.x));  // when know which word is in the same line, sort by x value
      wordsArray2d.push(innerArr)
      innerArr = []
      innerArr.push(words[i]) // push array of words in the same line into a 2d array
      
      if (i == (words.length - 1)) {
        wordsArray2d.push(innerArr)
        break
      }
    }
  }

  

  let correct = true;
  let output = ""

  let correctPuzzleIndex = 0
  for (let i=0; i< wordsArray2d.length; i++) {
    for (let j=0; j <  wordsArray2d[i].length; j++) {
      if (correctPuzzle[correctPuzzleIndex] !=  wordsArray2d[i][j].word) {
        correct = false;
      }
      
      output +=  wordsArray2d[i][j].word
      output += " "
      correctPuzzleIndex++;
    }
    output += "<br>"
  }
  

  //console.log(output)

  let textDiv = document.getElementById("text-area") // display out the words in similar format like in the canvas to the text area
  textDiv.innerHTML = ""
  if (correct) { // display in green if puzzle is solved
    textDiv.innerHTML = textDiv.innerHTML + `<p id = "correct"> ${output}</p>`
  }
  else { // display in red if answer not correct
    textDiv.innerHTML = textDiv.innerHTML + `<p id = "incorrect"> ${output}</p>`
  }

  let count = 0
  let alignedY = words[count].y
  for (let i=0; i < wordsArray2d.length; i++) {
    for (let j=0; j < wordsArray2d[i].length; j++) {
      words[count].y = alignedY // align words on the same line the same as y value of the first word in the line
      count++
    }
    if (count < words.length) {
      alignedY = words[count].y
    }
  }

  drawCanvas() // redraw canvas
  
}

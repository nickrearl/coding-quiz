var scoreList = document.getElementById("score-list")
var clearButton = document.getElementById("clear-scores")
var scoreDisplay = document.createElement("li")

var displayScores = function(){
    var scoreCard = localStorage.getItem("scoreCard")

    scoreCard = JSON.parse(scoreCard)

    console.log(scoreCard)

    scoreDisplay.innerHTML = scoreCard

    scoreList.appendChild(scoreDisplay)
}

var clearScores = function(){
    localStorage.clear()
    
    scoreDisplay.remove()
}

displayScores()
clearButton.addEventListener("click", clearScores)
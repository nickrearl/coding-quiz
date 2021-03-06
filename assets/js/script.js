var startButton = document.getElementById("start-button")
var quizSection = document.getElementById("quiz-section")
var introPage = document.getElementById("intro-page")
var timerDiv = document.getElementById("timer")
var questionDiv = document.createElement("div")
var endGameDiv = document.createElement("div")
var endGameCalled = false
var timeLeft = 60
var questionIndex = 0
var scoreCard = []

var questionBank = [
    {
        question: "Commonly used data values do not include:",
        answers: [
            "boolen",
            "numbers &strings",
            "arrays",
            "loops",
        ],
        correctAnswer: "loops"
    },
    {
        question: "The condition of an if else statement is enclosed with",
        answers: [
            "()",
            "{}",
            "[]",
            "//",
        ],
        correctAnswer: "()"
    },
    {
        question: "Arrays in Javascript can be used to store ________?",
        answers: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above",
        ],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ When being assigned to variables.",
        answers: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis",
        ],
        correctAnswer: "quotes"
    },
    {
        question: "A useful tool for printing content to the debugger during development is:",
        answers: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log",
        ],
        correctAnswer: "console.log"
    },
]

var quizTimer = function(){
    timerDiv.textContent = "Time: " + timeLeft

    var timerCount = setInterval(function(){
        if(endGameCalled){
            timerDiv.textContent = "Time: " + timeLeft
            clearInterval(timerCount)
        }
        
        else if (timeLeft > 1){
            timerDiv.textContent = "Time: " + timeLeft
            timeLeft--
        }

        else if (timeLeft === 1){
            timerDiv.textContent = "Time: " + timeLeft
            timeLeft--
        }

        else {
            clearInterval(timerCount)
            timerDiv.textContent = "Time: " + timeLeft
            endGame()
        }
    }, 1000)
}

var startQuiz = function(){
    introPage.remove();

    quizTimer()

    renderQuestion()


}


var renderQuestion = function() {
    var questionDisplay = document.createElement("h2")

    questionDisplay.textContent = questionBank[questionIndex].question

    questionDiv.appendChild(questionDisplay)

    questionDiv.setAttribute("class", "question")

    renderCoices()

    quizSection.appendChild(questionDiv)
}

var renderCoices = function() {

    for (let i = 0; i < questionBank[questionIndex].answers.length; i++) {
        var answerButton = document.createElement("button")

        answerButton.setAttribute("class", "answer-button")

        answerButton.setAttribute("data-answer", questionBank[questionIndex].answers[i])
    
        answerButton.textContent = questionBank[questionIndex].answers[i]

        questionDiv.appendChild(answerButton)
    } 

        questionDiv.setAttribute("class", "answer-section")

    quizSection.appendChild(questionDiv)

}

var checkAnswer = function(event){

    var nextQuestionHelper = function(){
        questionIndex++

        questionDiv.innerHTML = ""

        renderQuestion()
    }

    var wrongAnswer = document.createElement("div")
    wrongAnswer.setAttribute("class", "answer-feedback")
    wrongAnswer.innerHTML = "Incorrect"

    var rightAnswer = document.createElement("div")
    rightAnswer.setAttribute("class", "answer-feedback")
    rightAnswer.innerHTML = "Correct"

    if (questionIndex === questionBank.length-1 && event.target.dataset.answer != questionBank[questionIndex].correctAnswer){
        timeLeft = timeLeft-10
        endGame()
    }

    else if (questionIndex === questionBank.length-1){
        endGame()
    }

    else if (event.target.dataset.answer === questionBank[questionIndex].correctAnswer){
        nextQuestionHelper()
        questionDiv.appendChild(rightAnswer)
    }


    else if (event.target.dataset.answer != questionBank[questionIndex].correctAnswer) {
        timeLeft = timeLeft-10
        nextQuestionHelper()
        questionDiv.appendChild(wrongAnswer)

    }
}

var endGame = function(){
    endGameCalled = true
    endGameDiv.innerHTML = "<h2> All Done! </h2>" + "<h3> Your final score is: " + timeLeft + "</h3>" + 
    "<form> <label for='initials'>Enter your initials:</label> <input type='text' name='initials'> <button>Submit</button> </form>"

    endGameDiv.setAttribute("class", "end-game")

    questionDiv.remove()

    quizSection.appendChild(endGameDiv)

}
var recordScore = function(){
    event.preventDefault()

    var scoreCardObj = [
        initials = document.querySelector("input[name='initials']").value,  
        score = timeLeft
    ]

    scoreCard.push(scoreCardObj)

    localStorage.setItem("scoreCard", JSON.stringify(scoreCard))

    window.location.href = "./highscores.html"
}


endGameDiv.addEventListener("submit", recordScore)
startButton.addEventListener("click", startQuiz)
questionDiv.addEventListener("click", checkAnswer)
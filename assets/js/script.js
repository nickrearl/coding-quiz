var startButton = document.getElementById("start-button")
var quizSection = document.getElementById("quiz-section")
var introPage = document.getElementById("intro-page")
var timerDiv = document.getElementById("timer")
var questionDiv = document.createElement("div")
var answerDiv = document.createElement("div")
var endGameDiv = document.createElement("div")
var endGameCalled = false
var timeLeft = 60
var questionIndex = 0

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

    questionDiv.innerHTML = questionBank[questionIndex].question

    quizSection.appendChild(questionDiv)

    renderCoices()
}

var renderCoices = function() {

    for (let i = 0; i < questionBank[questionIndex].answers.length; i++) {
        var answerButton = document.createElement("button")

        answerButton.setAttribute("class", "answer-button")

        answerButton.setAttribute("data-answer", questionBank[questionIndex].answers[i])
    
        answerButton.textContent = questionBank[questionIndex].answers[i]

        answerDiv.appendChild(answerButton)
    } 


    quizSection.appendChild(answerDiv)

}

var checkAnswer = function(event){

    var nextQuestionHelper = function(){
        questionIndex++

        questionDiv.remove()
        answerDiv.innerHTML = ""

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
        answerDiv.appendChild(rightAnswer)
    }


    else if (event.target.dataset.answer != questionBank[questionIndex].correctAnswer) {
        timeLeft = timeLeft-10
        nextQuestionHelper()
        answerDiv.appendChild(wrongAnswer)

    }
}

var endGame = function(){
    endGameCalled = true
    endGameDiv.innerHTML = "<h2> All Done! </h2>" + "<h3> Your final score is: " + timeLeft + "</h3>" + 
    "<form> <label for='initials'>Enter your initials:</label> <input type='text' name= 'initials' id='initials'> <button>Submit</button> </form>"

    questionDiv.remove()

    answerDiv.remove()

    quizSection.appendChild(endGameDiv)

}

var recordScore = function(){
    event.preventDefault()

    console.log("high score")

    window.location.href = "./highscores.html"
}


endGameDiv.addEventListener("submit", recordScore)
startButton.addEventListener("click", startQuiz)
answerDiv.addEventListener("click", checkAnswer)
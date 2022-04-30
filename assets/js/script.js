var startButton = document.getElementById("start-button")
var quizSection = document.getElementById("quiz-section")
var questionDiv = document.createElement("div")
var answerDiv = document.createElement("div")
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
    }
]


var startQuiz = function(){
    startButton.remove();

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

    if (questionIndex === questionBank.length-1){
        //end game sequence
        console.log("end")
    }

    else if (event.target.dataset.answer === questionBank[questionIndex].correctAnswer){
        nextQuestionHelper()
    }
    // pull the next question w/answers display positive message

    else if (event.target.dataset.answer != questionBank[questionIndex].correctAnswer) {
        nextQuestionHelper()
    //display negtative message subtract from timer move to next question
    }



}


//correct answer button click shows next question and displays positive message
//incorrect click subtracts from timer, and displays negative

//

startButton.addEventListener("click", startQuiz)
answerDiv.addEventListener("click", checkAnswer)
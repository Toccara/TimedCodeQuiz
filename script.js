// Individual Elements to select based on ID Attributes
const begin = document.getElementById("begin");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const data = document.getElementById("data");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const optionA = document.getElementById("A");
const optionB = document.getElementById("B");
const optionC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
let runningQuestion = 0;
let count = 0;
const questionTime = 20;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let countdown;
let score = 0;



begin.addEventListener("click", beginQuiz);


// Questions
let questions = [
    {
        question: "What must you assign to a variable?",
        optionA: "Variable",
        optionB: "Values",
        optionC: "State",
        correct: "B"
    }, {
        question: "What does the .each() function do?",
        optionA: "Calls/contains one or multiple statements for each element",
        optionB: "Take pictures",
        optionC: "Turns off your computer",
        correct: "A"
    }, {
        question: "Which operators checks that the data type and values are the same?",
        optionA: "!=",
        optionB: "<",
        optionC: "===",
        correct: "C"
    }
];
const lastQuestion = questions.length - 1;

// render a question
function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    optionA.innerHTML = q.optionA;
    optionB.innerHTML = q.optionB;
    optionC.innerHTML = q.optionC;
}


// begin quiz
function beginQuiz() {
    begin.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    countdown = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// progress
function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
    }
}

// counter render

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    } else {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if (runningQuestion < lastQuestion) {
            runningQuestion++;
            renderQuestion();
        } else {
            // end and show score
            clearInterval(countdown);
            scoreRender();
        }
    }
}

// Code to Check Answer

function runCheck(answer) {
    if (answer == questions[runningQuestion].correct) {
        // answer is correct
        score++;

        answerIsCorrect();
    } else {

        // When Answer is wrong

        answerIsWrong();
    }
    count = 0;
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the score
        clearInterval(countdown);
        scoreRender();

        localStorage.setItem(ScoreRender);
    }
}

// answer is correct
function answerIsCorrect() {
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(15, 161, 137)";
}

// answer is Wrong
function answerIsWrong() {
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render


function scoreRender() {
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score / questions.length);


    scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";


}



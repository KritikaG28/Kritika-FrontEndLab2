function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isQuizEnded = function () {
    return this.questionIndex === this.questions.length;
}
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;

}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

//create questions here
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

//loads the questions
function loadQuestions() {
    if (quiz.isQuizEnded()) {
        showScores();
    } else {
        let question = quiz.getQuestionByIndex();
        var element = document.getElementById("question");
        element.innerHTML = question.text;

        //show options
        var choices = question.choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        showProgressBar();

    }
}

//calculate and display result
function showScores() {
    let scoreHtml = "<h1>Result</h1>";
    var percentage = quiz.score / quiz.questions.length * 100
    scoreHtml += "<h2 id='score'>Your scores: " + quiz.score + "<br>Percentage: " + percentage + "%</h2>"
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = scoreHtml;
}

//display number of questions attempted of total questions
function showProgressBar() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

//click on any option to move to next question
function handleOptionButton(id, choice) {
    let button = document.getElementById(id)
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

let quiz = new Quiz(questions);
loadQuestions();
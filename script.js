var questions = [
    {
        question: "Which of the following is an example of a boolean?",
        options: ["true", "92", "alerts", "hello"],
        answer: "true"
    },
    {
        question: "Which language is the most popular and in-demand language?",
        options: ["html", "AWS", "python", "javascript"],
        answer: "javascript"
    },
    {
        question: "Javascript file is referenced in which HTML element?",
        options: ["<head>", "<script>", "<javscript>", "<any of the above>"],
        answer: "<script>"
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        options: ["Math.ceil(x, y)", "top(x, y)", "ceil(x, y)", "Math.max(x, y)"],
        answer: "Math.max(x, y)"
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        options: ["-", "+", "=", "*"],
        answer: "="
    },

];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var start = document.querySelector("#start");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var secondsLeft = 61;
var holdInterval = 0;
var penalty = 10;
var createUl = document.createElement("ul");

// start the timer on button click
start.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time left: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finished();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    renderQuestions(questionIndex);
});

// Function to start the quiz questions and form the questions with each answer option
function renderQuestions(questionIndex) {
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].options;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (graderFunction));
    })
};
// this function checks the answer against the correct answer
function graderFunction(event) {
    var element = event.target;
    function blink() {
        var f = document.getElementById('currentTime');
        setTimeout(function() {
           f.style.display = (f.style.display == 'none' ? '' : 'none');
        }, 500);
        setTimeout(function() {
            f.style.color = (f.style.color= 'red');
         }, 500);
        setTimeout(function() {
           f.style.display = (f.style.display == 'none' ? '' : 'none');
        }, 1000);
        
     }

    if (element.matches("li")) {

        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        // Correct 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            newDiv.textContent = "Correct, you nailed it, you coding genious, you!";
            document.getElementById('currentTime').style.color = 'black';
            // Incorrect with penalty deduction, also added a function make the timer blink
        } else {
            secondsLeft = secondsLeft - penalty;
            blink();
            newDiv.textContent = "Eeek, that's not the right answer. The correct answer is:  " + questions[questionIndex].answer;
        }
    };

    questionIndex++;

    if (questionIndex >= questions.length) { 
        finished();
        newDiv.textContent = "Whew, you finished!" + " " + "Your final score is " + score + "/5 with " + secondsLeft + " seconds remaining!";
    } else {
        renderQuestions(questionIndex);
    }
    questionsDiv.appendChild(newDiv);

}

function finished() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "Well done, coder!"

    questionsDiv.appendChild(newH1);

    // Create space for the initial input
    var newParagraph = document.createElement("p");
    newParagraph.setAttribute("id", "newParagraph");

    questionsDiv.appendChild(newParagraph);

    // Add a lablel for initials
    var newLabel = document.createElement("label");
    newLabel.setAttribute("id", "label");
    newLabel.textContent = "Enter your initials to save your score: ";

    questionsDiv.appendChild(newLabel);

    // Create a new input
    var newInputBox = document.createElement("input");
    newInputBox.setAttribute("type", "text");
    newInputBox.setAttribute("id", "initials");
    newInputBox.textContent = "";

    questionsDiv.appendChild(newInputBox);

    // create a submit button
    var newSubmit = document.createElement("button");
    newSubmit.setAttribute("type", "submit");
    newSubmit.setAttribute("id", "Submit");
    newSubmit.textContent = "Submit";

    questionsDiv.appendChild(newSubmit);

    // Box to enter initials, saves to local storage and links to the high scores page.
    newSubmit.addEventListener("click", function () {
        var initials = newInputBox.value;

        if (initials === null) {
            alert("Please enter your initials");
            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: score + " /5",
                remaining: secondsLeft + " seconds left"
            }
            console.log(finalScore);
            var highScores = localStorage.getItem("highScores");
            if (highScores === null) {
                highScores = [];
            } else {
                highScores = JSON.parse(highScores);
            }
            highScores.push(finalScore);
            var newScore = JSON.stringify(highScores);
            localStorage.setItem("High Scores: ", newScore);
            // Travels to final page
            window.location.replace("./high-scores.html");
        }
    });

}

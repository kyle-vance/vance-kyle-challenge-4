var highScore = document.querySelector("#high-score");
var clear = document.querySelector("#clear-hs");
var returnHome = document.querySelector("#go-back");

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var scores = localStorage.getItem("highScores");
scores = JSON.parse(scores);

if (scores !== null) {

    for (var i = 0; i < scores.length; i++) {

        var newLi = document.createElement("li");
        newLi.textContent = scores[i].initials + " " + scores[i].score + " with " + scores[i].remaining;
        highScore.appendChild(newLi);

    }
}

returnHome.addEventListener("click", function () {
    window.location.replace("./index.html");
});
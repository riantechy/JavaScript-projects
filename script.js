//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let userInfo = document.getElementById("user-info");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Wha is Front-end web development?",
        options: ["It is what is displayed in the browser when users ender the details", 
                "Everything you see on a web page is at the front end of a website, including images, buttons, links, animations, and other elements.",
                "A person who design User Interfaces",
                "It is Data storage, data organization, and client-side functionality are all their responsibilities."],
        correct: "Everything you see on a web page is at the front end of a website, including images, buttons, links, animations, and other elements.",
    },
    {
        id: "1",
        question: "What are the common Programming languages used in frontend Development?",
        options: ["JavaScript only", 
                 "HTML, CSS and JavaScript", 
                 "PHP and Python", 
                 "HTML, CSS, Python and PHP"],
        correct: "HTML, CSS and JavaScript",
    },
    {
        id: "2",
        question: "Wha is HTML",
        options: ["HyperText Markup Language",
                  "It is a language used in styling of website",
                   "It is a code", 
                   "It is a markup language used in the serverside"],
        correct: "HyperText Markup Language",
    },
    {
        id: "3",
        question: "What does CSS used for?",
        options: ["is a language used to describe the presentation or how the web pages such as the layout, color, fonts, images, icons",
                  "is used for creating and structuring webpages, applications, and other digital applications.",
                  "It is used for creating interactive and dynamic website content and dynamic images. ",
                  "is a programming language used to make websites interactive"],
        correct: "is a language used to describe the presentation or how the web pages such as the layout, color, fonts, images, icons",
    },
    {
        id: "4",
        question: "Which programming language is used to make websites interactive?",
        options: ["HTML", 
                 "Java", 
                 "JavaScript", 
                 "Pyhton"],
        correct: "JavaScript",
    },
    {
        id: "5",
        question: "Which one is not a JavaScript framework?",
        options: ["Angular",
                 "React", 
                 "Bootstrap", 
                 "Vue.js"],
        correct: "Bootstrap",
    }, {
        id: "6",
        question: "What is back-end development?",
        options: ["It is working on server-side software which focuses oneverything you can't see on a website.",
                 "It is what you see on the website", 
                 "It is what users update on the website.", 
                 "It is database"],
        correct: "It is working on server-side software which focuses oneverything you can't see on a website.",
    },
    {
        id: "7",
        question: "Which is a popular open-source database management system?",
        options: ["MySql",
                  "Python", 
                  "Java", 
                  "PHP"],
        correct: "MySql",
    },
    {
        id: "8",
        question: "What is MySql server?",
        options: ["MySQL server provides a database management system with querying and connectivity capabilities, as well as the ability to have excellent data structure",
                 "It is a popular open-source database management system",
                "Stores data only which are structured.", 
                "It is the list known database management system"],
        correct: "MySQL server provides a database management system with querying and connectivity capabilities, as well as the ability to have excellent data structure",
    },
    {
        id: "9",
        question: "____is a popular open-source general-purpose scripting language that is especially suited for web development and can be embedded into HTML. ",
        options: ["Python",
                  "Java", 
                  "SQL", 
                  "PHP"],
        correct: "PHP",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 2000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;

        //testing if the user has done well
        if (scoreCount > 5){
            userInfo.innerHTML = 
            "That's well done Congraculations!";   
        }else{
            userInfo.innerHTML =
            "Your score is poor, do well next time";
                        }
        
        
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
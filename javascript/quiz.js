//variables
const quizQuestion = document.querySelector("h3");
const allRadio = document.querySelectorAll(".my-radio");
const radio1 = document.querySelector("#answer1");
const label1 = document.querySelector("#label1");
const radio2 = document.querySelector("#answer2");
const label2 = document.querySelector("#label2");
const radio3 = document.querySelector("#answer3");
const label3 = document.querySelector("#label3");
const radio4 = document.querySelector("#answer4");
const label4 = document.querySelector("#label4");
const nextButton = document.querySelector('.next');

let currentQuestionCounter = 0;
const myQuestions = [];

// Functions
async function buildMyQuiz() {
    myQuestions.length = 0;
    const test = await fetch('../json/questions.json')
        .then(response => response.json())
        .then(data => data.forEach((element) => {
            myQuestions.push(element)
        }));
    console.log("array", myQuestions);

    myQuestions.forEach((currentQuestion, index) => {
        localStorage.setItem(`Q${index + 1}`, currentQuestion.correctAnswer)
    })

    // save user's last choice.
    currentQuestionCounter = 0;
    for (let localItem in localStorage) {
        let flag = localItem.slice(0, 1);
        if (flag === `A`) {
            currentQuestionCounter++;
        }

    }

    quizQuestion.innerHTML = myQuestions[currentQuestionCounter].question;
    label1.innerHTML = myQuestions[currentQuestionCounter].answers.a;
    label2.innerHTML = myQuestions[currentQuestionCounter].answers.b;
    label3.innerHTML = myQuestions[currentQuestionCounter].answers.c;
    label4.innerHTML = myQuestions[currentQuestionCounter].answers.d;
    console.log(myQuestions.length);
    if (currentQuestionCounter >= myQuestions.length - 1) {
        nextButton.innerHTML = "Submit";
    }
}

function showNextQuestion() {
    let userChoice = 0;

    correctChoice = myQuestions[currentQuestionCounter].correctAnswer;
    for (let index = 0; index < allRadio.length; index++) {
        if (allRadio[index].checked == true) {
            userChoice = allRadio[index];
            userChoice.checked = false;
            currentQuestionCounter++;
            if (userChoice.value === correctChoice) {
                localStorage.setItem(`A${currentQuestionCounter}`, `${JSON.stringify(true)}`)
                console.log(currentQuestionCounter);
            }
            else {
                localStorage.setItem(`A${currentQuestionCounter}`, `${JSON.stringify(false)}`)
                console.log(currentQuestionCounter);

            }
        }
    }

    if (currentQuestionCounter === myQuestions.length) {
        window.close();
        window.open("../html/result.html", '_blank');
    }

    buildMyQuiz();
}

async function reportProblem() {
    const { value: formValues } = await Swal.fire({
        title: 'Report a problem',
        html:
            `<input id="swal-input1" class="swal2-input" placeholder="${usernameToShow}" readonly>` +
            `<input id="swal-input1" class="swal2-input" placeholder="Report question ${currentQuestionCounter + 1}" readonly>` +
            '<textarea id="swal-input3" class="swal2-textarea" placeholder="Write your message..."></textarea>',
        focusConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input3').value
            ]
        }
    })

    if (formValues != '') {
        localStorage.setItem(`userReportQ${currentQuestionCounter}`, `${JSON.stringify(formValues)}`)
        Swal.fire(
            {
                icon: 'success',
                title: 'Success',
                text: 'Your report has been sent!',
                showConfirmButton: false,
                timer: '1500'
            }
        )
    }
    else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'Your message was empty!'
        })
    }
}

// const myQuestions = [
//     {
//         question: "how to do comment in css?",
//         answers: {
//             a: "/* This is a single-line comment */",
//             b: "/ This is a single-line comment /*",
//             c: "<-- This is a single-line comment -->",
//             d: "--< This is a single-line comment >--"
//         },
//         correctAnswer: "a",
//     },
//     {
//         question: "Which of the following allows specifying styles for the visual elements of the website ?",
//         answers: {
//             a: "Cascading Style sheets",
//             b: "Web page",
//             c: "Form",
//             d: "Animation"
//         },
//         correctAnswer: "a",
//     },
//     {
//         question: "Which of the following is known as special symbol in the syntax of CSS ?",
//         answers: {
//             a: "Selector",
//             b: "Declaration",
//             c: "Rules",
//             d: "Input"
//         },
//         correctAnswer: "c",

//     },
//     {
//         question: "Which of the following are two main parts of CSS rule ?",
//         answers: {
//             a: "Select, declaration",
//             b: "Selector, declare",
//             c: "Selection, declaration",
//             d: "Selector, declaration"
//         },
//         correctAnswer: "b",
//     },
//     {
//         question: "Which of the following is an HTML element on which style can be applied ?",
//         answers: {
//             a: "Declaration",
//             b: "Selector",
//             c: "Select",
//             d: "Declare"
//         },
//         correctAnswer: "c",

//     },
//     {
//         question: "Which of the following is the syntax of CSS ?",
//         answers: {
//             a: "elect {property : value}",
//             b: "Selector {value : property}",
//             c: "Selector {property : value}",
//             d: "Selection {property : value}"
//         },
//         correctAnswer: "c",

//     },
//     {
//         question: "Which of the following is a scripting language that allows adding programming to web pages ?",
//         answers: {
//             a: "Action script",
//             b: "JavaScript",
//             c: "HTML",
//             d: "CSS"
//         },
//         correctAnswer: "b",
//     },
//     {
//         question: "Which of the following is a scripting language that is simple, lightweight programming language that does not contain advanced programming functionalities ?",
//         answers: {
//             a: "JavaScript",
//             b: "HTML",
//             c: "C",
//             d: "Java"
//         },
//         correctAnswer: "a",
//     },
//     {
//         question: "Which one of these is a JavaScript package manager?",
//         answers: {
//             a: "Node.js",
//             b: "TypeScript",
//             c: "npm",
//             d: "asp.net"
//         },
//         correctAnswer: "c"
//     },
//     {
//         question: "Which of the following symbol signifies the start and end of a JavaScript block ?",
//         answers: {
//             a: "Semicolon",
//             b: "Square bracket",
//             c: "Curly bracket",
//             d: "Round bracket"
//         },
//         correctAnswer: "c",
//     }
// ];

// console.log(JSON.stringify(myQuestions));
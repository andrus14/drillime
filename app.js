const titleH1 = document.getElementById('title')
const questionDiv = document.getElementById('question')
const answerBox = document.getElementById('answer-box')
const timerBoxDiv = document.getElementById('timer')
const correctCounterDiv = document.getElementById('correct-counter')
const incorrectCounterDiv = document.getElementById('incorrect-counter')
const fileUpload = document.getElementById('file-upload')

let questionIndex = -1
let correctCount = 0
let incorrectCount = 0

var testData
var correctAnswers

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const fileName = '/upload/' + urlParams.get('file')

fetch(fileName)
.then(response => response.json())
.then(data => {
    testData = data
    initTestBoard(testData.metaData.title)
    startTest()
})

// Init test board
function initTestBoard ( title ) {
    correctAnswers = []
    titleH1.innerText = title
    answerBox.focus()
    askNextQuestion()
}

// Timer
function startTest () {
    let timerValue = 60000
    timerBoxDiv.innerText = timerValue
    
    const intervalId = setInterval(() => {
        timerValue--
        timerBoxDiv.innerText = timerValue
    
        if ( timerValue == 0 ) {
            closeTest(intervalId)
        }
    }, 1000)
}

// If time is up, close the test
function closeTest (intervalId) {
    clearInterval(intervalId)
    answerBox.setAttribute('disabled', true)
    answerBox.value = ''

    sendData ();
}

// Listen keydown event
answerBox.addEventListener('keydown', e => {
    if ( e.key == "Enter" ) {
        checkAnswer()
        askNextQuestion()
        answerBox.value = ''
    }
})

// Next question
function askNextQuestion () {
    answerBox.focus()
    questionIndex = Math.floor(Math.random() * testData.questions.length)
    questionDiv.innerText = testData.questions[questionIndex].question
}

// Check answer
function checkAnswer () {
    const question = testData.questions[questionIndex] 
    if ( question.type == 'word' ) {
        if ( answerBox.value.toLowerCase() == question.answer.toLowerCase() ) {
            correctCount++
            correctCounterDiv.innerText = correctCount
        } else {
            incorrectCount++
            incorrectCounterDiv.innerText = incorrectCount
        }
    } else if ( question.type == 'list' ) {
        const userAnswer = answerBox.value.toLowerCase()
        if ( !correctAnswers.includes(userAnswer) ) {
            if ( question.answer.includes(userAnswer) ) {
                correctAnswers.push(userAnswer)
                correctCount++
                correctCounterDiv.innerText = correctCount
            } else {
                incorrectCount++
                incorrectCounterDiv.innerText = incorrectCount
            }
        }
    }

    answerBox.value = ''
}

function sendData() {

    const person = prompt("Please enter your name", "Harry Potter");

    if (person != null) {
        fetch('api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: person,
                type: 'type',
                correct: correctCount,
                incorrect: incorrectCount,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

// File upload
fileUpload.addEventListener('change', e => {
    const password = prompt("Insert password");

    const files = event.target.files
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('password', password)
  
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
        e.target.value = null
    })
    .catch(error => {
      console.error(error)
    })
})

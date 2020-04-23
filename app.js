const testData = {
    "metaData": {
        "title": "Inglise keel: linnud",
        "author": "Andrus Naulainen",
        "date": "2020-04-23",
    },
    "questions": [
        {
            "question": "part",
            "answer": "duck",
            "type": "word",
        },
        {
            "question": "tuvi",
            "answer": "dove",
            "type": "word",
        },
        {
            "question": "öökull",
            "answer": "owl",
            "type": "word",
        },
        {
            "question": "kotkas",
            "answer": "eagle",
            "type": "word",
        },
        {
            "question": "emu",
            "answer": "emu",
            "type": "word",
        },
        {
            "question": "flamingo",
            "answer": "flamingo",
            "type": "word",
        },
        {
            "question": "emu",
            "answer": "emu",
            "type": "word",
        },
        {
            "question": "emu",
            "answer": "emu",
            "type": "word",
        },
    ]
}

const titleH1 = document.getElementById('title')
const questionDiv = document.getElementById('question')
const answerBox = document.getElementById('answer-box')
const timerBoxDiv = document.getElementById('timer')
const correctCounterDiv = document.getElementById('correct-counter')
const incorrectCounterDiv = document.getElementById('incorrect-counter')
const fileUpload = document.getElementById('file-upload')

// Init test board
titleH1.innerText = testData.metaData.title
answerBox.focus()
let questionIndex = -1
let correctCount = 0
let incorrectCount = 0
askNextQuestion()

// Timer
let timerValue = 60000
timerBoxDiv.innerText = timerValue

const intervalId = setInterval(() => {
    timerValue--
    timerBoxDiv.innerText = timerValue

    if ( timerValue == 0 ) {
        closeTest()
    }
}, 1000)

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
    if ( answerBox.value == testData.questions[questionIndex].answer ) {
        correctCount++
        correctCounterDiv.innerText = correctCount
    } else {
        incorrectCount++
        incorrectCounterDiv.innerText = incorrectCount
    }
    answerBox.value = ''
}

// If time is up, close the test
function closeTest () {
    clearInterval(intervalId)
    answerBox.setAttribute('disabled', true)
    answerBox.value = ''

    sendData ();
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
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
})

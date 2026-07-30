const FOCUS_TIME = 25
const SHORT_BREAK_TIME = 5
const LONG_SHORT_TIME = 15

const context = {
    '1': FOCUS_TIME,
    '2': SHORT_BREAK_TIME,
    '3': LONG_SHORT_TIME
}

const timerDisplay = document.querySelector('.timer-card__display')
const timerForm = document.querySelector('.timer-card__form')
const timerIcon = document.querySelector('.timer-card__form .icon') 
const button = document.querySelector('.button')

let seconds = 0
let intervalId = null

function startTimer() {
    button.lastChild.textContent = 'Pausar'
    timerIcon.classList.replace('icon--pause', 'icon--play')
    intervalId = setInterval(() => {
        seconds ++
        console.log('tempo: ', seconds)
    },1000)
    console.log('intervalId ', intervalId);
}

function pauseTimer() {
    button.lastChild.textContent = 'Começar'
    timerIcon.classList.replace('icon--play', 'icon--pause')
}

timerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (intervalId) {
        startTimer()
    } else {
        pauseTimer()
    }
})

function formatTimer(second) {
    const date = new Date(second*1000)

    return date.toLocaleTimeString('pt-BR', {
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    })
}

export function resetTimer(mode) {
    const seconds = context[mode]
    timerDisplay.textContent = formatTimer(seconds)
}

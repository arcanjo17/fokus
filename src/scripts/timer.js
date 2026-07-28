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

timerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let isRunning = timerIcon.classList.contains('icon--pause')

    if (isRunning) {
        timerIcon.classList.remove('icon--pause')
        timerIcon.classList.add('icon--play')
    } else {
        timerIcon.classList.add('icon--pause')
        timerIcon.classList.play('icon--play')
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

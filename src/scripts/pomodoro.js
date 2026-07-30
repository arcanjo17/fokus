import { resetTimer } from "./timer.js"

const tabs = document.querySelectorAll('.timer-card__tab')
const page = document.querySelector('.page')
const modeImage = document.querySelector('.banner img')
const bannerTitleText = document.querySelector('.banner__title--text')
const bannerTitleHighlight = document.querySelector('.banner__title--highlight')

let mode = 1

const context = {
    '1': {
        title: 'Otimize sua produtividade,',
        highlight: 'mergulhe no que importa'
    }, 
    '2': {
        title: 'Que tal dar uma respirada?',
        highlight: 'Faça uma pausa curta!'
    }, 
    '3': {
        title: 'Hora de voltar à superfície.',
        highlight: 'Faça uma pausa longa.'
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', event => {
        mode = event.currentTarget.dataset.mode
        page.dataset.mode = mode

        tabs.forEach(tab => {
            tab.disabled = false
            tab.classList.remove('timer-card__tab--active')
            tab.setAttribute('aria-selected', false)
        })

        const modeImageSrc = `/mode-${mode}.png`
        modeImage.setAttribute('src', modeImageSrc)

        const modeContext = context[mode]
        bannerTitleText.textContent = modeContext.title
        bannerTitleHighlight.textContent = modeContext.highlight

        resetTimer(mode)
        
        event.currentTarget.disabled = true
        event.currentTarget.classList.add('timer-card__tab--active')
        event.currentTarget.setAttribute('aria-selected', true)
    })
})
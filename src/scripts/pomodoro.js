const tabs = document.querySelectorAll('.timer-card__tab')
const page = document.querySelector('.page')
const modeImage = document.querySelector('.banner img')

let mode = 1

tabs.forEach(tab => {
    tab.addEventListener('click', event => {
        console.log('elemento clicado: ', event.currentTarget);
        mode = event.currentTarget.dataset.mode
        page.dataset.mode = mode
        console.log('novo modo: ', mode);

        tabs.forEach(tab => {
            tab.disable = false
            tab.classList.remove('timer-card__tab--active')
            tab.setAttribute('aria-selected', false)
        })

        const modeImageSrc = `/mode-${mode}.png`
        modeImage.setAttribute('src', modeImageSrc)
        
        event.currentTarget.disable = true
        event.currentTarget.classList.add('timer-card__tab--active')
        event.currentTarget.setAttribute('aria-selected', true)
    })
})
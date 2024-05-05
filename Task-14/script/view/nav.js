const hamburgerBtn = document.querySelector('.hamburger-btn')

hamburgerBtn.addEventListener('click', () => {
    const hamburger = document.querySelector('.hamburger')
    hamburger.classList.toggle("collapse")
})
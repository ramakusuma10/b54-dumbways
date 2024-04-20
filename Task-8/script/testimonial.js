import { testimonials } from "./datadummy.js"

window.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button')

    filterButtons.forEach((filterButton) => {
        filterHandler(filterButton)
    })

    giveTestimonial(testimonials)
})

function filterHandler(button) {
    button.addEventListener('click', () => {
        const requestedRating = parseInt(button.getAttribute('rate'))
        const filteredTestimonial = testimonials.filter((testimonials) => testimonials.rate == requestedRating)

        if (!requestedRating) {
            return giveTestimonial(testimonials)
        }

        if (!filteredTestimonial.length) {
            return givenotFoundMessage()
        }
        
        return giveTestimonial(filteredTestimonial)
    })
}

function givenotFoundMessage() {
    const notFoundMessage = notFoundMessageCreator()

    const testimonialsCover = document.querySelector('.testimonials')
    testimonialsCover.innerHTML = notFoundMessage
}

function notFoundMessageCreator() {
    return (
        `
        <div class="notfound">
            <h2>Data not found!</h2>
        </div>
        `
    )
}

function giveTestimonial(testimonials) {
    const testimonialCards = testimonials.map((testimonial) => {
        const testimonialCard = cardCreator(testimonial)

        return testimonialCard
    })

    const testimonialsCover= document.querySelector('.testimonials')
    testimonialsCover.innerHTML = testimonialCards.join('')
}

function cardCreator(testimonial) {
    const { nama, rate, testimoni, image } = testimonial

    return (
        `
        <div class="card">
            <img src="${image}" class="image" alt="testimony image">
            <p class="content">${testimoni}</p>
            <h3 class="nama">${nama}</h3>
            <div class="stars">
                ${stars(rate)}
            </div>
        </div>
        `
    )
}

function stars(rate) {
    const star = []
    
    for (let i = 0; i < rate; i++) {
        star.push('<i class="fa-solid fa-star"></i>')
    }

    return star.join('')
}
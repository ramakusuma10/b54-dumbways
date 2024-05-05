import { getTesti} from "../data/url.js"

window.addEventListener('DOMContentLoaded', () => {

    getTestimonial()

})

function getTesimonialData() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
  
      xhr.open("GET", getTesti.get_Testi, true)
      xhr.send()

      xhr.onload = function() {
        resolve(JSON.parse(xhr.response));
      }
  
      xhr.onerror = function() {
        reject("Network Error!")
      }

    })

}

async function getTestimonial() {
    try {
        const response = await getTesimonialData()
        initTestimonial(response)
    } catch(err) {
        throw new Error(err)
    }
}

function initTestimonial(testimonials){
    
    const filterButtons = document.querySelectorAll('.filter-button')
    
    filterButtons.forEach((filterButton) => {
        filterHandler(filterButton, testimonials)
    })
    
    giveTestimonial(testimonials)

}


function filterHandler(button,testimonials) {
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
            <h5 class="nama fw-bold">${nama}</h5>
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
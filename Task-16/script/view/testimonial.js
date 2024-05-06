import { getTesti} from "../utilites/url.js"

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
    
    const testimonialCard = testimonials.map((testimonial) =>
    cardCreator(testimonial)
    )
    give(testimonialCard.join(''))

}


function filterHandler(button,testimonials) {
    button.addEventListener('click', () => {
        const requestedRating = parseInt(button.getAttribute('rate'))
        const filteredTestimonial = testimonials.filter((testimonials) => testimonials.rate == requestedRating)

        if (!requestedRating) {
            const testimonialCard = testimonials.map((testimonial) =>
            cardCreator(testimonial)
            )
            return give(testimonialCard.join(''))
        }

        if (!filteredTestimonial.length) {
            const emptyMessage = notFoundMessage()
            return give(emptyMessage)
        }
        
        const testimonialCard = filteredTestimonial.map((testimonial) =>
        cardCreator(testimonial))

    return give(testimonialCard.join(''))
    })
}

function notFoundMessage() {
    return (
        `
        <div class="notfound">
            <h2>Data not found!</h2>
        </div>
        `
    )
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

function give(html) {
    const testimonialsCover = document.querySelector('.testimonials')
    testimonialsCover.innerHTML = html
}
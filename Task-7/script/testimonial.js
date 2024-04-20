import { testimonials } from "./datadummy.js"

class Testimoni {
    constructor({id, nama, rate, testimoni, image}){
        this.id = id
        this.nama = nama
        this.rate = rate
        this.testimoni = testimoni
        this.image = image
    }


    createCard() { 
        return (
            `
            <div class="card">
                <img src = "${this.image}" class="image" alt="testimony image">
                <p class="content">${this.testimoni}</p>
                <h3 class="nama">${this.nama}</h3>
                <div class="star">
                    ${this.createStar(this.rate)}
                    </div>
            </div>

            `
        )
    }

    createStar(rate){
        const star = []

        for (let i = 0; i < rate; i++){
            star.push('<i class="fa-solid fa-star"></i>')
        }

        return star.join('')
    }
}
    
const testimoniCards = testimonials.map((testimoni) => {
        const testimoniCard = new Testimoni({
            id: testimoni.id,
            nama: testimoni.nama,
            rate: testimoni.rate,
            testimoni: testimoni.testimoni,
            image: testimoni.image

        })

        return testimoniCard.createCard()
})

const testimonialsCover = document.querySelector('.testimonials')
testimonialsCover.innerHTML += testimoniCards.join('')

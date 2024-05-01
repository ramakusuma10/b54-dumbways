import { projects } from "./datadummy.js"

window.addEventListener("DOMContentLoaded", () => {

    projects.forEach((project) => {
        renderProject(project)
    })
})
function renderProject(project) {
    const showlist = document.querySelector('.showlist')

    let duration = getDuration(project.startDate, project.endDate)
    let Template = cardCreator({
        ...project,
        duration: duration
    })

    showlist.innerHTML += Template
}

function getDuration(startDate, endDate) {

    let startDatePart = startDate.split("/")
    let endDatePart = endDate.split("/")

    let formatStartDate = startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0]
    let formatEndtDate = endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0]

    let newStartDate = new Date(formatStartDate)
    let newEndtDate = new Date(formatEndtDate)

    let timeDifference = newEndtDate - newStartDate
    let differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    let differenceInMonths = Math.floor(differenceInDays / 30.44)
    
    let differenceInYears = Math.floor(differenceInMonths / 12)

    let duration;

    if (differenceInYears > 0) {
        duration = `${differenceInYears} years`
    } else if (differenceInMonths > 0) {
        duration = `${differenceInMonths} month`
    } else {
        duration = `${differenceInDays} days`
    }

    return duration
}

function cardCreator(project) {
    let { id, name, duration, summary, technologies, image } = project

    return (
        `
        <div class="card d-flex flex-column text-center">
            <a href="./detailproject.html?id=${id}" class="project-detail-link">
                <img src="${image}" class="card-image-top project-image" alt="Project image">
                <h4 class="card-title">${name}</h4>
            </a>
            <div class="px-4 mt-1 py-3">
                <p class="project-duration">Durasi: ${duration}</p>
                <p class="project-summary">
                ${summary}
                </p>
                <div class="tech-group">
                ${technologies.map((tech) => `<i class="fa-brands fa-${tech}"></i>`).join('')}
                </div>
                <div class="button-group mt-5 py-2">
                    <div class="btn btn-primary w-100 d-flex justify-content-center">Edit</div>
                    <div class="btn btn-warning w-100 d-flex justify-content-center">Delete</div>
                </div>
            </div>
        </div>
      `  
    )
}

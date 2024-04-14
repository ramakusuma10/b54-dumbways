import { projects } from "./datadummy.js"

window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('.form-input')

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        formHandler(projects)
    })

    projects.forEach((project) => {
        renderProject(project)
    })
})


function formHandler(projects) {
    const Name = document.getElementById('projectname').value
    const StartDate = document.getElementById('start-date').value
    const EndDate = document.getElementById('end-date').value
    const Description = document.getElementById('description').value
    const Image = document.getElementById('input-image').files[0]
    const Checkboxs = document.querySelectorAll('.checkbox')


    const project = {

        id: projects.length + 1,
        name: Name,
        startDate: StartDate,
        endDate: EndDate,
        summary: Summary,
        description: Description,
        image: getImageURL(Image),
        technologies: getTechs(Checkboxs)
    }
    renderProject(project)
}

function getImageURL(image) {
    return URL.createObjectURL(image)
}

function getTechs(checkboxs) {
    const techs = []
    
    checkboxs.forEach((checkbox) => {
        if (checkbox.checked) {
            techs.push(checkbox.value)
        }
    })

    return techs
}

function renderProject(project) {
    const showlist = document.querySelector('.showlist')

    const duration = getDuration(project.startDate, project.endDate)
    const Template = cardCreator({
        ...project,
        duration: duration
    })

    showlist.innerHTML += Template
}

function getDuration(startDate, endDate) {
    return '2 months'
}

function cardCreator(project) {
    const { id, name, duration, summary, technologies, image } = project

    return (
        `
        <div class="project-card">
            <a href="./detailproject.html?id=${id}" class="project-detail-link">
                <img src="${image}" class="project-image" alt="Project image">
                <h2 class="project-title">${name}</h2>
            </a>
            <p class="project-duration">Durasi: ${duration}</p>
            <p class="project-summary">
                ${summary}
            </p>
            <div class="tech-group">
                ${technologies.map((tech) => `<i class="fa-brands fa-${tech}"></i>`).join('')}
            </div>
            <div class="button-group">
                <div class="edit-button">Edit</div>
                <div class="delete-button">Delete</div>
            </div>
        </div>
        `
    )
}


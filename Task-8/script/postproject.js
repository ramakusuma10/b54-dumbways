import { projects } from "./datadummy.js"

window.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector('.form-input')

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
    let StartDate = document.getElementById('start-date').value
    let EndDate = document.getElementById('end-date').value
    const Summary = document.getElementById('summary').value
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

    if (Name === "") {
        return alert("Please entered your title!")
    } else if (StartDate === "") {
        return alert("Please entered your startdate!")
    } else if (EndDate === "") {
        return alert("Please entered your enddate!")
    } else if (Summary === "") {
        return alert("Please entered your content!")
    } else if (Description === "") {
        return alert("Please entered your content!")
    } else if ( getImageURL(Image) === "") {
        return alert("Please entered your image!")
    }

    if (StartDate > EndDate) {
        return alert("The end date cannot be less than the start date")
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


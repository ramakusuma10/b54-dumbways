import { projects } from "./datadummy.js"

window.addEventListener("DOMContentLoaded", () => {
    const urlParam = new URLSearchParams(window.location.search)
    const projectId = urlParam.get('id')

    const requestedProject = projects.find((project) => project.id === parseInt(projectId))

    if (requestedProject) {
        renderDetail(requestedProject)
    } 
})

function getDuration(startDate, endDate) {
    return '3 months'
}

function getTechName(tech) {
    switch(tech) {
        case 'node-js':
            return 'Node JS'
        case 'react':
            return 'React'
        case 'vuejs':
            return 'Vue JS'
        case 'js':
            return 'JavaScript'
    }
}

function renderDetail(project) {
    const wrapper = document.querySelector('.wrapper.project-detail')
    const duration = getDuration(project.startDate, project.endDate)

    const detailTemplate = detailCreator({
        ...project,
        duration: duration
    })

    wrapper.innerHTML += detailTemplate
}

function detailCreator(project) {
    const { name, startDate, endDate, duration, description, technologies, image } = project
    const techHTML = technologies.map((tech) => {
        return (
            `
            <div class="tech-icon-group">
                <i class="fa-brands fa-${tech}"></i>
                <p>${getTechName(tech)}</p>
            </div>
            `
        )
    })

    return (
        `
            <h1>${name.toUpperCase()}</h1>
            <div class="detail-header">
                <img src="${image}" class="detail-image" alt="">
                <div class="detail-info">
                    <h2>Duration</h2>
                    <div class="detail-date-group">
                        <i class="fa-solid fa-calendar"></i>
                        <p>${startDate} - ${endDate}</p>
                    </div>
                    <div class="detail-duration-group">
                        <i class="fa-solid fa-clock"></i>
                        <p>${duration}</p>
                    </div>
                    <h2>Technologies</h2>
                    <div class="detail-tech-group">
                        ${techHTML.join('')}
                    </div>
                </div>
            </div>
            <div class="detail-body">
                <h2>Description</h2>
                <div class="detail-desc">
                    ${description}
                </div>
            </div>
        `
    )
}

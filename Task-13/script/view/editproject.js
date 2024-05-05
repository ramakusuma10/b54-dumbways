
document
    .querySelector('.form-input')
    .addEventListener('submit', async (event) => {
        event.preventDefault()

        const baseUrl = window.location.origin
        const id = window.location.pathname.split('/')[2]
        const project = formHandler()

        if (project) {
            await fetch(`${baseUrl}/editproject/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            })

            window.location.assign('/index')
        }
    })


    function formHandler() {
        const Name = document.getElementById('name').value
        let StartDate = document.getElementById('start-date').value
        let EndDate = document.getElementById('end-date').value
        const Summary = document.getElementById('summary').value
        const Description = document.getElementById('description').value
        const Image = document.getElementById('input-image').files[0]
        const Checkboxs = document.querySelectorAll('.checkbox')
    
        
        const project = {
    
            name:Name,
            startDate:StartDate,
            endDate:EndDate,
            summary:Summary,
            description:Description,
            image: getImageURL(Image),
            technologies:getTechs(Checkboxs)
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
    
        return readyProject(project)
    }
    
    function readyProject(project) {
        const duration = getDuration(project.startDate, project.endDate)
        const startDate = formatDate(project.startDate)
        const endDate = formatDate(project.endDate)
        const techHTML = techHTMLCreator(project.technologies)
        const techDetailHTML = techDetailHTMLCreator(project.technologies)
    
        return {
            ...project,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            techHTML: techHTML,
            techDetailHTML: techDetailHTML,
        }
    }
    console.log(readyProject())
    
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
    
    function getTechName(tech) {
        switch (tech) {
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
    
    
    function techHTMLCreator(technologies) {
        return technologies.map((tech) => {
                return `<i class="fa-brands fa-${tech}"></i>`})
            .join('')
    }
    
    function techDetailHTMLCreator(technologies) {
        return technologies.map((tech) => {
                return `<div class="tech-icon-group"><i class="fa-brands fa-${tech}"></i><p>${getTechName(tech)}</p></div>`}).join('')
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
    
    function formatDate(date) {
        const dateSample = new Date(date)
        const monthData = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]
    
        const day = dateSample.getDate()
        const month = monthData[dateSample.getMonth()]
        const year = dateSample.getFullYear()
    
        return `${day} ${month} ${year}`
    }
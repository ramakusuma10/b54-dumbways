const project = {
     readyProject(project) {
        const duration = this.getDuration(project.startDate, project.endDate)
        const startDate = this.formatDate(project.startDate)
        const endDate = this.formatDate(project.endDate)
        const techHTML = this.techHTMLCreator(project.technologies)
        const techDetailHTML = this.techDetailHTMLCreator(project.technologies)
    
        return {
            ...project,
            startDate: startDate,
            endDate: endDate,
            duration: duration,
            techHTML: techHTML,
            techDetailHTML: techDetailHTML,
        }
    },

    

    techHTMLCreator(technologies) {
        return technologies.map((tech) => {
                return `<i class="fa-brands fa-${tech}"></i>`}).join('')
    },
    
    techDetailHTMLCreator(technologies) {
        return technologies.map((tech) => {
                return `<div class="tech-icon-group"><i class="fa-brands fa-${tech}"></i><p>${this.getTechName(tech)}</p></div>`}).join('')
    },
    
    getDuration(startDate, endDate) {
    
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
    },
    
    formatDate(date) {
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
    },

    getTechName(tech) {
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
    },
}
module.exports = project
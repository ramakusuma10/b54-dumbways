
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
    
        return project
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
    
   
   
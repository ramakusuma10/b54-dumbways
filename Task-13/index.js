const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const config = require("./config/config.json")
const {Sequelize, QueryTypes} = require("sequelize")
const sequelize = new Sequelize(config.development)
const project  = require('./script/utilites/project.js')


const app = express()
const port = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '/')))

// middleware
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json())


// routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', async(req, res) => {
    const query = `SELECT * FROM projects`
    const reactions = await sequelize.query(query, { type: QueryTypes.SELECT })

    const data = reactions.map((reaction) => {
        return project.readyProject(reaction)
    })
    
    res.render("index",{data})
})

app.get('/addproject', (req, res) => {
    res.render('addproject')
})

app.post('/addproject', async(req, res) => {
    const { name, startDate, endDate, summary, description, technologies, image } =
    req.body
    const ArrTechnologies = technologies.join(',')

    const query = `INSERT INTO projects (name, "startDate", "endDate", summary, description, technologies, image, "createdAt","updatedAt") VALUES ('${name}', '${startDate}', '${endDate}', '${summary}', '${description}', '{${ArrTechnologies}}', '/assets/img/image1.jpg', now(), now())`
    await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data :",query)

    res.send({ status: 'Ok!' })
})

app.delete('/addproject/:id', (req, res) => {
    const { id } = req.params

    projects = projects.filter((project) => project.id != id)

    res.send({ status: 'success!' })
})

app.get('/editproject/:id', (req, res) => {
    const { id } = req.params
    const requestedProject = projects.find((project) => project.id == id)

    requestedProject.technologies.forEach((tech) => {
        requestedProject[tech] = 'checked'
    })

    res.render('editproject', requestedProject)
})

app.put('/editproject/:id', (req, res) => {
    const { id } = req.params
    const editedProject = req.body

    projects = projects.map((project) => {
        if (project.id == id) {
            return {
                id: parseInt(id),
                ...editedProject,
                image: '/assets/images/image1.jpg',
            }
        }

        return project
    })

    res.send({ status: 'Succes!' })
})

app.get('/detailproject/:id', (req, res) => {
    const { id } = req.params
    const project = projects.find((project) => project.id == id)

    res.render('detailproject', project)
})

app.get('/testimonial', (req, res) => {
    res.render('testimonial')
})

app.get('/contactForm', (req, res) => {
    res.render('contactForm')
})

app.post('/contactForm', (req, res) => {
    const { name, email, phone, subject, message } = req.body

    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Phone: ${phone}`)
    console.log(`Subject: ${subject}`)
    console.log(`Messsage: ${message}`)

    res.redirect('/contactForm')
})

// indicators
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})
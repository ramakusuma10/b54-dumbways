const express = require('express')
const path = require('path')
const initialProjects = require('./script/data/datadummy.js')

let projects = initialProjects
const app = express()
const port = 5000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '/')))

// middleware
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index',{projects})
})

app.get('/addproject', (req, res) => {
    res.render('addproject')
})

app.post('/addproject', (req, res) => {
    const {
        name,
        startDate,
        endDate,
        summary,
        nodejs,
        reactjs,
        vuejs,
        js,
        description,
        image,
    } = req.body

    console.log(`Project Name: ${name}`)
    console.log(`Start Date: ${startDate}`)
    console.log(`End Date: ${endDate}`)
    console.log(`Summary: ${summary}`)
    console.log(`Description: ${description}`)
    console.log(`Node JS: ${nodejs}`)
    console.log(`React JS: ${reactjs}`)
    console.log(`Vue JS: ${vuejs}`)
    console.log(`JavaScript: ${js}`)
    console.log(`Project Image: ${image}`)

    res.redirect('/index')
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
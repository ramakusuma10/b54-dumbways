const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const config = require("./config/config.json")
const {Sequelize, QueryTypes} = require("sequelize")
const sequelize = new Sequelize(config.development)
const project  = require('./script/utilities/project.js')


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

    const query = `INSERT INTO projects (name, "startDate", "endDate", summary, description, technologies, image, "createdAt","UpdatedAt") VALUES ('${name}', '${startDate}', '${endDate}', '${summary}', '${description}', '{${ArrTechnologies}}', '/assets/img/image1.jpg', now() , now())`
    await sequelize.query(query, { type: QueryTypes.INSERT })

    console.log("data :",query)

    res.send({ status: 'success' })
})

app.delete('/addproject/:id', async(req, res) => {
    const { id } = req.params

    const query = `DELETE FROM projects WHERE id = ${id}`
    await sequelize.query(query, { type: QueryTypes.DELETE })

    res.send({ status: 'success!' })
})

app.get('/editproject/:id', async(req, res) => {
    const { id } = req.params

    const query = `SELECT * FROM projects WHERE id = ${id}`
    const requestedProject = await sequelize.query(query, {
        type: QueryTypes.SELECT,
    })

    requestedProject[0].technologies.forEach((tech) => {
        requestedProject[0][tech] = 'checked'
    })

    res.render('editproject', requestedProject[0])
})

app.put('/editproject/:id', async (req, res) => {
    const { id } = req.params
    const { name, startDate, endDate, summary, description, technologies, image } =
            req.body
        const ArrTechnologies = technologies.join(',')

        const query = `UPDATE projects SET name = '${name}', "startDate" = '${startDate}', "endDate" = '${endDate}', summary = '${summary}', description = '${description}', technologies = '{${ArrTechnologies}}', image = '/assets/img/image1.jpg' WHERE id = ${id}`
        await sequelize.query(query, { type: QueryTypes.UPDATE })


    res.send({ status: 'Succes!' })
})

app.get('/detailproject/:id', async(req, res) => {
    const { id } = req.params
    const query = `SELECT * FROM projects WHERE id = ${id}`
    const reactions = await sequelize.query(query, { type: QueryTypes.SELECT })

        const requestedProject = project.readyProject(reactions)


    res.render('detailproject', requestedProject)
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
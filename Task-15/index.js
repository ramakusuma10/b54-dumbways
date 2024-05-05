const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const controllers = require('./controller/controller.js')
const app = express()
const port = 5000
const session = require('express-session')
const flash = require('express-flash')


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '/')))

// middleware
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(flash())
app.use(
    session({
        secret: 'personal_web_secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 60000 * 60 },
    })
)
app.use((req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn

    if (isLoggedIn) {
        if (req.url === '/login' || req.url === '/register') {
        return res.redirect('/index')
        }
    }

        if (!isLoggedIn) {
            if (
                req.originalUrl.startsWith('/editproject') ||
                req.originalUrl.startsWith('/addproject') ||
                req.url === '/logout'
            ) {
                    req.flash('forbid', 'Please login to access the requested page.')
                    return res.redirect('/login')
            }
        }

    return next()
})

//view
app.get('/', controllers.homeView)
app.get('/index', controllers.homeView)
app.get('/addproject', controllers.addProjectView)
app.get('/editproject/:id', controllers.editProjectView)
app.get('/detailproject/:id', controllers.detailProjectView)
app.get('/testimonial', controllers.testimonialView)
app.get('/contactForm', controllers.contactView)
app.get('/login', controllers.loginView)
app.get('/register', controllers.registerView)

// services
app.post('/addproject', controllers.addProject)
app.delete('/addproject/:id', controllers.deleteProject)
app.put('/editproject/:id', controllers.editProject)
app.post('/login', controllers.login)
app.post('/register', controllers.register)
app.get('/logout', controllers.logout)

// server
app.listen(port, () => {
    console.log(`App is lestening on port: ${port}`)
})

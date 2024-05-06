const config = require("../config/config.json")
const {Sequelize, QueryTypes, where} = require("sequelize")
const sequelize = new Sequelize(config.development)
const project  = require('../script/utilites/project.js')
const projectModel = require("../models").project
const userModel = require("../models").user
const bcrypt = require("bcrypt")


const controller = {
    async login(req, res) {
        const { email, password } = req.body

        const user = await userModel.findOne({
            where: {
                email: email,
            },
        })

        
        const isPasswordMatch = await bcrypt.compare(
            password,
            user?.password || 'default'
        )

        if (!user || !isPasswordMatch) {
            req.flash('auth', 'Sorry, your email/password was incorrect!')
            return res.status(500).send({ success: false })
        }

        req.session.isLoggedIn = true
        req.session.user = {
            userId:user.id,
            name: user.name,
        }

        return res.status(200).send({ success: true })
    },

    async register(req, res) {
        const { name, email, password } = req.body
        try{
            const saltRounds = 10
            const hashed = await bcrypt.hash(password, saltRounds)
            await userModel.create({
                name,
                email,
                password:hashed,
            })
           
            return res.status(200).json({success: true})
            } catch (err) {
            req.flash('auth', `Sorry, the ${err.error[0].message}!`)
            return res.status(500).json({success: false})
        }
    },

    logout(req, res) {
        req.session.destroy()
        res.redirect('/index')
    },

    async homeView(req, res) {

        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        const reactions = await projectModel.findAll({
            include: {
            model: userModel,
            as: 'author',
            required: true,
        },
        where: isLoggedIn ? { userId: user.userId } : {},
        })

        const data = reactions.map((reaction) => {
            return project.readyProject(reaction.dataValues)
        })
    
        res.render('index', {
            data,
            auth: {
            isLoggedIn,
            user,
        },
    })
    },

    addProjectView(req, res) {
            const isLoggedIn = req.session.isLoggedIn
            const user = req.session.user

            res.render('addproject', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    async editProjectView (req, res){
        const { id } = req.params
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        // const query = `SELECT * FROM projects WHERE id = ${id}`
        // const requestedProject = await sequelize.query(query, {
        //     type: QueryTypes.SELECT,
        // })
    
        const reaction = await projectModel.findOne({
            where: {id},
        });
    
        const requestedProject = reaction.dataValues
            const technologies = reaction.dataValues.technologies
    
        technologies.forEach((tech) => {
            requestedProject[tech] = 'checked'
        })
    
        res.render('editproject', {
            project: requestedProject,
            auth: {
                isLoggedIn,
                user,
            },
        })

    },
    
    async detailProjectView (req, res){
        const { id } = req.params
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        const reaction = await projectModel.findOne({
            where: {id},
            include: {
                model: userModel,
                as: 'author',
            },
        });

        const requestedProject = project.readyProject(reaction.dataValues)

        res.render('detailproject', {
            project: requestedProject,
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    testimonialView (req,res){
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        res.render('testimonial', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    contactView (req,res){
        const isLoggedIn = req.session.isLoggedIn
        const user = req.session.user

        res.render('contactForm', {
            auth: {
                isLoggedIn,
                user,
            },
        })
    },

    loginView(req, res) {
        res.render('login')
    },

    registerView(req, res) {
        res.render('register')
    },

    async addProject(req,res){
        const { name, startDate, endDate, summary, description, technologies} =
        req.body
        const userId = req.session.user.userId
    
        // const query = `INSERT INTO projects (name, "startDate", "endDate", summary, description, technologies, image) VALUES ('${name}', '${startDate}', '${endDate}', '${summary}', '${description}', '{${ArrTechnologies}}', '/assets/img/testi-6.jpeg')`
        // await sequelize.query(query, { type: QueryTypes.INSERT })
    
        const query = await projectModel.create({
            name,
            startDate,
            endDate,
            summary,
            description,
            technologies,
            image: req.file.filename,
            userId: userId,
    
        })
    
        console.log("data :",query)
    
        res.send({ status: 'success' })
    },

    async deleteProject(req,res){
        const { id } = req.params

        // const query = `DELETE FROM projects WHERE id = ${id}`
        // await sequelize.query(query, { type: QueryTypes.DELETE })
    
        const query = await projectModel.destroy({
            where: { id },
          });
    
        res.send({ status: 'success!' })
    },

    async editProject(req,res){
        const { id } = req.params
    const { name, startDate, endDate, summary, description, technologies, } =
            req.body
        const ArrTechnologies = technologies.join(',')

        // const query = `UPDATE projects SET name = '${name}', "startDate" = '${startDate}', "endDate" = '${endDate}', summary = '${summary}', description = '${description}', technologies = '{${ArrTechnologies}}', image = '/assets/img/testi-6.jpeg' WHERE id = ${id}`
        // await sequelize.query(query, { type: QueryTypes.UPDATE })

        const query = await projectModel.update(
            {
                name,
                startDate,
                endDate,
                summary,
                description,
                ArrTechnologies,
                image: req.file.filename,
            },
            {
                where: {id},
            })
    
    res.send({ status: 'Succes!' })
    },

    
}
module.exports = controller
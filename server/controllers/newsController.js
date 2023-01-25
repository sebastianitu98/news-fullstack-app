const { default: mongoose } = require("mongoose")
const New = require("../models/newsModel")

//controller to get all news (GET)
const getNews = async (req, res) => {
    try{
        const news = await New.find().sort({createdAt: -1})
        const date = new Date()
        
        const newNews = news.filter( element => {
            let elementDate = new Date(element.expireDate)
            return (date.getTime() - elementDate.getTime() < 0 )
        })
        
        res.status(200).json(newNews)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

//controller to add a new (POST)
const createNew = async (req, res) => {
    const {title, uploadDate, content, expireDate} = req.body

    let emptyFields = []

    if(!title) { emptyFields.push('title') }
    if(!uploadDate) { emptyFields.push('uploadDate') }
    if(!content) { emptyFields.push('content') }
    if(!expireDate) { emptyFields.push('expireDate') }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields})
    }

    try{
        const newNew = await New.create({title, uploadDate, content, expireDate})
        res.status(200).json(newNew)
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

//controller to delete a new ()
const deleteNew = async (req, res) => {
       
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such New'})
    }

    const newNew = await New.findOneAndDelete({ _id: id })

    if (!newNew) {
        return res.status(400).json({error: 'No such New'})
    }

    res.status(200).json(newNew)
    
}



//export controller functions
module.exports = { createNew, getNews, deleteNew }
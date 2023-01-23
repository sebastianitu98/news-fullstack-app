const dotenv = require('dotenv').config();
const connectDB = require('./config/connectDB')
const express = require('express');
const New = require('./models/newsModel');
const {createNew, getNews, deleteNew} = require('./controllers/newsController')

const PORT = '5000'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req,res) => {
    res.send('Home Page');
})

app.get('/api/news', getNews)

app.post('/api/news', createNew)

app.delete('/api/news/:id', deleteNew)


const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        });
    } catch (error) {
        console.log(error)
    }
}
startServer()
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const blogRoutes = require('./routes/blogRoutes')

const app = express()

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); 

app.use('/blogs' , blogRoutes)

app.get('/' , (req , res) => {
	res.sendFile(path.join(__dirname , 'views' , 'index.html'));
})

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Server Is Running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error("Mongoose connection error:", err.message);
    })

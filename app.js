require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.json()); 

const DB_URI = process.env.DB_URI;

app.get('/' , (req , res) => {
	res.send("123");
})

mongoose
	.connect(DB_URI)
	.then(() => {
		console.log("Connected to DB")

		app.listen(3000 , () => console.log('Server Is Running http://localhost:3000'))
	})
	.catch(() => console.log("Error"))

const blockSchema = new mongoose.Schema({
	title: { type: String , require: true },
	body: { type: String , require: true },
	author: { type: String , default:"Не указан"}},
	{ timestamps: true});

const Blog = mongoose.model('Blog' , blockSchema);

app.post('/blogs', async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: "Title and Body are required" });
        }
        const newPost = await Blog.create({ title, body, author });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/blogs/:id' , async (req , res) => {
	try{
		const { id } = req.params;
		const { title , body , author } = req.body;

		const updatePost = await Blog.findByIdAndUpdate(
			id,
			{ title, body, author},
			{ new: true , runValidators: true }
		);

		if (!updatePost) { return res.status(404).json( {message: "Post Not Found"} )}

		res.status(200).json(updatePost);
	}catch (error){
		res.status(500).json({ message: error.message });
	}
})

app.delete('/blogs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Blog.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.status(200).json({ message: "Post deleted successfully:" + id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.get('/blogs/:id', async (req, res) => {
    try {
		const { id } = req.params;
        const post = await Blog.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const posts = await Blog.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


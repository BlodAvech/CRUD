const Blog = require('../models/blog')

exports.createBlog = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        if (!title || !body) {
            return res.status(400).json({ message: "Title and Body are required" });
        }
        const newPost = await Blog.create({title , body , author});
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateBlog = async (req , res) => {
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
}

exports.deletedBlog = async (req, res) => {
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
}


exports.getBlogById = async (req, res) => {
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
}

exports.getAllBlogs = async (req, res) => {
    try {
        const posts = await Blog.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
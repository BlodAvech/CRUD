const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/' , blogController.getAllBlogs)
router.post('/' , blogController.createBlog)
router.put('/:id' , blogController.updateBlog)
router.delete('/:id' , blogController.deletedBlog)
router.get('/:id' , blogController.getBlogById)

module.exports = router
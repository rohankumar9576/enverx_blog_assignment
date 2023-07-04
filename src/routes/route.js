const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogController')
router.post('/posts',blogController.createBlog);
router.get('/posts',blogController.getAllBlogs);
router.get('/posts/:id',blogController.getBlog);
router.put('/posts/:id',blogController.updateBlog);
router.delete('/posts/:id',blogController.deleteBlog)

module.exports=router;
import express from 'express';
import postController from '../controllers/post.controller';

const router = express.Router();

router.post('/create-post', postController.createPost);
router.get('/get-all-posts', postController.getAllPosts);
router.get('/get-post/:id', postController.getPostById);
router.put('/update-post/:id', postController.updatePost);
router.delete('/delete-post/:id', postController.deletePost);

export default router;

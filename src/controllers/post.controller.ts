import { Request, Response } from 'express';
import Post from '../models/post.model';

const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        if (!title ||
            !content ||
            !author) {
            return res.status(400).json({ success: false, message: 'Please send the required input' })
        }

        // Create a new post
        const post = new Post(req.body);
        await post.save();

        res.status(200).json({ success: true, message: 'Post created successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        let updateId = req.params.id;
        if (!title ||
            !content ||
            !updateId) {
            return res.status(400).json({ success: false, message: 'Please send the required input' })
        }

        const post = await Post.findByIdAndUpdate(updateId, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};

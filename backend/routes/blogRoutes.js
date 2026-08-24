const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect } = require('../middleware/auth');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email').sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id
    });

    const populatedBlog = await Blog.findById(blog._id).populate('author', 'name email');
    res.status(201).json(populatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check for user ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this blog' });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'name email');

    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check for user ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.status(200).json({ message: 'Blog removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

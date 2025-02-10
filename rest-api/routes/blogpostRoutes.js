import express from "express";
import BlogPost from "../models/blogpost.js";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let { title, markdownContent, thumbnailUrl } = req.body.payload;
    markdownContent = markdownContent.body;
    const newPost = new BlogPost({ title, markdownContent, thumbnailUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDoc = await BlogPost.findByIdAndDelete(id);
    if (!deletedDoc) {
      res.status(404).json({ message: `document with id ${id} not found` });
    }
    res.json({ message: `document ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "error deleting document" });
  }
});

export default router;

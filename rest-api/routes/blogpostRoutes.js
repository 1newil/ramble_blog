import express from "express";
import BlogPost from "../models/blogpost.js";

const router = express.Router();

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove special characters
};

router.get("/getAllPosts", async (_, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/getLastPosts", async (req, res) => {
  try {
    let { page, limit } = req.body;
    const skip = (page - 1) * limit;
    const blogPosts = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalPosts = await BlogPost.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);
    res.json({
      blogPosts,
      currentPage: page,
      totalPages,
      totalPosts,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/post", async (req, res) => {
  console.log(req.body);
  try {
    let { title, markdownContent, thumbnailUrl } = req.body.payload;

    if (!thumbnailUrl) {
      thumbnailUrl =
        "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=";
    }

    const newPost = new BlogPost({
      title,
      markdownContent,
      thumbnailUrl,
      slug: generateSlug(title),
    });
    console.log(newPost);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/bulkPost", async (req, res) => {
  try {
    const posts = req.body;
    const postsWithSlugs = posts.map((post) => {
      post.title = post.title.trim();
      post.markdownContent = post.markdownContent.trim();
      post.thumbnailUrl = post.thumbnailUrl.trim();
      post.slug = generateSlug(post.title);
      return post; // Add this line to return the modified post
    });
    const newPosts = await BlogPost.insertMany(postsWithSlugs);
    res.status(201).json(newPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const fetchedPost = await BlogPost.findOne({ slug });
    res.status(200).json(fetchedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
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

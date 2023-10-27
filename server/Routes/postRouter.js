const express = require("express");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const postBLL = require("../BLL/PostBLL");
const { checkUserOwnership, authenticateJWT } = require("../middleware/token");
const router = express.Router();

// POST: Add post
router.post(
  "/:userId",
  // authenticateJWT,
  // checkUserOwnership,
  async (req, res) => {
    // Logic to add a post
    try {
      const { content, image, likes, comments } = req.body;

      const userId = req.params.userId;
      const post = new Post({
        author: userId,
        content: content,
        image: image,
        likes: likes,
        comments: comments,
      });
      await post.save();
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
// GET: List all posts
// router.get("/", async (req, res) => {
//   try {
//     const posts = await postBLL.getAllPosts();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// GET: List posts of users that the current user follows
router.get("/", authenticateJWT, async (req, res) => {
  try {
    // Get the current user's 'following' array
    const currentUser = await User.findById(req.user._id);
    const followingUsers = currentUser.following;
    followingUsers.push(req.user._id);
    console.log(currentUser);
    // Fetch posts authored by users in the 'following' array
    const posts = await Post.find({ author: { $in: followingUsers } }).populate(
      "author",
      "fullname"
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Retrieve a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await postBLL.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// PUT: Update a post
router.put("/:id", authenticateJWT, checkUserOwnership, async (req, res) => {
  try {
    const updatedPost = await postBLL.updatePost(req.params.id, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a post
router.delete("/:id", authenticateJWT, checkUserOwnership, async (req, res) => {
  try {
    await postBLL.deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Add a like
router.put(
  "/:id/like",
  authenticateJWT,
  checkUserOwnership,
  async (req, res) => {
    try {
      const userId = req.user._id; // Get user ID from request, adjust depending on your auth system
      const updatedPost = await postBLL.addLike(req.params.id, userId);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// DELETE: Remove a like
router.delete(
  "/:id/like",
  authenticateJWT,
  checkUserOwnership,
  async (req, res) => {
    try {
      const userId = req.user._id; // Get user ID from request, adjust depending on your auth system
      const updatedPost = await postBLL.removeLike(req.params.id, userId);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// POST: Add a comment
router.post(
  "/:id/comment",
  authenticateJWT,
  checkUserOwnership,
  async (req, res) => {
    try {
      const comment = req.body; // Assumes the request body contains the full comment object or ID
      const updatedPost = await postBLL.addComment(req.params.id, comment);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// DELETE: Remove a comment
router.delete(
  "/:id/comment/:commentId",
  authenticateJWT,
  checkUserOwnership,
  async (req, res) => {
    try {
      const { id, commentId } = req.params;
      const updatedPost = await postBLL.removeComment(id, commentId);
      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);
module.exports = router;

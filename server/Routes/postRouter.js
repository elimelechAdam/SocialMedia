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

// GET: List posts of users that the current user follows - V1
// router.get("/", authenticateJWT, async (req, res) => {
//   try {
//     // Get the current user's 'following' array
//     const currentUser = await User.findById(req.user._id);
//     const followingUsers = currentUser.following;
//     followingUsers.push(req.user._id);
//     console.log(currentUser);
//     // Fetch posts authored by users in the 'following' array
//     const posts = await Post.find({ author: { $in: followingUsers } }).populate(
//       "author",
//       "fullname"
//     );
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// GET: List posts of users that the current user follows and Load more
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Getting page number from query params
    const limit = parseInt(req.query.limit) || 4; // Getting limit (number of posts per page) from query params
    const skip = (page - 1) * limit; // Calculating number of posts to skip

    // Get the current user's 'following' array
    const currentUser = await User.findById(req.user._id);
    const followingUsers = currentUser.following;
    followingUsers.push(req.user._id);

    // Fetch posts authored by users in the 'following' array
    const posts = await Post.find({ author: { $in: followingUsers } })
      .sort("-createdAt") // Sort by newest first
      .skip(skip)
      .limit(limit)
      .populate("author", "fullname");

    const total = await Post.countDocuments({
      author: { $in: followingUsers },
    }); // Getting total number of posts

    res.json({
      data: posts,
      total: total,
      page: page,
      limit: limit,
    });
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
router.put("/:id/likes", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from request, adjust depending on your auth system
    const updatedPost = await postBLL.addLike(req.params.id, userId);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET : View all likes
router.get("/:id/likes", authenticateJWT, async (req, res) => {
  try {
    const users = await postBLL.viewLike(req.params.id);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: List of comments for a post
router.get("/:postId/comments", authenticateJWT, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    res.status(200).send(post.comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST: Add a comment to a post
router.post("/:postId/comment", authenticateJWT, async (req, res) => {
  try {
    // Assuming req.user.id contains the ID of the user from the JWT after successful authentication
    const userId = req.user._id;
    const { content } = req.body; // Assuming the comment content is sent in the request body
    const postId = req.params.postId;
    console.log("content ", content);
    console.log("postId ", postId);
    console.log("userId ", userId);

    // Use the BLL function to add the comment
    const comment = await postBLL.addComment(postId, userId, content);
    console.log("comment ", comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

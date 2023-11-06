const Post = require("../models/PostModel");
const Comment = require("../models/CommentModel");
const mongoose = require("mongoose");

async function getAllPosts() {
  return await Post.find().populate("author", "fullname");
}

async function getPostById(id) {
  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}

async function updatePost(id, updateData) {
  const post = await getPostById(id); // This will throw an error if the post is not found
  // Update each field with new data
  Object.keys(updateData).forEach((key) => {
    post[key] = updateData[key];
  });
  await post.save();
  return post;
}

async function deletePost(id) {
  const post = await getPostById(id); // This will throw an error if the post is not found
  await post.remove();
  return post;
}

async function addLike(postId, userId) {
  const post = await getPostById(postId); // This will throw an error if the post is not found

  if (post.likes.includes(userId)) {
    // If the user has already liked the post, remove their like
    const index = post.likes.indexOf(userId);
    if (index > -1) {
      post.likes.splice(index, 1);
    }
  } else {
    // Otherwise, add their like
    post.likes.push(userId);
  }

  await post.save();
  return post;
}

async function removeLike(postId, userId) {
  const post = await getPostById(postId); // This will throw an error if the post is not found
  const index = post.likes.indexOf(userId);
  if (index > -1) {
    post.likes.splice(index, 1);
  } else {
    throw new Error("Like not found");
  }
  await post.save();
  return post;
}
//View all likes
async function viewLike(postId) {
  try {
    // Fetch the post by its ID and populate the likes field
    const post = await Post.findById(postId).populate("likes");

    if (!post) {
      throw new Error("Post not found");
    }

    // The populated likes field now contains full user objects instead of just IDs
    return post.likes;
  } catch (error) {
    throw error; // Propagate the error to be handled by the calling function or route
  }
}

async function addComment(postId, authorId, commentContent) {
  if (
    !mongoose.Types.ObjectId.isValid(postId) ||
    !mongoose.Types.ObjectId.isValid(authorId)
  ) {
    throw new Error("Invalid postId or authorId");
  }
  const comment = new Comment({
    post: postId,
    author: authorId,
    content: commentContent,
  });
  await comment.save();

  const post = await getPostById(postId);
  post.comments.push(comment._id);
  await post.save();
  return comment; // Return the newly created comment
}

async function removeComment(postId, commentId) {
  const post = await getPostById(postId); // This will throw an error if the post is not found
  const index = post.comments.findIndex((c) => c._id.toString() === commentId);
  if (index > -1) {
    post.comments.splice(index, 1);
  } else {
    throw new Error("Comment not found");
  }
  await post.save();
  return post;
}

module.exports = {
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  addLike,
  removeLike,
  addComment,
  viewLike,
  removeComment,
};

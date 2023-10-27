const Post = require("../models/PostModel");

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
  // Ensure the user hasn't already liked the post
  if (post.likes.includes(userId)) {
    throw new Error("User already liked the post");
  }
  post.likes.push(userId);
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

async function addComment(postId, comment) {
  const post = await getPostById(postId); // This will throw an error if the post is not found
  post.comments.push(comment);
  await post.save();
  return post;
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
  removeComment,
};

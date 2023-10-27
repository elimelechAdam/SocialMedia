1. User Routes

# Registration: POST /users/signup

    - authRouter

# Login: POST /users/login

    - authRouter

# View Profile: GET /users/:userId

# Update Profile: PUT /users/:userId

    - change profile picture
    - change password
    - change fullname
    - change bio
    - change email
    - delete follower
    - add follower

# Delete User: DELETE /users/:userId

2. Post Routes

# Create Post: POST /posts

# View Post: GET /posts/:postId

# Update Post: PUT /posts/:postId

# Delete Post: DELETE /posts/:postId

# View All Posts: GET /posts

# Like/Dislike Post: POST /posts/:postId/like or /dislike

3. Comment Routes

# Add Comment: POST /posts/:postId/comments

# View Comments: GET /posts/:postId/comments

# Edit Comment: PUT /posts/:postId/comments/:commentId

# Delete Comment: DELETE /posts/:postId/comments/:commentId

4. Message Routes

# Send Message: POST /messages

# View Messages: GET /messages

# View Single Message: GET /messages/:messageId

# Delete Message: DELETE /messages/:messageId

5. Notification Routes

# View Notifications: GET /notifications

# Update Notification Status: PUT /notifications/:notificationId

# Delete Notification: DELETE /notifications/:notificationId

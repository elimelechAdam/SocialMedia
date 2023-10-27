const express = require("express");
const cors = require("cors");
const { authenticateJWT, checkUserOwnership } = require("./middleware/token");
const authRoute = require("./Routes/authRouter");
const userRoute = require("./Routes/userRouter");
const postRouter = require("./Routes/postRouter");

require("dotenv").config();
require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
console.log(authenticateJWT);

app.use("/auth", authRoute);
app.use("/users", authenticateJWT, userRoute);
app.use("/posts", postRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening to PORT: ", process.env.PORT);
});



import express from 'express';
import mongoose from 'mongoose';
import { register,login,logout} from "./controllers/auth.controllers.js";
import cors from 'cors';
import { getProfile } from './controllers/profile.controllers.js';
import { createPost, updatePost } from './controllers/post.controllers.js';
import { verifyToken } from './middleware/verifyToken.js';
import { getPosts,getPost } from './controllers/post.controllers.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());

app.use(cors({ 
    origin: "http://localhost:5174", 
    credentials: true // Ensure credentials are allowed
  }));
  
app.use(cookieParser());
app.use(express.json());




mongoose.connect("mongodb://localhost:27017/BlogDB").then(
    () => {
        console.log("Connected to database you are good to go hello");

    }
);


app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/logout", logout);
app.get("/api/profile", verifyToken, getProfile);
app.post("/api/posts/create", verifyToken, createPost);
app.get("/api/posts",verifyToken,getPosts);
app.get("/api/post/:id",verifyToken,getPost);
app.put("/api/posts/create/:id",verifyToken,updatePost);
app.listen(4005, () => {
    console.log('Server is running on port 4005');
});

export default app;

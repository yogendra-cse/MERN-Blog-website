import React from "react";
import Post from "../post";
import { useState, useEffect } from "react";
import apiRequest from "../../../api/lib/apiRequest";
const indexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest.get("/api/posts");
        console.log("Posts fetched successfully", res.data);
        setPosts(res.data);
      } catch (err) {
        console.log("Error while fetching all posts", err);
      }
    };
    fetchPosts();
  }, []);
  return <>
    {posts.length > 0 && posts.map((post) => 
    <Post {...post} />)
  }</>;
};

export default indexPage;

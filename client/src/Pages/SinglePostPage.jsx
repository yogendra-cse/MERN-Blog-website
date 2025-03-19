import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import apiRequest from "../../../api/lib/apiRequest";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 
import "./sp.css";
const SinglePostPage = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const { userInfo } = useContext(UserContext);


 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiRequest.get("/api/post/" + id);
        console.log("Post fetched successfully", res.data);
        setPosts(res.data);
        console.log(posts);
      } catch (err) {
        console.log("Error while fetching all posts", err);
      }
    };
    fetchPosts();
  }, []);
  console.log("From context: ", userInfo);
  console.log("From posts: ", posts);
  const isAuthor = userInfo && userInfo.username === posts.author?.username;

  return (
    <>
      <div className="singlePost">
        <div className="post-title">
          <h1>{posts.title}</h1>
        </div>
        <div className="post-date">
          <h2>
            {
              <time dateTime={posts.createdAt}>
                {formatDate(posts.createdAt)}
              </time>
            }
          </h2>
        </div>
        <div className="post-author">
          <p className="post-para">
            Created by{" "}
            <span className="post-para2">{posts.author?.username}</span>
          </p>
        </div>

        <div className="Edit-post">
          {isAuthor && (
            <Link to={"/edit/" + posts._id}>
              <button className="edit-btn">
              {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> */}
              <FontAwesomeIcon id = "icon" icon={faPenToSquare} />
                Edit this post</button>
            </Link>
          )}
        </div>

        <div className="post-image">
          <img src={posts.images} alt="post" />
        </div>
        
        <div className="post-content">
          <p>{posts.content}</p>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;

/*
author
: 
"67d3ecc57075f2e8b0568d81"
content
: 
"1. The Rise of AI in Web Development\nArtificial Intelligence (AI) is no longer just a futuristic concept—it is actively transforming web development. AI-powered tools such as GitHub Copilot, ChatGPT, and AI-driven design systems are streamlining coding and UI/UX design processes. Developers can now automate repetitive tasks, generate code suggestions, and even build entire applications with AI assistance.\n2. Web3 and Decentralized Applications (dApps)\nWith the growing adoption of blockchain technology, Web3 is set to redefine web development. dApps (decentralized applications) eliminate the need for centralized servers, making websites more secure, transparent, and user-controlled. Technologies such as Ethereum, Solana, and smart contracts will play a crucial role in this transition.\n3. The Growth of No-Code and Low-Code Platforms\nNo-code and low-code platforms, such as Webflow, Bubble, and Wix, are democratizing web development by allowing non-programmers to create websites and applications with minimal coding. These platforms use drag-and-drop interfaces, AI-assisted automation, and pre-built modules to simplify the development process.\n4. Progressive Web Apps (PWAs) Becoming the Standard\nProgressive Web Apps (PWAs) combine the best of web and mobile applications, offering fast load times, offline functionality, and push notifications. Companies like Twitter, Starbucks, and Pinterest have already adopted PWAs, improving user engagement and performance.\n5. The Popularity of Headless CMS\nTraditional Content Management Systems (CMS) like WordPress are being challenged by Headless CMS solutions such as Strapi, Contentful, and Sanity. A headless CMS allows developers to separate the backend from the frontend, making content delivery more flexible across different platforms (web, mobile, IoT devices)."
createdAt
: 
"2025-03-14T17:20:16.497Z"
images
: 
"https://res.cloudinary.com/drfp9vied/image/upload/v1741972814/blogposts/ndbaouadjxtyps6icoen.jpg"
summary
: 
"Web development is evolving at a rapid pace, with new technologies shaping the way websites and applications are built. In 2025, developers can expect major advancements in AI-powered development, Web3, and no-code/low-code platforms."
title
: 
" The Future of Web Development: Trends to Watch in 2025"
__v
: 
0
_id
: 
"67d46550ebb4f7d02124ae85"
[[Prototype]]
: 
Objectauthor
: 
"67d3ecc57075f2e8b0568d81"
content
: 
"1. The Rise of AI in Web Development\nArtificial Intelligence (AI) is no longer just a futuristic concept—it is actively transforming web development. AI-powered tools such as GitHub Copilot, ChatGPT, and AI-driven design systems are streamlining coding and UI/UX design processes. Developers can now automate repetitive tasks, generate code suggestions, and even build entire applications with AI assistance.\n2. Web3 and Decentralized Applications (dApps)\nWith the growing adoption of blockchain technology, Web3 is set to redefine web development. dApps (decentralized applications) eliminate the need for centralized servers, making websites more secure, transparent, and user-controlled. Technologies such as Ethereum, Solana, and smart contracts will play a crucial role in this transition.\n3. The Growth of No-Code and Low-Code Platforms\nNo-code and low-code platforms, such as Webflow, Bubble, and Wix, are democratizing web development by allowing non-programmers to create websites and applications with minimal coding. These platforms use drag-and-drop interfaces, AI-assisted automation, and pre-built modules to simplify the development process.\n4. Progressive Web Apps (PWAs) Becoming the Standard\nProgressive Web Apps (PWAs) combine the best of web and mobile applications, offering fast load times, offline functionality, and push notifications. Companies like Twitter, Starbucks, and Pinterest have already adopted PWAs, improving user engagement and performance.\n5. The Popularity of Headless CMS\nTraditional Content Management Systems (CMS) like WordPress are being challenged by Headless CMS solutions such as Strapi, Contentful, and Sanity. A headless CMS allows developers to separate the backend from the frontend, making content delivery more flexible across different platforms (web, mobile, IoT devices)."
createdAt
: 
"2025-03-14T17:20:16.497Z"
images
: 
"https://res.cloudinary.com/drfp9vied/image/upload/v1741972814/blogposts/ndbaouadjxtyps6icoen.jpg"
summary
: 
"Web development is evolving at a rapid pace, with new technologies shaping the way websites and applications are built. In 2025, developers can expect major advancements in AI-powered development, Web3, and no-code/low-code platforms."
title
: 
" The Future of Web Development: Trends to Watch in 2025"
__v
: 
0
_id
: 
"67d46550ebb4f7d02124ae85"
[[Prototype]]
: 
Objectauthor
: 
"67d3ecc57075f2e8b0568d81"
content
: 
"1. The Rise of AI in Web Development\nArtificial Intelligence (AI) is no longer just a futuristic concept—it is actively transforming web development. AI-powered tools such as GitHub Copilot, ChatGPT, and AI-driven design systems are streamlining coding and UI/UX design processes. Developers can now automate repetitive tasks, generate code suggestions, and even build entire applications with AI assistance.\n2. Web3 and Decentralized Applications (dApps)\nWith the growing adoption of blockchain technology, Web3 is set to redefine web development. dApps (decentralized applications) eliminate the need for centralized servers, making websites more secure, transparent, and user-controlled. Technologies such as Ethereum, Solana, and smart contracts will play a crucial role in this transition.\n3. The Growth of No-Code and Low-Code Platforms\nNo-code and low-code platforms, such as Webflow, Bubble, and Wix, are democratizing web development by allowing non-programmers to create websites and applications with minimal coding. These platforms use drag-and-drop interfaces, AI-assisted automation, and pre-built modules to simplify the development process.\n4. Progressive Web Apps (PWAs) Becoming the Standard\nProgressive Web Apps (PWAs) combine the best of web and mobile applications, offering fast load times, offline functionality, and push notifications. Companies like Twitter, Starbucks, and Pinterest have already adopted PWAs, improving user engagement and performance.\n5. The Popularity of Headless CMS\nTraditional Content Management Systems (CMS) like WordPress are being challenged by Headless CMS solutions such as Strapi, Contentful, and Sanity. A headless CMS allows developers to separate the backend from the frontend, making content delivery more flexible across different platforms (web, mobile, IoT devices)."
createdAt
: 
"2025-03-14T17:20:16.497Z"
images
: 
"https://res.cloudinary.com/drfp9vied/image/upload/v1741972814/blogposts/ndbaouadjxtyps6icoen.jpg"
summary
: 
"Web development is evolving at a rapid pace, with new technologies shaping the way websites and applications are built. In 2025, developers can expect major advancements in AI-powered development, Web3, and no-code/low-code platforms."
title
: 
" The Future of Web Development: Trends to Watch in 2025"
__v
: 
0
_id
: 
"67d46550ebb4f7d02124ae85"
[[Prototype]]
: 
Object

 */

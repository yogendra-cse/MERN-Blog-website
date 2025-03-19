// import React from "react";
// import { Link } from "react-router-dom";

// function post({ _id, title, summary, content, images, author, createdAt }) {
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two digits
//     const day = String(date.getDate()).padStart(2, "0");
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");

//     return `${year}-${month}-${day} ${hours}:${minutes}`;
//   };
//   return (
//     <div className="post">
//       <Link to={`/post/${_id}`} className="post-link">
//         <img src={images} alt="" className="ps-img" />
//       </Link>

//       <div className="texts">
//         <Link to={`/post/${_id}`}>
//           <h2 id="title">{title}</h2>
//         </Link>

//         <p className="info">
//           <a href="" className="author">
//             {author.username}
//           </a>
//           <time dateTime={createdAt}>{formatDate(createdAt)}</time>
//         </p>
//         <p className="summary">{summary}</p>
//       </div>
//     </div>
//   );
// }
// export default post;
import React from "react";
import { Link } from "react-router-dom";

function Post({_id, title, summary, content, images, author, createdAt}) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="post">
      <Link to={`/post/${_id}`} className="image-link">
        <img src={images} alt="" className="post-image" />
      </Link>
      
      <div className="texts">
        <h2 id="title">
          <Link to={`/post/${_id}`} className="title-link">
            {title}
          </Link>
        </h2>
        <p className="info">
          <a href="#" className="author">{author.username}</a>
          <time dateTime={createdAt}>{formatDate(createdAt)}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
import React, { useState, useRef } from 'react';
import JoditEditor from "jodit-react";
import UploadWidget from "../components/uploadWidget";
import './np.css';
import DOMPurify from 'dompurify';
import apiRequest from '../../../api/lib/apiRequest';
import { useParams } from "react-router";
import { useNavigate } from 'react-router';

const EditPostPage = () => {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]); // Store image URLs
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const handleImageUpload = (uploadedImages) => {
        console.log("Uploaded Images:", uploadedImages);
        setImages(uploadedImages);
        setIsUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isUploading) {
            alert("Please wait for image upload to complete.");
            return;
        }
        setIsSubmitting(true);

        // Sanitize content (remove any malicious HTML)
        const sanitizedContent = DOMPurify.sanitize(content);

        // Remove all HTML tags from the content
        const plainTextContent = sanitizedContent.replace(/<[^>]+>/g, '');

        console.log("Content without HTML:", plainTextContent);

        // setTimeout(() => {
        //     console.log({ title, summary, content: plainTextContent, images });
        //     setIsSubmitting(false);
        // }, 1500);
        try{
        const res = await apiRequest.put("/api/posts/create/"+id, {
            title,
            summary,
            content: plainTextContent,
            images: images[0],
        });
        console.log("Post updated successfully", res.data);
        navigate("/");
        setTimeout(() => {
            setIsSubmitting(false);
        },`1500`);
        
        }catch(err){
            console.log("Error occured while creating a post",err);
        }
    };

    return (
        <div className="new-post-container">
            <h1>Update Post</h1>
            <div className="form-wrapper">
                <div className="new-post-form">
                    <input 
                        className="input-field" 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title" 
                        required
                    />
                    
                    <input 
                        className="input-field" 
                        type="text" 
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Brief summary (optional)" 
                    />
                    
                    <div className="editor-container">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent || "")}
                        />
                    </div>

                    <div className="upload-section">
                        <h3>Add New Image</h3>
                        <div className="upload-widget-container">
                            <UploadWidget
                                uwConfig={{
                                    cloudName: "drfp9vied",
                                    uploadPreset: "mernblog-preset",
                                    multiple: true,
                                    folder: "blogposts",
                                }}
                                setState={handleImageUpload}
                            />
                        </div>

                        {/* Show uploaded images */}
                        <div className="imageGrid">
                            {images.length > 0 ? (
                                images.map((image, index) => (
                                    <img key={index} src={image} alt={`Uploaded ${index}`} className="image-preview" />
                                ))
                            ) : (
                                <p>No image uploaded yet.</p>
                            )}
                        </div>
                    </div>

                    <button 
                        className="submit-button" 
                        onClick={handleSubmit}
                        disabled={isSubmitting || isUploading}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPostPage;

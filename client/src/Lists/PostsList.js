//PostList.js
import React, { useState } from 'react';
import NewPost from '../items/NewPost';
import '../css/postList.css';
import '../css/Home.css';


function PostList({ posts, onDelete, onEdit }) {
    const [selectedPostId, setSelectedPostId] = useState(null);
    if (posts.length === 0) {
    return <p>You have no posts yet.</p>;
  }
    return (
        <div>
            {posts.map(post => (
                <div
                className={`post_container ${post.id === selectedPostId ? 'selected' : ''}`}
                key={post.id}
                >
                    <div>
                        <strong>{post.id}:</strong> {post.title}
                        <button className='button_select' onClick={() => setSelectedPostId(post.id)}>Select</button>
                    </div>
                    {selectedPostId === post.id && (
                        <NewPost post={post} onDelete={onDelete} onEdit={onEdit} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default PostList;
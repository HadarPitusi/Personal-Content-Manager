import React, { useState } from 'react';
import Comments from './Comments';
import { getCurrentUser } from '../utils/auth';
import '../css/post.css';

function NewPost({ post, onDelete, onEdit }) {

    const currentUser = getCurrentUser();

    const isOwner = Number(post.userId) === Number(currentUser.user.id);
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(post.title);
    const [newBody, setNewBody] = useState(post.body);
    const [showComments, setShowComments] = useState(false);

    const handleEdit = () => {
        if (editMode) {
            onEdit(post.id, newTitle, newBody);
        }
        setEditMode(!editMode);
    };

    return (
        <div>
            {editMode ? (
                <>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} />
                </>
            ) : (
                <p>{post.body}</p>
            )}

            <button className='button_comments' onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>

            {isOwner && (
                <>
                    <button className='button_comments' onClick={() => onDelete(post.id)}>Delete</button>
                    <button className='button_comments' onClick={handleEdit}>{editMode ? 'Save' : 'Edit'}</button>
                </>
            )}

            {showComments && <Comments postId={post.id} />}
        </div>
    );
}

export default NewPost;

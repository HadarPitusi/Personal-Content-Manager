// components/Comments.jsx
import React, { useEffect, useRef, useState } from 'react';
import { getCurrentUser } from '../utils/auth';
import '../css/comments.css';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editedBody, setEditedBody] = useState('');
    const currentUser = getCurrentUser();
    const userEmail = currentUser?.user?.email || '';

    useEffect(() => {
        fetch(`http://localhost:8080/comments?postId=${postId}`)
            .then(res => res.json())
            .then(data => setComments(data));
    }, [postId]);

    const handleAddComment = () => {
        const comment = {
            postId,
            name: currentUser.user.name,
            email: userEmail,
            body: newComment,
        };

        fetch('http://localhost:8080/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment),
        })
            .then(res => res.json())
            .then(saved => {
                setComments(prev => [...prev, saved]);
                setNewComment('');
            });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/comments/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setComments(prev => prev.filter(c => c.id !== id));
        });
    };

    const handleEdit = (id) => {
        const updated = comments.map(c =>
            c.id === id ? { ...c, body: editedBody } : c
        );

        fetch(`http://localhost:8080/comments/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated.find(c => c.id === id)),
        }).then(() => {
            setComments(updated);
            setEditingId(null);
            setEditedBody('');
        });
    };

    return (
        <div className="comments-container" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <h4>Comments</h4>
            {comments.map(comment => (
                <div key={comment.id} className="comment">
                    <strong>{comment.name}:</strong>
                    {editingId === comment.id ? (
                        <>
                            <textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                            <button onClick={() => handleEdit(comment.id)}>Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                        </>
                    ) : (
                        <p>{comment.body}</p>
                    )}

                    {comment.email === userEmail && editingId !== comment.id && (
                        <>
                            <button onClick={() => {
                                setEditingId(comment.id);
                                setEditedBody(comment.body);
                            }}>Edit</button>
                            <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}

            <div style={{ marginTop: '10px' }}>
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
}

export default Comments;

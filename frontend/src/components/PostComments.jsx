import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [emoji, setEmoji] = useState('');

  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/comments/${postId}`, {
      content: newComment,
      emoji
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewComment('');
    setEmoji('');
    fetchComments();
  };

  const handleReact = async (commentId, emoji) => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/comments/react/${commentId}`, {
      emoji
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchComments();
  };

  return (
    <div>
      <h3>Comments</h3>
      <textarea value={newComment} onChange={e => setNewComment(e.target.value)} />
      <input
        type="text"
        value={emoji}
        onChange={e => setEmoji(e.target.value)}
        placeholder="Emoji 😊"
      />
      <button onClick={handleSubmit}>Submit</button>

      {comments.map(comment => (
        <div key={comment.id} style={{ borderBottom: '1px solid #ccc', padding: '0.5rem' }}>
          <p><strong>{comment.name}:</strong> {comment.content} {comment.emoji}</p>
          <button onClick={() => handleReact(comment.id, '👍')}>👍</button>
          <button onClick={() => handleReact(comment.id, '😂')}>😂</button>
          <button onClick={() => handleReact(comment.id, '❤️')}>❤️</button>
        </div>
      ))}
    </div>
  );
}

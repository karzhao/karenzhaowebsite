import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

type Comment = {
  timestamp: string;
  message: string;
};

function App() {
  const [title, setTitle] = useState('title')
  const [description, setDescription] = useState('message')
  const [message, setMessage] = useState('')

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.json())
      .then(data => setTitle(data.message))
  })

  useEffect(() => {
    fetch("/api/karen")
      .then(res => res.json())
      .then(data => setDescription(data.message))
  })

   useEffect(() => {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((data: Comment[]) => {
        setComments([...data].reverse());
      });
  }, []);

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    const newComment: Comment = await response.json();

    setComments((currentComments) => [
      newComment,
      ...currentComments,
    ]);

    setMessage("");
  }

  return (
    <>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <div className="comment-box">
        <h1>Leave a Comment</h1>

        <form onSubmit={submitComment}>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Write a comment..."
          />

          <button type="submit">Post</button>
        </form>

        <div className="comments">
          {comments.map((comment) => (
            <div
              className="comment"
              key={comment.timestamp}
            >
              <p>{comment.message}</p>

              <small>
                {new Date(comment.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default App

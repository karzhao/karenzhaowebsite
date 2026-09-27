import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

type Comment = {
  timestamp: string;
  input: string;
};

function App() {
  const [title, setTitle] = useState('title')
  const [message, setMessage] = useState('message')
  const [input, setInput] = useState('')

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/hello")
      .then(res => res.json())
      .then(data => setTitle(data.message))
  })

  useEffect(() => {
    fetch("/api/karen")
      .then(res => res.json())
      .then(data => setMessage(data.message))
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
      <h3>{message}</h3>
      <div className="comment-box">
        <h1>Leave a Comment</h1>

        <form onSubmit={submitComment}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
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
              <p>{comment.input}</p>

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

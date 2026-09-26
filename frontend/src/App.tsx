import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
  const [title, setTitle] = useState('title')
  const [message, setMessage] = useState('message')

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

  return (
    <>
      <h1>{title}</h1>
      <h3>{message}</h3>
    </>

  )
}

export default App

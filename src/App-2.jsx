import React from "react"
import "./index.css"
import { useState } from "react"

function App(){
    const [username, setUsername] = useState("pbossett")
    const comments = [
        {id: 1, text: 'I love this!'},
        {id: 2, text: 'This is so cool!'},
        {id: 3, text: 'I am a fan!'}
    ]

    let loading = false;
    let showComments = true;
    const commentBlock = (
        <div className="comments">
            <h2>Comments {comments.length}</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>{comment.text}</li>
                ))}
            </ul>
        </div>
    );

    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="container">
            <h1>Hello {username.toUpperCase()}</h1>
            <p>Do you want to change your username?</p>
            <form action="">
                <label htmlFor="name"></label>
                <input type="text" id="name" />
                <button onClick={(e) => {
                    e.preventDefault()
                    setUsername(e.target.previousElementSibling.value)
                }}>Change name</button>
            </form>
            {showComments && commentBlock}
            
        </div>
    )
}

export default App
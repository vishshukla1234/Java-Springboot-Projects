import { useState } from "react"

const ChatInput = ({ onSubmit }) => {

    const [question, SetQuestion] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault() // prevents page from reloading
        if(question.trim()) { //checks if question is not empty
            onSubmit(question) //if not empty then updates the question status
            SetQuestion("") // then again sets the question to empty string
        }
    }

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="question">Ask a Question</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        placeholder="Enter your Question"
                        value={question}
                        onChange={(e) => SetQuestion(e.target.value)}/>
                </div>

                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>

        </div>
    )
}

export default ChatInput
import { useState } from 'react'
import './App.css'
import ChatInput from './components/ChatInput'
import ChatResponse from './components/ChatResponse'
import { fetchChatResponse } from './services/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from './logo.png'

function App() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleQuestionSubmit = async (question) => {
    setLoading(true)
    setResponse(null)

    try {
      const apiResponse = await fetchChatResponse(question)
      console.log(apiResponse);
      setResponse(apiResponse)
    } catch (error) {
      alert("Failed to get the response!!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-back">
      <div className="App">
        <header className="bg-primary text-white text-center py-4">
          <h1>
            <div className="logo"><img src={logo} alt='logo'/></div>
            Gemini ChatBot
          </h1>
        </header>
        <ChatInput onSubmit={handleQuestionSubmit} />
        <ChatResponse response={response} />
      </div>
    </div>

  )
}

export default App

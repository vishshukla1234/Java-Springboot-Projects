const ChatResponse = ({ response }) => {
    if (!response) {
        return null
    }

    const { candidates = [] } = response  

    return (
        <div className="container my-4">
            <h3>Response</h3>
            {candidates.map((candidate, index) => (
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">Candidate {index + 1}</h5>
                        <p className="card-text">
                            {candidate?.content?.parts?.[0]?.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatResponse

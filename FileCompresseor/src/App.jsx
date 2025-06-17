import './App.css';
import icon from './icon.png';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar/Navbar';
import React, { useState } from 'react';
import axios from 'axios';
import afterIcon from './afterIcon.png'

function App() {

  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadURL, setDownloadURL] = useState("");


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile)
      setStatus("")
      setDownloadURL("")
    } else {
      setStatus("Please upload a file with the extension .txt...")
    }
  }

  const handleAction = async (action) => {
    if (!file) {
      setStatus("Please upload a file first with the extension .txt...")
      return;
    }
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await axios.post(`http://localhost:8080/api/${action}`, formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      );
      const blob = new Blob([response.data], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      setDownloadURL(url);
      setStatus('Done! Your Is File ready to download...');
    }

    catch (error) {
      setStatus("Error parsing the file...")
      console.error("Upload error:", error.response || error.message || error);
    }
  }

  return (
    <>
      <div className="nav-bar">
        <Navbar />
      </div>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="main-text">
        <img src={icon} alt="icon" className="icon" />
      </div>
      <div className='main-text-h1'>
        <h1>ZIP Archiver</h1>
      </div>

      <div className="filCompress">
        <input type='file' accept='.txt' onChange={handleFileChange}></input>
      </div>

      <div className="filDecompress">
        <button className='btn' onClick={() => handleAction('compressText')}>Compress</button>
        <button className='btn' onClick={() => handleAction('decompressText')}>Decompress</button>
      </div>

      <div className="status-msg">
        <p>{status}</p>
      </div>

      {downloadURL && (
        <div className="download-section">
          <a href={downloadURL} download="result.txt" className="btn-success">Download File</a>
        </div>
      )}

    </>
  );
}

export default App;


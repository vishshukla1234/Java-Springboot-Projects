import React, { useState } from "react";
import axios from "axios";
import './Upload.css'

const upload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("File successfully uploaded");
      setDownloadURL(""); 
    }
  };

  const handleAction = async (action) => {
    if (!file) {
      setStatus("Please upload a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/${action}`,
        formData,
        { responseType: "blob" }
      );

     
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      setDownloadURL(url);

      // Set specific success message
      const successMsg = action === "compressText" 
        ? "File compressed successfully" 
        : "File decompressed successfully";
      setStatus(successMsg);

    } catch (error) {
      console.error("Processing error:", error);
      setStatus("Error processing file");
    }
  };

  return (
    <div className="">
      <div className="absolute top-8 left-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent">
          {/* File Encryptor */}
        </h1>
      </div>

      <div className="file-input-box">
        
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        <label 
          htmlFor="file-input"
          className="w-full border-2 border-dashed border-blue-900/50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-900/10 transition-all group"
        >
          <div className="upload-icon">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
          </div>
          <span className="upload-icon-text">
            {file ? file.name : "Upload File"}
          </span>
        </label>

      
        <div className="btn-class">
          <button 
            onClick={() => handleAction("compressText")}
            className="compress"
          >
            Compress
          </button>
          <button 
            onClick={() => handleAction("decompressText")}
            className="decompress"
          >
            Decompress
          </button>
        </div>

        
        {status && (
          <p className={`message ${status.includes("Error") ? "text-red-400" : "text-green-400"}`}>
            {status}
          </p>
        )}

        
        {downloadURL && (
          <button 
            className="download-btn">
            <a 
            href={downloadURL} 
            download="result.txt"
          >
            Download Result
          </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default upload;
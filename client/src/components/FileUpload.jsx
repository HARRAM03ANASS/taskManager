import React, { useState } from "react";
import axios from "axios";

function FileUpload({ tacheId }) {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false); // To manage loading state
    const [error, setError] = useState(""); // To manage error state

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setError(""); // Reset error message when selecting a new file
    };

    const onUpload = async () => {
        if (!file) {
            alert("Please select a file first");
            return;
        }

        setLoading(true); // Start loading
        const formData = new FormData();
        formData.append("file", file);
        formData.append("tacheId", tacheId); // Send the tacheId to update the existing task

        try {
            const response = await axios.post("http://localhost:5000/api/files/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setFileUrl(response.data.fileUrl);
            console.log("File uploaded successfully", response.data);
            setLoading(false); // Stop loading
        } catch (error) {
            console.error("File upload error:", error);
            setError("File upload failed. Please try again."); // Display error message
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onUpload} disabled={loading}>
                {loading ? "Uploading..." : "Upload File"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {fileUrl && (
                <div>
                    File uploaded at:{" "}
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                        {fileUrl}
                    </a>
                </div>
            )}
        </div>
    );
}

export default FileUpload;

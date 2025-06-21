"use client";

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";


interface FileUploadProps {
    onSuccess: (res: any)=> void;
    onProgress? :(progress: number) => void;
    fileType?: "image" | "video"
}
const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {
    // const [progress, setProgress] = useState(0);
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const abortController = new AbortController();
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // optional validation function
    const validateFile = (file: File)=> {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a valid video File")
            }
        }
        if(file.size > 100 * 1024 * 1024){
            setError("File size exceeds 100MB limit");
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;

        // Validate the file type and size
        if (!validateFile(file)) {
            return;
        }

        setUploading(true);
        setError(null);
        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const auth = await authRes.json();
            console.log(auth)
        } catch (error) {
            if (error instanceof ImageKitInvalidRequestError) {
                setError("Invalid request. Please check the file and try again.");
            } else if (error instanceof ImageKitUploadNetworkError) {
                setError("Network error occurred while uploading the file.");
            } else if (error instanceof ImageKitServerError) {
                setError("Server error occurred while processing the upload.");
            } else if (error instanceof ImageKitAbortError) {
                setError("Upload was aborted.");
            } else {
                setError("An unexpected error occurred.");
            }
            
        }
    }

    return (
        <>
            <input 
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange} />
                {uploading && (
                    <div className="mt-4">
                        <p>Uploading...</p>
                    </div>
                )}
        </>
    );
};

export default FileUpload;
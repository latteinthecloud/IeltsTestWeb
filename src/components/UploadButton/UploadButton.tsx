import React, { useRef } from "react";
import './UploadButton.css';

interface UploadButtonProps {
    title?: string;
    colors?: string[];
    onClick: () => void;
    icon?: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadButton({ title, colors = ["#1FCD33", "#0F671A"], onClick, icon, onFileChange }: UploadButtonProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the file input click
        }
        onClick(); // Call onClick prop (if you need additional logic on button click)
    };

    return (
        <div className="upload-button-container">
            <button className="upload-button" onClick={handleButtonClick}>
                {icon && <span className="upload-icon">{icon}</span>}
                {title || "Upload"}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                accept="image/"
                className="file-input"
                onChange={onFileChange}
            />
        </div>
    );
}

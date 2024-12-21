import React from "react";
import "./ReadingPassage.css"

interface ReadingPassageProps{
    sectionOrder: number;
    img: string;
    title: string;
    content: string;
}

export default function ReadingPassage({sectionOrder, img, title, content}: ReadingPassageProps){
    const paragraphs = content.split("<br>");
    console.log(paragraphs);

    return(
        <div className="reading-section-container">
            <h1>READING PASSAGE {sectionOrder}</h1>
            <h3>You should spend about 20 minutes on the reading section below: </h3>
            <img 
                src={img}
                alt="section-image">
            </img>
            <h2>{title}</h2>
            <div>
                {paragraphs.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
        </div>
    );
}
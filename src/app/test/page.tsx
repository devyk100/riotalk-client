"use client"

import { useState } from "react";

export default function MarkdownEditor() {
  const [text, setText] = useState<string>("");

  // Function to apply markdown formatting
  const applyMarkdown = (format: "bold" | "italic") => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let formattedText = text;
    if (format === "bold") {
      formattedText = text.slice(0, start) + `**${selectedText}**` + text.slice(end);
    } else if (format === "italic") {
      formattedText = text.slice(0, start) + `*${selectedText}*` + text.slice(end);
    }
    setText(formattedText);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Simple Markdown Editor</h2>
      <div>
        <button onClick={() => applyMarkdown("bold")}><b>B</b></button>
        <button onClick={() => applyMarkdown("italic")}><i>I</i></button>
      </div>
      <div
        id="editor"
        contentEditable
        suppressContentEditableWarning
        style={{ 
          width: "100%", 
          minHeight: "150px", 
          border: "1px solid #ddd", 
          padding: "10px",
          marginTop: "10px" 
        }}
        onInput={(e) => setText(e.currentTarget.innerText)}
        dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>").replace(/\*(.*?)\*/g, "<i>$1</i>") }}
      />
    </div>
  );
}

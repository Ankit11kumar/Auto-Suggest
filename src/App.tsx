import React, { useState, ChangeEvent } from "react";
import data from "./data.json";
import "./App.css";

interface Mention {
  id: number;
  name: string;
}

function MentionComponent() {
  // State for the input text
  const [input, setInput] = useState<string>("");
  // State to control visibility of the mentions list
  const [showMentions, setShowMentions] = useState(false);

  // Function to handle changes in the input field
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInput(text);

    // Check if '@' is typed and show mentions
    if (text.includes("@")) {
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  // Function to extract the text following the '@' symbol
  const getMentionText = (): string => {
    const atIndex = input.lastIndexOf("@");
    return input.slice(atIndex + 1).toLowerCase();
  };

  // Function to handle clicks on mention items
  const handleMentionClick = (mention: string) => {
    const mentionText = `@${mention} `;
    const currentInput = input;
    const atIndex = currentInput.lastIndexOf("@");
    const newInput =
      currentInput.slice(0, atIndex) +
      mentionText +
      currentInput.slice(atIndex + mentionText.length);
    setInput(newInput);
    setShowMentions(false);
  };

  return (
    <div className="container">
      {/* Input field for entering text */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type @ to mention"
      />
      {/* Mention list, visible when '@' is typed */}
      {showMentions && (
        <ul className="mention-list">
          {data
            .filter((mention: Mention) =>
              mention.name.toLowerCase().includes(getMentionText())
            )
            .map((mention: Mention) => (
              <li
                key={mention.id}
                onClick={() => handleMentionClick(mention.name)}
              >
                {mention.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default MentionComponent;

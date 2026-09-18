import React, { useState, useEffect } from "react";
import DialogRenderer from "./dialogueRenderer";
import { Scene } from "../lib/data";

interface DialogManagerProps {
  scenes: Scene[];
  initialSceneIndex?: number;
}

const DIALOG_MANAGER: React.FC<DialogManagerProps> = ({
  scenes,
  initialSceneIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSceneIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scenes.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const currentScene = scenes[currentIndex];

  return (
    <div className="dialog-manager">
      <button onClick={handlePrevious} disabled={currentIndex <= 0}>
        Previous
      </button>
      <span className="scene-indicator">Scene {currentIndex + 1} of {scenes.length}</span>
      <button onClick={handleNext}>
        Next
      </button>
      <DialogRenderer scene={currentScene} />
    </div>
  );
};

export default DIALOG_MANAGER;
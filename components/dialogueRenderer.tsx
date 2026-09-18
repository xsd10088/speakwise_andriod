import React from "react";
import { Scene, SceneKey } from "../lib/data";

const DIALOGUE_RENDERER: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { key, title, subtitle, lines } = scene;

  return (
    <div className="dialog-container">
      <div className="scene-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="dialogue-content">
        {lines.map((line) => (
          <div key={line.id} className="dialogue-line">
            <span className="speaker">{line.speaker}</span>
            <p>{line.text}</p>
            <p className="translation">{line.translation}</p>
            <small className="note">{line.note}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DIALOGUE_RENDERER;
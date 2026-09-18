import React, { useState, useEffect } from "react";
import DialogRenderer from "./dialogueRenderer";
import { Scene, ListeningLine } from "../lib/data";

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

const DIALOG_CONTROL: React.FC = () => {
  const [playingAll, setPlayingAll] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1.0);
  const SPEEDS = [0.5, 1.0, 1.5, 2.0];

  const playAll = () => {
    setPlayingAll(true);
    setActiveId(null);
    Speech.stop?.();
  };

  const stopAll = () => {
    setPlayingAll(false);
    setActiveId(null);
    Speech.stop?.();
  };

  return (
    <View style={styles.control}>
      <View style={styles.controlHead}>
        <Text style={styles.controlTitle}>▶</Text>
      </View>
      <Text style={styles.speed}>{speed}×</Text>
    </View>

    <Pressable onPress={playAll} style={[styles.playAll, playingAll && styles.stop]} 
      accessibilityLabel={playingAll ? "停止播放全部" : "开始播放"}>
      播放全部
    </Pressable>

    <Pressable onPress={stopAll} style={[styles.stop, playingAll && styles.playAll]} 
      accessibilityLabel={playingAll ? "继续播放" : "停止播放"}>
      停止
    </Pressable>
  );
};

export { DIALOG_MANAGER, DIALOG_CONTROL };
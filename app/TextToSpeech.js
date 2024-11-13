import { CirclePause, PlayCircle, StopCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const TextToSpeech = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    u.onend = () => {
      setIsPlaying(false); // Reset to PlayCircle icon when speech ends
    };

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlayPause = () => {
    const synth = window.speechSynthesis;

    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
    } else if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    } else {
        utterance.voice = synth.getVoices()[2];
      synth.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPlaying(false);  // Reset to PlayCircle icon when stopped
    setIsPaused(false);
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full"
          onClick={handlePlayPause}
          title={isPlaying && !isPaused ? "Pause Audio" : "Play Audio"}
        >
          {isPlaying && !isPaused ? (
            <CirclePause className="h-6 w-6" />
          ) : (
            <PlayCircle className="h-6 w-6" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full"
          onClick={handleStop}
          title="Stop Audio"
        >
          <StopCircle className="h-6 w-6" />
        </Button>
    </div>
  );
};

export default TextToSpeech;

"use client";

import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Pause, Play, Volume2, VolumeX} from "lucide-react";

import {Button} from "@/components/ui/button";
import {audioPlayerCopy, backgroundTrack} from "@/data/audio";

type FloatingAudioPlayerProps = {
  locale: keyof typeof audioPlayerCopy;
};

const START_VOLUME = 0.28;

export function FloatingAudioPlayer({locale}: FloatingAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const copy = audioPlayerCopy[locale];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = START_VOLUME;
    audio.defaultMuted = true;
    audio.muted = true;

    const startPlayback = () => {
      if (!audio.paused) {
        return;
      }

      void audio.play().catch(() => undefined);
    };

    audio.addEventListener("canplay", startPlayback);
    startPlayback();

    return () => {
      audio.removeEventListener("canplay", startPlayback);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        return;
      }

      return;
    }

    audio.pause();
  };

  const toggleMuted = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const updateProgress = () => {
    const audio = audioRef.current;

    if (!audio?.duration) {
      return;
    }

    setProgress(audio.currentTime / audio.duration);
  };

  return (
    <aside
      aria-label={copy.label}
      className="fixed right-3 bottom-3 z-40 w-[calc(100%-1.5rem)] max-w-sm overflow-hidden border bg-background/95 shadow-xl backdrop-blur-md sm:right-5 sm:bottom-5 sm:w-92"
      data-audio-player
    >
      <div className="flex items-center gap-3 p-2.5 pr-2">
        <div className="relative size-14 shrink-0 overflow-hidden border bg-muted">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="56px"
            src={backgroundTrack.coverSrc}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {backgroundTrack.title}
          </p>
          <p className="truncate font-mono text-xs text-muted-foreground">
            {backgroundTrack.artist}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            aria-label={isMuted ? copy.unmute : copy.mute}
            onClick={toggleMuted}
            size="icon"
            title={isMuted ? copy.unmute : copy.mute}
            type="button"
            variant="ghost"
          >
            {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </Button>
          <Button
            aria-label={isPlaying ? copy.pause : copy.play}
            onClick={() => void togglePlayback()}
            size="icon"
            title={isPlaying ? copy.pause : copy.play}
            type="button"
            variant="secondary"
          >
            {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="h-0.5 bg-muted">
        <div
          className="h-full origin-left bg-foreground transition-transform duration-200"
          style={{transform: `scaleX(${progress})`}}
        />
      </div>

      <audio
        autoPlay
        loop
        muted={isMuted}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={updateProgress}
        preload="auto"
        ref={audioRef}
        src={backgroundTrack.src}
      />
    </aside>
  );
}

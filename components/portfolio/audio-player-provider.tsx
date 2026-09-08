"use client";

import {
  createContext,
  type ReactNode,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {audioPlayerCopy, backgroundTrack} from "@/data/audio";

type AudioPlayerContextValue = {
  audioRef: RefObject<HTMLAudioElement | null>;
  copy: (typeof audioPlayerCopy)[keyof typeof audioPlayerCopy];
  isMuted: boolean;
  toggleMuted: () => Promise<void>;
};

type AudioPlayerProviderProps = {
  children: ReactNode;
  locale: keyof typeof audioPlayerCopy;
};

const START_VOLUME = 0.28;
const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({
  children,
  locale,
}: AudioPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const ensurePlayback = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio || !audio.paused) {
      return;
    }

    try {
      await audio.play();
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = START_VOLUME;
    audio.defaultMuted = true;
    audio.muted = true;

    const startPlayback = async () => {
      await ensurePlayback();

      if (!audio.paused) {
        window.removeEventListener("pointerdown", startPlayback);
        window.removeEventListener("keydown", startPlayback);
      }
    };

    audio.addEventListener("canplay", startPlayback);
    window.addEventListener("pointerdown", startPlayback);
    window.addEventListener("keydown", startPlayback);
    void startPlayback();

    return () => {
      audio.removeEventListener("canplay", startPlayback);
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, [ensurePlayback]);

  const toggleMuted = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    await ensurePlayback();
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  }, [ensurePlayback]);

  const value = useMemo(
    () => ({
      audioRef,
      copy: audioPlayerCopy[locale],
      isMuted,
      toggleMuted,
    }),
    [isMuted, locale, toggleMuted],
  );

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
      <audio
        autoPlay
        loop
        muted={isMuted}
        onPause={() => void ensurePlayback()}
        playsInline
        preload="auto"
        ref={audioRef}
        src={backgroundTrack.src}
      />
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }

  return context;
}

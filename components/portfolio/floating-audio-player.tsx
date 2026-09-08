"use client";

import {useEffect, useRef} from "react";
import Image from "next/image";
import {Volume2, VolumeX} from "lucide-react";

import {useAudioPlayer} from "@/components/portfolio/audio-player-provider";
import {Button} from "@/components/ui/button";
import {backgroundTrack} from "@/data/audio";

export function FloatingAudioPlayer() {
  const progressRef = useRef<HTMLDivElement>(null);
  const {audioRef, copy, isMuted, toggleMuted} = useAudioPlayer();

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const updateProgress = () => {
      if (!audio.duration) {
        return;
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${audio.currentTime / audio.duration})`;
      }
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioRef]);

  return (
    <aside
      aria-label={copy.label}
      className="fixed right-5 bottom-5 z-40 hidden w-80 max-w-sm overflow-hidden border bg-background/95 shadow-xl backdrop-blur-md sm:block"
      data-audio-player
    >
      <div className="flex items-stretch">
        <div className="relative size-14 shrink-0 overflow-hidden border-r bg-muted">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="56px"
            src={backgroundTrack.coverSrc}
          />
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3 px-3 py-2">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {backgroundTrack.title}
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {backgroundTrack.artist}
            </p>
          </div>

          <Button
            aria-label={isMuted ? copy.unmute : copy.mute}
            onClick={() => void toggleMuted()}
            size="icon"
            title={isMuted ? copy.unmute : copy.mute}
            type="button"
            variant="ghost"
          >
            {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <div aria-hidden="true" className="h-0.5 bg-muted">
        <div
          className="h-full origin-left bg-foreground transition-transform duration-200"
          ref={progressRef}
          style={{transform: "scaleX(0)"}}
        />
      </div>
    </aside>
  );
}

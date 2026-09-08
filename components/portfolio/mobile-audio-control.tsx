"use client";

import Image from "next/image";
import {Volume2, VolumeX} from "lucide-react";

import {useAudioPlayer} from "@/components/portfolio/audio-player-provider";
import {Button} from "@/components/ui/button";
import {backgroundTrack} from "@/data/audio";
import {cn} from "@/lib/utils";

const LEVEL_BARS = ["h-2", "h-4", "h-3", "h-5"] as const;

function AudioLevelIndicator() {
  return (
    <span
      aria-hidden="true"
      className="ml-auto flex h-5 shrink-0 items-end gap-0.5"
    >
      {LEVEL_BARS.map((height, index) => (
        <span
          className={cn("w-0.5 bg-muted-foreground motion-safe:animate-pulse", height)}
          key={height}
          style={{animationDelay: `${index * 120}ms`}}
        />
      ))}
    </span>
  );
}

export function MobileAudioControl() {
  const {copy, isMuted, toggleMuted} = useAudioPlayer();
  const isSoundOn = !isMuted;

  return (
    <div className="border-b border-dashed">
      <Button
        aria-label={isSoundOn ? copy.mute : copy.unmute}
        aria-pressed={isSoundOn}
        className="h-auto w-full items-start justify-start gap-3 rounded-none px-5 py-4 text-left"
        onClick={() => void toggleMuted()}
        type="button"
        variant="ghost"
      >
        {isSoundOn ? (
          <Volume2 aria-hidden="true" data-icon="inline-start" />
        ) : (
          <VolumeX aria-hidden="true" data-icon="inline-start" />
        )}

        <span className="flex min-w-0 flex-1 flex-col items-start gap-2">
          <span className="font-mono">{isSoundOn ? copy.soundOn : copy.soundOff}</span>

          {isSoundOn ? (
            <span className="flex min-w-0 max-w-full items-center gap-2 text-xs font-normal text-muted-foreground">
              <span className="relative size-5 shrink-0 overflow-hidden border bg-muted">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="20px"
                  src={backgroundTrack.coverSrc}
                />
              </span>
              <span className="truncate">
                {backgroundTrack.artist} — {backgroundTrack.title}
              </span>
            </span>
          ) : null}
        </span>

        {isSoundOn ? <AudioLevelIndicator /> : null}
      </Button>
    </div>
  );
}

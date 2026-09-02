import {glass002Sound} from "@/lib/glass-002";
import {playSound} from "@/lib/sound-engine";

export function playGlassSound() {
  void playSound(glass002Sound.dataUri).catch(() => {
    // Hover feedback remains optional when audio playback is unavailable.
  });
}

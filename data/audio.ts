export const backgroundTrack = {
  artist: "Low Roar",
  coverSrc: "/audio/bones-cover.png",
  spotifyUrl: "https://open.spotify.com/intl-es/track/6lt8Z886tMHpNqzOFWX8Yn?si=b8291694886b4aad",
  src: "/audio/bones.mp3",
  title: "Bones",
} as const;

export const audioPlayerCopy = {
  en: {
    label: "Background music player",
    mute: "Mute background music",
    openInSpotify: "Listen on Spotify (opens in a new tab)",
    soundOff: "Sound off",
    soundOn: "Sound on",
    unmute: "Unmute background music",
  },
  es: {
    label: "Reproductor de música de fondo",
    mute: "Silenciar música de fondo",
    openInSpotify: "Escuchar en Spotify (se abre en una pestaña nueva)",
    soundOff: "Sonido apagado",
    soundOn: "Sonido activado",
    unmute: "Activar sonido de la música de fondo",
  },
} as const;

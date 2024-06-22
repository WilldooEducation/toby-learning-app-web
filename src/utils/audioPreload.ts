export const AudioPreload = (url: any) => {
    const audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    return audio
  };
  
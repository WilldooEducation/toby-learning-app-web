import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./story.module.scss";
import { createRef, useEffect, useRef, useState } from "react";
import transcriptData from "@/merge_audio_transcript.json";
import { useRouter } from "next/router";

export default function Home() {
  const [timestamp, setTimestamp] = useState(0);
  const [lastHighlightedIndex, setLastHighlightedIndex] = useState(0);
  const [word, setWord] = useState("");
  const girlAudioRef = useRef<any>(null);
  const girlTextRef = useRef<any>(null);
  const boyTextRef = useRef<any>(null);
  const boyAudioRef = useRef<any>(null);
  const playBtn = useRef<any>(null);
  const router = useRouter();

  const onPlaybackEnd = () => {
    playBtn.current.style.opacity = 1;
    boyTextRef.current.innerHTML =  boyTextRef.current.dataset.text
  };

  const onTimeChange = () => {
    let currentTime = girlAudioRef?.current?.currentTime * 1000;
    setTimestamp(currentTime);

    const findIndex = transcriptData.findIndex(
      e => currentTime >= e.start && currentTime <= e.end
    );
    if (findIndex != -1) {
      setWord(transcriptData[findIndex].text || "");
      const girlTextSplit = girlTextRef.current.dataset.text.split(" ");
      const boyTextSplit = boyTextRef.current.dataset.text.split(" ");
      if (findIndex <= 14) {
        girlTextSplit[findIndex] = `<span>${girlTextSplit[findIndex]}</span>`;
        console.log(girlTextSplit.join(" "), findIndex);
        girlTextRef.current.innerHTML = girlTextSplit.join(" ");
        setLastHighlightedIndex(findIndex);
      } else {
        let bufferIndex = 15;
        girlTextRef.current.innerHTML =  girlTextRef.current.dataset.text
        let calculatedIndex = findIndex - bufferIndex;
        boyTextSplit[
          calculatedIndex
        ] = `<span>${boyTextSplit[calculatedIndex]}</span>`;
        console.log(boyTextSplit.join(" "), calculatedIndex);
        boyTextRef.current.innerHTML = boyTextSplit.join(" ");
        setLastHighlightedIndex(calculatedIndex);
      }
    }
  };

  useEffect(() => {
    girlAudioRef.current.play();
    girlAudioRef.current.ontimeupdate = onTimeChange;
    girlAudioRef.current.onended = onPlaybackEnd;
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.timestamp}>
        {timestamp} - {word}
      </div>
      <div className={styles.billboard}>
        <Image
          fill
          priority={true}
          src="/images/billboard.svg"
          style={{ objectFit: "contain" }}
          alt="billboard"
        />
      </div>

      <div className={styles.conversation__block}>
        <div className={styles["conversation__message"]}>
          <audio
            ref={girlAudioRef}
            className="w-100"
            src="/audio/merge_audio.mp3"
          >
            Your browser does not support the audio element.
          </audio>
          <div className={styles.avatar}>
            <Image
              fill
              src="/images/girl.svg"
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="billboard"
            />
          </div>
          <div className={styles.message}>
            <p
              ref={girlTextRef}
              data-text={`Hey Rohan, did you see the playground next to school? It's all dug up now!`}
            >
              {`Hey Rohan, did you see the playground next to school? It's all dug up now!`}
            </p>
          </div>
        </div>
        <div className={styles["conversation__message--reverse"]}>
          <audio
            ref={boyAudioRef}
            id="boyAudioPlay"
            className="w-100"
            src="/audio/boy.mp3"
          >
            Your browser does not support the audio element.
          </audio>
          <div className={styles.avatar}>
            <Image
              fill
              src="/images/boy.svg"
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="billboard"
            />
          </div>
          <div className={styles.message}>
            <p
              ref={boyTextRef}
              data-text={`Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.`}
            >{`Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.`}</p>
          </div>
        </div>
      </div>

      <div className={styles.action__block}>
        <Button
          ref={playBtn}
          className={styles.btn}
          onClick={() => router.push("/story")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

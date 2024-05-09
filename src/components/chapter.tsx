import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "../pages/story.module.scss";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import transcriptData from "@/merge_audio_transcript.json";
import { useRouter } from "next/router";
import anime from "animejs";

export default function Chapter(props: any) {
  console.log(props);
  const [timestamp, setTimestamp] = useState(0);
  const [lastHighlightedIndex, setLastHighlightedIndex] = useState(0);
  const [word, setWord] = useState("");
  const girlAudioRef = useRef<any>(null);

  const girlTextRef = useRef<any>(null);
  const boyTextRef = useRef<any>(null);
  const boyAudioRef = useRef<any>(null);
  const playBtn = useRef<any>(null);
  const router = useRouter();

  // animation
  const girlAvatarRef = useRef<any>(null);
  const girlAnimeRef = useRef<any>(null);
  const girlMessageRef = useRef<any>(null);
  const boyAvatarRef = useRef<any>(null);
  const boyAnimeRef = useRef<any>(null);
  const boyMessageRef = useRef<any>(null);
  const nextBtnRef = useRef<any>(null);

  const easing = "easeInSine";
  // const girlAnimeRef = useRef<any>(null);

  const onPlaybackEnd = () => {
    playBtn.current.style.display = "block";
    const moveUp = -20;

    anime({
      targets: [
        girlAvatarRef.current,
        girlMessageRef.current,
        boyAvatarRef.current,
        boyMessageRef.current,
      ],
      translateY: moveUp,
      easing: "easeInExpo",
    });

    anime({
      targets: playBtn.current,
      keyframes: [
        { translateY: 300 },
        { opacity: 1 },
        { scale: 0.8 },
        { translateY: 0 },
      ],
      easing,
    });
    boyTextRef.current.innerHTML = boyTextRef.current.dataset.text;
  };

  const onTimeChange = useCallback(() => {
    let currentTime = girlAudioRef?.current?.currentTime * 1000;
    setTimestamp(currentTime);

    const findIndex = transcriptData.findIndex(
      e => currentTime >= e.start && currentTime <= e.end
    );
    if (findIndex != -1) {
      setWord(transcriptData[findIndex].text || "");
      const girlTextSplit = girlTextRef.current.dataset.text.split(" ");
      const boyTextSplit = boyTextRef.current.dataset.text.split(" ");
      if (findIndex <= props.item.speaker_audio_buffer_index - 1) {
        girlTextSplit[findIndex] = `<span>${girlTextSplit[findIndex]}</span>`;
        console.log(girlTextSplit.join(" "), findIndex);
        girlTextRef.current.innerHTML = girlTextSplit.join(" ");
        setLastHighlightedIndex(findIndex);
      } else {
        let bufferIndex = props.item.speaker_audio_buffer_index;
        girlTextRef.current.innerHTML = girlTextRef.current.dataset.text;
        let calculatedIndex = findIndex - bufferIndex;
        boyTextSplit[
          calculatedIndex
        ] = `<span>${boyTextSplit[calculatedIndex]}</span>`;
        console.log(boyTextSplit.join(" "), calculatedIndex);
        boyTextRef.current.innerHTML = boyTextSplit.join(" ");
        setLastHighlightedIndex(calculatedIndex);
      }
    }
  }, [props.item.speaker_audio_buffer_index]);

  useEffect(() => {
    if (props.item.start) {
      anime({
        targets: [girlAvatarRef.current, girlMessageRef.current],
        keyframes: [{ translateY: 300 }, { opacity: 1 }, { translateY: 0 }],
        duration: 800,
        easing,
      });

      anime({
        targets: [boyAvatarRef.current, boyMessageRef.current],
        keyframes: [{ translateY: 300 }, { opacity: 1 }, { translateY: 0 }],
        duration: 1000,
        delay: 3000,
        easing,
      });

      setTimeout(() => {
        if (girlAudioRef.current) {
          girlAudioRef.current?.play();
          girlAudioRef.current.ontimeupdate = onTimeChange;
          girlAudioRef.current.onended = onPlaybackEnd;
          const girlTextSplit = girlTextRef.current.dataset.text.split(" ");
          girlTextSplit[0] = `<span>${girlTextSplit[0]}</span>`;
          girlTextRef.current.innerHTML = girlTextSplit.join(" ");
        }
      }, 1800);
    }
  }, [onTimeChange, props.item.speaker_audio_buffer_index, props.item.start]);

  // useEffect(() => {
  //   girlAudioRef.current.play();
  //   girlAudioRef.current.ontimeupdate = onTimeChange;
  //   girlAudioRef.current.onended = onPlaybackEnd;
  // }, []);

  return (
    <div className={styles.main}>
      <div className={styles.timestamp}>
        {timestamp} - {word}
      </div>
      <div className={styles.billboard}>
        <Image
          fill
          priority={true}
          src={props.item.billboard}
          style={{ objectFit: "contain" }}
          alt="billboard"
        />
      </div>

      <div className={styles.conversation__block}>
        <div className={styles["conversation__message"]}>
          <audio ref={girlAudioRef} className="w-100" src={props.item.audio}>
            Your browser does not support the audio element.
          </audio>
          <div ref={girlAvatarRef} className={styles.avatar}>
            <Image
              fill
              src={props.item.speakers[0].avatar_img}
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="girl avatar"
              priority={true}
            />
          </div>
          <div ref={girlMessageRef} className={styles.message}>
            <p ref={girlTextRef} data-text={props.item.speakers[0].message}>
              <span className={styles["dot-typing"]}></span>
            </p>
          </div>
        </div>
        <div className={styles["conversation__message--reverse"]}>
          <div ref={boyAvatarRef} className={styles.avatar}>
            <Image
              fill
              src={props.item.speakers[1].avatar_img}
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="billboard"
              priority={true}
            />
          </div>
          <div ref={boyMessageRef} className={styles.message}>
            <p ref={boyTextRef} data-text={props.item.speakers[1].message}>
              <span className={styles["dot-typing"]}></span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.action__block}>
        <Button
          ref={playBtn}
          className={styles.btn}
          onClick={() => props.onNext(props)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

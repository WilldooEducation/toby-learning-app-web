import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./story.module.scss";
import { createRef, useEffect, useRef } from "react";

export default function Home() {
  const girlAudioRef = useRef<any>(null);
  const boyAudioRef = useRef<any>(null);
  const playBtn = useRef<any>(null);
  useEffect(() => {
    console.log(girlAudioRef.current);

    if (girlAudioRef.current) {
      girlAudioRef.current.play();
      girlAudioRef.current.ontimeupdate = function () {
        console.log("girl ontimeupdate", girlAudioRef?.current?.currentTime);
      };
      girlAudioRef.current.onended = () => {
        playBtn.current.style.visibility = "visible";
      };
    }

    return () => {
      try {
        if (girlAudioRef.current) {
          girlAudioRef.current.pause();
        }
      } catch (error) {
        
      }
      
    };
  }, [girlAudioRef, boyAudioRef]);

  return (
    <div className={styles.main}>
      <div className={styles.billboard}>
        <Image
          fill
          src="/images/billboard.svg"
          style={{ objectFit: "contain" }}
          alt="billboard"
        />
      </div>

      <div className={styles.conversation__block}>
        <div className={styles["conversation__message"]}>
          <audio ref={girlAudioRef} className="w-100" src="/audio/merge_audio.mp3">
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
            <p>
              {`"Hey Rohan, did you see the playground next to school? It's all dug up now!`}
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
            <p>{`Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.`}</p>
          </div>
        </div>
      </div>

      <div className={styles.action__block}>
        <Button
          ref={playBtn}
          className={styles.btn}
          onClick={e => {
            console.log(e);

            girlAudioRef?.current?.play();
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

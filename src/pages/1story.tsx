import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./story.module.scss";
import { createRef, useEffect, useRef } from "react";
import transcriptData from "@/merge_audio_transcript.json";
import { useRouter } from "next/router";

export default function Home() {
  const girlAudioRef = useRef<any>(null);
  const girlTextRef = useRef<any>(null);
  const boyTextRef = useRef<any>(null);
  const boyAudioRef = useRef<any>(null);
  const playBtn = useRef<any>(null);
  const router = useRouter()
  useEffect(() => {
    console.log(
      girlAudioRef.current,
      transcriptData,
      girlTextRef.current.dataset.text
    );
    const girlTextSplit = girlTextRef.current.dataset.text.split(" ");
    girlTextSplit[0] = `<span>${girlTextSplit[0]}</span>`;

    girlTextRef.current.innerHTML = girlTextSplit.join(" ");

    const boyTextSplit = boyTextRef.current.dataset.text.split(" ");

    if (girlAudioRef.current) {
      
      let lastIndex = 0;
      let totalIndex = lastIndex + 1;
      girlAudioRef.current.ontimeupdate = function () {
        let currentTime = girlAudioRef?.current?.currentTime * 1000;
        console.log(
          lastIndex,
          "lastIndex",
          totalIndex,
          "totalIndex",
          currentTime
        );

        for (let index = lastIndex; index < totalIndex; index++) {
          let e = transcriptData[index];
          if (!e) return;
          let check = currentTime >= e.start && currentTime <= e.end;
          let speaker = currentTime > 5994 ? "boy" : "girl";
          if (check) {
            lastIndex = index;
            totalIndex += 1;
            const takeTextSplit =
              currentTime > 5994 ? boyTextSplit : girlTextSplit;
            const textReset = takeTextSplit.map((element: string) => {
              return element?.replace("<span>", "")?.replace("</span>", "");
            });
            if (index !== 0) {
              textReset[index - 1] = textReset[index - 1]
                ?.replace("<span>", "")
                ?.replace("</span>", "");
            }
            let wordIndex = index;
            if (speaker === "boy") {
              wordIndex -= girlTextSplit.length;
            }
            if (textReset[wordIndex]) {
              textReset[wordIndex] = `<span>${textReset[wordIndex]}</span>`;
              if (speaker === "girl") {
                girlTextRef.current.innerHTML = textReset.join(" ");
              } else {
                boyTextRef.current.innerHTML = textReset.join(" ");
              }
            } else {
              console.log(e, index, currentTime);
              totalIndex += 1;
            }
          } else {
            // console.log(lastIndex, 'lastIndex', totalIndex, 'totalIndex', currentTime);
            // console.log(e);
          }
        }

        transcriptData.forEach((e, index) => {});
      };
      girlAudioRef.current.onended = () => {
        playBtn.current.style.visibility = "visible";
      };
      girlAudioRef.current.play();
    }
  }, [girlAudioRef]);

  return (
    <div className={styles.main}>
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
          onClick={()=>router.push('/story')}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

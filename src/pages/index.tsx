import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import Chapter from "@/components/chapter";
import { useRef, useState } from "react";

export default function Home() {
  const router = useRouter();

  // function preloadImage (src: string) {
  //   return new Promise((resolve, reject) => {
  //     const img:any = new Image(src: src)
  //     img.onload = function() {
  //       resolve(img)
  //     }
  //     img.onerror = img.onabort = function() {
  //       reject(src)
  //     }
  //     img.src = src
  //   })
  // }

  const splashScreenRef = useRef<any>(null);

  const [items, setItems] = useState<any>([
    {
      name: "story1",
      billboard:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/billboard1.webp",
      audio:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/audio/merge_audio.mp3",
      speakers: [
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/girl_a.png",
          message:
            "Hey Rohan, did you see the playground next to school? It's all dug up now!",
        },
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/boy_a.png",
          message:
            "Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.",
        },
      ],
      speaker_audio_buffer_index: 15,
      start: false,
    },
    {
      name: "story2",
      billboard:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/billboard.webp",
      audio:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/audio/merge_audio.mp3",
      speakers: [
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/girl_a.png",
          message:
            "Hey Rohan, did you see the playground next to school? It's all dug up now!",
        },
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/boy_a.png",
          message:
            "Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.",
        },
      ],
      speaker_audio_buffer_index: 15,
      start: false,
    },
    {
      name: "story3",
      billboard:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/billboard.svg",
      audio:
        "https://develop--aquamarine-yeot-40d1c4.netlify.app/audio/merge_audio.mp3",
      speakers: [
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/girl_a.png",
          message:
            "Hey Rohan, did you see the playground next to school? It's all dug up now!",
        },
        {
          avatar_img:
            "https://develop--aquamarine-yeot-40d1c4.netlify.app/images/boy_a.png",
          message:
            "Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds.",
        },
      ],
      speaker_audio_buffer_index: 15,
      start: false,
    },
  ]);

  return (
    <>
      <div ref={splashScreenRef} className={styles.main}>
        <div className={styles.splash__container}>
          <Image
            fill
            src="/images/toby.svg"
            style={{ objectFit: "contain" }}
            alt="billboard"
            priority={true}
          />
        </div>
        <div className={styles.action__block}>
          <Button
            className={styles.btn}
            onClick={() => {
              if (splashScreenRef.current)
                splashScreenRef.current.style.zIndex = -Math.abs(
                  items.length + 1
                );

              items[0].start = true;
              items[0].front_index = 1;
              setItems([...items]);
            }}
          >
            Continue
          </Button>
        </div>
      </div>
      {items.map((e: any, i: any) => (
        <div
          key={i}
          className={styles.story_container}
          style={{
            zIndex: e.front_index || -1,
          }}
        >
          <Chapter
            item={e}
            show_index={i}
            onNext={(evt: any) => {
              console.log(evt);
              items[evt.show_index].front_index = -1;
              if (evt.show_index === items.length - 1) {
                window.location.reload()
              } else {
                items[evt.show_index + 1].front_index = 1;
                items[evt.show_index + 1].start = true;
              }
              setItems([...items]);
            }}
          ></Chapter>
        </div>
      ))}
    </>
  );
}

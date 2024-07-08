import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import GlobalContext from "@/utils/global-context";

export default function Home() {
  const router = useRouter();
  const global = useContext(GlobalContext);

  const navigateToBlock = async () => {
    const storyData = await fetch(
      "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/data/cbse/7std/science/chpt1/blk1/storyData.json"
    );
    const result = await storyData.json();
    let blockData: any = [];
    for (let pitem in result) {
      const message = result[pitem].message;
      const e = result[pitem];
      for (let mitem in message) {
        const m = message[mitem];
        if (parseInt(mitem) === message.length - 1) {
          if (e.question?.[0]?.options) {
            e.question[0].options = e.question[0]?.options?.map((o: any) => ({
              title: o.value.trim(),
              value: o.value.trim(),
            }));
            e.question[0].answer = e.question[0].answer.trim();
          }
          blockData.push({
            panel_type: e.panel_type,
            panel_label: e.panel_label.trim(),
            panel_id: pitem,
            image: e.poster,
            user: m.user,
            message_text: m.message_text,
            audio: m.audio,
            audio_transcript: await audioTranscription(m.audio_trans),
            question: {
              panel_type: "question",
              panel_label: e.panel_label.trim(),
              panel_id: pitem,
              image: e.poster,
              ...e.question?.[0],
            },
          });
        } else {
          blockData.push({
            panel_type: e.panel_type,
            panel_label: e.panel_label.trim(),
            panel_id: pitem,
            image: e.poster,
            user: m.user,
            message_text: m.message_text,
            audio: m.audio,
            audio_transcript: await audioTranscription(m.audio_trans),
          });
        }
      }
    }
    localStorage.setItem("block", JSON.stringify(blockData));
    global.update({
      data: blockData,
    });
    router.push("/block");
  };

  const audioTranscription = async (url: any) => {
    try {
      const audioTransData = await fetch(url);
      const result = await audioTransData.json();
      return result.map((e: any) => {
        const start = e.Offset / 10000000;
        const progress = e.Duration / 10000000;
        return {
          ...e,
          start: start,
          duraion_sec: progress,
          end: start + progress,
        };
      });
    } catch (error) {
      return [];
    }
  };

  return (
    <>
      <div className={styles.main}>
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
          <Button className={styles.btn} onClick={navigateToBlock}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

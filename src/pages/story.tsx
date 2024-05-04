import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./story.module.scss";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.billboard}>
        <Image
          fill
          src="/images/billboard.svg"
          style={{ objectFit: "cover" }}
          alt="billboard"
        />
      </div>

      <div className={styles.conversation__block}>
        <div className={styles["conversation__message"]}>
          <div className={styles.avatar}>
            <Image
              fill
              src="/images/girl.svg"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="billboard"
            />
          </div>
          <div className={styles.message}>
            <p>
              {`"Hey Rohan, did you see the playground next to school? It's all dug up now!"`}
            </p>
          </div>
        </div>
        <div className={styles["conversation__message--reverse"]}>
          <div className={styles.avatar}>
            <Image
              fill
              src="/images/boy.svg"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="billboard"
            />
          </div>
          <div className={styles.message}>
            <p>{`Yeah, I heard they're going to build a huge apartment building there. I can't believe we lost our playground with all its soft grass and marigolds."`}</p>
          </div>
        </div>
      </div>

      <div className={styles.action__block}>
        <Button className={styles.btn}>Continue</Button>
      </div>
    </div>
  );
}

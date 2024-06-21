import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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
          <Button
            className={styles.btn}
            onClick={() => {
              router.push('/block')
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}

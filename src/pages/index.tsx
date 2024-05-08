import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./index.module.scss";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

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
  
  return (
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
        <Button className={styles.btn} onClick={()=>router.push('/story')}>Continue</Button>
      </div>
    </div>
  );
}

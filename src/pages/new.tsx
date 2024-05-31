import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./new.module.scss";
import { useRouter } from "next/router";
import Chapter from "@/components/chapter";
import { useEffect, useRef, useState } from "react";

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
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_001/poster_bg_std07_science_ch1_bl01_pnl_001_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_002/poster_bg_std07_science_ch1_bl01_pnl_002_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_003/poster_bg_std07_science_ch1_bl01_pnl_003_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_004/poster_bg_std07_science_ch1_bl01_pnl_004_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_005/poster_bg_std07_science_ch1_bl01_pnl_005_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_006/poster_bg_std07_science_ch1_bl01_pnl_006_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_007/poster_bg_std07_science_ch1_bl01_pnl_007_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_008/poster_bg_std07_science_ch1_bl01_pnl_008_1_5x.webp
  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_009/poster_bg_std07_science_ch1_bl01_pnl_009_1_5x.webp

  // https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk2/poster_bg_std07_science_ch1_bl02_pnl_001/poster_bg_std07_science_ch1_bl02_pnl_001_1_5x.webp

  const { query } = router;

  console.log(query.block, "QUERY");

  useEffect(() => {
    // search query string changed
    setStoryInfo({
      bl: query.block || 1,
      pnl: query.panel || 1,
    });
  }, [query]);

  const [storyInfo, setStoryInfo] = useState({
    bl: query.block || 1,
    pnl: query.panel || 1,
  });
  console.log(
    storyInfo.bl.toString().padStart(2, "0"),
    storyInfo.pnl.toString().padStart(3, "0")
  );

  return (
    <>
      <div className={styles.main}>
        <div className={styles.splash_container}>
          <div className={styles.overlay_image}></div>
          <Image
            fill
            src={`https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk${storyInfo.bl.toString()}/poster_bg_std07_science_ch1_bl${storyInfo.bl
              .toString()
              .padStart(2, "0")}_pnl_${storyInfo.pnl
              .toString()
              .padStart(3, "0")}/poster_bg_std07_science_ch1_bl${storyInfo.bl
              .toString()
              .padStart(2, "0")}_pnl_${storyInfo.pnl
              .toString()
              .padStart(3, "0")}_1_5x.webp`}
            style={{ objectFit: "contain" }}
            alt="billboard"
            priority={true}
          />
          <div className={styles.info_container}>
            <div className={styles.image_container}>
              <div className={styles.action_items}>
                {storyInfo.pnl > 1 &&<Image priority src="/images/back.svg" alt="Back" onClick={() => {
                      setStoryInfo({
                        bl: storyInfo.bl,
                        pnl: storyInfo.pnl - 1,
                      });
                    }} width={40} height={40}/>}
              </div>
              <div className={styles.image_frame}>
                <Image
                  fill
                  src={`https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk${storyInfo.bl.toString()}/poster_bg_std07_science_ch1_bl${storyInfo.bl
                    .toString()
                    .padStart(2, "0")}_pnl_${storyInfo.pnl
                    .toString()
                    .padStart(
                      3,
                      "0"
                    )}/poster_bg_std07_science_ch1_bl${storyInfo.bl
                    .toString()
                    .padStart(2, "0")}_pnl_${storyInfo.pnl
                    .toString()
                    .padStart(3, "0")}_1_5x.webp`}
                  style={{ objectFit: "contain" }}
                  alt="billboard"
                  priority={true}
                />
              </div>
            </div>
            <div className={styles.message_container}>
            <div className={styles.action_items}>
                <Image priority src="/images/audio.svg" alt="Back" width={40} height={40}/>
                <Image priority src="/images/refresh.svg" alt="Back" width={40} height={40}/>
              </div>
              <div className={styles.message_block}>
                <div className={styles.text_block}>
                  <p>{`Can you imagine what would happen if photosynthesis didn't occur on Earth?`}</p>
                </div>
                <div className={styles.button_block}>
                  <button
                    onClick={() => {
                      setStoryInfo({
                        bl: storyInfo.bl,
                        pnl: storyInfo.pnl + 1,
                      });
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

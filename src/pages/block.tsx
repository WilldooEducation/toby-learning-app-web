import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./block.module.scss";
import { useRouter } from "next/router";
import Chapter from "@/components/chapter";
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ImagePreload } from "@/utils/imagePreload";

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
  const easing = "easeInSine";
  const { query } = router;
  const imageFrame = useRef<any>(null);
  const messageText = useRef<any>(null);
  const backgroundImage = useRef<any>(null);
  const continueButton = useRef<any>(null);
  const messageBlock = useRef<any>(null);
  const [preloadImages, setPreloadImages] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
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
  const block = [
    {
      panel_type: "story",
      panel_id: "_1",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_002/poster_bg_std07_science_ch1_bl01_pnl_002_1_5x.webp",
      user: {
        avatar: "girl",
      },
      message_text:
        "Hey, do you remember learning in Class VI that food is essential for all living organisms?",
      audio: "",
    },
    {
      panel_type: "story",
      panel_id: "_1",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_002/poster_bg_std07_science_ch1_bl01_pnl_002_1_5x.webp",
      user: {
        avatar: "boy",
      },
      message_text:
        "Hey, ever wondered where plants make their food? Is it in all parts of the plant or just in certain areas?",
      audio: "",
    },
    {
      panel_type: "story",
      panel_id: "_2",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_003/poster_bg_std07_science_ch1_bl01_pnl_003_1_5x.webp",
      user: {
        avatar: "girl",
      },
      message_text:
        "Hey, do you remember learning in Class VI that food is essential for all living organisms?",
      audio: "",
    },
    {
      panel_type: "story",
      panel_id: "_2",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_003/poster_bg_std07_science_ch1_bl01_pnl_003_1_5x.webp",
      user: {
        avatar: "boy",
      },
      message_text:
        "Hey, ever wondered where plants make their food? Is it in all parts of the plant or just in certain areas?",
      audio: "",
    },
    {
      panel_type: "story",
      panel_id: "_3",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_004/poster_bg_std07_science_ch1_bl01_pnl_004_1_5x.webp",
      user: {
        avatar: "girl",
      },
      message_text:
        "Hey, do you remember learning in Class VI that food is essential for all living organisms?",
      audio: "",
    },
    {
      panel_type: "story",
      panel_id: "_3",
      image:
        "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_004/poster_bg_std07_science_ch1_bl01_pnl_004_1_5x.webp",
      user: {
        avatar: "boy",
      },
      message_text:
        "Hey, ever wondered where plants make their food? Is it in all parts of the plant or just in certain areas?",
      audio: "",
    },
  ];

  console.log(query.block, "QUERY");
  const duration = 500;
  const delay = 100;
  useEffect(() => {
    // search query string changed
    // setStoryInfo({
    //   bl: query.block || 1,
    //   pnl: query.panel || 1,
    //   no_pnl: query.no_pnl || 2,
    // });
    anime({
      targets: backgroundImage.current,
      duration: duration,
      keyframes: [{ opacity: 1 }],
      easing,
    });
    anime({
      targets: imageFrame.current,
      duration: duration,
      keyframes: [
        {
          translateX: 0,
          opacity: 1,
        },
      ],
      easing,
    });

    // anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   delay: delay,
    //   keyframes: [
    //     { height: "100%", width: "100%", borderRadius: "20px 20px 0px 0px" },
    //   ],
    //   easing,
    // });
    setTimeout(() => {
      messageText.current.innerHTML = messageText.current.dataset.text;
    }, delay * 10);
  }, []);

  const [storyInfo, setStoryInfo] = useState<any>({
    bl: query.block || 1,
    pnl: query.panel || 1,
    no_pnl: query.no_pnl || 2,
  });
  console.log(
    storyInfo.bl.toString().padStart(2, "0"),
    storyInfo.pnl.toString().padStart(3, "0")
  );

  const onNext = async () => {
    let _messageIndex = messageIndex;
    let _selectedIndex = selectedIndex;
    let _preloadImages = preloadImages;
    const stopAnimate =
      block[_selectedIndex].panel_id === block[_selectedIndex + 1]?.panel_id;
    if (!stopAnimate) {
      anime({
        targets: backgroundImage.current,
        duration: duration,
        keyframes: [{ opacity: 0.8 }],
        easing,
      }).finished;
    }
    anime({
      targets: continueButton.current,
      duration: duration,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;
    messageText.current.innerHTML = `<span class=${styles["dot-typing"]}></span>`;
    // await anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   delay: delay,
    //   keyframes: [{ height: "50%", width: "90%",  borderRadius: '100px 100px 0px 0px'}],
    //   easing,
    // }).finished;
    if (!stopAnimate) {
      await anime({
        targets: imageFrame.current,
        duration: duration,
        keyframes: [
          {
            // translateX: -200,
            opacity: 0,
          },
        ],
        easing,
      }).finished;
    }

    if (selectedIndex < block.length - 1) {
      _selectedIndex = selectedIndex + 1;
      setSelectedIndex(_selectedIndex);
      if (_selectedIndex + 1 < block.length - 1) {
        if (block[_selectedIndex + 1].image !== block[_selectedIndex].image) {
          const nextImage = ImagePreload(block[_selectedIndex + 1].image);
          setPreloadImages({
            ..._preloadImages,
            ...{ [block[_selectedIndex + 1].panel_id]: nextImage },
          });
        }
      }
    } else {
      _selectedIndex = 0;
      setSelectedIndex(_selectedIndex);
    }

    // if (messageIndex < block[selectedIndex].message.length - 1) {
    //   _messageIndex = messageIndex + 1;
    //   setMessageIndex(_messageIndex);
    //   if (_messageIndex === block[selectedIndex].message.length - 1) {
    //     if (selectedIndex < block.length - 1) {
    //       const nextImage = ImagePreload(block[_selectedIndex + 1].image);
    //       _preloadImages.push(nextImage);
    //       setPreloadImages(_preloadImages);
    //     }
    //   }
    // } else {
    //   if (selectedIndex < block.length - 1) {
    //     _selectedIndex = selectedIndex + 1;
    //     setSelectedIndex(_selectedIndex);
    //     _messageIndex = 0;
    //     setMessageIndex(_messageIndex);
    //   } else {
    //     _selectedIndex = 0;
    //     setSelectedIndex(_selectedIndex);
    //     _messageIndex = 0;
    //     setMessageIndex(_messageIndex);
    //   }
    // }

    // setStoryInfo({
    //   bl: storyInfo.bl,
    //   pnl: storyInfo.pnl + 1,
    //   no_pnl: storyInfo.no_pnl,
    // });
    // await anime({
    //   targets: imageFrame.current,
    //   duration: duration,
    //   keyframes: [
    //     {
    //       translateX: 200,
    //       opacity: 0,
    //     },
    //   ],
    //   easing,
    // }).finished;

    if (!stopAnimate) {
      anime({
        targets: backgroundImage.current,
        duration: duration,
        delay: delay,
        keyframes: [{ opacity: 1 }],
        easing,
      });
      anime({
        targets: imageFrame.current,
        duration: duration,
        delay: delay,
        keyframes: [
          {
            translateX: 0,
            opacity: 1,
          },
        ],
        easing,
      });
    }
    // await anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   delay: delay,
    //   keyframes: [{ height: "100%", width: "100%", borderRadius: '20px 20px 0px 0px' }],
    //   easing,
    // }).finished;

    setTimeout(() => {
      messageText.current.innerHTML = block[_selectedIndex].message_text;
    }, delay * 10);
  };

  const onPrev = () => {
    let _selectedIndex = selectedIndex - 1;
    if (_selectedIndex < 0) {
      setSelectedIndex(0);
      messageText.current.innerHTML = block[0].message_text;
    } else {
      messageText.current.innerHTML = block[_selectedIndex].message_text;
      setSelectedIndex(_selectedIndex);
    }
  };

  console.log(preloadImages, "preloadImages");

  return (
    <>
      <div className={styles.main}>
        <div className={styles.splash_container}>
          <div className={styles.overlay_image}></div>
          {preloadImages[block[selectedIndex].panel_id] ? (
            <div
              className={styles.background_image}
              dangerouslySetInnerHTML={{
                __html: preloadImages[block[selectedIndex].panel_id],
              }}
            />
          ) : (
            <Image
              ref={backgroundImage}
              fill
              src={block[selectedIndex].image}
              style={{ objectFit: "contain" }}
              alt="billboard"
              priority={true}
            />
          )}

          <div className={styles.info_container}>
            <div className={styles.image_container}>
              <div className={styles.action_items}>
                {selectedIndex > 0 && (
                  <Image
                    priority
                    src="/images/back.svg"
                    alt="Back"
                    onClick={onPrev}
                    width={40}
                    height={40}
                  />
                )}
              </div>

              {preloadImages[block[selectedIndex].panel_id] ? (
                <div
                  className={styles.image_frame}
                  ref={imageFrame}
                  dangerouslySetInnerHTML={{
                    __html: preloadImages[block[selectedIndex].panel_id],
                  }}
                />
              ) : (
                <div className={styles.image_frame} ref={imageFrame}>
                  <Image
                    fill
                    src={block[selectedIndex].image}
                    style={{ objectFit: "contain" }}
                    alt="billboard"
                    priority={true}
                  />
                </div>
              )}
            </div>
            <div className={styles.message__container}>
              <div className={styles["message__action-items"]}>
                <Image
                  priority
                  src="/images/audio.svg"
                  alt="Back"
                  width={40}
                  height={40}
                />
                <Image
                  priority
                  src="/images/refresh.svg"
                  alt="Back"
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.message_parent}>
                <div
                  className={
                    block[selectedIndex].user.avatar === "girl"
                      ? styles.message_avatar_girl
                      : styles.message_avatar_boy
                  }
                >
                  <Image
                    priority
                    src={`/images/${block[selectedIndex].user.avatar}.webp`}
                    alt="girl"
                    width={70}
                    height={70}
                  />
                </div>
                <div ref={messageBlock} className={styles.message_block}>
                  <div className={styles.text_block}>
                    <p
                      ref={messageText}
                      data-text={block[selectedIndex].message_text}
                    >
                      <span className={styles["dot-typing"]}></span>
                    </p>
                  </div>
                  <div ref={continueButton} className={styles.button_block}>
                    <button onClick={onNext}>Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

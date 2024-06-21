import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./block.module.scss";
import { useRouter } from "next/router";
import Chapter from "@/components/chapter";
import transcriptBlockOne from "@/block_1.json";
import transcriptBlockTwo from "@/block_2.json";
import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ImagePreload } from "@/utils/imagePreload";
let timeout: any;
let stopAnimation: boolean = false;
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
  const timer = (ms: any) => new Promise(res => setTimeout(res, ms));

  const imageFrame = useRef<any>(null);
  const messageText = useRef<any>(null);
  const backgroundImage = useRef<any>(null);
  const continueButton = useRef<any>(null);
  const messageBlock = useRef<any>(null);
  const imageBlock = useRef<any>(null);
  const backButton = useRef<any>(null);
  const messageActionBlock = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const muteBtn = useRef<any>(null);
  const replayBtn = useRef<any>(null);
  const [mute, setMute] = useState(false);
  const [preloadImages, setPreloadImages] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isType, setIsType] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentScreenType, setCurrentScreenType] = useState("story");
  const [visitedIndex, setVisitedIndex] = useState<any>(0);
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

  const transformAudioTanscript = (e: any) => {
    const start = e.Offset / 10000000;
    const progress = e.Duration / 10000000;
    return {
      ...e,
      start: start,
      duraion_sec: progress,
      end: start + progress,
    };
  };
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
      audio_transcript: transcriptBlockOne.map(transformAudioTanscript),
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
      audio_transcript: transcriptBlockTwo.map(transformAudioTanscript),
      question: {
        panel_type: "question",
        panel_id: "_1",
        image:
          "https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/images/frames/cbsc/7std/science/chpt1/blk1/poster_bg_std07_science_ch1_bl01_pnl_002/poster_bg_std07_science_ch1_bl01_pnl_002_1_5x.webp",
        question:
          "What Are The Primary Components of Food Discussed in the Classroom?",
        options: [
          {
            title: "Water and Soil",
            value: "Water and Soil",
          },
          {
            title: "Carbohydrates, Proteins, and Fats",
            value: "Carbohydrates, Proteins, and Fats",
          },
          {
            title: "Gases and Liquids",
            value: "Gases and Liquids",
          },
          {
            title: "Metals and Plastics",
            value: "Gases and Liquids",
          },
        ],
        audio: "",
      },
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
      audio_transcript: transcriptBlockOne.map(transformAudioTanscript),
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
      audio_transcript: transcriptBlockTwo.map(transformAudioTanscript),
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
      audio_transcript: transcriptBlockOne.map(transformAudioTanscript),
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
      audio_transcript: transcriptBlockOne.map(transformAudioTanscript),
    },
  ];

  console.log(query.block, "QUERY");
  const duration = 500;
  const delay = 100;
  // const appendTextInTypeEffect = useCallback(async (
  //   _visitedIndex: any = 0,
  //   _selectedIndex: any = 0
  // ) => {
  //   console.log(
  //     _visitedIndex <= _selectedIndex,
  //     _visitedIndex,
  //     "VISITED",
  //     _selectedIndex,
  //     "SELECTED"
  //   );
  //   if (_selectedIndex > _visitedIndex) {
  //     setIsType(true);
  //     // if (timeout) clearTimeout(timeout);
  //     // timeout = setTimeout(async () => {
  //     messageText.current.innerHTML = "";
  //     const messageSplit = messageText.current.dataset.text
  //       .split("")
  //       .map((e: any) => {
  //         const ele = document.createElement("span");
  //         ele.classList.add("text-block");
  //         ele.innerHTML = `${e}`;
  //         return ele;
  //       });
  //     for (const text of messageSplit) {
  //       await timer(50);
  //       messageText.current.append(text);
  //     }
  //     messageText.current.innerHTML = messageText.current.dataset.text;
  //     setIsType(false);
  //     // }, delay);
  //   } else {
  //     messageText.current.innerHTML = block[_selectedIndex].message_text;
  //   }
  // }, []);
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
  }, []);

  const onNext = async () => {
    if (isType) return;
    let _messageIndex = messageIndex;
    let _selectedIndex = selectedIndex;
    let _preloadImages = preloadImages;
    anime({
      targets: continueButton.current,
      duration: duration,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;

    if (block[_selectedIndex].question && currentScreenType === "story") {
      audioRef.current.pause();
      await anime({
        targets: imageFrame.current,
        duration: duration,
        keyframes: [
          {
            // ************** animation type **********
            // rotate: "-10deg",
            // translateX: -200,
            translateY: -200,
            opacity: 0,
          },
        ],
        easing,
      }).finished;

      anime({
        targets: imageBlock.current,
        duration: duration,
        keyframes: [{ minHeight: "0vh", maxHeight: "0vh" }],
        easing,
      });

      anime({
        targets: messageActionBlock.current,
        duration: duration,
        keyframes: [{ translateY: -200 }],
        easing,
      });
      anime({
        targets: messageBlock.current,
        duration: duration,
        keyframes: [{ height: "96%" }],
        easing,
      });

      // anime({
      //   targets: messageBlock.current,
      //   duration: duration,
      //   keyframes: [{ height: "100%", width: "100%" }],
      //   easing,
      // });
      setCurrentScreenType("question");
      return;
    }

    // *************************************************
    const stopAnimate =
      block[_selectedIndex].panel_id === block[_selectedIndex + 1]?.panel_id ||
      currentScreenType === "question";
    messageText.current.innerHTML = ``;
    if (currentScreenType === "question") {
      await reverseTheQuestion();
    }
    debugger;
    if (!stopAnimate) {
      await anime({
        targets: imageFrame.current,
        duration: duration,
        keyframes: [
          {
            rotate: "-10deg",
            translateX: -200,
            translateY: 0,
            opacity: 0,
          },
        ],
        easing,
      }).finished;
      // await anime({
      //   targets: imageFrame.current,
      //   duration: duration,
      //   keyframes: [
      //     {
      //       // translateX: -200,
      //       opacity: 0,
      //     },
      //   ],
      //   easing,
      // }).finished;
    }
    if (!stopAnimate) {
      anime({
        targets: backgroundImage.current,
        keyframes: [{ opacity: 0.2 }],
        easing,
      });
    }

    // await anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   delay: delay,
    //   keyframes: [{ height: "50%", width: "90%",  borderRadius: '100px 100px 0px 0px'}],
    //   easing,
    // }).finished;

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
    debugger;
    if (_selectedIndex !== 0 && visitedIndex < _selectedIndex)
      setVisitedIndex(_selectedIndex);

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

    if (!stopAnimate) {
      await anime({
        targets: imageFrame.current,
        duration: duration,
        keyframes: [
          {
            rotate: "10deg",
            translateX: 200,
            opacity: 0,
          },
        ],
        easing,
      }).finished;
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
            rotate: "0deg",
            translateX: 0,
            opacity: 1,
          },
        ],
        easing,
      });
    }

    if (currentScreenType === "question") {
      await reverseTheQuestion();
    }
    // await anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   delay: delay,
    //   keyframes: [{ height: "100%", width: "100%", borderRadius: '20px 20px 0px 0px' }],
    //   easing,
    // }).finished;

    // setTimeout(() => {
    //   messageText.current.innerHTML =
    //     block[_selectedIndex]?.message_text || block[_selectedIndex]?.question;
    // }, delay * 10);
    // appendTextInTypeEffect(visitedIndex, _selectedIndex);
  };

  const onPrev = async () => {
    if (timeout) clearTimeout(timeout);
    // if (isType) return;
    if (currentScreenType === "question") {
      await reverseTheQuestion();
      return;
    }
    let _selectedIndex = selectedIndex - 1;
    if (_selectedIndex < 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(_selectedIndex);
    }
    messageText.current.innerHTML = block[_selectedIndex].message_text;
    audioRef.current.pause();
  };

  const reverseTheQuestion = async () => {
    await anime({
      targets: imageFrame.current,
      duration: duration,
      delay: delay,
      keyframes: [
        {
          // ************** animation type **********
          // rotate: "0deg",
          // translateX: 0,
          translateY: 0,
          opacity: 1,
        },
      ],
      easing,
    });

    anime({
      targets: imageBlock.current,
      duration: duration,
      keyframes: [{ minHeight: "50vh", maxHeight: "50vh" }],
      easing,
    });
    anime({
      targets: messageActionBlock.current,
      duration: duration,
      keyframes: [{ translateY: 0 }],
      easing,
    });

    anime({
      targets: messageBlock.current,
      duration: duration,
      keyframes: [{ height: "100%" }],
      easing,
    });

    // anime({
    //   targets: messageBlock.current,
    //   duration: duration,
    //   keyframes: [{ height: "auto", width: "100%" }],
    //   easing,
    // });
    setCurrentScreenType("story");
    return;
  };

  let selectedWordIndex = -1

  const onTimeChange = (e: any) => {
    const textSplit = block[selectedIndex].message_text.split(" ");
    console.log(audioRef?.current?.currentTime, "EVENT: onTimeChange");
    const selectedWord = block[selectedIndex].audio_transcript.findIndex(
      e =>
        audioRef?.current?.currentTime >= e.start &&
        audioRef?.current?.currentTime <= e.end
    );
    if(selectedWordIndex === selectedWord) return 
    selectedWordIndex = selectedWord
    if (selectedWord != -1)
      console.log(
        block[selectedIndex].audio_transcript[selectedWord].Word,
        selectedIndex,
        "EVENT: onTimeChange"
      );
    if (textSplit[selectedWord]?.trim())
      textSplit[selectedWord] = `<span>${textSplit[selectedWord]}</span>`;
    console.log(textSplit.join(" "), selectedWord);
    messageText.current.innerHTML = textSplit.join(" ");
  };
  const onPlaybackEnd = (e: any) => {
    console.log(e, "EVENT:onPlaybackEnd");
  };

  useEffect(() => {
    console.log(selectedIndex, visitedIndex, "visitedIndex");
    audioRef.current.ontimeupdate = onTimeChange;
    audioRef.current.onended = onPlaybackEnd;

    if (selectedIndex >= visitedIndex) audioRef.current.play();
    messageText.current.innerHTML = block[selectedIndex].message_text;
  }, [selectedIndex]);

  const onToggleAudio = () => {
    anime({
      targets: muteBtn.current,
      duration: duration,
      scale: [
        { value: 0.5, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;
    setMute(!mute);
    audioRef.current.muted = !audioRef.current?.muted;
  };

  const onReplay = () => {
    anime({
      targets: replayBtn.current,
      duration: duration,
      scale: [
        { value: 0.5, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;
    audioRef.current.currentTime = 0;
    audioRef.current.muted = false;
    setMute(false);
    audioRef.current?.play();
  };

  console.log(preloadImages, block[selectedIndex].panel_type, "preloadImages");

  const panelBlock = (
    <div className={styles.info_container}>
      <div className={styles.image_container} ref={imageBlock}>
        <div className={styles.action_items}>
          {selectedIndex > 0 && currentScreenType === "story" && (
            <Image
              ref={backButton}
              priority
              src="/images/back.svg"
              alt="Back"
              onClick={onPrev}
              width={40}
              height={40}
            />
          )}
          {selectedIndex > 0 && currentScreenType === "question" && (
            <Image
              ref={backButton}
              className={styles.close_img}
              src="/images/close.svg"
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
        <Image
          className={
            currentScreenType === "question"
              ? styles.fox_img_show
              : styles.fox_img_hide
          }
          src="/images/fox.png"
          alt="Fox"
          width={100}
          height={100}
        />
        <div
          ref={messageActionBlock}
          className={styles["message__action-items"]}
        >
          <Image
            ref={muteBtn}
            priority
            onClick={onToggleAudio}
            src={mute ? "/images/m-audio.svg" : "/images/audio.svg"}
            alt="Back"
            width={40}
            height={40}
          />
          <div ref={replayBtn} className={styles["replay-btn"]}>
            <Image
              ref={replayBtn}
              priority
              onClick={onReplay}
              src="/images/refresh.svg"
              alt="Back"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className={styles.message_parent}>
          {currentScreenType !== "question" && (
            <div
              className={
                block[selectedIndex]?.user?.avatar === "girl"
                  ? styles.message_avatar_girl
                  : styles.message_avatar_boy
              }
            >
              <Image
                priority
                src={`/images/${block[selectedIndex].user.avatar}_image.png`}
                alt="girl"
                width={70}
                height={70}
              />
              {isType && (
                <div
                  className={
                    block[selectedIndex]?.user?.avatar === "girl"
                      ? styles["type-anim_girl"]
                      : styles["type-anim_boy"]
                  }
                >
                  <span className={styles["dot-typing"]}></span>
                </div>
              )}
            </div>
          )}
          <div ref={messageBlock} className={styles.message_block}>
            <div className={styles.text_block}>
              <p
                ref={messageText}
                data-text={block[selectedIndex].message_text}
              ></p>
            </div>
            <div ref={continueButton} className={styles.button_block}>
              <button onClick={onNext}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.main}>
        <audio
          muted={mute}
          ref={audioRef}
          src={
            block[selectedIndex]?.user?.avatar === "girl"
              ? "/audio/ana.wav"
              : "/audio/roger.wav"
          }
        >
          Your browser does not support the audio element.
        </audio>
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

          {panelBlock}
        </div>
      </div>
    </>
  );
}

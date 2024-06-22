import Image from "next/image";
import { Button } from "@material-tailwind/react";
import styles from "./block.module.scss";
import { useRouter } from "next/router";
import Chapter from "@/components/chapter";
import transcriptBlockOne from "@/block_1.json";
import transcriptBlockTwo from "@/block_2.json";
import block from "@/block-data.json";
import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ImagePreload } from "@/utils/imagePreload";
import { AudioPreload } from "@/utils/audioPreload";
let timeout: any;
let stopAnimation: boolean = false;
export default function Home() {
  const router = useRouter();
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
  const backgroundColorRef = useRef<any>(null);
  const muteBtn = useRef<any>(null);
  const replayBtn = useRef<any>(null);
  const selectBtn = useRef<any>([]);
  const [mute, setMute] = useState(false);
  const [preloadImages, setPreloadImages] = useState<any>({});
  const [preloadAudio, setPreloadAudio] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isType, setIsType] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [currentScreenType, setCurrentScreenType] = useState("story");
  const [visitedIndex, setVisitedIndex] = useState<any>(0);
  const [hideContinueBtn, setHideContinueBtn] = useState<any>(false);

  console.log(block, "QUERY");
  const duration = 500;
  const delay = 100;

  useEffect(() => {
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
    const nextImage = ImagePreload(block[0].image);
    setPreloadImages({ [block[0].panel_id]: nextImage });
    const nextAudio = AudioPreload(block[0]?.audio);
    setPreloadAudio({ "0": nextAudio });
    // audioRef.current = nextAudio;
  }, []);

  const onNext = async () => {
    if (isType) return;
    let _messageIndex = messageIndex;
    let _selectedIndex = selectedIndex;
    let _preloadImages = preloadImages;
    let _preloadAudio = preloadAudio;

    animateContinueButton();

    if (block[_selectedIndex].question && currentScreenType === "story") {
      messageText.current.innerHTML = ``;
      audioRef.current.pause();
      await animateToQuestion();

      messageText.current.innerHTML = block[_selectedIndex].question?.text;

      setCurrentScreenType("question");
      setHideContinueBtn(true);
      return;
    }

    // *************************************************
    const stopAnimate =
      block[_selectedIndex].panel_id === block[_selectedIndex + 1]?.panel_id ||
      currentScreenType === "question";
    messageText.current.innerHTML = ``;

    if (currentScreenType === "question") {
      setCurrentScreenType("story");
    }

    if (!stopAnimate) {
      await animateImageSlideOut();
    }

    if (selectedIndex < block.length - 1) {
      _selectedIndex = selectedIndex + 1;
      setSelectedIndex(_selectedIndex);
      if (_selectedIndex + 1 < block.length - 1) {
        if (block[_selectedIndex + 1].image !== block[_selectedIndex].image) {
          if (
            !_preloadImages[block[_selectedIndex + 1].panel_id] &&
            currentScreenType !== "question"
          ) {
            const nextImage = ImagePreload(block[_selectedIndex + 1].image);
            setPreloadImages({
              ..._preloadImages,
              ...{ [block[_selectedIndex + 1].panel_id]: nextImage },
            });
          }
        }
      }
    } else {
      _selectedIndex = 0;
      setSelectedIndex(_selectedIndex);
    }

    if (_selectedIndex !== 0 && visitedIndex < _selectedIndex)
      setVisitedIndex(_selectedIndex);

    if (!stopAnimate) {
      await animateImageSlideIn();
    }

    if (currentScreenType === "question") {
      await animateReverseQuestion();
      setHideContinueBtn(false);
    }
  };

  const onPrev = async () => {
    if (timeout) clearTimeout(timeout);
    // if (isType) return;
    if (currentScreenType === "question") {
      messageText.current.innerHTML = block[selectedIndex].message_text;
      setHideContinueBtn(false);
      await animateReverseQuestion();
      return;
    }
    let _selectedIndex = selectedIndex - 1;
    if (_selectedIndex < 0) {
      _selectedIndex = 0;
      setSelectedIndex(_selectedIndex);
    } else {
      setSelectedIndex(_selectedIndex);
    }
    messageText.current.innerHTML = block[_selectedIndex].message_text;
    audioRef.current.pause();
  };
  const onSelectAns = (el: any, index: any, value: any) => {
    if (!hideContinueBtn) return;
    animateOptionButton(el);
    if (block[selectedIndex].question?.answer === value) {
      setHideContinueBtn(false);
      el.style.backgroundColor = "#8bc34a66";
    } else {
      el.style.backgroundColor = "#ff001166";
    }
  };

  const animateOptionButton = (el: any) => {
    anime({
      targets: el,
      duration: duration,
      scale: [
        { value: 0.9, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;
  };

  const animateContinueButton = () => {
    anime({
      targets: continueButton.current,
      duration: duration,
      scale: [
        { value: 0.1, easing: "easeOutSine", duration: 100 },
        { value: 1, easing: "easeInOutQuad", duration: 100 },
      ],
      easing,
    }).finished;
  };

  const animateImageSlideOut = async () => {
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
    anime({
      targets: backgroundImage.current,
      keyframes: [{ opacity: 0.2 }],
      easing,
    });
  };

  const animateImageSlideIn = async () => {
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
  };

  const animateToQuestion = async () => {
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
  };

  const animateReverseQuestion = async () => {
    setCurrentScreenType("story");
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

    return;
  };

  let selectedWordIndex = -1;

  const onTimeChange = (e: any) => {
    const textSplit = block[selectedIndex].message_text.split(" ");
    console.log(audioRef?.current?.currentTime, "EVENT: onTimeChange");
    const selectedWord = block[selectedIndex].audio_transcript.findIndex(
      e =>
        audioRef?.current?.currentTime >= e.start &&
        audioRef?.current?.currentTime <= e.end
    );
    if (selectedWordIndex === selectedWord) return;
    selectedWordIndex = selectedWord;
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
    if (!preloadAudio[selectedIndex + 1] && block[selectedIndex + 1]?.audio) {
      const nextAudio = AudioPreload(block[selectedIndex + 1]?.audio);
      setPreloadAudio({
        ...preloadAudio,
        ...{ [selectedIndex + 1]: nextAudio },
      });
    }
    // audioRef.current = preloadAudio[selectedIndex] || audioRef.current;
    console.log(selectedIndex, visitedIndex, "visitedIndex");
    if (audioRef && audioRef.current) {
      audioRef.current.ontimeupdate = onTimeChange;
      audioRef.current.onended = onPlaybackEnd;

      if (selectedIndex >= visitedIndex) audioRef.current.play();
    }
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

  console.log(
    preloadImages,
    preloadAudio,
    block[selectedIndex].panel_type,
    "preloadImages"
  );

  const panelBlock = (
    <div className={styles.info_container}>
      <div className={styles.image_container} ref={imageBlock}>
        <div className={styles.action_items}>
          {selectedIndex > 0 && currentScreenType === "story" && (
            <Image
              ref={backButton}
              priority={true}
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
              priority={true}
              className={styles.close_img}
              src="/images/close.svg"
              alt="Back"
              onClick={onPrev}
              width={40}
              height={40}
            />
          )}
        </div>

        {/* {preloadImages[block[selectedIndex].panel_id] && ( */}
        <div
          className={styles.image_frame}
          ref={imageFrame}
          dangerouslySetInnerHTML={{
            __html: preloadImages[block[selectedIndex].panel_id],
          }}
        />
        {/* )} */}
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
          priority={true}
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
          <>
            <div
              className={[
                styles.message_avatar_girl,
                block[selectedIndex]?.user?.avatar === "girl" &&
                currentScreenType !== "question"
                  ? styles.show
                  : styles.hide,
              ].join(" ")}
            >
              <Image
                src={`/images/girl_image.png`}
                alt="girl"
                width={70}
                height={70}
              />
            </div>
            <div
              className={[
                styles.message_avatar_boy,
                block[selectedIndex]?.user?.avatar === "boy" &&
                currentScreenType !== "question"
                  ? styles.show
                  : styles.hide,
              ].join(" ")}
            >
              <Image
                priority
                src={`/images/boy_image.png`}
                alt="boy"
                width={70}
                height={70}
              />
            </div>
          </>
          <div ref={messageBlock} className={styles.message_block}>
            {currentScreenType === "question" && (
              <div className={styles.clock_block}>
                <Image
                  priority
                  src="/images/clock.svg"
                  alt="Back"
                  width={30}
                  height={30}
                />
              </div>
            )}
            <div className={styles.text_block}>
              <p
                ref={messageText}
                data-text={block[selectedIndex].message_text}
              ></p>
            </div>
            {currentScreenType === "question" && (
              <div className={styles.option_block}>
                {block[selectedIndex]?.question?.question_type === "choice" &&
                  block[selectedIndex]?.question?.options?.map((e: any, i) => (
                    <div
                      ref={el => (selectBtn.current[i] = el)}
                      onClick={() =>
                        onSelectAns(selectBtn.current[i], i, e.value)
                      }
                      className={[styles.option_item].join()}
                      key={i}
                    >
                      {e.title}
                    </div>
                  ))}
              </div>
            )}

            <div
              ref={continueButton}
              className={[
                styles.button_block,
                !hideContinueBtn ? styles.show : styles.hide,
              ].join(" ")}
            >
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
        {/* {preloadAudio[selectedIndex] && (
          <div
            className={styles.background_image}
            dangerouslySetInnerHTML={{
              __html: preloadAudio[selectedIndex].outerHTML,
            }}
          />
        )} */}
        <audio
          muted={mute}
          ref={audioRef}
          preload={"auto"}
          src={block[selectedIndex]?.audio}
        >
          Your browser does not support the audio element.
        </audio>
        <div className={styles.splash_container}>
          <div className={styles.overlay_image}></div>
          <div
            ref={backgroundColorRef}
            style={{backgroundColor: block[selectedIndex].panel_color || "#000"}}
            className={styles.background_image}
            dangerouslySetInnerHTML={{
              __html: preloadImages[block[selectedIndex].panel_id],
            }}
          />

          {panelBlock}
        </div>
      </div>
    </>
  );
}

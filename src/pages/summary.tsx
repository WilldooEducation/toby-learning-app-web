import Image from "next/image";
import styles from "./block.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ImagePreload } from "@/utils/imagePreload";
import { AudioPreload } from "@/utils/audioPreload";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GlobalContext from "@/utils/global-context";
import { useRouter } from "next/navigation";
import ResultContext from "@/utils/result-context";
let timeout: any;
let stopAnimation: boolean = false;
export default function Summary() {
  const router = useRouter();
  const global = useContext(GlobalContext);
  const result = useContext(ResultContext);
  console.log(global, result, "RESULT");
  const block: any = global.data;
  const backgroundColorRef = useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    block.findIndex((e: any) => e.panel_type === "summary")
  );
  const [currentPage, setCurrentPage] = useState<any>("summary");
  const [preloadImages, setPreloadImages] = useState<any>({});
  // const [correctAns, setCorrectAns] = useState('')
  // const [total, setTotal] = useState('')

  useEffect(() => {
    const index = block.findIndex((e: any) => e.panel_type === "summary");
    const nextImage = ImagePreload(block[index].image);
    setPreloadImages({ [block[index].panel_id]: nextImage });
    // setCorrectAns(Object.entries(result).filter(e=>e[1]).length.toString())
    // setTotal(Object.entries(result).filter(e=>e[1]).length.toString())
  }, []);

  const correctAns = Object.entries(result)
    ?.filter(e => e[1])
    .length.toString();
  const total = Object.entries(result)?.length.toString();

  return (
    <>
      {block[selectedIndex] && (
        <div className={styles.main}>
          <div className={styles.splash_container}>
            <div className={styles.overlay_image}></div>
            <div
              ref={backgroundColorRef}
              style={{
                backgroundColor: block[selectedIndex].panel_color || "#000",
              }}
              className={styles.background_image}
              dangerouslySetInnerHTML={{
                __html: preloadImages[block[selectedIndex].panel_id],
              }}
            />
          </div>

          <div className={styles.summary_container}>
            {currentPage === "summary" && (
              <div className={styles.summary_message_container}>
                <label className={styles.heading}>Summary</label>
                <hr />

                <div
                  className={styles.summary_message_text}
                  dangerouslySetInnerHTML={{
                    __html: block[selectedIndex].message_text,
                  }}
                />
              </div>
            )}

            {currentPage === "result" && (
              <div className={styles.reslut_container}>
                <h1 className={styles.result_heading}>
                  Grade {correctAns}/{total}
                </h1>
                <h4 className={styles.result_sub_heading}>
                  You’ve completed the quiz with a perfect score and earned a
                  Flawless finisher Batch
                </h4>
                <div
                  className={[
                    styles.result_batch,
                    correctAns !== total ? styles.result_fail : "",
                  ].join(" ")}
                >
                  <Image
                    key={"result_image"}
                    src={`https://toby-app-dev-ui.s3.ap-south-1.amazonaws.com/assert/images/batch/highest_streak/highest_streak_1x.webp`}
                    alt="result-batch"
                    width={140}
                    height={140}
                  ></Image>
                </div>
                <div className={styles.reslut_block}>
                  {Object.entries(result).map(e => {
                    if (e[1])
                      return (
                        <Image
                          key={e[0]}
                          src={`/images/tick.svg`}
                          alt="tick"
                          width={26}
                          height={26}
                        />
                      );
                    else
                      return (
                        <Image
                          key={e[0]}
                          src={`/images/cross.svg`}
                          alt="cross"
                          width={26}
                          height={26}
                        />
                      );
                  })}
                </div>
              </div>
            )}
            <div className={styles.summary_btn_container}>
              <div className={[styles.button_block, styles.show].join(" ")}>
                <button
                  onClick={() => {
                    if (currentPage === "summary") {
                      setCurrentPage("result");
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

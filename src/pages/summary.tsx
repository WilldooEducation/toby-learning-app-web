import Image from "next/image";
import styles from "./block.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ImagePreload } from "@/utils/imagePreload";
import { AudioPreload } from "@/utils/audioPreload";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import GlobalContext from "@/utils/global-context";
import { useRouter } from "next/navigation";
let timeout: any;
let stopAnimation: boolean = false;
export default function Summary() {
  const router = useRouter();
  const global = useContext(GlobalContext);
  console.log(global);
  const block: any = global.data;
  const backgroundColorRef = useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    block.findIndex((e: any) => e.panel_type === "summary")
  );
  const [preloadImages, setPreloadImages] = useState<any>({});

  useEffect(() => {
    const index = block.findIndex((e: any) => e.panel_type === "summary");
    const nextImage = ImagePreload(block[index].image);
    setPreloadImages({ [block[index].panel_id]: nextImage });
  }, []);

  return (
    <>
      {block[selectedIndex] && <div className={styles.main}>
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
          <div className={styles.summary_btn_container}>
            <div className={[styles.button_block, styles.show].join(" ")}>
              <button
                onClick={() => {
                  router.push("/");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}

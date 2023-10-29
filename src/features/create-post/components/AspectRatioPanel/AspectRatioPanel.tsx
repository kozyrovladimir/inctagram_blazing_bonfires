import React from "react"
import { Popover } from '@headlessui/react'
import Image from "next/image";
import sizePhoto from "@/shared/assets/icons/filterPostPhoto/size.svg";
import styles from './AspectRatioPanel.module.scss'
import OriginalAspectIcon from "@/features/create-post/ui/icons/OriginalAspectIcon";
import SquareIcon from "@/features/create-post/ui/icons/SquareIcon";
import VerticalRectangle from "@/features/create-post/ui/icons/VerticalRectangle";
import HorizontalRectangle from "@/features/create-post/ui/icons/HorizontalRectangle";
import { Button, ButtonTheme } from "@/shared/ui/button/Button";
import style
  from "@/features/create-post/components/ButtonFilterPanel/ButtonFilterPanel.module.scss";

interface  AspectRatioPanel {
  onAspectRatioChange: (aspectRatio: number) => void
  originalAspect: number
}

const aspectRatio = {
  square: 1,
  verticalRectangle: 4 / 5,
  horizontalRectangle: 16 / 9,
}

const AspectRatioPanel: React.FC<AspectRatioPanel> = ({originalAspect, onAspectRatioChange}) => {
  const handleAspectRatio = (aspectRatio: number) => {
    onAspectRatioChange(aspectRatio);
  }

  return (
    <Popover className={styles.relative}>
      <Popover.Panel className={styles.buttonPanel}>
        <button className={styles.button} onClick={() => {handleAspectRatio(originalAspect)}}>
          <span>Оригинал</span><OriginalAspectIcon color={'#fff'}/>
        </button>
        <button className={styles.button} onClick={() => {handleAspectRatio(aspectRatio.square)}}>
          <span>1:1</span><SquareIcon color={'#fff'} />
        </button>
        <button className={styles.button} onClick={() => {handleAspectRatio(aspectRatio.verticalRectangle)}}>
          <span>4:5</span><VerticalRectangle color={'#fff'} />
        </button>
        <button className={styles.button} onClick={() => {handleAspectRatio(aspectRatio.horizontalRectangle)}}>
          <span>16:9</span><HorizontalRectangle color={'#fff'} />
        </button>
      </Popover.Panel>
      <Popover.Button as='div'>
        <Button
          theme={ButtonTheme.CLEAR}
          className={style.sizeButton}
        >
          <Image src={sizePhoto} alt={""} />
        </Button>
      </Popover.Button>
    </Popover>
  );
};

export default AspectRatioPanel

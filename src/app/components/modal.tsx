'use client'
import React from "react";
import Image from "next/image";
import styles from "@/styles/home.module.css"
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  imageSrc: string;
  isVisible: boolean;
  onClose: () => void;
  width: number;
  height: number;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, isVisible, onClose, width, height }) => {
  useEffect(() => {
    if (isVisible) {
      // モーダルが表示されたタイミングでの処理
      document.body.style.overflow = "hidden"; // 背景スクロールを無効にする
    } else {
      // モーダルが非表示になったタイミングでの処理
      document.body.style.overflow = "auto"; // 背景スクロールを有効に戻す
    }
  }, [isVisible]); // isVisible が変わったときにのみ実行される
  return (
    <div className={`${styles['modal-overlay']} ${isVisible ? styles['show'] : ''}`} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e)=>e.stopPropagation()}>
        <button className={styles['close-btn']} onClick={onClose}><FaXmark style={{ width:'25px', height:'auto' }}/></button>
        <Image
          src={imageSrc}
          alt="modal image"
          className={styles['modal-image']}
          width={width}
          height={height}
        />
      </div>
    </div>

  );
};

export default Modal;

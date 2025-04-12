'use client'
import React from "react";
import Image from "next/image";
import styles from "@/styles/home.module.css"
import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  imageSrc: string | null;
  isVisible: boolean;
  onClose: () => void;
  width: number;
  height: number;
}

const Modal: React.FC<ModalProps> = ({ imageSrc, isVisible, onClose, width, height }) => {
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, [isVisible]);
  return (
    <div className={`${styles['modal-overlay']} ${isVisible ? styles['show'] : ''}`} onClick={onClose}>
      <div className={styles['modal-content']} onClick={(e)=>e.stopPropagation()}>
        <button className={styles['close-btn']} onClick={onClose}><FaXmark style={{ width:'25px', height:'auto' }}/></button>
        {imageSrc ?
        (
          <Image
            src={imageSrc}
            alt="modal image"
            className={styles['modal-image']}
            width={width}
            height={height}
            priority
          />
        ):(<></>)
        }
      </div>
    </div>

  );
};

export default Modal;

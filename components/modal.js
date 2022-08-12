import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import styles from "../styles/Home.module.css";

const ModalDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  max-width: 400px;
  height: auto;
  padding: 1rem;
  border: 1px solid #aaa;
  background: #fff;
  border-radius: 10px;
`;
const BackDrop = styled(motion.div)`
  background: black;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
`;
const Modal = ({
  isToggled,
  setToggled,
  closeModal,
  correct,
  data,
  children,
}) => {
  const color = ["green", "red"];
  return (
    <div className={styles.modal}>
      <AnimatePresence>
        {isToggled && (
          <>
            <BackDrop />
            <ModalDiv
              initial={{ y: 10, x: "-50%", opacity: 0 }}
              animate={{ y: 50, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
            >
              <h1 style={{ color: color[(correct + 1) % 2] }}>
                {correct ? "正確" : "錯誤"}
              </h1>
              <h2>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.8,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.4,
                      },
                    },
                  }}
                >
                  答案是
                </motion.div>{" "}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {
                      scale: 0.8,
                      opacity: 0,
                    },
                    visible: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        delay: 0.7,
                      },
                    },
                  }}
                >
                  {" "}
                  <span>{data.ans}</span>
                </motion.div>
              </h2>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {
                    scale: 0.8,
                    opacity: 0,
                  },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 1,
                    },
                  },
                }}
              >
                <h2>
                  AI覺得有 <span>{data.conf}%</span> 的可能是:{" "}
                  <span>{data.ai}</span>
                </h2>
              </motion.div>
              {children}
              <button onClick={closeModal}>Close</button>
            </ModalDiv>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modal;

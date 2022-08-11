import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Main() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bird Sound Recognition</title>
        <meta
          name="description"
          content="A game that lets you guess the physiological stages of zosterops"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
          <h1>來挑戰 AI 吧!</h1>
        </motion.div>
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
                delay: 0.6,
              },
            },
          }}
        >
          <h2>看你能不能辨識不同的鳥類時期</h2>
        </motion.div>
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
          <Link href="/game">
            <button>開始遊戲</button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

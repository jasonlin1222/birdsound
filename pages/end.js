import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { VscDebugRestart } from "react-icons/vsc";
import Router, { useRouter } from "next/router";

export default function End() {
  const router = useRouter();
  const data = router.query;
  const [score, setScore] = useState(data.score);

  useEffect(() => {
    setScore(data.score);
  }, [data.score]);

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
          <h1>你的分數是:</h1>
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
          <h2>{score} / 3</h2>
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
                delay: 1.5,
              },
            },
          }}
        >
          <Link href="/">
            <button>
              再玩一次
              <VscDebugRestart />
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

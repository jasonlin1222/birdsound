import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Game() {
  const [bird1name, setBird1name] = useState("");
  const [bird2name, setBird2name] = useState("");
  const [image1loc, setImage1loc] = useState("");
  const [image2loc, setImage2loc] = useState("");
  const [answer, setAnswer] = useState(0);
  const [selection, setSelection] = useState(0);
  const [start, isStart] = useState(false);

  useEffect(() => {
    if (!start) {
      fetch("http://ai4y.ddns.net:5000/get_bird/", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success == 1) {
            setBird1name(data.bird1);
            setBird2name(data.bird2);
            setImage1loc(data.image1);
            setImage2loc(data.image2);
            setAnswer(data.answer);
            console.log(data);
          } else {
            console.log("unable to fetch backend");
          }
        });
      isStart(true);
    }
  }, [start]);

  const chooseBird = () => {
    if (selection == answer) {
      console.log("correct");
    }
  };

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
          <h1 className={styles.title}>猜一猜這個是什麼時期的綠繡眼？</h1>
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
          whileHover={{
            zIndex: 1,
            scale: [1, 1.4],
            transition: {
              duration: 0.2,
            },
          }}
        >
          <audio controls autoPlay src="">
            Your browser does not support the audio element.
          </audio>
        </motion.div>
        <ul className={styles.grid}>
          <motion.li
            onClick={() => {
              setSelection(1);
              chooseBird();
            }}
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
                  delay: 0.8,
                },
              },
            }}
            whileHover={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              scale: [1, 1.4, 1.2],
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 0.2,
              },
            }}
          >
            <a>
              <Image src={image1loc} alt="bird" width="400" height="400" />
              <h3>{bird1name}</h3>
            </a>
          </motion.li>
          <motion.li
            onClick={() => {
              setSelection(2);
              chooseBird();
            }}
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
            whileHover={{
              position: "relative",
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              scale: [1, 1.4, 1.2],
              rotate: [0, 5, -5, 0],
              transition: {
                duration: 0.2,
              },
            }}
          >
            <a>
              <Image src={image2loc} alt="bird" width="400" height="400" />
              <h3>{bird2name}</h3>
            </a>
          </motion.li>
        </ul>
      </main>
    </div>
  );
}

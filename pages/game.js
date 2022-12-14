import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Modal from "../components/modal";

export default function Game() {
  const router = useRouter();
  const data = router.query;
  const [bird1name, setBird1name] = useState("");
  const [bird2name, setBird2name] = useState("");
  const [image1loc, setImage1loc] = useState("");
  const [image2loc, setImage2loc] = useState("");
  const [soundloc, setSoundloc] = useState("");
  const [ai, setAi] = useState("");
  const [conf, setConf] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [start, isStart] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [correct, isCorrect] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [a, setA] = useState(null);
  const openModal = (_) => {
    setModalVisible(true);
  };
  const closeModal = (_) => {
    setModalVisible(false);
    isCorrect(false);
    isStart(false);
  };

  useEffect(() => {
    load();
  });

  const load = useCallback(() => {
    if (round == 3 && modalVisible == false) {
      Router.push({ pathname: "/end", query: { score } });
    }
    if (!start) {
      fetch("https://bird-game-backend.herokuapp.com/get_bird", {
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
            setSoundloc(data.soundPath);
            setAnswer(data.answer);
            setAi(data.ai);
            setConf(data.conf);
          } else {
            console.log("unable to fetch backend");
          }
        });
      isStart(true);
    }
  }, [round, modalVisible, start, score]);

  const chooseBird = (selection) => {
    if (selection == answer) {
      setScore(score + 1);
      isCorrect(true);
    }
    setRound(round + 1);
    openModal();
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
        <Modal
          isToggled={modalVisible}
          setToggled={openModal}
          closeModal={closeModal}
          correct={correct}
          data={{
            ans: answer == 1 ? bird1name : bird2name,
            ai: ai,
            conf: Math.round(conf * 10000) / 100,
          }}
        />
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
          <h1 className={styles.title}>?????????????????????????????????????????????</h1>
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
          <audio controls src={soundloc}>
            Your browser does not support the audio element.
          </audio>
        </motion.div>
        <ul className={styles.grid}>
          <motion.li
            onClick={() => {
              chooseBird(1);
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
              chooseBird(2);
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

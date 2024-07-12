import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { time, round, goal } from "./atoms";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./App.css";

const Tit = styled.div`
  padding-top: 50px;
  font-size: 45px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
const Center = styled.div`
  padding-top: 120px;
  text-align: center;
`;

const CardWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Colon = styled.span`
  display: block;
  padding: 0 40px;
  color: #fff;
  font-size: 90px;
  animation: colon 1s infinite linear alternate;
  @keyframes colon {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Card = styled(motion.div)`
  background-color: #fff;
  width: 200px;
  padding: 80px 0;
  color: #73c8a9;
  font-size: 90px;
  border-radius: 10px;
`;

const Btn = styled(motion.button)`
  margin-top: 100px;
  width: 100px;
  height: 100px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  width: 100%;
  > div {
    padding: 0 40px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 35px;
    p {
      padding-top: 10px;
      opacity: 1;
      font-size: 25px;
    }
  }
`;

export default function App() {
  const [isPaused, setIsPaused] = useState(true);

  const isTime = useRecoilValue(time);
  const [realTime, setRealTime] = useState(isTime);

  const isRound = useRecoilValue(round);
  const [realRound, setRealRound] = useState(isRound);
  const totalRound = 4; // 기본 값

  const isGoal = useRecoilValue(goal);
  const [realGoal, setRealGoal] = useState(isGoal);
  const totalGoal = 12; // 기본 값

  useEffect(() => {
    let interval: number;

    if (!isPaused) {
      interval = setInterval(() => {
        setRealTime((prev) => {
          if (prev <= 0) {
            setRealRound((prev) => {
              if (prev == totalRound - 1) {
                setRealRound(isRound);
                setRealGoal((prev) => {
                  if (prev == totalGoal - 1) {
                    setRealRound(isRound);
                    setRealGoal(isGoal);
                    setTimeout(() => {
                      alert("참 잘했어용 😘");
                    }, 1000);
                  } else {
                    return prev + 1;
                  }
                });
              } else {
                return prev + 1;
              }
            });
            setIsPaused(true);
            return isTime;
          }
          return prev - 1;
        });
      }, 1000); // 1000이 기본
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [realTime, isPaused]);

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  return (
    <>
      <Tit>⏰ 뽀모도르 타이머 ⏰</Tit>

      <Center>
        <CardWrap>
          <Card
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={`a-${Math.floor(realTime / 60)}`}
          >
            {Math.floor(realTime / 60)
              .toString()
              .padStart(2, "0")}
          </Card>
          <Colon>:</Colon>
          <Card
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={`b-${realTime}`}
          >
            {(realTime % 60).toString().padStart(2, "0")}
          </Card>
        </CardWrap>

        <Btn
          onClick={isPaused ? resumeTimer : pauseTimer}
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1 }}
          transition={{ scale: { type: "spring", stiffness: 500 } }}
        >
          {isPaused ? "Play" : "Stop"}
        </Btn>
      </Center>

      <Bottom>
        <div>
          <div>
            <span>{realRound}</span> / <span>{totalRound}</span>
            <p>ROUND</p>
          </div>
        </div>
        <div>
          <span>{realGoal}</span> / <span>{totalGoal}</span>
          <p>GOAL</p>
        </div>
      </Bottom>
    </>
  );
}

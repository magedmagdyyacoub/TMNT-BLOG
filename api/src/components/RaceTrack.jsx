import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import leo from '../assets/images/leo.png';
import raph from '../assets/images/raph.png';
import doni from '../assets/images/doni.png';
import mickey from '../assets/images/mickey.png';
import barrel from '../assets/images/obstacle.png';

const TrackWrapper = styled.div`
  width: 100%;
  height: 320px;
  background: linear-gradient(to right, #0f0f0f, #1c1c1c);
  position: relative;
  overflow: hidden;
  border: 3px solid lime;
  border-radius: 12px;
  margin-top: 2rem;
`;

const Turtle = styled(motion.img)`
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: ${(props) => props.lane}px;
  z-index: 2;
`;

const Obstacle = styled.img`
  position: absolute;
  width: 40px;
  height: 40px;
  top: ${(props) => props.lane + 10}px;
  z-index: 1;
`;

const FinishLine = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 10px;
  height: 100%;
  background: repeating-linear-gradient(
    to bottom,
    white,
    white 5px,
    black 5px,
    black 10px
  );
  z-index: 1;
`;

const turtleData = [
  { name: 'Leonardo', img: leo, lane: 20 },
  { name: 'Raphael', img: raph, lane: 90 },
  { name: 'Donatello', img: doni, lane: 160 },
  { name: 'Michelangelo', img: mickey, lane: 230 }
];

const RaceTrack = ({ selectedTurtle }) => {
  const [positions, setPositions] = useState([0, 0, 0, 0]);
  const speedRef = useRef([0.4, 0.4, 0.4, 0.4]);
  const [isJumping, setIsJumping] = useState(false);
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const timerRef = useRef(null);
  const animationFrame = useRef(null);

  const selectedIndex = turtleData.findIndex(t => t.name === selectedTurtle);

  const [obstacles] = useState([
    { id: 1, x: 45 },
    { id: 2, x: 70 }
  ]);

  // Timer countdown
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          cancelAnimationFrame(animationFrame.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // Update movement
  useEffect(() => {
    const update = () => {
      setPositions(prev =>
        prev.map((pos, i) => {
          if (pos >= 100) return 100;

          const turtleX = pos;
          const hit = obstacles.some(
            (obs) => turtleX + 2 >= obs.x && turtleX <= obs.x + 3
          );

          if (hit && !(i === selectedIndex && isJumping)) {
            speedRef.current[i] = 0.05;
            setTimeout(() => (speedRef.current[i] = 0.4), 800);
          }

          const newPos = pos + speedRef.current[i];
          if (newPos >= 100 && !winner) {
            setWinner(turtleData[i].name);
            cancelAnimationFrame(animationFrame.current);
            clearInterval(timerRef.current);
          }

          return newPos >= 100 ? 100 : newPos;
        })
      );

      animationFrame.current = requestAnimationFrame(update);
    };

    animationFrame.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame.current);
  }, [isJumping, obstacles, selectedIndex, winner]);

  // Jump on space
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space') {
        if (selectedIndex !== -1 && !isJumping) {
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 600);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, isJumping]);

  return (
    <>
      <div style={{ color: 'white', fontFamily: 'monospace' }}>
        ⏱ Time left: {timeLeft}s
      </div>

      <TrackWrapper>
        <FinishLine />

        {/* Obstacle rendering */}
        {obstacles.map(obs =>
          turtleData.map((turtle, i) => (
            <Obstacle
              key={`obs-${obs.id}-${i}`}
              src={barrel}
              style={{ left: `${obs.x}%` }}
              lane={turtle.lane}
              alt="Obstacle"
            />
          ))
        )}

        {/* Turtle rendering */}
        {turtleData.map((turtle, index) => (
          <Turtle
            key={turtle.name}
            lane={turtle.lane}
            src={turtle.img}
            alt={turtle.name}
            style={{ left: `${positions[index]}%` }}
            animate={
              selectedIndex === index && isJumping
                ? { y: -60 }
                : { y: 0 }
            }
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </TrackWrapper>

      {winner && (
        <div style={{
          textAlign: 'center',
          color: 'yellow',
          fontSize: '1.4rem',
          marginTop: '1.5rem',
          fontFamily: 'Orbitron, sans-serif'
        }}>
          🎉 {winner} wins the race!
        </div>
      )}

      {!winner && timeLeft === 0 && (
        <div style={{ textAlign: 'center', color: 'orange', fontSize: '1.2rem' }}>
          🕒 Time's up! No turtle made it to the finish line.
        </div>
      )}
    </>
  );
};

export default RaceTrack;

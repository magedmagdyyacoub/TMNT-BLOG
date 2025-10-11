import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import cowabunga from "../assets/sounds/cowabunga.mp3";
import booyakasha from "../assets/sounds/booyakasha.mp3";
import turtlepower from "../assets/sounds/turtlepower.mp3";

import { Howl } from "howler";

const sounds = [
  { label: "Cowabunga!", file: cowabunga },
  { label: "Booyakasha!", file: booyakasha },
  { label: "Turtle Power!", file: turtlepower },
];

const Wrapper = styled.div`
  padding: 2rem;
  background: #0a0a0a;
  color:#a020f0;
  font-family: "Press Start 2P", cursive;
  text-align: center;
`;

const SoundButton = styled(motion.button)`
  background: #1c1c1c;
  border: 2px solid#a020f0;
  color: #00ff99;
  padding: 1rem 2rem;
  margin: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #00ff99;
    color: #000;
  }
`;

export default function TMNTSoundboard() {
  const playSound = (src) => {
    const sound = new Howl({ src: [src] });
    sound.play();
  };

  return (
    <Wrapper>
      <h2>🔊 Turtle Soundboard</h2>
      <p>اضغط على الزر لتسمع عبارة أسطورية من السلاحف:</p>
      {sounds.map((s, index) => (
        <SoundButton
          key={index}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => playSound(s.file)}
        >
          {s.label}
        </SoundButton>
      ))}
    </Wrapper>
  );
}

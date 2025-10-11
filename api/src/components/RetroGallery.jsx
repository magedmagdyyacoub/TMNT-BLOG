import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import vhs1 from "../assets/images/vhs1.jpg";
import vhs2 from "../assets/images/vhs2.jpg";
import tmntArcade from "../assets/images/tmnt-arcade.png";

const gallery = [
  {
    src: vhs1,
    title: "TMNT '87 – الحلقة الأولى",
    fact: "دي كانت أول مرة نسمع فيها جملة Cowabunga على التلفزيون الرسمي! 🐢📺",
  },
  {
    src: tmntArcade,
    title: "لعبة الآركيد الأصلية – 1989",
    fact: "اللعبة دي كانت سبب لمعارك أصدقاء كتير: مين هياخد مايكي؟ 😅",
  },
  {
    src: vhs2,
    title: "مشهد الهروب من المجاري",
    fact: "أصوات الركض في المجاري كانت معمولة بعلب بيتزا مهزوزة 🎧",
  },
];

const Wrapper = styled.div`
  background: #111;
  color:#ff0000;
  padding: 2rem;
  font-family: "Press Start 2P", cursive;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const Card = styled(motion.div)`
  width: 250px;
  background: #1a1a1a;
  border: 2px solid #00ff99;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const FactBox = styled.div`
  padding: 1rem;
  background: #000;
`;

export default function RetroGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <Wrapper>
      <h2>🖼️ From Sewer With Love</h2>
      <p>ذكريات نادرة من خزائن المجاري الزمنية:</p>

      <Grid>
        {gallery.map((img, i) => (
          <Card
            key={i}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(img)}
          >
            <Image src={img.src} alt={img.title} />
            <FactBox>
              <strong>{img.title}</strong>
            </FactBox>
          </Card>
        ))}
      </Grid>

      {selected && (
        <motion.div
          style={{ marginTop: "2rem", borderTop: "2px dashed #00ff99", paddingTop: "1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>📼 <strong>{selected.title}</strong></p>
          <p>{selected.fact}</p>
        </motion.div>
      )}
    </Wrapper>
  );
}

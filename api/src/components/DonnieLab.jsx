import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const inventions = [
  {
    name: "جهاز تتبّع الطاقة المتحوّلة",
    icon: "📡",
    description:
      "يقدر يحدد مواقع تحركات شريدر لو لمس أي سطح فيه طاقة شريرة (أو بيتزا فاسدة).",
  },
  {
    name: "قنابل سلايم نيونية",
    icon: "🧪",
    description:
      "تُستخدم لتبطئة الأعداء... وبتطلع صوت عجيب لما تنفجر: كشششش 💥",
  },
  {
    name: "جيت سكيت تحت أرضي",
    icon: "🛹",
    description:
      "لو المجاري مش سالكة، دوني يفعّل السكوتر الطائر ويزحف بين المواسير بـ20 كلم/س!",
  },
];

const Wrapper = styled.div`
  padding: 2rem;
  background: #0d0d0d;
  color: #00ff99;
  font-family: "Press Start 2P", cursive;
  min-height: 100vh;
`;

const Slider = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const Card = styled(motion.div)`
  background: #1a1a1a;
  border: 2px solid #00ff99;
  padding: 1.5rem;
  width: 240px;
  cursor: pointer;
  &:hover {
    background: #00ff99;
    color: #000;
  }
`;

export default function DonnieLab() {
  const [selected, setSelected] = useState(null);

  return (
    <Wrapper>
      <h2>🧪 مختبر دوني</h2>
      <p>اضغط على أي اختراع لمعرفة أسراره التقنية (أو الهزلية):</p>

      <Slider>
        {inventions.map((item, index) => (
          <Card
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelected(item)}
          >
            <h3>{item.icon} {item.name}</h3>
          </Card>
        ))}
      </Slider>

      {selected && (
        <motion.div
          style={{ marginTop: "2rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3>{selected.icon} {selected.name}</h3>
          <p>{selected.description}</p>
        </motion.div>
      )}
    </Wrapper>
  );
}

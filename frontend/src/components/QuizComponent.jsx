import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/quiz.css";

const quizData = [
  {
    question: "من هو قائد فريق السلاحف النينجا؟",
    options: ["ليوناردو", "رافاييل", "مايكل أنجلو", "دوناتيلو"],
    answer: 0,
    explanation: "ليوناردو هو القائد ويستخدم السيوف.",
  },
  {
    question: "أي سلاحف يستخدم الـ ساي كسلاح؟",
    options: ["دوناتيلو", "مايكل أنجلو", "رافاييل", "ليوناردو"],
    answer: 2,
    explanation: "رافاييل يستخدم سلاح الـ ساي ذو الشُعب الثلاث.",
  },
  {
    question: "ما اسم المُعلم الفأر الذي درّبهم؟",
    options: ["شريدر", "سبلينتر", "كرانغ", "أبريل"],
    answer: 1,
    explanation: "سبلينتر هو الفأر الحكيم الذي دربهم على النينجيتسو.",
  },
  {
    question: "من يعشق البيتزا بجنون؟",
    options: ["ليوناردو", "رافاييل", "مايكل أنجلو", "دوناتيلو"],
    answer: 2,
    explanation: "مايكل أنجلو معروف بحبه للبيتزا وشخصيته المرحة.",
  },
  {
    question: "ما لون قناع دوناتيلو؟",
    options: ["أزرق", "أحمر", "بنفسجي", "برتقالي"],
    answer: 2,
    explanation: "دوناتيلو يرتدي قناع بنفسجي وعبقري تقنيًا.",
  },
  {
    question: "من هو العدو الرئيسي للسلاحف؟",
    options: ["كرانغ", "سبلينتر", "بيبوب", "شريدر"],
    answer: 3,
    explanation: "شريدر هو زعيم عشيرة القدم وعدوهم الأول.",
  },
  {
    question: "من هو العبقري التقني في الفريق؟",
    options: ["رافاييل", "دوناتيلو", "مايكل أنجلو", "ليوناردو"],
    answer: 1,
    explanation: "دوناتيلو مسؤول عن التقنيات والاختراعات.",
  },
  {
    question: "من هي الصحفية التي تساعد السلاحف؟",
    options: ["إيرما", "أبريل أونيل", "كيسي", "كاراي"],
    answer: 1,
    explanation: "أبريل أونيل صديقة السلاحف ومراسلة مخلصة.",
  },
  {
    question: "ما اسم العدو الفضائي بجسم آلي؟",
    options: ["كرانغ", "شريدر", "سبلينتر", "بلاكستر"],
    answer: 0,
    explanation: "كرانغ كائن فضائي شرير يسكن جسمًا آليًا.",
  },
  {
    question: "في أي مدينة يعيشون؟",
    options: ["لوس أنجلوس", "نيويورك", "شيكاغو", "سان فرانسيسكو"],
    answer: 1,
    explanation: "السلاحف يحمون شوارع نيويورك من المجاري!",
  },
];

export default function TMNTQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelected(index);
    setShowResult(true);
  };

  const next = () => {
    setSelected(null);
    setShowResult(false);
    setCurrent((prev) => prev + 1);
  };

  const currentQ = quizData[current];

  return (
    <motion.div className="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>{currentQ.question}</h2>
      <ul>
        {currentQ.options.map((opt, idx) => (
          <li
            key={idx}
            onClick={() => handleAnswer(idx)}
            className={selected === idx ? "selected" : ""}
          >
            {opt}
          </li>
        ))}
      </ul>

      {showResult && (
        <motion.div className="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {selected === currentQ.answer ? "✅ صح!" : "❌ خطأ"}
          <p>{currentQ.explanation}</p>
          {current < quizData.length - 1 ? (
            <button onClick={next}>السؤال التالي</button>
          ) : (
            <p>انتهى الكويز! 🐢🍕</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

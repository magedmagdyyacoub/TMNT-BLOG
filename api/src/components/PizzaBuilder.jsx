import React, { useState } from "react";
import { motion } from "framer-motion";
import clickSound from "../assets/sounds/topping.mp3";

// 🧀 استيراد صور العجينة
import thinCrustImg from "../assets/cartoon/thin-crust.png";
import cheeseBurstImg from "../assets/cartoon/cheese-burst.png";
import wholeWheatImg from "../assets/cartoon/whole-wheat.png";

// 🫑 استيراد صور التوبينغز
import pepperoniImg from "../assets/cartoon/2.jpg";
import mushroomsImg from "../assets/cartoon/1.jpg";
import peppersImg from "../assets/cartoon/3.jpg";
import olivesImg from "../assets/cartoon/4.jpg";
import pineappleImg from "../assets/cartoon/6.jpg";
import steakImg from "../assets/cartoon/7.jpg";
import chickenImg from "../assets/cartoon/8.jpg";
import shrimpImg from "../assets/cartoon/9.jpg";

// 🍕 استيراد الصور النهائية
import final1 from "../assets/final-pizzas/final1.png";
import final2 from "../assets/final-pizzas/final2.png";
import final3 from "../assets/final-pizzas/final3.png";
import final4 from "../assets/final-pizzas/final4.png";
import final5 from "../assets/final-pizzas/final5.png";
import final6 from "../assets/final-pizzas/final6.png";

import "../styles/pizza.css";

// العجائن
const bases = [
  { name: "Thin Crust", image: thinCrustImg },
  { name: "Cheese Burst", image: cheeseBurstImg },
  { name: "Whole Wheat", image: wholeWheatImg },
];

// التوبينغز
const toppings = [
  { name: "Pepperoni", image: pepperoniImg },
  { name: "Mushrooms", image: mushroomsImg },
  { name: "Peppers", image: peppersImg },
  { name: "Olives", image: olivesImg },
  { name: "Pineapple", image: pineappleImg },
  { name: "Steak", image: steakImg },
  { name: "Chicken", image: chickenImg },
  { name: "Shrimp", image: shrimpImg },
];

export default function PizzaBuilder() {
  const [base, setBase] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const audio = new Audio(clickSound);

  const finalImages = [final1, final2, final3, final4, final5, final6];

  const toggleTopping = (topping) => {
    audio.currentTime = 0;
    audio.play();
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  return (
    <motion.div
      className="pizza-builder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>🍕 صمّم بيتزتك!</h2>

      {/* اختيار العجينة */}
      <div className="section">
        <h3>اختر العجينة:</h3>
        <div className="options">
          {bases.map(({ name, image }) => (
            <motion.div
              layout
              key={name}
              className={`option ${base === name ? "active" : ""}`}
              onClick={() => {
                audio.currentTime = 0;
                audio.play();
                setBase(name);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={image} alt={name} className="base-image" />
              <p className="label">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* اختيار الإضافات */}
      <div className="section">
        <h3>الإضافات:</h3>
        <div className="options">
          {toppings.map(({ name, image }) => (
            <motion.div
              layout
              key={name}
              className={`option ${selectedToppings.includes(name) ? "active" : ""}`}
              onClick={() => toggleTopping(name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={image} alt={name} className="topping-image" />
              <p className="label">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ملخص الطلب وزر الانتهاء */}
      <div className="summary">
        <h4>🚀 طلبك:</h4>
        <p>عجينة: {base || "لم تختَر بعد"}</p>
        <p>
          الإضافات:{" "}
          {selectedToppings.length
            ? selectedToppings.join(", ")
            : "لا شيء حتى الآن"}
        </p>

        {!showFinalImage && (
          <button
            className="finish-button"
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * finalImages.length);
              setFinalImage(finalImages[randomIndex]);
              setShowFinalImage(true);
            }}
          >
            🎯 انتهيت
          </button>
        )}

        {showFinalImage && finalImage && (
          <div className="final-image">
            <h3>🎉 شكل بيتزتك النهائي:</h3>
            <img src={finalImage} alt="Final Pizza" className="final-pizza-img" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

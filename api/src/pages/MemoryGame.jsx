import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import leo from '../assets/images/leo.png';
import raph from '../assets/images/raph.png';
import doni from '../assets/images/doni.png';
import mickey from '../assets/images/mickey.png';
import april from '../assets/images/april.png';
import beboob from '../assets/images/b.png';
import casey from '../assets/images/casey.png';
import rock from '../assets/images/rock.png';
import shredder from '../assets/images/shredder.png';
import splinter from '../assets/images/splinter.png';
import t from '../assets/images/t.png';
import t1 from '../assets/images/t1.png';
import t2 from '../assets/images/t2.png';
import t3 from '../assets/images/t3.png';
import t4 from '../assets/images/t4.png';
import t5 from '../assets/images/t5.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
const difficulties = {
  easy: 4,
  medium: 8,
  hard: 16
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  background: ${({ flipped, matched, img }) =>
    flipped || matched ? `url(${img}) center/contain no-repeat` : `black`};
  border: 2px solid lime;
  border-radius: 8px;
  cursor: ${({ matched }) => (matched ? 'default' : 'pointer')};
  box-shadow: 0 0 8px lime;
`;

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState(0);
  const [level, setLevel] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const allImages = [leo, raph, doni, mickey, april, beboob, casey, rock, shredder, splinter, t, t1, t2, t3, t4, t5];

  const initGame = (difficulty) => {
    const limit = difficulties[difficulty];
    const selected = allImages.slice(0, limit);
    const shuffled = [...selected, ...selected]
      .map((img) => ({ id: Math.random(), img, matched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setErrors(0);
    setGameOver(false);
    setChoiceOne(null);
    setChoiceTwo(null);
    setLevel(difficulty);
  };

  const handleChoice = (card) => {
    if (!disabled && !card.matched && !gameOver) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        setCards((prev) =>
          prev.map((c) =>
            c.img === choiceOne.img ? { ...c, matched: true } : c
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setErrors((prev) => {
            if (prev + 1 >= 5) {
              setGameOver(true);
            }
            return prev + 1;
          });
          resetTurn();
        }, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const matchedCount = cards.filter(c => c.matched).length;
  const win = level && matchedCount === cards.length;

return (
  <>
    <Header />
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ color: '#0f0', fontFamily: 'Orbitron, sans-serif' }}>🧠 TMNT Memory Match</h2>

      {!level && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => initGame('easy')}>Easy</button>
          <button onClick={() => initGame('medium')} style={{ margin: '0 1rem' }}>Medium</button>
          <button onClick={() => initGame('hard')}>Hard</button>
        </div>
      )}

      {level && (
        <>
          <p style={{ color: 'lime' }}>Errors: {errors} / 5</p>

          <Grid>
            {cards.map((card) => (
              <Card
                key={card.id}
                img={card.img}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                matched={card.matched}
                onClick={() => handleChoice(card)}
              />
            ))}
          </Grid>

          {gameOver && (
            <div style={{ marginTop: '2rem', color: 'red', fontWeight: 'bold' }}>
              ❌ Game Over — You made 5 wrong guesses!
              <br />
              <button onClick={() => setLevel(null)} style={{ marginTop: '1rem' }}>Play Again</button>
            </div>
          )}

          {win && (
            <div style={{ marginTop: '2rem', color: 'gold', fontWeight: 'bold' }}>
              🎉 You Win! Great memory!
              <br />
              <button onClick={() => setLevel(null)} style={{ marginTop: '1rem' }}>Play Again</button>
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
  </>
);

};

export default MemoryGame;

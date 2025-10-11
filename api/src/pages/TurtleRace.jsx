import React, { useState } from 'react';
import RaceTrack from '../components/RaceTrack';
import leo from '../assets/images/leo.png';
import raph from '../assets/images/raph.png';
import doni from '../assets/images/doni.png';
import mickey from '../assets/images/mickey.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const turtles = [
  { name: 'Leonardo', img: leo },
  { name: 'Raphael', img: raph },
  { name: 'Donatello', img: doni },
  { name: 'Michelangelo', img: mickey }
];

const TurtleRace = () => {
  const [selectedTurtle, setSelectedTurtle] = useState(null);

  return (
    <>
      <Header />
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#0f0', fontFamily: 'Orbitron, sans-serif' }}>
        🐢 Turtle Race Arena
      </h2>

      {!selectedTurtle ? (
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {turtles.map((turtle) => (
            <div
              key={turtle.name}
              onClick={() => setSelectedTurtle(turtle.name)}
              style={{
                cursor: 'pointer',
                border: '2px solid lime',
                borderRadius: '10px',
                padding: '1rem',
                textAlign: 'center',
                background: 'black',
                boxShadow: '0 0 15px lime'
              }}
            >
              <img
                src={turtle.img}
                alt={turtle.name}
                style={{ width: '80px', height: '80px' }}
              />
              <h4 style={{ color: 'lime' }}>{turtle.name}</h4>
            </div>
          ))}
        </div>
      ) : (
        <RaceTrack selectedTurtle={selectedTurtle} />
      )}
    </div>
      
      <Footer />
    </>
  );
};

export default TurtleRace;

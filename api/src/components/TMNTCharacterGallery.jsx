import React from 'react';
import styled from 'styled-components';

import r2 from '../assets/r2.png';
import le from '../assets/le.png';
import m2 from '../assets/m2.png';
import d2 from '../assets/d2.png';
import s2 from '../assets/s2.png';
import sh2 from '../assets/sh2.png';
import ro from '../assets/ro.png';
import b2 from '../assets/b2.png';
import ca2 from '../assets/ca2.png';
import tt from '../assets/tt.png';
import k from '../assets/k.png';

const characterImages = [
  { src: r2, name: 'Raphael' },
  { src: le, name: 'Leonardo' },
  { src: m2, name: 'Michelangelo' },
  { src: d2, name: 'Donatello' },
  { src: s2, name: 'Splinter' },
  { src: sh2, name: 'Shredder' },
  { src: ro, name: 'Rocksteady' },
  { src: b2, name: 'Bebop' },
  { src: ca2, name: 'Casey' },
  { src: tt, name: 'Turtle Tank' },
  { src: k, name: 'Korai' }
];

const SectionWrapper = styled.section`
  background: #101010;
  padding: 3rem 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.neonGreen};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonGreen};
  font-size: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 2px;
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 2rem;
  justify-items: center;
`;

const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, filter 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.15);
    filter: drop-shadow(0 0 15px ${({ theme }) => theme.colors.neonGreen});
  }
`;

const CharacterImage = styled.img`
  width: 300px;
  height: 200px;
  object-fit: contain;
  mix-blend-mode: screen;
`;

const CharacterName = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neonOrange};
  text-shadow: 0 0 5px ${({ theme }) => theme.colors.neonOrange};
`;

const TMNTCharacterGallery = () => {
  return (
    <SectionWrapper id='characters'>
      <SectionTitle>Meet the TMNT Crew</SectionTitle>
      <GalleryWrapper>
        {characterImages.map((char, index) => (
          <CharacterCard key={index}>
            <CharacterImage src={char.src} alt={char.name} />
            <CharacterName>{char.name}</CharacterName>
          </CharacterCard>
        ))}
      </GalleryWrapper>
    </SectionWrapper>
  );
};

export default TMNTCharacterGallery;

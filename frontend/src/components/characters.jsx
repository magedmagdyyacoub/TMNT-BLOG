import styled, { keyframes, css } from 'styled-components';
import t1 from '../assets/img/characters/t1.jpg';
import t2 from '../assets/img/characters/t2.jpg';
import t3 from '../assets/img/characters/t3.jpg';
import t4 from '../assets/img/characters/t4.jpg';
import t6 from '../assets/img/characters/t6.jpg';

// تأثير البوردر المتغير حول الصورة الرئيسية
const colorfulBorder = keyframes`
  0% {
    border-image-source: linear-gradient(45deg, #00ffff, #ff2ec4, #ff9900, #ff0000);
  }
  50% {
    border-image-source: linear-gradient(135deg, #ff0000, #00ffff, #ff2ec4, #ff9900);
  }
  100% {
    border-image-source: linear-gradient(45deg, #00ffff, #ff2ec4, #ff9900, #ff0000);
  }
`;

// تأثير اللمعة
const glow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 2px #39ff14); }
  50% { filter: drop-shadow(0 0 12px #39ff14); }
`;

// تأثير الدخول من الاتجاهات المختلفة
const slideFromTop = keyframes`
  from { transform: translateY(-100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideFromLeft = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideFromRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideFromBottom = keyframes`
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Section = styled.section`
  padding: .5rem 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.neonGreen};
  text-shadow: 0 0 10px ${({ theme }) => theme.colors.neonGreen};
  margin-bottom: 2rem;
`;

const MainImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const MainImage = styled.img`
  height: 300px;
  width: auto;
  object-fit: contain;
  border-width: 5px;
  border-style: solid;
  border-image-slice: 1;
  animation: ${colorfulBorder} 4s linear infinite;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const AnimatedImage = styled.img`
  width: 180px;
  height: 250px;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.neonGreen};
  opacity: 0;
  animation: ${({ $anim }) => css`${$anim} 1s ease forwards`}, ${glow} 2s infinite;
`;


export default function Characters() {
  return (
    <Section>
      

      <MainImageWrapper>
        <MainImage src={t1} alt="T1" />
      </MainImageWrapper>

    <Row>
  <AnimatedImage src={t2} alt="T2" $anim={slideFromTop} />
  <AnimatedImage src={t3} alt="T3" $anim={slideFromLeft} />
  <AnimatedImage src={t4} alt="T4" $anim={slideFromRight} />
  <AnimatedImage src={t6} alt="T6" $anim={slideFromBottom} />
</Row>

    </Section>
  );
}

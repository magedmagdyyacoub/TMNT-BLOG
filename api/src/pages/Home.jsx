import Header from '../components/Header';
import Characters from '../components/Characters';
import MutantMediaHighlights from '../components/MutantMediaHighlights';
import TMNTCharacterGallery from '../components/TMNTCharacterGallery';
import YouTubeVideo from '../components/YouTubeVideo';

import Footer from '../components/Footer';
export default function Home() {
  return (
    <>
      <Header />
      <Characters />
      <MutantMediaHighlights />
      <TMNTCharacterGallery />
      <YouTubeVideo title="TMNT Clip" />
    
      <Footer />
    </>
  );
}

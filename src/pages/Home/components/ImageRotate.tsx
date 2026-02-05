import { useEffect, useState } from 'react';
import {
  Wrapper,
  GlassCard,
  ImageTrack,
  SlideImage,
  DotWrapper,
  Dot,
} from './ImageRotate.style';

import Example1 from '/src/assets/images/example1.svg';
import Example2 from '/src/assets/images/example2.svg';
import Example3 from '/src/assets/images/example3.svg';

const images = [Example1, Example2, Example3];
const INTERVAL = 3000;

export default function ImageRotate() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper>
      <GlassCard>
        <ImageTrack currentIndex={currentIndex}>
          {images.map((src, idx) => (
            <SlideImage src={src} key={idx} />
          ))}
        </ImageTrack>

        <DotWrapper>
          {images.map((_, idx) => (
            <Dot key={idx} active={idx === currentIndex} />
          ))}
        </DotWrapper>
      </GlassCard>
    </Wrapper>
  );
}

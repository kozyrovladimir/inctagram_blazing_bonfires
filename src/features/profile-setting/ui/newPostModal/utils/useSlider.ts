import { useState } from "react";

export const useSlider = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + length) % length);
  };

  return {
    currentIndex,
    nextSlide,
    prevSlide
  }
}

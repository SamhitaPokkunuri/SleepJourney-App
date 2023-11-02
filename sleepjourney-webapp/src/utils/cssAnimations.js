import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.2, 1.6);
  }
`;

const rotate = keyframes`
  0%, 100% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(-12deg);
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export { pulse, rotate, scale, slideIn, fadeIn };

import React from 'react';
import './animatedLetters.scss';

interface AnimatedLettersprops {
  letterClass: string,
  strArray: string[],
  idx: number,
}

const AnimatedLetters = ({ letterClass, strArray, idx }: AnimatedLettersprops) => (
  <span style={{ display: 'inline' }} aria-label={strArray.join('')}>
    <span aria-hidden='true'>
      {strArray.map((char: string, i: number) => (
        <span key={char + i} className={`${letterClass} _${i + idx}`}>
          {char}
        </span>
      ))}
    </span>
  </span>
);

export default AnimatedLetters;

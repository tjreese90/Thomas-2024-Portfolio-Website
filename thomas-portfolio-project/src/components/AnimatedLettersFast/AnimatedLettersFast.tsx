import React from 'react';
import './animatedLettersFast.scss';

interface AnimatedLettersFastprops {
  letterClass: string,
  strArray: string[],
  idx: number,
}

const AnimatedLettersFast = ({ letterClass, strArray, idx }: AnimatedLettersFastprops) => (
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

export default AnimatedLettersFast;

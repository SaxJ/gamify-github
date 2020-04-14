import React from 'react';
import Pic from '../../../assets/medal.svg';

const getColour = (score) => {
  if (score > 1000) return 'gold';
  if (score > 500) return 'silver';
  if (score > 10) return 'bronze';
  return 'none';
};

export const Medal = ({ label, score }) => (
  <div className="medal-wrapper">
    <div className="label">{label}</div>
    <div className={`medal ${getColour(score)}`}>
      <Pic />
      <div className="overlay" />
      <div className="hover">{score}</div>
    </div>
  </div>
);

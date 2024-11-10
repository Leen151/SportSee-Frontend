import React from 'react';
import "./icone.scss";

export const Icone = ({icone, bg}) => {
  return (
    <div className={`icone ${bg}`}>
      <img src={icone} alt=""/>
    </div>
  );
};

import React from 'react';
import "./error.scss";

export const Error = ({error}) => {
  return (
    <div className="error-div">
      <p className="error-ping">Oups!</p>

      {error ? (
        <p className="error-text">{error}</p>
      ) : (
        <p className="error-text">La page que vous demandez n'existe pas.</p>
      )}
    </div>
  );
};

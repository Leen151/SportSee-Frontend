import React from "react";
import "./errorPage.scss";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <main className="error-page">

      <p className="error-number">404</p>
      <p className="error-text">Oups! La page que vous demandez n'existe pas.</p>
      
      <Link to="/" className="home-link">Retourner sur la page d’accueil</Link>
    
    </main>
  );
};
 
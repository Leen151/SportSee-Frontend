import React from "react";
import { Link } from "react-router-dom";
import { Error } from "../../components/error/Error";
import "./errorPage.scss";

export const ErrorPage = ({error}) => {
  return (
    <main className="error-page">
      <Error error={error}/>      
      <Link to="/" className="home-link">Retourner sur la page d’accueil</Link>    
    </main>
  );
};
 
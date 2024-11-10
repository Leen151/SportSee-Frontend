import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/Logo.svg";
import "./header.scss";

export const Header = () => {
  return (
    <header className="header">
      <img src={Logo} alt="logo SportSee" className="logo-header"></img>
      <nav className="navbar-primary">
        <NavLink to="/">Accueil</NavLink>
        <NavLink>Profil</NavLink>
        <NavLink>Réglage</NavLink>
        <NavLink>Communauté</NavLink>
      </nav>
    </header>
  );
};

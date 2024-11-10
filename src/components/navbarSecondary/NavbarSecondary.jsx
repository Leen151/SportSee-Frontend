import React from 'react';
import { Icone } from "../icone/Icone";
import "./navbarSecondary.scss";

import Bike from "../../assets/iBike.svg";
import Bodybuilding from "../../assets/iBodybuilding.svg";
import Swim from "../../assets/iSwimming.svg";
import Yoga from "../../assets/iYoga.svg";


export const NavbarSecondary = () => {
  return (
    <div className="sidebar">
      <nav className="navbar-secondary">
        <Icone icone={Yoga} bg="bg-common"/>
        <Icone icone={Swim} bg="bg-common"/>
        <Icone icone={Bike} bg="bg-common"/>
        <Icone icone={Bodybuilding} bg="bg-common"/>
      </nav>

      <div className="copyright">Copyright, SportSee 2020</div>
    </div>  
  );
};

import React from 'react'
import "./navbarSecondary.scss"
import { Icone } from '../icone/Icone'

import Bike from "../../assets/iBike.svg"
import Yoga from "../../assets/iYoga.svg"
import Swim from "../../assets/iSwimming.svg"
import Bodybuilding from "../../assets/iBodybuilding.svg"


export const NavbarSecondary = () => {
  return (
    <div className='sidebar'>
      <nav className='navbar-secondary'>
        <Icone icone={Yoga} bg="bg-common"/>
        <Icone icone={Swim} bg="bg-common"/>
        <Icone icone={Bike} bg="bg-common"/>
        <Icone icone={Bodybuilding} bg="bg-common"/>
      </nav>

      <div className='copyright'>Copyright, SportSee 2020</div>
    </div>  
  )
}

import React from 'react'
import "./keyCard.scss"
import { Icone } from '../icone/Icone'
import { ErrorPage } from "../../pages/errorPage/ErrorPage";

import Fire from "../../assets/iEnergy.svg"
import Chicken from "../../assets/iChicken.svg"
import Apple from "../../assets/iApple.svg"
import Cheeseburger from "../../assets/iCheeseburger.svg"

export const KeyCard = ({keyDataName, value}) => {
  let keyText;
  let bgColorCode;
  let urlIcon;
  let unit;

  switch(keyDataName){
    case "calorieCount":
      keyText =  "Calories";
      bgColorCode = "bg-red"
      urlIcon = Fire
      unit = "kCal"
      break

    case "proteinCount":
      keyText = "Protéines";
      bgColorCode = "bg-blue"
      urlIcon = Chicken
      unit = "g"
      break

    case "carbohydrateCount":
      keyText = "Glucides";
      bgColorCode = "bg-yellow"
      urlIcon = Apple
      unit = "g"
      break

    case "lipidCount":
      keyText = "Lipides";
      bgColorCode = "bg-pink"
      urlIcon = Cheeseburger
      unit = "g"
      break

    default:
      return <ErrorPage />; 
  }

  console.log(urlIcon)


  return (
    <article className="key-card">
      <Icone icone={urlIcon} bg={bgColorCode}/>
      <div className="text">
        <p className="value">{value}{unit}</p>
        <p className="key-texte">{keyText}</p>
      </div>
    </article>
  )
}

import React from 'react';
import "./keyCard.scss";
import { Icone } from "../icone/Icone";
import { ErrorPage } from "../../pages/errorPage/ErrorPage";

import Fire from "../../assets/iEnergy.svg";
import Chicken from "../../assets/iChicken.svg";
import Apple from "../../assets/iApple.svg";
import Cheeseburger from "../../assets/iCheeseburger.svg";

export const KeyCard = ({keyDataName, value}) => {
  /////////formatage des données///////
  const keyDataObject = {
    calorieCount: {
      keyText: "Calories",
      bgColorCode: "bg-red",
      urlIcon: Fire,
      unit: "kCal",
    },
    proteinCount: {
      keyText: "Protéines",
      bgColorCode: "bg-blue",
      urlIcon: Chicken,
      unit: "g",
    },
    carbohydrateCount: {
      keyText: "Glucides",
      bgColorCode: "bg-yellow",
      urlIcon: Apple,
      unit: "g",
    },
    lipidCount: {
      keyText: "Lipides",
      bgColorCode: "bg-pink",
      urlIcon: Cheeseburger,
      unit: "g",
    },
  };

  const keyData = keyDataObject[keyDataName];

  ////////affichage////////
  //cas de nullité
  if (!keyData) {
    return <ErrorPage error="keyDatas : incorrect data" />;
  }

  //rendu des données
  return (
    <article className={`key-card ${keyDataName}`}>
      <Icone icone={keyData.urlIcon} bg={keyData.bgColorCode}/>
      <div className="text">
        <p className="value">{value}{keyData.unit}</p>
        <p className="key-texte">{keyData.keyText}</p>
      </div>
    </article>
  );
};

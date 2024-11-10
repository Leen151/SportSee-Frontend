import React, { useEffect, useState } from 'react';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import { Error } from '../error/Error';
import "./chartScore.scss";


export const ChartScore = ({score}) => {
  //affichage intérmédiaire (cas de nullité)
  if(!score){
    return (
      <article className="chart-score">
        <Error />
      </article>
    )
  }

  ///////formatage des données///////
  const data = [{
    name: "Score",
    value: score,
    fill: "#FF0101"
  }]


  ///////affichage final///////
  //rendre le diamètre du graph responsive
  //barSize donne sa taille au grahique, je cherche donc à rendre cette valeur dynamique
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);  
    //retrait de l'event
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const approximateCardWidth = screenWidth * 0.18;
  const barSize = approximateCardWidth <= 260 ? approximateCardWidth * 0.75 : 260 * 0.75 ;

  //rendu
  return (
    <article className="chart-score">
      <h2 className="title-score-chart">Score</h2> 

        <ResponsiveContainer width="100%">
          <RadialBarChart
            // les 2 à 0 correspondent à un disque plein (pas un donut)
            innerRadius="0%"
            outerRadius="0%"
            data={data}
            startAngle={90}
            endAngle={450} //360 + 90 décalage du au starAngle
          >
          <RadialBar
            data={[{ value: 1 }]} //un "score" de 1 fictif pour avoir le disque blanc complet 
            dataKey="value" 
            barSize={barSize} //c'est cette valeur qui va donner sa taille au graphique
            fill="white"
          />
          <RadialBar
            dataKey="value"
            barSize={10}
            cornerRadius={10}
          />
          </RadialBarChart>
        </ResponsiveContainer>
        
        <div className="legend-chart">
          <p className="legend-score">{Math.round(score * 100)}%</p>
          <p className="legend-text">de votre</p>
          <p className="legend-text">objectif</p>
        </div>
    </article>
  )
}

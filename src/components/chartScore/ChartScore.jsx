import React, { useState, useEffect, useRef } from 'react';
import "./chartScore.scss"

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';


export const ChartScore = ({score}) => {


  // const screenWidth = window.innerWidth;
  // console.log(screenWidth)
  // const articleWidth = articleWidthCalculation(screenWidth)

  // rendre le diamètre du graph responsive
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const articleWidth = articleWidthCalculation(screenWidth);
  const barSize = articleWidth * 0.75;

  const data = [{
      name: "Score",
      value: score,
      fill: "#FF0101"
    }]

  return (
    <article className="chart-score">
      <h2>Score</h2>

        <ResponsiveContainer width="100%" height={260}>
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
            barSize={barSize}
            fill="white"
            isAnimationActive={false}
          />
          <RadialBar
            dataKey="value"
            barSize={10}
            cornerRadius={10}
          />
          </RadialBarChart>
        </ResponsiveContainer>
        
        <div className="legend-chart">
          <p>{Math.round(score * 100)}%</p>
          <p>de votre</p>
          <p>objectif</p>
        </div>
    </article>
  )
}

function articleWidthCalculation(windowWidth){
  const sidebar = 115;
  const margin = 80;
  const gap = 28;
  const nbArticle = 3;
  const partOfScreen = 0.73;

  const toto = (((windowWidth - sidebar - (2 * margin)) * partOfScreen) - (2 * gap))/nbArticle
  return toto
}
import React from 'react'
import "./chartScore.scss"

import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';


export const ChartScore = ({score}) => {
  console.log(score)
  const percentage = Math.round(score * 100);

  const startAngle = 90; // Angle de départ du graphique
  const endAngle = 90 + (360 * score);

  const data = [
    {
      name: "Score",
      value: percentage,
      fill: "#FF0101"
    }
  ]

  return (
    <article className="chart-score">ChartScore
        <div className="background-circle" />

        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart 
            innerRadius="80%" 
            outerRadius="100%" 
            barSize={10} 
            data={data}
            startAngle={startAngle}
            endAngle={endAngle}
          >
            <RadialBar 
              minAngle={15}
              background 
              clockWise 
              dataKey="value"
              cornerRadius={10}
            />

          </RadialBarChart>
        </ResponsiveContainer>
        
        <div className="legend-chart">
          <p style={{ fontSize: 24, margin: 0 }}>{percentage}%</p>
          <p style={{ fontSize: 16 }}>de votre objectif</p>
        </div>
    </article>
  )
}

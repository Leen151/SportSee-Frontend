import React from 'react'
import { getPerformanceByUserId } from '../../data/api'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import "./chartPerformance.scss"

export const ChartPerformance = ({id}) => {
  const datas = getPerformanceByUserId(id);

  const kindTranslations = {
    "cardio": "Cardio",
    "energy": "Energie",
    "strength": "Force",
    "speed": "Vitesse",
    "intensity": "Intensité",
    "endurance": "Endurance"
};

  const perfs = [];

  datas.data.forEach(perf => {
    perfs.push({
      value: perf.value,
      kind: datas.kind[perf.kind]
    })
  })

  console.log(perfs)


  return (
    <article className="chart-perf">
      <ResponsiveContainer height={260}>
        <RadarChart data={perfs}>
          <PolarGrid stroke="#ffffff" radialLines={false}/>
          <PolarAngleAxis dataKey="kind" tick={{ fill: "white" }}/>
          {/* <PolarRadiusAxis/> */}
          <Radar name="Performances" dataKey="value" fill="rgba(255, 1, 1, 0.70)" />
        </RadarChart>
      </ResponsiveContainer>
    </article>
  )
}

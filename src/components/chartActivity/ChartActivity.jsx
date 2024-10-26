import "./chartActivity.scss"
import { getActivityByUserId } from '../../data/api'

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const ChartActivity = ({id}) => {
  const activity = getActivityByUserId(id);
  // const sessions = activity.sessions;

  const sessions = activity.sessions.map((session, index) => {
    session.dayNumber = index + 1; // ajoute une propriété dayNumber à chaque session et sa valeur est deduite de l'index (index+1 pour partir de 1)
    return session;
  });

  let maxWeight = 0;
  sessions.forEach(session => {
    if (session.kilogram > maxWeight) {
      maxWeight = session.kilogram;
    }
  });

  let minWeight = maxWeight;
  sessions.forEach(session => {
    if (session.kilogram < minWeight){
      minWeight = session.kilogram;
    }
  });

  //afin d'avoir une echelle propre (de 2 en 2 si necessaire) il faut savoir si les 2 valeur sont paires ou impaires
  let twiceIsEven = false
  if (minWeight%2 === 0 && maxWeight%2 ===0){
    twiceIsEven = true;
  }

  const legendFormatter = (value) => {
    switch (value) {
      case 'kilogram':
        return 'Poids (kg)';
      case 'calories':
        return 'Calories brûlées (kcal)';
      default:
        return value;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-activity">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}kcal`}</p>
        </div>
      );
    }
    return null;
  };


  return (
    <article className="chart-activity">
      <h2 className="title-activity-chart">Activité Quotidienne</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={sessions}>
          {/* pour n'avoir que les traits horizontaux de la grille + strokeDasharray="3 3" permet que la grille soit en pointillé avec les espace égaux aus trait  */}
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" /> 
          {/* tick : permet de décaler les legende de 10px vers le bas */}
          {/* axisLine=false permet de desactiver l'affichage des axes */}
          {/* tickLine=false permet d'enlever les graduations */}
          <XAxis 
          dataKey="dayNumber" 
          tick={{ dy: 10 }} 
          axisLine={false} 
          tickLine={false}/>          
          <YAxis 
          yAxisId="left" 
          orientation="left" 
          axisLine={false} 
          tickLine={false}/>
          {/* domain permet de définir les valeurs de l'échelle */}
          <YAxis 
          yAxisId="right" 
          orientation="right" 
          domain={[twiceIsEven ? minWeight - 2 : minWeight-1, maxWeight]} 
          axisLine={false} 
          tickLine={false} 
          className="toto"/>
          {/* tooltip est la popup au survol */}
          <Tooltip content={<CustomTooltip />}/>
          <Legend verticalAlign="top" align="right" formatter={legendFormatter} iconType="circle"/>
          
          <Bar dataKey="kilogram" fill="#282D30" barSize={10} radius={[10, 10, 0, 0]} style={{ transform: 'translateX(-5px)' }} yAxisId="right" />          
          <Bar dataKey="calories" fill="#FF0101" barSize={10} radius={[10, 10, 0, 0]} style={{ transform: 'translateX(5px)' }} yAxisId="left" />
        </BarChart>
      </ResponsiveContainer>
    </article>
  )
}

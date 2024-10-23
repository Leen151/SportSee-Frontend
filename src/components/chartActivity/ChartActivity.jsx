import "./chartActivity.scss"
import { getActivityById } from '../../data/api'

import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const ChartActivity = ({id}) => {
  const activity = getActivityById(id);
  const sessions = activity.sessions;
  console.log(sessions)

  const legendFormatter = (value) => {
    switch (value) {
      case 'kilogram':
        return 'Poids (kg)';
      case 'calories':
        return 'Calories brûlées (kCal)';
      default:
        return value;
    }
  };


  return (
    <>
      <div>ChartActivity {id}</div>
      
      <h2>Activité Quotidienne</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" formatter={legendFormatter} />
          <Bar dataKey="kilogram" fill="#282D30" barSize={10} radius={[10, 10, 0, 0]} style={{ transform: 'translateX(-5px)' }}/>
          <Bar dataKey="calories" fill="#FF0101" barSize={10} radius={[10, 10, 0, 0]} style={{ transform: 'translateX(5px)' }}/>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}

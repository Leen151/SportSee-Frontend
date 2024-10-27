import React from 'react'
import "./chartSession.scss"
import { getSessionsByUserId } from '../../data/api'

import { LineChart, Line, XAxis, YAxis, Rectangle, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export const ChartSession = ({id}) => {
  const sessions = getSessionsByUserId(id)
  const sessionTab = sessions.sessions;
  console.log(sessionTab)


  let maxTime = 0;
  sessionTab.forEach(session => {
    if(session.sessionLength>maxTime){
      maxTime = session.sessionLength;
    }
  })

  let minTime = maxTime;
  sessionTab.forEach(session => {
    if(session.sessionLength<minTime){
      minTime = session.sessionLength;
    }
  })
  
  // personnalité la légende de l'axe x 
  const daysOfWeekLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const formattedData = sessionTab.map((session) => ({
    ...session,
    dayLabel: daysOfWeekLabels[(session.day - 1)],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip-session">
          <p>{`${payload[0].value} min`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <article className="chart-session">
      ChartSession
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={formattedData}>
          <XAxis 
          dataKey="dayLabel" 
          tickLine={false}
          axisLine={false}
          padding={{ left: 20, right: 20 }}
          tick={{ fill: "rgba(255, 255, 255, 0.5)" }}
          />
          <YAxis 
          hide={true} 
          domain={[minTime, maxTime]}
          /> 
          <Tooltip content={<CustomTooltip />} cursor={true}/>
          <Line 
          type="monotone" 
          dataKey="sessionLength" 
          stroke="rgba(255, 255, 255, 0.5)" 
          strokeWidth={3} 
          dot={false}       
          />
        </LineChart>
      </ResponsiveContainer>      
    </article> 
  )
}

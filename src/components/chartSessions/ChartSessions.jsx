import React, { useEffect, useState } from 'react';
import { Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getMax, getMin } from '../../helper/helper';
import "./chartSessions.scss";
import { Loader } from "../../components/loader/Loader";
import { Error } from '../error/Error';

import { getSessionsByUserId } from '../../data/dataService';

export const ChartSessions = ({id}) => {
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const userSessions = await getSessionsByUserId(id);
        setSessions(userSessions);
      } catch (error) {
        setError(error.message);
      } 
    };
    fetchSessions();
  }, [id]);

  //affichage intermédiaire
  if (error) {
    return  <Error error={error}/>
  }
  if (!sessions) {
    return <Loader />;
  }
  
  ////////formatage des données///////
  const sessionsTab = sessions.sessions;

  let maxTime = getMax(sessionsTab, "sessionLength")
  let minTime = getMin(sessionsTab, "sessionLength", maxTime)
  
  ///////affichage final///////
  // personnalité la légende de l'axe x 
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const formattedData = sessionsTab.map((session) => {
    session.dayLabel = daysOfWeek[(session.day - 1)];
    return session;
  });

  //personnalisation de l'infobulle
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

  //permet d'avoir une zone plus foncé à droite du curseur
  const CustomCursor = ({ points, width, height }) => {
    const { x, y } = points[0];
    return (
      <Rectangle
        fill="black"
        opacity={0.1}
        x={x}
        y={0}
        width={width}
        height={height+50}
      />
    );
  };

  //rendu des données
  return (
    <article className="chart-session">
      <h2 className="title-sessions-chart">Durée moyenne des <br/>sessions</h2>
      <ResponsiveContainer width="100%">

        <LineChart data={formattedData}>
          <XAxis 
          dataKey="dayLabel" 
          tickLine={false}
          axisLine={false}
          padding={{ left: 5, right: 5 }}
          tick={{ fill: "rgba(255, 255, 255, 0.6)", fontSize: 12 }}          
          />
          <YAxis 
          hide={true} 
          domain={[minTime-10, maxTime+25]}
          /> 
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />}/>
          <Line 
          type="natural" 
          dataKey="sessionLength" 
          stroke="url(#lineGradient)"
          strokeWidth={2}
          activeDot={{
            stroke: '#FFF',
            strokeWidth: 4,
            r: 2,
          }}
          dot={false}       
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "rgba(255, 255, 255, 0.5)"}} />
              <stop offset="100%" style={{ stopColor: "rgba(255, 255, 255, 0.9)"}} />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>      
    </article>
  )
}

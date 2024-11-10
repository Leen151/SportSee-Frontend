import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Loader } from "../../components/loader/Loader";
import { Error } from '../error/Error';
import { getMax, getMin } from "../../helper/helper";
import "./chartActivity.scss";

import { getActivityByUserId } from '../../data/dataService';

export const ChartActivity = ({id}) => {
  ///////récupération des données///////
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const userActivity = await getActivityByUserId(id);
        setActivity(userActivity);
      } catch (error) {
        setError(error.message);
      } 
    };
    fetchActivity();
  }, [id]);

  //affichage intermédiaire
  if (error) {
    return  <Error error={error}/>
  }
  if (!activity) {
    return <Loader />;
  }

  ///////formatage des données///////
  const sessions = activity.sessions.map((session, index) => {
    session.dayNumber = index + 1; // ajoute une propriété dayNumber à chaque session (index+1 pour partir de 1)
    return session;
  });

  let maxWeight = getMax(sessions, "kilogram");
  let minWeight = getMin(sessions, "kilogram", maxWeight);

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

  ///////affichage final///////
  //rendu des données
  return (
    <article className="chart-activity">
      <h2 className="title-activity-chart">Activité Quotidienne</h2>

      <ResponsiveContainer width="100%" >
				<BarChart 
          data={sessions} 
          width="100%"
          barGap={8}
          margin={{
            bottom: 15,
            right: 15,
            left: 20
          }}
          >
					<CartesianGrid vertical={false} strokeDasharray="3 3"/>
					<XAxis
						dataKey="dayNumber"
						tick={{fill: "#74798C", dy: 10}} //couleur + décalage vers le bas des légendes des l'axe x  
						stroke="#DEDEDE" strokeWidth={2} //trait plein et gris pour l'axe x 
						tickLine={false} // permet d'enlever les tirets de graduations
					/>
					<YAxis
						yAxisId="kilogram" //lie l'axe avec 1 des 2 barres
						orientation="right"
						tickMargin={20}
						tick={{ fill: "#74798C"}}
						tickLine={false}
						axisLine={false}
						domain={[minWeight-1, maxWeight]} // defini où commence et fini les graduations de l'axe Y
						tickCount={3} //on aura 3 graduations sur l'axe Y
					/>
          {/* en inversant les axes Y, c'est le 1er qui définie le nombre de lignes de la grille*/}
					<YAxis hide yAxisId="calories" /> 
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }} //change la couleur du bg au survol
					/>
					<Bar          
						dataKey="kilogram"
						fill="#282D30"
            barSize={10}
						radius={[10, 10, 0, 0]}
						name="Poids (kg)" //controle l'affichage de la légende
						yAxisId="kilogram" //liaison avec un axe Y
					/>
					<Bar
						dataKey="calories"
						fill="#FF0101"
            barSize={10}
						radius={[10, 10, 0, 0]}
						name="Calories brûlées (kCal)"
						yAxisId="calories"
					/>
					<Legend            
						verticalAlign="top"
						align="right"
						iconType="circle"
						iconSize="8"
            margin={{
              right: 8 //controle l'écart entre les légendes
            }}            
					/>
				</BarChart>
			</ResponsiveContainer>
    </article>
  )
}

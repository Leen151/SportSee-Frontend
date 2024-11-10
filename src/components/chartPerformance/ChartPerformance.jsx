import React, { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Text } from 'recharts';
import "./chartPerformance.scss";
import { Loader } from "../../components/loader/Loader";
import { Error } from '../error/Error';

import { getPerformanceByUserId } from '../../data/dataService';

export const ChartPerformance = ({id}) => {
  const [datasPerfs, setDatasPerfs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatasPerfs = async () => {
      try {
        const userDatasPerfs = await getPerformanceByUserId(id);
        setDatasPerfs(userDatasPerfs);
      } catch (error) {
        setError(error.message);
      } 
    };
    fetchDatasPerfs();
  }, [id]);

  //affichage intermédiaire
  if (error) {
    return  <Error error={error}/>
  }
  if (!datasPerfs) {
    return <Loader />;
  }

  ///////formatage des données///////
  const kindTranslation = {
    "cardio": { label: "Cardio", order: 6 },
    "energy": { label: "Energie", order: 5 },
    "strength": { label: "Force", order: 3 },
    "speed": { label: "Vitesse", order: 2 },
    "intensity": { label: "Intensité", order: 1 },
    "endurance": { label: "Endurance", order: 4 }
  };

  //création d'un tableau avec la valeur et le nom de la performance(en français) + un int définissant l'ordre souhaité
  const perfs = datasPerfs.data.map(perf => {
    const kindData = datasPerfs.kind[perf.kind]; //correspond au nom de la performance en anglais (data originale)
    return {
      value: perf.value,
      kind: kindTranslation[kindData].label,
      order: kindTranslation[kindData].order
    };
  });

  //tri des données
  const sortedPerfs = perfs.sort((a, b) => a.order - b.order);

  ///////affichage final///////
  /**
   * Fonction pour personnaliser la position et le visuel des textes dans les angles du graph
   * @param payload représente le texte affiché (sortedPerf.kind)
   * @param x et @param y sont les coordonnées du texte
   * @param cx et @param cy sont les coordonnées du centre
   */
  function renderPolarAngleAxis ({ payload, x, y, cx, cy, ...rest }) {
    return (
      <Text
        {...rest}
        verticalAnchor="middle"
        y={y + (y - cy) / 14} // décale d'environ 5px sur l'axe Y
        x={x}
        fill="rgba(255, 255, 255, 0.9)"
        fontSize={12} 
      >
        {payload.value}
      </Text>
    );
  }
  
  //rendu des données
  return (
    <article className="chart-perf">
      <ResponsiveContainer height="80%">
        <RadarChart data={sortedPerfs}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.5)" radialLines={false}/>
          <PolarAngleAxis dataKey="kind" tick={props => renderPolarAngleAxis(props)}/>
          {/* <PolarRadiusAxis/>  */}
          <Radar name="Performances" dataKey="value" fill="rgba(255, 1, 1, 0.70)" />
        </RadarChart>
      </ResponsiveContainer>
    </article>
  )
}
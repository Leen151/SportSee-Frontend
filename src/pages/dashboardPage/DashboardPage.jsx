import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { ChartActivity } from "../../components/chartActivity/ChartActivity";
import { ChartPerformance } from "../../components/chartPerformance/ChartPerformance";
import { ChartScore } from "../../components/chartScore/ChartScore";
import { ChartSessions } from "../../components/chartSessions/ChartSessions";
import { KeyCard } from "../../components/keyCard/KeyCard";
import { Loader } from "../../components/loader/Loader";
import { ErrorPage } from "../errorPage/ErrorPage";
import "./dashboardPage.scss";

import { getUserById } from "../../data/dataService";

export const Dashboard = () => {
  ///////récupération des données///////
  const { id } = useParams();
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, [id]);

  //affichage intermédiare (erreur ou loading)
  if (error) {
    return  <ErrorPage error={error}/>;
  }
  if (!user) {
    return <Loader />;
  }

  ///////formatage des données///////
  let score = user.score || user.todayScore || 0;
  let firstname = user.userInfos.firstName;

  const keyDatas = user.keyData;
  const keyDatasTab = Object.entries(keyDatas); //transforme l'objet en tableau clé valeur
  
  ///////affichage///////
  return (
    <main className="main-dashboard">
      <p className="home-message">Bonjour <span className="firstname" >{firstname}</span></p>
      <p className="congratulations">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      <div className="container">
        <section className="graphs">          
          <ChartActivity id={id} />
          <ChartSessions id={id} />
          <ChartPerformance id={id} />
          <ChartScore score={score} />
        </section>
        <section className="cards-keydata">
          {keyDatasTab ? (
            keyDatasTab.map(([keyName, value]) => (
              <KeyCard key={keyName} keyDataName={keyName} value={value}/>
          ))
          ) : (
            <Error error="Valeurs clés non trouvées."/>
          )}
        </section>
      </div>
    </main>
  );
};

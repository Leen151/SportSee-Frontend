import { useParams } from "react-router-dom";
import { getUserById } from '../../data/api';
import { KeyCard } from "../../components/keyCard/KeyCard";
import { ChartActivity } from "../../components/chartActivity/ChartActivity";
import { ChartPerformance } from "../../components/chartPerformance/ChartPerformance";
import { ChartSession } from "../../components/chartSession/ChartSession";
import { ChartScore } from "../../components/chartScore/ChartScore";
import "./dashboardPage.scss"
import {useState, useEffect} from 'react'


export const Dashboard = () => {

  const { id } = useParams();
  const userId = parseInt(id, 10);
  const user = getUserById(id)

  console.log(user)
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   getUserById(userId)
  //     .then((userData) => {
  //       setUser(userData); 
  //       setError(null);
  //     })
  //     .catch((error) => {
  //       console.error('Erreur lors de la récupération des données:', error);
  //       setError(error.message);
  //     });
  // }, [userId]);




  let firstname = user.userInfos.firstName

  const keyDatas = user.keyData
  // console.log(keyDatas)

  const keyDatasTab = Object.entries(keyDatas);
  // console.log(keyDatasTab)

  // if (error) {
  //   return <p>Erreur: {error}</p>; // Afficher un message d'erreur si une erreur est survenue
  // }

  // if (!user) return <p>Chargement...</p>; // Afficher un message de chargement si les données ne sont pas encore là


  return (
    <main className="main-dashboard">
      <p className="home-message">Bonjour <span className="firstname" >{firstname}</span></p>
      <div className="container">
        <section className="graphs">
          <ChartActivity id={id}/>
          <ChartSession id={id} />
          <ChartPerformance id={id} />
          <ChartScore score={user.score} />
        </section>
        <section className="cards-keydata">
          {keyDatasTab.map(([keyName, value]) => (
            <KeyCard key={keyName} keyDataName={keyName} value={value}/>
          ))}
        </section>
      </div>
    </main>
  )
}

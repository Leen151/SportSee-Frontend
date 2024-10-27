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
  console.log(id)
  //const user = getUserById(id)
  
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  console.log("Le composant Dashboard est chargé.");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id); // Appelle le service
        setUser(userData); // Met à jour l’état avec les données récupérées
      } catch (error) {
        setError(error.message); // Met à jour l’état avec le message d’erreur
      }
    };

    fetchUser(); // Appelle la fonction asynchrone
  }, [id]); // Se déclenche chaque fois que l'ID change


  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!user) {
    return <p>Chargement des données...</p>;
  }

  console.log(user)

  let score = user.score || user.todayScore || 0;

  let firstname = user.userInfos.firstName

  const keyDatas = user.keyData
  console.log(keyDatas)

  const keyDatasTab = Object.entries(keyDatas); //transforme l'objet en tableau clé valeur
  
  return (
    <main className="main-dashboard">
      <p className="home-message">Bonjour <span className="firstname" >{firstname}</span></p>
      <div className="container">
        <section className="graphs">          
          <ChartActivity id={id}/>
          <ChartSession id={id} />
          <ChartPerformance id={id} />
          <ChartScore score={score} />
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

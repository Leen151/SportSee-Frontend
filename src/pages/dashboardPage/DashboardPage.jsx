import { useParams } from "react-router-dom";
import { getUserById } from '../../data/api';
import { KeyCard } from "../../components/keyCard/KeyCard";
import "./dashboardPage.scss"


export const Dashboard = () => {

  const { id } = useParams();
  const user = getUserById(id)
  console.log(user)

  let firstname = user.userInfos.firstName

  const keyDatas = user.keyData
  console.log(keyDatas)

  const keyDatasTab = Object.entries(keyDatas);
  console.log(keyDatasTab)


  return (
    <main className="main-dashboard">
      <p className="home-message">Bonjour <span className="firstname" >{firstname}</span></p>
      <div className="container">
        <section className="graphs">


        </section>
        <section className="cards-keydata">
          {keyDatasTab.map((keyName, value) => (
            <KeyCard key={keyName} keyDataName={keyName} value={value}/>
          ))}
        </section>
      </div>
    </main>
  )
}

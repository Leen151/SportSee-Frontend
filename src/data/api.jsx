import users from "../../public/dataUser.json"
import {useState, useEffect} from 'react'

import activities from "../../public/dataActivity.json"
import performances from "../../public/dataPerformance.json"
import sessions from "../../public/dataSessions.json"

function getUsers(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/public/dataUser.json")
    .then((response) => response.json())
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la récupération des données:", error);
    });
  }, []);

  return users;
}



function getUserById(id){
  return users.find(user => user.id == id);
  // const getUserById = async (userSelected) => {
  //   try {
  //       const response = await fetch(`http://localhost:3000/user/${userSelected}`, {
  //           method: "GET"
  //       })

  //       let data = await response.json();
  //       return data.data;
  //   } catch (error) {
  //       console.error('Erreur UserInfo', error);
  //   }

  // const [user, setUser] = useState();

  // useEffect(() => {
  //   fetch(`http://localhost:3000/user/12`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération du logement:", error);
  //     });
  // }, [id]);

  // return user;
}

// function getUserById(id) {
//   return fetch(`http://localhost:3000/user/${id}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Erreur HTTP: ${response.status}`); //permet de gérer les erreur http qui n'entrerai pas dans le catch
//       }
//       return response.json(); 
//     })
//     .catch((error) => {
//       console.error('Erreur lors de la récupération des données:', error);
//       throw error; 
//     });
// }


function getActivityByUserId(id){
 return activities.find(activity => activity.userId == id)
}

function getPerformanceByUserId(id){
  return performances.find(perf => perf.userId == id)
}

function getSessionsByUserId(id){
  return sessions.find(sessionsUser => sessionsUser.userId == id)
}

export { getUsers, getUserById, getActivityByUserId, getSessionsByUserId, getPerformanceByUserId}
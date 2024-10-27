import users from "./dataUser.json"
import {useState, useEffect} from 'react'

import activities from "./dataActivity.json"
import performances from "./dataPerformance.json"
import sessions from "./dataSessions.json"

function getUsers(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/dataUser.json")
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

// async function getUserById(id) {
//   try {
//     const response = await fetch(`/dataUser.json`);
//     const data = await response.json();

//     // Rechercher l'utilisateur correspondant à l'ID
//     const user = data.find(user => user.id == id);

//     if (!user) {
//       throw new Error(`Utilisateur avec l'ID ${id} non trouvé`);
//     }

//     return user; // Renvoie l'objet utilisateur trouvé
//   } catch (error) {
//     console.error("Erreur dans getUserById:", error);
//     throw error; // Lance l'erreur pour être gérée dans le composant
//   }
// }

async function getUserById(id) {
  try {
    const response = await fetch(`http://localhost:3000/user/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status}: utilisateur avec l'ID ${id} non trouvé`);
    }

    const data = await response.json();
    const user = data.data;
    return user;
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    throw error; // Pour laisser le composant gérer l'erreur
  }
}


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
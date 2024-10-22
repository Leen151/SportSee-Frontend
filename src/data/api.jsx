import users from "../../public/dataUser.json"
import {useState, useEffect} from 'react'

function getUsers(){
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/public/dataUser.json")
    .then((response) => response.json())
    .then((data) => {
      setUsers(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données:", error);
    });
  }, []);

  return users;
}



function getUserById(id){
  return users.find(user => user.id == id);

  // const [user, setUser] = useState();

  // useEffect(() => {
  //   fetch("/public/dataUser.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const foundUser = data.find((user) => user.id == id);
  //       setUser(foundUser);
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de la récupération du logement:", error);
  //     });
  // }, [id]);

  // return user;
}

export { getUsers, getUserById}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../../components/button/Button";
import "./home.scss";

import { getUsers } from "../../data/dataService";

export const Home = () => {
  ///////récupération des données///////
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };    
    fetchUsers();
  }, []);

  ///////affichage///////
  if (!users || users.length === 0) {
    return (
      <main className="main-home">
        <p>Aucun utilisateur trouvé.</p>
      </main>
    );
  } else {
    return (
      <main className="main-home">
        {users.map((user) => (
          <Link key={user.id} to={`/user/${user.id}`}>
            <Button label={user.userInfos.firstName} />
          </Link>
        ))}
      </main>
    );
  }
};



import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Button} from "../../components/button/Button"
import "./home.scss"
import { getUsers } from '../../data/api'

export const Home = () => {
  const users = getUsers();

  return (
    <main className="main-home">
      {users.map((user) => (
        <Link key={user.id} to={`/user/${user.id}`}>          
          <Button firstname={user.userInfos.firstName}/>
        </Link>
      ))}
    </main>
  )
}



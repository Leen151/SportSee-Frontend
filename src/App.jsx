import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import {Dashboard} from "./pages/dashboardPage/DashboardPage"
import { Header } from "./components/header/Header";
import { NavbarSecondary } from "./components/navbarSecondary/NavbarSecondary"
import "./style.scss"

function App() {
  return (
    <>
      <Header />
      <NavbarSecondary />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path="/user/:id" element={<Dashboard/>}/> 
      </Routes>
    </>
  );
}

export default App

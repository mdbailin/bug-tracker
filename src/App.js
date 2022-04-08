import React, { useContext } from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import List from "./pages/list/List";
import Ticketlist from "./pages/ticketlist/Ticketlist";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ticketInputs, userInputs } from './formSource';
import "./style/dark.scss"
import { DarkModeContext } from './context/darkModeContext';
import Tickets from './pages/tickets/tickets';

function App() {

  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>}/>
          <Route path="users">
            <Route index element={<List/>}/>
            <Route path=":userId" element={<Single/>}/>
            <Route path="new" element={<New inputs = {userInputs} title="Add New User"/>} />
          </Route>
          <Route path="tickets">
            <Route index element={<Ticketlist/>}/>
            <Route path=":ticketId" element={<Single/>}/>
            <Route path="new" element={<Tickets/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

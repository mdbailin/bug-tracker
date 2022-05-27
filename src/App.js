import React, { useContext } from 'react';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import ProjectSingle from "./pages/projectSingle/ProjectSingle";
import New from "./pages/new/New";
import NewProject from "./pages/newProject/NewProject";
import UserList from "./pages/userList/UserList"; 
import Ticketlist from "./pages/ticketList/Ticketlist";
import ProjectList from "./pages/projectList/ProjectList";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { userInputs, projectInputs } from './formSource';
import "./style/dark.scss"
import { Navigate } from "react-router-dom";
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';


function App() {

  const { darkMode } = useContext(DarkModeContext)

  const { currentUser } = useContext(AuthContext)
  
  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />;
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login/>}/>
            <Route index element=
              {<RequireAuth>
                <Home />
              </RequireAuth>} 
            />
          <Route path="users">
            <Route index element=
              {<RequireAuth>
                <UserList />
              </RequireAuth>}
            />
            <Route path=":userId" element=
              {<RequireAuth>
                <Single />
              </RequireAuth>}
            />
            <Route path="new" element=
            {<RequireAuth>
              <New inputs = {userInputs} title="Add New User"/>
            </RequireAuth>} 
            />
          </Route>
          <Route path="/tickets/:userId">
            <Route index element=
            {<RequireAuth>
              <Ticketlist />
            </RequireAuth>}
            />
            <Route path=":ticketId" element=
            {<RequireAuth>
              <Single />
            </RequireAuth>}
            />
        </Route>
        <Route path="/projects">
            <Route index element=
              {<RequireAuth>
                <ProjectList />
              </RequireAuth>}
            />
            <Route path=":projectId" element=
            {<RequireAuth>
              <ProjectSingle />
            </RequireAuth>}
            />
          <Route path="new" element=
            {<RequireAuth>
              <NewProject inputs = {projectInputs} title="Add New Project"/>
            </RequireAuth>} 
            />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

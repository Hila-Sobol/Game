import './App.css';
import Login from "./components/Login";
import RoomsArea from './components/RoomsArea'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import React, { useEffect, useState } from 'react';

function App() {
    const [newUser, setNewUser] = useState()

    function handleNewUser(user){
        setNewUser(user)
    }
    

   return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login getUser = {handleNewUser}  />
                </Route>
                <Route exact path="/rooms">
                    <RoomsArea currUser = {newUser}/>
                </Route>  
                <Route path="/rooms/room/">
                    <h1>Welcome to Room!</h1>
                </Route>  
            </Switch>  
        </Router>
    
   ) 
    
}            
export default App;
            
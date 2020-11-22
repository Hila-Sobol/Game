import './App.css';
import Login from "./components/Login";
import RoomsArea from './components/RoomsArea'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import React, { useEffect, useState } from 'react';

function App() {
    const [newUser, setNewUser] = useState("")
    function addToRoom(userName){
        setNewUser(userName)
    }
   return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login onLogin = {addToRoom} />
                </Route>
                <Route path="/rooms">
                    <RoomsArea />
                </Route>  
            </Switch>  
        </Router>
    
   ) 
    
}            
export default App;
            
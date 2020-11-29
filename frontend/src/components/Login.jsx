import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";

function Login(props){
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(0);
    let history = useHistory();
    
    // generating uuid-int
    const UUID = require('uuid-int');
    const generator = UUID(0);
    const uId = generator.uuid();
    
    // setUser - receives event= the input field and sets a uuid and the user name to state hooks 
    function setUser(event){
        setUserId(uId);
        setUserName(event.target.value)
    }
    // handleSubmit - calls handleFormSubmit and sets getUser data(sent to app.jsx)
    function handleSubmit(event) {
        event.preventDefault();
        try {
          console.log(userId);
          handleFormSubmit(); 
          // for app.jsx hook
          props.getUser(
            {
              userName:userName,
              userId: userId
            }
          );
        }
        catch (e) {
            alert(e.message);
        }
    }
    //post user id and userName for createUser.
    const handleFormSubmit = ()=>{
        history.push("/rooms");
        fetch('http://localhost:5000/users/createUser',{
            method :'POST', 
            body: JSON.stringify(
                {userId: userId, userName: userName}
            ),
            headers: {
                'Content-type': 'application/json charset =UTF-8'
            }
        }).then(response => response.json())
          .then(message => console.log(message) )
    }
    return (
        <Router>
        <div className="Login">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                autoFocus
                type="userName"
                value={userName}
                onChange={setUser}
              />
            </Form.Group>
            <Button type="submit" >
              Login
            </Button>
          </Form>
        </div>
        </Router>
      );


}

export default Login
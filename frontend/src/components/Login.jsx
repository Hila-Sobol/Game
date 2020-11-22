import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";

function Login(props){
    const [userName, setUserName] = useState("");
    let history = useHistory();
    
    function handleSubmit(event) {
        event.preventDefault();
        try {
            props.onLogin(userName);
            history.push("/rooms");
        }
        catch (e) {
            alert(e.message);
        }
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
                onChange={(e) => setUserName(e.target.value)}
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
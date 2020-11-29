import React from 'react'
import { useHistory } from 'react-router-dom';


function Room(props){
    let history = useHistory();

    function handleClickedRoom(){
        if ((props.participant1 == 0) || (props.participant2 == 0)){
            history.push("/rooms/"+'room/'+props.id);
            // console.log("user id and room id")
            // console.log(props.currUser.userId)
            // console.log(props.id)
            fetch('http://localhost:5000/rooms/addUserToRoom',{
                method :'POST', 
                body: JSON.stringify(
                    {
                        "roomId": props.id,
                        "userId": props.currUser.userId
                        }
                ),
                headers: {
                    'Content-type': 'application/json charset =UTF-8'
                }
            }).then(response => response.json())
            .then(message => console.log(message) )
        }
        else{
            alert("room is full!")
        }
            
    }

    return (
    <div className="room" onClick = {handleClickedRoom}>
        <h1>{props.id}</h1>
        <p>{props.participant1}</p>
        <p>{props.participant2}</p>
    </div>
    );
    
}
export default Room;
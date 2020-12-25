import React from 'react'
import { useHistory } from 'react-router-dom';


function Room(props){
    let history = useHistory();
    let user_1 = props.participant1
    let user_2 = props.participant2
    function handleClickedRoom(){
        if ((props.participant1 == null) || (props.participant2 == null)){
            history.push("/rooms/"+'room/'+props.id);
            console.log("user id and room id")
            console.log(props.currUser.userId)
            console.log(props.id)
            fetch('http://localhost:5000/rooms/addUserToRoom',{
                method :'POST', 
                body: JSON.stringify({"roomId": props.id, "userId": props.currUser.userId}),
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
    function get_participants(){
        fetch('http://localhost:5000/users')
        .then(response => response.json())
        .then(data => {
            for (const [key, value] of Object.entries(data)) {
                if(value['userId'] === props.participant1){
                    // console.log("##########")
                    // console.log(value['userName'])
                    // console.log(part)
                    user_1 = value['userName']
                }
                if(value['userId'] === props.participant2){
                    user_2 = value['userName']
                }
            }
            return "didn't return a name"
            //  console.log(data)
            }
            );
    }
    //console.log("users:")
    //console.log(user_1 )
    return (
    <div className="room" onClick = {handleClickedRoom}>
        <h1>Room number {props.id.toString()}</h1>
        {get_participants()}
        {/* {get_participant_by_id(props.participant1)} */}
        <p>{user_1}</p>
        <p>{user_2}</p>
    </div>
    );
    
}
export default Room;
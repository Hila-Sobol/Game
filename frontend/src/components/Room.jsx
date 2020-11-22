import React from 'react'

function Room(props){
    return (
    <div className="room">
        <h1>{props.id}</h1>
        <p>{props.participant1}</p>
        <p>{props.participant2}</p>
    </div>
    );
    
}
export default Room;
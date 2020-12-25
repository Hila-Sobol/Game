import '../Room.css';
import Room from './Room';
import React, { useEffect, useState } from 'react';
import useGetURL from '../getURL';

function RoomsArea(props){

    const [{ data, isLoading, isError }, setURL] = useGetURL("http://localhost:5000/rooms")
    const [formattedData, setFormattedData] = useState("");
    const [roomList, setRoomList] = useState([])
    console.log("Rendering");
    //console.log(data)
    //debugger;
    const formatData = (data) => {        
        data.forEach(item => {
            setRoomList( (prevItems)=>
                [...prevItems,
                {
                    id: item.id,
                    participant1: item.participant_1,
                    participant2: item.participant_2
                }]);
        });
        console.log(data)
    }
    
    useEffect(() => {
        if (!isLoading && !isError && data) {
            setFormattedData(formatData(data));
        }    
    }, [isLoading, isError, data])
    
    function handleCreatRoom(){
        fetch('http://localhost:5000/rooms/addRoom',{
                method :'POST', 
                headers: {
                    'Content-type': 'application/json charset =UTF-8'
                                }
            }).then(response => response.json())
            .then(message => console.log(message) )

    }
    return (
        <div className="RoomArea">
            <header className="Rooms-header"></header>
            <h1>Game Rooms</h1>

            <br/>
            <div >
            {roomList.map((room, index)=>(
            <Room
                id = {room.id}
                key = {index}
                participant1 = {room.participant1}
                participant2 = {room.participant2}
                currUser = {props.currUser}
                />))}
            {!isLoading && !isError && formattedData}
            {isLoading && "loading"}
            </div>
            <button onClick = {handleCreatRoom}>Creat New Room</button>
            <div>
            </div>
        </div>
    );
}

export default RoomsArea;
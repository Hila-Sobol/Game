import '../App.css';
import Room from './Room';
import React, { useEffect, useState } from 'react';
import useGetURL from '../getURL';

function RoomsArea(){
    const [{ data, isLoading, isError }, setURL] = useGetURL("http://localhost:5000/rooms")
    const [formattedData, setFormattedData] = useState("");
    const [roomList, setRoomList] = useState([])
    
    console.log("Rendering");
    const formatData = (data) => {        
        data.forEach(item => {
            setRoomList( (prevItems)=>
                [...prevItems,
                {
                    id: item.id,
                    participant1: item.participants[0],
                    participant2: item.participants[1]
                }]);
        });
        console.log(data)
    }
             
    useEffect(() => {
        if (!isLoading && !isError && data) {
            setFormattedData(formatData(data));
        }    
    }, [isLoading, isError, data])
    return (
        <div className="RoomArea">
            <header className="Rooms-header"></header>
            Rooms Screen

            <br/>
            <div>
            {roomList.map((room, index)=>(
            <Room
                id = {room.id}
                key = {index}
                participant1 = {room.participant1}
                participant2 = {room.participant2}
            />))}
            {!isLoading && !isError && formattedData}
            {isLoading && "loading"}
            </div>
        </div>
    );
}

export default RoomsArea;
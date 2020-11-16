import './App.css';

import React, { useEffect, useState } from 'react';

import useGetURL from './getURL';

function App() {
 
  const [{ data, isLoading, isError }, setURL] = useGetURL("http://localhost:5000/rooms")

  const formatData = (data) => {
    let output = ""
    console.log(data)
    data.forEach(room => {
      console.log(data)
      output += `Room id: ${room.id}\n`
      // output += `Participants: 1 - ${room.participants[0]}, 2 - ${room.participants[1]}`
   })
   return output
  }
 
  return (
    <div className="App">
      <header className="App-header">
      </header>
      This is the body
      <br/>
      {!isLoading && !isError && data && formatData(data)}
    </div>
  );
}

export default App;

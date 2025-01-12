

import React, { useState, useEffect, createContext, useContext } from 'react';

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState({ public: [], private: [] });
  const [roomCounts, setRoomCounts] = useState({}); // To track player counts in public rooms
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState({});
  const [round, setRound] = useState(1);
  const totalRounds = 3, totalPlayers = 3;

  return (
    <>
      <RoomContext.Provider value={{
        roomCode, setRoomCode, rooms, setRooms, roomCounts, setRoomCounts, playerName, setPlayerName,
        currentPlayer, setCurrentPlayer, scores, setScores, round, setRound, totalRounds, totalPlayers
      }}>
        {children}
      </RoomContext.Provider>
    </>
  );
};

export const useRoomContext = () => useContext(RoomContext);

export default RoomProvider;
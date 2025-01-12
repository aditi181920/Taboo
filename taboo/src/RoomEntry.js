import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Snackbar,
    Paper
} from '@mui/material';
import { useRoomContext } from './RoomProvider';
import TabooBar from './components/TabooBar';

function RoomEntry() {
    const navigate = useNavigate();
    const { roomCode, setRoomCode, playerName, setPlayerName, rooms, setRooms, roomCounts, setRoomCounts } = useRoomContext();
    const [error, setError] = useState("");
    const [newPrivateRoom, setNewPrivateRoom] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            setRooms((prevRooms) => {
                const updatedRooms = { ...prevRooms };
                updatedRooms.private = updatedRooms.private.filter(room => {
                    const roomTimestamp = room.timestamp || 0;
                    return now - roomTimestamp < 24 * 60 * 60 * 1000;
                });
                return updatedRooms;
            });
        }, 60 * 60 * 1000); // Run every hour, verify this logic later 

        window.addEventListener('beforeunload', handleLogout);

        return () => {
            clearInterval(interval);
            window.removeEventListener('beforeunload', handleLogout);
        };
    }, []);

    const handleLogout = () => {
        console.log("User logged out");
        // Add any additional cleanup logic here if needed
        //check when this is going to work
    };

    const handleJoinRoom = (e) => {
        e.preventDefault();
        setError("");

        if (!playerName.trim()) {
            setError("Player name is required.");
            return;
        }

        if (roomCode.trim()) {
            if (rooms.private.find(room => room.code === roomCode)) {
                console.log(`Player ${playerName} joined private room: ${roomCode}`);
                navigate(`/home`);
            } else {
                setError("Invalid room code. Please try again.");
            }
        } else {
            // Handle public room logic
            let selectedRoom = null;
            let minPlayers = 10;

            for (const room of rooms.public) {
                const count = roomCounts[room] || 0;
                if (count < minPlayers) {
                    selectedRoom = room;
                    minPlayers = count;
                }
            }

            if (selectedRoom && minPlayers < 10) {
                setRoomCounts((prev) => ({
                    ...prev,                         //this kind of functional update helps in making sure that if 2 updates are happing in succession, no matter how fast the updates aree, it won't take stale state and will always pick the most recent state 
                    [selectedRoom]: prev[selectedRoom] + 1
                }));
                console.log(`Player ${playerName} joined public room: ${selectedRoom}`);
                setRoomCode(selectedRoom);
            } else {
                const newRoomCode = `pub${Math.random().toString(36).substr(2, 5)}`;
                setRooms((prev) => ({
                    ...prev,
                    public: [...prev.public, newRoomCode]
                }));
                setRoomCounts((prev) => ({
                    ...prev,
                    [newRoomCode]: 1
                }));
                console.log(`Player ${playerName} created and joined new public room: ${newRoomCode}`);
                setRoomCode(newRoomCode);
            }
            navigate("/home");
        }
    };

    const handleCreatePrivateRoom = () => {
        const newRoomCode = `priv${Math.random().toString(36).substr(2, 5)}`;
        const timestamp = Date.now();
        //add a check here later to make sure the newroomcode createde is unique and does not already exists 
        setRooms((prev) => ({
            ...prev,
            private: [...prev.private, { code: newRoomCode, timestamp }]
        }));
        setNewPrivateRoom(newRoomCode);
        console.log(`New private room created: ${newRoomCode}`);
    };

    return (
        <Box>
            <TabooBar />
            <Box sx={{ p: 4, maxWidth: '600px', margin: 'auto', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: 2, display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Join or Create a Room</Typography>
                <form onSubmit={handleJoinRoom} style={{ marginBottom: '20px' }}>
                    <TextField
                        label="Player Name"
                        variant="outlined"
                        fullWidth
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Room Code (Private)"
                        variant="outlined"
                        fullWidth
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>Join Room</Button>
                </form>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Create a Private Room</Typography>
                <Button variant="contained" color="secondary" fullWidth onClick={handleCreatePrivateRoom}>
                    Create Private Room
                </Button>

                {newPrivateRoom && (
                    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
                        <Typography variant="body1">Your private room code:</Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>{newPrivateRoom}</Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
}

export default RoomEntry;

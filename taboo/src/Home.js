

import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Grid,
    Typography,
    Card,
    CardContent,
    CardHeader,
    Box
} from '@mui/material';
import { Timer, People, Message } from '@mui/icons-material';
import io from 'socket.io-client';
import { gameState } from './data';
import Scoreboard from './components/scoreboard';
import Chatsection from './components/chatsection';
import RoomEntry from './RoomEntry';
import TabooBar from './components/TabooBar';
import GameStatus from './components/GameStatus';

const socket = io('http://localhost:3001');

const Home = () => {
    // const [gameState, setGameState] = useState({
    //   roomCode: '',
    //   players: [],
    //   currentWord: '',
    //   isWordGiver: false,
    //   currentRound: 1,
    //   timeLeft: 60,
    //   guesses: [],
    //   hints: [],
    //   questions: [],
    //   currentTurn: '',
    //   scores: {}
    // });

    const [message, setMessage] = useState('');
    const [guess, setGuess] = useState('');
    const [question, setQuestion] = useState('');
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        // socket.on('playerJoined', ({ players, message }) => {
        //   setGameState(prev => ({ ...prev, players }));
        //   showNotification(message, 'info');
        // });

        // socket.on('gameStarted', ({ wordGiver, currentWord, timeLeft }) => {
        //   setGameState(prev => ({
        //     ...prev,
        //     isWordGiver: socket.id === wordGiver,
        //     currentWord: socket.id === wordGiver ? currentWord : '',
        //     timeLeft
        //   }));
        //   showNotification('Game started!', 'success');
        // });

        // socket.on('hint', (hint) => {
        //   setGameState(prev => ({
        //     ...prev,
        //     hints: [...prev.hints, hint]
        //   }));
        // });

        // socket.on('question', (question) => {
        //   setGameState(prev => ({
        //     ...prev,
        //     questions: [...prev.questions, question]
        //   }));
        // });

        // socket.on('guess', (guess) => {
        //   setGameState(prev => ({
        //     ...prev,
        //     guesses: [...prev.guesses, guess]
        //   }));
        // });

        // socket.on('correctGuess', ({ player, score }) => {
        //   showNotification(`${player} guessed correctly! (+${score} points)`, 'success');
        // });

        // socket.on('timeUpdate', (timeLeft) => {
        //   setGameState(prev => ({ ...prev, timeLeft }));
        // });

        // socket.on('error', (message) => {
        //   showNotification(message, 'error');
        // });

        return () => {
            socket.off('connect');
            socket.off('playerJoined');
            socket.off('gameStarted');
            socket.off('hint');
            socket.off('question');
            socket.off('guess');
            socket.off('correctGuess');
            socket.off('timeUpdate');
            socket.off('error');
        };
    }, []);

    const handleSendMessage = (type) => {
        switch (type) {
            case 'hint':
                if (message.trim()) {
                    socket.emit('sendHint', { roomCode: gameState.roomCode, hint: message });
                    setMessage('');
                }
                break;
            case 'question':
                if (question.trim()) {
                    socket.emit('sendQuestion', { roomCode: gameState.roomCode, question });
                    setQuestion('');
                }
                break;
            case 'guess':
                if (guess.trim()) {
                    socket.emit('makeGuess', { roomCode: gameState.roomCode, guess });
                    setGuess('');
                }
                break;
            default:
                break;
        }
    };


    // Game board component
    const GameBoard = () => (
        <Paper
            elevation={3}
            sx={{
                height: '80%',
                p: 1,
                width: '100%',
                bgcolor: 'grey.100',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0
            }}
        >
            {gameState.isWordGiver ? (
                <Typography variant="h3" align="center" color="primary">
                    Your word is: {gameState.currentWord}
                </Typography>
            ) : (
                <Typography variant="h3" align="center" color="text.secondary">
                    Guess the word!
                </Typography>
            )}
        </Paper>
    );

    return (
        <Box sx={{ width: '100%' }} >
            <TabooBar />

            <Box sx={{ display: 'flex', height: '90vh' }}>
                {/* Left Sidebar - Scoreboard */}
                <Box sx={{ width: "15%" }}>
                    <Scoreboard gameState={gameState} />
                </Box>

                {/* Main Content Area */}
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        marginBottom: '0px',
                        flexDirection: {
                            xs: 'column', // For extra-small and small screens
                            sm: 'column',
                            md: 'row', // For medium and larger screens
                        }
                    }}
                >
                    <Box sx={{ marginLeft: 2, marginRight: 2, marginBottom: 0, width: { md: '55%' }, height: { xs: '60%', sm: '45%', md: '90%' } }}>
                        <GameStatus />
                        <GameBoard />
                    </Box>
                    <Box sx={{
                        width: {
                            xs: '100%', // For extra-small and small screens
                            md: '45%', // For medium and larger screens
                            sm: '100%'
                        }, display: 'flex', height: { xs: '70%', sm: '55%', md: '100%' }
                    }}>
                        <Chatsection />
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default Home;

/*
add logic to store current private rooms and  public rooms 
public room, alot randomly
private room, check if th room code actually exists 
if yes then enter
or throw error not a valid romm code 
*/
import React, { useState, useEffect } from 'react'
import { useRoomContext } from '../RoomProvider'
import { Grid, Typography, Paper, Modal, Box, Button } from '@mui/material';
import { People, Timer } from '@mui/icons-material';
import { gameState } from '../data';
import { grey } from '@mui/material/colors';


function GameStatus() {
    const { currentPlayer, setCurrentPlayer, round, setRound, totalRounds, totalPlayers } = useRoomContext();
    const [timer, setTimer] = useState(60);
    const [showModal, setShowModal] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            handleTurnEnd();
        }
        console.log(currentPlayer, round);
    }, [timer]);

    const handleTurnEnd = () => {
        // Logic to switch to the next player
        //Modal logic
        //when modal gets closed on timeout.. then setTimer should be triggered
        // Update player and round
        if (currentPlayer === totalPlayers && round === totalRounds) {
            //end game logic ... do to a new page.. show results and give a option to either quit or play again
            //play again means we are making it players play in the same room, no room change
        }
        const nextPlayer = currentPlayer === totalPlayers ? 0 : currentPlayer + 1;
        const nextRound = currentPlayer === totalPlayers ? round + 1 : round;
        setShowModal(true);
        setTimer(0); // Reset timer for the modal
        setTimeout(() => {
            setShowModal(false); // Hide modal after 10 seconds
        }, 10000);

        // Wait logic for other players
        setIsWaiting(true);
        setTimeout(() => {
            setIsWaiting(false);
            setCurrentPlayer(nextPlayer);
            setRound(nextRound);
            setTimer(60); // Reset timer for the next turn
        }, 10000);


    };
    // Update currentPlayer and round logic here

    const handleClose = () => {
        const nextPlayer = currentPlayer === totalPlayers ? 0 : currentPlayer + 1;
        const nextRound = currentPlayer === totalPlayers ? round + 1 : round;
        setShowModal(false);
        setIsWaiting(false);
        setCurrentPlayer(nextPlayer);
        setRound(nextRound);
        setTimer(60); // Reset timer for the next turn
    };
    return (
        <>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            ><>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography id="modal-title" variant="h6" component="h2" sx={{
                            fontSize: {
                                xs: '0.75rem', // Small screens
                                sm: '0.85rem',    // Medium screens
                                md: '0.90rem', // Large screens
                            },
                        }}>
                            Choose any one
                        </Typography>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between', flexDirection: {
                                xs: 'column', // For extra-small and small screens
                                sm: 'row',
                                md: 'row', // For medium and larger screens
                            },
                        }}>
                            <Button variant="outlined" onClick={handleClose} sx={{
                                mt: 2, color: 'black', borderColor: grey[500], // Border color
                                "&:hover": {
                                    borderColor: "purple", // Border color on hover
                                },
                                fontSize: {
                                    xs: '0.75rem', // Small screens
                                    sm: '0.85rem',    // Medium screens
                                    md: '0.90rem', // Large screens
                                },
                            }}>
                                Word1
                            </Button>
                            <Button variant="outlined" onClick={handleClose} sx={{
                                mt: 2, color: 'black', borderColor: grey[500], // Border color
                                "&:hover": {
                                    borderColor: "purple", // Border color on hover
                                },
                                fontSize: {
                                    xs: '0.75rem', // Small screens
                                    sm: '0.85rem',    // Medium screens
                                    md: '0.90rem', // Large screens
                                },
                            }}>
                                Word2
                            </Button>
                            <Button variant="outlined" onClick={handleClose} size="small" sx={{
                                mt: 2, color: 'black', borderColor: grey[500], // Border color
                                "&:hover": {
                                    borderColor: "purple", // Border color on hover
                                },
                                fontSize: {
                                    xs: '0.75rem', // Small screens
                                    sm: '0.85rem',    // Medium screens
                                    md: '0.90rem', // Large screens
                                },
                                typography: 'body2',


                            }} >
                                Word3
                            </Button>
                        </Box>
                    </Box></></Modal>
            <Paper elevation={3} sx={{ p: 1, width: '100%', height: '3%', borderRadius: 0, paddingTop: 2, paddingBottom: 3 }}>
                <Grid container justifyContent="space-around" alignItems="center">
                    <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Timer />
                        <Typography variant="h6" sx={{
                            fontSize: {
                                xs: '0.75rem', // Small screens
                                sm: '0.85rem',    // Medium screens
                                md: '0.90rem', // Large screens
                            },
                        }}>Time: {timer}s</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <People />
                        <Typography variant="h6" sx={{
                            fontSize: {
                                xs: '0.75rem', // Small screens
                                sm: '0.85rem',    // Medium screens
                                md: '0.90rem', // Large screens
                            },
                        }}>Players: {gameState.players.length}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" sx={{
                            fontSize: {
                                xs: '0.75rem', // Small screens
                                sm: '0.85rem',    // Medium screens
                                md: '1rem', // Large screens
                            },
                        }}>Round: {round}/3</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default GameStatus
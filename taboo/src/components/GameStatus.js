import React, { useState, useEffect } from 'react'
import { useRoomContext } from '../RoomProvider'
import { Grid, Typography, Paper, Modal, Box, Button } from '@mui/material';
import { People, Timer } from '@mui/icons-material';
import { gameCards, gameState } from '../data';
import { grey } from '@mui/material/colors';
import _ from 'lodash';


function GameStatus() {
    const { currentPlayer, setCurrentPlayer, round, setRound, totalRounds, totalPlayers } = useRoomContext();
    const [timer, setTimer] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);  //iswaiting needs to be used somehow
    const [curwordIndex, setCurWordIndex] = useState(0);
    const [wordindexes, setWordIndexes] = useState([0, 1, 2]);
    const [showCardModal, setShowCardModal] = useState(false);
    const buttons = Array.from({ length: 3 }, (_, index) => index);

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
        const nextPlayer = currentPlayer === (totalPlayers - 1) ? 0 : currentPlayer + 1;  //since currentplayer is 0 indexed and totalplayer is 1 indexed
        const nextRound = currentPlayer === (totalPlayers - 1) ? round + 1 : round;
        const sz = gameCards.length;
        const range = _.range(0, sz);
        const randomNumbers = _.sampleSize(range, 3); // Get 3 distinct random numbers
        setWordIndexes(randomNumbers);
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

    const handleClose = (index) => {
        const nextPlayer = currentPlayer === (totalPlayers - 1) ? 0 : currentPlayer + 1;
        const nextRound = currentPlayer === (totalPlayers - 1) ? round + 1 : round;
        setCurWordIndex(wordindexes[index]);
        setIsWaiting(false);
        setCurrentPlayer(nextPlayer);
        setRound(nextRound);
        setShowModal(false);
        setTimer(60); // Reset timer for the next turn
    };
    return (
        <>
            <Modal
                open={showModal}
                onClose={() => handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
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
                        {buttons.map((index) => (
                            <Button variant="outlined" onClick={() => handleClose(index)} key={index} sx={{
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
                                {gameCards[wordindexes[index]].cardName}
                            </Button>
                        ))
                        }
                    </Box>
                </Box>
            </Modal>
            <Modal
                open={showCardModal}
                onClose={() => setShowCardModal(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"

            >
                <Box sx={{
                    bgcolor: "background.paper",
                    position: 'absolute',
                    top: "30%",
                    left: "50%",
                    borderRadius: 2,
                    width: 200,
                    justifyContent: 'center',
                }}>
                    <Typography sx={{ backgroundColor: 'peachpuff', justifyContent: 'center', p: 1 }} variant="h6" component="h2">
                        {gameCards[curwordIndex].cardName}
                    </Typography>
                    {[...gameCards[curwordIndex].tabooWords].map((word, index) => (
                        <Typography key={index} sx={{ p: 1, border: 1, borderColor:'grey' }}>{word}</Typography>
                    ))}
                </Box>



            </Modal>
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
                    <Grid item>
                        <Button
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => setShowCardModal(true)}>
                            <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>{gameCards[curwordIndex].cardName}</Typography>
                            <Typography sx={{ fontSize: '8px', color: 'black', fontWeight: 'bold' }}>Click to see TABOO words</Typography>

                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default GameStatus
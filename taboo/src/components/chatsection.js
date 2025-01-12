import React from 'react'
import { Grid, Box } from '@mui/material';
import ChatWindow from './ChatWindow';

function Chatsection() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: {
                xs: 'row', // For extra-small and small screens
                sm: 'row',
                md: 'column', // For medium and larger screens
            }, flex: 1, justifyContent: 'space-between', height: '100%'
        }}>
            {/*(!gameState.isWordGiver && gameState.currentTurn === socket.id) ? */
                true ?
                    (
                        // Player's turn - show hints and questions
                        <>
                            <Grid item xs={12} flex={1} m={1} sx={{ height: { md: '40%', sm: '90%', xs: '90%' } }}>
                                <ChatWindow
                                    title="Hints"
                                    isDisabled={false}
                                    placeholder="Hints will appear here"
                                    currentUser="Aditi"
                                />

                            </Grid>
                            <Grid item xs={12} flex={1} m={1} sx={{ height: { md: '40%', sm: '90%', xs: '90%' } }}>
                                <ChatWindow
                                    title="Questions"
                                    isDisabled={false}
                                    placeholder="Ask your question..."
                                    currentUser="Alice"
                                />

                            </Grid>
                        </>
                    ) : (
                        // Not player's turn - show guesses
                        <>
                            <Grid item xs={12} height='50%'>
                                <ChatWindow
                                    title="Guess"
                                    isDisabled={false}
                                    placeholder="Make your guess..."
                                    currentUser="Alice"
                                />

                            </Grid>
                            <Grid item xs={12} height='50%'>
                                <ChatWindow
                                    title="Questions"
                                    isDisabled={false}
                                    placeholder="Ask your question..."
                                    currentUser="Alice"
                                />
                            </Grid>
                        </>
                    )}
        </Box>
    )
}

export default Chatsection
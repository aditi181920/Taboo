import React from 'react'
import { gameState } from '../data'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { Casino } from '@mui/icons-material'

function TabooBar() {
    return (
        <AppBar position="static"
            sx={{
                backgroundColor: "mediumpurple", // Replace with your desired color
                color: "white", // Adjust text color for contrast
            }}
        >
            <Toolbar>
                <Casino sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TABOO
                </Typography>
                {gameState.roomCode && (
                    <Typography>Room: {gameState.roomCode}</Typography>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default TabooBar
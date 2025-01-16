import React, { useState, useRef } from 'react';
import {
    CardHeader,
    Paper,
    Typography,
    TextField,
    IconButton,
    CardContent,
} from '@mui/material';
import { Message } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

function ChatWindow({ title, isDisabled, placeholder, currentUser }) {
    const [messages, setMessages] = useState([]); // Store chat messages
    const [inputValue, setInputValue] = useState(''); // Store current input value
    const scrollRef = useRef(null); // Ref for auto-scrolling

    // Function to handle sending a message
    const handleSend = () => {
        if (inputValue.trim() === '') return; // Ignore empty messages

        const newMessage = { player: currentUser || 'User', text: inputValue.trim() };

        setMessages((prevMessages) => [...prevMessages, newMessage]); // Append message
        setInputValue(''); // Clear input field

        // Scroll to bottom of the chat
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 100);
    };

    return (
        <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardHeader
                title={
                    <Typography variant="h8" sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: {
                            xs: '0.75rem', // Small screens
                            sm: '0.85rem',    // Medium screens
                            md: '0.90rem', // Large screens
                        },
                    }}>
                        <Message fontSize="small" />
                        {title}
                    </Typography>
                }
                sx={{
                    height: '3%',
                    padding: '3%'
                }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, paddingTop: '0px', paddingBottom: '1%' }}>
                {/* Message Area */}
                <div
                    style={{
                        border: '1px solid lightgrey',
                        display: 'flex',
                        //flexWrap: 'wrap',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        height: '100%',

                    }}
                >
                    {messages.map((msg, i) => (
                        <Paper
                            key={i}
                            elevation={1}
                            sx={{
                                p: 0.5,
                                bgcolor: 'grey.100',
                                wordBreak: 'break-word', // Prevents long words from overflowing
                            }}
                        >
                            <Typography variant="body2" sx={{
                                fontSize: {
                                    xs: '0.60rem', // Small screens
                                    sm: '0.65rem',    // Medium screens
                                    md: '0.70rem', // Large screens
                                },
                            }}> {/* Use appropriate typography variant */}
                                <strong>{msg.player}:</strong> {msg.text}
                            </Typography>
                        </Paper>
                    ))}
                </div>
            </CardContent>


            {/* Input Area */}
            <div style={{ display: 'flex', paddingLeft: 15, paddingBottom: 1, height: '7%', marginTop: 10, marginBottom: 10 }}>
                <TextField
                    fullWidth
                    size="small"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()} // Send on Enter key
                    sx={{
                        width: '90%',
                        '& .MuiInputBase-root': {
                            height: '100%',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: {
                                xs: '0.65rem', // Small screens
                                sm: '0.75rem',    // Medium screens
                                md: '0.80rem', // Large screens
                            }, height: '100%',
                            padding: 0.8,
                        },
                    }}
                />
                <IconButton
                    onClick={handleSend}
                    disabled={isDisabled || inputValue.trim() === ''}
                    sx={{
                        color: isDisabled || inputValue.trim() === '' ? 'grey.500' : 'primary.main',
                        padding: '1px',
                        margin: 1,
                    }}
                >
                    <SendIcon fontSize="small" />
                </IconButton>
            </div>
        </Paper >
    );
}

export default ChatWindow;






// Scoreboard component - now a vertical layout
import { Box, Paper, Typography } from '@mui/material';
import { use } from 'react';
import { useRoomContext } from '../RoomProvider';
const Scoreboard = (props) => {
  const { currentPlayer } = useRoomContext();
  console.log('currentplayer:',currentPlayer);
  return (

    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
      }}
    >
      <Typography variant="h6" sx={{
        mb: 2, fontSize: {
          xs: '0.75rem', // Small screens
          sm: '0.85rem',    // Medium screens
          md: '1rem', // Large screens
        },
      }}>Scoreboard</Typography>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {props.gameState.scores.map((curscore, index) => (
          <Paper
            key={index} // Use `index` only if `player` values aren't unique
            elevation={1}
            sx={{
              padding: 1,
              bgcolor: index & 1 ? 'grey.300' : 'grey.50',
              border: index === currentPlayer ? '2px solid #1976d2' : 'none'
            }}
          >
            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'start' }}>
              <div style={{ width: '30%' }}>
                <Typography variant="subtitle1" sx={{
                  fontSize: {
                    xs: '0.70rem', // Small screens
                    sm: '0.80rem',    // Medium screens
                    md: '0.90rem', // Large screens
                  },
                }}>#{curscore?.rank}</Typography>
              </div>
              <div>
                <Typography variant="subtitle1" sx={{
                  fontSize: {
                    xs: '0.70rem', // Small screens
                    sm: '0.80rem',    // Medium screens
                    md: '0.90rem', // Large screens
                  },
                }}>{curscore?.player || 'Unknown Player'}</Typography>
                <Typography variant="h10" sx={{
                  fontSize: {
                    xs: '0.65rem', // Small screens
                    sm: '0.75rem',    // Medium screens
                    md: '0.85rem', // Large screens
                  },
                }}>{curscore?.score || 0} points</Typography>
              </div>
              {/*make the usere enter name with a limit on length so it does not overeflow */}
            </div>
          </Paper>
        ))}

      </Box>
    </Paper>
  );
};

export default Scoreboard;

import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext'
import {useNavigate} from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


function CountdownView(props) {

    const { getSocket } = useContext(SocketContext);

    let socket = getSocket();
    

    const modal = {
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const center = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '50vw',
        fontSize: '20px',
        backgroundColor: 'RGBA(19,36,57,0.8)',
        color: "#ffffff",
        borderRadius: '25px'
      };

    const messages = {
        finding: "Finding a match...",
        found: "Match found!",
        notFound: "Sorry, no match found"
    }


    //three possible states for matching status: match-finding, match-success, and match-fail
    const[matchingStatus, setMatchingStatus] = useState('match-finding');
    const navigate = useNavigate();

    useEffect( () => {
        socket.on("connect", () => {
            console.log(socket.connected); // true
          });
        
        socket.on("match-success", (firstClientSocketId, secondClientSocketId, questionData) => {
            setMatchingStatus('match-success');
            console.log(firstClientSocketId);
            navigate('/roompage', {state: { roomId: firstClientSocketId,
                secondClientSocketId: secondClientSocketId,
                questionData: questionData }} );
            }
        );

    }, []);


    if (!props.show) {
        return null;
    }

        

    const insideCircle = ({remainingTime}) => {
        if (remainingTime === 0) {
            return "Sorry, no match found";
        } else {
             return `${remainingTime}`;
    }}

    return (
        <div style={modal}>
            <div style={center}>
                <CountdownCircleTimer 
                    size={240}
                    isPlaying
                    duration={30}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[30, 20, 10, 0]}
                    strokeWidth={12}
                    onComplete= {() => {
                        setMatchingStatus('match-fail')
                        socket.emit('no-match-found');
                        console.log('failed');
                    }}
                >
                    {insideCircle}
                </CountdownCircleTimer> 

                <Typography sx={{margin: '1.2em'}}>
                    {matchingStatus === 'match-fail' && "Try again later!"}
                    {matchingStatus !== 'match-fail' && messages.finding}
                </Typography> 
              
                <Button variant="contained" sx={{margin: '0.6em', borderRadius: '25px'}} 
                    onClick={() => {
                        if (matchingStatus === 'match-finding') {
                            socket.emit('match-cancel');
                        }
                        setMatchingStatus('match-finding');
                        props.handleCloseModal();
                     }}> Cancel </Button>
            </div>
        </div>
    )
}

export default CountdownView;

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DifficultyCard from './DifficultyCard';
import CountdownView from './CountdownView';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../../Util';

import './SelectionView.css';

export default function SelectionView() {

    const difficultyLevels = ["easy", "medium", "hard"];
    const [showModal, setShowModal] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
      ensureLoggedIn(navigate);
    })


    const handleOpenModal = () => {
      setShowModal(true);
  
    }

    const handleCloseModal = (e) => {
      setShowModal(false);
    }

    return (
    <Box backgroundColor={"#132439"} height={"85vh"} display={"flex"} flexDirection={"column"} padding={"4rem"}>
      <Box className="matchWrapper" display={"flex"} flexDirection={"column"} sx={{alignItems: 'center', flexGrow: 1, margin: 'auto', maxWidth:'100%'}}>
          {/* <Typography margin="16px" variant="h4" color={"#ffffff"}> Choose a Difficulty Level </Typography> */}
          <div className="matchContainer">
            <div className="matchTextWrapper">
              <p className="matchTitle">Choose a Difficulty Level</p>
              <p className="matchDescription">We will find you a match with the same difficulty level.</p>
              <p className="matchDescription">The next step involved waiting to be matched!</p>
            </div>
            <Grid className="matchCardWrapper" container spacing={2}>
            {difficultyLevels.map(difficultyLevel =>
                    <Grid key={difficultyLevel} item xs={'auto'}>
                        <DifficultyCard difficulty={difficultyLevel} handleOpenModal={handleOpenModal}/>
                    </Grid>)}
                    <CountdownView show={showModal} handleCloseModal={handleCloseModal} />
            </Grid>
          </div>
      </Box>
    </Box>
      );
    }
    




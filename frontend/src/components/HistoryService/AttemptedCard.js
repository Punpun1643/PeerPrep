import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import sapling from '../../images/sapling.png';
import youngtree from '../../images/youngtree.png'
import tree from '../../images/tree.png';
import CircularStatic from './CircularStaticWithLabel';
import { Box } from "@mui/material";

function AttemptedCard(props) {
    const difficultyImageMap = { "easy": sapling, "medium": youngtree, "hard": tree }
    const difficultyTextMap = {
        "easy": "Beginner Friendly",
        "medium": "Intermediate Level",
        "hard": "Advanced Concepts"
    }
    const difficultyColorMap = {
        "easy": "#4caf50",
        "medium": "#ffca28",
        "hard": "#d32f2f"
    }

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <Card sx={{
            width: 345, backgroundColor: "#3370FF", borderRadius: "20px"
        }}>
            <CardMedia
                component="img"
                height="140"
                image={difficultyImageMap[props.difficulty]}
                alt="Difficulty Image"
                sx={{ objectFit: "contain", backgroundColor: 'white' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="white" style={{ fontWeight: "bold" }}>
                    {capitalizeFirst(props.difficulty)} x {props.numberOfAttempted}
                </Typography>
                <Typography variant="body2" color="white" sx={{ marginBottom: 2 }}>
                    {difficultyTextMap[props.difficulty]}
                </Typography>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    {props.difficulty === 'easy' &&  <CircularStatic style={{ backgroundColor: "#05CE91"}} progress={props.numberOfAttempted / 20 * 100} />}
                    {props.difficulty === 'medium' &&  <CircularStatic style={{ backgroundColor: "#F6C15C"}} progress={props.numberOfAttempted / 20 * 100} />}
                    {props.difficulty === 'hard' &&  <CircularStatic style={{ backgroundColor: "#C7254E"}} progress={props.numberOfAttempted / 20 * 100} />}
                    {/* <CircularStatic progress={props.numberOfAttempted / 60 * 100} /> */}
                </Box>
            </CardContent>
        </Card >
    );
}

export default AttemptedCard;

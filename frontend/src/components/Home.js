import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ensureLoggedIn } from '../Util';
import CreateIcon from '@mui/icons-material/Create';
import './Home.css';
import AttemptedCard from './HistoryService/AttemptedCard';
import { URL_HISTORY_SVC } from "../configs";

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));
    const [questionRecords, setQuestionRecords] = useState([]);
    const [easyQuestions, setEasyQuestions] = useState([]);
    const [mediumQuestions, setMediumQuestions] = useState([]);
    const [hardQuestions, setHardQuestions] = useState([]);


    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
        //getAttemptedQuestions();
        getEasyAttemptedQuestions();
        getMediumAttemptedQuestions();
        getHardAttemptedQuestions();
    }, [])

    const handleStartGrind = (e) => {
        navigate("/selectquestiondifficulty");
    }

    const getAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username)
            .then(response => {
                setQuestionRecords(response.data.data.records);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getEasyAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=easy')
            .then(response => {
                setEasyQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getMediumAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=medium')
            .then(response => {
                setMediumQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getHardAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=hard')
            .then(response => {
                setHardQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <>
            <Box className="homePage">
                <div className="homepageTop">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <Typography variant={"h4"} color="white" sx={{ textAlign: 'center', marginTop: 3, marginBottom: 3, fontWeight: "bold"}}>Welcome back, {username}!</Typography>
                    <Button
                        onClick={handleStartGrind}
                        size="large"
                        variant="contained"
                        sx={{ marginTop: 2, alignSelf: 'center', backgroundColor: "#F7C71C", borderRadius: "20px", height: "60px", boxShadow: "3px 8px 30px rgba(247, 199, 28, 1)" }}>Start the Grind 🔥</Button>
                </Box>
                </div>
                <div className="homepageBottom">
                <Typography variant={"h5"} color="white" sx={{ textAlign: 'center', marginTop: 3, fontSize: "18px" }}>So far, you have completed:</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 5 }}>
                    <AttemptedCard difficulty={'easy'} numberOfAttempted={easyQuestions.length} />
                    <AttemptedCard difficulty={'medium'} numberOfAttempted={mediumQuestions.length} />
                    <AttemptedCard difficulty={'hard'} numberOfAttempted={hardQuestions.length} />
                </Box>
                </div>
            </Box>
        </>
    )


}

export default Home;
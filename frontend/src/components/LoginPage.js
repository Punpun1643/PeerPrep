import React from 'react';
import { Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from "react";
import axios from "axios";
import { STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";
import Login from './UserService/components/Login';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import './LoginPage.css';

import logo from '../assets/peerPrepLogo.png';

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [open, setOpen] = useState(false)
    
    let navigate = useNavigate();

    const handleLogin = async () => {
        console.log(`Login Triggered for ${username}`)
        const res = await axios.post(URL_USER_SVC + '/login',
            { username, password },
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                setOpen(true)
                if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
                    setErrorMsg(err.response.data.message)
                } else {
                    setErrorMsg('Please try again later.')
                }
            });
        // show error when login fails
        // when successful -> set up jwt tokens?
        if (res && res.status === STATUS_CODE_OK) {
            console.log(`${username} login success`)
            // set session storage username
            navigate("/home") // placeholder until merge with matching
        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <Fragment className="errorSnackBar">
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnackbar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );
    return (
        <React.Fragment>
            <div className="loginPage">
                <div className="loginWrap">
                    <div className="brandTagWrapper">
                        <div className="peerPrepBrandLoginWrapper">
                        <img className="peerPrepLogoLogin" src={logo} alt="Logo" />
                        <p className="brandTag">PeerPrep</p>
                        </div>
                    </div>
                    <div className="welcomeTagWrapper">
                        <p className="welcomeTag">Good to see you again! 👋</p>
                    </div>
                    <div className="loginContainer">
                        <Login />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default LoginPage;

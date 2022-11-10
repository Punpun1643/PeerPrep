import { Box, Button, IconButton, Snackbar, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { Fragment, useState } from "react";
import axios from "axios";
import { STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../../../constants";
import { URL_USER_SVC } from "../../../configs";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import MuiAlert from '@mui/material/Alert';
import './Login.css';

function Login() {
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
        <Fragment>
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

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <React.Fragment>
            <div className="login">
                <div className="loginWrapper">
                    <Typography className="loginHeader" variant={"h3"} marginBottom={"2rem"}>Login</Typography>
                    <div className="inputWrapper">
                        <TextField
                            className="userInputUsername"
                            required
                            label="Username"
                            variant="outlined"
                            size="small"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{ marginBottom: "1rem" }}
                            autoFocus
                        />
                        <TextField
                            className="userInputPassword"
                            required
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ marginBottom: "1rem" }}
                        />
                    </div>
                    <div className="button">
                        <Box display={"flex"} flexDirection={"column"}>
                            <Button 
                                className="loginButton"
                                style={{backgroundColor: "#3370FF"}}
                                variant={"contained"} 
                                onClick={handleLogin}
                                size="large">
                                Login
                            </Button>
                        </Box>
                    </div>
                    <Box className="signupLink">
                        <Link href="/signup">Don't have an account? Sign up here</Link>
                    </Box>
                    <Snackbar 
                        open={open}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        action={action}
                        sx={{ width: '400px' }} 
                    >
                        <Alert 
                            onClose={handleCloseSnackbar} 
                            severity="error" 
                            sx={{ width: '100%' }} 
                            style={
                                { backgroundColor: "#FED7D8", 
                                color: "#FF3152" }
                            }>
                            {errorMsg}
                        </Alert>
                    </Snackbar>
                </div>
            </div>
        </React.Fragment>
    );

}

export default Login;

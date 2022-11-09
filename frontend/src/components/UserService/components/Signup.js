import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from 'react';
import axios from "axios";
import {URL_USER_SVC} from "../../../configs";
import {STATUS_CODE_BADREQUEST, STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../../../constants";
import DialogBox from "./DialogBox";
import Link from '@mui/material/Link';
import './Signup.css';

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const handleSignup = async () => {
        setIsSignupSuccess(false)
        const res = await axios.post(URL_USER_SVC, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    setErrorDialog('This username already exists')
                } else if (err.response.status === STATUS_CODE_BADREQUEST) {
                    setErrorDialog(err.response.data.message)
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    const verifyPassword = (password) => {
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return password.match(pwRegex) !== null;
    }

    return (
        <React.Fragment>
            <div className="signup">
                <div className="signupWrapper">
                    <Typography className="signupHeader" variant={"h3"} marginBottom={"2rem"}>Sign Up</Typography>
                    <div className="inputWrapper">
                        <TextField
                            className="userInputUsername"
                            required
                            label="Username"
                            variant="outlined"
                            size="small"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            sx={{marginBottom: "1rem"}}
                            autoFocus
                        />
                        <TextField
                            className="userInputPassword"
                            error={!(verifyPassword(password) || password === '')} 
                            required
                            label="Password"
                            variant="outlined"
                            size="small"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={ !(verifyPassword(password) || password === '')
                                ? "Password should contain at least one number and one alphabet, and must be at least 8 characters" 
                                : ""}
                            sx={{marginBottom: "2rem"}}
                        />
                    </div>
                    <div className="button">
                        <Box display={"flex"} flexDirection={"column"}>
                            <Button 
                                className="signupButton"
                                style={{backgroundColor: "#3370FF"}}
                                variant={"contained"} 
                                onClick={handleSignup} 
                                size="large">
                                Sign up
                            </Button>
                        </Box>
                    </div>
                    <Box className="loginLink">
                        <Link href="/login">Already have an account? Log in here</Link>
                    </Box>
                    <DialogBox 
                        className="dialogBoxSignup"
                        isDialogOpen={isDialogOpen}
                        closeDialog={closeDialog}
                        dialogTitle={dialogTitle}
                        dialogMsg={dialogMsg}
                        isSignupSuccess={isSignupSuccess}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup;

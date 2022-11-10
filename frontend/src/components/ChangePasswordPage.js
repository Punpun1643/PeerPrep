import React, { Fragment, useState, useEffect } from 'react';
import { Alert, Box, Button, IconButton, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_BADREQUEST, STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';

function ChangePasswordPage() {
    const [username, setUsername] = useState(Cookies.get('username'));
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordTwo, setNewPasswordTwo] = useState("")
    const [passwordStrengthMsg, setPasswordStrengthMsg] = useState("")
    const [passwordErrMsg, setPasswordErrMsg] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [open, setOpen] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    }, [])

    const handleChangePassword = async () => {
        setIsSuccess(false)
        if (username === '' || passwordErrMsg !== '' || passwordStrengthMsg !== '') {
            // prevent from sending password
            // error snackbar
            setOpen(true)
            setErrorMsg('Please check that inputs are non-empty and valid!')
        } else {
            const res = await axios.post(URL_USER_SVC + '/changePassword',
                { username, oldPassword, newPassword },
                { withCredentials: true, credentials: 'include' })
                .catch((err) => {
                    console.log(err)
                    setOpen(true)
                    // TODO: handle ERROR -> can use error snackbar again
                    if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
                        console.log('Current password is invalid.')
                        setErrorMsg('Current password is incorrect')
                    } else if (err.response.status === STATUS_CODE_BADREQUEST) {
                        console.log(err.response.data.message)
                        setErrorMsg(err.response.data.message)
                    } else {
                        console.log(err.response.data.message)
                        setErrorMsg('Please try again later')
                    }

                })
            if (res && res.status === STATUS_CODE_OK) {
                console.log("Password successfully changed")
                setIsSuccess(true) // trigger success msg snackbar
                setSuccessMsg('Password has been successfully changed!')
                // TODO: whether to redirect after password is changed? handling login on multiple sessions
            }
        }
    }

    const pwRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    
    const validatePasswordStrength = (e) => {
        setPasswordStrengthMsg('')
        // client side password validation
        if (oldPassword === '') {
            setPasswordStrengthMsg('') // do nothing
        } else if (!e.target.value) {
            setPasswordStrengthMsg('Please enter a new Password')
        } else if (newPassword === oldPassword) {
            setPasswordStrengthMsg('New password should not be the same as your current password')
        } else if (newPassword.match(pwRegex) === null) {
            setPasswordStrengthMsg('New password does not meet requirement')
        }
    }

    const checkNewPasswordsMatch = (e) => {
        setPasswordErrMsg('')

        if (newPassword !== newPasswordTwo) {
            setPasswordErrMsg('Password does not match new password')
        }
    }

    const checkOldPwNotMatchNewPw = (e) => {
        setPasswordStrengthMsg('')

        if (newPassword === oldPassword && oldPassword !== '') {
            setPasswordStrengthMsg('New password should not be the same as your current password')
        }
    }

    /* Snackbar related functions */

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setIsSuccess(false);
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

    return (
        <Box backgroundColor={"#132439"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} padding={"4rem"} style={{ height: "100vh" }}>
            <Paper elevation={2} style={{ borderRadius: "20px", marginTop: "-200px"}}>
                <Stack direction="column" spacing={2} padding={"4rem"}>
                    <Typography variant={"h3"}>Change Password</Typography>
                    <Typography variant={"subtitle1"}>
                        Your new password should contain at least one number and one alphabet, and must be at least 8 characters
                    </Typography>
                    <TextField
                        disabled
                        label="Username"
                        variant="outlined"
                        size="small"
                        value={username}
                    />
                    <TextField
                        required
                        label="Current Password"
                        variant="outlined"
                        type="password"
                        placeholder="Type your current password"
                        value={oldPassword}
                        size="small"
                        onChange={(e) => setOldPassword(e.target.value)}
                        onBlur={checkOldPwNotMatchNewPw}
                    />
                    <TextField
                        required
                        label="New Password"
                        variant="outlined"
                        type="password"
                        placeholder="Type your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        onBlur={(e) => { validatePasswordStrength(e); checkNewPasswordsMatch(e); }}
                        error={passwordStrengthMsg !== ''}
                        helperText={passwordStrengthMsg}
                        size="small"
                    />
                    <TextField
                        required
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"
                        placeholder="Type your new password again"
                        value={newPasswordTwo}
                        onChange={(e) => setNewPasswordTwo(e.target.value)}
                        onBlur={checkNewPasswordsMatch}
                        error={passwordErrMsg !== ''}
                        helperText={passwordErrMsg}
                        size="small"
                    />
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                        <Button variant={"contained"} onClick={handleChangePassword} style={{ backgroundColor: "#3370FF", width: "100%"}}>Submit</Button>
                    </Box>
                    
                </Stack>
            </Paper>
            
            
            {isSuccess &&
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isSuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                        {successMsg}
                    </Alert>
                </Snackbar>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                action={action}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMsg}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ChangePasswordPage;

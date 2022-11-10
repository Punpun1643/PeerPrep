import React, { useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';

function DeleteAccountPage(props) {
    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    }, [])

    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} margin={"auto"}>
            <Typography variant={"h1"}>"Your account has been successfully deleted."</Typography>
        </Box>
    )
}

export default DeleteAccountPage;
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';

function LogoutPage(props) {
    const [logoutMessage, setLogoutMessage] = useState("You have been signed out successfully!");

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    }, [])


    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} margin={"auto"}>
            <Typography variant={"h1"}>{logoutMessage}</Typography>
        </Box>
    )
}

export default LogoutPage;
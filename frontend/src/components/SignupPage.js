import React, { useEffect, useRef } from 'react';

import Signup from "./UserService/components/Signup";
import { init } from 'ityped';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import './SignupPage.css';
import logo from '../assets/peerPrepLogo.png';

function SignupPage() {

    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
            showCursor: false,
            strings: ["An enhanced experience for your interview preparation."],
            disableBackTyping: true,
            typeSpeed: 60
        })
    }, []);

    return (
        <React.Fragment>
        
            <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                className="signupPage">
                <Grid xs={6} className="taglineDivider">
                    <div className="tagline">
                      
                        
                        <div className="taglineWrapper">
                            <div className="peerPrepBrandWrapper">
                                <img className="peerPrepLogoSignup" src={logo} alt="Logo" />
                                <h1 className="header">PeerPrep</h1>
                            </div>
                            <p className="subHeader" ref={textRef}></p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} className="signUpDivier">
                    <div className="signUp">
                        <div className="signUpWrapper">
                            <Signup />
                        </div>
                    </div>
                </Grid>
            </Stack>
        </React.Fragment>
    )
}

export default SignupPage;

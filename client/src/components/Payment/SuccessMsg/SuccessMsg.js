import React from 'react';
import {Typography,Paper} from '@material-ui/core';
import './SuccessMsg.css';

const SuccessMsg = () => {
    return (
        <div className="success">
            <Paper className="paper" elevation={3} >
                <Typography className="successMsg" variant="h6" gutterBottom>
                    Booking Success!
                </Typography>
            </Paper>
            
        </div>
    )
}

export default SuccessMsg

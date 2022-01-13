import React,{useState} from 'react';
import {AppBar,Toolbar,Typography,Avatar,IconButton,Menu,MenuItem} from '@material-ui/core';
import {Link} from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography className="navbar-logo" variant="h6" color="inherit">
                        Boooker
                    </Typography>
                    <div className="navbar-links">
                        <Link className="Navbar-link" to="/">
                            <Typography variant="h6" >Home</Typography>    
                        </Link>
                        <Link className="Navbar-link" to="/addmovies">
                            <Typography variant="h6" >Add Movies</Typography>
                        </Link>
                        <Link className="Navbar-link" to="#about">
                            <Typography variant="h6" >About</Typography>
                        </Link>
                        <Link className="Navbar-link" to="#help">
                            <Typography variant="h6" >Help</Typography>
                        </Link>
                    </div>
                    <div className="navbar-grow"/>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <Avatar alt="profile_pic" src="https://cdn.dribbble.com/users/2878951/screenshots/14013747/media/603f0b853c409547dfa51cba996f375c.png?compress=1&resize=400x300" />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar

import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import { LogOut } from '../Redux/UserSlice';


const NavBar = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state=> state.User.isAuth)
  return (
    
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isAuth? <>
            <Button as={Link} to='/posts' color="inherit">Posts</Button>
            <Button onClick={()=> {dispatch(LogOut())
          //window.location.reload(true)
          
        }} color="inherit">LogOut</Button>
          </> : 
          <>
          <Button as={Link} to='/' color="inherit">Register</Button>
          <Button as={Link} to='/Login' color="inherit">Login</Button>
          </> }
          
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default NavBar
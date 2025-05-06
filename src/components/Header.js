import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
  <AppBar position="static">
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6">Loan Calculator</Typography>
      <div>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/exchange">Exchange</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
        <Button color="inherit" component={Link} to="/error">Error</Button>
      </div>
    </Toolbar>
  </AppBar>
);

export default Header;

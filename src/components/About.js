import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Loan Calculator
        </Typography>
        <Typography variant="body1" paragraph>
          This Loan Calculator application allows users to calculate their monthly EMI based on the entered loan amount, interest rate, and loan duration. It is designed to be responsive, user-friendly, and feature-rich.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Key Features:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Real-time EMI calculation with instant feedback" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Amortization schedule with principal and interest breakdown" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Live currency conversion using ExchangeRate API" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dark/light theme toggle for accessibility" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Error handling" />
          </ListItem>
        </List>
      </Paper>
    </Container>
  );
};

export default About;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

function Home() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const interest = parseFloat(rate) / 100 / 12;
    const months = parseInt(years) * 12;

    const emiCalc = principal * interest * Math.pow(1 + interest, months) / (Math.pow(1 + interest, months) - 1);
    setEmi(emiCalc.toFixed(2));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>Loan Calculator Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField label="Loan Amount" fullWidth value={amount} onChange={e => setAmount(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Interest Rate (%)" fullWidth value={rate} onChange={e => setRate(e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField label="Term (Years)" fullWidth value={years} onChange={e => setYears(e.target.value)} />
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: 2 }} onClick={calculateEMI}>Calculate</Button>
      {emi && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          EMI: ₹{emi} per month
        </Typography>
      )}
    </Container>
  );
}

export default Home ;
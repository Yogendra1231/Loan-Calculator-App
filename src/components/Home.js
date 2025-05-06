import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button,
  Grid, FormControl, InputLabel, Select, MenuItem,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import AmortizationTable from './AmortizationTable';

function Home() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [conversionRates, setConversionRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          'https://v6.exchangerate-api.com/v6/1e96dd31fe21189bf4333460/latest/USD'
        );
        setConversionRates(res.data.conversion_rates);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch conversion rates:', err);
        setError('Failed to fetch exchange rates.');
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const totalMonths = parseInt(years) * 12;

    const emiCalc =
      principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, totalMonths) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    setEmi(emiCalc.toFixed(2));
    setSchedule(generateSchedule(principal, monthlyRate, totalMonths, emiCalc));
  };

  const generateSchedule = (principal, monthlyRate, months, emi) => {
    const schedule = [];
    let balance = principal;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: balance > 0 ? balance : 0
      });
    }
    return schedule;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        Loan Calculator Dashboard
      </Typography>

      {loading ? (
        <CircularProgress sx={{ m: 5 }} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Loan Amount"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Interest Rate (%)"
                fullWidth
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Term (Years)"
                fullWidth
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button variant="contained" sx={{ mt: 2 }} onClick={calculateEMI}>
            Calculate
          </Button>

          {emi && (
            <Typography variant="h6" sx={{ mt: 3 }}>
              EMI: {currency} {(parseFloat(emi) * (conversionRates[currency] || 1)).toFixed(2)} per month
            </Typography>
          )}

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="currency-label">Currency</InputLabel>
            <Select
              labelId="currency-label"
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(conversionRates).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {schedule.length > 0 && (
            <AmortizationTable
              schedule={schedule}
              currency={currency}
              conversionRates={conversionRates}
              onReset={() => {
                setSchedule([]);
                setEmi(null);
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default Home;

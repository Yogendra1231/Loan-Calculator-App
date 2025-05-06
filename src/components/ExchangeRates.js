import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Typography, List, ListItem, ListItemText, Container } from '@mui/material';

 function ExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          'https://v6.exchangerate-api.com/v6/1e96dd31fe21189bf4333460/latest/USD'
        );
        setRates(response.data.conversion_rates);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Live Exchange Rates (Base: USD)
      </Typography>
      <List>
        {Object.entries(rates).map(([currency, rate]) => (
          <ListItem key={currency}>
            <ListItemText primary={`${currency}: ${rate}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default ExchangeRates;
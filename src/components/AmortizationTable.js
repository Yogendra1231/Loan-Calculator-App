import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography, Button } from '@mui/material';

const AmortizationTable = ({ schedule, currency, conversionRates, onReset }) => {
  const rate = conversionRates[currency] || 1;

  return (
    <>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Amortization Schedule ({currency})
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Principal</TableCell>
            <TableCell>Interest</TableCell>
            <TableCell>Remaining Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedule.map((row) => (
            <TableRow key={row.month}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{(row.principal * rate).toFixed(2)} {currency}</TableCell>
              <TableCell>{(row.interest * rate).toFixed(2)} {currency}</TableCell>
              <TableCell>{(row.balance * rate).toFixed(2)} {currency}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button sx={{ mt: 2 }} onClick={onReset} color="secondary">
        Reset Table
      </Button>
    </>
  );
};

export default AmortizationTable;

// src/components/DownloadCSV.js
import React from 'react';
import { useSelector } from 'react-redux';

const DownloadCSV = () => {
  const expenses = useSelector((state) => state.expenses.expenses);

  const downloadCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,'
      + expenses.map(expense => `${expense.name},${expense.amount},${expense.date}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={downloadCSV}>Download CSV</button>
  );
};

export default DownloadCSV;

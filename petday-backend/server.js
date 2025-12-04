const express = require('express');
const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend rodando: http://localhost:${PORT}`);
});
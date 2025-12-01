const express = require('express');
const app = express();                         // utilização do express
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin"}
}));

app.use(cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['X-Total-Count', 'X-Page-Count']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Rotas

app.use('api/auth', require('./routes/authRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/pets', require('./routes/petRoutes'));
app.use('/api/servicos', require('./routes/servicoRoutes'));
app.use('/api/portes', require('./routes/porteRoutes'));
app.use('/api/porte-servico', require('./routes/porteServicoRoutes'));
app.use('/api/agendamentos', require('./routes/agendamentoRoutes'));
app.use('/api/pagamentos', require('./routes/pagamentoRoutes'));
app.use('/api/enderecos', require('./routes/enderecoRoutes'));

app.get('/health', (req, res) => {
    res.status(200).json({ stautus: 'OK', message: 'Sistema funcionando.' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'PetDay API está funcionando.' });
});

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Rota não encontrada.'});
});

const swaggerSetup = require('./config/swagger');
swaggerSetup(app);

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
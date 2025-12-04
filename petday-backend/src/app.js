const express = require('express');
const app = express();                         // utilização do express
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');
const { authLimiter, apiLimiter } = require('./middleware/rateLimit');

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3001',
            'http://localhost:3000',
            process.env.FRONTEND_URL
        ].filter(Boolean);
        
        if (!origin || process.env.NODE_ENV !== 'production') {
            return callback(null, true);
        }
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Origin',
        'Accept',
        'X-Access-Token'
    ],
    exposedHeaders: [
        'X-Total-Count',
        'X-Page-Count',
        'Content-Range'
    ],
    maxAge: 86400
};


app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));


app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Rotas

app.use('/api/auth', require('./routes/authRoutes', authLimiter));
app.use('/api/clientes', require('./routes/clienteRoutes', apiLimiter));
app.use('/api/pets', require('./routes/petRoutes', apiLimiter));
app.use('/api/servicos', require('./routes/servicoRoutes', apiLimiter));
app.use('/api/portes', require('./routes/porteRoutes', apiLimiter));
app.use('/api/porte-servico', require('./routes/porteServicoRoutes', apiLimiter));
app.use('/api/agendamentos', require('./routes/agendamentoRoutes', apiLimiter));
app.use('/api/pagamentos', require('./routes/pagamentoRoutes', apiLimiter));
app.use('/api/enderecos', require('./routes/enderecoRoutes', apiLimiter));
app.use('/api/empresas', require('./routes/empresaRoutes', apiLimiter));

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


const ErrorLogger = (error, req, res, next) => {
    logger.error('Erro capturado:', { 
        message: error.message, 
        stack: error.stack,
        url: req.url,
        method: req.method 
    });
    next(error);
};

app.use(ErrorLogger);

app.use(errorHandler);

module.exports = app;
import express from 'express';
import accountRoutes from './modules/account/routes';

const app = express();

// Routes
accountRoutes(app);

export default app;

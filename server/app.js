import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import organizationRoutes from './routes/organization.js';
import companyRoutes from './routes/company.js';
import companyGlobalRoutes from './routes/companyGlobal.js';
import dashboardRoutes from './routes/dashboard.js';
import technologyRoutes from './routes/technology.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/organizations/:orgId/companies', companyRoutes);
app.use('/api/organizations/:orgId/dashboard', dashboardRoutes);
app.use('/api/companies', companyGlobalRoutes);
app.use('/api/technologies', technologyRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta docs
app.use('/docs', express.static(path.join(__dirname, '../docs')));

// Servir o arquivo OpenAPI
app.get('/openapi.yaml', (req, res) => {
  const yamlPath = path.join(__dirname, '../openapi.yaml');
  res.setHeader('Content-Type', 'text/yaml');
  res.sendFile(yamlPath);
});

// Endpoint principal Hello World
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

// Endpoint de status da API
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Endpoint raiz com informações da API
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World API - Stoplight Documentation',
    endpoints: {
      hello: `http://localhost:${PORT}/api/hello`,
      status: `http://localhost:${PORT}/api/status`
    },
    documentation: `http://localhost:${PORT}/docs`
  });
});

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('🚀====================================');
    console.log(`🚀 API Server running on port ${PORT}`);
    console.log('🚀====================================');
    console.log(`🎯 Hello World: http://localhost:${PORT}/api/hello`);
    console.log(`📊 Status: http://localhost:${PORT}/api/status`);
    console.log(`📋 Root: http://localhost:${PORT}/`);
    console.log('🚀====================================');
    console.log(`📚 Stoplight Docs: http://localhost:${PORT}/docs`);
    console.log('🚀====================================');
  });
}

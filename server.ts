import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Endpoint to download the single HTML file
  app.get('/api/download-html', (req, res) => {
    try {
      console.log('Building single HTML file...');
      // Run the build process synchronously to generate the single HTML file
      execSync('npm run build', { stdio: 'inherit' });
      
      const filePath = path.resolve(__dirname, 'dist/index.html');
      
      if (fs.existsSync(filePath)) {
        res.download(filePath, 'HeThongTKCN_Offline.html');
      } else {
        res.status(500).send('Build failed, index.html not found');
      }
    } catch (error) {
      console.error('Error during build:', error);
      res.status(500).send('Error building the application');
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

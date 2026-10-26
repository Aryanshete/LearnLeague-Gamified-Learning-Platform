import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilePersistencePlugin = () => ({
  name: 'profile-persistence-plugin',
  configureServer(server) {
    const dataFilePath = path.resolve(__dirname, 'src/data/userProfile.json');

    server.middlewares.use((req, res, next) => {
      // Handle GET /api/profile
      if (req.url === '/api/profile' && req.method === 'GET') {
        try {
          if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return;
          }
        } catch (err) {
          console.error('[API] Error reading profile:', err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({}));
        return;
      }

      // Handle POST /api/profile (Permanent Disk Save)
      if (req.url === '/api/profile' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          try {
            const updates = JSON.parse(body);
            let current = {};
            if (fs.existsSync(dataFilePath)) {
              try {
                current = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
              } catch (e) {}
            }

            const updatedProfile = {
              studentUser: updates.studentUser
                ? { ...current.studentUser, ...updates.studentUser }
                : current.studentUser,
              adminUser: updates.adminUser
                ? { ...current.adminUser, ...updates.adminUser }
                : current.adminUser
            };

            const dir = path.dirname(dataFilePath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(dataFilePath, JSON.stringify(updatedProfile, null, 2), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, profile: updatedProfile }));
            return;
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        });
        return;
      }

      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    profilePersistencePlugin(),
  ],
});

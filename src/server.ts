import App  from './app';
import express, { Request, Response } from 'express';

const PORT = Number(process.env.PORT) || 3000;
const app = new App();

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        <style>
          body { display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; }
          h1 { font-family: Arial, sans-serif; }
          .icon { font-size: 48px; color: #4CAF50; }
        </style>
      </head>
      <body>
        <i class="fas fa-dove icon"></i>
        <h1>I'm Alive!</h1>
      </body>
    </html>
  `);
});

(async () => {
  try {
    await app.start(PORT);
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
})();

// Production entry point for cyber_Folks' Passenger Node.js application runner.
process.env.NODE_ENV = 'production';

async function start() {
  const { createServer } = await import('node:http');
  const { default: next } = await import('next');
  const port = Number(process.env.PORT || 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }

  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = createServer((req, res) => {
    Promise.resolve(handle(req, res)).catch((error) => {
      console.error('Request failed:', error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.destroy();
      }
    });
  });

  server.on('error', (error) => {
    console.error('Server failed:', error);
    process.exit(1);
  });

  // Passenger intercepts the first HTTP server's listen() call and manages
  // its socket. PORT is useful when testing the same entry point locally.
  server.listen(port, '127.0.0.1', () => {
    console.log('CFStudio production server started');
  });
}

start().catch((error) => {
  console.error('Unable to start CFStudio:', error);
  process.exit(1);
});

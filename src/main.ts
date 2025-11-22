import { createApp } from './app';

async function main() {
  let app = await createApp();
  app = await app.init();
  await app.listen(process.env.SERVER_PORT);
  

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
}

main();

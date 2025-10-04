import createApp from'./app';

( async () => {
  const port = 3000;
  const app = await createApp();
  app.listen(port, () => {
    console.log(`Mi port ${port}`);
  });
} )()
